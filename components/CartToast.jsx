'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartToast() {
  const { toast, hideToast, sankalpNote } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (toast?.visible) {
      setIsClosing(false);
      const timer = setTimeout(() => {
        handleDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast?.visible, toast?.item]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      hideToast();
      setIsClosing(false);
    }, 300); // match fade-out animation duration
  };

  if (!toast?.visible || !toast?.item) return null;

  const { item } = toast;
  // Use item specific sankalp details or fall back to context sankalpNote
  const devName = item.sankalpName || sankalpNote?.name;
  const devGotra = item.sankalpGotra || sankalpNote?.gotra;
  const hasSankalp = Boolean(devName && devName.trim());

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        maxWidth: '440px',
        width: 'calc(100vw - 32px)',
        background: '#FAF7F2',
        color: '#17130F',
        borderRadius: '8px',
        boxShadow: '0 20px 48px -8px rgba(23,19,15,0.28), 0 0 0 1px rgba(177,143,82,0.35)',
        padding: '18px 20px 14px',
        animation: isClosing
          ? 'toastSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          : 'toastSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden'
      }}
    >
      <style jsx global>{`
        @keyframes toastSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-24px) scale(0.92);
            box-shadow: 0 0 0 rgba(177,143,82,0);
          }
          60% {
            transform: translateY(4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            box-shadow: 0 20px 48px -8px rgba(23,19,15,0.28), 0 0 0 1px rgba(177,143,82,0.35);
          }
        }

        @keyframes toastSlideOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.94);
          }
        }

        @keyframes toastProgress {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>

      {/* Header with success checkmark and close button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2E5A36 0%, #1E3D24 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 'bold',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(46,90,54,0.3)'
            }}
          >
            ✓
          </div>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#2E5A36', letterSpacing: '.02em' }}>
            Product added to cart successfully!
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: '#8A7B6B',
            cursor: 'pointer',
            padding: '2px 6px',
            lineHeight: 1,
            transition: 'color 0.2s'
          }}
        >
          ✕
        </button>
      </div>

      {/* Item summary */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '10px 0 12px', borderTop: '1px solid rgba(23,19,15,0.08)', borderBottom: '1px solid rgba(23,19,15,0.08)', marginBottom: '12px' }}>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '56px',
              height: '56px',
              objectFit: 'cover',
              borderRadius: '4px',
              background: '#E7DDCD',
              flexShrink: 0,
              border: '1px solid rgba(23,19,15,0.1)'
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: '#17130F', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.name}
          </div>
          {item.subtitle && (
            <div style={{ fontSize: '12px', color: '#6B5F52', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.subtitle}
            </div>
          )}
          <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#17130F', marginTop: '4px' }}>
            ₹{item.price} {item.quantity > 1 ? `× ${item.quantity}` : ''}
          </div>
        </div>
      </div>

      {/* Sankalp / Custom Engraving confirmation badge */}
      {hasSankalp && (
        <div
          style={{
            background: '#EFE7DA',
            borderLeft: '3px solid #B18F52',
            padding: '8px 12px',
            borderRadius: '0 4px 4px 0',
            marginBottom: '12px',
            fontSize: '12px',
            color: '#4A3E31',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '14px' }}>📿</span>
          <div>
            <strong style={{ color: '#17130F', fontWeight: 600 }}>Included Sankalp Card:</strong>{' '}
            {devName} {devGotra ? `(Gotra: ${devGotra})` : ''}
          </div>
        </div>
      )}

      {/* Actions: View Cart & Checkout */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Link
          href="/cart"
          onClick={handleDismiss}
          style={{
            flex: 1,
            textAlign: 'center',
            background: '#17130F',
            color: '#F7F2E9',
            fontSize: '11px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            padding: '11px 16px',
            borderRadius: '2px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background 0.2s'
          }}
        >
          View Cart
        </Link>
        <Link
          href="/checkout"
          onClick={handleDismiss}
          style={{
            flex: 1,
            textAlign: 'center',
            background: '#B18F52',
            color: '#FFFFFF',
            fontSize: '11px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            padding: '11px 16px',
            borderRadius: '2px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background 0.2s'
          }}
        >
          Checkout
        </Link>
      </div>

      {/* Progress timer bar */}
      <div
        style={{
          height: '3px',
          background: 'rgba(23,19,15,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
          margin: '0 -20px -14px -20px'
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #B18F52 0%, #2E5A36 100%)',
            animation: 'toastProgress 4s linear forwards'
          }}
        />
      </div>
    </div>
  );
}
