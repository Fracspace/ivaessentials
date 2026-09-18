'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollBackgroundSection({
  children,
  defaultBg = '#F7F2E9',
  activeBg = '#FAF5EC',
  navTheme = 'light',
  id,
  style = {},
  className = ''
}) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-nav-theme={navTheme}
      className={`scroll-bg-section ${className}`}
      style={{
        backgroundColor: inView ? activeBg : defaultBg,
        transition: 'background-color 1.5s cubic-bezier(0.22, 1, 0.36, 1), background 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'background-color',
        position: 'relative',
        ...style
      }}
    >
      {children}
    </section>
  );
}

