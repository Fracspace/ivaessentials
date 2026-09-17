'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  soldOut = false,
  href = '/product/blessed-kit',
  category = 'kits'
}) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (soldOut) return;
    addItem({
      id,
      name,
      subtitle: description,
      price,
      quantity: 1,
      image,
      href
    });
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
              background: 'rgba(247,242,233,.92)',
              fontSize: '9.5px',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              padding: '7px 11px',
              color: '#6B5F52'
            }}
          >
            Sold out
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
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: '#A39685'
            }}
          >
            Notify me
          </span>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              marginTop: '12px',
              alignSelf: 'flex-start',
              background: 'none',
              border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #17130F',
              paddingBottom: '6px',
              color: '#17130F',
              cursor: 'pointer'
            }}
            className="add-to-cart-btn"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
