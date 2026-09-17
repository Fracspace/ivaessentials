'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F7F2E9' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(50px,8vh,110px) clamp(20px,4vw,56px) clamp(70px,11vh,140px)' }}>
        <RevealOnScroll style={{ marginBottom: 'clamp(40px,6vh,70px)' }}>
          <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>Contact Us</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(36px,5.4vw,76px)', lineHeight: 1.05, margin: '16px 0 0' }}>
            We'd love to hear from you.
          </h1>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: 'clamp(36px,6vw,88px)', alignItems: 'start' }}>
          {/* Contact Form */}
          <RevealOnScroll>
            {submitted ? (
              <div style={{ padding: '36px', background: '#EFE7DA', borderRadius: '2px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', margin: '0 0 12px' }}>Thank you</h3>
                <p style={{ fontSize: '14.5px', color: '#5C5147', lineHeight: 1.7, margin: 0 }}>
                  Your message has been received. Our team will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: '#17130F', color: '#F7F2E9', border: 'none', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '17px 34px', borderRadius: '2px', cursor: 'pointer', alignSelf: 'flex-start' }}
                  className="cart-btn"
                >
                  Send Message
                </button>
              </form>
            )}
          </RevealOnScroll>

          {/* Contact Details */}
          <RevealOnScroll delay={150} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h4 style={{ fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 10px' }}>Email</h4>
              <a href="mailto:support@ivaessentials.com" style={{ fontSize: '16px', color: '#17130F', textDecoration: 'none' }}>support@ivaessentials.com</a>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 10px' }}>Phone / WhatsApp</h4>
              <a href="tel:+919063448273" style={{ fontSize: '16px', color: '#17130F', textDecoration: 'none' }}>+91 9063448273</a>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', margin: '0 0 10px' }}>Studio Location</h4>
              <p style={{ fontSize: '14.5px', color: '#5C5147', lineHeight: 1.7, margin: 0 }}>
                Banjara Hills, Hyderabad, Telangana, India
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
