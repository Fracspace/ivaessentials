'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../../components/RevealOnScroll';

export default function RefundPolicyPage() {
  return (
    <div style={{ background: '#F7F2E9', minHeight: '100vh', color: '#17130F' }}>
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(70px,11vh,130px)' }}>
        
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
            Refund Policy
          </h1>

          <p style={{ fontSize: '14.5px', color: '#2B2520', fontWeight: 600, margin: '0 0 24px' }}>
            Last Updated: <span style={{ fontWeight: 400 }}>May 2026</span>
          </p>

          <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#4A423A', fontWeight: 300, margin: '0 0 16px' }}>
            At IVA Essentials, every blessed kit, sankalp, and ritual offering is prepared with devotion, spiritual care, and sacred intention. Since many of our offerings are personalized and connected to temple rituals performed during Shravan Maas, certain items and services are non-returnable once processed.
          </p>

          <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#4A423A', fontWeight: 500, margin: '0 0 32px' }}>
            By placing an order with IVA Essentials, you agree to the policy below.
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(23,19,15,.18)', margin: '36px 0 54px' }} />
        </RevealOnScroll>

        {/* Policy Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

          {/* Section 1 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                1. Personalized Ritual & Sankalp Orders
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                All orders involving:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Sankalp inclusion</li>
                <li>Temple archana</li>
                <li>Personalized pooja rituals</li>
                <li>Blessed pooja kits prepared in your name</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 16px' }}>
                are considered personalized spiritual offerings.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                Once your sankalp has been submitted for temple rituals or your blessed kit preparation has begun, the order cannot be cancelled, returned, or refunded. This is standard practice across many devotional and ritual-focused stores.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 2 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                2. Eligible Refunds & Replacements
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                We offer replacements or refunds only if:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>You received a damaged product</li>
                <li>You received the wrong item</li>
                <li>The package was significantly damaged during transit</li>
                <li>Your order was lost in shipping</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                To request support, please contact us within 48 hours of delivery with:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Order ID</li>
                <li>Clear photos/videos of the issue</li>
                <li>Packaging images</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                After verification, we may offer:
              </p>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Replacement</li>
                <li>Store credit</li>
                <li>Partial/full refund (if applicable)</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 3 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                3. Non-Returnable Items
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Due to the sacred, hygienic, and personalized nature of spiritual offerings, the following items are non-returnable and non-refundable:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Blessed pooja kits</li>
                <li>Sankalp cards</li>
                <li>Temple-prayed items</li>
                <li>Prasad</li>
                <li>Rudraksha, malas, or energized spiritual items</li>
                <li>Customized devotional products</li>
                <li>Opened or used pooja items</li>
                <li>Ritual services already performed</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                This aligns with common policies followed by spiritual and ritual-based ecommerce stores.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 4 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                4. Order Cancellation
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Orders may only be cancelled before:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>ritual processing begins, OR</li>
                <li>dispatch preparation starts.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                Once your sankalp has been assigned for temple rituals or your blessed kit enters preparation, cancellation will no longer be possible.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 5 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                5. Refund Processing Time
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Approved refunds are processed within:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li><strong>5–10 business days</strong></li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Refunds will be credited to the original payment method used during checkout.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                Shipping charges (if applicable) are non-refundable.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 6 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                6. Ritual & Spiritual Disclaimer
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 16px' }}>
                IVA Essentials respectfully performs spiritual rituals with devotion and sincerity. Spiritual experiences and personal beliefs may vary from devotee to devotee.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                While every ritual is conducted with utmost authenticity and care, we do not guarantee specific spiritual, emotional, or life outcomes from any ritual, blessing, or sacred offering.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 7 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                7. Contact Us
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                For any return, refund, or order-related assistance, please contact:
              </p>
              <div style={{ background: '#EFE7DA', border: '1px solid rgba(23,19,15,.12)', padding: '20px 24px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <strong style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#17130F' }}>IVA Essentials Support</strong>
                <span style={{ fontSize: '14.5px', color: '#3A332C' }}>Email: <a href="mailto:support@ivaessentials.com" style={{ color: '#A2543A', textDecoration: 'underline' }}>support@ivaessentials.com</a></span>
                <span style={{ fontSize: '14.5px', color: '#5C5147', marginTop: '4px' }}>
                  You can also reach us through the <Link href="/contact" style={{ color: '#17130F', textDecoration: 'underline' }}>contact form</Link> available on our website.
                </span>
              </div>
            </section>
          </RevealOnScroll>

        </div>
      </main>
    </div>
  );
}
