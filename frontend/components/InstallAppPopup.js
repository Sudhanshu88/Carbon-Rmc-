'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import usePWAInstall from '../hooks/usePWAInstall';
import styles from './InstallAppPopup.module.css';

/* ─── Feature list — Carbon RMC specific ─── */
const FEATURES = [
  { icon: '⚡', text: 'Instant access — no browser needed' },
  { icon: '📱', text: 'Full mobile app experience' },
  { icon: '🏗️', text: 'Browse all projects & services offline' },
  { icon: '📞', text: 'One-tap call & WhatsApp contact' },
  { icon: '📊', text: 'Get quotes & track inquiries easily' },
  { icon: '🔐', text: 'Secure & fast — always up to date' },
];

/**
 * InstallAppPopup
 *
 * Props (all optional):
 * @param {string}  appName         Display name  (default: 'Carbon RMC')
 * @param {string}  appDescription  Tagline
 * @param {number}  popupDelay      ms before showing (default: 3000)
 * @param {number}  redisplayDays   Days before re-showing (default: 3)
 */
export default function InstallAppPopup({
  appName        = 'Carbon RMC',
  appDescription = 'Premium Construction & RMC — Install for the best experience',
  popupDelay     = 3000,
  redisplayDays  = 3,
}) {
  const overlayRef  = useRef(null);
  const dialogRef   = useRef(null);

  const {
    isVisible,
    isInstalled,
    isIOS,
    isSupported,
    deferredPrompt,
    triggerInstall,
    dismiss,
  } = usePWAInstall({ popupDelay, redisplayDays });

  /* ── Keyboard: Escape to close ── */
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isVisible, dismiss]);

  /* ── Focus trap ── */
  useEffect(() => {
    if (isVisible && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isVisible]);

  /* ── Prevent body scroll when open ── */
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  if (isInstalled || !isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`}
      onClick={(e) => { if (e.target === overlayRef.current) dismiss(); }}
      ref={overlayRef}
      aria-modal="true"
      role="dialog"
      aria-label="Install Carbon RMC App"
    >
      <div
        className={`${styles.popup} ${isVisible ? styles.popupVisible : ''}`}
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* ── Close button ── */}
        <button
          className={styles.closeBtn}
          onClick={dismiss}
          aria-label="Close install popup"
          id="pwa-popup-close"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.logoWrap}>
            <Image
              src="/logo.jpg"
              alt="Carbon RMC Logo"
              width={64}
              height={64}
              className={styles.logoImg}
              priority
            />
            <div className={styles.installBadge}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </div>
          </div>

          <div className={styles.appInfo}>
            <h2 className={styles.appName}>
              <span className={styles.nameCarb}>CARB</span>
              <span className={styles.nameOn}>ON</span>
              {' '}
              <span className={styles.nameRmc}>RMC</span>
            </h2>
            <p className={styles.appDesc}>{appDescription}</p>
            <div className={styles.ratingRow}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.ratingText}>Trusted by 500+ clients</span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} />

        {/* ── Feature list ── */}
        <ul className={styles.features} aria-label="App features">
          {FEATURES.map(({ icon, text }) => (
            <li key={text} className={styles.featureItem}>
              <span className={styles.featureIcon}>{icon}</span>
              <span className={styles.featureText}>{text}</span>
            </li>
          ))}
        </ul>

        {/* ── iOS instructions ── */}
        {isIOS && !isSupported && (
          <div className={styles.iosInstructions}>
            <div className={styles.iosStep}>
              <span className={styles.iosIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                </svg>
              </span>
              <span>Tap the <strong>Share</strong> button in Safari</span>
            </div>
            <div className={styles.iosStep}>
              <span className={styles.iosIcon}>➕</span>
              <span>Select <strong>"Add to Home Screen"</strong></span>
            </div>
            <div className={styles.iosStep}>
              <span className={styles.iosIcon}>✅</span>
              <span>Tap <strong>"Add"</strong> to install</span>
            </div>
          </div>
        )}

        {/* ── Chrome install guide (when native prompt not yet fired) ── */}
        {!isIOS && !deferredPrompt && (
          <div className={styles.chromeGuide}>
            <div className={styles.chromeGuideTitle}>
              <span>📌</span> Install via Chrome Address Bar:
            </div>
            <div className={styles.chromeStep}>
              <span className={styles.chromeNum}>1</span>
              <span>Look for the <strong>install icon ⊕</strong> in your browser address bar (top right)</span>
            </div>
            <div className={styles.chromeStep}>
              <span className={styles.chromeNum}>2</span>
              <span>Click it and select <strong>"Install"</strong></span>
            </div>
            <div className={styles.chromeStep}>
              <span className={styles.chromeNum}>3</span>
              <span>Or use Chrome menu <strong>⋮ → "Install Carbon RMC"</strong></span>
            </div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className={styles.actions}>
          {!isIOS ? (
            deferredPrompt ? (
              // ✅ Native install available (Chrome/Edge/Android)
              <button
                className={styles.installBtn}
                onClick={triggerInstall}
                id="pwa-install-btn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Install App — It's Free!
              </button>
            ) : (
              // ⏳ Waiting — dismiss and revisit to trigger install
              <button
                className={styles.installBtn}
                onClick={dismiss}
                id="pwa-install-btn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Got it — I'll Install from Address Bar
              </button>
            )
          ) : null}

          <button
            className={styles.dismissBtn}
            onClick={dismiss}
            id="pwa-dismiss-btn"
          >
            {isIOS ? 'Got it, thanks!' : 'Not Now'}
          </button>
        </div>

        {/* ── Footer note ── */}
        <p className={styles.footerNote}>
          Free to install · No sign-up required · Works offline
        </p>
      </div>
    </div>
  );
}
