'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import ParallaxImage from '../../components/ParallaxImage';
import { IMAGES } from '../../lib/images';
import { useCart } from '../../context/CartContext';

export default function YatraKitPage() {
  const { addItem, sankalpNote } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: 'yatra-kit',
      name: 'Yatra Kit',
      subtitle: 'Travel-ready essentials',
      price: 199,
      quantity: 1,
      image: IMAGES.products.yatraKit.secondaryUrl,
      href: '/product/yatra-kit',
      sankalpName: sankalpNote?.name,
      sankalpGotra: sankalpNote?.gotra
    });
  };

  return (
    <div style={{ background: '#F7F2E9' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#14100D', minHeight: 'min(75vh, 700px)', display: 'flex', alignItems: 'flex-end' }}>
        <ParallaxImage src={IMAGES.products.yatraKit.url} alt="Yatra Kit travel arrangement" speed={0.12} opacity={0.68} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,10,8,.9) 0%, rgba(14,10,8,.4) 60%, rgba(14,10,8,.2) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px,12vh,140px) clamp(20px,4vw,56px) clamp(48px,8vh,90px)', width: '100%' }}>
          <RevealOnScroll style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '26px' }}>
              <span style={{ width: '34px', height: '1px', background: '#B18F52', display: 'block' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#D9BE8B' }}>Every Pilgrimage Prepared</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px,6.6vw,92px)', lineHeight: 1, color: '#F8F2E6', margin: '0 0 22px', textWrap: 'balance' }}>
              The Yatra Kit.<br />
              <em style={{ fontStyle: 'italic', color: '#E8CFA3' }}>Devotion in Motion.</em>
            </h1>
            <p style={{ fontSize: 'clamp(14.5px,1.3vw,17.5px)', lineHeight: 1.8, color: 'rgba(245,238,226,.85)', fontWeight: 300, maxWidth: '50ch', margin: '0 0 36px', textWrap: 'pretty' }}>
              Compact, leak-proof, thoughtfully sized essentials for your temple visits and sacred yatras across India.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                style={{ background: '#F7F2E9', color: '#17130F', border: 'none', fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '18px 34px', borderRadius: '2px', cursor: 'pointer', transition: 'background .35s' }}
                className="btn-primary"
              >
                Add Yatra Kit to Cart
              </button>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2vw,28px)', color: '#E8CFA3' }}>
                ₹199
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Details Grid */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,140px) clamp(20px,4vw,56px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: 'clamp(36px,6vw,88px)', alignItems: 'center' }}>
          <RevealOnScroll style={{ overflow: 'hidden', background: '#E3D9C8' }}>
            <img src={IMAGES.products.yatraKit.secondaryUrl} alt="Yatra Kit items detail" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
          </RevealOnScroll>
          <RevealOnScroll delay={150}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>Travel-Ready</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(30px,4.2vw,58px)', lineHeight: 1.06, margin: '18px 0 28px' }}>
              Designed for pilgrims on the move.
            </h2>
            <p style={{ fontSize: 'clamp(14.5px,1.2vw,17px)', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: '0 0 26px' }}>
              Whether visiting Kashi, Tirupati, Kedarnath or your local temple, the Yatra Kit ensures pure offerings are always in hand without mess or hassle.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              <div style={{ padding: '14px 0', borderTop: '1px solid rgba(23,19,15,.14)', fontSize: '14px', color: '#3D352D' }}>✓ Compact leak-proof containers for vibhuti, kumkum &amp; chandanam</div>
              <div style={{ padding: '14px 0', borderTop: '1px solid rgba(23,19,15,.14)', fontSize: '14px', color: '#3D352D' }}>✓ Pure Camphor &amp; pre-cut wicks</div>
              <div style={{ padding: '14px 0', borderTop: '1px solid rgba(23,19,15,.14)', fontSize: '14px', color: '#3D352D' }}>✓ Fits easily inside any travel bag or pocket</div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              style={{ background: '#17130F', color: '#F7F2E9', border: 'none', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '17px 32px', borderRadius: '2px', cursor: 'pointer' }}
              className="cart-btn"
            >
              Buy Yatra Kit (₹199)
            </button>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
