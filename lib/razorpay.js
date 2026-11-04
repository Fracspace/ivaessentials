/**
 * Razorpay Payment Gateway Utility
 * 
 * Provides:
 * 1. Dynamic Razorpay checkout.js script loader
 * 2. Order creation API client (POST /api/create-order)
 * 3. Payment signature verification API client (POST /api/verify-payment)
 * 4. High-level payment orchestration helper
 */

export const RAZORPAY_CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Get sanitized backend base URL
 * Falls back to https://api.ivaessentials.com if not specified
 */
export function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com';
  return url.replace(/\/+$/, '');
}

/**
 * Get sanitized Razorpay Key ID
 */
export function getRazorpayKeyId() {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Se3fpjfkidYHdV';
  return key.trim().replace(/^['"]|['"]$/g, '');
}

/**
 * 1. Load Razorpay Checkout SDK script dynamically if not already loaded
 * @returns {Promise<boolean>}
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }

    if (window.Razorpay) {
      return resolve(true);
    }

    // Check if script tag is already in DOM
    const existing = document.querySelector(`script[src="${RAZORPAY_CHECKOUT_SCRIPT}"]`);
    if (existing) {
      if (window.Razorpay) return resolve(true);
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    // Dynamically insert script tag
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.async = true;
    script.id = 'razorpay-checkout-script';

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.error('❌ Failed to load Razorpay SDK from', RAZORPAY_CHECKOUT_SCRIPT);
      resolve(false);
    };

    document.head.appendChild(script);
  });
}

/**
 * 2. Step A: Create Order on Backend
 * POST `${NEXT_PUBLIC_API_URL}/api/create-order`
 * 
 * Note: Price is NEVER sent from the client. The backend resolves the SKU/productId
 * against the database to determine the authentic total to prevent tampering.
 * 
 * @param {Object} params
 * @param {Array<{ sku?: string, productId?: string, quantity: number }>} params.items Cart items
 * @param {string|null} [params.userId] Optional user UUID
 * @param {Object} [params.customer] { name, email, phone }
 * @param {Object} [params.shippingAddress] Full shipping address object
 * @param {number} [params.shippingAmount] Optional shipping fee
 * @param {number} [params.discountAmount] Optional discount
 * @returns {Promise<{ order_id: string, amount: number, currency: string, total: number, db_order_id?: string }>}
 */
export async function createRazorpayOrder({ items, userId = null, customer = null, shippingAddress = null, shippingAmount = 0, discountAmount = 0 }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('At least one item is required to initialize payment.');
  }

  // Sanitize items payload - only send identifier and quantity, NO client-side price!
  const sanitizedItems = items.map((item) => ({
    sku: item.sku || '',
    productId: item.productId || item.id || '',
    quantity: Math.max(1, Number(item.quantity) || 1),
  }));

  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/create-order`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('iva_session_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      items: sanitizedItems,
      userId: userId || null,
      customer,
      shippingAddress,
      shippingAmount,
      discountAmount,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const message = data.error || data.message || `Unable to initialize payment order (Status ${response.status})`;
    throw new Error(message);
  }

  return data;
}

/**
 * 3. Step C: Verify Razorpay Signature on Backend
 * POST `${NEXT_PUBLIC_API_URL}/api/verify-payment`
 * 
 * @param {Object} params
 * @param {string} params.razorpay_order_id
 * @param {string} params.razorpay_payment_id
 * @param {string} params.razorpay_signature
 * @returns {Promise<{ success: boolean, message?: string, order?: any }>}
 */
export async function verifyRazorpayPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new Error('Incomplete payment verification parameters received from payment gateway.');
  }

  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/verify-payment`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('iva_session_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const message = data.error || data.message || 'Payment verification failed. Please contact support if amount was deducted.';
    throw new Error(message);
  }

  return data;
}

/**
 * Step D (Optional): Cancel order on backend when checkout is dismissed or declined
 * POST `${NEXT_PUBLIC_API_URL}/api/cancel-order`
 * 
 * @param {string} razorpay_order_id
 * @returns {Promise<any>}
 */
export async function cancelRazorpayOrder(razorpay_order_id) {
  if (!razorpay_order_id) return null;
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/api/cancel-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ razorpay_order_id }),
    });
    return await response.json().catch(() => ({}));
  } catch (e) {
    console.warn('Non-fatal: could not report cancellation to backend:', e.message);
    return null;
  }
}

/**
 * 4. Step B & Flow Orchestrator:
 * Loads SDK -> Creates Order -> Opens Modal -> Verifies Signature -> Calls Success/Failure
 * 
 * @param {Object} options
 * @param {Array<{ sku?: string, productId?: string, quantity: number }>} options.items Items array (price computed by backend)
 * @param {string|null} [options.userId] Optional user UUID
 * @param {Object} [options.customer] { name, email, phone }
 * @param {Object} [options.shippingAddress] Full shipping address object
 * @param {Object} [options.prefill] { name, email, contact }
 * @param {Object} [options.notes] Custom metadata notes
 * @param {Function} options.onSuccess Called when verification succeeds ({ verifyData, paymentResponse, orderData })
 * @param {Function} options.onError Called on error or verification failure (error)
 * @param {Function} [options.onDismiss] Called when user closes modal without paying
 */
export async function openRazorpayCheckout({
  items,
  userId = null,
  customer = null,
  shippingAddress = null,
  prefill = {},
  notes = {},
  onSuccess,
  onError,
  onDismiss,
}) {
  // 1. Ensure Razorpay script is loaded
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || typeof window.Razorpay === 'undefined') {
    const scriptError = new Error('Razorpay SDK failed to load. Please check your internet connection and try again.');
    onError?.(scriptError);
    return;
  }

  try {
    // 2. Step A: Create Order on backend (price strictly determined by backend database)
    const orderData = await createRazorpayOrder({ items, userId, customer, shippingAddress });

    const key = getRazorpayKeyId();

    // 3. Step B: Configure modal options
    const options = {
      key,
      amount: orderData.amount, // amount already in paise returned by backend
      currency: orderData.currency || 'INR',
      name: 'IVA Essentials',
      description: 'Sacred Offerings & Temple-Consecrated Kits',
      order_id: orderData.order_id,
      image: '/favicon.ico',
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact ? String(prefill.contact).replace(/[^\d+]/g, '') : '',
      },
      notes: {
        ...notes,
        merchant_order_id: orderData.order_id,
      },
      theme: {
        color: '#17130F', // Brand charcoal color
      },
      modal: {
        ondismiss: () => {
          if (orderData?.order_id) {
            cancelRazorpayOrder(orderData.order_id).catch(() => { });
          }
          if (onDismiss) {
            onDismiss();
          }
        },
        escape: true,
        backdropclose: false,
      },
      // 4. Step C: Handler for successful payment modal submission
      handler: async (response) => {
        
        try {

          // Verify signature on backend
          const verifyData = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          // 5. Step D: Trigger success callback
          if (onSuccess) {
            await onSuccess({
              verifyData,
              paymentResponse: response,
              orderData,
            });
          }
        } catch (verifyError) {
          console.error('❌ Razorpay Payment Verification Error:', verifyError);
          onError?.(verifyError);
        }
      },
    };

    const razorpayInstance = new window.Razorpay(options);

    // Handle payment failures inside Razorpay modal
    razorpayInstance.on('payment.failed', (failResponse) => {
      console.warn('⚠️ Razorpay payment failed inside modal:', failResponse.error);
      if (orderData?.order_id) {
        cancelRazorpayOrder(orderData.order_id).catch(() => { });
      }
      const failError = new Error(
        failResponse.error?.description ||
        failResponse.error?.reason ||
        'Payment was declined or cancelled.'
      );
      failError.details = failResponse.error;
      onError?.(failError);
    });

    // Open Razorpay Checkout Modal
    razorpayInstance.open();
  } catch (err) {
    console.error('❌ Failed to initialize Razorpay checkout:', err);
    onError?.(err);
  }
}
