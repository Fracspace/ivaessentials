'use client';

import React, { useState, useEffect } from 'react';

export default function ProductGallery({ images = [], name = 'Product' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images, isPaused]);

  if (!images || images.length === 0) return null;

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Display Container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#E3D9C8',
          aspectRatio: '4/5',
          borderRadius: '4px',
          boxShadow: '0 8px 24px rgba(23,19,15,.06)'
        }}
        className="product-gallery-main"
      >
        {/* Images with Smooth Fade */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${name} - Image ${idx + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(.25,1,.5,1), transform 0.6s cubic-bezier(.25,1,.5,1)',
              transform: idx === currentIndex ? 'scale(1)' : 'scale(1.03)',
              pointerEvents: idx === currentIndex ? 'auto' : 'none'
            }}
          />
        ))}

        {/* Navigation Arrows (Shown when multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(250,245,236,.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(177,143,82,.35)',
                color: '#17130F',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,.15)',
                transition: 'all .25s ease',
                zIndex: 4
              }}
              className="gallery-nav-btn"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(250,245,236,.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(177,143,82,.35)',
                color: '#17130F',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,.15)',
                transition: 'all .25s ease',
                zIndex: 4
              }}
              className="gallery-nav-btn"
            >
              ›
            </button>

            {/* Pagination Dots overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 4,
                padding: '6px 12px',
                background: 'rgba(20,16,13,.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '16px'
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: i === currentIndex ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: i === currentIndex ? '#E8CFA3' : 'rgba(248,242,230,.5)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all .3s ease',
                    padding: 0
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {images.map((img, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: '84px',
                  height: '84px',
                  flex: 'none',
                  border: isActive ? '2px solid #B18F52' : '1px solid rgba(23,19,15,.2)',
                  borderRadius: '3px',
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: '#E3D9C8',
                  position: 'relative',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'all .25s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(177,143,82,.25)' : 'none'
                }}
              >
                <img
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      border: '2px solid #B18F52',
                      pointerEvents: 'none',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
