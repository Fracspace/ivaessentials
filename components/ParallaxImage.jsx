'use client';

import React, { useEffect, useState } from 'react';

export default function ParallaxImage({
  src,
  alt,
  style = {},
  speed = 0.15,
  opacity = 1
}) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let request = null;

    const handleScroll = () => {
      if (request) return;
      request = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * speed);
        request = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (request) cancelAnimationFrame(request);
    };
  }, [speed]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: '-10% 0 -10% 0',
        transform: `translate3d(0, ${offsetY}px, 0)`,
        willChange: 'transform',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: opacity,
          ...style
        }}
      />
    </div>
  );
}
