'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './admin.module.css';

/* ─── Sidebar nav items ─── */
const NAV = [
  { id: 'home',      icon: '🏠', label: 'Home'       },
  { id: 'inquiries', icon: '📩', label: 'Inquiries'  },
  { id: 'projects',  icon: '🏗️', label: 'Projects'   },
  { id: 'locations', icon: '📍', label: 'Locations'  },
  { id: 'employees', icon: '👥', label: 'Our Team'   },
  { id: 'services',  icon: '⚙️', label: 'Services'   },
];

/* ─── Stat card ─── */
function StatCard({ icon, label, value, color }) {
  return (
    <div className={styles.statCard} style={{ '--accent': color }}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <div className={styles.statVal}>{value ?? '—'}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

/* ─── Home section ─── */
function HomeSection() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>🏠 Website Overview</h2>
      <div className={styles.quickLinks}>
        {[
          { href: '/',          label: '🏠 Home Page',     color: '#3B82F6' },
          { href: '/about',     label: '👥 About Us',      color: '#8B5CF6' },
          { href: '/services',  label: '⚙️ Services',      color: '#FF6B00' },
          { href: '/projects',  label: '🏗️ Projects',      color: '#10B981' },
          { href: '/employees', label: '👤 Our Team',      color: '#F59E0B' },
          { href: '/offices',   label: '📍 Locations',     color: '#EF4444' },
          { href: '/contact',   label: '📞 Contact',       color: '#06B6D4' },
        ].map(({ href, label, color }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className={styles.quickLink}
            style={{ '--lc': color }}
          >
            {label}
            <span className={styles.qlArrow}>↗</span>
          </Link>
        ))}
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>🌐</div>
          <div>
            <div className={styles.infoTitle}>Live Website</div>
            <a href="https://carbon-rmc.vercel.app" target="_blank" className={styles.infoLink} rel="noreferrer">
              carbon-rmc.vercel.app ↗
            </a>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📱</div>
          <div>
            <div className={styles.infoTitle}>WhatsApp</div>
            <div className={styles.infoVal}>+91 90318 35122</div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📧</div>
          <div>
            <div className={styles.infoTitle}>Email</div>
            <div className={styles.infoVal}>info@carbonrmc.com</div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📅</div>
          <div>
            <div className={styles.infoTitle}>Established</div>
            <div className={styles.infoVal}>2026 · ISO Certified</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Locations section ─── */
function LocationsSection() {
  const locations = [
    { name: 'Head Office — Patna',         type: 'Office', city: 'Patna',    state: 'Bihar',   phone: '+91 90318 35122', manager: 'Sudhanshu Ranjan', icon: '🏢', isHQ: true  },
    { name: 'RMC Plant — Patna East',      type: 'Plant',  city: 'Patna',    state: 'Bihar',   phone: '+91 90318 35122', manager: 'Site Manager',     icon: '🏭', isHQ: false },
    { name: 'Branch Office — Muzaffarpur', type: 'Office', city: 'Muzaffarpur', state: 'Bihar', phone: '+91 90318 35122', manager: 'Branch Head',      icon: '🏢', isHQ: false },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>📍 Offices & Plants</h2>
        <span className={styles.countBadge}>{locations.length} locations</span>
      </div>
      <div className={styles.locGrid}>
        {locations.map((loc, i) => (
          <div key={i} className={styles.locCard}>
            <div className={styles.locTop}>
              <span className={styles.locIcon}>{loc.icon}</span>
              <div className={styles.locInfo}>
                <div className={styles.locName}>
                  {loc.name}
                  {loc.isHQ && <span className={styles.hqBadge}>HQ</span>}
                </div>
                <div className={styles.locType} style={{ color: loc.type === 'Plant' ? '#FF6B00' : '#3B82F6' }}>
                  {loc.type}
                </div>
              </div>
            </div>
            <div className={styles.locDetails}>
              <div>📌 {loc.city}, {loc.state}</div>
              <div>📞 {loc.phone}</div>
              <div>👤 {loc.manager}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Services section ─── */
function ServicesSection() {
  const services = [
    { icon: '🏠', name: 'Residential Construction',   desc: 'Homes, villas, apartments' },
    { icon: '🏢', name: 'Commercial Construction',    desc: 'Offices, malls, complexes' },
    { icon: '🏭', name: 'Industrial Construction',    desc: 'Factories, warehouses' },
    { icon: '🪨', name: 'Ready Mix Concrete (RMC)',   desc: 'M20 to M50 grades' },
    { icon: '🔨', name: 'Renovation & Retrofitting',  desc: 'Upgrade existing structures' },
    { icon: '🏗️', name: 'Infrastructure Projects',    desc: 'Roads, bridges, public works' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>⚙️ Our Services</h2>
        <span className={styles.countBadge}>{services.length} services</span>
      </div>
      <div className={styles.servGrid}>
        {services.map((s, i) => (
          <div key={i} className={styles.servCard}>
            <div className={styles.servIcon}>{s.icon}</div>
            <div className={styles.servName}>{s.name}</div>
            <div className={styles.servDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Placeholder for future sections ─── */
function PlaceholderSection({ tab }) {
  const info = {
    projects:  { icon: '🏗️', title: 'Projects',   note: 'Project data will appear here when backend is connected.' },
    employees: { icon: '👥', title: 'Our Team',   note: 'Employee records will appear here when backend is connected.' },
    inquiries: { icon: '📩', title: 'Inquiries',  note: 'Customer inquiries from the contact form will appear here.' },
  };
  const d = info[tab] || { icon: '📂', title: tab, note: '' };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{d.icon} {d.title}</h2>
      <div className={styles.placeholderBox}>
        <div className={styles.phIcon}>{d.icon}</div>
        <div className={styles.phTitle}>No data yet</div>
        <div className={styles.phNote}>{d.note}</div>
        <Link href="/contact" target="_blank" className={styles.phBtn}>
          Go to Contact Form ↗
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
══════════════════════════════════════════ */
export default function AdminDashboard() {
  const router = useRouter();
  const [user,      setUser]      = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    const tok    = localStorage.getItem('admin_token');
    if (!stored || !tok) { router.push('/admin/login'); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':      return <HomeSection />;
      case 'locations': return <LocationsSection />;
      case 'services':  return <ServicesSection />;
      default:          return <PlaceholderSection tab={activeTab} />;
    }
  };

  if (!user) return (
    <div style={{ minHeight: '100vh', background: '#07111F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      Loading...
    </div>
  );

  return (
    <div className={styles.layout}>

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <Image src="/logo.jpg" alt="logo" width={36} height={36} style={{ borderRadius: '50%', flexShrink: 0 }} />
          <div>
            <div className={styles.sideLogoText}>
              <span style={{ color: '#5B9BFF' }}>CARB</span>
              <span style={{ color: '#FF6B00' }}>ON</span>
            </div>
            <div className={styles.sideLogoSub}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navActive : ''}`}
              onClick={() => { setActiveTab(item.id); setMenuOpen(false); }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={styles.sidebarBottom}>
          <Link href="/" target="_blank" className={styles.viewSite}>
            🌐 View Site
          </Link>
          <button className={styles.logoutBtn} onClick={logout}>
            🚪 Logout
          </button>
          {user && (
            <div className={styles.userInfo}>
              <span className={styles.userDot}>●</span>
              {user.name}
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        {/* Topbar */}
        <div className={styles.topbar}>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <h1 className={styles.pageTitle}>
            {NAV.find(n => n.id === activeTab)?.icon}{' '}
            {NAV.find(n => n.id === activeTab)?.label}
          </h1>
          <div className={styles.topRight}>
            <span className={styles.liveTag}>🟢 Live</span>
          </div>
        </div>

        {/* Stats row on home */}
        {activeTab === 'home' && (
          <div className={styles.statsGrid}>
            <StatCard icon="🏗️" label="Projects Done"    value="200+"  color="#FF6B00" />
            <StatCard icon="😊" label="Happy Clients"    value="500+"  color="#10B981" />
            <StatCard icon="📍" label="Cities Covered"   value="15+"   color="#3B82F6" />
            <StatCard icon="⭐" label="Years Experience" value="10+"   color="#8B5CF6" />
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          {renderContent()}
        </div>
      </main>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
