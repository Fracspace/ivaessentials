/**
 * Customer SMS OTP Verification Service
 * Dispatches and verifies 6-digit OTP codes via smslogin.co
 * Supports Development (http://localhost:5000) and Production (https://api.ivaessentials.com)
 */

// Default to Production API
const DEV_URL = 'http://localhost:5000';
const PROD_URL = 'https://api.ivaessentials.com';

export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  PROD_URL
).replace(/\/+$/, '');

const TIMEOUT_MS = 15000; // 15 seconds timeout

// In-memory cache for recent OTP verification results by phone number
const recentVerifiedSessions = new Map();

/**
 * Format phone number to international E.164-style with country code (+91 by default for 10-digit numbers).
 * @param {string} phone
 * @returns {string}
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  const clean = String(phone).trim();
  let digits = clean.replace(/\D/g, '');

  // Strip leading 0 if 11 digits (e.g. 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // If already starts with '+'
  if (clean.startsWith('+')) {
    return clean.replace(/\s+/g, '');
  }

  // If 10 digits provided, automatically prepend +91
  if (digits.length === 10) {
    return `+91${digits}`;
  }

  // If 12 digits starting with 91, prepend +
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }

  return clean.startsWith('+') ? clean : `+${digits}`;
}

/**
 * Helper to execute fetch with timeout
 */
async function fetchWithTimeout(url, options, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection and try again.');
    }
    throw error;
  }
}

/**
 * Check User Exists API
 * POST /api/auth/check-user
 * Validates if an account already exists for the given phone number or email BEFORE sending OTP.
 *
 * @param {Object} params - { phone?: string, email?: string }
 * @returns {Promise<{ success: boolean, exists: boolean, field?: string, message?: string }>}
 */
export async function checkUserExistsApi({ phone, email } = {}) {
  const cleanPhone = phone ? String(phone).trim() : '';
  const formattedPhone = cleanPhone ? formatPhoneNumber(cleanPhone) : '';
  const cleanEmail = email ? String(email).trim().toLowerCase() : '';

  const endpoint = `${API_BASE}/api/auth/check-user`;
  const payload = {
    ...(cleanPhone ? { phone: formattedPhone, phoneNumber: formattedPhone } : {}),
    ...(cleanEmail ? { email: cleanEmail } : {})
  };

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success && data.exists) {
      return {
        success: true,
        exists: true,
        field: data.field || 'phone',
        message: data.message || `An account with this ${data.field || 'phone number'} already exists. Please sign in instead.`
      };
    }

    return {
      success: true,
      exists: false
    };
  } catch (err) {
    console.warn('⚠️ [Check User] Non-blocking pre-check notice:', err.message);
    return {
      success: false,
      exists: false
    };
  }
}

/**
 * 1. Send Login OTP
 * Dispatches a 6-digit verification code to the customer's phone number via smslogin.co.
 * POST /api/auth/send-otp
 *
 * @param {string} phone - Mobile number (accepts "+91...", "9876543210", or "09876543210")
 * @param {Object} [options] - Optional settings: { purpose: 'register' | 'login', email?: string }
 * @returns {Promise<{ success: boolean, message: string, phone?: string, cooldownSeconds?: number, devOtp?: string, isExistingUser?: boolean, data?: any }>}
 */
export async function sendOtpApi(phone, options = {}) {
  const cleanPhone = String(phone || '').trim();
  const formattedPhone = formatPhoneNumber(cleanPhone);
  const rawDigits = cleanPhone.replace(/\D/g, '').slice(-10);

  if (rawDigits.length < 10) {
    return {
      success: false,
      message: 'Please provide a valid 10-digit mobile phone number.'
    };
  }

  const endpoint = `${API_BASE}/api/auth/send-otp`;
  const payload = {
    phone: formattedPhone,
    ...(options.purpose ? { purpose: options.purpose } : {}),
    ...(options.type ? { type: options.type } : {}),
    ...(options.email ? { email: String(options.email).trim().toLowerCase() } : {})
  };

  try {
    console.log('📱 [SMS OTP] Sending OTP to:', formattedPhone, 'via', endpoint, options.purpose ? `(purpose: ${options.purpose})` : '');

    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    console.log(`📱 [SMS OTP] Send OTP response (${response.status}):`, data);

    if (!response.ok || data.success === false) {
      const errorMsg = data.error || data.message || 'Failed to send OTP. Please try again.';
      const isExisting = response.status === 409 || errorMsg.toLowerCase().includes('already exists');

      return {
        success: false,
        status: response.status,
        message: errorMsg,
        error: errorMsg,
        isExistingUser: isExisting,
        cooldownSeconds: data.cooldownSeconds
      };
    }

    return {
      success: true,
      message: data.message || `OTP has been sent successfully to ${formattedPhone}`,
      phone: data.phone || formattedPhone,
      cooldownSeconds: data.cooldownSeconds || 60,
      data
    };
  } catch (err) {
    console.error('❌ [SMS OTP] Send OTP Error:', err);
    return {
      success: false,
      message: err.message || 'Network error while sending OTP. Please check your connection and try again.'
    };
  }
}

/**
 * 2. Verify Login OTP
 * Verifies the OTP code, resolves or provisions the user profile,
 * sets the session cookie, and returns the JWT Bearer token.
 * POST /api/auth/verify-otp
 *
 * @param {string} phone - Mobile number
 * @param {string|number} otpCode - 6-digit numeric OTP code
 * @returns {Promise<{ success: boolean, message: string, token?: string, user?: Object, isNewUser?: boolean, data?: any }>}
 */
export async function verifyOtpApi(phone, otpCode) {
  const cleanPhone = String(phone || '').trim();
  const formattedPhone = formatPhoneNumber(cleanPhone);
  const rawDigits = cleanPhone.replace(/\D/g, '').slice(-10);
  const cleanOtp = String(otpCode || '').trim();

  if (!cleanOtp) {
    return {
      success: false,
      message: 'Please enter the 6-digit verification code.'
    };
  }

  const endpoint = `${API_BASE}/api/auth/verify-otp`;
  const payload = {
    phone: formattedPhone,
    otp: cleanOtp
  };

  try {
    console.log('🔐 [SMS OTP] Verifying OTP for:', formattedPhone, 'code:', cleanOtp, 'via', endpoint);

    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Sets token HttpOnly Cookie
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🔐 [SMS OTP] Verify OTP response (${response.status}):`, data);

    if (!response.ok || data.success === false) {
      let errorMsg = data.error || data.message || 'Invalid OTP code. Please try again.';
      return {
        success: false,
        message: errorMsg,
        error: errorMsg
      };
    }

    const token = data.token || data.data?.token || null;
    const user = data.user || data.data?.user || null;
    const isNewUser = Boolean(data.isNewUser ?? data.data?.isNewUser ?? false);

    // Save session in cache for immediate seamless sync
    const sessionData = { token, user, isNewUser };
    recentVerifiedSessions.set(rawDigits, sessionData);
    recentVerifiedSessions.set(formattedPhone, sessionData);

    return {
      success: true,
      message: data.message || 'Login successful',
      token,
      user,
      isNewUser,
      data
    };
  } catch (err) {
    console.error('❌ [SMS OTP] Verify OTP Error:', err);
    return {
      success: false,
      message: err.message || 'Network error while verifying OTP. Please try again.'
    };
  }
}

/**
 * Synchronize OTP-verified customer profile with the backend:
 * Uses the authentic user and token already provisioned by /api/auth/verify-otp.
 * If user entered an explicit custom name or email, updates their profile on /api/users/me.
 *
 * @param {Object} params
 * @param {string} params.phone - Customer phone
 * @param {string} [params.name] - Customer name
 * @param {string} [params.email] - Customer email
 * @param {Object} [params.verifiedUser] - Direct user object from verifyOtpApi
 * @param {string} [params.verifiedToken] - Direct JWT token from verifyOtpApi
 * @returns {Promise<{ success: boolean, user: Object, token: string }>}
 */
export async function syncOtpUserWithBackend({ phone, name = '', email = '', verifiedUser = null, verifiedToken = null }) {
  const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  const formattedPhone = formatPhoneNumber(phone);

  // Retrieve session data from arguments or recent verification cache
  const cached = recentVerifiedSessions.get(cleanPhone) || recentVerifiedSessions.get(formattedPhone) || {};
  let token = verifiedToken || cached.token || (typeof window !== 'undefined' ? sessionStorage.getItem('iva_session_token') : null);
  let backendUser = verifiedUser || cached.user || null;

  // If user provided a custom name (different from generic "Customer 3210") or email, update profile
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();

  const isGenericName = !backendUser?.name || backendUser.name.startsWith('Customer ');
  const shouldUpdateName = trimmedName && (isGenericName || trimmedName !== backendUser?.name);
  const shouldUpdateEmail = trimmedEmail && (!backendUser?.email || !backendUser.email.includes(trimmedEmail));

  if ((shouldUpdateName || shouldUpdateEmail) && token) {
    try {
      const updatePayload = {};
      if (shouldUpdateName) updatePayload.name = trimmedName;
      if (shouldUpdateEmail && !trimmedEmail.includes('@ivaessentials.com')) updatePayload.email = trimmedEmail;

      if (Object.keys(updatePayload).length > 0) {
        console.log('📝 [Profile Update] Syncing customer details to backend:', updatePayload);
        const updateRes = await fetch(`${API_BASE}/api/users/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify(updatePayload)
        });

        const updateData = await updateRes.json().catch(() => ({}));
        if (updateRes.ok && updateData.success && updateData.data) {
          backendUser = updateData.data;
          console.log('✅ [Profile Update] Customer profile updated successfully:', backendUser);
        }
      }
    } catch (err) {
      console.warn('⚠️ [Profile Update] Non-blocking notice:', err.message);
    }
  }

  // Build authentic customer user profile object
  const userProfile = {
    id: backendUser?.id || null,
    name: backendUser?.name || trimmedName || `Customer ${cleanPhone.slice(-4)}`,
    email: backendUser?.email || (trimmedEmail || `customer_91${cleanPhone}@ivaessentials.com`),
    phone: backendUser?.phoneNumber || formattedPhone,
    joinedDate: backendUser?.createdAt
      ? new Date(backendUser.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  };

  return {
    success: true,
    user: userProfile,
    token
  };
}

/**
 * 3. Unified Login API
 * POST /api/auth/login
 * Supports phone OTP request, phone OTP verify, and legacy password login.
 *
 * @param {Object} credentials - { phone, otp?, email?, password? }
 * @returns {Promise<any>}
 */
export async function unifiedLoginApi(credentials) {
  const endpoint = `${API_BASE}/api/auth/login`;

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: data.error || data.message || 'Login failed. Please try again.',
        error: data.error || data.message
      };
    }

    return {
      success: true,
      ...data
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Network error during login.'
    };
  }
}
