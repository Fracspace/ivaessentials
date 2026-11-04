'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate mandatory fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all mandatory fields before sending your message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to send your message. Please try again or email us directly at support@ivaessentials.com.');
      }
    } catch (err) {
      setErrorMessage('Network error while sending your message. Please check your internet connection or email support@ivaessentials.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#F7F2E9' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(70px,11vh,140px)' }}>
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
              <div style={{ padding: '36px', background: '#EFE7DA', borderRadius: '2px', borderLeft: '4px solid #2E5A36' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', margin: '0 0 12px', color: '#17130F' }}>Thank you, {formData.name} 🙏</h3>
                <p style={{ fontSize: '14.5px', color: '#5C5147', lineHeight: 1.7, margin: '0 0 20px' }}>
                  Your message has been sent directly to our care team at <strong style={{ color: '#17130F' }}>support@ivaessentials.com</strong>. We will review your message and reach out to <strong style={{ color: '#17130F' }}>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #17130F',
                    padding: '12px 22px',
                    fontSize: '11px',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    color: '#17130F'
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errorMessage && (
                  <div style={{ padding: '12px 16px', background: '#FDF3E7', borderLeft: '4px solid #A2543A', color: '#8A5239', fontSize: '13.5px', borderRadius: '2px' }}>
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>
                    Your Name <span style={{ color: '#A2543A', fontWeight: 600 }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>
                    Email Address <span style={{ color: '#A2543A', fontWeight: 600 }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    placeholder="customer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '8px' }}>
                    Message <span style={{ color: '#A2543A', fontWeight: 600 }}>*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? '#5C5147' : '#17130F',
                    color: '#F7F2E9',
                    border: 'none',
                    fontSize: '11.5px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    padding: '17px 34px',
                    borderRadius: '2px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    alignSelf: 'flex-start',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'all .3s'
                  }}
                  className="cart-btn"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
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
