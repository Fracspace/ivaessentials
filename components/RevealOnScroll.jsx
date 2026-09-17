'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  style = {},
  threshold = 0.15,
  delay = 0
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold }
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

  const revealStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
    willChange: 'opacity, transform',
    ...style
  };

  return (
    <div ref={domRef} className={className} style={revealStyle}>
      {children}
    </div>
  );
}
