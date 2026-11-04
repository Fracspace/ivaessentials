'use client';

import { getProductSku } from '../../lib/products';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import RevealOnScroll from '../../components/RevealOnScroll';
import { trackBeginCheckout, trackPurchase } from '../../lib/gtm';
import { sendOtpApi, verifyOtpApi, syncOtpUserWithBackend } from '../../lib/otpService';
import { useRazorpay } from '../../hooks/useRazorpay';

export default function CheckoutPage() {
  const { cartItems, subtotal, sankalpNote, clearCart, updateQuantity, removeItem, isLoaded } = useCart();
  const { initiatePayment, isProcessing: isPaymentProcessing, error: paymentError, clearError } = useRazorpay();
  const { user, token, loginUser, logout } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [completed, setCompleted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Quick OTP Login Modal for Guest Checkout
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');
  const [quickOtp, setQuickOtp] = useState('');
  const [quickOtpStep, setQuickOtpStep] = useState(1);
  const [quickOtpLoading, setQuickOtpLoading] = useState(false);
  const [quickOtpMsg, setQuickOtpMsg] = useState(null);

  // Phone Configuration: Delivery Phone vs Contact Phone
  const [sameAsContactPhone, setSameAsContactPhone] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Telangana',
    pincode: '',
    phone: '',          // Contact / Login Phone Number
    deliveryPhone: '',  // Specific Delivery Phone Number for courier
    email: ''
  });

  // 1. Prefill shipping info when authenticated user loads
  useEffect(() => {
    if (user) {
      const nameParts = (user.name || '').trim().split(' ');
      const fName = nameParts[0] || '';
      const lName = nameParts.slice(1).join(' ') || '';

      setShippingInfo((prev) => ({
        ...prev,
        name: user.name || prev.name,
        firstName: fName || prev.firstName,
        lastName: lName || prev.lastName,
        email: user.email && !user.email.includes('@ivaessentials.com') ? user.email : prev.email,
        phone: user.phone ? user.phone.replace('+91', '').trim() : prev.phone,
        deliveryPhone: user.phone ? user.phone.replace('+91', '').trim() : prev.deliveryPhone
      }));
    }
  }, [user]);

  // 2. Track GTM begin checkout
  useEffect(() => {
    if (cartItems.length > 0) {
      trackBeginCheckout(cartItems, subtotal);
    }
  }, []);

  // Sync delivery phone with contact phone when sameAsContactPhone is true
  const handleContactPhoneChange = (newPhone) => {
    const clean = newPhone.replace(/[^\d\s+-]/g, '');
    setShippingInfo((prev) => ({
      ...prev,
      phone: clean,
      deliveryPhone: sameAsContactPhone ? clean : prev.deliveryPhone
    }));
  };

  const handleNameChange = (newName) => {
    const nameParts = newName.trim().split(' ');
    const fName = nameParts[0] || '';
    const lName = nameParts.slice(1).join(' ') || '';

    setShippingInfo((prev) => ({
      ...prev,
      name: newName,
      firstName: prev.firstName && prev.firstName !== fName ? prev.firstName : fName,
      lastName: prev.lastName && prev.lastName !== lName ? prev.lastName : lName
    }));
  };

  // Quick OTP Login Handlers in Checkout
  const handleSendQuickOtp = async (e) => {
    if (e) e.preventDefault();
    setQuickOtpMsg(null);
    const cleanPhone = quickPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setQuickOtpMsg({ type: 'error', text: 'Enter a valid 10-digit phone number.' });
      return;
    }
    setQuickOtpLoading(true);
    try {
      const res = await sendOtpApi(cleanPhone);
      if (!res.success) {
        throw new Error(res.message);
      }
      setQuickOtpStep(2);
      setQuickOtpMsg({ type: 'success', text: res.message || `OTP sent successfully to +91 ${cleanPhone}.` });
    } catch (err) {
      setQuickOtpMsg({ type: 'error', text: err.message || 'Failed to send OTP. Please try again.' });
    } finally {
      setQuickOtpLoading(false);
    }
  };

  const handleVerifyQuickOtp = async (e) => {
    if (e) e.preventDefault();
    setQuickOtpMsg(null);
    const cleanPhone = quickPhone.replace(/\D/g, '').slice(-10);
    const cleanOtp = quickOtp.trim();

    if (!cleanOtp || cleanOtp.length < 4) {
      setQuickOtpMsg({ type: 'error', text: 'Please enter the 6-digit OTP code.' });
      return;
    }

    setQuickOtpLoading(true);

    try {
      const res = await verifyOtpApi(cleanPhone, cleanOtp);
      if (!res.success) {
        let errorMsg = res.message || 'Invalid OTP.';
        const lower = errorMsg.toLowerCase();
        if (lower.includes('expired')) {
          errorMsg = 'Verification code has expired. Please request a new OTP.';
        } else if (lower.includes('invalid') || lower.includes('wrong') || lower.includes('incorrect')) {
          errorMsg = 'Incorrect verification code. Please enter the 6-digit code received on your mobile.';
        }
        throw new Error(errorMsg);
      }

      // Synchronize customer with backend to register/login in database & generate JWT token!
      const syncResult = await syncOtpUserWithBackend({
        phone: cleanPhone,
        name: shippingInfo.name || `Customer ${cleanPhone.slice(-4)}`,
        email: shippingInfo.email
      });

      const authenticatedUser = syncResult.user;
      loginUser(authenticatedUser, syncResult.token);

      setShippingInfo((prev) => ({
        ...prev,
        name: prev.name || authenticatedUser.name,
        phone: cleanPhone,
        deliveryPhone: sameAsContactPhone ? cleanPhone : (prev.deliveryPhone || cleanPhone)
      }));

      setShowOtpModal(false);
      setQuickOtpStep(1);
      setQuickOtp('');
    } catch (err) {
      setQuickOtpMsg({ type: 'error', text: err.message || 'Verification failed. Please try again.' });
    } finally {
      setQuickOtpLoading(false);
    }
  };

  /**
   * Finalize order: saves to backend, updates localStorage, triggers GTM, clears cart
   */
  const finalizeOrder = async ({
    paymentMethodLabel,
    paymentStatus = 'PAID',
    razorpayPaymentId = null,
    razorpayOrderId = null,
    finalShippingInfo
  }) => {
    const orderId = `IVA-${Math.floor(10000 + Math.random() * 90000)}`;

    const itemsWithSku = cartItems.map(item => {
      const resolvedSku = item.sku || getProductSku(item.productId) || getProductSku(item.id) || getProductSku(item.name) || '';
      return {
        ...item,
        productId: item.productId || item.id,
        sku: resolvedSku
      };
    });

    const newOrderData = {
      id: orderId,
      items: itemsWithSku,
      total: subtotal,
      shippingInfo: finalShippingInfo,
      sankalp: sankalpNote,
      userPhone: user?.phone || finalShippingInfo.phone,
      paymentMethod: paymentMethodLabel,
      paymentStatus,
      razorpayPaymentId,
      razorpayOrderId,
      createdAt: new Date().toISOString()
    };

    // Track GTM purchase event
    trackPurchase({
      id: orderId,
      total: subtotal,
      items: itemsWithSku,
      shipping: 0
    });

    // Save to ivabackend API
    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
      if (!newOrderData.razorpayOrderId) {
        // Forward COD order directly to ivabackend
        const checkoutItems = (newOrderData.items || []).map(item => ({
          productId: item.productId || item.id,
          sku: item.sku || '',
          quantity: Number(item.quantity) || 1
        }));
        const shipping = newOrderData.shippingInfo || {};
        const shippingAddress = {
          name: shipping.name || `${shipping.firstName || ''} ${shipping.lastName || ''}`.trim() || 'Customer',
          phoneNumber: shipping.phone || shipping.deliveryPhone || '9999999999',
          addressLine1: shipping.address || shipping.street || 'Varanasi',
          addressLine2: shipping.landmark || '',
          city: shipping.city || 'Varanasi',
          state: shipping.state || 'Uttar Pradesh',
          postalCode: shipping.pincode || shipping.postalCode || '221001',
          country: shipping.country || 'India'
        };

        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        await fetch(`${API_URL}/api/orders/checkout`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            items: checkoutItems,
            shippingAddress,
            customer: {
              name: shippingAddress.name,
              email: shipping.email || null,
              phone: shippingAddress.phoneNumber
            },
            userId: user?.id || null
          })
        });
      }
    } catch (err) {
      console.error('Failed to post order to backend API:', err);
    }

    // Backup to localStorage for instant UI reactivity
    const createdOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Preparing with Care',
      trackingNumber: `AWB-IVA-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'Bluedart Express',
      estimatedDelivery: 'Within 48 Hours',
      total: subtotal,
      items: itemsWithSku,
      shippingInfo: finalShippingInfo,
      sankalp: sankalpNote,
      paymentMethod: paymentMethodLabel,
      paymentStatus,
      razorpayPaymentId,
      razorpayOrderId
    };

    try {
      localStorage.removeItem('iva_user_orders');
    } catch (e) { }

    setConfirmedOrder(createdOrder);
    setCompleted(true);
    await clearCart();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    clearError();

    // Mandatory Mobile OTP Login Check
    if (!user) {
      const contactPhone = (shippingInfo.phone || quickPhone || '').replace(/\D/g, '').slice(-10);
      if (contactPhone && contactPhone.length === 10) {
        setQuickPhone(contactPhone);
      }
      setShowOtpModal(true);
      setQuickOtpMsg({
        type: 'error',
        text: 'Mobile OTP verification is mandatory before completing your order. This securely generates your access token and links your order to your account.'
      });
      return;
    }

    const finalDeliveryPhone = sameAsContactPhone ? (shippingInfo.phone || '') : (shippingInfo.deliveryPhone || shippingInfo.phone || '');

    const finalShippingInfo = {
      ...shippingInfo,
      phone: shippingInfo.phone,
      deliveryPhone: finalDeliveryPhone,
      firstName: shippingInfo.firstName || (shippingInfo.name ? shippingInfo.name.split(' ')[0] : 'Customer'),
      lastName: shippingInfo.lastName || (shippingInfo.name ? shippingInfo.name.split(' ').slice(1).join(' ') : '')
    };

    // 1. Cash on Delivery (COD) flow
    if (paymentMethod === 'cod') {
      await finalizeOrder({
        paymentMethodLabel: 'Cash on Delivery (COD)',
        paymentStatus: 'Pending (COD)',
        razorpayPaymentId: null,
        razorpayOrderId: null,
        finalShippingInfo
      });
      return;
    }

    // 2. Razorpay Online Payment Flow (UPI, Card, Net Banking)
    try {
      const paymentItems = cartItems.map((item) => ({
        sku: item.sku || getProductSku(item.productId) || getProductSku(item.id) || getProductSku(item.name) || '',
        productId: item.productId || item.id || '',
        quantity: item.quantity || 1,
      }));

      await initiatePayment({
        items: paymentItems,
        userId: user?.id || null,
        customer: {
          name: shippingInfo.name || `${finalShippingInfo.firstName} ${finalShippingInfo.lastName}`.trim() || user?.name || '',
          email: shippingInfo.email || user?.email || '',
          phone: finalDeliveryPhone || shippingInfo.phone || user?.phone || '',
        },
        shippingAddress: {
          name: shippingInfo.name || `${finalShippingInfo.firstName} ${finalShippingInfo.lastName}`.trim() || 'Customer',
          phoneNumber: finalDeliveryPhone || shippingInfo.phone || '',
          addressLine1: shippingInfo.address || shippingInfo.street || '',
          addressLine2: shippingInfo.landmark || '',
          city: shippingInfo.city || '',
          state: shippingInfo.state || '',
          postalCode: shippingInfo.pincode || shippingInfo.postalCode || '',
          country: shippingInfo.country || 'India',
        },
        prefill: {
          name: shippingInfo.name || `${finalShippingInfo.firstName} ${finalShippingInfo.lastName}`.trim() || user?.name || '',
          email: shippingInfo.email || user?.email || '',
          contact: shippingInfo.phone || user?.phone || '',
        },
        notes: {
          shipping_city: finalShippingInfo.city,
          shipping_pincode: finalShippingInfo.pincode,
          selected_method: paymentMethod,
        },
        onSuccess: async ({ verifyData, paymentResponse, orderData }) => {
          await finalizeOrder({
            paymentMethodLabel: 'Online Payment (Razorpay)',
            paymentStatus: 'PAID',
            razorpayPaymentId: paymentResponse.razorpay_payment_id,
            razorpayOrderId: paymentResponse.razorpay_order_id,
            finalShippingInfo
          });
        },
        onError: (err) => {
          console.warn('⚠️ Payment process error:', err.message);
        },
        onDismiss: () => {
          console.log('Payment checkout closed by customer.');
        }
      });
    } catch (err) {
      // Error is set in useRazorpay state and rendered in the alert banner
    }
  };

  if (completed) {
    const effectiveDeliveryPhone = sameAsContactPhone ? shippingInfo.phone : (shippingInfo.deliveryPhone || shippingInfo.phone);
    const customerName = shippingInfo.name || `${shippingInfo.firstName || ''} ${shippingInfo.lastName || ''}`.trim() || 'Customer';
    const isPaid = (confirmedOrder?.paymentStatus === 'PAID') || paymentMethod !== 'cod';

    return (
      <div style={{ background: '#F7F2E9', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 6vw, 80px) 20px' }}>
        <RevealOnScroll style={{
          maxWidth: '620px',
          width: '100%',
          background: '#FAF6EE',
          padding: 'clamp(36px, 5vw, 54px) clamp(24px, 4vw, 44px)',
          borderRadius: '8px',
          border: '1px solid rgba(177, 143, 82, 0.28)',
          boxShadow: '0 16px 48px -12px rgba(23, 19, 15, 0.08), 0 2px 10px rgba(23, 19, 15, 0.03)',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Top sacred gold accent bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #A2543A 0%, #B18F52 50%, #A2543A 100%)',
            borderRadius: '8px 8px 0 0'
          }} />

          {/* Elegant Circular Success Icon */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(46, 90, 54, 0.08)',
            border: '1.5px solid rgba(46, 90, 54, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2E5A36',
            margin: '0 auto 18px'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            color: '#A2543A',
            fontWeight: 600,
            display: 'block',
            marginBottom: '10px'
          }}>
            Order Confirmed
          </span>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 4.4vw, 46px)',
            lineHeight: 1.18,
            color: '#17130F',
            margin: '0 0 14px',
            letterSpacing: '-0.01em'
          }}>
            Blessings on your journey
          </h1>

          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14.5px',
            color: '#5C5147',
            lineHeight: 1.7,
            margin: '0 auto 28px',
            maxWidth: '500px',
            fontWeight: 400
          }}>
            Thank you, <strong style={{ color: '#17130F', fontWeight: 600 }}>{customerName}</strong>. Your sacred order has been received. Our team will carefully prepare and pack your order with utmost purity, reverence, and care.
          </p>

          {/* Structured Luxury Receipt Card */}
          <div style={{
            background: '#F2EADD',
            borderRadius: '6px',
            border: '1px solid rgba(23, 19, 15, 0.09)',
            marginBottom: '32px',
            textAlign: 'left',
            overflow: 'hidden'
          }}>
            {/* Top Highlight: Order ID & Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              background: '#ECE3D3',
              borderBottom: '1px solid rgba(23, 19, 15, 0.08)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7A6E60', fontWeight: 500, marginBottom: '2px' }}>
                  Order Reference
                </span>
                <strong style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', letterSpacing: '.06em', color: '#17130F', fontWeight: 600 }}>
                  {confirmedOrder?.id || 'IVA-ORDER'}
                </strong>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7A6E60', fontWeight: 500, marginBottom: '2px' }}>
                  Total Amount Paid
                </span>
                <strong style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '20px', color: '#17130F', fontWeight: 600 }}>
                  ₹{confirmedOrder?.total || subtotal}
                </strong>
              </div>
            </div>

            {/* Receipt Details Body */}
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#5C5147', lineHeight: 1.6 }}>
              {/* Payment Status Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#7A6E60', fontSize: '12.5px' }}>Payment Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isPaid ? '#E2ECE3' : '#F9EADB',
                    color: isPaid ? '#2E5A36' : '#8A532B',
                    padding: '3px 9px',
                    borderRadius: '3px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '.04em'
                  }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: isPaid ? '#2E5A36' : '#8A532B' }} />
                    {isPaid ? 'Paid via Razorpay' : 'Pending (COD)'}
                  </span>
                  {confirmedOrder?.razorpayPaymentId && (
                    <code style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      background: 'rgba(23,19,15,0.06)',
                      color: '#4A4036',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      letterSpacing: '.03em'
                    }}>
                      {confirmedOrder.razorpayPaymentId}
                    </code>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(23, 19, 15, 0.06)', paddingTop: '10px' }}>
                <span style={{ color: '#7A6E60', fontSize: '12.5px' }}>Payment Method</span>
                <span style={{ color: '#17130F', fontWeight: 500 }}>
                  {confirmedOrder?.paymentMethod || (paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment (Razorpay)')}
                </span>
              </div>

              {/* Confirmation Email */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(23, 19, 15, 0.06)', paddingTop: '10px' }}>
                <span style={{ color: '#7A6E60', fontSize: '12.5px' }}>Confirmation Sent To</span>
                <span style={{ color: '#17130F', fontWeight: 500, wordBreak: 'break-all' }}>
                  {shippingInfo.email || 'Email on file'}
                </span>
              </div>

              {/* Delivery Courier Contact */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(23, 19, 15, 0.06)', paddingTop: '10px' }}>
                <span style={{ color: '#7A6E60', fontSize: '12.5px' }}>Delivery Updates Phone</span>
                <span style={{ color: '#17130F', fontWeight: 500 }}>
                  +91 {effectiveDeliveryPhone || shippingInfo.phone || '—'}
                </span>
              </div>

              {/* Destination City */}
              {shippingInfo.city && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(23, 19, 15, 0.06)', paddingTop: '10px' }}>
                  <span style={{ color: '#7A6E60', fontSize: '12.5px' }}>Shipping Destination</span>
                  <span style={{ color: '#17130F', fontWeight: 500 }}>
                    {shippingInfo.city}{shippingInfo.state ? `, ${shippingInfo.state}` : ''} {shippingInfo.pincode ? `(${shippingInfo.pincode})` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/orders"
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                padding: '16px 32px',
                fontSize: '11.5px',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all .25s ease'
              }}
              className="cart-btn"
            >
              <span>View Order History</span>
              <span>→</span>
            </Link>
            <Link
              href="/"
              style={{
                background: 'transparent',
                border: '1px solid rgba(23, 19, 15, 0.3)',
                color: '#17130F',
                padding: '16px 28px',
                fontSize: '11.5px',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                fontWeight: 500,
                transition: 'all .25s ease'
              }}
            >
              Return to Home
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    );
  }

  if (isLoaded && cartItems.length === 0 && !completed) {
    return (
      <div style={{ background: '#F7F2E9', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <RevealOnScroll style={{ maxWidth: '580px', width: '100%', textAlign: 'center', background: '#EFE7DA', padding: '48px 36px', borderRadius: '4px', borderLeft: '4px solid #B18F52' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', margin: '0 0 14px', color: '#17130F' }}>
            Your cart is currently empty
          </h2>
          <p style={{ fontSize: '14.5px', color: '#5C5147', lineHeight: 1.6, marginBottom: '28px' }}>
            You have removed all items from your order. Explore our sacred collections to add items.
          </p>
          <Link
            href="/shop"
            style={{ background: '#17130F', color: '#F7F2E9', padding: '16px 32px', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', display: 'inline-block' }}
            className="cart-btn"
          >
            Explore Collection
          </Link>
        </RevealOnScroll>
      </div>
    );
  }

  return (
    <div style={{ background: '#F7F2E9' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(60px,10vh,120px)' }}>

        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '16px' }}>
            <Link href="/cart" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Cart</Link>
            <span>/</span>
            <span style={{ color: '#17130F' }}>Checkout</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,4.5vw,56px)', margin: 0, color: '#17130F' }}>
            Checkout
          </h1>
        </div>

        {/* LOGGED IN STATUS / MANDATORY OTP BANNER */}
        <div style={{
          background: user ? '#E2ECE3' : '#FDF3E7',
          border: `1px solid ${user ? '#B8D4BB' : '#E8CDB5'}`,
          borderLeft: `4px solid ${user ? '#2E5A36' : '#A2543A'}`,
          padding: '16px 22px',
          borderRadius: '4px',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: '#2E5A36' }}>
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <strong>Customer Verified & Logged In:</strong> {user.name || 'Customer'} {user.phone ? `(${user.phone})` : ''}
                <span style={{ display: 'block', fontSize: '12px', color: '#4A5B4E', marginTop: '2px' }}>
                  Your order will automatically be linked to your account in the database and visible in &quot;Your Orders&quot;.
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: '#8A5239' }}>
              <span style={{ fontSize: '20px' }}>🔐</span>
              <div>
                <strong style={{ color: '#17130F' }}>Mobile OTP Login is Mandatory to Checkout</strong>
                <span style={{ display: 'block', fontSize: '12.5px', color: '#5C5147', marginTop: '2px' }}>
                  Please verify your mobile number with OTP. This generates your authentic access token and links your purchase in the database so you can view it under &quot;Your Orders&quot;.
                </span>
              </div>
            </div>
          )}

          {user ? (
            <button
              type="button"
              onClick={async () => {
                await logout();
              }}
              style={{ background: 'none', border: 'none', color: '#2E5A36', textDecoration: 'underline', fontSize: '11.5px', letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Sign Out / Switch Number
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const contactPhone = (shippingInfo.phone || quickPhone || '').replace(/\D/g, '').slice(-10);
                if (contactPhone && contactPhone.length === 10) {
                  setQuickPhone(contactPhone);
                }
                setShowOtpModal(true);
                setQuickOtpMsg(null);
              }}
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                border: 'none',
                padding: '10px 20px',
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📱</span>
              <span>Verify Mobile OTP</span>
            </button>
          )}
        </div>

        {/* QUICK OTP LOGIN MODAL FOR CHECKOUT */}
        {showOtpModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23,19,15,.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{ background: '#EFE7DA', border: '1px solid rgba(23,19,15,.15)', borderRadius: '4px', maxWidth: '440px', width: '100%', padding: '32px 28px', boxShadow: '0 8px 32px rgba(0,0,0,.25)', position: 'relative' }}>
              <button
                type="button"
                onClick={() => { setShowOtpModal(false); setQuickOtpStep(1); setQuickOtpMsg(null); }}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#17130F' }}
              >
                ✕
              </button>

              <span style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '6px' }}>
                Instant Access
              </span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', margin: '0 0 16px', color: '#17130F' }}>
                Sign In with Mobile OTP
              </h3>

              {quickOtpMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '3px', fontSize: '12.5px', marginBottom: '14px', background: quickOtpMsg.type === 'error' ? '#FDF3E7' : '#E2ECE3', color: quickOtpMsg.type === 'error' ? '#8A5239' : '#2E5A36' }}>
                  {quickOtpMsg.text}
                </div>
              )}

              {quickOtpStep === 1 ? (
                <form onSubmit={handleSendQuickOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Mobile Phone (+91)
                    </label>
                    <div style={{ display: 'flex', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', borderRadius: '2px' }}>
                      <span style={{ padding: '12px 14px', fontSize: '13.5px', background: '#EAE1D2', color: '#5C5147', borderRight: '1px solid rgba(23,19,15,.12)' }}>+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value.replace(/\D/g, ''))}
                        style={{ width: '100%', background: 'transparent', border: 'none', padding: '12px 14px', fontSize: '14px', outline: 'none' }}
                        autoFocus
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={quickOtpLoading || quickPhone.length < 10}
                    style={{ background: '#17130F', color: '#F7F2E9', border: 'none', padding: '14px', fontSize: '11.5px', letterSpacing: '.16em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer', marginTop: '6px' }}
                  >
                    {quickOtpLoading ? 'Sending...' : 'Get OTP →'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyQuickOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="••••••"
                      value={quickOtp}
                      onChange={(e) => setQuickOtp(e.target.value.replace(/\D/g, ''))}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '18px', textAlign: 'center', letterSpacing: '.3em', outline: 'none', borderRadius: '2px' }}
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={quickOtpLoading || quickOtp.length < 4}
                    style={{ background: '#17130F', color: '#F7F2E9', border: 'none', padding: '14px', fontSize: '11.5px', letterSpacing: '.16em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' }}
                  >
                    {quickOtpLoading ? 'Verifying...' : 'Verify & Auto-Fill Details →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: 'clamp(30px,5vw,72px)', alignItems: 'start' }}>

          {/* Left Checkout Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* 1. Contact Information */}
            <RevealOnScroll>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(23,19,15,.16)', paddingBottom: '10px', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: 0 }}>
                  1. Customer & Contact Information
                </h2>
                {!user ? (
                  <button
                    type="button"
                    onClick={() => {
                      const contactPhone = (shippingInfo.phone || quickPhone || '').replace(/\D/g, '').slice(-10);
                      if (contactPhone && contactPhone.length === 10) setQuickPhone(contactPhone);
                      setShowOtpModal(true);
                    }}
                    style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '11.5px', textDecoration: 'underline', cursor: 'pointer', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}
                  >
                    🔐 OTP Verification Required
                  </button>
                ) : (
                  <span style={{ fontSize: '12px', color: '#2E5A36', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>✓</span> Verified Customer
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Full Name */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                {/* Email Address */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                    Email Address (For Order Receipts & Tracking Updates) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                {/* Contact Mobile Phone */}
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147' }}>
                      Contact Mobile Phone (+91) *
                    </label>
                    {!user && (
                      <button
                        type="button"
                        onClick={() => {
                          const contactPhone = (shippingInfo.phone || quickPhone || '').replace(/\D/g, '').slice(-10);
                          if (contactPhone && contactPhone.length === 10) setQuickPhone(contactPhone);
                          setShowOtpModal(true);
                        }}
                        style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Verify with OTP →
                      </button>
                    )}
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={shippingInfo.phone}
                    onChange={(e) => handleContactPhoneChange(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: `1px solid ${user ? '#B8D4BB' : 'rgba(23,19,15,.2)'}`, padding: '14px', fontSize: '13.5px', outline: 'none' }}
                  />
                  <span style={{ fontSize: '11.5px', color: user ? '#2E5A36' : '#A2543A', display: 'block', marginTop: '5px' }}>
                    {user
                      ? `✓ Verified for ${user.name || 'Customer'}. All your orders are safely linked to this mobile number.`
                      : '⚠️ Mobile OTP verification is required to generate your access token and link your order in the database.'}
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* 2. Delivery Address */}
            <RevealOnScroll delay={100}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: '0 0 18px', borderBottom: '1px solid rgba(23,19,15,.16)', paddingBottom: '10px' }}>
                2. Delivery Address
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                  style={{ background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                  style={{ background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />

                <input
                  type="text"
                  required
                  placeholder="Street Address, Flat / Apartment No."
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  style={{ gridColumn: 'span 2', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />

                <input
                  type="text"
                  required
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  style={{ background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />

                <input
                  type="text"
                  required
                  placeholder="PIN Code"
                  value={shippingInfo.pincode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                  style={{ background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />

                {/* DELIVERY PHONE NUMBER SECTION (EXPLICIT FOR COURIER CONTACT) */}
                <div style={{ gridColumn: 'span 2', marginTop: '6px', background: '#EFE7DA', padding: '18px', borderRadius: '3px', border: '1px solid rgba(23,19,15,.12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#17130F', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🚚</span> Delivery Contact Phone Number *
                    </label>

                    <button
                      type="button"
                      onClick={() => setSameAsContactPhone(!sameAsContactPhone)}
                      style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '11.5px', textDecoration: 'underline', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '.1em' }}
                    >
                      {sameAsContactPhone ? 'Use Different Number' : 'Use Contact Phone'}
                    </button>
                  </div>

                  {/* Clarification note requested by user */}
                  <div style={{ fontSize: '12.5px', color: '#5C5147', lineHeight: 1.5, marginBottom: '12px', background: '#F2EADD', padding: '10px 12px', borderRadius: '2px', borderLeft: '3px solid #B18F52' }}>
                    ℹ️ <strong>Note:</strong> This phone number will be used by our courier & delivery partner to contact you at the time of delivery.
                  </div>

                  {/* Option checkbox toggle */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#17130F', cursor: 'pointer', marginBottom: sameAsContactPhone ? 0 : '14px' }}>
                    <input
                      type="checkbox"
                      checked={sameAsContactPhone}
                      onChange={(e) => {
                        const isSame = e.target.checked;
                        setSameAsContactPhone(isSame);
                        if (isSame) {
                          setShippingInfo((prev) => ({ ...prev, deliveryPhone: prev.phone }));
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>
                      Use contact phone ({shippingInfo.phone ? `+91 ${shippingInfo.phone}` : 'same as contact info above'}) for delivery
                    </span>
                  </label>

                  {/* Input field if user chooses different delivery phone number */}
                  {!sameAsContactPhone && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="tel"
                        required={!sameAsContactPhone}
                        placeholder="Alternative Delivery Phone (+91) e.g. 9876543210"
                        value={shippingInfo.deliveryPhone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, deliveryPhone: e.target.value.replace(/[^\d\s+-]/g, '') })}
                        style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.25)', padding: '12px 14px', fontSize: '13.5px', outline: 'none', borderRadius: '2px' }}
                      />
                      <span style={{ fontSize: '11px', color: '#8A7B6B', display: 'block', marginTop: '4px' }}>
                        Delivery updates and courier calls will be routed to this number.
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </RevealOnScroll>

            {/* 3. Payment Method */}
            <RevealOnScroll delay={200}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(23,19,15,.16)', paddingBottom: '10px', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: 0 }}>
                  3. Payment Method
                </h2>
                <span style={{ fontSize: '11px', letterSpacing: '.12em', color: '#2E5A36', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🔒</span> 256-Bit SSL Encrypted
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {[
                  {
                    id: 'online',
                    label: 'Online Payment (UPI, Cards, Net Banking, Wallets)',
                    badge: 'Instant · 100% Secure',
                    icon: '⚡',
                    subtext: 'Pay seamlessly via UPI (Google Pay, PhonePe, Paytm, QR), Debit & Credit Cards, Net Banking, or Wallets via Razorpay'
                  },
                  {
                    id: 'cod',
                    label: 'Cash on Delivery (COD)',
                    badge: 'Doorstep Cash',
                    icon: '📦',
                    subtext: 'Pay cash when your consecrated parcel arrives'
                  }
                ].map((pm) => (
                  <label
                    key={pm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '16px 20px',
                      background: paymentMethod === pm.id ? '#EFE7DA' : 'transparent',
                      border: `1px solid ${paymentMethod === pm.id ? '#17130F' : 'rgba(23,19,15,.2)'}`,
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all .2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === pm.id}
                        onChange={() => {
                          setPaymentMethod(pm.id);
                          clearError();
                        }}
                        style={{ cursor: 'pointer', accentColor: '#17130F' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#17130F' }}>
                          <span>{pm.icon}</span>
                          <span>{pm.label}</span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6B5F52', marginTop: '2px' }}>
                          {pm.subtext}
                        </div>
                      </div>
                    </div>
                    {pm.badge && (
                      <span style={{
                        fontSize: '10px',
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                        background: paymentMethod === pm.id ? '#E2ECE3' : 'rgba(23,19,15,.06)',
                        color: paymentMethod === pm.id ? '#2E5A36' : '#6B5F52',
                        borderRadius: '2px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {pm.badge}
                      </span>
                    )}
                  </label>
                ))}
              </div>

              {/* Razorpay Trust Badge */}
              <div style={{
                background: '#FAF5EC',
                border: '1px solid rgba(23,19,15,.08)',
                padding: '12px 16px',
                borderRadius: '3px',
                fontSize: '12px',
                color: '#5C5147',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🛡️</span>
                  <span>Secured by <strong>Razorpay</strong> · ISO 27001 Certified & PCI-DSS Level 1 Compliant</span>
                </div>
                <div style={{ fontSize: '11px', color: '#8A7B6B' }}>
                  Bank-Grade Protection
                </div>
              </div>
            </RevealOnScroll>

            {/* Payment Error Alert */}
            {paymentError && (
              <div style={{
                background: '#FDF3E7',
                border: '1px solid #E8CDB5',
                borderLeft: '4px solid #A2543A',
                padding: '14px 18px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
                marginTop: '16px'
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>⚠️</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#8A5239', marginBottom: '2px' }}>
                      Payment Notice
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#5C5147', lineHeight: 1.5 }}>
                      {paymentError}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearError}
                  style={{ background: 'none', border: 'none', color: '#8A5239', cursor: 'pointer', fontSize: '16px', padding: 0 }}
                  aria-label="Dismiss error"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isPaymentProcessing}
              style={{
                background: !user ? '#8A5239' : (isPaymentProcessing ? '#4A423B' : '#17130F'),
                color: '#F7F2E9',
                border: 'none',
                fontSize: '12px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '20px 34px',
                borderRadius: '2px',
                cursor: isPaymentProcessing ? 'not-allowed' : 'pointer',
                transition: 'background .3s',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              className="cart-btn"
            >
              {isPaymentProcessing ? (
                <>
                  <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(247,242,233,.3)', borderTopColor: '#F7F2E9', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Processing Payment...
                </>
              ) : !user ? (
                `🔐 Verify Mobile via OTP to Place Order · ₹${subtotal}`
              ) : paymentMethod === 'cod' ? (
                `Place Cash on Delivery Order · ₹${subtotal}`
              ) : (
                `Pay ₹${subtotal} via Razorpay →`
              )}
            </button>
          </div>

          {/* Right Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '130px', background: '#F2EADD', padding: 'clamp(26px,3.4vw,42px)', borderRadius: '2px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(22px,2.2vw,30px)', margin: '0 0 22px' }}>Order summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(23,19,15,.08)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <img src={item.image} alt={item.name} style={{ width: '56px', height: '64px', objectFit: 'cover', background: '#E3D9C8', borderRadius: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', lineHeight: 1.2, color: '#17130F' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B5F52', marginTop: '2px' }}>₹{item.price} each</div>

                      {/* Quantity Controller & Remove */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(23,19,15,.22)', borderRadius: '2px', background: '#FAF5EC' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '15px',
                              color: '#17130F',
                              cursor: 'pointer',
                              padding: 0
                            }}
                            title="Decrease quantity"
                          >
                            –
                          </button>
                          <span style={{ minWidth: '22px', textAlign: 'center', fontSize: '12.5px', fontWeight: 600, color: '#17130F' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '15px',
                              color: '#17130F',
                              cursor: 'pointer',
                              padding: 0
                            }}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '11px',
                            letterSpacing: '.12em',
                            textTransform: 'uppercase',
                            color: '#A2543A',
                            cursor: 'pointer',
                            padding: '2px 0',
                            borderBottom: '1px solid rgba(162,84,58,.35)',
                            transition: 'opacity .2s'
                          }}
                          title="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#17130F', textAlign: 'right', flexShrink: 0 }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                  {(item.sankalpName || item.sankalpGotra) && (
                    <div style={{ fontSize: '11.5px', color: '#4A3E31', background: '#EFE7DA', padding: '6px 10px', borderRadius: '3px', borderLeft: '2px solid #B18F52' }}>
                      📿 <strong>Sankalp Card:</strong> {item.sankalpName} {item.sankalpGotra ? `(Gotra: ${item.sankalpGotra})` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {(sankalpNote.name || cartItems.some(i => i.sankalpName)) && (
              <div style={{ padding: '14px', background: '#EFE7DA', fontSize: '12.5px', color: '#4A3E31', marginBottom: '20px', borderLeft: '3px solid #B18F52', borderRadius: '0 4px 4px 0' }}>
                <strong>✓ Sankalp Card Included:</strong> Personalised Sankalp Card will be prepared with reverence and delivered with your order.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '12px 0', borderTop: '1px solid rgba(23,19,15,.12)' }}>
              <span style={{ color: '#5C5147' }}>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '12px 0', borderBottom: '1px solid rgba(23,19,15,.12)' }}>
              <span style={{ color: '#5C5147' }}>Shipping</span>
              <span style={{ color: '#A2543A' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0 10px' }}>
              <span style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B' }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px,2.6vw,34px)' }}>₹{subtotal}</span>
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
}
