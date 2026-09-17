'use client';

import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../components/RevealOnScroll';
import ParallaxImage from '../components/ParallaxImage';
import { IMAGES } from '../lib/images';

export default function HomePage() {
  return (
    <div style={{ background: '#F7F2E9' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: 'min(92vh, 880px)',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          background: '#14100D'
        }}
      >
        <ParallaxImage
          src={IMAGES.hero.bg}
          alt="A sacred pooja arrangement lit by warm evening light"
          speed={0.12}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14,10,8,.88) 0%, rgba(14,10,8,.45) 42%, rgba(14,10,8,.18) 75%)',
            zIndex: 1
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(48px,9vh,120px) clamp(20px,4vw,56px) clamp(44px,7vh,80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))',
            gap: 'clamp(28px,5vw,72px)',
            alignItems: 'end'
          }}
        >
          <RevealOnScroll style={{ maxWidth: '660px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(20px,3vh,34px)' }}>
              <span style={{ width: '34px', height: '1px', background: '#B18F52', display: 'block' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#D9BE8B' }}>
                Sacred essentials since Kashi
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(44px,7.4vw,104px)',
                lineHeight: .98,
                letterSpacing: '-.01em',
                color: '#F8F2E6',
                margin: '0 0 clamp(18px,3vh,28px)',
                textWrap: 'balance'
              }}
            >
              Rituals.<br />
              <em style={{ fontStyle: 'italic', color: '#E8CFA3' }}>Reimagined</em> for Modern Life.
            </h1>
            <p
              style={{
                fontSize: 'clamp(14.5px,1.35vw,18px)',
                lineHeight: 1.75,
                color: 'rgba(245,238,226,.86)',
                maxWidth: '44ch',
                margin: '0 0 clamp(28px,4vh,44px)',
                fontWeight: 300,
                textWrap: 'pretty'
              }}
            >
              Thoughtfully curated sacred essentials for everyday devotion, meaningful journeys and moments that matter.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link
                href="/shop"
                style={{
                  background: '#F7F2E9',
                  color: '#17130F',
                  fontSize: '12px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  padding: '18px 34px',
                  borderRadius: '2px',
                  transition: 'background .35s, color .35s',
                  textDecoration: 'none'
                }}
                className="btn-primary"
              >
                Explore the Collection
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={200}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              justifySelf: 'end',
              maxWidth: '300px',
              borderLeft: '1px solid rgba(232,207,163,.28)',
              paddingLeft: 'clamp(18px,2vw,28px)'
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.6vw,22px)', color: '#E8CFA3', lineHeight: 1.4 }}>
              “Bring home the divine grace of Kashi.”
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,238,226,.6)' }}>
              The Blessed Kit · ₹1,499
            </span>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. The Idea Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(72px,12vh,150px) clamp(20px,4vw,56px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', gap: 'clamp(36px,6vw,96px)', alignItems: 'center' }}>
          <RevealOnScroll>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>
              The Idea
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4.2vw,60px)', lineHeight: 1.08, margin: '18px 0 26px', maxWidth: '22ch', textWrap: 'balance' }}>
              Ancient rituals. A contemporary expression.
            </h2>
            <p style={{ fontSize: 'clamp(14.5px,1.2vw,17px)', lineHeight: 1.85, color: '#5C5147', maxWidth: '52ch', margin: '0 0 22px', fontWeight: 300, textWrap: 'pretty' }}>
              IVA Essentials brings together timeless Indian tradition and thoughtful modern design. Each kit is assembled by hand — pure samagri, honest materials, nothing missing and nothing superfluous — so that devotion asks nothing of you but presence.
            </p>
            <p style={{ fontSize: 'clamp(14.5px,1.2vw,17px)', lineHeight: 1.85, color: '#5C5147', maxWidth: '52ch', margin: '0 0 34px', fontWeight: 300, textWrap: 'pretty' }}>
              We believe a ritual should feel unhurried. Everything we make exists to remove the friction between you and that quiet moment.
            </p>
            <a
              href="#collections"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', borderBottom: '1px solid #17130F', paddingBottom: '8px', transition: 'color .3s, border-color .3s' }}
              className="hover-color"
            >
              View the collections
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={200} style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'clamp(12px,1.6vw,20px)', alignItems: 'end' }}>
            <div style={{ overflow: 'hidden', background: '#E7DDCD' }}>
              <img
                src={IMAGES.hero.fallbackHands}
                alt="Hands arranging pooja essentials"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }}
                className="product-card-img"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
              <div style={{ overflow: 'hidden', background: '#E7DDCD' }}>
                <img
                  src={IMAGES.products.vishnuSamagri.url}
                  alt="Curated pooja kit contents"
                  style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }}
                  className="product-card-img"
                />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,19px)', lineHeight: 1.55, color: '#6B5F52', margin: 0 }}>
                Assembled in Hyderabad. Rooted in Kashi.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. Collections Section */}
      <section id="collections" style={{ background: '#EFE7DA', padding: 'clamp(72px,12vh,140px) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px,4vw,56px)' }}>
          <RevealOnScroll style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(36px,6vh,68px)' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(30px,4vw,56px)', lineHeight: 1.1, margin: 0, maxWidth: '18ch' }}>
              Four ways to keep tradition close.
            </h2>
            <span style={{ fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B' }}>
              Collections
            </span>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))', gap: 'clamp(20px,3vw,40px)' }}>
            <RevealOnScroll>
              <Link href="/blessed-kit" style={{ display: 'block', position: 'relative', overflow: 'hidden', background: '#DFD3C0' }}>
                <img
                  src={IMAGES.products.blessedKit.url}
                  alt="Blessed Kit"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }}
                  className="product-card-img"
                />
                <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: 'clamp(22px,3vw,34px)', background: 'linear-gradient(to top, rgba(18,13,10,.82), rgba(18,13,10,0))' }}>
                  <h3 style={{ fontSize: '11.5px', letterSpacing: '.26em', textTransform: 'uppercase', color: '#E8CFA3', margin: '0 0 10px', fontWeight: 400 }}>
                    Blessed Kits
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.3, color: '#F8F2E6', margin: 0, maxWidth: '22ch' }}>
                    Carry the blessings of sacred traditions home.
                  </p>
                </div>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <Link href="/shop" style={{ display: 'block', position: 'relative', overflow: 'hidden', background: '#DFD3C0' }}>
                <img
                  src={IMAGES.products.lakshmiSamagri.url}
                  alt="Pooja essentials"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }}
                  className="product-card-img"
                />
                <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: 'clamp(22px,3vw,34px)', background: 'linear-gradient(to top, rgba(18,13,10,.82), rgba(18,13,10,0))' }}>
                  <h3 style={{ fontSize: '11.5px', letterSpacing: '.26em', textTransform: 'uppercase', color: '#E8CFA3', margin: '0 0 10px', fontWeight: 400 }}>
                    Pooja Essentials
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.3, color: '#F8F2E6', margin: 0, maxWidth: '22ch' }}>
                    Thoughtfully selected for everyday devotion.
                  </p>
                </div>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <Link href="/yatra-kit" style={{ display: 'block', position: 'relative', overflow: 'hidden', background: '#DFD3C0' }}>
                <img
                  src={IMAGES.products.yatraKit.url}
                  alt="Yatra Kit"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }}
                  className="product-card-img"
                />
                <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: 'clamp(22px,3vw,34px)', background: 'linear-gradient(to top, rgba(18,13,10,.82), rgba(18,13,10,0))' }}>
                  <h3 style={{ fontSize: '11.5px', letterSpacing: '.26em', textTransform: 'uppercase', color: '#E8CFA3', margin: '0 0 10px', fontWeight: 400 }}>
                    Yatra Kits
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.3, color: '#F8F2E6', margin: 0, maxWidth: '22ch' }}>
                    Everything you need for a meaningful pilgrimage.
                  </p>
                </div>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <Link href="/shop" style={{ display: 'block', position: 'relative', overflow: 'hidden', background: '#DFD3C0' }}>
                <img
                  src={IMAGES.products.sacredGifting.url}
                  alt="Sacred gifting"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)' }}
                  className="product-card-img"
                />
                <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: 'clamp(22px,3vw,34px)', background: 'linear-gradient(to top, rgba(18,13,10,.82), rgba(18,13,10,0))' }}>
                  <h3 style={{ fontSize: '11.5px', letterSpacing: '.26em', textTransform: 'uppercase', color: '#E8CFA3', margin: '0 0 10px', fontWeight: 400 }}>
                    Sacred Gifting
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.3, color: '#F8F2E6', margin: 0, maxWidth: '22ch' }}>
                    Meaningful gifts rooted in tradition.
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. Signature Section */}
      <section style={{ maxWidth: '1500px', margin: '0 auto', padding: 'clamp(72px,12vh,150px) clamp(20px,4vw,56px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px), 1fr))', gap: 'clamp(36px,6vw,90px)', alignItems: 'center' }}>
          <RevealOnScroll style={{ overflow: 'hidden', background: '#E7DDCD' }}>
            <img
              src={IMAGES.hero.fallbackSigBlessedKit}
              alt="The Blessed Kit"
              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 1.3s cubic-bezier(.2,.7,.2,1)' }}
              className="product-card-img"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={150} style={{ maxWidth: '520px' }}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>
              Signature
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,4.6vw,66px)', lineHeight: 1.04, margin: '18px 0 22px' }}>
              The Blessed Kit
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.25vw,18px)', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: '0 0 30px', maxWidth: '46ch', textWrap: 'pretty' }}>
              Everything you need for a sacred ritual, thoughtfully brought together — with your sankalp card placed inside, and offerings prepared with reverence near Kashi Vishwanath.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '0 0 36px', padding: '26px 0', borderTop: '1px solid rgba(23,19,15,.14)', borderBottom: '1px solid rgba(23,19,15,.14)' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ width: '5px', height: '5px', background: '#B18F52', borderRadius: '50%', flex: 'none', transform: 'translateY(-3px)' }} />
                <span style={{ fontSize: '14px', color: '#3D352D', fontWeight: 300 }}>Complete samagri — nothing missing, everything in its place</span>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ width: '5px', height: '5px', background: '#B18F52', borderRadius: '50%', flex: 'none', transform: 'translateY(-3px)' }} />
                <span style={{ fontSize: '14px', color: '#3D352D', fontWeight: 300 }}>Sankalp card prepared in your name and gotra</span>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ width: '5px', height: '5px', background: '#B18F52', borderRadius: '50%', flex: 'none', transform: 'translateY(-3px)' }} />
                <span style={{ fontSize: '14px', color: '#3D352D', fontWeight: 300 }}>Packed respectfully, delivered across India</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,3vw,36px)', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1 }}>₹1,499</div>
                <div style={{ fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginTop: '6px' }}>Inclusive of taxes</div>
              </div>
              <Link
                href="/product/blessed-kit"
                style={{
                  background: '#17130F',
                  color: '#F7F2E9',
                  fontSize: '12px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  padding: '18px 34px',
                  borderRadius: '2px',
                  transition: 'background .35s',
                  textDecoration: 'none'
                }}
                className="cart-btn"
              >
                Explore Blessed Kit
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. Philosophy Section */}
      <section style={{ background: '#F2EADD', padding: 'clamp(72px,12vh,140px) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px,4vw,56px)' }}>


          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,230px), 1fr))', gap: 'clamp(24px,3vw,44px)' }}>
            <RevealOnScroll style={{ paddingTop: '26px', borderTop: '1px solid rgba(23,19,15,.18)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '.14em', color: '#B18F52', marginBottom: '18px' }}>01</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(20px,1.9vw,27px)', margin: '0 0 12px', lineHeight: 1.25 }}>Thoughtfully Curated</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Every item has a purpose. Nothing is included to fill a box.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={100} style={{ paddingTop: '26px', borderTop: '1px solid rgba(23,19,15,.18)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '.14em', color: '#B18F52', marginBottom: '18px' }}>02</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(20px,1.9vw,27px)', margin: '0 0 12px', lineHeight: 1.25 }}>Rooted in Tradition</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Inspired by timeless Indian rituals and the customs that carry them.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200} style={{ paddingTop: '26px', borderTop: '1px solid rgba(23,19,15,.18)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '.14em', color: '#B18F52', marginBottom: '18px' }}>03</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(20px,1.9vw,27px)', margin: '0 0 12px', lineHeight: 1.25 }}>Designed for Modern Life</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Simple, beautiful and effortless to use in a small city home.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={300} style={{ paddingTop: '26px', borderTop: '1px solid rgba(23,19,15,.18)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '.14em', color: '#B18F52', marginBottom: '18px' }}>04</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(20px,1.9vw,27px)', margin: '0 0 12px', lineHeight: 1.25 }}>Made with Reverence</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>Prepared with care, respect and an unhurried hand.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 6. Kashi Section with Parallax */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#14100D' }}>
        <ParallaxImage
          src={IMAGES.hero.fallbackKashiSilhouette}
          alt="Temple silhouette at dusk"
          speed={0.14}
          opacity={0.5}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 30% 60%, rgba(14,10,8,.55) 0%, rgba(14,10,8,.92) 70%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: 'clamp(90px,18vh,200px) clamp(20px,4vw,56px)' }}>
          <RevealOnScroll style={{ maxWidth: '660px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <span style={{ width: '7px', height: '7px', border: '1px solid #B18F52', transform: 'rotate(45deg)', display: 'block', animation: 'ivaFlame 4s ease-in-out infinite' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#D9BE8B' }}>Kashi</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,5.6vw,80px)', lineHeight: 1.03, color: '#F5EEE2', margin: '0 0 26px', maxWidth: '20ch' }}>
              Rooted in Sacred Traditions
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,27px)', lineHeight: 1.5, color: '#E8CFA3', margin: '0 0 34px', maxWidth: '32ch' }}>
              Where devotion, ritual and intention come together.
            </p>
            <p style={{ fontSize: 'clamp(14px,1.2vw,16.5px)', lineHeight: 1.85, color: 'rgba(242,235,224,.78)', fontWeight: 300, maxWidth: '50ch', margin: '0 0 40px', textWrap: 'pretty' }}>
              Each Blessed Kit begins with your sankalp — your name, your gotra, your intention. Selected offerings are included in rituals performed near Kashi Vishwanath, and the kit reaches you with the sankalp card placed inside.
            </p>
            <Link href="/blessed-kit" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#E8CFA3', borderBottom: '1px solid rgba(232,207,163,.5)', paddingBottom: '9px', textDecoration: 'none' }} className="footer-link">
              Discover the Blessed Kit
            </Link>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px), 1fr))', gap: 'clamp(20px,3vw,40px)', marginTop: 'clamp(56px,9vh,110px)', paddingTop: 'clamp(30px,4vh,48px)', borderTop: '1px solid rgba(232,207,163,.2)' }}>
            <RevealOnScroll>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '12px' }}>01</div>
              <h4 style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F0E7D8', margin: '0 0 10px', fontWeight: 400 }}>Sankalp received</h4>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(240,231,216,.62)', margin: 0, fontWeight: 300 }}>Your prayer intention is noted with care.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '12px' }}>02</div>
              <h4 style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F0E7D8', margin: '0 0 10px', fontWeight: 400 }}>Rituals in Kashi</h4>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(240,231,216,.62)', margin: 0, fontWeight: 300 }}>Offerings are included in temple archana near Kashi Vishwanath.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '12px' }}>03</div>
              <h4 style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F0E7D8', margin: '0 0 10px', fontWeight: 400 }}>Prepared &amp; packed</h4>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(240,231,216,.62)', margin: 0, fontWeight: 300 }}>Sacred items and your sankalp card, packed respectfully.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#B18F52', letterSpacing: '.14em', marginBottom: '12px' }}>04</div>
              <h4 style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F0E7D8', margin: '0 0 10px', fontWeight: 400 }}>Delivered to your home</h4>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(240,231,216,.62)', margin: 0, fontWeight: 300 }}>Your kit reaches your home across India.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
