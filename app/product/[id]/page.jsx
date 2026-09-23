'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../../components/RevealOnScroll';
import SankalpForm from '../../../components/SankalpForm';
import ProductGallery from '../../../components/ProductGallery';
import { IMAGES } from '../../../lib/images';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const { addItem, sankalpNote, setSankalpNote } = useCart();
  const [activeTab, setActiveTab] = useState('included');

  // Find product by id parameter
  const productData = {
    'blessed-kit': {
      name: 'Blessed Kit',
      subtitle: 'Complete ritual kit with your sankalp from Kashi.',
      price: 1499,
      images: [
        IMAGES.products.blessedKit.heroUrl,
        IMAGES.products.blessedKit.url,
        IMAGES.products.blessedKit.insideUrl
      ],
      description: 'The Blessed Kit brings the divine grace of Kashi straight to your home. Every kit includes your personalized sankalp card, offered in sacred archana near Kashi Vishwanath.',
      included: [
        'Sankalp card with your name and gotra',
        'Pure Kashi Vibhuti & Sandalwood paste',
        'Sacred Kumkum & Pasupu',
        'Natural Cotton Wicks & Pure Camphor',
        'Premium Fragrant Agarbatti',
        'Sealed Holy Gangajal',
        'Sacred Red Kalava Thread'
      ]
    },
    'yatra-kit': {
      name: 'Yatra Kit',
      subtitle: 'Travel-ready sacred essentials.',
      price: 199,
      images: [
        IMAGES.products.yatraKit.url,
        IMAGES.products.yatraKit.secondaryUrl
      ],
      description: 'The Yatra Kit is crafted for pilgrims. Leak-proof, travel-friendly containers keep your essential samagri pure and accessible wherever your journey leads.',
      included: [
        'Compact travel vibhuti container',
        'Kumkum & Pasupu travel vials',
        'Camphor tablets & wicks',
        'Travel carrying pouch'
      ]
    },
    'lakshmi-samagri': {
      name: 'Shree Mahalakshmi Pooja Samagri',
      subtitle: 'For abundance and auspiciousness.',
      price: 699,
      images: [IMAGES.products.lakshmiSamagri.url],
      description: 'Pure samagri specifically curated for Lakshmi Pooja and Friday household rituals.',
      included: [
        'Lotus seed garland (Kamal Gatta)',
        'Haldi & Kumkum',
        'Akshata & Chandanam',
        'Desi Ghee Batti'
      ]
    }
  };

  const product = productData[id] || productData['blessed-kit'];
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  const handleAddToCart = () => {
    addItem({
      id: id || 'blessed-kit',
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity: 1,
      image: selectedImg,
      href: `/product/${id || 'blessed-kit'}`,
      sankalpName: sankalpNote?.name,
      sankalpGotra: sankalpNote?.gotram,
      sankalp: sankalpNote
    });
  };

  return (
    <div style={{ background: '#F7F2E9' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(110px,13vh,140px) clamp(20px,4vw,56px) 0' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B' }}>
          <Link href="/" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: '#17130F' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px,4vh,56px) clamp(20px,4vw,56px) clamp(70px,11vh,140px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px), 1fr))', gap: 'clamp(36px,6vw,90px)', alignItems: 'start' }}>
          {/* Left Gallery (Auto-sliding Carousel) */}
          <RevealOnScroll>
            <ProductGallery images={product.images} name={product.name} />
          </RevealOnScroll>

          {/* Right Info & Sankalp Form */}
          <RevealOnScroll delay={150}>
            <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>
              IVA Essentials
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(36px,4.8vw,64px)', lineHeight: 1.05, margin: '14px 0 10px' }}>
              {product.name}
            </h1>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,2.8vw,36px)', margin: '0 0 20px', color: '#17130F' }}>
              ₹{product.price}
            </div>

            <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: '0 0 28px' }}>
              {product.description}
            </p>

            {/* Sankalp Details Form */}
            <SankalpForm style={{ marginBottom: '30px' }} />

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                style={{
                  flex: '1 1 200px',
                  background: '#17130F',
                  color: '#F7F2E9',
                  border: 'none',
                  fontSize: '12px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  padding: '18px 34px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background .3s'
                }}
                className="cart-btn"
              >
                Add to Cart · ₹{product.price}
              </button>
            </div>

            {/* Accordion tabs */}
            <div style={{ borderTop: '1px solid rgba(23,19,15,.16)' }}>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'included' ? '' : 'included')}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '18px 0', background: 'none', border: 'none', fontSize: '13px', letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '1px solid rgba(23,19,15,.16)' }}
              >
                <span>What's Included</span>
                <span>{activeTab === 'included' ? '−' : '+'}</span>
              </button>
              {activeTab === 'included' && (
                <div style={{ padding: '16px 0 24px', fontSize: '13.5px', lineHeight: 1.8, color: '#5C5147', borderBottom: '1px solid rgba(23,19,15,.16)' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {product.included.map((item, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'shipping' ? '' : 'shipping')}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '18px 0', background: 'none', border: 'none', fontSize: '13px', letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '1px solid rgba(23,19,15,.16)' }}
              >
                <span>Shipping &amp; Delivery</span>
                <span>{activeTab === 'shipping' ? '−' : '+'}</span>
              </button>
              {activeTab === 'shipping' && (
                <div style={{ padding: '16px 0 24px', fontSize: '13.5px', lineHeight: 1.8, color: '#5C5147', borderBottom: '1px solid rgba(23,19,15,.16)' }}>
                  Dispatched within 48 hours from Hyderabad. Express delivery takes 3-5 business days across India. Complimentary shipping on all orders.
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
