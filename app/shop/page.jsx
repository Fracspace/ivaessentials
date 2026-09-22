'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import ProductCard from '../../components/ProductCard';
import { IMAGES } from '../../lib/images';

export default function ShopPage() {
  const [filter, setFilter] = useState('all');

  const products = [
    {
      id: 'blessed-kit',
      name: 'Blessed Kit',
      description: 'Complete ritual kit with your sankalp from Kashi.',
      price: 1499,
      image: IMAGES.products.blessedKit.heroUrl,
      href: '/product/blessed-kit',
      soldOut: false,
      tags: ['kits', 'instock']
    },
    {
      id: 'yatra-kit',
      name: 'Yatra Kit',
      description: 'Travel-ready essentials for a complete darshan.',
      price: 199,
      image: IMAGES.products.yatraKit.secondaryUrl,
      href: '/product/yatra-kit',
      soldOut: false,
      tags: ['kits', 'instock']
    },
    {
      id: 'lakshmi-samagri',
      name: 'Shree Mahalakshmi Pooja Samagri',
      description: 'For abundance — pure samagri for Lakshmi pooja.',
      price: 699,
      image: IMAGES.products.lakshmiSamagri.url,
      href: '/product/lakshmi-samagri',
      soldOut: true,
      tags: ['samagri']
    },
    {
      id: 'shiva-samagri',
      name: 'Shree Shiva Pooja Samagri',
      description: 'Vibhuti, bilva and abhishek essentials.',
      price: 699,
      image: IMAGES.products.shivaSamagri.url,
      href: '/product/shiva-samagri',
      soldOut: true,
      tags: ['samagri']
    },
    {
      id: 'ganesh-samagri',
      name: 'Shree Vinayaka Pooja Samagri',
      description: 'Begin well — samagri for Ganesha pooja.',
      price: 699,
      image: IMAGES.products.ganeshSamagri.url,
      href: '/product/ganesh-samagri',
      soldOut: true,
      tags: ['samagri']
    },
    {
      id: 'vishnu-samagri',
      name: 'Shree Vishnu Pooja Samagri',
      description: 'Tulsi, chandanam and offerings for satyanarayana.',
      price: 699,
      image: IMAGES.products.vishnuSamagri.url,
      href: '/product/vishnu-samagri',
      soldOut: true,
      tags: ['samagri']
    }
  ];

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    return p.tags.includes(filter);
  });

  return (
    <div style={{ background: '#F7F2E9' }}>
      {/* Header Breadcrumbs */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(30px,5vh,56px)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: 'clamp(28px,4vh,48px)' }}>
          <Link href="/" style={{ color: '#8A7B6B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#17130F' }}>Shop</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))', gap: 'clamp(28px,5vw,80px)', alignItems: 'end' }}>
          <RevealOnScroll>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px,6.4vw,86px)', lineHeight: 1, margin: '0 0 22px' }}>
              The Collection
            </h1>
            <p style={{ fontSize: 'clamp(14.5px,1.2vw,17px)', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, maxWidth: '46ch', margin: 0, textWrap: 'pretty' }}>
              Complete kits and sacred essentials, assembled by hand. Pure samagri, honest materials — nothing missing, nothing superfluous.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={150} style={{ justifySelf: 'end', textAlign: 'right' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3vw,42px)', lineHeight: 1 }}>
              {filteredProducts.length < 10 ? `0${filteredProducts.length}` : filteredProducts.length}
            </div>
            <div style={{ fontSize: '10.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A7B6B', marginTop: '6px' }}>
              Products
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px,4vw,56px) clamp(70px,11vh,140px)' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderTop: '1px solid rgba(23,19,15,.14)', borderBottom: '1px solid rgba(23,19,15,.14)', marginBottom: 'clamp(30px,5vh,58px)' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'All', key: 'all' },
              { label: 'Blessed & Yatra Kits', key: 'kits' },
              { label: 'Pooja Samagri', key: 'samagri' },
              { label: 'Available now', key: 'instock' }
            ].map(tab => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  style={{
                    background: active ? '#17130F' : 'transparent',
                    color: active ? '#F7F2E9' : '#5C5147',
                    border: active ? '1px solid #17130F' : '1px solid rgba(23,19,15,.2)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10.5px',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    padding: '11px 18px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all .3s'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div style={{ fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#8A7B6B' }}>
            {filteredProducts.length} of {products.length} shown
          </div>
        </div>

        {/* Product Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px), 1fr))', gap: 'clamp(26px,3.6vw,56px)' }}>
          {filteredProducts.map((p, idx) => (
            <RevealOnScroll key={p.id} delay={idx * 80}>
              <ProductCard {...p} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Need Help Banner */}
        <RevealOnScroll style={{ marginTop: 'clamp(56px,9vh,110px)', padding: 'clamp(34px,5vw,64px)', background: '#EFE7DA', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px), 1fr))', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.12, margin: '0 0 14px' }}>
              Not sure where to begin?
            </h3>
            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#5C5147', fontWeight: 300, margin: 0, maxWidth: '44ch' }}>
              Tell us the occasion and the deity, and we'll suggest the kit that fits your ritual.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifySelf: 'end' }}>
            <Link
              href="/contact"
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '17px 32px',
                borderRadius: '2px',
                transition: 'background .3s',
                textDecoration: 'none'
              }}
              className="cart-btn"
            >
              Ask us
            </Link>
            <Link
              href="/blessed-kit"
              style={{
                border: '1px solid rgba(23,19,15,.25)',
                color: '#17130F',
                fontSize: '11.5px',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                padding: '17px 32px',
                borderRadius: '2px',
                transition: 'border-color .3s',
                textDecoration: 'none'
              }}
            >
              The Blessed Kit
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
