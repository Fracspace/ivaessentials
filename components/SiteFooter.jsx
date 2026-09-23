'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [subscribeNote, setSubscribeNote] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeNote("Thank you — we'll be in touch with our next ritual letter.");
      setEmail('');
    }
  };

  return (
    <div>
      {/* Newsletter Section */}
      <section style={{ background: '#17130F', color: '#F2EBE0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(66px,11vh,130px) clamp(20px,4vw,56px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(30px,4.4vw,60px)', lineHeight: 1.1, margin: '0 0 20px' }}>
            Stay close to what matters.
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.2vw,16.5px)', lineHeight: 1.8, color: 'rgba(242,235,224,.7)', fontWeight: 300, maxWidth: '46ch', margin: '0 auto clamp(32px,5vh,46px)', textWrap: 'pretty' }}>
            Receive stories, rituals, new collections and thoughtful offerings from IVA Essentials.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth: '520px', margin: '0 auto', justifyContent: 'center' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              style={{
                flex: '1 1 240px',
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(242,235,224,.32)',
                color: '#F2EBE0',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14.5px',
                padding: '15px 2px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                flex: '0 0 auto',
                background: '#E8CFA3',
                color: '#17130F',
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'background .3s'
              }}
              className="btn-subscribe"
            >
              Subscribe
            </button>
          </form>
          <div style={{ fontSize: '12px', color: '#8A7B6B', marginTop: '18px', minHeight: '18px' }}>
            {subscribeNote}
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <footer style={{ background: '#100C0A', color: 'rgba(242,235,224,.82)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(56px,9vh,104px) clamp(20px,4vw,56px) clamp(30px,4vh,48px)' }} className="site-footer-grid">
          <div className="site-footer-brand">
            <img
              src="/images/iva-logo-light.png"
              alt="IVA Essentials"
              style={{ height: '42px', width: 'auto', marginBottom: '14px', objectFit: 'contain' }}
            />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16.5px', lineHeight: 1.5, color: 'rgba(242,235,224,.72)', margin: 0, maxWidth: '280px' }}>
              Ancient rituals. Reimagined for modern life.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 18px', fontWeight: 400 }}>Explore</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '13.5px', fontWeight: 300 }}>
              <Link href="/" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Home</Link>
              <Link href="/shop" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Shop</Link>
              <Link href="/blessed-kit" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Blessed Kit</Link>
              <Link href="/yatra-kit" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Yatra Kit</Link>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 18px', fontWeight: 400 }}>Help</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '13.5px', fontWeight: 300 }}>
              <Link href="/contact" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Contact</Link>
              <Link href="/shipping-policy" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Shipping</Link>
              <Link href="/refund-policy" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Refund Policy</Link>
              <Link href="/privacy-policy" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Privacy Policy</Link>
              <Link href="/terms-of-service" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Terms</Link>
            </div>
          </div>
          <div className="site-footer-contact">
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 18px', fontWeight: 400 }}>Follow &amp; Contact</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', fontWeight: 300, marginBottom: '20px' }}>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Instagram</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13.5px', fontWeight: 300 }}>
              <a href="mailto:support@ivaessentials.com" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">support@ivaessentials.com</a>
              <a href="tel:+919063448273" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">+91 9063448273</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '22px clamp(20px,4vw,56px) 34px', borderTop: '1px solid rgba(242,235,224,.12)', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '.12em', color: '#7A6D5E' }} className="site-footer-bottom">
          <span>© 2026 IVA Essentials · Banjara Hills, Hyderabad</span>
          <span>Presented respectfully. Spiritual experiences vary by individual faith.</span>
        </div>
      </footer>
    </div>
  );
}
