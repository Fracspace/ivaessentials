'use client';

import { getProductSku } from '../lib/products';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import CartToast from '../components/CartToast';
import { trackAddToCart, trackRemoveFromCart } from '../lib/gtm';
import {
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  mapServerItemToFrontend
} from '../lib/cartApi';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isServerSynced = useRef(false);

  const [sankalpNote, setSankalpNote] = useState({
    name: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    gotram: '',
    nakshatra: '',
    rasi: '',
    poojaDate: 'August 3, 2026',
    prayers: ''
  });

  const [toast, setToast] = useState({ visible: false, item: null });

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  // Sync cart with backend server (uses httpOnly cookie credentials + Bearer token)
  const syncWithServer = useCallback(async (currentLocalCart = null) => {
    if (typeof window === 'undefined') return null;
    const token = sessionStorage.getItem('iva_session_token');
    if (!token) return null; // Guest user: keep local storage, skip server calls

    try {
      const localItems = currentLocalCart || cartItems || [];
      const res = await getCartItems();

      if (res && res.success && Array.isArray(res.data)) {
        isServerSynced.current = true;
        const serverItems = res.data;

        // Build set of already-synced server product identifiers
        const serverIdentifiers = new Set();
        serverItems.forEach(si => {
          if (si.productId) serverIdentifiers.add(si.productId);
          if (si.product?.id) serverIdentifiers.add(si.product.id);
          if (si.product?.sku) serverIdentifiers.add(si.product.sku);
          if (si.product?.slug) serverIdentifiers.add(si.product.slug);
        });

        // MERGE: If customer has local guest items not yet in server cart, push them to DB
        let hasMergedNewItems = false;
        if (localItems && localItems.length > 0) {
          for (const item of localItems) {
            const pId = item.productId || item.id;
            const sku = item.sku;
            const isAlreadyOnServer = serverIdentifiers.has(pId) || (sku && serverIdentifiers.has(sku)) || (item.id && serverIdentifiers.has(item.id));

            if (!isAlreadyOnServer) {
              try {
                await addToCart(pId, item.quantity || 1, sku);
                hasMergedNewItems = true;
              } catch (mergeErr) {
                console.warn('⚠️ [CartContext] Error merging guest item to server:', mergeErr.message);
              }
            }
          }
        }

        // Fetch fresh server cart if we merged any guest items
        const finalRes = hasMergedNewItems ? await getCartItems() : res;
        const finalServerItems = (finalRes && finalRes.success && Array.isArray(finalRes.data)) ? finalRes.data : serverItems;

        const fallbackMap = {};
        localItems.forEach(i => {
          fallbackMap[i.id] = i;
          if (i.productId) fallbackMap[i.productId] = i;
          if (i.cartItemId) fallbackMap[i.cartItemId] = i;
          if (i.sku) fallbackMap[i.sku] = i;
        });

        const mapped = finalServerItems.map(item => mapServerItemToFrontend(item, fallbackMap));
        setCartItems(mapped);
        try {
          localStorage.setItem('iva_cart', JSON.stringify(mapped));
        } catch (e) { }
        return mapped;
      }
    } catch (e) {
      console.warn('⚠️ [CartContext] Server cart sync skipped:', e.message);
    }
    return null;
  }, [cartItems]);

  // Load cart on client mount:
  // 1. Immediately loads localStorage for instant UI rendering
  // 2. Asynchronously fetches server cart via httpOnly cookie if authenticated
  useEffect(() => {
    let localData = [];
    try {
      const savedCart = localStorage.getItem('iva_cart');
      if (savedCart) {
        localData = JSON.parse(savedCart);
        setCartItems(localData);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);

    // Check server for authenticated user's cart
    syncWithServer(localData);
  }, []);

  // Save cart to localStorage whenever it updates locally
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('iva_cart', JSON.stringify(cartItems));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cartItems, isLoaded]);

  // Listen to same-tab auth changes and multi-tab storage changes to keep cart fresh
  useEffect(() => {
    const handleAuthChange = (e) => {
      if (e?.detail && e.detail.user === null) {
        setCartItems([]);
        return;
      }
      let localData = [];
      try {
        const saved = localStorage.getItem('iva_cart');
        if (saved) localData = JSON.parse(saved);
      } catch (e) { }
      syncWithServer(localData);
    };

    window.addEventListener('iva_auth_changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('iva_auth_changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [syncWithServer]);

  // 1. ADD ITEM TO CART
  const addItem = async (newItem) => {
    trackAddToCart(newItem, newItem.quantity || 1);

    // Resolve official SKU from registry or item prop
    const resolvedSku = newItem.sku || getProductSku(newItem.id) || getProductSku(newItem.productId) || getProductSku(newItem.name) || '';
    const itemWithSku = {
      ...newItem,
      sku: resolvedSku,
      productId: newItem.productId || newItem.id
    };

    const targetProductId = newItem.productId || newItem.id || resolvedSku;
    const addQty = newItem.quantity || 1;

    setCartItems(prev => {
      const existing = prev.find(item =>
        item.id === newItem.id ||
        item.productId === targetProductId ||
        (resolvedSku && item.sku === resolvedSku)
      );
      const updated = existing
        ? prev.map(item =>
          (item.id === newItem.id || item.productId === targetProductId || (resolvedSku && item.sku === resolvedSku))
            ? { ...item, ...itemWithSku, quantity: item.quantity + addQty }
            : item
        )
        : [...prev, { ...itemWithSku, quantity: addQty }];
      return updated;
    });

    // Trigger pop-up notification
    setToast({ visible: true, item: itemWithSku });

    // Call server API with httpOnly cookie credentials and SKU to update db
    try {
      const res = await addToCart(targetProductId, addQty, resolvedSku);
      if (res && res.success && res.data?.items) {
        isServerSynced.current = true;
        const fallbackMap = { [newItem.id]: newItem };
        const mapped = res.data.items.map(item => mapServerItemToFrontend(item, fallbackMap));
        setCartItems(mapped);
      }
    } catch (err) {
      console.warn('⚠️ [CartContext] Server addToCart notice:', err.message);
    }
  };

  // 2. REMOVE ITEM FROM CART
  const removeItem = async (id) => {
    const target = cartItems.find(item => item.sku === id || item.id === id || item.cartItemId === id || item.productId === id);
    if (target) {
      trackRemoveFromCart(target, target.quantity);
    }

    // Optimistically remove from state
    setCartItems(prev => prev.filter(item => item.id !== id && item.cartItemId !== id && item.productId !== id));

    // Call server DELETE API with itemId (cart item ID, product ID, or slug)
    const serverItemId = target?.sku || target?.cartItemId || target?.productId || target?.id || id;
    try {
      const res = await removeCartItem(serverItemId);
      if (res && res.success && res.data?.items) {
        const mapped = res.data.items.map(item => mapServerItemToFrontend(item));
        setCartItems(mapped);
      }
    } catch (err) {
      console.warn('⚠️ [CartContext] Server removeCartItem notice:', err.message);
    }
  };

  // 3. UPDATE ITEM QUANTITY
  const updateQuantity = async (id, delta) => {
    const target = cartItems.find(item => item.sku === id || item.id === id || item.cartItemId === id || item.productId === id);
    if (!target) return;

    const newQty = target.quantity + delta;

    if (newQty <= 0) {
      await removeItem(id);
      return;
    }

    // Optimistically update local state
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id || item.cartItemId === id || item.productId === id) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    // Call server PUT API
    const serverItemId = target?.sku || target?.cartItemId || target?.productId || target?.id || id;
    try {
      const res = await updateCartItemQuantity(serverItemId, newQty);
      if (res && res.success && res.data?.items) {
        const mapped = res.data.items.map(item => mapServerItemToFrontend(item));
        setCartItems(mapped);
      }
    } catch (err) {
      console.warn('⚠️ [CartContext] Server updateQuantity notice:', err.message);
    }
  };

  // 4. CLEAR CART
  const clearCart = async () => {
    const current = [...cartItems];
    setCartItems([]);
    try {
      localStorage.removeItem('iva_cart');
    } catch (e) { }

    // If items had backend cart IDs, remove them from server session
    for (const item of current) {
      if (item.cartItemId) {
        removeCartItem(item.cartItemId).catch(() => { });
      }
    }
  };

  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        syncWithServer,
        itemCount,
        subtotal,
        sankalpNote,
        setSankalpNote,
        isLoaded,
        toast,
        hideToast
      }}
    >
      {children}
      <CartToast />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

