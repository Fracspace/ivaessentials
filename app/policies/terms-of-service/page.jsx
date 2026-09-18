'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../../components/RevealOnScroll';

export default function TermsOfServicePage() {
  return (
    <div style={{ background: '#F7F2E9', minHeight: '100vh', color: '#17130F' }}>
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: 'clamp(48px,8vh,96px) clamp(20px,4vw,56px) clamp(70px,11vh,130px)' }}>
        
        {/* Main Title */}
        <RevealOnScroll>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontWeight: 400, 
            fontSize: 'clamp(46px,6.8vw,82px)', 
            lineHeight: 1.05, 
            margin: '0 0 16px',
            color: '#17130F',
            letterSpacing: '-.01em'
          }}>
            Terms of service
          </h1>

          <p style={{ fontSize: '14.5px', color: '#2B2520', fontWeight: 600, margin: '0 0 24px' }}>
            Last updated: <span style={{ fontWeight: 400 }}>May 2026</span>
          </p>

          <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#4A423A', fontWeight: 300, margin: '0 0 32px' }}>
            Welcome to IVA Essentials. By accessing our website and purchasing our products or spiritual offerings, you agree to the following Terms of Devotional Service. Please read them carefully before placing an order.
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(23,19,15,.18)', margin: '36px 0 54px' }} />
        </RevealOnScroll>

        {/* Policy Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '54px' }}>

          {/* 1. About IVA Essentials */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                1. About IVA Essentials
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                IVA Essentials offers spiritually inspired products, blessed pooja kits, sankalp services, and devotional offerings connected to sacred rituals and traditions associated with Lord Shiva and Shravan Maas.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                Our offerings are intended to support personal devotion, spiritual connection, and traditional practices.
              </p>
            </section>
          </RevealOnScroll>

          {/* 2. Spiritual & Ritual Services */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                2. Spiritual & Ritual Services
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                Certain products and services offered by IVA Essentials may include:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>Personalized sankalp inclusion</li>
                <li>Temple archana participation</li>
                <li>Ritual-inspired blessed kits</li>
                <li>Sacred pooja items</li>
                <li>Spiritual offerings prepared with devotional intent</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                By placing an order, you understand and agree that ritual participation and preparation timelines may vary depending on temple schedules, festival periods, and spiritual observances.
              </p>
            </section>
          </RevealOnScroll>

          {/* 3. No Guaranteed Outcomes */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                3. No Guaranteed Outcomes
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                IVA Essentials performs all rituals and preparations with sincerity, devotion, and care. However, spiritual experiences and outcomes are personal and may vary for each devotee.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 12px', fontWeight: 500 }}>
                We do not guarantee:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>specific life outcomes,</li>
                <li>financial gain,</li>
                <li>healing results,</li>
                <li>or supernatural effects from any ritual, blessing, or sacred item.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                Our offerings are devotional in nature and intended for spiritual and cultural purposes.
              </p>
            </section>
          </RevealOnScroll>

          {/* 4. Personalized Orders */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                4. Personalized Orders
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                Orders involving:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>sankalp names,</li>
                <li>personalized rituals,</li>
                <li>custom pooja kits,</li>
                <li>or blessed spiritual items</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                are considered personalized devotional services.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 500 }}>
                Once ritual processing or kit preparation begins, such orders cannot be cancelled, modified, or refunded.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                Please review all details carefully before placing your order.
              </p>
            </section>
          </RevealOnScroll>

          {/* 5. Product Representation */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                5. Product Representation
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                We strive to present all products, images, and descriptions as accurately as possible. However:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>handcrafted spiritual items may slightly vary,</li>
                <li>natural materials may differ in appearance,</li>
                <li>and packaging/design elements may occasionally change based on availability.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                These variations do not affect the devotional nature or authenticity of the offering.
              </p>
            </section>
          </RevealOnScroll>

          {/* 6. Shipping & Delivery */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                6. Shipping & Delivery
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                Delivery timelines may vary depending on:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>festival demand,</li>
                <li>ritual schedules,</li>
                <li>courier delays,</li>
                <li>or regional service availability.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                IVA Essentials is not responsible for delays caused by third-party shipping providers or circumstances beyond our control.
              </p>
            </section>
          </RevealOnScroll>

          {/* 7. Respectful Use */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                7. Respectful Use
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                All content, imagery, rituals, and devotional materials shared by IVA Essentials are intended to be treated with cultural and spiritual respect.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                Users agree not to misuse, reproduce, or commercially exploit our content, branding, or ritual material without written permission.
              </p>
            </section>
          </RevealOnScroll>

          {/* 8. Pricing & Payments */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                8. Pricing & Payments
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                All prices displayed on our website are subject to change without prior notice.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 12px', fontWeight: 300 }}>
                IVA Essentials reserves the right to:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>modify pricing,</li>
                <li>discontinue products,</li>
                <li>limit quantities,</li>
                <li>or refuse orders when necessary.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                Payments must be completed successfully before ritual inclusion or order processing begins.
              </p>
            </section>
          </RevealOnScroll>

          {/* 9. Limitation of Liability */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                9. Limitation of Liability
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 16px', fontWeight: 300 }}>
                IVA Essentials shall not be held liable for:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.75 }}>
                <li>indirect or incidental damages,</li>
                <li>spiritual interpretations,</li>
                <li>delays beyond operational control,</li>
                <li>or personal expectations associated with devotional services.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: 0, fontWeight: 300 }}>
                By using our website and services, you agree to do so at your own discretion and understanding.
              </p>
            </section>
          </RevealOnScroll>

          {/* 10. Contact Information */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                10. Contact Information
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#3A332C', margin: '0 0 20px', fontWeight: 300 }}>
                For support or questions regarding these terms, please contact:
              </p>

              <div style={{ background: '#EFE7DA', border: '1px solid rgba(23,19,15,.12)', padding: '24px 28px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#17130F' }}>IVA Essentials Support</strong>
                <span style={{ fontSize: '14.5px', color: '#3A332C' }}>Email: <a href="mailto:support@ivaessentials.com" style={{ color: '#A2543A', textDecoration: 'underline' }}>support@ivaessentials.com</a></span>
                <span style={{ fontSize: '14.5px', color: '#5C5147', marginTop: '4px' }}>
                  You can also reach us through the <Link href="/contact" style={{ color: '#17130F', textDecoration: 'underline' }}>contact page</Link>.
                </span>
              </div>
            </section>
          </RevealOnScroll>

        </div>
      </main>
    </div>
  );
}
