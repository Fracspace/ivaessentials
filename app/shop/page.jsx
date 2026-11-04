'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import ProductCard from '../../components/ProductCard';
import { fetchProductsApi } from '../../lib/products';
import { IMAGES } from '../../lib/images';

/**
 * Normalizes backend product data from GET /api/products for ProductCard
 */
function mapBackendProduct(p) {
  const slug = p.slug || p.id;
  const lowerSlug = String(slug).toLowerCase();
  const lowerName = String(p.name || '').toLowerCase();

  const isYatra = lowerSlug.includes('yatra') || lowerName.includes('yatra');
  const isRudraksha = lowerSlug.includes('rudraksha') || lowerSlug.includes('12-bead') || lowerName.includes('rudraksha');
  const isBlessed = lowerSlug.includes('blessed') || lowerName.includes('blessed');
  const isSamagri = lowerSlug.includes('samagri') || lowerSlug.includes('pooja') || lowerName.includes('samagri') || lowerName.includes('pooja') || lowerName.includes('vishnu') || lowerName.includes('laxmi');

  // Route mapping: Dedicated curated landing page for signature items, dynamic route for samagri
  let href = `/product/${slug}`;
  if (isYatra) href = '/yatra-kit';
  else if (isRudraksha) href = '/rudraksha';
  else if (isBlessed) href = '/blessed-kit';

  // Primary image extraction from Cloudinary media array with safe fallbacks
  const primaryMedia = p.media?.find((m) => m.isPrimary) || p.media?.[0];
  const image = primaryMedia?.url || (
    isRudraksha
      ? '/assets/rudrakshaImg1.png'
      : isYatra
        ? (IMAGES?.products?.yatraKit?.secondaryUrl || '/images/yatra-kit-secondary.jpg')
        : '/images/blessed-kit.jpg'
  );

  // Clean, elegant 1-sentence subtitle for luxury card layout
  let shortDesc = p.description || '';
  if (shortDesc.includes('.')) {
    const firstSentence = shortDesc.split('.')[0].trim() + '.';
    shortDesc = firstSentence.length > 115 ? shortDesc.slice(0, 110).trim() + '...' : firstSentence;
  }

  // Stock & Availability calculation
  const remainingStock = Math.max(0, Number(p.stock || 0) - Number(p.reservedStock || 0));
  const isAvailable = p.isActive !== false && remainingStock > 0;
  const statusBadge = !isAvailable ? 'Sold Out' : null;

  // Category tags for filtering tabs
  const tags = ['all'];
  if (isYatra || isRudraksha || isBlessed) tags.push('kits');
  if (isSamagri) tags.push('samagri');
  if (isAvailable) tags.push('instock');

  return {
    id: slug,
    productId: p.id,
    sku: p.sku,
    name: p.name,
    description: shortDesc,
    fullDescription: p.description,
    price: Number(p.price || 1),
    stock: remainingStock,
    soldOut: !isAvailable,
    statusBadge,
    image,
    href,
    tags
  };
}

/**
 * Custom sort priority:
 * 1st: Rudraksha Band
 * 2nd: Yatra Kit
 * 3rd: Blessed Kit
 * 4th+: Followed by other kits
 */
function getProductSortPriority(p) {
  const slug = String(p.id || p.slug || '').toLowerCase();
  const name = String(p.name || '').toLowerCase();

  // 1. Rudraksha Band
  if (slug.includes('rudraksha') || slug.includes('12-bead') || name.includes('rudraksha')) {
    return 1;
  }
  // 2. Yatra Kit
  if (slug.includes('yatra') || name.includes('yatra')) {
    return 2;
  }
  // 3. Blessed Kit
  if (slug.includes('blessed') || name.includes('blessed')) {
    return 3;
  }
  // Followed by other kits
  if (slug.includes('vinayaka') || slug.includes('ganesh') || name.includes('vinayaka') || name.includes('ganesha')) {
    return 4;
  }
  if (slug.includes('shiva') || name.includes('shiva')) {
    return 5;
  }
  if (slug.includes('vishnu') || name.includes('vishnu')) {
    return 6;
  }
  if (slug.includes('laxmi') || slug.includes('lakshmi') || name.includes('laxmi') || name.includes('lakshmi')) {
    return 7;
  }
  return 10;
}

function sortProducts(list) {
  return [...list].sort((a, b) => getProductSortPriority(a) - getProductSortPriority(b));
}

// Initial fallback catalog in specified priority order
const INITIAL_FALLBACK_PRODUCTS = [
  {
    id: '12-bead-rudraksha-band',
    sku: 'IVA-RIT-12BE-664',
    productId: 'eabdb7da-bdfe-4a48-a517-05c1144985bd',
    name: '12 Bead Rudraksha Band',
    description: 'Natural Rudraksha Hand-strung sacred daily wristband.',
    price: 1,
    image: '/assets/rudrakshaImg1.png',
    href: '/rudraksha',
    soldOut: false,
    tags: ['kits', 'instock']
  },
  {
    id: 'yatra-kit',
    sku: 'IVA-RIT-YAKI-546',
    productId: '954fcbf1-6837-4d06-91af-8e76e877dc34',
    name: 'yatra kit',
    description: 'Travel-ready essentials for a complete darshan.',
    price: 1,
    image: IMAGES?.products?.yatraKit?.secondaryUrl || '/images/yatra-kit-secondary.jpg',
    href: '/yatra-kit',
    soldOut: false,
    tags: ['kits', 'instock']
  },
  {
    id: 'blessed-kit',
    sku: 'IVA-RIT-BLKI-538',
    productId: 'c2dd34a4-a660-4329-aa3d-1a0616351bc1',
    name: 'Blessed Kit',
    description: 'Complete ritual kit with your personalized sacred sankalp.',
    price: 1,
    image: 'https://res.cloudinary.com/sqgnrpnw/image/upload/v1791782283/iva_essentials/products/zdgensba0ylzmkhcymqs.png',
    href: '/blessed-kit',
    soldOut: false,
    tags: ['kits', 'instock']
  },
  {
    id: 'vinayaka-pooja-samagri',
    sku: 'IVA-RIT-VIPO-367',
    productId: '37b0af7b-e7c1-4f16-a27e-a7336a3a4352',
    name: 'Shree Vinayaka Pooja Samagri',
    description: 'Begin well with pure authentic samagri for Ganesha pooja.',
    price: 699,
    image: 'https://res.cloudinary.com/sqgnrpnw/image/upload/v1791779120/iva_essentials/products/k3bxwsprq8abjrezlqcp.png',
    href: '/product/vinayaka-pooja-samagri',
    soldOut: false,
    tags: ['samagri', 'instock']
  },
  {
    id: 'shiva-pooja-samagri',
    sku: 'IVA-RIT-SHPO-926',
    productId: '76ac3f01-d64f-4c16-9e0e-834513144190',
    name: 'Shree Shiva Pooja Samagri',
    description: 'Pure Sacred Vibhuti, bilva and holy abhishek essentials.',
    price: 699,
    image: 'https://res.cloudinary.com/sqgnrpnw/image/upload/v1791781645/iva_essentials/products/qr5f0iixwwovmkaef8ow.png',
    href: '/product/shiva-pooja-samagri',
    soldOut: false,
    tags: ['samagri', 'instock']
  },
  {
    id: 'shree-vishnu-pooja-samagri',
    sku: 'IVA-RIT-VISH-269',
    productId: '748a74c6-f26e-4225-98f6-1e92a557c981',
    name: 'Shree Vishnu Pooja Samagri',
    description: 'Seek the divine blessings of Lord Vishnu, the preserver of the universe.',
    price: 699,
    image: 'https://res.cloudinary.com/sqgnrpnw/image/upload/v1793356662/iva_essentials/products/q0ux8p0uktkp6buwtccw.png',
    href: '/product/shree-vishnu-pooja-samagri',
    soldOut: false,
    tags: ['samagri', 'instock']
  },
  {
    id: 'shree-mahalaxmi-pooja-samagri',
    sku: 'IVA-RIT-SHMA-679',
    productId: '2982c9d6-5eb2-4e24-8a1d-927a8a7e8c06',
    name: 'Shree Mahalaxmi Pooja Samagri',
    description: 'Invite divine blessings of wealth, prosperity, and happiness into your home.',
    price: 699,
    image: 'https://res.cloudinary.com/sqgnrpnw/image/upload/v1793350606/iva_essentials/products/hpgd11l4ie3cvd6vxim6.png',
    href: '/product/shree-mahalaxmi-pooja-samagri',
    soldOut: false,
    tags: ['samagri', 'instock']
  }
];

export default function ShopPage() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState(INITIAL_FALLBACK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real-time products from production backend API
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const backendProducts = await fetchProductsApi();
        if (isMounted && backendProducts && backendProducts.length > 0) {
          const mapped = backendProducts.map(mapBackendProduct);
          const sorted = sortProducts(mapped);
          setProducts(sorted);
        }
      } catch (err) {
        console.error('Failed to load products from API:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return p.tags?.includes(filter);
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
              { label: 'Yatra Kits', key: 'kits' },
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
            <RevealOnScroll key={p.id || p.productId || idx} delay={idx * 60}>
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
              href="/yatra-kit"
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
              The Yatra Kit
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
