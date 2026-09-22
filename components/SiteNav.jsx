'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { IMAGES } from '../lib/images';

export default function SiteNav({ active }) {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [compact, setCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchMounted, setIsSearchMounted] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeSearchTimeoutRef = React.useRef(null);

  const openSearch = () => {
    if (closeSearchTimeoutRef.current) clearTimeout(closeSearchTimeoutRef.current);
    setIsSearchMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSearchActive(true);
      });
    });
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    if (closeSearchTimeoutRef.current) clearTimeout(closeSearchTimeoutRef.current);
    closeSearchTimeoutRef.current = setTimeout(() => {
      setIsSearchMounted(false);
      setSearchQuery('');
    }, 420);
  };

  const toggleSearch = () => {
    if (isSearchActive) {
      closeSearch();
    } else {
      openSearch();
    }
  };

  // Sample searchable products
  const productsList = [
    {
      id: 'blessed-kit',
      name: 'The Blessed Kashi Kit',
      category: 'Blessed Kit',
      price: '₹1,499',
      image: '/images/blessed-kit.jpg',
      href: '/product/blessed-kit'
    },
    {
      id: 'yatra-kit-deluxe',
      name: 'Sacred Yatra Experience Kit',
      category: 'Yatra Kit',
      price: '₹2,499',
      image: '/images/yatra-kit-secondary.jpg',
      href: '/yatra-kit'
    },
    {
      id: 'yatra-kit-lite',
      name: 'Yatra Kit',
      category: 'Yatra Kit',
      price: '₹199',
      image: '/images/yatra-kit-secondary.jpg',
      href: '/yatra-kit'
    },
    {
      id: 'lakshmi-samagri',
      name: 'Shree Mahalakshmi Pooja Samagri',
      category: 'Pooja Samagri',
      price: '₹699',
      image: IMAGES?.products?.lakshmiSamagri?.url || '/images/blessed-kit.jpg',
      href: '/shop'
    },
    {
      id: 'shiva-samagri',
      name: 'Shree Shiva Pooja Samagri',
      category: 'Pooja Samagri',
      price: '₹699',
      image: IMAGES?.products?.shivaSamagri?.url || '/images/blessed-kit.jpg',
      href: '/shop'
    },
    {
      id: 'ganesh-samagri',
      name: 'Shree Vinayaka Pooja Samagri',
      category: 'Pooja Samagri',
      price: '₹699',
      image: IMAGES?.products?.ganeshSamagri?.url || '/images/ganesh-kit.jpg',
      href: '/shop'
    }
  ];

  const searchResults = productsList.filter(item => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  const [scrolled, setScrolled] = useState(false);
  const [activeNavTheme, setActiveNavTheme] = useState('dark');

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const isScrolledNow = window.scrollY > 260;
        setScrolled(isScrolledNow);
        setCompact(window.scrollY > 280);

        // Detect section navTheme near top header (y = 80px)
        const sections = document.querySelectorAll('[data-nav-theme]');
        let currentTheme = 'dark';
        sections.forEach(sec => {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 40) {
            currentTheme = sec.getAttribute('data-nav-theme') || 'dark';
          }
        });
        setActiveNavTheme(currentTheme);

        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchActive) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const links = [
    { label: 'Shop', href: '/shop', key: 'shop' },
    { label: 'Blessed Kit', href: '/blessed-kit', key: 'blessed' },
    { label: 'Yatra Kit', href: '/yatra-kit', key: 'yatra' },
    { label: 'Contact', href: '/contact', key: 'contact' },
  ];

  const getIsActive = (link) => {
    if (active) return active === link.key;
    if (link.href === '/' && pathname === '/') return true;
    if (link.href !== '/' && pathname.startsWith(link.href)) return true;
    return false;
  };

  const isDarkHeroPage = pathname === '/' || pathname === '/blessed-kit' || pathname === '/yatra-kit';
  const isTopDarkHero = isDarkHeroPage && !scrolled;
  const isDarkCurrentNav = isTopDarkHero || (scrolled && activeNavTheme === 'dark');

  const textColor = isDarkCurrentNav ? '#F8F2E6' : '#17130F';
  const subTextColor = isDarkCurrentNav ? '#F8F2E6' : '#8A7B6B';
  const actionColor = isDarkCurrentNav ? '#F8F2E6' : '#17130F';
  const textShadowStyle = isTopDarkHero ? '0 1px 4px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85)' : 'none';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        background: 'transparent'
      }}
    >
      {/* Main Header */}
      <header
        style={{
          background: scrolled
            ? (activeNavTheme === 'dark' ? 'rgba(20,16,13,.90)' : 'rgba(250,245,236,.92)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: scrolled
            ? (activeNavTheme === 'dark' ? '1px solid rgba(177,143,82,.25)' : '1px solid rgba(177,143,82,.18)')
            : 'none',
          boxShadow: scrolled
            ? (activeNavTheme === 'dark' ? '0 8px 32px rgba(0,0,0,.45)' : '0 4px 20px rgba(23,19,15,.05)')
            : 'none',
          transition: 'background .65s cubic-bezier(.16,1,.3,1), backdrop-filter .65s cubic-bezier(.16,1,.3,1), -webkit-backdrop-filter .65s cubic-bezier(.16,1,.3,1), border-color .65s ease, box-shadow .65s ease, padding .4s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: compact ? '10px clamp(20px,4vw,56px)' : '18px clamp(20px,4vw,56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(16px,3vw,48px)',
            transition: 'padding .35s ease'
          }}
        >
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}>
            <img
              src={isDarkCurrentNav ? IMAGES.logo.lightText : IMAGES.logo.darkText}
              alt="IVA Essentials"
              style={{
                height: compact ? '34px' : '42px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height .35s ease'
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              gap: 'clamp(12px,1.8vw,28px)',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
            className="desktop-nav"
          >
            {links.map((link) => {
              const isCurrent = getIsActive(link);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  style={{
                    fontSize: '12.5px',
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    color: textColor,
                    textShadow: textShadowStyle,
                    borderBottom: isCurrent ? `1px solid ${isDarkCurrentNav ? '#E8CFA3' : '#17130F'}` : '1px solid transparent',
                    textDecoration: 'none'
                  }}
                  className="nav-pill-item"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div style={{ flex: 'none', display: 'flex', gap: 'clamp(10px,1.4vw,20px)', alignItems: 'center', whiteSpace: 'nowrap' }}>

            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={toggleSearch}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: isSearchActive ? textColor : actionColor,
                textShadow: textShadowStyle,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              className="nav-pill-item"
            >
              <span>{isSearchActive ? 'Close' : 'Search'}</span>
            </button>

            <Link
              href="/account"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: pathname === '/account' ? textColor : actionColor,
                textShadow: textShadowStyle,
                textDecoration: 'none'
              }}
              className="nav-pill-item desktop-actions"
            >
              Account
            </Link>

            <Link
              href="/orders"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: pathname === '/orders' ? textColor : actionColor,
                textShadow: textShadowStyle,
                textDecoration: 'none'
              }}
              className="nav-pill-item desktop-actions"
            >
              Your Orders
            </Link>

            <Link
              href="/cart"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: isDarkCurrentNav ? '1px solid rgba(248,242,230,.7)' : '1px solid rgba(23,19,15,.35)',
                color: textColor,
                textShadow: textShadowStyle,
                textDecoration: 'none',
                background: isDarkCurrentNav ? 'rgba(20,16,13,.5)' : 'transparent'
              }}
              className="cart-btn nav-pill-item"
            >
              Cart ({itemCount})
            </Link>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: isDarkCurrentNav ? 'rgba(20,16,13,.6)' : 'rgba(250,245,236,.8)',
                border: isDarkCurrentNav ? '1px solid rgba(248,242,230,.6)' : '1px solid rgba(23,19,15,.35)',
                fontSize: '12px',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: textColor,
                textShadow: textShadowStyle,
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: '20px',
                display: 'none',
                alignItems: 'center',
                gap: '6px'
              }}
              className="mobile-menu-btn"
              aria-label="Toggle Mobile Navigation Menu"
            >
              <span style={{ fontSize: '15px', lineHeight: 1 }}>{isMobileMenuOpen ? '✕' : '☰'}</span>
              <span style={{ fontSize: '11px' }}>{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL OVERLAY WITH SMOOTH OPEN/CLOSE ANIMATION */}
      {isSearchMounted && (
        <div style={{
          background: '#EFE7DA',
          borderBottom: isSearchActive ? '1px solid rgba(23,19,15,.14)' : '1px solid transparent',
          boxShadow: isSearchActive ? '0 12px 36px rgba(23,19,15,.12)' : 'none',
          padding: isSearchActive ? '24px clamp(20px,4vw,56px)' : '0px clamp(20px,4vw,56px)',
          maxHeight: isSearchActive ? '850px' : '0px',
          opacity: isSearchActive ? 1 : 0,
          transform: isSearchActive ? 'translateY(0) scale(1)' : 'translateY(-14px) scale(0.985)',
          overflow: 'hidden',
          transition: 'max-height .45s cubic-bezier(.16,1,.3,1), opacity .38s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1), padding .45s cubic-bezier(.16,1,.3,1), border-color .4s ease, box-shadow .4s ease',
          pointerEvents: isSearchActive ? 'auto' : 'none'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>🔍</span>
              <input
                type="text"
                autoFocus
                placeholder="Search sacred kits, Vibhuti, Ganga Jal, samagri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#F7F2E9',
                  border: '1px solid rgba(23,19,15,.2)',
                  padding: '14px 20px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(18px,2.2vw,24px)',
                  color: '#17130F',
                  outline: 'none',
                  borderRadius: '2px'
                }}
              />
              <button
                type="button"
                onClick={closeSearch}
                style={{
                  background: 'none',
                  border: '1px solid rgba(23,19,15,.2)',
                  padding: '12px 18px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#17130F',
                  borderRadius: '2px'
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* Quick Suggestions Pills */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B6B' }}>Popular:</span>
              {['Blessed Kit', 'Yatra Kit', 'Shiva', 'Samagri'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  style={{
                    background: '#F7F2E9',
                    border: '1px solid rgba(23,19,15,.15)',
                    padding: '5px 12px',
                    fontSize: '11px',
                    letterSpacing: '.1em',
                    color: '#5C5147',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Live Search Results */}
            {searchQuery.trim() && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(23,19,15,.1)' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#8A7B6B', marginBottom: '12px' }}>
                  {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} found for "{searchQuery}"
                </div>

                {searchResults.length === 0 ? (
                  <div style={{
                    padding: '36px 24px',
                    background: '#F7F2E9',
                    border: '1px solid rgba(23,19,15,.12)',
                    borderRadius: '4px',
                    textAlign: 'center',
                    marginTop: '12px'
                  }}>
                    <div style={{ fontSize: '36px', marginBottom: '12px' }}>🪔</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', margin: '0 0 8px', color: '#17130F' }}>
                      No products matched "{searchQuery}"
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#5C5147', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                      We couldn't find any sacred essentials matching your search. Try checking your spelling or explore our popular consecrated collections.
                    </p>

                    {/* Suggested Search Pills */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                      {['Blessed Kit', 'Yatra Kit', 'Samagri'].map(term => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setSearchQuery(term)}
                          style={{
                            background: '#EFE7DA',
                            border: '1px solid rgba(23,19,15,.18)',
                            padding: '6px 14px',
                            fontSize: '11.5px',
                            letterSpacing: '.12em',
                            color: '#17130F',
                            borderRadius: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          Try "{term}"
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link
                        href="/shop"
                        onClick={closeSearch}
                        style={{
                          background: '#17130F',
                          color: '#F7F2E9',
                          padding: '12px 24px',
                          fontSize: '11px',
                          letterSpacing: '.18em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px'
                        }}
                      >
                        Explore Full Collection →
                      </Link>
                      <Link
                        href="/contact"
                        onClick={closeSearch}
                        style={{
                          background: 'transparent',
                          border: '1px solid #17130F',
                          color: '#17130F',
                          padding: '12px 24px',
                          fontSize: '11px',
                          letterSpacing: '.18em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px'
                        }}
                      >
                        Ask Kashi Advisor
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                    {searchResults.map(item => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={closeSearch}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          padding: '12px',
                          background: '#F7F2E9',
                          border: '1px solid rgba(23,19,15,.1)',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          color: '#17130F',
                          transition: 'border-color .2s'
                        }}
                      >
                        <img src={item.image} alt={item.name} style={{ width: '48px', height: '56px', objectFit: 'cover', background: '#E3D9C8' }} />
                        <div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, lineHeight: 1.2 }}>{item.name}</div>
                          <div style={{ fontSize: '12px', color: '#A2543A', marginTop: '2px' }}>{item.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* MOBILE FLOATING POPOVER MENU WINDOW (TOP RIGHT) */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay to close when clicking outside */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)'
            }}
          />

          {/* Floating Top-Right Window */}
          <div
            style={{
              position: 'fixed',
              top: compact ? '58px' : '72px',
              right: 'clamp(12px, 3vw, 36px)',
              width: 'min(310px, calc(100vw - 24px))',
              maxHeight: 'calc(100vh - 90px)',
              background: activeNavTheme === 'dark' ? 'rgba(20, 16, 13, 0.96)' : 'rgba(252, 248, 240, 0.97)',
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              zIndex: 1001,
              padding: '16px 18px',
              borderRadius: '14px',
              boxShadow: activeNavTheme === 'dark'
                ? '0 20px 48px -6px rgba(0, 0, 0, 0.65), 0 4px 20px rgba(177, 143, 82, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 16px 40px -6px rgba(23, 19, 15, 0.25), 0 4px 16px rgba(177, 143, 82, 0.15)',
              border: activeNavTheme === 'dark' ? '1px solid rgba(177, 143, 82, 0.35)' : '1px solid rgba(177, 143, 82, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: activeNavTheme === 'dark' ? '1px solid rgba(177, 143, 82, 0.2)' : '1px solid rgba(23, 19, 15, 0.08)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 600, color: activeNavTheme === 'dark' ? '#E8CFA3' : '#8A7B6B' }}>
                Sacred Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  color: activeNavTheme === 'dark' ? '#E8CFA3' : '#8A7B6B',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase'
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: activeNavTheme === 'dark' ? '#F8F2E6' : '#17130F',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.2s ease, transform 0.2s ease'
                  }}
                  className="mobile-popover-item"
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: '12px', opacity: 0.6, color: activeNavTheme === 'dark' ? '#E8CFA3' : '#A2543A' }}>→</span>
                </Link>
              ))}

              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: activeNavTheme === 'dark' ? '#F8F2E6' : '#17130F',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease, transform 0.2s ease'
                }}
                className="mobile-popover-item"
              >
                <span>Account / Sign In</span>
                <span style={{ fontSize: '13px', opacity: 0.7 }}>👤</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: activeNavTheme === 'dark' ? '#F8F2E6' : '#17130F',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease, transform 0.2s ease'
                }}
                className="mobile-popover-item"
              >
                <span>Your Orders</span>
                <span style={{ fontSize: '13px', opacity: 0.7 }}>📦</span>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: activeNavTheme === 'dark' ? '#F8F2E6' : '#17130F',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease, transform 0.2s ease'
                }}
                className="mobile-popover-item"
              >
                <span>Cart</span>
                <span style={{ fontSize: '11px', fontWeight: 600, background: activeNavTheme === 'dark' ? '#E8CFA3' : '#17130F', color: activeNavTheme === 'dark' ? '#17130F' : '#F7F2E9', padding: '2px 8px', borderRadius: '10px' }}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </Link>
            </div>

            <div style={{ paddingTop: '8px', borderTop: activeNavTheme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(23,19,15,0.08)' }}>
              <button
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); openSearch(); }}
                style={{
                  width: '100%',
                  background: activeNavTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(23,19,15,0.05)',
                  border: '1px solid rgba(177,143,82,0.25)',
                  color: activeNavTheme === 'dark' ? '#E8CFA3' : '#17130F',
                  padding: '10px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>🔍</span>
                <span>Search Essentials</span>
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
