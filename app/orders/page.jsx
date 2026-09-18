'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const loadUserOrders = async () => {
    setLoading(true);
    let apiOrders = [];
    let localOrders = [];

    // 1. Fetch from API
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        apiOrders = data.orders || [];
      }
    } catch (err) {
      console.error('Error fetching orders from API:', err);
    }

    // 2. Fetch from LocalStorage (placed by user during session)
    try {
      const stored = localStorage.getItem('iva_user_orders');
      if (stored) localOrders = JSON.parse(stored);
    } catch (e) {}

    // Merge & deduplicate orders by ID
    const combined = [...localOrders, ...apiOrders];
    const uniqueMap = new Map();
    combined.forEach((item) => {
      if (item && item.id) uniqueMap.set(item.id, item);
    });

    setOrders(Array.from(uniqueMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'active') {
      return order.status !== 'Delivered';
    }
    if (activeFilter === 'delivered') {
      return order.status === 'Delivered';
    }
    return true;
  });

  const getStatusStyle = (status) => {
    if (status === 'Delivered') {
      return { bg: '#E2ECE3', text: '#2E5A36', border: '#B8D4BB' };
    }
    return { bg: '#EFE7DA', text: '#A2543A', border: '#D9C5AD' };
  };

  return (
    <div style={{ background: '#F7F2E9', minHeight: '85vh' }}>
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: 'clamp(40px,7vh,90px) clamp(20px,4vw,56px) clamp(60px,10vh,130px)' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 'clamp(30px,5vh,48px)' }}>
          <span style={{ fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '8px' }}>
            Your Account
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,5.2vw,64px)', lineHeight: 1, margin: 0, color: '#17130F' }}>
            Order History
          </h1>
        </div>

        {/* Filter Navigation Tabs (Only show if user has orders) */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(23,19,15,.14)', paddingBottom: '14px', marginBottom: '36px', overflowX: 'auto' }}>
            {[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'active', label: `Active / In Progress (${orders.filter(o => o.status !== 'Delivered').length})` },
              { id: 'delivered', label: `Delivered (${orders.filter(o => o.status === 'Delivered').length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  background: activeFilter === tab.id ? '#17130F' : 'transparent',
                  color: activeFilter === tab.id ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '12px',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '90px 20px', color: '#8A7B6B' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#17130F' }}>Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty Orders View (No dummy data) */
          <RevealOnScroll style={{ textAlign: 'center', padding: '90px 20px', background: '#EFE7DA', border: '1px solid rgba(23,19,15,.08)' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🛍️</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', margin: '0 0 12px', color: '#17130F' }}>
              No orders placed yet
            </h2>
            <p style={{ fontSize: '14.5px', color: '#5C5147', marginBottom: '28px', maxWidth: '460px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              When you complete a purchase, your order history, live tracking details, and Kashi sankalp notes will appear here.
            </p>
            <Link
              href="/shop"
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                padding: '16px 34px',
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                display: 'inline-block'
              }}
              className="cart-btn"
            >
              Explore Collection
            </Link>
          </RevealOnScroll>
        ) : (
          /* Functional Orders List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {filteredOrders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              const isExpanded = expandedOrder === order.id;

              return (
                <RevealOnScroll key={order.id}>
                  <div
                    style={{
                      background: '#EFE7DA',
                      border: '1px solid rgba(23,19,15,.12)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(23,19,15,.03)'
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        padding: '20px clamp(18px,3vw,32px)',
                        background: '#F2EADD',
                        borderBottom: '1px solid rgba(23,19,15,.1)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,36px)', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block' }}>Order ID</span>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#17130F' }}>{order.id}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block' }}>Date Placed</span>
                          <span style={{ fontSize: '13.5px', color: '#17130F' }}>{order.date}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block' }}>Total Amount</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#17130F' }}>₹{order.total}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.text,
                            border: `1px solid ${statusStyle.border}`,
                            padding: '6px 14px',
                            fontSize: '11px',
                            letterSpacing: '.16em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            borderRadius: '20px'
                          }}
                        >
                          ● {order.status}
                        </span>

                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          style={{
                            background: 'none',
                            border: '1px solid rgba(23,19,15,.2)',
                            padding: '6px 14px',
                            fontSize: '11px',
                            letterSpacing: '.14em',
                            textTransform: 'uppercase',
                            color: '#17130F',
                            cursor: 'pointer',
                            borderRadius: '2px'
                          }}
                          className="hover-color"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ padding: 'clamp(20px,3vw,32px)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <img
                              src={item.image || '/images/blessed-kit.jpg'}
                              alt={item.name}
                              style={{ width: '64px', height: '76px', objectFit: 'cover', background: '#E3D9C8', borderRadius: '2px', flex: 'none' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '21px', margin: '0 0 4px', color: '#17130F' }}>
                                {item.name}
                              </h3>
                              {item.subtitle && (
                                <p style={{ fontSize: '12px', color: '#8A7B6B', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.12em' }}>
                                  {item.subtitle}
                                </p>
                              )}
                              {(item.sankalpName || item.sankalpGotra) && (
                                <div style={{ fontSize: '12px', color: '#4A3E31', background: '#F2EADD', padding: '4px 8px', borderRadius: '3px', display: 'inline-block', marginBottom: '4px', borderLeft: '2px solid #B18F52' }}>
                                  📿 <strong>Sankalp Card Engraving:</strong> {item.sankalpName} {item.sankalpGotra ? `(Gotra: ${item.sankalpGotra})` : ''}
                                </div>
                              )}
                              <br />
                              <span style={{ fontSize: '13px', color: '#5C5147' }}>Quantity: {item.quantity}</span>
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: 500, color: '#17130F' }}>
                              ₹{item.price * item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Info */}
                      {isExpanded && (
                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(23,19,15,.12)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                          
                          {/* Delivery Address */}
                          {order.shippingInfo && (
                            <div style={{ background: '#F2EADD', padding: '18px 20px', borderRadius: '2px' }}>
                              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', margin: '0 0 10px', color: '#17130F' }}>
                                Delivery Address
                              </h4>
                              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: 0 }}>
                                <strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong><br />
                                {order.shippingInfo.address}<br />
                                {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}<br />
                                Phone: {order.shippingInfo.phone}
                              </p>
                            </div>
                          )}

                          {/* Tracking & Courier */}
                          <div style={{ background: '#F2EADD', padding: '18px 20px', borderRadius: '2px' }}>
                            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', margin: '0 0 10px', color: '#17130F' }}>
                              Shipment Tracking
                            </h4>
                            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: '0 0 8px' }}>
                              <strong>Courier:</strong> {order.courier || 'Bluedart'}<br />
                              <strong>Tracking ID:</strong> <code style={{ background: 'rgba(23,19,15,.06)', padding: '2px 6px' }}>{order.trackingNumber || 'AWB-PENDING'}</code><br />
                              <strong>Est. Delivery:</strong> {order.estimatedDelivery || 'Dispatched within 48 Hours'}
                            </p>
                          </div>

                          {/* Sankalp Details */}
                          {order.sankalp && (order.sankalp.name || order.sankalp.gotra) && (
                            <div style={{ background: '#F2EADD', padding: '18px 20px', borderRadius: '2px' }}>
                              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', margin: '0 0 10px', color: '#17130F' }}>
                                Sankalp Details
                              </h4>
                              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: 0 }}>
                                <strong>Name:</strong> {order.sankalp.name}<br />
                                {order.sankalp.gotra && <span><strong>Gotra:</strong> {order.sankalp.gotra}<br /></span>}
                                {order.sankalp.intention && <span><strong>Intention:</strong> {order.sankalp.intention}</span>}
                              </p>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
