'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  
  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    remember: true
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gotra: ''
  });

  const [message, setMessage] = useState(null);

  // Check if user is logged in from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('iva_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      setMessage({ type: 'error', text: 'Please enter your email and password.' });
      return;
    }

    // Simulate successful authentication
    const loggedInUser = {
      name: signInData.email.split('@')[0] || 'Devotee',
      email: signInData.email,
      phone: '+91 98765 43210',
      gotra: 'Kashyap',
      joinedDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    };

    try {
      localStorage.setItem('iva_user', JSON.stringify(loggedInUser));
    } catch (err) {}

    setUser(loggedInUser);
    setMessage({ type: 'success', text: 'Welcome back! You are now signed in.' });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const newUser = {
      name: signUpData.fullName,
      email: signUpData.email,
      phone: signUpData.phone || '+91 98765 43210',
      gotra: signUpData.gotra || 'N/A',
      joinedDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    };

    try {
      localStorage.setItem('iva_user', JSON.stringify(newUser));
    } catch (err) {}

    setUser(newUser);
    setMessage({ type: 'success', text: 'Account created successfully! Welcome to IVA Essentials.' });
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('iva_user');
    } catch (e) {}
    setUser(null);
    setMessage({ type: 'info', text: 'You have been signed out.' });
  };

  const quickDemoLogin = () => {
    const demoUser = {
      name: 'Akhil Sharma',
      email: 'akhil.sharma@example.com',
      phone: '+91 98765 43210',
      gotra: 'Kashyap',
      joinedDate: 'Sep 2026'
    };
    try {
      localStorage.setItem('iva_user', JSON.stringify(demoUser));
    } catch (e) {}
    setUser(demoUser);
    setMessage({ type: 'success', text: 'Signed in as Demo Devotee.' });
  };

  return (
    <div style={{ background: '#F7F2E9', minHeight: '85vh' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,7vh,90px) clamp(20px,4vw,56px) clamp(60px,10vh,130px)' }}>
        
        {/* Banner Notification */}
        {message && (
          <div style={{
            maxWidth: '540px',
            margin: '0 auto 28px',
            padding: '14px 20px',
            background: message.type === 'error' ? '#FDF3E7' : message.type === 'success' ? '#E2ECE3' : '#EFE7DA',
            borderLeft: `4px solid ${message.type === 'error' ? '#A2543A' : message.type === 'success' ? '#2E5A36' : '#8A7B6B'}`,
            color: message.type === 'error' ? '#8A5239' : message.type === 'success' ? '#2E5A36' : '#17130F',
            fontSize: '13.5px',
            borderRadius: '2px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'inherit' }}>✕</button>
          </div>
        )}

        {/* LOGGED IN VIEW: Account Dashboard */}
        {user ? (
          <RevealOnScroll style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ background: '#EFE7DA', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(23,19,15,.04)' }}>
              
              {/* Header */}
              <div style={{ padding: 'clamp(28px,4vw,42px)', background: '#F2EADD', borderBottom: '1px solid rgba(23,19,15,.12)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>
                    Sacred Account Profile
                  </span>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,40px)', margin: 0, color: '#17130F' }}>
                    Namaste, {user.name} 🙏
                  </h1>
                </div>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(23,19,15,.22)',
                    padding: '10px 20px',
                    fontSize: '11.5px',
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    color: '#8A7B6B',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all .25s'
                  }}
                  className="hover-color"
                >
                  Sign Out
                </button>
              </div>

              {/* Profile Body */}
              <div style={{ padding: 'clamp(28px,4vw,42px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Full Name</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#17130F' }}>{user.name}</span>
                </div>

                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Email Address</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F' }}>{user.email}</span>
                </div>

                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Phone Number</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F' }}>{user.phone || '+91 98765 43210'}</span>
                </div>

                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Gotra (Devotional)</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F' }}>{user.gotra || 'Kashyap'}</span>
                </div>
              </div>

              {/* Account Quick Links */}
              <div style={{ padding: '0 clamp(28px,4vw,42px) clamp(28px,4vw,42px)', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link
                  href="/orders"
                  style={{
                    flex: '1 1 200px',
                    textAlign: 'center',
                    background: '#17130F',
                    color: '#F7F2E9',
                    padding: '16px 24px',
                    fontSize: '11.5px',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px'
                  }}
                  className="cart-btn"
                >
                  View Your Orders →
                </Link>
                <Link
                  href="/shop"
                  style={{
                    flex: '1 1 200px',
                    textAlign: 'center',
                    background: 'transparent',
                    border: '1px solid #17130F',
                    color: '#17130F',
                    padding: '16px 24px',
                    fontSize: '11.5px',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px'
                  }}
                >
                  Explore Collections
                </Link>
              </div>

            </div>
          </RevealOnScroll>
        ) : (
          /* LOGGED OUT VIEW: Sign In & Sign Up Auth Tabs */
          <div style={{ maxWidth: '540px', margin: '0 auto' }}>
            
            {/* Page Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '8px' }}>
                Sacred Portal Access
              </span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(36px,4.5vw,52px)', lineHeight: 1, margin: 0, color: '#17130F' }}>
                {activeTab === 'signin' ? 'Sign In to Account' : 'Create an Account'}
              </h1>
            </div>

            {/* Auth Tab Switcher */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#EFE7DA', padding: '6px', borderRadius: '4px', marginBottom: '28px', border: '1px solid rgba(23,19,15,.1)' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setMessage(null); }}
                style={{
                  background: activeTab === 'signin' ? '#17130F' : 'transparent',
                  color: activeTab === 'signin' ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '14px 20px',
                  fontSize: '12px',
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setMessage(null); }}
                style={{
                  background: activeTab === 'signup' ? '#17130F' : 'transparent',
                  color: activeTab === 'signup' ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '14px 20px',
                  fontSize: '12px',
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease'
                }}
              >
                Create Account
              </button>
            </div>

            {/* SIGN IN FORM */}
            {activeTab === 'signin' ? (
              <RevealOnScroll>
                <form onSubmit={handleSignIn} style={{ background: '#EFE7DA', padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                      Email Address or Mobile Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="devotee@example.com"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147' }}>
                        Password *
                      </label>
                      <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }} style={{ fontSize: '11px', color: '#8A7B6B', textDecoration: 'underline' }}>
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      id="remember"
                      checked={signInData.remember}
                      onChange={(e) => setSignInData({ ...signInData, remember: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor="remember" style={{ fontSize: '13px', color: '#5C5147', cursor: 'pointer' }}>
                      Remember my login on this device
                    </label>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#17130F',
                      color: '#F7F2E9',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      padding: '18px 28px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      marginTop: '6px',
                      transition: 'background .3s'
                    }}
                    className="cart-btn"
                  >
                    Sign In
                  </button>

                  <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px solid rgba(23,19,15,.1)' }}>
                    <button
                      type="button"
                      onClick={quickDemoLogin}
                      style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      ⚡ Quick Demo Sign In
                    </button>
                  </div>

                </form>
              </RevealOnScroll>
            ) : (
              /* SIGN UP FORM */
              <RevealOnScroll>
                <form onSubmit={handleSignUp} style={{ background: '#EFE7DA', padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Akhil Sharma"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Mobile Phone (+91)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Gotra (Optional for Archana & Blessings)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyap / Bharadwaj"
                      value={signUpData.gotra}
                      onChange={(e) => setSignUpData({ ...signUpData, gotra: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Create Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#17130F',
                      color: '#F7F2E9',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      padding: '18px 28px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      marginTop: '6px',
                      transition: 'background .3s'
                    }}
                    className="cart-btn"
                  >
                    Create Account
                  </button>

                </form>
              </RevealOnScroll>
            )}

          </div>
        )}

      </section>
    </div>
  );
}
