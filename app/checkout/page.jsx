'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function CheckoutPage() {
  const { cartItems, subtotal, sankalpNote, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [completed, setCompleted] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Telangana',
    pincode: '',
    phone: '',
    email: ''
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const newOrderData = {
      items: cartItems,
      total: subtotal,
      shippingInfo: shippingInfo,
      sankalp: sankalpNote
    };

    // Save to backend API
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrderData)
      });
    } catch (err) {
      console.error('Failed to post order to backend API:', err);
    }

    // Backup to localStorage for instant UI reactivity
    try {
      const existing = JSON.parse(localStorage.getItem('iva_user_orders') || '[]');
      const createdOrder = {
        id: `IVA-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Preparing in Kashi',
        trackingNumber: `AWB-IVA-${Math.floor(100000 + Math.random() * 900000)}`,
        courier: 'Bluedart Express',
        estimatedDelivery: 'Within 48 Hours',
        total: subtotal,
        items: cartItems,
        shippingInfo: shippingInfo,
        sankalp: sankalpNote
      };
      localStorage.setItem('iva_user_orders', JSON.stringify([createdOrder, ...existing]));
    } catch (e) {}

    setCompleted(true);
    clearCart();
  };

  if (completed) {
    return (
      <div style={{ background: '#F7F2E9', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <RevealOnScroll style={{ maxWidth: '600px', textAlign: 'center', background: '#EFE7DA', padding: '48px 36px', borderLeft: '4px solid #B18F52' }}>
          <span style={{ fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: '#A2543A' }}>Order Confirmed</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,48px)', margin: '16px 0 14px' }}>
            Blessings on your journey
          </h1>
          <p style={{ fontSize: '15px', color: '#5C5147', lineHeight: 1.7, marginBottom: '24px' }}>
            Thank you, {shippingInfo.firstName || 'Devotee'}. Your order has been placed. We have received your sankalp details and your kit will be prepared with care near Kashi Vishwanath.
          </p>
          <div style={{ fontSize: '13px', color: '#8A7B6B', marginBottom: '32px' }}>
            Order confirmation sent to {shippingInfo.email || 'your email'}.
          </div>
          <Link
            href="/"
            style={{ background: '#17130F', color: '#F7F2E9', padding: '16px 32px', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
            className="cart-btn"
          >
            Return to Home Page
          </Link>
        </RevealOnScroll>
      </div>
    );
  }

  return (
    <div style={{ background: '#F7F2E9' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,7vh,80px) clamp(20px,4vw,56px) clamp(60px,10vh,120px)' }}>
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '20px' }}>
            <Link href="/cart" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Cart</Link>
            <span>/</span>
            <span style={{ color: '#17130F' }}>Checkout</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,56px)', margin: 0 }}>
            Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: 'clamp(30px,5vw,72px)', alignItems: 'start' }}>
          {/* Left Checkout Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* Contact Info */}
            <RevealOnScroll>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: '0 0 18px', borderBottom: '1px solid rgba(23,19,15,.16)', paddingBottom: '10px' }}>
                1. Contact Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  style={{ gridColumn: 'span 2', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone (+91)"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  style={{ gridColumn: 'span 2', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px', fontSize: '13.5px', outline: 'none' }}
                />
              </div>
            </RevealOnScroll>

            {/* Shipping Address */}
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
              </div>
            </RevealOnScroll>

            {/* Payment Method */}
            <RevealOnScroll delay={200}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: '0 0 18px', borderBottom: '1px solid rgba(23,19,15,.16)', paddingBottom: '10px' }}>
                3. Payment Method
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'upi', label: 'UPI / GPay / PhonePe / Paytm' },
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'netbanking', label: 'Net Banking' },
                  { id: 'cod', label: 'Cash on Delivery (COD)' }
                ].map((pm) => (
                  <label
                    key={pm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 20px',
                      background: paymentMethod === pm.id ? '#EFE7DA' : 'transparent',
                      border: '1px solid rgba(23,19,15,.2)',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                    />
                    <span>{pm.label}</span>
                  </label>
                ))}
              </div>
            </RevealOnScroll>

            <button
              type="submit"
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                border: 'none',
                fontSize: '12px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '20px 34px',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'background .3s',
                marginTop: '10px'
              }}
              className="cart-btn"
            >
              Complete Order · ₹{subtotal}
            </button>
          </div>

          {/* Right Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '130px', background: '#F2EADD', padding: 'clamp(26px,3.4vw,42px)' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(22px,2.2vw,30px)', margin: '0 0 22px' }}>Order summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid rgba(23,19,15,.08)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '56px', height: '64px', objectFit: 'cover', background: '#E3D9C8', borderRadius: '2px' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', lineHeight: 1.2 }}>{item.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#8A7B6B' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: '14px' }}>₹{item.price * item.quantity}</div>
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
                <strong>✓ Sankalp Card Included:</strong> Personalised Devotee Sankalp Card will be prepared in Kashi and delivered with your order.
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
