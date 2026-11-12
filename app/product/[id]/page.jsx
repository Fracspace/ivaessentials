'use client';

import { getProductSku, fetchProductBySlugApi } from '../../../lib/products';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../../components/RevealOnScroll';
import SankalpForm from '../../../components/SankalpForm';
import ProductGallery from '../../../components/ProductGallery';
import { IMAGES } from '../../../lib/images';
import { useCart } from '../../../context/CartContext';
import { useParams, useRouter, redirect } from 'next/navigation';
import { trackViewItem } from '../../../lib/gtm';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const routeParams = useParams();
  const id = routeParams?.id || params?.id;

  if (id === 'blessed-kit') {
    redirect('/shop');
  }

  const { addItem, sankalpNote } = useCart();
  const [activeTab, setActiveTab] = useState('included');

  // Find product by id parameter
  const productData = {
    'blessed-kit': {
      productId: 'c2dd34a4-a660-4329-aa3d-1a0616351bc1',
      sku: 'IVA-RIT-BLKI-538',
      name: 'Blessed Kit',
      subtitle: 'Complete ritual kit for your sacred devotion.',
      price: 1,
      images: [
        IMAGES.products.blessedKit.heroUrl,
        IMAGES.products.blessedKit.url,
        IMAGES.products.blessedKit.insideUrl
      ],
      description: 'The Blessed Kit brings sacred rituals and pure devotion straight to your home. Every kit includes your personalized sankalp card, prepared with reverence.',
      included: [
        'Sankalp card with your name and gotra',
        'Pure Sacred Vibhuti & Sandalwood paste',
        'Sacred Kumkum & Pasupu',
        'Natural Cotton Wicks & Pure Camphor',
        'Premium Fragrant Agarbatti',
        'Sealed Holy Gangajal',
        'Sacred Red Kalava Thread'
      ],
      hasSankalp: true
    },
    'yatra-kit': {
      productId: '954fcbf1-6837-4d06-91af-8e76e877dc34',
      sku: 'IVA-RIT-YAKI-546',
      name: 'yatra kit',
      subtitle: 'Travel-ready sacred essentials.',
      price: 1,
      images: [
        IMAGES.products.yatraKit.url,
        IMAGES.products.yatraKit.secondaryUrl
      ],
      description: 'The Yatra Kit is crafted for pilgrims. Leak-proof, travel-friendly containers keep your essential samagri pure and accessible wherever your journey leads.',
      included: [
        'Sacred Kumkum (traditional red vermilion)',
        'Pasupu (auspicious sacred turmeric)',
        'Pure Cotton Wicks (for temple deepams)',
        'Sacred Camphor (pure white karpooram)',
        'Sacred Vibhuti (consecrated sacred ash)',
        'Divine Agarbatti (natural flora incense)',
        'Sacred Chandanam (aromatic sandalwood)',
        'Sacred Gangajal (holy Ganges water in leak-proof vial)',
        'Durable leak-proof travel packaging & protective pouch'
      ],
      hasSankalp: false
    },
    'shiva-pooja-samagri': {
      productId: '76ac3f01-d64f-4c16-9e0e-834513144190',
      sku: 'IVA-RIT-SHPO-926',
      name: 'Shiva Pooja Samagri',
      subtitle: 'Vibhuti, bilva and abhishek essentials.',
      price: 699,
      images: [IMAGES.products.shivaSamagri?.url || '/images/shiva-kit.jpg'],
      description: 'Pure samagri specifically curated for Shiva pooja and sacred abhishek offerings.',
      included: [
        'Pure Sacred Vibhuti & Bilva patra',
        'Sacred Chandanam',
        'Natural Cotton wicks & Pure Camphor',
        'Fragrant Agarbatti'
      ],
      hasSankalp: false
    },
    'shiva-samagri': {
      productId: '76ac3f01-d64f-4c16-9e0e-834513144190',
      sku: 'IVA-RIT-SHPO-926',
      name: 'Shiva Pooja Samagri',
      subtitle: 'Vibhuti, bilva and abhishek essentials.',
      price: 699,
      images: [IMAGES.products.shivaSamagri?.url || '/images/shiva-kit.jpg'],
      description: 'Pure samagri specifically curated for Shiva pooja and sacred abhishek offerings.',
      included: [
        'Pure Sacred Vibhuti & Bilva patra',
        'Sacred Chandanam',
        'Natural Cotton wicks & Pure Camphor',
        'Fragrant Agarbatti'
      ],
      hasSankalp: false
    },
    'vinayaka-pooja-samagri': {
      productId: '37b0af7b-e7c1-4f16-a27e-a7336a3a4352',
      sku: 'IVA-RIT-VIPO-367',
      name: 'Vinayaka Pooja Samagri',
      subtitle: 'Begin well with pure authentic samagri for Ganesha pooja.',
      price: 699,
      images: [IMAGES.products.ganeshSamagri?.url || '/images/ganesh-kit.jpg'],
      description: 'Authentic offerings to invoke Lord Ganesha before commencing any sacred endeavor.',
      included: [
        'Durva grass blend',
        'Sindoor & Sacred Haldi',
        'Pure Chandanam',
        'Camphor & Natural Agarbatti'
      ],
      hasSankalp: false
    },
    'ganesh-samagri': {
      productId: '37b0af7b-e7c1-4f16-a27e-a7336a3a4352',
      sku: 'IVA-RIT-VIPO-367',
      name: 'Vinayaka Pooja Samagri',
      subtitle: 'Begin well with pure authentic samagri for Ganesha pooja.',
      price: 699,
      images: [IMAGES.products.ganeshSamagri?.url || '/images/ganesh-kit.jpg'],
      description: 'Authentic offerings to invoke Lord Ganesha before commencing any sacred endeavor.',
      included: [
        'Durva grass blend',
        'Sindoor & Sacred Haldi',
        'Pure Chandanam',
        'Camphor & Natural Agarbatti'
      ],
      hasSankalp: false
    },
    '12-bead-rudraksha-band': {
      productId: 'eabdb7da-bdfe-4a48-a517-05c1144985bd',
      sku: 'IVA-RIT-12BE-664',
      name: '12 Bead Rudraksha Band',
      subtitle: 'Natural Rudraksha Hand-strung sacred daily wristband.',
      price: 1299,
      images: ['/assets/rudrakshaImg1.png'],
      description: 'Sacred 12-bead wristband hand-crafted from natural five-mukhi Rudraksha beads.',
      included: [
        '12 Natural Panchamukhi Rudraksha beads',
        'Hand-strung durable sacred cord',
        'Certificate of authenticity'
      ],
      hasSankalp: false
    },
    'shree-vishnu-pooja-samagri': {
      productId: '748a74c6-f26e-4225-98f6-1e92a557c981',
      sku: 'IVA-RIT-VISH-269',
      name: 'Shree Vishnu Pooja Samagri',
      subtitle: 'Seek divine blessings of Lord Vishnu for harmony and balance.',
      price: 699,
      images: ['https://res.cloudinary.com/sqgnrpnw/image/upload/v1793356662/iva_essentials/products/q0ux8p0uktkp6buwtccw.png'],
      description: 'Seek the divine blessings of Lord Vishnu, the preserver of the universe, with this thoughtfully curated Vishnu Pooja Kit. Ideal for maintaining harmony, protection, and spiritual balance in life, this kit contains all essential items for performing traditional Vishnu pooja rituals.',
      included: [
        'Pure Sacred Chandanam & Haldi',
        'Natural Cotton Wicks & Pure Camphor',
        'Premium Agarbatti',
        'Sacred Kalava & Akshat'
      ],
      hasSankalp: false
    },
    'shree-mahalaxmi-pooja-samagri': {
      productId: '2982c9d6-5eb2-4e24-8a1d-927a8a7e8c06',
      sku: 'IVA-RIT-SHMA-679',
      name: 'Shree Mahalaxmi Pooja Samagri',
      subtitle: 'Invite divine blessings of wealth, prosperity, and happiness.',
      price: 699,
      images: ['https://res.cloudinary.com/sqgnrpnw/image/upload/v1793350606/iva_essentials/products/hpgd11l4ie3cvd6vxim6.png'],
      description: 'Invite divine blessings of wealth, prosperity, and happiness into your home with our thoughtfully curated Lakshmi Pooja Kit. Perfect for performing traditional rituals with ease, this kit includes all the essential items required to worship Goddess Lakshmi with devotion and purity.',
      included: [
        'Pure Kumkum & Sacred Turmeric',
        'Lotus Seed & Akshat offerings',
        'Pure Cow Ghee Deepam Wicks',
        'Aromatic Flora Agarbatti & Camphor'
      ],
      hasSankalp: false
    }
  };

  const isInitiallyInactive = Boolean(id?.includes('vishnu') || id?.includes('mahalaxmi'));
  const initialProduct = productData[id] || productData['yatra-kit'];
  const [product, setProduct] = useState(initialProduct);
  const [selectedImg, setSelectedImg] = useState(initialProduct.images[0]);
  const [isAvailable, setIsAvailable] = useState(!isInitiallyInactive);
  const [stockStatus, setStockStatus] = useState({
    stock: 10,
    reservedStock: 0,
    availableStock: 10,
    isActive: !isInitiallyInactive,
    isAvailable: !isInitiallyInactive,
    checkedLive: false
  });

  // Fetch real-time live product data and components from backend API
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicProduct() {
      if (!id) return;
      try {
        const live = await fetchProductBySlugApi(id);
        if (isMounted && live) {
          const liveImages = live.media?.map((m) => m.url).filter(Boolean) || [];
          const defaultImgs = productData[id]?.images || ['/images/blessed-kit.jpg'];
          const finalImages = liveImages.length ? liveImages : defaultImgs;

          const componentsList = Array.isArray(live.components) && live.components.length > 0
            ? live.components.map((c) => `${c.name} (${c.quantity} ${c.unit || 'pcs'})`)
            : (productData[id]?.included || ['Essential Sacred Pooja Samagri', 'Pure Natural Ingredients', 'Hand-packed with care']);

          const liveStock = Number(live.stock || 0);
          const liveReserved = Number(live.reservedStock || 0);
          const remainingStock = Math.max(0, liveStock - liveReserved);
          const activeStatus = live.isActive !== false;
          const available = Boolean(activeStatus && remainingStock > 0);

          setIsAvailable(available);
          setStockStatus({
            stock: liveStock,
            reservedStock: liveReserved,
            availableStock: remainingStock,
            isActive: activeStatus,
            isAvailable: available,
            checkedLive: true
          });

          setProduct((prev) => ({
            ...prev,
            productId: live.id,
            sku: live.sku,
            name: live.name,
            price: Number(live.price || prev.price || 1),
            description: live.description || prev.description,
            images: finalImages,
            included: componentsList,
            isActive: activeStatus,
            stock: remainingStock,
            isAvailable: available
          }));
          if (finalImages[0]) setSelectedImg(finalImages[0]);
        }
      } catch (err) {
        console.warn('Could not fetch live product details:', err);
      }
    }
    loadDynamicProduct();
    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    if (product?.images?.length && !product.images.includes(selectedImg)) {
      setSelectedImg(product.images[0]);
    }
  }, [id, product, selectedImg]);

  useEffect(() => {
    trackViewItem({
      id: id || 'yatra-kit',
      name: product.name,
      price: product.price
    });
  }, [id, product]);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem({
      id: id || 'yatra-kit',
      productId: product.productId || id || 'yatra-kit',
      sku: product.sku || getProductSku(id) || 'IVA-RIT-YAKI-546',
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity: 1,
      image: selectedImg || product.images[0],
      href: `/product/${id || 'yatra-kit'}`,
      ...(product.hasSankalp ? {
        sankalpName: sankalpNote?.name,
        sankalpGotra: sankalpNote?.gotram,
        sankalp: sankalpNote
      } : {})
    });
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addItem({
      id: id || 'yatra-kit',
      productId: product.productId || id || 'yatra-kit',
      sku: product.sku || getProductSku(id) || 'IVA-RIT-YAKI-546',
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity: 1,
      image: selectedImg || product.images[0],
      href: `/product/${id || 'yatra-kit'}`,
      ...(product.hasSankalp ? {
        sankalpName: sankalpNote?.name,
        sankalpGotra: sankalpNote?.gotram,
        sankalp: sankalpNote
      } : {})
    });
    router.push('/checkout');
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '10.5px', letterSpacing: '.32em', textTransform: 'uppercase', color: '#A2543A' }}>
                IVA Essentials
              </span>
              <span style={{ color: '#D0C6B8' }}>·</span>
              {isAvailable ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#2E5A36', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E5A36' }} />
                  In Stock &amp; Ready to Ship
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#A2543A', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A2543A' }} />
                  Sold Out
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(36px,4.8vw,64px)', lineHeight: 1.05, margin: '14px 0 10px' }}>
              {product.name}
            </h1>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,2.8vw,36px)', margin: '0 0 20px', color: '#17130F' }}>
              ₹{product.price}
            </div>

            <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: '#5C5147', fontWeight: 300, margin: '0 0 28px' }}>
              {product.description}
            </p>

            {/* Sankalp Details Form - Only for Blessed Kit */}
            {product.hasSankalp && isAvailable && (
              <SankalpForm style={{ marginBottom: '30px' }} />
            )}

            {/* Actions */}
            {isAvailable ? (
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  style={{
                    flex: '1 1 200px',
                    background: '#17130F',
                    color: '#F7F2E9',
                    border: 'none',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '18px 34px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'background .3s',
                    boxShadow: '0 4px 14px rgba(23,19,15,.15)'
                  }}
                  className="cart-btn"
                >
                  Buy Now Directly · ₹{product.price}
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  style={{
                    flex: '1 1 170px',
                    background: 'transparent',
                    color: '#17130F',
                    border: '1px solid rgba(23,19,15,.3)',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    padding: '18px 30px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all .3s'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <button
                  type="button"
                  disabled
                  style={{
                    flex: '1 1 200px',
                    maxWidth: '320px',
                    background: '#D9D0C3',
                    color: '#6E6152',
                    border: 'none',
                    fontSize: '11.5px',
                    letterSpacing: '.18em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '18px 34px',
                    borderRadius: '2px',
                    cursor: 'not-allowed',
                    opacity: 0.85
                  }}
                >
                  Sold Out
                </button>
              </div>
            )}

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
