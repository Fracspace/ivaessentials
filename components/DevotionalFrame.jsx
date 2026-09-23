'use client';

import React from 'react';

/**
 * Reusable Devotional Frame Component
 * Renders authentic vector SVG filigree corners and temple architecture frames.
 * No emoji icons used — 100% clean SVG vector craftsmanship.
 */
export default function DevotionalFrame({
  children,
  variant = 'brass-mandap', // 'brass-mandap' | 'temple-arch' | 'sanctum-ivory'
  style = {},
  className = ''
}) {
  // Corner SVG Filigree Pattern (Pure Gold Vector Lineart)
  const FiligreeCorner = ({ position }) => {
    const isTop = position.includes('top');
    const isLeft = position.includes('left');

    const transformStyle = `${isTop ? '' : 'scaleY(-1)'} ${isLeft ? '' : 'scaleX(-1)'}`;

    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: isTop ? '6px' : 'auto',
          bottom: isTop ? 'auto' : '6px',
          left: isLeft ? '6px' : 'auto',
          right: isLeft ? 'auto' : '6px',
          transform: transformStyle,
          zIndex: 4,
          pointerEvents: 'none'
        }}
      >
        <path
          d="M2 2H12C16 2 18 4 18 8V18"
          stroke="#E8CFA3"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M2 6H8C11 6 12 7 12 10V16"
          stroke="#B18F52"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <circle cx="4" cy="4" r="1.5" fill="#E8CFA3" />
      </svg>
    );
  };

  // Top Apex Vector Crest (Lotus Vector Motif)
  const VectorLotusCrest = () => (
    <div style={{
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 5,
      background: '#1C1410',
      padding: '0 10px',
      borderRadius: '12px',
      border: '1px solid #B18F52',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="22" height="14" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C13.5 5 16 7 19 8C16 9 14 11.5 12 15C10 11.5 8 9 5 8C8 7 10.5 5 12 2Z"
          fill="#E8CFA3"
          stroke="#B18F52"
          strokeWidth="0.8"
        />
        <path
          d="M12 6C13 8 14.5 9 17 9.5C14.5 10 13 11 12 13C11 11 9.5 10 7 9.5C9.5 9 11 8 12 6Z"
          fill="#B18F52"
        />
      </svg>
    </div>
  );

  if (variant === 'temple-arch') {
    return (
      <div
        style={{
          position: 'relative',
          borderRadius: '120px 120px 4px 4px',
          padding: '8px',
          background: 'linear-gradient(180deg, rgba(177,143,82,0.4) 0%, rgba(20,16,13,0.9) 100%)',
          border: '1px solid rgba(232,207,163,0.5)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
          overflow: 'hidden',
          ...style
        }}
        className={className}
      >
        <div style={{
          position: 'relative',
          borderRadius: '114px 114px 2px 2px',
          overflow: 'hidden',
          border: '1px solid rgba(177,143,82,0.3)'
        }}>
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'sanctum-ivory') {
    return (
      <div
        style={{
          position: 'relative',
          borderRadius: '4px',
          padding: '6px',
          background: '#F7F2E9',
          border: '2px solid #A2543A',
          boxShadow: '0 12px 32px rgba(23,19,15,0.08)',
          ...style
        }}
        className={className}
      >
        <FiligreeCorner position="top-left" />
        <FiligreeCorner position="top-right" />
        <FiligreeCorner position="bottom-left" />
        <FiligreeCorner position="bottom-right" />

        <div style={{
          position: 'relative',
          borderRadius: '2px',
          overflow: 'hidden',
          border: '1px solid rgba(162,84,58,0.25)'
        }}>
          {children}
        </div>
      </div>
    );
  }

  // Default: 'brass-mandap'
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '4px',
        padding: '7px',
        background: '#1C1410',
        border: '1px solid #B18F52',
        boxShadow: '0 18px 44px rgba(0,0,0,0.55), 0 2px 10px rgba(177,143,82,0.18)',
        ...style
      }}
      className={className}
    >
      <VectorLotusCrest />

      <FiligreeCorner position="top-left" />
      <FiligreeCorner position="top-right" />
      <FiligreeCorner position="bottom-left" />
      <FiligreeCorner position="bottom-right" />

      {/* Inner Inset Border */}
      <div style={{
        position: 'relative',
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1px solid rgba(232,207,163,0.3)'
      }}>
        {children}
      </div>
    </div>
  );
}
