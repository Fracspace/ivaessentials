'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../../components/RevealOnScroll';

const samagriKits = [
  {
    id: 'shiva',
    name: 'Shree Shiva Pooja Samagri',
    desc: 'Vibhuti, bilva and abhishek essentials for Shiva pooja.',
    heroImg: 'https://ivaessentials.com/cdn/shop/files/shivaPoojaKit.png?v=1777456301&width=1600',
    thumbImg: 'https://ivaessentials.com/cdn/shop/files/shivaPoojaKit.png?v=1777456301&width=500',
    price: '₹1',
    contents: ['Vibhuti & Bilva patra', 'Chandanam', 'Cotton wicks', 'Pure Camphor', 'Divine Agarbatti', 'Shiva Abhishek Offerings']
  },
  {
    id: 'lakshmi',
    name: 'Shree Mahalakshmi Pooja Samagri',
    desc: 'For abundance — pure samagri for Lakshmi pooja.',
    heroImg: 'https://ivaessentials.com/cdn/shop/files/lakshmiPookaKit.png?v=1777456303&width=1600',
    thumbImg: 'https://ivaessentials.com/cdn/shop/files/lakshmiPookaKit.png?v=1777456303&width=500',
    price: '₹1',
    contents: ['Lotus seed garland', 'Sacred Kumkum & Pasupu', 'Akshata & Chandanam', 'Cotton wicks', 'Fragrant Agarbatti', 'Lakshmi Pooja Offerings']
  },
  {
    id: 'ganesh',
    name: 'Shree Vinayaka Pooja Samagri',
    desc: 'Begin well — samagri for Ganesha pooja.',
    heroImg: 'https://ivaessentials.com/cdn/shop/files/ganeshPoojaKit.png?v=1777456304&width=1600',
    thumbImg: 'https://ivaessentials.com/cdn/shop/files/ganeshPoojaKit.png?v=1777456304&width=500',
    price: '₹1',
    contents: ['Durva grass blend', 'Sindoor & Haldi', 'Chandanam', 'Pure Camphor', 'Natural Agarbatti', 'Modak Arpan Essentials']
  },
  {
    id: 'vishnu',
    name: 'Shree Vishnu Pooja Samagri',
    desc: 'Tulsi, chandanam and offerings for satyanarayana vratam.',
    heroImg: 'https://ivaessentials.com/cdn/shop/files/hanumanPoojaKit.png?v=1777456300&width=1600',
    thumbImg: 'https://ivaessentials.com/cdn/shop/files/hanumanPoojaKit.png?v=1777456300&width=500',
    price: '₹1',
    contents: ['Sacred Tulsi', 'Pure Chandanam', 'Haldi & Kumkum', 'Desi Ghee Batti', 'Camphor & Agarbatti', 'Satyanarayana Vratam Samagri']
  }
];

export default function ProductSamagriPage({ initialKitId = 'shiva' }) {
  const found = samagriKits.find(k => k.id === initialKitId || initialKitId.includes(k.id));
  const [selectedKit, setSelectedKit] = useState(found || samagriKits[0]);
  const [email, setEmail] = useState('');
  const [notifyNote, setNotifyNote] = useState('');
  const [openAccordion, setOpenAccordion] = useState({ contents: true, sourcing: false });

  useEffect(() => {
    if (initialKitId) {
      const match = samagriKits.find(k => k.id === initialKitId || initialKitId.includes(k.id));
      if (match) setSelectedKit(match);
    }
  }, [initialKitId]);

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setNotifyNote(`Noted — we'll write to ${email} the day this kit returns.`);
      setEmail('');
    }
  };

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ background: '#F7F2E9', minHeight: '100vh', color: '#17130F' }}>
      {/* Product Detail Section */}
      <section style={{ maxWidth: '1500px', margin: '0 auto', padding: 'clamp(110px,13vh,150px) clamp(20px,4vw,56px) clamp(60px,10vh,120px)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: 'clamp(26px,4vh,44px)' }}>
          <Link href="/" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: '#17130F' }}>Pooja Samagri</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', gap: 'clamp(30px,5vw,80px)', alignItems: 'start' }}>
          {/* Left Column: Image & Kit Switcher */}
          <div>
            <div style={{ overflow: 'hidden', background: '#E3D9C8', marginBottom: '14px', position: 'relative', borderRadius: '2px' }}>
              <img
                src={selectedKit.heroImg}
                alt={selectedKit.name}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'opacity 0.4s ease' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  background: 'rgba(247,242,233,.94)',
                  fontSize: '9.5px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  padding: '8px 13px',
                  color: '#6B5F52',
                  borderRadius: '2px'
                }}
              >
                Sold out
              </span>
            </div>

            {/* 4 Kit Selector Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {samagriKits.map((kit) => {
                const isActive = kit.id === selectedKit.id;
                return (
                  <button
                    key={kit.id}
                    type="button"
                    onClick={() => setSelectedKit(kit)}
                    aria-label={kit.name}
                    style={{
                      padding: 0,
                      border: isActive ? '1px solid #17130F' : '1px solid transparent',
                      background: '#E3D9C8',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      outline: 'none',
                      transition: 'border-color 0.25s ease'
                    }}
                  >
                    <img
                      src={kit.thumbImg}
                      alt={kit.name}
                      style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B6B', margin: '16px 0 0' }}>
              Switch between the four samagri kits
            </p>
          </div>

          {/* Right Column: Info & Restocking form */}
          <div style={{ position: 'sticky', top: '120px', maxWidth: '520px' }}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>
              Pooja Samagri · Restocking
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(30px,4.2vw,56px)',
                lineHeight: 1.04,
                margin: '16px 0 18px'
              }}
            >
              {selectedKit.name}
            </h1>
            <p
              style={{
                fontSize: 'clamp(14.5px,1.2vw,17px)',
                lineHeight: 1.8,
                color: '#5C5147',
                fontWeight: 300,
                margin: '0 0 26px',
                maxWidth: '46ch',
                textWrap: 'pretty'
              }}
            >
              {selectedKit.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '30px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1 }}>
                {selectedKit.price}
              </span>
              <span style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B' }}>
                Inclusive of taxes
              </span>
            </div>

            {/* Restock Notification Box */}
            <div style={{ padding: '22px 24px', background: '#F2EADD', marginBottom: '24px', borderRadius: '2px' }}>
              <div style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 500 }}>
                Currently sold out
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>
                Each batch is assembled by hand. Leave your email and we'll write the day it returns.
              </p>
            </div>

            <form onSubmit={handleNotify} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                style={{
                  flex: '1 1 200px',
                  minWidth: 0,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(23,19,15,.25)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  padding: '14px 2px',
                  outline: 'none',
                  color: '#17130F'
                }}
              />
              <button
                type="submit"
                style={{
                  flex: 'none',
                  background: '#17130F',
                  color: '#F7F2E9',
                  border: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11.5px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  padding: '17px 30px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'background .3s'
                }}
                className="cart-btn"
              >
                Notify me
              </button>
            </form>
            {notifyNote && (
              <div style={{ fontSize: '12.5px', color: '#6B5F52', minHeight: '20px', marginBottom: '26px' }}>
                {notifyNote}
              </div>
            )}

            <Link
              href="/yatra-kit"
              style={{
                display: 'block',
                textAlign: 'center',
                border: '1px solid rgba(23,19,15,.25)',
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '17px 28px',
                borderRadius: '2px',
                marginBottom: '28px',
                color: '#17130F',
                textDecoration: 'none',
                transition: 'border-color .3s'
              }}
              className="hover-border"
            >
              Explore the Yatra Kit instead
            </Link>

            {/* Accordion 1: Typical contents */}
            <div
              onClick={() => toggleAccordion('contents')}
              style={{ borderTop: '1px solid rgba(23,19,15,.14)', padding: '20px 0', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Typical contents</span>
                <span style={{ color: '#A2543A', fontSize: '18px' }}>{openAccordion.contents ? '–' : '+'}</span>
              </div>
              {openAccordion.contents && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,150px), 1fr))', gap: '4px 24px', paddingTop: '14px' }}>
                  {selectedKit.contents.map((item, idx) => (
                    <span key={idx} style={{ fontSize: '13.5px', color: '#5C5147', fontWeight: 300, padding: '6px 0' }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Sourcing */}
            <div
              onClick={() => toggleAccordion('sourcing')}
              style={{ borderTop: '1px solid rgba(23,19,15,.14)', borderBottom: '1px solid rgba(23,19,15,.14)', padding: '20px 0', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Sourcing</span>
                <span style={{ color: '#A2543A', fontSize: '18px' }}>{openAccordion.sourcing ? '–' : '+'}</span>
              </div>
              {openAccordion.sourcing && (
                <p style={{ fontSize: '13.5px', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: '14px 0 0', maxWidth: '56ch' }}>
                  Ingredients are sourced to preserve tradition and quality, then sealed by hand in small batches — which is why kits sell out.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Small Batches Info Section */}
      <section style={{ background: '#EFE7DA', padding: 'clamp(56px,9vh,120px) 0' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(20px,4vw,56px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))',
            gap: 'clamp(30px,5vw,72px)',
            alignItems: 'center'
          }}
        >
          <RevealOnScroll style={{ overflow: 'hidden', background: '#E3D9C8', borderRadius: '2px' }}>
            <img
              src="https://ivaessentials.com/cdn/shop/files/hanumanPoojaKit.png?v=1777456300&width=1400"
              alt="Samagri arranged for pooja"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(26px,3.4vw,46px)',
                lineHeight: 1.1,
                margin: '0 0 18px',
                maxWidth: '20ch'
              }}
            >
              Assembled in small batches.
            </h2>
            <p style={{ fontSize: '14.5px', lineHeight: 1.85, color: '#5C5147', fontWeight: 300, margin: '0 0 20px', maxWidth: '48ch' }}>
              Every samagri kit is packed for one specific pooja — no generic box, no substitutions.
            </p>
            <Link
              href="/contact"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #17130F',
                paddingBottom: '7px',
                color: '#17130F',
                textDecoration: 'none'
              }}
              className="hover-color"
            >
              Ask about a custom kit
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
