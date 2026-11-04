'use client';

import { useState, useEffect, useCallback } from 'react';
import { loadRazorpayScript, openRazorpayCheckout } from '../lib/razorpay';

/**
 * Custom React Hook for Razorpay Payment Gateway
 * 
 * Provides:
 * - initiatePayment: triggers the complete payment flow
 * - isProcessing: true while order creation, modal checkout, or verification is pending
 * - error: human-friendly error string if anything fails
 * - clearError: clears current error state
 * - isScriptLoaded: whether Razorpay SDK script has loaded
 */
export function useRazorpay() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Preload script when hook mounts in browser
  useEffect(() => {
    let mounted = true;
    loadRazorpayScript().then((loaded) => {
      if (mounted) {
        setIsScriptLoaded(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Initiate payment flow
   * @param {Object} options
   * @param {Array<{ sku?: string, productId?: string, quantity: number }>} options.items Cart items
   * @param {string|null} [options.userId] Optional user UUID
   * @param {Object} [options.customer] { name, email, phone }
   * @param {Object} [options.shippingAddress] Shipping address details
   * @param {Object} [options.prefill] { name, email, contact }
   * @param {Object} [options.notes] Extra notes/metadata
   * @param {Function} options.onSuccess ({ verifyData, paymentResponse, orderData })
   * @param {Function} [options.onError] (error)
   * @param {Function} [options.onDismiss] ()
   */

  const initiatePayment = useCallback(
    async ({ items, userId = null, customer = null, shippingAddress = null, prefill = {}, notes = {}, onSuccess, onError, onDismiss }) => {
      setError(null);
      setIsProcessing(true);

      return new Promise((resolve, reject) => {
        openRazorpayCheckout({
          items,
          userId,
          customer,

          shippingAddress,
          prefill,
          notes,
          onSuccess: async (result) => {
            setIsProcessing(false);
            if (onSuccess) {
              try {
                await onSuccess(result);
              } catch (e) {
                console.error('Error in onSuccess handler:', e);
              }
            }
            resolve(result);
          },
          onError: (err) => {
            setIsProcessing(false);
            const message = err?.message || 'Payment could not be processed. Please try again.';
            setError(message);
            if (onError) {
              onError(err);
            }
            reject(err);
          },
          onDismiss: () => {
            setIsProcessing(false);
            if (onDismiss) {
              onDismiss();
            }
          },
        });
      });
    },
    []
  );

  return {
    initiatePayment,
    isProcessing,
    error,
    setError,
    clearError,
    isScriptLoaded,
  };
}

export default useRazorpay;
