'use client';

/**
 * Utility functions for Google Tag Manager (GTM) & GA4 E-commerce DataLayer tracking.
 */

export const pushDataLayer = (data) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};

/**
 * Track when a user views a product page (GA4 view_item)
 */
export const trackViewItem = (product) => {
  if (!product) return;
  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'INR',
      value: product.price || 0,
      items: [
        {
          item_id: product.id || product.slug || 'product',
          item_name: product.name || product.title || 'Product',
          price: product.price || 0,
          currency: 'INR',
          quantity: 1,
        },
      ],
    },
  });
};

/**
 * Track when a user adds an item to cart (GA4 add_to_cart)
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!product) return;
  pushDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'INR',
      value: (product.price || 0) * quantity,
      items: [
        {
          item_id: product.id || product.slug || 'product',
          item_name: product.name || product.title || 'Product',
          price: product.price || 0,
          currency: 'INR',
          quantity: quantity,
        },
      ],
    },
  });
};

/**
 * Track when a user removes an item from cart (GA4 remove_from_cart)
 */
export const trackRemoveFromCart = (product, quantity = 1) => {
  if (!product) return;
  pushDataLayer({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'INR',
      value: (product.price || 0) * quantity,
      items: [
        {
          item_id: product.id || product.slug || 'product',
          item_name: product.name || product.title || 'Product',
          price: product.price || 0,
          currency: 'INR',
          quantity: quantity,
        },
      ],
    },
  });
};

/**
 * Track when a user proceeds to checkout (GA4 begin_checkout)
 */
export const trackBeginCheckout = (cartItems = [], totalValue = 0) => {
  pushDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'INR',
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.id || item.slug || 'product',
        item_name: item.name || item.title || 'Product',
        price: item.price || 0,
        currency: 'INR',
        quantity: item.quantity || 1,
      })),
    },
  });
};

/**
 * Track when an order is completed (GA4 purchase)
 */
export const trackPurchase = (orderData) => {
  if (!orderData) return;
  pushDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: orderData.id || orderData.orderId || `ORD-${Date.now()}`,
      value: orderData.total || orderData.amount || 0,
      currency: 'INR',
      shipping: orderData.shipping || 0,
      items: (orderData.items || []).map((item) => ({
        item_id: item.id || item.slug || 'product',
        item_name: item.name || item.title || 'Product',
        price: item.price || 0,
        currency: 'INR',
        quantity: item.quantity || 1,
      })),
    },
  });
};
