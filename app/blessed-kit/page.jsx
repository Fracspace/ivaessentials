'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import ScrollBackgroundSection from '../../components/ScrollBackgroundSection';
import ParallaxImage from '../../components/ParallaxImage';
import DevotionalFrame from '../../components/DevotionalFrame';
import { IMAGES } from '../../lib/images';
import { useCart } from '../../context/CartContext';

export default function BlessedKitPage() {
  const { addItem, sankalpNote } = useCart();

  const handleClaim = () => {
    addItem({
      id: 'blessed-kit',
      name: 'Blessed Kit',
      subtitle: 'Shravan · sankalp included',
      price: 1499,
      quantity: 1,
      image: IMAGES.products.blessedKit.heroUrl,
      href: '/product/blessed-kit',
      sankalpName: sankalpNote?.name,
      sankalpGotra: sankalpNote?.gotra
    });
  };

  return (
    <div style={{ background: '#14100D' }}>
      {/* 1. Hero Parallax (Dark Theme) */}
      <section
        data-nav-theme="dark"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#14100D',
          minHeight: 'min(80vh, 760px)',
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <ParallaxImage
          src={IMAGES.products.blessedKit.url}
          alt="The Blessed Kit arranged for ritual"
          speed={0.12}
          opacity={0.72}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,10,8,.92) 0%, rgba(14,10,8,.4) 55%, rgba(14,10,8,.25) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px,12vh,140px) clamp(20px,4vw,56px) clamp(48px,8vh,90px)', width: '100%' }}>
          <RevealOnScroll style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '26px' }}>
              <span style={{ width: '34px', height: '1px', background: '#B18F52', display: 'block' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#D9BE8B' }}>
                Where devotion meets Kashi
              </span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px,6.6vw,92px)', lineHeight: 1, color: '#F8F2E6', margin: '0 0 22px', textWrap: 'balance' }}>
              From Your Devotion,<br />
              <em style={{ fontStyle: 'italic', color: '#E8CFA3' }}>To Divine Blessings.</em>
            </h1>
            <p style={{ fontSize: 'clamp(14.5px,1.3vw,17.5px)', lineHeight: 1.8, color: 'rgba(245,238,226,.85)', fontWeight: 300, maxWidth: '50ch', margin: '0 0 36px', textWrap: 'pretty' }}>
              Every Blessed Kit carries your sankalp through sacred rituals performed near Kashi Vishwanath — a connection between your devotion and the energy of Kashi, delivered to your home.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleClaim}
                style={{ background: '#F7F2E9', color: '#17130F', border: 'none', fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '18px 34px', borderRadius: '2px', cursor: 'pointer', transition: 'background .35s' }}
                className="btn-primary"
              >
                Claim your Blessed Kit
              </button>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2vw,28px)', color: '#E8CFA3' }}>
                ₹1,499
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Four Steps Journey (Pure Sandalwood Ivory Theme - Light Nav Theme) */}
      <ScrollBackgroundSection navTheme="light" defaultBg="#14100D" activeBg="#FAF5EC">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,140px) clamp(20px,4vw,56px)' }}>
          <RevealOnScroll style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(44px,7vh,86px)' }}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#8A7B6B' }}>The Journey</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(30px,4.2vw,58px)', lineHeight: 1.08, margin: '18px 0 0', color: '#17130F' }}>
              Four steps, performed with care.
            </h2>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,230px), 1fr))', gap: 'clamp(24px,3vw,44px)' }}>
            <RevealOnScroll variant="fall" delay={0}>
              <div style={{ overflow: 'hidden', background: '#DFD3C0', borderRadius: '3px', marginBottom: '22px' }}>
                <img src={IMAGES.journey.sankalp} alt="Placing your order" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '10px' }}>01</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(19px,1.8vw,25px)', margin: '0 0 10px', color: '#17130F' }}>Your sankalp is received</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>We take your name and gotra, along with your prayer intention.</p>
            </RevealOnScroll>

            <RevealOnScroll variant="fall" delay={180}>
              <div style={{ overflow: 'hidden', background: '#DFD3C0', borderRadius: '3px', marginBottom: '22px' }}>
                <img src={IMAGES.journey.temple} alt="Rituals in Kashi" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '10px' }}>02</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(19px,1.8vw,25px)', margin: '0 0 10px', color: '#17130F' }}>Rituals near Kashi Vishwanath</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Your sankalp card is offered in temple archana near Kashi Vishwanath.</p>
            </RevealOnScroll>

            <RevealOnScroll variant="fall" delay={360}>
              <div style={{ overflow: 'hidden', background: '#DFD3C0', borderRadius: '3px', marginBottom: '22px' }}>
                <img src={IMAGES.journey.packed} alt="Prepared and packed" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '10px' }}>03</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(19px,1.8vw,25px)', margin: '0 0 10px', color: '#17130F' }}>Prepared &amp; packed</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Sacred items and your sankalp card, packed respectfully to preserve purity.</p>
            </RevealOnScroll>

            <RevealOnScroll variant="fall" delay={540}>
              <div style={{ overflow: 'hidden', background: '#DFD3C0', borderRadius: '3px', marginBottom: '22px' }}>
                <img src={IMAGES.journey.delivery} alt="Delivered with blessings" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '10px' }}>04</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(19px,1.8vw,25px)', margin: '0 0 10px', color: '#17130F' }}>Delivered with blessings</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Your kit reaches your home, ready for your ritual.</p>
            </RevealOnScroll>
          </div>
        </div>
      </ScrollBackgroundSection>

      {/* 3. Inside the Kit Breakdown (Kashi Obsidian Theme - Dark Nav Theme) */}
      <ScrollBackgroundSection navTheme="dark" defaultBg="#FAF5EC" activeBg="#1C1410">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,140px) clamp(20px,4vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', gap: 'clamp(36px,6vw,88px)', alignItems: 'center' }}>
          {/* AUTHENTIC DEVOTIONAL BRASS MANDAP FRAME */}
          <RevealOnScroll variant="zoom">
            <DevotionalFrame variant="brass-mandap">
              <img src={IMAGES.products.blessedKit.insideUrl} alt="What is inside a Blessed Kit" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }} className="product-card-img" />
            </DevotionalFrame>
          </RevealOnScroll>
          <RevealOnScroll delay={150}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#E8CFA3' }}>Inside the kit</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(30px,4.2vw,58px)', lineHeight: 1.06, margin: '18px 0 28px', maxWidth: '20ch', color: '#F8F2E6' }}>
              What's inside a Blessed Kit
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,170px), 1fr))', gap: '2px 26px' }}>
              {[
                'Sankalp card in your name',
                'Kashi vibhuti',
                'Sacred kumkum & pasupu',
                'Pure chandanam',
                'Cotton wicks & camphor',
                'Agarbatti',
                'Gangajal',
                'Sacred thread (kalava)'
              ].map(item => (
                <div key={item} style={{ padding: '15px 0', borderTop: '1px solid rgba(177,143,82,.25)', fontSize: '14px', color: '#F8F2E6', fontWeight: 300 }}>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/product/blessed-kit" style={{ display: 'inline-flex', marginTop: '34px', background: '#F7F2E9', color: '#17130F', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '17px 32px', borderRadius: '2px', textDecoration: 'none', transition: 'background .35s, color .35s' }} className="cart-btn">
              View product details
            </Link>
          </RevealOnScroll>
        </div>
      </ScrollBackgroundSection>

      {/* 4. Sacred Devotional Assurance (Sandalwood Cream Theme - Light Nav Theme) */}
      <ScrollBackgroundSection navTheme="light" defaultBg="#1C1410" activeBg="#F4EBD9">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,120px) clamp(20px,4vw,56px)', textAlign: 'center' }}>
          <RevealOnScroll style={{ maxWidth: '840px', margin: '0 auto' }}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#8A7B6B' }}>Sacred Promise</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,62px)', lineHeight: 1.08, margin: '18px 0 24px', color: '#17130F' }}>
              Prepared with reverence. Delivered with purity.
            </h2>
            <p style={{ fontSize: 'clamp(14.5px,1.25vw,17.5px)', lineHeight: 1.85, color: '#5C5147', fontWeight: 300, marginBottom: '40px' }}>
              Every item in the Blessed Kit is handled with sacred intent. From temple archana offering near Kashi Vishwanath to safe tamper-evident delivery, we ensure your devotion reaches home unhindered.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px), 1fr))', gap: '24px', textAlign: 'left', marginBottom: '48px' }}>
              <div style={{ background: '#FAF5EC', padding: '28px 24px', borderRadius: '4px', border: '1px solid rgba(177,143,82,0.2)' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px', color: '#B18F52' }}>🪔</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#17130F', margin: '0 0 8px' }}>Authentic Samagri</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: 0 }}>Sourced directly from traditional artisans and pure sacred origins.</p>
              </div>

              <div style={{ background: '#FAF5EC', padding: '28px 24px', borderRadius: '4px', border: '1px solid rgba(177,143,82,0.2)' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px', color: '#B18F52' }}>📜</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#17130F', margin: '0 0 8px' }}>Name &amp; Gotra Sankalp</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: 0 }}>Individual sankalp card included and offered in holy archana.</p>
              </div>

              <div style={{ background: '#FAF5EC', padding: '28px 24px', borderRadius: '4px', border: '1px solid rgba(177,143,82,0.2)' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px', color: '#B18F52' }}>📦</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#17130F', margin: '0 0 8px' }}>Purity Protected</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5C5147', margin: 0 }}>Sealed Gangajal containers and moisture-proof protective packaging.</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleClaim}
                style={{ background: '#17130F', color: '#F7F2E9', border: 'none', fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '18px 36px', borderRadius: '2px', cursor: 'pointer', transition: 'background .35s' }}
                className="cart-btn"
              >
                Claim your Blessed Kit (₹1,499)
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </ScrollBackgroundSection>
    </div>
  );
}

