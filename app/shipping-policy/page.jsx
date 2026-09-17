'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function ShippingPolicyPage() {
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
            Shipping Policy
          </h1>

          <p style={{ fontSize: '14.5px', color: '#2B2520', fontWeight: 600, margin: '0 0 24px' }}>
            Last Updated: <span style={{ fontWeight: 400 }}>May 14, 2026</span>
          </p>

          <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#4A423A', fontWeight: 300, margin: '0 0 32px' }}>
            Welcome to <Link href="/" style={{ color: '#17130F', textDecoration: 'underline', fontWeight: 500 }}>Iva Essentials</Link>. We are committed to delivering your orders safely and on time. Please read our shipping policy carefully to understand how we process, ship, and deliver your purchases.
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(23,19,15,.18)', margin: '36px 0 54px' }} />
        </RevealOnScroll>

        {/* Policy Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

          {/* Section 1 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                1. Order Processing Time
              </h2>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>All orders are processed within <strong>1–3 business days</strong> after payment confirmation.</li>
                <li>Orders are not processed, shipped, or delivered on Sundays or public holidays.</li>
                <li>During high-demand periods, sales events, or holidays, processing times may be slightly delayed.</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                If there is a significant delay in processing your order, our support team will contact you via email or phone.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 2 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                2. Shipping Coverage
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                We currently ship across:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>India</li>
                <li>Selected international locations (if applicable)</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                If your location is not serviceable, you will be informed during checkout or contacted by our support team.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 3 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                3. Estimated Delivery Time
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 22px' }}>
                Estimated delivery timelines are as follows:
              </p>

              {/* Delivery Timelines Table */}
              <div style={{ overflowX: 'auto', marginBottom: '28px', border: '1px solid rgba(23,19,15,.14)', borderRadius: '3px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ background: '#EFE7DA', borderBottom: '1px solid rgba(23,19,15,.14)' }}>
                      <th style={{ padding: '16px 20px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '11.5px', color: '#17130F', fontWeight: 600 }}>Location</th>
                      <th style={{ padding: '16px 20px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '11.5px', color: '#17130F', fontWeight: 600 }}>Estimated Delivery Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(23,19,15,.08)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 500, color: '#17130F' }}>Metro Cities</td>
                      <td style={{ padding: '16px 20px', color: '#4A423A' }}>3–5 business days</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(23,19,15,.08)', background: 'rgba(239,231,218,.4)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 500, color: '#17130F' }}>Other Cities & Towns</td>
                      <td style={{ padding: '16px 20px', color: '#4A423A' }}>5–8 business days</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(23,19,15,.08)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 500, color: '#17130F' }}>Remote Areas</td>
                      <td style={{ padding: '16px 20px', color: '#4A423A' }}>7–12 business days</td>
                    </tr>
                    <tr style={{ background: 'rgba(239,231,218,.4)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 500, color: '#17130F' }}>International Orders</td>
                      <td style={{ padding: '16px 20px', color: '#4A423A' }}>10–20 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Delivery timelines are estimates and may vary due to:
              </p>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Courier partner delays</li>
                <li>Weather conditions</li>
                <li>Government restrictions</li>
                <li>Incorrect shipping information</li>
                <li>High order volumes</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 4 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                4. Shipping Charges
              </h2>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Shipping charges are calculated during checkout.</li>
                <li>Free shipping may be available on selected products, promotions, or minimum order values.</li>
                <li>International shipping charges, customs duties, and taxes (if applicable) are the responsibility of the customer unless stated otherwise.</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 5 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                5. Order Tracking
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Once your order is shipped, you will receive:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>A shipping confirmation email/SMS</li>
                <li>Tracking ID and courier details</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                Customers can use the tracking number provided to monitor shipment status directly through the courier partner website.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 6 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                6. Incorrect Address or Failed Delivery
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                Customers are responsible for providing accurate shipping details.
              </p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                If an order is returned due to:
              </p>
              <ul style={{ paddingLeft: '22px', margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Incorrect address</li>
                <li>Incomplete address</li>
                <li>Failed delivery attempts</li>
                <li>Refusal to accept the package</li>
              </ul>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: 0 }}>
                Additional shipping charges may apply for reshipping the order.
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 7 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                7. Damaged or Missing Items
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                If your order arrives damaged, incomplete, or tampered with:
              </p>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Please contact us within 48 hours of delivery.</li>
                <li>Share your order number along with clear photos/videos of the package and product.</li>
                <li>We will review the issue and provide an appropriate resolution, which may include replacement, refund, or store credit depending on the situation.</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 8 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                8. Delayed Shipments
              </h2>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>While we strive to ensure timely deliveries, delays caused by courier companies or unforeseen circumstances are beyond our control.</li>
                <li>We appreciate your patience and understanding in such situations.</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 9 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                9. International Shipping & Customs
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                For international orders:
              </p>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Delivery timelines may vary based on destination country.</li>
                <li>Customers are responsible for customs duties, import taxes, or additional charges imposed by local authorities.</li>
                <li>We are not responsible for delays caused by customs clearance.</li>
              </ul>
            </section>
          </RevealOnScroll>

          {/* Section 10 */}
          <RevealOnScroll>
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1.15, margin: '0 0 20px', color: '#17130F' }}>
                10. Lost Packages
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#3A332C', margin: '0 0 12px' }}>
                If your package is marked as delivered but you have not received it:
              </p>
              <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', color: '#3A332C', lineHeight: 1.7 }}>
                <li>Please contact the courier company first.</li>
                <li>If the issue remains unresolved, contact our support team within 5 days.</li>
                <li>We will assist you in investigating the issue with the courier partner.</li>
              </ul>
            </section>
          </RevealOnScroll>

        </div>
      </main>
    </div>
  );
}
