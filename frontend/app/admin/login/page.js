'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';

// ── Hardcoded admin credentials (frontend-only auth)
const ADMIN_CREDENTIALS = {
  email: 'admin@carbonrmc.com',
  password: 'CarbonRMC@2026',
};

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate loading
    await new Promise(r => setTimeout(r, 800));

    try {
      if (
        form.email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
        form.password === ADMIN_CREDENTIALS.password
      ) {
        // Save session
        localStorage.setItem('admin_token', 'crmc-admin-2026-token');
        localStorage.setItem('admin_user', JSON.stringify({
          name: 'Carbon RMC Admin',
          email: ADMIN_CREDENTIALS.email,
          role: 'superadmin',
        }));
        router.push('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logoRing}>
            <Image
              src="/logo.jpg"
              alt="Carbon RMC"
              width={72}
              height={72}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <h1 className={styles.title}>
            <span style={{ color: '#5B9BFF' }}>CARB</span>
            <span style={{ color: '#FF6B00' }}>ON</span>
            {' '}
            <span className={styles.rmcBadge}>RMC</span>
          </h1>
          <p className={styles.sub}>Admin Panel — Secure Login</p>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.error}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>
              <span>📧</span> Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="admin@carbonrmc.com"
              className={styles.input}
              required
              autoComplete="email"
              id="admin-email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <span>🔑</span> Password
            </label>
            <div className={styles.passWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••••••"
                className={styles.input}
                required
                autoComplete="current-password"
                id="admin-password"
              />
              <button
                type="button"
                className={styles.showPass}
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
            id="admin-login-btn"
          >
            {loading ? (
              <>
                <span className={styles.spinner} /> Logging in...
              </>
            ) : (
              <> 🔐 Login to Admin Panel </>
            )}
          </button>
        </form>

        {/* Hint */}
        <div className={styles.hintBox}>
          <p className={styles.hintTitle}>🔐 Default Credentials</p>
          <p className={styles.hintLine}>
            <strong>Email:</strong> admin@carbonrmc.com
          </p>
          <p className={styles.hintLine}>
            <strong>Password:</strong> CarbonRMC@2026
          </p>
        </div>

        <p className={styles.copyright}>
          © 2026 Carbon RMC — Admin Access Only
        </p>
      </div>
    </div>
  );
}
