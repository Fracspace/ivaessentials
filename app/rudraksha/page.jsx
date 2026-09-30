'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

// SVG icons helper
const s = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#a06f24',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const beadIcons = [
  // 01 Focus
  <svg key="1" {...s}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="12" cy="12" r="0.4" />
  </svg>,
  // 02 Discipline
  <svg key="2" {...s}>
    <path d="M4 8V6a2 2 0 0 1 2-2h2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
    <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
    <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
    <path d="M9 12h6" />
  </svg>,
  // 03 Stillness
  <svg key="3" {...s}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2.5" />
  </svg>,
  // 04 Strength
  <svg key="4" {...s}>
    <path d="M3 20l6-9 4 5 3-4 5 8z" />
    <path d="M3 20h18" />
  </svg>,
  // 05 Faith
  <svg key="5" {...s}>
    <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 2 2 2.5 3 1z" />
  </svg>,
  // 06 Grounding
  <svg key="6" {...s}>
    <path d="M12 3v18" />
    <path d="M6 9c0 3 2 5 6 5" />
    <path d="M18 9c0 3-2 5-6 5" />
    <circle cx="12" cy="3" r="1.4" />
  </svg>
];

const beadData = [
  { n: '01', title: 'Focus', desc: 'Stay connected to what matters.', icon: beadIcons[0] },
  { n: '02', title: 'Discipline', desc: 'Keep showing up for your journey.', icon: beadIcons[1] },
  { n: '03', title: 'Stillness', desc: 'Find a moment of calm amidst the noise.', icon: beadIcons[2] },
  { n: '04', title: 'Strength', desc: 'Move forward through challenges.', icon: beadIcons[3] },
  { n: '05', title: 'Faith', desc: 'Trust the journey and your intentions.', icon: beadIcons[4] },
  { n: '06', title: 'Grounding', desc: 'Stay connected to yourself.', icon: beadIcons[5] }
];

const faqData = [
  { q: 'What is Rudraksha?', a: 'Rudraksha is a natural seed traditionally worn in Indian spiritual practice. Each bead carries a distinctive textured surface and a long-standing symbolic meaning.' },
  { q: 'What does the Rudraksha symbolize?', a: 'It is associated with focus, stillness and inner strength — a quiet reminder to stay grounded and intentional through everyday life.' },
  { q: 'Why are there 12 beads?', a: 'The twelve beads represent qualities worth carrying with you daily — focus, discipline, stillness, strength, faith and grounding among them — brought together in one simple band.' },
  { q: 'Is the band suitable for everyday wear?', a: 'Yes. It is hand-strung on a durable, adjustable cord and designed to be minimal enough to complement your everyday style.' },
  { q: 'How should I care for the Rudraksha Band?', a: 'Keep it dry when possible, wipe gently with a soft cloth, and store it away from direct heat. With simple care the beads age beautifully.' },
  { q: 'Is this suitable as a gift?', a: 'Absolutely. It arrives in premium gift-ready packaging and makes a thoughtful choice for birthdays, milestones, festivals or new beginnings.' }
];

export default function RudrakshaPage() {
  const { addItem } = useCart();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [qty, setQty] = useState(1);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const beadtrackRef = useRef(null);
  const containerRef = useRef(null);
  const stickyContainerRef = useRef(null);

  const handleAddToCart = () => {
    addItem({
      id: 'rudraksha-band',
      name: '12-Bead Rudraksha Band',
      subtitle: 'Natural Rudraksha · Hand-strung',
      price: 499,
      quantity: qty || 1,
      image: '/assets/rudrakshaImg1.png',
      href: '/rudraksha'
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleScrollToProduct = (e) => {
    if (e) e.preventDefault();
    const target = document.getElementById('buy-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollBeads = (dir) => {
    const track = beadtrackRef.current;
    if (!track) return;
    const card = track.querySelector('div');
    const step = card ? card.offsetWidth + 34 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
    reveals.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(34px)';
      const d = el.getAttribute('data-reveal-delay') || 0;
      el.style.transition = `opacity 1.2s cubic-bezier(.22,1,.36,1) ${d}ms, transform 1.2s cubic-bezier(.22,1,.36,1) ${d}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'none';
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    reveals.forEach((el) => observer.observe(el));

    const handleResize = () => {
      const mobile = window.innerWidth < 860;
      setIsMobile(mobile);
    };

    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;

      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      });

      const mobileView = window.innerWidth < 860;
      const showCta = mobileView && y > window.innerHeight * 0.7;
      setShowStickyCta(showCta);
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    setMounted(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      if (containerRef.current && !containerRef.current.querySelector('form')) {
        containerRef.current.innerHTML = '';
        const form = document.createElement('form');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', 'pl_TRteq6nLEUBq5I');
        script.async = true;
        form.appendChild(script);
        containerRef.current.appendChild(form);
      }
      if (stickyContainerRef.current && !stickyContainerRef.current.querySelector('form')) {
        stickyContainerRef.current.innerHTML = '';
        const form = document.createElement('form');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', 'pl_TRteq6nLEUBq5I');
        script.async = true;
        form.appendChild(script);
        stickyContainerRef.current.appendChild(form);
      }
    }
  }, [mounted, showStickyCta]);

  return (
    <div style={{ background: '#14100b', color: '#eee6d8', position: 'relative' }}>

      {/* ====================== HERO (dark) ====================== */}
      <header
        id="top"
        data-nav-theme="dark"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'center' : 'flex-end',
          padding: `${isMobile ? '110px' : 'clamp(100px, 12vh, 150px)'} clamp(20px, 5vw, 72px) clamp(48px, 7vh, 88px)`,
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: '0', zIndex: 0 }}>
          <img
            src={isMobile ? "/assets/rudraksh-heroimg-mobile.png?v=1" : "/assets/rudraksha-heroimg1.png?v=5"}
            alt="Rudraksha Band Hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(circle at 75% 75%, rgba(20, 16, 11, 0) 0%, rgba(35, 25, 18, 0.3) 35%, rgba(20, 15, 10, 0.55) 70%, rgba(15, 12, 8, 0.75) 100%)' }} />
        <div data-grain style={{ position: 'absolute', inset: '-60px', zIndex: 2, pointerEvents: 'none', opacity: .07, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, animation: 'ivaGrainShift 8s steps(6) infinite alternate' }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '1000px' }}>
          <h1 data-reveal data-reveal-delay="120" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(48px, 8.5vw, 132px)', lineHeight: '.92', letterSpacing: '-.02em', margin: 0, color: '#f4ecdd' }}>
            Not just an<br />usual bracelet.
          </h1>
          <p data-reveal data-reveal-delay="260" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 2.6vw, 32px)', lineHeight: '1.3', color: '#E8CFA3', margin: '28px 0 0', maxWidth: '640px' }}>
            A little reminder of strength, stillness &amp; intention.
          </p>
          <p data-reveal data-reveal-delay="360" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.75, color: 'rgba(238, 230, 216, .8)', maxWidth: '540px', margin: '22px 0 0', fontWeight: 300 }}>
            Inspired by the timeless association of Rudraksha with Lord Shiva, the 12-Bead Rudraksha Band brings ancient symbolism into a simple, contemporary design made for everyday life.
          </p>

          <div data-reveal data-reveal-delay="480" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px 26px', marginTop: '44px' }}>
            <a
              href="#buy-section"
              onClick={handleScrollToProduct}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11.5px',
                letterSpacing: '.24em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#14100b',
                background: '#d7b06f',
                padding: '18px 34px',
                borderRadius: '2px',
                textDecoration: 'none',
                border: '1px solid #d7b06f',
                boxShadow: '0 4px 12px rgba(215, 176, 111, 0.15)',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(215, 176, 111, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(215, 176, 111, 0.15)';
              }}
            >
              <span>Buy Now</span>
              <span style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>&rarr;</span>
            </a>

            <a
              href="#philosophy"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#E8CFA3',
                padding: '18px 4px',
                textDecoration: 'none',
                transition: 'color .4s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f4ecdd'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#E8CFA3'; }}
            >
              Discover the story
              <span style={{ display: 'inline-block', marginLeft: '10px' }}>&rarr;</span>
            </a>

            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(238, 230, 216, .6)', borderLeft: '1px solid rgba(238, 230, 216, .2)', paddingLeft: '22px' }}>
              ₹499
            </span>
          </div>
        </div>

        <div data-reveal data-reveal-delay="700" style={{ position: 'absolute', bottom: '26px', right: 'clamp(20px, 5vw, 72px)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'rgba(238, 230, 216, .4)' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
          <span style={{ width: '1px', height: '44px', background: 'linear-gradient(180deg, rgba(238, 230, 216, .5), transparent)' }} />
        </div>
      </header>

      {/* ====================== PHILOSOPHY (light) ====================== */}
      <section id="philosophy" data-nav-theme="light" style={{ background: '#f4efe6', color: '#221d16', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'stretch' }}>
          <div style={{ padding: 'clamp(64px, 9vw, 140px) clamp(16px, 5vw, 90px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div data-reveal style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, color: '#A2543A', marginBottom: '26px' }}>The Philosophy</div>
            <h2 data-reveal data-reveal-delay="100" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px, 5.5vw, 84px)', lineHeight: '.98', letterSpacing: '-.02em', margin: 0, color: '#17130F' }}>
              Wear your<br />intention.
            </h2>
            <div data-reveal data-reveal-delay="220" style={{ marginTop: '34px', maxWidth: '420px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#5C5147', margin: '0 0 22px' }}>Life moves fast.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(23, 19, 15, .5)', marginBottom: '26px' }}>
                <span>Notifications</span><span>·</span><span>Deadlines</span><span>·</span><span>Decisions</span><span>·</span><span>Distractions</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '17px', lineHeight: '1.8', color: 'rgba(23, 19, 15, .75)', margin: 0, fontWeight: 300 }}>
                Sometimes, all you need is a small reminder to pause, breathe and return to what truly matters. The Rudraksha Band is designed to be that reminder.
              </p>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'min(88vh, 760px)' }}>
            <div style={{ position: 'absolute', inset: '-10% 0 -10% 0' }}>
              <img src="/assets/rudrakshaImg2.png" alt="Philosophy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SHIVA (dark) ====================== */}
      <section
        id="shiva"
        data-nav-theme="dark"
        style={{
          position: 'relative',
          background: 'radial-gradient(130% 110% at 22% 12%, #2a1e11 0%, #160f09 46%, #0c0906 100%)',
          color: '#eee6d8',
          overflow: 'hidden',
          padding: 'clamp(88px, 15vh, 190px) clamp(16px, 5vw, 90px)'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(12, 9, 6, .35) 0%, rgba(12, 9, 6, 0) 26%, rgba(12, 9, 6, 0) 74%, rgba(12, 9, 6, .85) 100%)' }} />
        <div data-grain style={{ position: 'absolute', inset: '-60px', zIndex: 2, pointerEvents: 'none', opacity: .06, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          {/* Left: Om feature */}
          <div data-reveal style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'min(58vw, 460px)' }}>
            <div data-parallax="0.1" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 46%, rgba(215, 176, 111, .34) 0%, rgba(190, 140, 70, .16) 32%, rgba(15, 12, 8, 0) 64%)', filter: 'blur(4px)', animation: 'ivaAura 11s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', width: 'min(74vw, 420px)', height: 'min(74vw, 420px)', borderRadius: '50%', border: '1px solid rgba(215, 176, 111, .22)', boxShadow: '0 0 120px rgba(215, 176, 111, .12) inset', animation: 'ivaRingPulse 13s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', width: 'min(54vw, 300px)', height: 'min(54vw, 300px)', borderRadius: '50%', border: '1px solid rgba(215, 176, 111, .15)', animation: 'ivaRingPulse 13s ease-in-out infinite', animationDelay: '-2.5s' }} />
            <div aria-hidden="true" style={{ position: 'relative', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(180px, 26vw, 340px)', lineHeight: 1, color: '#e7c78a', textShadow: '0 0 60px rgba(215, 176, 111, .45), 0 0 6px rgba(215, 176, 111, .4)', userSelect: 'none' }}>ॐ</div>
          </div>

          {/* Right: copy */}
          <div>
            <div data-reveal style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, color: '#d7b06f', marginBottom: '26px' }}>Rooted in tradition</div>
            <h2 data-reveal data-reveal-delay="120" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(42px, 6vw, 92px)', lineHeight: '.98', letterSpacing: '-.02em', margin: 0, color: '#F8F2E6' }}>
              Inspired by<br />Lord Shiva.
            </h2>
            <p data-reveal data-reveal-delay="240" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 2.2vw, 28px)', color: '#E8CFA3', margin: '24px 0 0' }}>
              Strength in stillness. Power in simplicity.
            </p>
            <p data-reveal data-reveal-delay="340" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '17px', lineHeight: 1.85, color: 'rgba(238, 230, 216, .75)', maxWidth: '52ch', margin: '28px 0 0', fontWeight: 300 }}>
              Rudraksha holds a special place in Indian spiritual traditions — a long-standing association with qualities that remain timeless: strength, discipline, stillness, transformation and inner awareness. The Band translates these into something simple enough for everyday life.
            </p>
            <div data-reveal data-reveal-delay="460" style={{ marginTop: '40px', display: 'inline-block', borderTop: '1px solid rgba(215, 176, 111, .35)', borderBottom: '1px solid rgba(215, 176, 111, .35)', padding: '20px 0' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: '1.15', letterSpacing: '.02em', color: '#f4ecdd', margin: 0, fontWeight: 300 }}>
                Inspired by tradition.<br />Designed for today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 12 BEADS — carousel (light) ====================== */}
      <section id="beads" data-nav-theme="light" style={{ background: '#ebe3d5', color: '#221d16', position: 'relative', padding: 'clamp(72px, 12vh, 150px) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 90px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '28px', marginBottom: 'clamp(38px, 6vh, 60px)' }}>
            <div>
              <div data-reveal style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, color: '#A2543A', marginBottom: '22px' }}>The 12 Beads</div>
              <h2 data-reveal data-reveal-delay="100" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px, 5vw, 72px)', lineHeight: 1, letterSpacing: '-.02em', margin: 0, color: '#17130F', maxWidth: '14ch' }}>
                12 beads. One daily reminder.
              </h2>
            </div>
            <div data-reveal data-reveal-delay="200" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', maxWidth: '300px' }}>
              {Array.from({ length: 12 }).map((_, idx) => (
                <span key={idx} style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #7a5a30, #2e2012)', boxShadow: 'inset -1px -1px 2px rgba(0,0,0,.5)' }} />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={beadtrackRef}
          data-reveal
          data-reveal-delay="160"
          data-beadtrack
          style={{
            display: 'flex',
            gap: 'clamp(18px, 2.4vw, 34px)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            padding: '4px clamp(24px, 5vw, 90px) 26px',
            scrollPaddingLeft: 'clamp(24px, 5vw, 90px)',
            scrollPaddingRight: 'clamp(24px, 5vw, 90px)',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {beadData.map((b, i) => (
            <div key={i} style={{ flex: '0 0 auto', width: 'min(80vw, 360px)', scrollSnapAlign: 'start', borderTop: '1px solid rgba(34, 29, 22, .22)', paddingTop: '26px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(60px, 8vw, 108px)', lineHeight: '.85', color: '#c9a35f', fontFeatureSettings: "'tnum'" }}>{b.n}</div>
              <div style={{ margin: '22px 0 16px' }}>{b.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '.02em', margin: '0 0 12px', color: '#17130F' }}>{b.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15.5px', lineHeight: '1.7', color: 'rgba(23, 19, 15, .7)', margin: 0, maxWidth: '32ch' }}>{b.desc}</p>
            </div>
          ))}
          <div style={{ flex: '0 0 auto', width: 'min(76vw, 340px)', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid transparent' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#5a4a30', margin: '0 0 24px', maxWidth: '20ch' }}>
              Six qualities. Worn together, every day.
            </p>
            <a
              href="#buy-section"
              onClick={handleScrollToProduct}
              style={{
                alignSelf: 'flex-start',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#17130F',
                border: '1px solid rgba(23, 19, 15, .35)',
                padding: '16px 30px',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'background .5s, color .5s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#17130F';
                e.currentTarget.style.color = '#f4efe6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#17130F';
              }}
            >
              See the band
            </a>
          </div>
        </div>

        <div style={{ maxWidth: '1240px', margin: '20px auto 0', padding: '0 clamp(24px, 5vw, 90px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(23, 19, 15, .42)' }}>
            Drag or swipe to explore
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => scrollBeads(-1)}
              aria-label="Previous"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1px solid rgba(23, 19, 15, .32)',
                background: 'transparent',
                color: '#17130F',
                cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                lineHeight: '1',
                transition: 'background .5s, color .5s, border-color .5s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#17130F';
                e.currentTarget.style.color = '#f4efe6';
                e.currentTarget.style.borderColor = '#17130F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#17130F';
                e.currentTarget.style.borderColor = 'rgba(23, 19, 15, .32)';
              }}
            >
              &larr;
            </button>
            <button
              onClick={() => scrollBeads(1)}
              aria-label="Next"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1px solid rgba(23, 19, 15, .32)',
                background: 'transparent',
                color: '#17130F',
                cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                lineHeight: '1',
                transition: 'background .5s, color .5s, border-color .5s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#17130F';
                e.currentTarget.style.color = '#f4efe6';
                e.currentTarget.style.borderColor = '#17130F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#17130F';
                e.currentTarget.style.borderColor = 'rgba(23, 19, 15, .32)';
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ====================== PRODUCT SHOWCASE (dark) ====================== */}
      <section id="product" data-nav-theme="dark" style={{ background: '#17130d', color: '#eee6d8', position: 'relative', overflow: 'hidden', padding: 'clamp(72px, 12vh, 150px) clamp(24px, 5vw, 90px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto clamp(48px, 7vh, 84px)' }}>
          <div data-reveal style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, color: '#d7b06f', marginBottom: '24px' }}>The Product</div>
          <h2 data-reveal data-reveal-delay="100" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: '.98', letterSpacing: '-.02em', margin: 0, color: '#f4ecdd' }}>
            Made for everyday wear.
          </h2>
          <p data-reveal data-reveal-delay="220" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 2.2vw, 26px)', color: '#E8CFA3', margin: '22px 0 0' }}>
            Spiritual in meaning. Minimal in design.
          </p>
        </div>

        <div data-reveal style={{ display: isMobile ? 'none' : 'block', position: 'relative', maxWidth: '1080px', margin: '0 auto', aspectRatio: '16/10', border: '6px solid rgba(238, 230, 216, .06)', outline: '1px solid rgba(215, 176, 111, .18)' }}>
          <img src="/assets/rudrakshaImg3.png" alt="Product Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          <div
            style={{
              position: 'absolute',
              left: '14%',
              top: '32%',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#f0e6d6',
              background: 'rgba(15, 12, 8, .55)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(215, 176, 111, .4)',
              padding: '9px 15px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              opacity: .82,
              cursor: 'default'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d7b06f' }} />12 Rudraksha Beads
          </div>
          <div
            style={{
              position: 'absolute',
              right: '16%',
              top: '52%',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#f0e6d6',
              background: 'rgba(15, 12, 8, .55)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(215, 176, 111, .4)',
              padding: '9px 15px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              opacity: .82,
              cursor: 'default'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d7b06f' }} />Handcrafted Detail
          </div>
          <div
            style={{
              position: 'absolute',
              left: '40%',
              bottom: '16%',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#f0e6d6',
              background: 'rgba(15, 12, 8, .55)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(215, 176, 111, .4)',
              padding: '9px 15px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              opacity: .82,
              cursor: 'default'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d7b06f' }} />Everyday-Wear Design
          </div>
        </div>

        <div data-reveal data-reveal-delay="120" style={{ maxWidth: '1080px', margin: '22px auto 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
          {['Bead Texture', 'Band on Wrist', 'Packaging Details', 'Lifestyle Mode'].map((caption, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '4/3',
                border: '1px solid rgba(238, 230, 216, .08)',
                overflow: 'hidden',
                transition: 'transform .6s',
                position: 'relative'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              <img
                src={i === 0 ? '/assets/rudrakshaImg5.png' : i === 1 ? '/assets/rudrakshaImg6.png' : i === 2 ? '/assets/rudrakshaImg7.png' : '/assets/rudrakshaImg8.png'}
                alt={caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ====================== PRODUCT CTA / PURCHASE CARD (light) ====================== */}
      <section id="buy-section" data-nav-theme="light" style={{ background: '#f4efe6', color: '#221d16', padding: 'clamp(72px, 12vh, 150px) clamp(16px, 5vw, 90px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }}>
          <div data-reveal style={{ position: 'relative', aspectRatio: '4/5', border: '6px solid #fff', outline: '1px solid rgba(34, 29, 22, .14)', boxShadow: '0 30px 70px rgba(34, 29, 22, .14)' }}>
            <img src="/assets/rudrakshaImg1.png" alt="12-Bead Rudraksha Band" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div data-reveal data-reveal-delay="140">
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#A2543A', marginBottom: '20px' }}>
              The Iva Essentials
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 64px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 8px', color: '#17130F' }}>
              Rudraksha Band
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', letterSpacing: '.06em', color: 'rgba(23, 19, 15, .55)', margin: '0 0 26px' }}>
              12-Bead Rudraksha Band
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', borderTop: '1px solid rgba(23, 19, 15, .16)', borderBottom: '1px solid rgba(23, 19, 15, .16)', padding: '20px 0', marginBottom: '28px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#17130F', fontFeatureSettings: "'tnum'" }}>
                ₹499
              </span>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(23,19,15,.6)' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(23,19,15,.2)', borderRadius: '2px' }}>
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ background: 'none', border: 0, padding: '8px 14px', cursor: 'pointer', fontSize: '16px', color: '#17130F' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600 }}>{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{ background: 'none', border: 0, padding: '8px 14px', cursor: 'pointer', fontSize: '16px', color: '#17130F' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  background: '#17130F',
                  color: '#F8F2E6',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11.5px',
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '18px 24px',
                  borderRadius: '2px',
                  border: '1px solid #17130F',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#A2543A';
                  e.currentTarget.style.borderColor = '#A2543A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#17130F';
                  e.currentTarget.style.borderColor = '#17130F';
                }}
              >
                {addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
            </div>

            {/* <div id="razorpay-container" className="checkout-payment" ref={containerRef} style={{ marginTop: '12px' }}></div> */}

            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginTop: '20px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '.04em', color: 'rgba(23, 19, 15, .55)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              Secure checkout · Ships in 2–4 business days
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', display: 'grid', gap: '10px' }}>
              <li style={{ display: 'flex', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(23, 19, 15, .75)', lineHeight: 1.5 }}>
                <span style={{ color: '#A2543A' }}>—</span>Authentic Rudraksha beads, hand-strung on a durable cord
              </li>
              <li style={{ display: 'flex', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(23, 19, 15, .75)', lineHeight: 1.5 }}>
                <span style={{ color: '#A2543A' }}>—</span>Adjustable fit for most wrists
              </li>
              <li style={{ display: 'flex', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(23, 19, 15, .75)', lineHeight: 1.5 }}>
                <span style={{ color: '#A2543A' }}>—</span>Arrives in premium gift-ready packaging
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====================== FAQ (light) ====================== */}
      <section id="faq" data-nav-theme="light" style={{ background: '#ebe3d5', color: '#221d16', padding: 'clamp(72px, 12vh, 150px) clamp(24px, 5vw, 90px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div data-reveal style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, color: '#A2543A', marginBottom: '24px' }}>Questions</div>
          <h2 data-reveal data-reveal-delay="100" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(38px, 5vw, 72px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(40px, 6vh, 64px)', color: '#17130F' }}>
            Good to know.
          </h2>
          <div data-reveal data-reveal-delay="180">
            {faqData.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(23, 19, 15, .18)' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    background: 'none',
                    border: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '26px 0',
                    color: '#17130F',
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-.01em' }}>{f.q}</span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '28px',
                      lineHeight: 1,
                      color: '#A2543A',
                      transition: 'transform .4s',
                      transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', lineHeight: 1.8, color: 'rgba(23, 19, 15, .75)', margin: 0, padding: '0 0 30px', maxWidth: '64ch', fontWeight: 300 }}>
                    {f.a}
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(23, 19, 15, .18)' }} />
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA (dark) ====================== */}
      <section data-nav-theme="dark" style={{ position: 'relative', background: '#0f0c08', color: '#eee6d8', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(80px, 14vh, 180px) clamp(24px, 5vw, 72px)' }}>
        <div data-parallax="0.16" style={{ position: 'absolute', inset: '-12% 0 -12% 0', zIndex: 0, opacity: .55 }}>
          <img src="/assets/rudrakshaImg2.png" alt="Final Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(120% 90% at 50% 50%, rgba(15, 12, 8, .45), rgba(15, 12, 8, .95))' }} />
        <div data-grain style={{ position: 'absolute', inset: '-60px', zIndex: 2, pointerEvents: 'none', opacity: .06, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px' }}>
          <h2 data-reveal style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(44px, 8vw, 120px)', lineHeight: '.94', letterSpacing: '-.02em', margin: 0, color: '#f4ecdd' }}>
            Not just an<br />usual bracelet.
          </h2>
          <p data-reveal data-reveal-delay="140" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 2.4vw, 28px)', color: '#E8CFA3', margin: '26px auto 0', maxWidth: '640px' }}>
            It's your reminder to stay grounded, focused and connected to what matters.
          </p>
          <p data-reveal data-reveal-delay="240" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(215, 176, 111, .85)', margin: '30px 0 0' }}>
            12 Rudraksha Beads · One Intention
          </p>
          <div data-reveal data-reveal-delay="360" style={{ marginTop: '44px' }}>
            <a
              href="#buy-section"
              onClick={handleScrollToProduct}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11.5px',
                letterSpacing: '.25em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#14100b',
                background: '#d7b06f',
                padding: '20px 42px',
                borderRadius: '2px',
                textDecoration: 'none',
                border: '1px solid #d7b06f',
                boxShadow: '0 4px 12px rgba(215, 176, 111, 0.15)',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(215, 176, 111, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(215, 176, 111, 0.15)';
              }}
            >
              <span>Buy Now</span>
              <span style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====================== MOBILE STICKY BUY BAR ====================== */}
      {showStickyCta && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '12px 18px calc(12px + env(safe-area-inset-bottom))', background: 'rgba(15, 12, 8, .94)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(215, 176, 111, .28)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#f4ecdd', fontFeatureSettings: "'tnum'" }}>₹499</span>
          </div>
          <div style={{ flex: 1, maxWidth: '220px' }} ref={stickyContainerRef} className="sticky-payment"></div>
        </div>
      )}

    </div>
  );
}
