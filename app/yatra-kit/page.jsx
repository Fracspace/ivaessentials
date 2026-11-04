'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RevealOnScroll from '../../components/RevealOnScroll';
import ScrollBackgroundSection from '../../components/ScrollBackgroundSection';
import ParallaxImage from '../../components/ParallaxImage';
import DevotionalFrame from '../../components/DevotionalFrame';
import { IMAGES } from '../../lib/images';
import { useCart } from '../../context/CartContext';
import { fetchProductBySlugApi } from '../../lib/products';

// 8 Sacred Offerings Included in the Yatra Kit
const INCLUDED_ITEMS = [
  {
    id: 'sacred-kumkum',
    number: '01',
    name: 'Sacred Kumkum',
    subtitle: 'Divine Vermilion',
    role: 'Divine Blessing & Tilak',
    desc: 'Pure authentic red kumkum made from natural turmeric and lime, sealed in a spill-proof vial for forehead tilak and sacred temple archana.',
    container: 'Spill-Proof Twist Vial',
    highlights: ['100% Natural Turmeric Base', 'Zero Synthetic Dyes'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="#E8CFA3" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="4" fill="#E8CFA3" fillOpacity="0.85" />
        <path d="M14 1.5v3M14 23.5v3M1.5 14h3M23.5 14h3" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'pasupu',
    number: '02',
    name: 'Pasupu',
    subtitle: 'Sacred Turmeric',
    role: 'Auspicious Purity',
    desc: 'Sun-dried, finely milled golden turmeric symbolizing auspicious beginnings, sanctification, and divine grace for all holy rituals.',
    container: 'Airtight Moisture-Proof Tube',
    highlights: ['Vedic Auspicious Sanctity', 'Fragrant Salem Turmeric'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3.5c-2 3.5-5 5.5-9.5 6.5 4.5 1 7.5 3 9.5 6.5 2-3.5 5-5.5 9.5-6.5-4.5-1-7.5-3-9.5-6.5z" stroke="#E8CFA3" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="3" fill="#E8CFA3" fillOpacity="0.85" />
        <path d="M7 21l14-14M21 21L7 7" stroke="#B18F52" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'pure-cotton-wicks',
    number: '03',
    name: 'Pure Cotton Wicks',
    subtitle: 'Hand-Rolled Diya Wicks',
    role: 'Temple Deepam Flame',
    desc: 'Hand-rolled, 100% natural pure cotton wicks crafted to burn bright, steady, and smokeless in temple ghee or sesame oil deepams.',
    container: 'Crush-Proof Pocket Pod',
    highlights: ['100% Organic Hand-Drawn Cotton', 'Smokeless Clean Burn'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 16.5c0 4.418 3.582 8 8 8s8-3.582 8-8H6z" stroke="#E8CFA3" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 3.5c-2 3-3.2 5.5-1.5 8.5 2-2.5 2.5-5.5 1.5-8.5z" fill="#E8CFA3" stroke="#B18F52" strokeWidth="1" strokeLinejoin="round" />
        <path d="M10 24.5h8" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'sacred-camphor',
    number: '04',
    name: 'Sacred Camphor',
    subtitle: 'Bhimseni Karpooram',
    role: 'Mangala Aarti Offering',
    desc: 'Refined pure crystalline camphor tablets that burn completely clean without leaving ash or toxic residue, spreading holy fragrance during aarti.',
    container: 'Aroma-Sealed Twist Container',
    highlights: ['Zero Ash & Zero Residue', 'Consecrated Purification'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2.5c2.5 3.5 5 6 1 11-2.5-2.5-1.2-5-1-11z" fill="#E8CFA3" stroke="#B18F52" strokeWidth="1" strokeLinejoin="round" />
        <path d="M8 13.5h12l-2.5 6h-7l-2.5-6z" stroke="#E8CFA3" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14 19.5v5M10.5 24.5h7" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'sacred-vibuti',
    number: '05',
    name: 'Sacred Vibuti',
    subtitle: 'Consecrated Bhasma',
    role: 'Spiritual Surrender',
    desc: 'Authentic sacred ash prepared according to ancient Vedic traditions, worn on the forehead to cool the ajna chakra, quiet the mind, and invite divine presence.',
    container: 'Leak-Proof Powder Capsule',
    highlights: ['Traditional Vedic Cow Dung Ash', 'Cooling & Grounding Energy'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9.5h18M3.5 14h21M5 18.5h18" stroke="#E8CFA3" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.5" fill="#E8CFA3" stroke="#B18F52" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'divine-agarbatti',
    number: '06',
    name: 'Divine Agarbatti',
    subtitle: 'Natural Flora Incense',
    role: 'Temple Aromatherapy',
    desc: 'Slow-burning, hand-rolled incense sticks made with fragrant temple botanicals, natural tree resins, and floral oils to awaken serene contemplation.',
    container: 'Crush-Proof Slim Travel Tube',
    highlights: ['Natural Herbs & Resins', 'Charcoal & Chemical Free'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 24.5l4-12M16 24.5l-2-12" stroke="#E8CFA3" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 10.5c-1.5-2.5 1-3.5 0-6s-1.5-2.5 0-3.5" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18 10.5c-1-2 .8-3 0-5" stroke="#B18F52" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 2" />
        <ellipse cx="14" cy="24.5" rx="8" ry="2" stroke="#E8CFA3" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'sacred-chandanam',
    number: '07',
    name: 'Sacred Chandanam',
    subtitle: 'Pure Sandalwood',
    role: 'Cooling Reverence',
    desc: 'Finely ground pure sandalwood paste powder offering cooling calmness, exquisite fragrance, and sacred grace for abhishekam and tilakam.',
    container: 'Precision Screw-Cap Jar',
    highlights: ['Authentic Sandalwood Aroma', 'Deep Soothing Cooling Effect'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 15a7 7 0 0014 0H7z" stroke="#E8CFA3" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14 5.5v5M10.5 10.5h7" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="5.5" r="2" fill="#E8CFA3" stroke="#B18F52" strokeWidth="0.8" />
        <path d="M9.5 22.5h9" stroke="#B18F52" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'sacred-gangajal',
    number: '08',
    name: 'Sacred Gangajal',
    subtitle: 'Holy Ganges Water',
    role: 'Purification & Blessings',
    desc: 'Pure consecrated water from the sacred Ganges river safely sealed in a leak-proof travel vial for achamanam, temple abhishek, and home purification.',
    container: 'Zero-Leak Seal Mini Bottle',
    highlights: ['Directly From Gangotri / Haridwar', 'Triple-Sealed Leak-Proof Bottle'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 8.5h10M10.5 5h7M10.5 8.5c0 4.5-3.5 5.5-3.5 10a7 7 0 0014 0c0-4.5-3.5-5.5-3.5-10" stroke="#E8CFA3" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14 13.5c-1.2 1.2-1.8 2.3-1.8 3.5a1.8 1.8 0 003.6 0c0-1.2-.6-2.3-1.8-3.5z" fill="#E8CFA3" stroke="#B18F52" strokeWidth="0.8" />
      </svg>
    )
  }
];

export default function YatraKitPage() {
  const router = useRouter();
  const { addItem, sankalpNote } = useCart();
  const [activeItem, setActiveItem] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [stockInfo, setStockInfo] = useState({ stock: 10, isActive: true });
  const [price, setPrice] = useState(1);

  useEffect(() => {
    async function checkAvailability() {
      try {
        const live = await fetchProductBySlugApi('yatra-kit');
        if (live) {
          const liveStock = Number(live.stock || 0);
          const liveReserved = Number(live.reservedStock || 0);
          const remainingStock = Math.max(0, liveStock - liveReserved);
          const active = live.isActive !== false;
          setIsAvailable(Boolean(active && remainingStock > 0));
          setStockInfo({ stock: remainingStock, isActive: active });
          if (live.price !== undefined && live.price !== null) {
            setPrice(Number(live.price));
          }
        }
      } catch (e) {}
    }
    checkAvailability();
  }, []);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem({
      id: 'yatra-kit',
      productId: '954fcbf1-6837-4d06-91af-8e76e877dc34',
      sku: 'IVA-RIT-YAKI-546',
      name: 'yatra kit',
      subtitle: 'Travel-ready essentials',
      price: price,
      quantity: 1,
      image: IMAGES.products.yatraKit.secondaryUrl,
      href: '/product/yatra-kit',
      sankalpName: sankalpNote?.name,
      sankalpGotra: sankalpNote?.gotram || sankalpNote?.gotra
    });
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addItem({
      id: 'yatra-kit',
      productId: '954fcbf1-6837-4d06-91af-8e76e877dc34',
      sku: 'IVA-RIT-YAKI-546',
      name: 'yatra kit',
      subtitle: 'Travel-ready essentials',
      price: price,
      quantity: 1,
      image: IMAGES.products.yatraKit.secondaryUrl,
      href: '/product/yatra-kit',
      sankalpName: sankalpNote?.name,
      sankalpGotra: sankalpNote?.gotram || sankalpNote?.gotra
    });
    router.push('/checkout');
  };

  return (
    <div style={{ background: '#14100D', color: '#F8F2E6' }}>
      {/* 1. Hero Section (Dark Sanctum Theme) */}
      <section
        data-nav-theme="dark"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#14100D',
          minHeight: 'min(92vh, 880px)',
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <ParallaxImage src={IMAGES.products.yatraKit.url} alt="Yatra Kit travel arrangement" speed={0.12} opacity={0.68} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14,10,8,.94) 0%, rgba(14,10,8,.5) 55%, rgba(14,10,8,.25) 100%)',
            zIndex: 1
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(130px,17vh,210px) clamp(20px,4vw,56px) clamp(44px,7vh,80px)',
            width: '100%'
          }}
        >
          <RevealOnScroll style={{ maxWidth: '780px', paddingTop: 'clamp(16px, 2.5vh, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
              <span style={{ width: '34px', height: '1px', background: '#B18F52', display: 'block' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#D9BE8B' }}>
                Every Pilgrimage Prepared · 8 Sacred Offerings Inside
              </span>
              <span style={{ color: 'rgba(217, 190, 139, 0.4)' }}>·</span>
              {isAvailable ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#90d49f', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#90d49f' }} />
                  In Stock ({stockInfo.stock} units)
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#e89070', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e89070' }} />
                  Sold Out
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(42px,6.8vw,92px)',
                lineHeight: 1,
                color: '#F8F2E6',
                margin: '0 0 20px',
                textWrap: 'balance'
              }}
            >
              The Yatra Kit.<br />
              <em style={{ fontStyle: 'italic', color: '#E8CFA3' }}>Devotion in Motion.</em>
            </h1>

            <p
              style={{
                fontSize: 'clamp(14.5px,1.3vw,17.5px)',
                lineHeight: 1.8,
                color: 'rgba(245,238,226,.88)',
                fontWeight: 300,
                maxWidth: '54ch',
                margin: '0 0 28px',
                textWrap: 'pretty'
              }}
            >
              Compact, leak-proof, thoughtfully sized sacred essentials for temple visits, sacred darshans, and pilgrimages across India.
            </p>

            {/* Quick Sacred Offerings Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '34px',
                maxWidth: '680px'
              }}
            >
              {[
                'Sacred Kumkum',
                'Pasupu',
                'Pure Cotton Wicks',
                'Sacred Camphor',
                'Sacred Vibuti',
                'Divine Agarbatti',
                'Sacred Chandanam',
                'Sacred Gangajal'
              ].map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    letterSpacing: '.08em',
                    padding: '6px 14px',
                    borderRadius: '24px',
                    background: 'rgba(232,207,163,0.08)',
                    border: '1px solid rgba(232,207,163,0.22)',
                    color: '#E8CFA3',
                    backdropFilter: 'blur(4px)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {isAvailable ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  style={{
                    background: '#F7F2E9',
                    color: '#17130F',
                    border: 'none',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '18px 36px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'background .35s, transform .2s, box-shadow .3s',
                    boxShadow: '0 4px 18px rgba(0,0,0,.35)'
                  }}
                  className="btn-primary"
                >
                  Buy Now Directly · ₹{price}
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  style={{
                    background: 'transparent',
                    color: '#F8F2E6',
                    border: '1px solid rgba(248,242,230,.38)',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    padding: '18px 30px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all .35s'
                  }}
                >
                  Add to Cart
                </button>
                <span style={{ fontSize: '12px', color: 'rgba(232,207,163,0.75)', letterSpacing: '.1em', marginLeft: '6px' }}>
                  ₹{price} · Express Dispatched in 48h
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <button
                  type="button"
                  disabled
                  style={{
                    background: 'rgba(247,242,233,0.2)',
                    color: 'rgba(247,242,233,0.5)',
                    border: 'none',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '18px 36px',
                    borderRadius: '2px',
                    cursor: 'not-allowed'
                  }}
                >
                  Sold Out
                </button>
              </div>
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Details Grid Section (Sandalwood Warm Theme - Light Nav Theme) */}
      <ScrollBackgroundSection navTheme="light" defaultBg="#14100D" activeBg="#FAF5EC">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,130px) clamp(20px,4vw,56px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))',
              gap: 'clamp(36px,6vw,88px)',
              alignItems: 'center'
            }}
          >
            {/* Image with Brass Mandap Frame */}
            <RevealOnScroll variant="zoom" style={{ overflow: 'hidden' }}>
              <DevotionalFrame variant="brass-mandap">
                <img
                  src={IMAGES.products.yatraKit.secondaryUrl}
                  alt="Yatra Kit items detail"
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)'
                  }}
                  className="product-card-img"
                />
              </DevotionalFrame>
            </RevealOnScroll>

            {/* Product Details & Included Summary */}
            <RevealOnScroll delay={150}>
              <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#8A7B6B' }}>
                Travel-Ready Purity · Complete Set
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(30px,4.2vw,56px)',
                  lineHeight: 1.08,
                  margin: '18px 0 24px',
                  color: '#17130F'
                }}
              >
                Designed for pilgrims on the move.
              </h2>
              <p
                style={{
                  fontSize: 'clamp(14.5px,1.2vw,17px)',
                  lineHeight: 1.8,
                  color: '#5C5147',
                  fontWeight: 300,
                  margin: '0 0 26px'
                }}
              >
                Whether visiting Tirupati, Kedarnath, Varanasi, sacred kshetras, or your neighborhood temple, the Yatra Kit ensures every pure offering is in hand without mess, leaks, or hassle.
              </p>

              {/* Comprehensive Included Items Checklist */}
              <div
                style={{
                  background: 'rgba(23,19,15,0.03)',
                  border: '1px solid rgba(23,19,15,0.12)',
                  borderRadius: '3px',
                  padding: '20px 22px',
                  marginBottom: '28px'
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    color: '#A2543A',
                    fontWeight: 600,
                    marginBottom: '14px'
                  }}
                >
                  8 Sacred Offerings Included in Every Kit:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px 18px'
                  }}
                >
                  {[
                    { name: 'Sacred Kumkum', role: 'Vibrant tilak & archana' },
                    { name: 'Pasupu', role: 'Auspicious sacred turmeric' },
                    { name: 'Pure Cotton Wicks', role: 'Temple deepam batti' },
                    { name: 'Sacred Camphor', role: 'Clean-burning karpooram' },
                    { name: 'Sacred Vibuti', role: 'Consecrated Vedic bhasma' },
                    { name: 'Divine Agarbatti', role: 'Natural flora aroma' },
                    { name: 'Sacred Chandanam', role: 'Cooling pure sandalwood' },
                    { name: 'Sacred Gangajal', role: 'Holy Ganges water vial' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#2E2721',
                        lineHeight: 1.4
                      }}
                    >
                      <span style={{ color: '#B18F52', fontWeight: 'bold' }}>✓</span>
                      <div>
                        <strong style={{ color: '#17130F', fontWeight: 500 }}>{item.name}</strong>
                        <span style={{ display: 'block', fontSize: '11px', color: '#7A6E63' }}>{item.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px dashed rgba(23,19,15,0.12)',
                    fontSize: '12px',
                    color: '#655A4F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ color: '#A2543A' }}>✦</span>
                  <span>Plus leak-proof travel vials and protective carry pouch included.</span>
                </div>
              </div>

              {/* Action Buttons */}
              {isAvailable ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    style={{
                      background: '#17130F',
                      color: '#F7F2E9',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '17px 32px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all .3s',
                      boxShadow: '0 4px 14px rgba(23,19,15,.18)'
                    }}
                    className="cart-btn"
                  >
                    Buy Now Directly (₹{price})
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    style={{
                      background: 'transparent',
                      color: '#17130F',
                      border: '1px solid rgba(23,19,15,.28)',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      padding: '17px 28px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all .3s'
                    }}
                  >
                    Add to Cart
                  </button>
                  <a
                    href="#included-breakdown"
                    style={{
                      fontSize: '11.5px',
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: '#8A7B6B',
                      marginLeft: '8px',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Explore All 8 Offerings ↓
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                  <button
                    type="button"
                    disabled
                    style={{
                      background: '#D9D0C3',
                      color: '#6E6152',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.18em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '17px 32px',
                      borderRadius: '2px',
                      cursor: 'not-allowed'
                    }}
                  >
                    Sold Out
                  </button>
                </div>
              )}
            </RevealOnScroll>
          </div>
        </div>
      </ScrollBackgroundSection>

      {/* 3. Dedicated Master Showcase: What's Included in the Yatra Kit (Deep Temple Obsidian Theme) */}
      <ScrollBackgroundSection id="included-breakdown" navTheme="dark" defaultBg="#FAF5EC" activeBg="#120E0B">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(72px,12vh,140px) clamp(20px,4vw,56px)' }}>
          {/* Section Header */}
          <RevealOnScroll style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <span style={{ width: '28px', height: '1px', background: '#B18F52' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#E8CFA3' }}>
                Vedic Purity · Complete 8-Piece Travel Set
              </span>
              <span style={{ width: '28px', height: '1px', background: '#B18F52' }} />
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(34px,4.8vw,64px)',
                lineHeight: 1.05,
                color: '#F8F2E6',
                margin: '0 0 20px',
                textWrap: 'balance'
              }}
            >
              What's Included in the Yatra Kit
            </h2>

            <p
              style={{
                fontSize: 'clamp(14.5px,1.2vw,17px)',
                lineHeight: 1.8,
                color: 'rgba(248,242,230,.78)',
                fontWeight: 300,
                margin: 0,
                textWrap: 'pretty'
              }}
            >
              Every sacred offering is chosen for authentic Vedic sanctity and sealed into compact, durable, leak-proof travel packaging designed to slip effortlessly into your carry-on, backpack, or pocket.
            </p>
          </RevealOnScroll>

          {/* 8 Offerings Grid (4x2 Responsive Layout) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(20px, 2.5vw, 28px)',
              marginBottom: '60px'
            }}
          >
            {INCLUDED_ITEMS.map((item, index) => {
              const isSelected = activeItem === item.id;
              return (
                <RevealOnScroll key={item.id} delay={index * 60}>
                  <div
                    onMouseEnter={() => setActiveItem(item.id)}
                    onMouseLeave={() => setActiveItem(null)}
                    style={{
                      position: 'relative',
                      background: isSelected
                        ? 'linear-gradient(145deg, rgba(38,28,22,0.92) 0%, rgba(20,15,12,0.95) 100%)'
                        : 'rgba(255,255,255,0.025)',
                      border: isSelected
                        ? '1px solid rgba(232,207,163,0.5)'
                        : '1px solid rgba(232,207,163,0.14)',
                      borderRadius: '4px',
                      padding: 'clamp(24px, 2.6vw, 32px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '340px',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isSelected ? 'translateY(-5px)' : 'none',
                      boxShadow: isSelected
                        ? '0 16px 36px -8px rgba(0,0,0,0.55), 0 0 24px rgba(177,143,82,0.2)'
                        : '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    {/* Top Row: Number Badge and Devotional Icon */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '17px',
                            color: '#B18F52',
                            letterSpacing: '.1em',
                            fontWeight: 500
                          }}
                        >
                          {item.number}
                        </span>

                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: isSelected ? 'rgba(177,143,82,0.2)' : 'rgba(177,143,82,0.1)',
                            border: '1px solid rgba(177,143,82,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {item.icon}
                        </div>
                      </div>

                      {/* Tag / Role */}
                      <span
                        style={{
                          fontSize: '10px',
                          letterSpacing: '.22em',
                          textTransform: 'uppercase',
                          color: '#E8CFA3',
                          fontWeight: 500,
                          display: 'block',
                          marginBottom: '6px'
                        }}
                      >
                        {item.role}
                      </span>

                      {/* Item Name */}
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 400,
                          fontSize: 'clamp(22px,2vw,26px)',
                          lineHeight: 1.15,
                          color: '#F8F2E6',
                          margin: '0 0 4px'
                        }}
                      >
                        {item.name}
                      </h3>

                      {/* Subtitle / Traditional descriptor */}
                      <span
                        style={{
                          fontSize: '11.5px',
                          color: 'rgba(232,207,163,0.7)',
                          display: 'block',
                          marginBottom: '14px',
                          fontStyle: 'italic'
                        }}
                      >
                        {item.subtitle}
                      </span>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.7,
                          color: 'rgba(248,242,230,0.76)',
                          fontWeight: 300,
                          margin: '0 0 18px'
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom: Container Badge & Highlights */}
                    <div
                      style={{
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(232,207,163,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '10.5px',
                          letterSpacing: '.1em',
                          textTransform: 'uppercase',
                          color: '#D9BE8B'
                        }}
                      >
                        <span style={{ color: '#B18F52' }}>🛡️</span>
                        <span>{item.container}</span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Pilgrimage Portability Assurance Banner */}
          <RevealOnScroll>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(32,24,19,0.85) 0%, rgba(18,14,11,0.92) 100%)',
                border: '1px solid rgba(177,143,82,0.3)',
                borderRadius: '4px',
                padding: 'clamp(32px, 4vw, 44px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'clamp(24px, 3vw, 40px)',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', letterSpacing: '.3em', textTransform: 'uppercase', color: '#E8CFA3' }}>
                  The Pilgrim's Assurance
                </span>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 'clamp(24px, 2.8vw, 34px)',
                    lineHeight: 1.2,
                    color: '#F8F2E6',
                    margin: '8px 0 12px'
                  }}
                >
                  Engineered for hassle-free darshan.
                </h4>
                <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(248,242,230,0.78)', fontWeight: 300, margin: 0 }}>
                  Each vial and pod is custom-fitted with silicone leak-proof seals, preventing spills inside your bag or sacred garments while traveling by flight, train, or foot.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#F8F2E6' }}>
                  <span style={{ color: '#E8CFA3', fontSize: '15px' }}>✦</span>
                  <span><strong>100% Leak-Proof Guarantee:</strong> Gangajal &amp; powders never spill</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#F8F2E6' }}>
                  <span style={{ color: '#E8CFA3', fontSize: '15px' }}>✦</span>
                  <span><strong>Security Checkpoint Friendly:</strong> Compact &amp; transparently labeled</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#F8F2E6' }}>
                  <span style={{ color: '#E8CFA3', fontSize: '15px' }}>✦</span>
                  <span><strong>Traditional Vedic Sanctity:</strong> Free from animal fats or artificial filler</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', justifySelf: 'stretch' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', color: '#E8CFA3', lineHeight: 1 }}>
                  ₹{price}
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(248,242,230,0.6)', margin: '4px 0 16px' }}>
                  Complete 8-Piece Set
                </div>
                {isAvailable ? (
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    style={{
                      width: '100%',
                      background: '#F7F2E9',
                      color: '#17130F',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '16px 24px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all .3s',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                    }}
                    className="btn-primary"
                  >
                    Buy Now Directly
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={{
                      width: '100%',
                      background: 'rgba(247,242,233,0.2)',
                      color: 'rgba(247,242,233,0.5)',
                      border: 'none',
                      fontSize: '11px',
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '16px 24px',
                      borderRadius: '2px',
                      cursor: 'not-allowed'
                    }}
                  >
                    Sold Out
                  </button>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </ScrollBackgroundSection>

      {/* 4. Ritual Use Cases & Temple Darshan (Sandalwood Warm Theme) */}
      <ScrollBackgroundSection navTheme="light" defaultBg="#120E0B" activeBg="#FAF5EC">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(66px,11vh,130px) clamp(20px,4vw,56px)' }}>
          <RevealOnScroll style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.34em', textTransform: 'uppercase', color: '#8A7B6B' }}>
              Sacred Companion
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(32px,4.5vw,58px)',
                lineHeight: 1.08,
                margin: '16px 0 20px',
                color: '#17130F'
              }}
            >
              For Every Sacred Occasion
            </h2>
            <p style={{ fontSize: 'clamp(14.5px,1.2vw,17px)', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: 0 }}>
              Created specifically for pilgrims who wish to perform reverent prayers and offerings with authentic samagri wherever they journey.
            </p>
          </RevealOnScroll>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(20px, 3vw, 32px)'
            }}
          >
            {[
              {
                title: 'Temple Pilgrimages & Darshans',
                destinations: 'Tirupati · Kashi · Kedarnath · Madurai',
                text: 'Skip long queues for overpriced or synthetic samagri. Carry pure Kumkum, Pasupu, Chandanam, and Vibuti directly for sanctified archana and personal tilak.',
                icon: '🛕'
              },
              {
                title: 'Sacred Dips & River Snanams',
                destinations: 'Ganges · Godavari · Cauvery · Yamuna',
                text: 'Perform holy achamanam and offer deepam directly on river ghats using hand-rolled cotton wicks, pure camphor, and sacred Gangajal.',
                icon: '🌊'
              },
              {
                title: 'Travel & Hotel Altar Prayers',
                destinations: 'Business Travel · Family Journeys · Retreats',
                text: 'Set up an impromptu sacred sanctum anywhere. Light divine agarbatti and deepam in your hotel room without leaving marks or carrying bulky bags.',
                icon: '✨'
              }
            ].map((useCase, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100}>
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(23,19,15,0.08)',
                    borderRadius: '4px',
                    padding: 'clamp(26px, 3vw, 34px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.04)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '28px', display: 'block', marginBottom: '14px' }}>{useCase.icon}</span>
                    <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#A2543A', fontWeight: 600 }}>
                      {useCase.destinations}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#17130F',
                        margin: '10px 0 14px'
                      }}
                    >
                      {useCase.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0 }}>
                      {useCase.text}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </ScrollBackgroundSection>

      {/* 5. Final Bottom Purchase Section (Deep Obsidian Theme) */}
      <section
        data-nav-theme="dark"
        style={{
          background: '#14100D',
          borderTop: '1px solid rgba(177,143,82,0.2)',
          padding: 'clamp(70px,11vh,120px) clamp(20px,4vw,56px)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <span style={{ width: '28px', height: '1px', background: '#B18F52' }} />
              <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#E8CFA3' }}>
                IVA Essentials Signature Kit
              </span>
              <span style={{ width: '28px', height: '1px', background: '#B18F52' }} />
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(36px,5.2vw,70px)',
                lineHeight: 1.05,
                color: '#F8F2E6',
                margin: '0 0 20px'
              }}
            >
              Carry Devotion Wherever Your Steps Lead.
            </h2>

            <p
              style={{
                fontSize: 'clamp(14.5px,1.25vw,17.5px)',
                lineHeight: 1.8,
                color: 'rgba(248,242,230,.82)',
                fontWeight: 300,
                maxWidth: '56ch',
                margin: '0 auto 34px'
              }}
            >
              Includes Sacred Kumkum, Pasupu, Pure Cotton Wicks, Sacred Camphor, Sacred Vibuti, Divine Agarbatti, Sacred Chandanam &amp; Sacred Gangajal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {isAvailable ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    style={{
                      background: '#F7F2E9',
                      color: '#17130F',
                      border: 'none',
                      fontSize: '12px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '19px 40px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all .3s',
                      boxShadow: '0 4px 20px rgba(0,0,0,.4)'
                    }}
                    className="btn-primary"
                  >
                    Buy Now Directly · ₹{price}
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    style={{
                      background: 'transparent',
                      color: '#F8F2E6',
                      border: '1px solid rgba(248,242,230,.4)',
                      fontSize: '12px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      padding: '19px 34px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all .3s'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    disabled
                    style={{
                      background: 'rgba(247,242,233,0.2)',
                      color: 'rgba(247,242,233,0.5)',
                      border: 'none',
                      fontSize: '12px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '19px 40px',
                      borderRadius: '2px',
                      cursor: 'not-allowed'
                    }}
                  >
                    Sold Out
                  </button>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  fontSize: '11px',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,207,163,0.7)',
                  marginTop: '12px'
                }}
              >
                <span>✓ All 8 Offerings Included</span>
                <span>✓ Leak-Proof Travel Design</span>
                <span>✓ Express India Shipping</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
