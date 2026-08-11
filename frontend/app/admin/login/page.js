'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image src="/logo.jpg" alt="Carbon RMC" width={80} height={80} style={{ borderRadius: '50%' }} />
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.sub}>Carbon RMC — Secure Login</p>
        </div>

        {error && <div className={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="admin@carbonrmc.com"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? '⏳ Logging in...' : '🔐 Login to Admin'}
          </button>
        </form>

        <p className={styles.hint}>
          First time? Run: <code>POST /api/auth/setup</code> to create admin
        </p>
      </div>
    </div>
  );
}
