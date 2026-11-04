import { getProductSku } from './products';
/**
 * Cart API Service
 * Handles server-side cart operations with ivabackend (https://api.ivaessentials.com/api/cart/items)
 * Uses httpOnly cookie credentials ('include') + optional Bearer token fallback from localStorage
 */

const baseOrigin = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
export const API_BASE = baseOrigin.endsWith('/api') ? baseOrigin : `${baseOrigin}/api`;

/**
 * Get headers including Bearer token if available in localStorage
 */
function getHeaders(extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('iva_session_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * 1. Fetch Cart Items from server
 * @returns {Promise<{ success: boolean, data?: any[], summary?: any, error?: string }>}
 */
export async function getCartItems() {
  const url = `${API_BASE}/cart/items`;
  const headers = getHeaders();

  console.log('🛒 [Cart API - GET] Requesting Cart Items:', {
    url,
    method: 'GET',
    credentials: 'include',
    hasBearerToken: Boolean(headers['Authorization'])
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include', // Automatically sends the httpOnly cookie
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🛒 [Cart API - GET] Response (${response.status} ${response.statusText}):`, data);

    if (response.status === 401) {
      console.warn('🔒 [Cart API - 401 Unauthorized] The backend rejected the request because no valid httpOnly cookie or Bearer token was found.');
    }

    return { ...data, statusCode: response.status };
  } catch (error) {
    console.error('❌ [Cart API - GET] Network Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. Add Item to Cart on server
 * @param {string} productId - Product ID or slug
 * @param {number} quantity - Quantity to add
 * @returns {Promise<{ success: boolean, data?: any, message?: string, error?: string }>}
 */
export async function addToCart(productId, quantity = 1, explicitSku = null) {
  const url = `${API_BASE}/cart/items`;
  const headers = getHeaders();
  const sku = explicitSku || getProductSku(productId);
  const payload = {
    productId,
    ...(sku ? { sku } : {}),
    quantity
  };

  console.log('🛒 [Cart API - POST] Sending Add to Cart Request:', {
    url,
    method: 'POST',
    headers,
    credentials: 'include',
    hasBearerToken: Boolean(headers['Authorization']),
    payload
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include', // Automatically sends the httpOnly cookie
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🛒 [Cart API - POST] Response (${response.status} ${response.statusText}):`, data);

    if (response.status === 401) {
      console.warn('🔒 [Cart API - 401 Unauthorized] Backend rejected POST /cart/items. User is not currently authenticated with a session cookie or token.');
    }

    return { ...data, statusCode: response.status };
  } catch (error) {
    console.error('❌ [Cart API - POST] Network Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 3. Update Item Quantity on server
 * @param {string} itemId - Cart Item ID or Product ID
 * @param {number} quantity - New total quantity
 * @returns {Promise<{ success: boolean, data?: any, message?: string, error?: string }>}
 */
export async function updateCartItemQuantity(itemId, quantity) {
  const url = `${API_BASE}/cart/items/${encodeURIComponent(itemId)}`;
  const headers = getHeaders();
  const payload = { quantity, sku: itemId, itemId };

  console.log('🛒 [Cart API - PUT] Updating Item Quantity:', {
    url,
    method: 'PUT',
    itemId,
    headers,
    credentials: 'include',
    payload
  });

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      credentials: 'include', // Automatically sends the httpOnly cookie
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🛒 [Cart API - PUT] Response (${response.status} ${response.statusText}):`, data);

    return { ...data, statusCode: response.status };
  } catch (error) {
    console.error('❌ [Cart API - PUT] Network Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 4. Remove Item from Cart on server
 * @param {string} itemId - Cart Item ID or Product ID
 * @returns {Promise<{ success: boolean, data?: any, message?: string, error?: string }>}
 */
export async function removeCartItem(itemId) {
  const url = `${API_BASE}/cart/items/${encodeURIComponent(itemId)}`;
  const headers = getHeaders();

  console.log('🛒 [Cart API - DELETE] Removing Item from Cart:', {
    url,
    method: 'DELETE',
    itemId,
    credentials: 'include'
  });

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      credentials: 'include', // Automatically sends the httpOnly cookie
    });

    const data = await response.json().catch(() => ({}));

    console.log(`🛒 [Cart API - DELETE] Response (${response.status} ${response.statusText}):`, data);

    return { ...data, statusCode: response.status };
  } catch (error) {
    console.error('❌ [Cart API - DELETE] Network Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Helper to transform backend item structure into frontend format
 */
export function mapServerItemToFrontend(item, fallbackMap = {}) {
  const product = item.product || {};
  const primaryMedia = product.media?.find(m => m.isPrimary) || product.media?.[0];
  const image = primaryMedia?.url || '';
  const slug = product.slug || item.productId || item.id;
  const fallback = fallbackMap[slug] || fallbackMap[item.productId] || fallbackMap[item.id] || {};

  const resolvedSku = product.sku || fallback.sku || getProductSku(slug) || getProductSku(product.name) || '';

  return {
    id: slug,                                     // Consistent slug/id used in frontend
    cartItemId: item.id,                          // Database cart item ID for PUT/DELETE
    productId: item.productId || product.id,
    sku: resolvedSku,
    name: product.name || fallback.name || 'Sacred Item',
    subtitle: fallback.subtitle || product.sku || '',
    price: Number(item.unitPrice || product.price || fallback.price || 0),
    quantity: Number(item.quantity || 1),
    image: image || fallback.image || '',
    href: slug ? `/product/${slug}` : (fallback.href || '/shop'),
    sankalpName: fallback.sankalpName || '',
    sankalpGotra: fallback.sankalpGotra || '',
    stock: product.availableStock
  };
}
