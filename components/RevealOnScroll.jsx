'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  style = {},
  threshold = 0.1,
  delay = 0,
  variant = 'fade'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
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
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translateY(0) scale(1)';
    if (variant === 'fall') return 'translateY(-80px) scale(0.94)';
    if (variant === 'zoom') return 'translateY(24px) scale(1.08)';
    if (variant === 'float') return 'translateY(36px) scale(0.95)';
    return 'translateY(24px) scale(1)';
  };

  const getTransition = () => {
    if (variant === 'fall') {
      return `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1.05s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms, filter 0.8s ease ${delay}ms`;
    }
    return `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
  };

  const revealStyle = {
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : (variant === 'fall' ? 'blur(4px)' : 'none'),
    transform: getTransform(),
    transition: getTransition(),
    willChange: 'transform, opacity, filter',
    ...style
  };

  return (
    <div ref={domRef} className={className} style={revealStyle}>
      {children}
    </div>
  );
}


