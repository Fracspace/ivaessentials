'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import { useAuth } from '../../context/AuthContext';
import { sendOtpApi, verifyOtpApi, formatPhoneNumber, syncOtpUserWithBackend } from '../../lib/otpService';

export default function AccountPage() {
  const { user, loginUser, logout, isLoading: authLoading } = useAuth();
  const [authMethod, setAuthMethod] = useState('otp'); // 'otp', 'register', or 'password'

  // Mobile OTP Sign In State
  const [otpStep, setOtpStep] = useState(1); // 1 = Phone Input, 2 = Enter OTP
  const [mobilePhone, setMobilePhone] = useState('');
  const [userName, setUserName] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Customer Registration State
  const [regStep, setRegStep] = useState(1); // 1 = Details Form, 2 = Mobile OTP Verification
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [regOtp, setRegOtp] = useState('');
  const [regResendTimer, setRegResendTimer] = useState(0);

  // Email/Password Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    remember: true
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);


  // Timer countdown for Login OTP resend
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Timer countdown for Registration OTP resend
  useEffect(() => {
    let interval;
    if (regResendTimer > 0) {
      interval = setInterval(() => {
        setRegResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [regResendTimer]);

  // ----------------------------------------------------
  // SEND MOBILE OTP HANDLER (LOGIN)
  // ----------------------------------------------------
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setMessage(null);

    const cleanPhone = mobilePhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendOtpApi(cleanPhone);
      if (!res.success) {
        throw new Error(res.message);
      }

      setOtpStep(2);
      setResendTimer(30);
      setMessage({ type: 'success', text: res.message || `OTP sent successfully to +91 ${cleanPhone}.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // RESEND LOGIN OTP HANDLER
  // ----------------------------------------------------
  const handleResendLoginOtp = async () => {
    setMessage(null);
    const cleanPhone = mobilePhone.replace(/\D/g, '').slice(-10);
    setIsLoading(true);

    try {
      const res = await sendOtpApi(cleanPhone);
      if (!res.success) {
        throw new Error(res.message);
      }
      setResendTimer(30);
      setMessage({ type: 'success', text: `New OTP sent to +91 ${cleanPhone}.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to resend OTP.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // VERIFY MOBILE OTP HANDLER (LOGIN)
  // ----------------------------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage(null);

    const cleanOtp = otpValue.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setMessage({ type: 'error', text: 'Please enter the 6-digit OTP code.' });
      return;
    }

    setIsLoading(true);
    const cleanPhone = mobilePhone.replace(/\D/g, '').slice(-10);

    try {
      const res = await verifyOtpApi(cleanPhone, cleanOtp);
      if (!res.success) {
        let errorMsg = res.message || 'OTP verification failed. Please try again.';
        const lower = errorMsg.toLowerCase();
        if (lower.includes('expired')) {
          errorMsg = 'Verification code has expired. Please click "Didn\'t receive code? Resend OTP" below to receive a new code.';
        } else if (lower.includes('invalid') || lower.includes('wrong') || lower.includes('incorrect')) {
          errorMsg = 'Incorrect verification code. Please enter the 6-digit code received on your mobile.';
        }
        throw new Error(errorMsg);
      }

      // Sync with backend to register or login user and generate authentic token
      const syncResult = await syncOtpUserWithBackend({
        phone: cleanPhone,
        name: userName.trim()
      });

      loginUser(syncResult.user, syncResult.token);
      setMessage({ type: 'success', text: `Welcome, ${syncResult.user.name}! You are now signed in.` });
      setOtpStep(1);
      setOtpValue('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'OTP verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // INITIATE REGISTRATION (STEP 1: Validate & Send OTP)
  // ----------------------------------------------------
  const handleInitiateSignUp = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!signUpData.fullName?.trim() || !signUpData.email?.trim() || !signUpData.phone?.trim() || !signUpData.password) {
      setMessage({ type: 'error', text: 'Please fill in all required fields (Name, Email, Mobile Phone, Password).' });
      return;
    }

    const cleanPhone = signUpData.phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number for verification.' });
      return;
    }

    if (signUpData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendOtpApi(cleanPhone);
      if (!res.success) {
        throw new Error(res.message);
      }

      setRegStep(2);
      setRegResendTimer(30);
      setMessage({ type: 'success', text: res.message || `Verification code sent to +91 ${cleanPhone}. Please verify to complete registration.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to send verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // RESEND REGISTRATION OTP HANDLER
  // ----------------------------------------------------
  const handleResendRegOtp = async () => {
    setMessage(null);
    const cleanPhone = signUpData.phone.replace(/\D/g, '').slice(-10);
    setIsLoading(true);

    try {
      const res = await sendOtpApi(cleanPhone);
      if (!res.success) {
        throw new Error(res.message);
      }

      setRegResendTimer(30);
      setMessage({ type: 'success', text: `New verification code sent to +91 ${cleanPhone}.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to resend verification code.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // VERIFY OTP & COMPLETE REGISTRATION (STEP 2: Verify OTP + Register API)
  // ----------------------------------------------------
  const handleVerifyAndSignUp = async (e) => {
    e.preventDefault();
    setMessage(null);

    const cleanOtp = regOtp.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setMessage({ type: 'error', text: 'Please enter the 6-digit OTP code.' });
      return;
    }

    const cleanPhone = signUpData.phone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setMessage({ type: 'error', text: 'Mobile phone number is missing from your session. Please click "Edit Details" and try again.' });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Verify Mobile OTP first with Fracspace API
      console.log('📱 [Register] Verifying Mobile OTP for:', cleanPhone, 'code:', cleanOtp);
      const otpRes = await verifyOtpApi(cleanPhone, cleanOtp);

      if (!otpRes.success) {
        let errorMsg = otpRes.message || 'Invalid OTP code. Please try again.';
        const lower = errorMsg.toLowerCase();
        if (lower.includes('expired')) {
          errorMsg = 'The verification code has expired. Please click "Didn\'t receive code? Resend OTP" below to request a fresh OTP.';
        } else if (lower.includes('invalid') || lower.includes('wrong') || lower.includes('incorrect')) {
          errorMsg = 'Incorrect verification code. Please check the 6-digit code received on your mobile or request a new OTP.';
        }
        throw new Error(errorMsg);
      }

      // 2. Prepare payload for Register API
      const formattedPhone = `+91${cleanPhone}`;
      const payload = {
        name: (signUpData.fullName || 'Customer').trim(),
        email: (signUpData.email || '').trim(),
        password: signUpData.password,
        phoneNumber: formattedPhone
      };

      if (!payload.email) {
        throw new Error('Email address is missing. Please click "Edit Details" to review your registration information.');
      }
      if (!payload.password) {
        throw new Error('Password is missing. Please click "Edit Details" to set your account password.');
      }

      console.log('➡️ [Register API] Sending Request Data:', { ...payload, password: '[PROTECTED]' });

      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        data = {};
      }

      console.log(`⬅️ [Register API] Response (${res.status}):`, data);

      if (!res.ok || !data.success) {
        console.error('❌ [Register API] Error Details:', data);
        let errorMsg = data.error || data.message || `Registration failed (Status ${res.status}). Please try again.`;
        if (errorMsg.toLowerCase().includes('already exists') || res.status === 409) {
          errorMsg = `An account with this email (${payload.email}) or phone already exists. Please switch to "Mobile OTP" or "Password" sign in above.`;
        }
        throw new Error(errorMsg);
      }

      // 3. Set logged-in user in Auth state
      const newUser = {
        id: data.data?.user?.id,
        name: data.data?.user?.name || payload.name,
        email: data.data?.user?.email || payload.email,
        phone: data.data?.user?.phoneNumber || formattedPhone,
        joinedDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
      };

      loginUser(newUser, data.data?.token);
      setMessage({ type: 'success', text: data.message || 'Mobile verified! Account created successfully. Welcome to IVA Essentials!' });
      setRegStep(1);
      setRegOtp('');
      setSignUpData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('❌ Registration Error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to complete registration. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------
  // EMAIL / PASSWORD SIGN IN HANDLER
  // ----------------------------------------------------
  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!signInData.email || !signInData.password) {
      setMessage({ type: 'error', text: 'Please enter your email and password.' });
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: signInData.email.trim(),
          password: signInData.password
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        data = {};
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || 'Invalid email or password.');
      }

      const loggedInUser = {
        id: data.data?.user?.id,
        name: data.data?.user?.name || signInData.email.split('@')[0],
        email: data.data?.user?.email || signInData.email,
        phone: data.data?.user?.phoneNumber || '+91 98765 43210',
        joinedDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
      };

      loginUser(loggedInUser, data.data?.token);
      setMessage({ type: 'success', text: data.message || 'Welcome back! You are now signed in.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Authentication failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setOtpStep(1);
    setRegStep(1);
    setMessage({ type: 'info', text: 'You have been signed out safely.' });
  };

  /**
   * Reusable Inline Alert Notification Component
   */
  const renderMessageAlert = () => {
    if (!message) return null;

    const isError = message.type === 'error';
    const isSuccess = message.type === 'success';

    return (
      <div
        role="alert"
        style={{
          padding: '14px 18px',
          marginBottom: '18px',
          background: isError ? '#FDF3E7' : isSuccess ? '#E2ECE3' : '#EFE7DA',
          border: `1px solid ${isError ? '#E8CDB5' : isSuccess ? '#B8D4BB' : 'rgba(23,19,15,.12)'}`,
          borderLeft: `4px solid ${isError ? '#A2543A' : isSuccess ? '#2E5A36' : '#B18F52'}`,
          color: isError ? '#8A5239' : isSuccess ? '#2E5A36' : '#17130F',
          fontSize: '13px',
          lineHeight: 1.5,
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>
            {isError ? '⚠️' : isSuccess ? '✓' : 'ℹ️'}
          </span>
          <div>
            <strong style={{ display: 'block', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '3px', color: isError ? '#A2543A' : isSuccess ? '#2E5A36' : '#17130F' }}>
              {isError ? 'Verification Notice' : isSuccess ? 'Success' : 'Notice'}
            </strong>
            <span style={{ fontSize: '13px' }}>{message.text}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMessage(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'inherit',
            padding: '0 4px',
            opacity: 0.7,
            lineHeight: 1
          }}
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div style={{ background: '#F7F2E9', minHeight: '85vh' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(110px,13vh,160px) clamp(20px,4vw,56px) clamp(60px,10vh,130px)' }}>

        {/* LOGGED IN VIEW: Account Dashboard */}
        {user ? (
          <RevealOnScroll style={{ maxWidth: '780px', margin: '0 auto' }}>
            {renderMessageAlert()}
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
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Registered Mobile Number</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F', fontWeight: 500 }}>{user.phone || 'Not provided'}</span>
                </div>

                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Email Address</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F' }}>{user.email || '—'}</span>
                </div>

                <div style={{ background: '#F2EADD', padding: '20px', borderRadius: '2px' }}>
                  <span style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '4px' }}>Member Since</span>
                  <span style={{ fontSize: '14.5px', color: '#17130F' }}>{user.joinedDate || '2026'}</span>
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
                  href="/checkout"
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
                  Go to Checkout
                </Link>
              </div>

            </div>
          </RevealOnScroll>
        ) : (
          /* LOGGED OUT VIEW: Sign In with Mobile OTP / Register / Password */
          <div style={{ maxWidth: '540px', margin: '0 auto' }}>

            {/* Page Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: '#8A7B6B', display: 'block', marginBottom: '8px' }}>
                Account Portal
              </span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,46px)', lineHeight: 1.1, margin: 0, color: '#17130F' }}>
                {authMethod === 'otp' ? 'Sign In with Mobile OTP' : authMethod === 'register' ? 'Customer Registration' : 'Sign In with Password'}
              </h1>
            </div>

            {/* Method Switcher: Mobile OTP vs Register vs Password */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: '#EFE7DA', padding: '5px', borderRadius: '4px', marginBottom: '24px', border: '1px solid rgba(23,19,15,.1)', gap: '4px' }}>
              <button
                type="button"
                onClick={() => { setAuthMethod('otp'); setMessage(null); setOtpStep(1); }}
                style={{
                  background: authMethod === 'otp' ? '#17130F' : 'transparent',
                  color: authMethod === 'otp' ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '12px 8px',
                  fontSize: '11px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  fontWeight: authMethod === 'otp' ? 600 : 400,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                  textAlign: 'center'
                }}
              >
                📱 Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('register'); setMessage(null); setRegStep(1); }}
                style={{
                  background: authMethod === 'register' ? '#17130F' : 'transparent',
                  color: authMethod === 'register' ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '12px 8px',
                  fontSize: '11px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  fontWeight: authMethod === 'register' ? 600 : 400,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                  textAlign: 'center'
                }}
              >
                ✨ Register
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('password'); setMessage(null); }}
                style={{
                  background: authMethod === 'password' ? '#17130F' : 'transparent',
                  color: authMethod === 'password' ? '#F7F2E9' : '#6B5F52',
                  border: 'none',
                  padding: '12px 8px',
                  fontSize: '11px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  fontWeight: authMethod === 'password' ? 600 : 400,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                  textAlign: 'center'
                }}
              >
                ✉️ Password
              </button>
            </div>

            {/* ==================================================== */}
            {/* 1. MOBILE OTP AUTHENTICATION (LOGIN FLOW) */}
            {/* ==================================================== */}
            {authMethod === 'otp' && (
              <RevealOnScroll>
                <div style={{ background: '#EFE7DA', padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {otpStep === 1 ? (
                    /* Step 1: Enter Mobile Number */
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {renderMessageAlert()}
                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                          Enter Mobile Phone Number *
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', borderRadius: '2px', overflow: 'hidden' }}>
                          <span style={{ padding: '14px 16px', fontSize: '14px', background: '#EAE1D2', color: '#5C5147', borderRight: '1px solid rgba(23,19,15,.12)', fontWeight: 500 }}>
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value.replace(/\D/g, ''))}
                            style={{ width: '100%', background: 'transparent', border: 'none', padding: '14px 16px', fontSize: '15px', color: '#17130F', outline: 'none' }}
                            autoFocus
                          />
                        </div>
                        <p style={{ fontSize: '12px', color: '#8A7B6B', margin: '8px 0 0', lineHeight: 1.5 }}>
                          We will send a 6-digit verification code to this phone number via SMS.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || mobilePhone.length < 10}
                        style={{
                          background: (isLoading || mobilePhone.length < 10) ? '#5C5147' : '#17130F',
                          color: '#F7F2E9',
                          border: 'none',
                          fontSize: '11.5px',
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          padding: '18px 28px',
                          borderRadius: '2px',
                          cursor: (isLoading || mobilePhone.length < 10) ? 'not-allowed' : 'pointer',
                          transition: 'background .3s',
                          opacity: (isLoading || mobilePhone.length < 10) ? 0.75 : 1
                        }}
                        className="cart-btn"
                      >
                        {isLoading ? 'Sending Sacred OTP...' : 'Send OTP →'}
                      </button>
                    </form>
                  ) : (
                    /* Step 2: Enter & Verify OTP */
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F2EADD', padding: '12px 16px', borderRadius: '3px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#8A7B6B', textTransform: 'uppercase', letterSpacing: '.12em', display: 'block' }}>Code sent to</span>
                          <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#17130F' }}>+91 {mobilePhone.slice(-10)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setOtpStep(1); setOtpValue(''); setMessage(null); }}
                          style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '11.5px', textDecoration: 'underline', cursor: 'pointer', letterSpacing: '.08em', textTransform: 'uppercase' }}
                        >
                          Change Number
                        </button>
                      </div>

                      {renderMessageAlert()}

                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                          Enter 6-Digit OTP *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="••••••"
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '16px', fontSize: '22px', letterSpacing: '.4em', textAlign: 'center', color: '#17130F', outline: 'none', borderRadius: '2px', fontWeight: 600 }}
                          autoFocus
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                          Your Full Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', color: '#5C5147' }}>
                        {resendTimer > 0 ? (
                          <span style={{ color: '#8A7B6B' }}>Resend OTP in <strong>{resendTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendLoginOtp}
                            disabled={isLoading}
                            style={{ background: 'none', border: 'none', color: '#17130F', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12.5px' }}
                          >
                            Didn't receive code? Resend OTP
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || otpValue.length < 4}
                        style={{
                          background: (isLoading || otpValue.length < 4) ? '#5C5147' : '#17130F',
                          color: '#F7F2E9',
                          border: 'none',
                          fontSize: '11.5px',
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          padding: '18px 28px',
                          borderRadius: '2px',
                          cursor: (isLoading || otpValue.length < 4) ? 'not-allowed' : 'pointer',
                          transition: 'background .3s',
                          opacity: (isLoading || otpValue.length < 4) ? 0.75 : 1
                        }}
                        className="cart-btn"
                      >
                        {isLoading ? 'Verifying Sacred Code...' : 'Verify OTP & Enter Portal →'}
                      </button>
                    </form>
                  )}

                  <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px solid rgba(23,19,15,.08)' }}>
                    <p style={{ fontSize: '12px', color: '#8A7B6B', margin: '0 0 6px' }}>
                      ⚡ Instant login with no password needed.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('register'); setMessage(null); setRegStep(1); }}
                      style={{ background: 'none', border: 'none', color: '#A2543A', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                    >
                      New Customer? Register with Phone Verification →
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* ==================================================== */}
            {/* 2. CUSTOMER REGISTRATION (WITH MOBILE OTP VERIFICATION) */}
            {/* ==================================================== */}
            {authMethod === 'register' && (
              <RevealOnScroll>
                <div style={{ background: '#EFE7DA', padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Step Progress Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', paddingBottom: '14px', borderBottom: '1px solid rgba(23,19,15,.08)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.14em' }}>
                    <span style={{ fontWeight: regStep === 1 ? 700 : 500, color: regStep === 1 ? '#17130F' : '#8A7B6B' }}>
                      1. Details {regStep > 1 ? '✓' : ''}
                    </span>
                    <span style={{ color: '#8A7B6B' }}>→</span>
                    <span style={{ fontWeight: regStep === 2 ? 700 : 500, color: regStep === 2 ? '#17130F' : '#8A7B6B' }}>
                      2. Phone OTP Verification
                    </span>
                  </div>

                  {regStep === 1 ? (
                    /* Step 1: Registration Form Details */
                    <form onSubmit={handleInitiateSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {renderMessageAlert()}
                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
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
                          placeholder="customer@example.com"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '6px' }}>
                          Mobile Phone (+91) *
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', borderRadius: '2px', overflow: 'hidden' }}>
                          <span style={{ padding: '14px 16px', fontSize: '14px', background: '#EAE1D2', color: '#5C5147', borderRight: '1px solid rgba(23,19,15,.12)', fontWeight: 500 }}>
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={signUpData.phone}
                            onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value.replace(/\D/g, '') })}
                            style={{ width: '100%', background: 'transparent', border: 'none', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none' }}
                          />
                        </div>
                        <p style={{ fontSize: '11.5px', color: '#8A7B6B', margin: '6px 0 0' }}>
                          We will verify this phone number via a secure 6-digit SMS OTP.
                        </p>
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
                        disabled={isLoading || !signUpData.phone || signUpData.phone.length < 10}
                        style={{
                          background: (isLoading || !signUpData.phone || signUpData.phone.length < 10) ? '#5C5147' : '#17130F',
                          color: '#F7F2E9',
                          border: 'none',
                          fontSize: '11.5px',
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          padding: '18px 28px',
                          borderRadius: '2px',
                          cursor: (isLoading || !signUpData.phone || signUpData.phone.length < 10) ? 'not-allowed' : 'pointer',
                          marginTop: '6px',
                          transition: 'background .3s',
                          opacity: (isLoading || !signUpData.phone || signUpData.phone.length < 10) ? 0.75 : 1
                        }}
                        className="cart-btn"
                      >
                        {isLoading ? 'Sending Verification Code...' : 'Verify Mobile & Continue →'}
                      </button>
                    </form>
                  ) : (
                    /* Step 2: Registration Mobile OTP Verification */
                    <form onSubmit={handleVerifyAndSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F2EADD', padding: '12px 16px', borderRadius: '3px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#8A7B6B', textTransform: 'uppercase', letterSpacing: '.12em', display: 'block' }}>Verifying phone</span>
                          <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#17130F' }}>+91 {signUpData.phone.slice(-10)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setRegStep(1); setRegOtp(''); setMessage(null); }}
                          style={{ background: 'none', border: 'none', color: '#A2543A', fontSize: '11.5px', textDecoration: 'underline', cursor: 'pointer', letterSpacing: '.08em', textTransform: 'uppercase' }}
                        >
                          Edit Details
                        </button>
                      </div>

                      {/* Prominent Inline Alert inside Registration Step 2 */}
                      {renderMessageAlert()}

                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                          Enter 6-Digit Verification Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="••••••"
                          value={regOtp}
                          onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '16px', fontSize: '22px', letterSpacing: '.4em', textAlign: 'center', color: '#17130F', outline: 'none', borderRadius: '2px', fontWeight: 600 }}
                          autoFocus
                        />
                        <p style={{ fontSize: '12px', color: '#8A7B6B', margin: '8px 0 0', textAlign: 'center' }}>
                          Please enter the 6-digit code sent via SMS to verify your mobile number.
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', color: '#5C5147' }}>
                        {regResendTimer > 0 ? (
                          <span style={{ color: '#8A7B6B' }}>Resend code in <strong>{regResendTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendRegOtp}
                            disabled={isLoading}
                            style={{ background: 'none', border: 'none', color: '#17130F', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12.5px' }}
                          >
                            Didn't receive code? Resend OTP
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || regOtp.length < 4}
                        style={{
                          background: (isLoading || regOtp.length < 4) ? '#5C5147' : '#17130F',
                          color: '#F7F2E9',
                          border: 'none',
                          fontSize: '11.5px',
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          padding: '18px 28px',
                          borderRadius: '2px',
                          cursor: (isLoading || regOtp.length < 4) ? 'not-allowed' : 'pointer',
                          transition: 'background .3s',
                          opacity: (isLoading || regOtp.length < 4) ? 0.75 : 1
                        }}
                        className="cart-btn"
                      >
                        {isLoading ? 'Verifying & Creating Account...' : 'Confirm & Complete Registration →'}
                      </button>
                    </form>
                  )}

                  <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px solid rgba(23,19,15,.08)' }}>
                    <p style={{ fontSize: '12px', color: '#8A7B6B', margin: '0 0 6px' }}>
                      Already registered?
                    </p>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('otp'); setMessage(null); setOtpStep(1); }}
                      style={{ background: 'none', border: 'none', color: '#A2543A', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Sign In with Mobile OTP →
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* ==================================================== */}
            {/* 3. PASSWORD AUTHENTICATION (EMAIL & PASSWORD) */}
            {/* ==================================================== */}
            {authMethod === 'password' && (
              <RevealOnScroll>
                <form onSubmit={handleSignIn} style={{ background: '#EFE7DA', padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(23,19,15,.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {renderMessageAlert()}
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5C5147', marginBottom: '8px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="customer@example.com"
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
                      <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }} style={{ fontSize: '11px', color: '#8A7B6B', textDecoration: 'underline' }}>
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      style={{ width: '100%', background: '#F7F2E9', border: '1px solid rgba(23,19,15,.2)', padding: '14px 16px', fontSize: '14px', color: '#17130F', outline: 'none', borderRadius: '2px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: isLoading ? '#5C5147' : '#17130F',
                      color: '#F7F2E9',
                      border: 'none',
                      fontSize: '11.5px',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      padding: '18px 28px',
                      borderRadius: '2px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      marginTop: '6px',
                      transition: 'background .3s'
                    }}
                    className="cart-btn"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In with Password'}
                  </button>

                  <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px solid rgba(23,19,15,.08)' }}>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('register'); setMessage(null); setRegStep(1); }}
                      style={{ background: 'none', border: 'none', color: '#A2543A', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                    >
                      New Customer? Register with Phone Verification →
                    </button>
                  </div>
                </form>
              </RevealOnScroll>
            )}

          </div>
        )}

      </section>
    </div>
  );
}
