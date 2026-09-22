'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  return (
    <div style={{ background: '#F7F2E9' }}>
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(60px,10vh,130px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(30px,5vh,56px)' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,5.2vw,68px)', lineHeight: 1, margin: 0 }}>
            Your cart ({itemCount})
          </h1>
          <Link
            href="/shop"
            style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#6B5F52', borderBottom: '1px solid rgba(23,19,15,.3)', paddingBottom: '6px', textDecoration: 'none' }}
            className="hover-color"
          >
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <RevealOnScroll style={{ textAlign: 'center', padding: '80px 20px', background: '#EFE7DA' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', margin: '0 0 16px' }}>Your cart is currently empty</h2>
            <p style={{ fontSize: '14.5px', color: '#5C5147', marginBottom: '28px' }}>Explore our sacred collections to add items to your cart.</p>
            <Link
              href="/shop"
              style={{ background: '#17130F', color: '#F7F2E9', padding: '16px 32px', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
              className="cart-btn"
            >
              Explore Collection
            </Link>
          </RevealOnScroll>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))', gap: 'clamp(30px,5vw,72px)', alignItems: 'start' }}>
            {/* Cart Items List */}
            <div style={{ flex: '1 1 60%' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: 'clamp(16px,2.4vw,28px)', padding: '26px 0', borderTop: '1px solid rgba(23,19,15,.16)' }}>
                  <Link href={item.href || '/shop'} style={{ flex: 'none', width: 'clamp(96px,12vw,150px)', overflow: 'hidden', background: '#E3D9C8' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
                  </Link>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link href={item.href || '/shop'} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2vw,27px)', lineHeight: 1.2, color: '#17130F', textDecoration: 'none' }}>
                      {item.name}
                    </Link>
                    <span style={{ fontSize: '12.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B6B' }}>
                      {item.subtitle}
                    </span>
                    {(item.sankalpName || item.sankalpGotra) && (
                      <div style={{ fontSize: '12.5px', color: '#4A3E31', background: '#EFE7DA', padding: '6px 12px', borderRadius: '4px', borderLeft: '3px solid #B18F52', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📿</span>
                        <span><strong>Sankalp Card Engraving:</strong> {item.sankalpName} {item.sankalpGotra ? `(Gotra: ${item.sankalpGotra})` : ''}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginTop: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(23,19,15,.22)', borderRadius: '2px' }}>
                        <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity" style={{ background: 'transparent', border: 'none', fontSize: '17px', color: '#17130F', width: '42px', height: '46px', cursor: 'pointer' }}>–</button>
                        <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity" style={{ background: 'transparent', border: 'none', fontSize: '17px', color: '#17130F', width: '42px', height: '46px', cursor: 'pointer' }}>+</button>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#8A7B6B', cursor: 'pointer', padding: 0, borderBottom: '1px solid rgba(23,19,15,.2)' }} className="hover-color">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ flex: 'none', fontSize: '15px', textAlign: 'right', fontWeight: 500 }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}

              {/* Sankalp Note Box */}
              <div style={{ marginTop: '34px', padding: '24px 26px', background: '#EFE7DA', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ maxWidth: '40ch' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', marginBottom: '5px' }}>Add a sankalp note</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#5C5147', fontWeight: 300 }}>Your name, gotra and prayer intention are collected for archana in Kashi.</div>
                </div>
                <Link href="/product/blessed-kit" style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', borderBottom: '1px solid #17130F', paddingBottom: '6px', textDecoration: 'none' }} className="hover-color">
                  Add details
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <aside style={{ position: 'sticky', top: '130px', background: '#F2EADD', padding: 'clamp(26px,3.4vw,42px)' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(22px,2.2vw,30px)', margin: '0 0 26px' }}>Order summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '12px 0', borderBottom: '1px solid rgba(23,19,15,.12)' }}>
                <span style={{ color: '#5C5147', fontWeight: 300 }}>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '12px 0', borderBottom: '1px solid rgba(23,19,15,.12)' }}>
                <span style={{ color: '#5C5147', fontWeight: 300 }}>Shipping</span>
                <span style={{ color: '#A2543A' }}>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0 26px' }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B' }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px,2.6vw,34px)' }}>₹{subtotal}</span>
              </div>
              <Link
                href="/checkout"
                style={{ display: 'block', textAlign: 'center', background: '#17130F', color: '#F7F2E9', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '18px 28px', borderRadius: '2px', textDecoration: 'none', transition: 'background .3s' }}
                className="cart-btn"
              >
                Proceed to checkout
              </Link>
              <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#8A7B6B', marginTop: '18px', fontWeight: 300 }}>
                Taxes included. Dispatched within 48 hours, delivered across India.
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
