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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(56px,9vh,104px) clamp(20px,4vw,56px) clamp(30px,4vh,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 'clamp(32px,4vw,64px)' }}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', letterSpacing: '.28em', color: '#F2EBE0', marginBottom: '8px' }}>IVA</div>
            <div style={{ fontSize: '9px', letterSpacing: '.42em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '22px' }}>Essentials</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', lineHeight: 1.5, color: 'rgba(242,235,224,.72)', margin: 0 }}>
              Ancient rituals. Reimagined for modern life.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 20px', fontWeight: 400 }}>Explore</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', fontWeight: 300 }}>
              <Link href="/" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Home</Link>
              <Link href="/shop" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Shop</Link>
              <Link href="/blessed-kit" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Blessed Kit</Link>
              <Link href="/yatra-kit" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Yatra Kit</Link>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 20px', fontWeight: 400 }}>Help</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', fontWeight: 300 }}>
              <Link href="/contact" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Contact</Link>
              <a href="https://ivaessentials.com/policies/shipping-policy" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Shipping</a>
              <a href="https://ivaessentials.com/policies/refund-policy" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Refund Policy</a>
              <a href="https://ivaessentials.com/policies/privacy-policy" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Privacy Policy</a>
              <a href="https://ivaessentials.com/policies/terms-of-service" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Terms</a>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 20px', fontWeight: 400 }}>Follow</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', fontWeight: 300, marginBottom: '28px' }}>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Instagram</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">Facebook</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13.5px', fontWeight: 300 }}>
              <a href="mailto:support@ivaessentials.com" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">support@ivaessentials.com</a>
              <a href="tel:+919063448273" style={{ color: 'rgba(242,235,224,.82)', textDecoration: 'none' }} className="footer-link">+91 9063448273</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '22px clamp(20px,4vw,56px) 34px', borderTop: '1px solid rgba(242,235,224,.12)', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '.12em', color: '#7A6D5E' }}>
          <span>© 2026 IVA Essentials · Banjara Hills, Hyderabad</span>
          <span>Presented respectfully. Spiritual experiences vary by individual faith.</span>
        </div>
      </footer>
    </div>
  );
}
