'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  style = {},
  threshold = 0.05,
  delay = 0
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // Immediate mount fallback to ensure zero blank content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold, rootMargin: '100px 0px 100px 0px' }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      clearTimeout(timer);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  const revealStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
    ...style
  };

  return (
    <div ref={domRef} className={className} style={revealStyle}>
      {children}
    </div>
  );
}
