'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * usePWAInstall — Custom hook for PWA installation
 *
 * Config options:
 * @param {number}  popupDelay      ms before popup shows (default: 3500)
 * @param {number}  redisplayDays   days before re-showing dismissed popup (default: 3)
 * @param {string}  storageKey      localStorage key (default: 'crmc-pwa')
 */
export default function usePWAInstall({
  popupDelay    = 3500,
  redisplayDays = 3,
  storageKey    = 'crmc-pwa',
} = {}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible,      setIsVisible]      = useState(false);
  const [isInstalled,    setIsInstalled]    = useState(false);
  const [isIOS,          setIsIOS]          = useState(false);
  const [isSupported,    setIsSupported]    = useState(false);
  const timerRef = useRef(null);
  const promptCaptured = useRef(false);

  // ── Check if already running as installed PWA
  const checkInstalled = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }, []);

  // ── Should we show popup?
  const shouldShow = useCallback(() => {
    if (typeof window === 'undefined') return false;
    if (checkInstalled()) return false;
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if (stored.installed) return false;
      if (stored.dismissed) {
        const days = (Date.now() - stored.dismissed) / (1000 * 60 * 60 * 24);
        if (days < redisplayDays) return false;
      }
    } catch { /* ignore */ }
    return true;
  }, [storageKey, redisplayDays, checkInstalled]);

  // ── Persist state
  const persist = useCallback((data) => {
    try {
      const prev = JSON.parse(localStorage.getItem(storageKey) || '{}');
      localStorage.setItem(storageKey, JSON.stringify({ ...prev, ...data }));
    } catch { /* ignore */ }
  }, [storageKey]);

  // ── Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Already installed as PWA — never show
    if (checkInstalled()) {
      setIsInstalled(true);
      return;
    }

    // Don't show if user already dismissed recently
    if (!shouldShow()) return;

    // ── iOS detection
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // ── Capture beforeinstallprompt (Chrome/Edge/Android)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      promptCaptured.current = true;
      setDeferredPrompt(e);
      setIsSupported(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
      persist({ installed: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // ── Show popup after delay regardless of beforeinstallprompt
    // (beforeinstallprompt may not fire in dev or on iOS)
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, popupDelay);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Trigger native install prompt
  const triggerInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsVisible(false);
        persist({ installed: true });
      } else {
        persist({ dismissed: Date.now() });
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    } finally {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt, persist]);

  // ── Dismiss popup
  const dismiss = useCallback(() => {
    setIsVisible(false);
    persist({ dismissed: Date.now() });
  }, [persist]);

  // ── Force show (for testing)
  const show = useCallback(() => setIsVisible(true), []);

  return {
    isVisible,
    isInstalled,
    isIOS,
    isSupported,
    deferredPrompt,
    triggerInstall,
    dismiss,
    show,
  };
}
