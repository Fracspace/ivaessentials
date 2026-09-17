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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCompact(window.scrollY > 60);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#F7F2E9' }}>

      {/* Main Header */}
      <header
        style={{
          background: compact ? 'rgba(247,242,233,.97)' : 'rgba(247,242,233,.9)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(23,19,15,.09)',
          boxShadow: compact ? '0 1px 24px rgba(23,19,15,.07)' : 'none',
          transition: 'background .35s ease, box-shadow .35s ease, padding .35s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: compact ? '12px clamp(20px,4vw,56px)' : '22px clamp(20px,4vw,56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(16px,3vw,48px)',
            transition: 'padding .35s ease'
          }}
        >
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 'none', textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(19px,2.2vw,25px)',
                letterSpacing: '.3em',
                fontWeight: 500,
                lineHeight: 1,
                color: '#17130F'
              }}
            >
              IVA
            </span>
            <span style={{ fontSize: '8.5px', letterSpacing: '.42em', color: '#8A7B6B', textTransform: 'uppercase' }}>
              Essentials
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              gap: 'clamp(16px,2.4vw,36px)',
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
                    paddingBottom: '3px',
                    color: isCurrent ? '#17130F' : '#17130F',
                    borderBottom: isCurrent ? '1px solid #17130F' : '1px solid transparent',
                    transition: 'border-color .3s, color .3s',
                    textDecoration: 'none'
                  }}
                  className="nav-link-item"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div style={{ flex: 'none', display: 'flex', gap: 'clamp(14px,2vw,26px)', alignItems: 'center', whiteSpace: 'nowrap' }}>

            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: isSearchOpen ? '#17130F' : '#6B5F52',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              className="hover-color"
            >
              <span>Search</span>
            </button>

            <Link
              href="/account"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: pathname === '/account' ? '#17130F' : '#6B5F52',
                borderBottom: pathname === '/account' ? '1px solid #17130F' : 'transparent',
                textDecoration: 'none'
              }}
              className="hover-color"
            >
              Account
            </Link>

            <Link
              href="/orders"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: pathname === '/orders' ? '#17130F' : '#6B5F52',
                borderBottom: pathname === '/orders' ? '1px solid #17130F' : 'transparent',
                textDecoration: 'none'
              }}
              className="hover-color"
            >
              Your Orders
            </Link>

            <Link
              href="/cart"
              style={{
                fontSize: '11.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                border: '1px solid rgba(23,19,15,.2)',
                padding: '9px 16px',
                borderRadius: '2px',
                color: '#17130F',
                textDecoration: 'none',
                transition: 'background .3s, color .3s, border-color .3s'
              }}
              className="cart-btn"
            >
              Cart ({itemCount})
            </Link>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div style={{
          background: '#EFE7DA',
          borderBottom: '1px solid rgba(23,19,15,.14)',
          boxShadow: '0 8px 30px rgba(23,19,15,.08)',
          padding: '24px clamp(20px,4vw,56px)'
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
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
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
                        onClick={() => setIsSearchOpen(false)}
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
                        onClick={() => setIsSearchOpen(false)}
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
                        onClick={() => setIsSearchOpen(false)}
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

    </div>
  );
}
