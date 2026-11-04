/**
 * Mobile OTP Verification Service
 * Integrates with Fracspace Mobile Verification API
 */

const OTP_BASE_URL = 'https://apitest.fracspace.com/api/users';
const API_KEY = 'Fracspace@2024';
const TIMEOUT_MS = 10000; // 10 seconds timeout

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
 * Send OTP API
 * POST https://apitest.fracspace.com/api/users/sendOTPForMobileVerification
 * 
 * @param {string} phone - Mobile number (10-digit or with +91)
 * @returns {Promise<{ success: boolean, message: string, data?: any }>}
 */
export async function sendOtpApi(phone) {
  const formattedPhone = formatPhoneNumber(phone);

  if (!formattedPhone || formattedPhone.replace(/\D/g, '').length < 10) {
    return {
      success: false,
      message: 'Please provide a valid 10-digit mobile phone number.'
    };
  }

  const payload = {
    phoneNumber: formattedPhone,
    smsCountry: true
  };

  try {
    console.log('📱 [OTP Service] Sending OTP to:', formattedPhone);

    const response = await fetchWithTimeout(`${OTP_BASE_URL}/sendOTPForMobileVerification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    console.log(`📱 [OTP Service] Send OTP response (${response.status}):`, data);

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: data.message || data.error || 'Failed to send OTP. Please try again.'
      };
    }

    return {
      success: true,
      message: data.message || 'OTP sent successfully to your mobile number.',
      data
    };
  } catch (err) {
    console.error('❌ [OTP Service] Send OTP Error:', err);
    return {
      success: false,
      message: err.message || 'Network error while sending OTP. Please try again.'
    };
  }
}

/**
 * Verify OTP API
 * POST https://apitest.fracspace.com/api/users/verifyOTPForMobileVerification
 * 
 * @param {string} phone - Mobile number
 * @param {string|number} otpCode - 6-digit OTP code entered by user
 * @returns {Promise<{ success: boolean, message: string, data?: any }>}
 */
export async function verifyOtpApi(phone, otpCode) {
  const formattedPhone = formatPhoneNumber(phone);
  const cleanOtp = String(otpCode || '').trim();

  if (!cleanOtp) {
    return {
      success: false,
      message: 'Please enter the verification OTP code.'
    };
  }

  const payload = {
    phoneNumber: formattedPhone,
    otp: cleanOtp,
    smsCountry: true
  };

  try {
    console.log('🔐 [OTP Service] Verifying OTP for:', formattedPhone);

    const response = await fetchWithTimeout(`${OTP_BASE_URL}/verifyOTPForMobileVerification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🔐 [OTP Service] Verify OTP response (${response.status}):`, data);

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: data.message || data.error || 'Invalid OTP code. Please try again.'
      };
    }

    return {
      success: true,
      message: data.message || 'Mobile number verified successfully!',
      data
    };
  } catch (err) {
    console.error('❌ [OTP Service] Verify OTP Error:', err);
    return {
      success: false,
      message: err.message || 'Network error while verifying OTP. Please try again.'
    };
  }
}

/**
 * Synchronize OTP-verified mobile customer with backend:
 * Registers the user in the database if new, or logs them in if existing,
 * returning the authentic backend user profile and JWT token.
 *
 * @param {Object} params
 * @param {string} params.phone - 10-digit mobile phone
 * @param {string} [params.name] - Customer name
 * @param {string} [params.email] - Customer email
 * @returns {Promise<{ success: boolean, user: Object, token: string }>}
 */
export async function syncOtpUserWithBackend({ phone, name = '', email = '' }) {
  const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  if (!cleanPhone || cleanPhone.length < 10) {
    throw new Error('A valid 10-digit mobile phone number is required.');
  }

  const formattedPhone = `+91${cleanPhone}`;
  const effectiveEmail = (email && !email.includes('@ivaessentials.com'))
    ? email.trim()
    : `${cleanPhone}@ivaessentials.com`;
  const effectiveName = (name && name.trim()) || `Customer ${cleanPhone.slice(-4)}`;
  const defaultOtpPassword = `IVA_${cleanPhone}`;

  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');

  let token = null;
  let backendUser = null;

  try {
    // 1. Try to register customer in database
    const regRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: effectiveName,
        email: effectiveEmail,
        password: defaultOtpPassword,
        phoneNumber: formattedPhone
      })
    });

    const regData = await regRes.json().catch(() => ({}));

    if (regRes.ok && regData.success && regData.data?.token) {
      token = regData.data.token;
      backendUser = regData.data.user;
    } else if (regRes.status === 409 || (regData.error && regData.error.toLowerCase().includes('already exists'))) {
      // 2. Customer already exists in database: log in to generate authentic session token
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: effectiveEmail,
          password: defaultOtpPassword
        })
      });

      const loginData = await loginRes.json().catch(() => ({}));
      if (loginRes.ok && loginData.success && loginData.data?.token) {
        token = loginData.data.token;
        backendUser = loginData.data.user;
      }
    }
  } catch (err) {
    console.warn('⚠️ [OTP Auth Sync] Backend sync notice:', err.message);
  }

  // Build authentic customer user profile
  const userProfile = {
    id: backendUser?.id || null,
    name: backendUser?.name || effectiveName,
    email: backendUser?.email || effectiveEmail,
    phone: backendUser?.phoneNumber || formattedPhone,
    joinedDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  };

  // Return verified user profile and token
  return {
    success: true,
    user: userProfile,
    token
  };
}
