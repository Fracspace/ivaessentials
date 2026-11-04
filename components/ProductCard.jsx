'use client';

import { getProductSku } from '../lib/products';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function ProductCard({
  id,
  sku,
  name,
  description,
  price,
  image,
  soldOut = false,
  statusBadge = null,
  href = '/product/blessed-kit',
  category = 'kits'
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const resolvedSku = sku || getProductSku(id) || getProductSku(name) || '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (soldOut) return;
    addItem({
      id,
      productId: id,
      sku: resolvedSku,
      name,
      subtitle: description,
      price,
      quantity: 1,
      image,
      href
    });
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (soldOut) return;
    addItem({
      id,
      productId: id,
      sku: resolvedSku,
      name,
      subtitle: description,
      price,
      quantity: 1,
      image,
      href
    });
    router.push('/checkout');
  };

  return (
    <div className="product-card">
      <Link
        href={href}
        style={{
          display: 'block',
          overflow: 'hidden',
          background: '#E3D9C8',
          position: 'relative'
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            aspectRatio: '4/5',
            objectFit: 'cover',
            transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)'
          }}
          className="product-card-img"
        />
        {soldOut && (
          <span
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'rgba(247,242,233,.94)',
              fontSize: '9.5px',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              padding: '7px 11px',
              color: '#A2543A',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {statusBadge || 'Sold out'}
          </span>
        )}
      </Link>
      <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <Link
          href={href}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(20px,1.8vw,25px)',
            lineHeight: 1.25,
            color: '#17130F',
            textDecoration: 'none'
          }}
        >
          {name}
        </Link>
        <span style={{ fontSize: '13.5px', color: '#6B5F52', fontWeight: 300 }}>
          {description}
        </span>
        <span style={{ fontSize: '14px', marginTop: '5px' }}>₹{price}</span>
        {soldOut ? (
          <span
            style={{
              marginTop: '12px',
              fontSize: '11px',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: '#A2543A',
              fontWeight: 500
            }}
          >
            {statusBadge || 'Sold Out'}
          </span>
        ) : (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleBuyNow}
              style={{
                background: '#17130F',
                color: '#F7F2E9',
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10.5px',
                letterSpacing: '.18em',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '9px 18px',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all .25s',
                boxShadow: '0 2px 8px rgba(23,19,15,0.15)'
              }}
              className="cart-btn"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #17130F',
                paddingBottom: '4px',
                color: '#17130F',
                cursor: 'pointer'
              }}
              className="add-to-cart-btn"
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
