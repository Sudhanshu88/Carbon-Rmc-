'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className={styles.statCard} style={{ '--accent': color }}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <div className={styles.statVal}>{value ?? '...'}</div>
        <div className={styles.statLabel}>{label}</div>
        {sub && <div className={styles.statSub}>{sub}</div>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (!stored || !token) { router.push('/admin/login'); return; }
    setUser(JSON.parse(stored));
    loadStats();
    loadInquiries();
  }, []);

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  async function loadStats() {
    try {
      const res = await fetch('/api/stats', { headers: authHeaders });
      const data = await res.json();
      if (data.success) { setStats(data.stats); setInquiries(data.recentInquiries); }
    } catch { } finally { setLoading(false); }
  }

  async function loadInquiries() {
    try {
      const res = await fetch('/api/contact?limit=50', { headers: authHeaders });
      const data = await res.json();
      if (data.success) setInquiries(data.contacts);
    } catch { }
  }

  async function updateStatus(id, status) {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    loadInquiries();
    loadStats();
  }

  async function deleteInquiry(id) {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE', headers: authHeaders });
    loadInquiries();
    loadStats();
  }

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  }

  const statusColor = { new: '#3B82F6', contacted: '#F59E0B', converted: '#10B981', closed: '#6B7280' };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.sideLogo}>⬡</span>
          <div>
            <div className={styles.sideLogoText}><span style={{color:'#5B9BFF'}}>CARB</span><span style={{color:'#FF6B00'}}>ON</span></div>
            <div className={styles.sideLogoSub}>Admin Panel</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {[
            { id: 'dashboard', icon: '📊', label: 'Dashboard' },
            { id: 'inquiries', icon: '📩', label: 'Inquiries' },
            { id: 'projects',  icon: '🏗️', label: 'Projects' },
            { id: 'employees', icon: '👥', label: 'Employees' },
            { id: 'offices',   icon: '📍', label: 'Locations' },
          ].map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navActive : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'inquiries' && stats?.newContacts > 0 && (
                <span className={styles.badge}>{stats.newContacts}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.viewSite} target="_blank">🌐 View Site</Link>
          <button className={styles.logoutBtn} onClick={logout}>🚪 Logout</button>
          {user && <div className={styles.userInfo}>👤 {user.name}</div>}
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>
            {activeTab === 'dashboard' && '📊 Dashboard'}
            {activeTab === 'inquiries' && '📩 Customer Inquiries'}
            {activeTab === 'projects'  && '🏗️ Projects'}
            {activeTab === 'employees' && '👥 Employees'}
            {activeTab === 'offices'   && '📍 Locations'}
          </h1>
          <div className={styles.headerRight}>
            <span className={styles.liveTag}>🟢 Live</span>
          </div>
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === 'dashboard' && (
          <div>
            <div className={styles.statsGrid}>
              <StatCard icon="📩" label="Total Inquiries"  value={stats?.totalContacts}  sub={`${stats?.newContacts ?? 0} new`} color="#3B82F6" />
              <StatCard icon="🏗️" label="Total Projects"   value={stats?.totalProjects}  sub={`${stats?.ongoingProjects ?? 0} ongoing`} color="#FF6B00" />
              <StatCard icon="👥" label="Team Members"     value={stats?.totalEmployees} color="#10B981" />
              <StatCard icon="📍" label="Locations"        value={stats?.totalOffices}   color="#8B5CF6" />
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🕐 Recent Inquiries</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th><th>Phone</th><th>Type</th><th>Status</th><th>Date</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0,8).map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td><a href={`tel:${c.phone}`} style={{color:'#FF6B00'}}>{c.phone}</a></td>
                        <td>{c.projectType}</td>
                        <td>
                          <span className={styles.statusBadge} style={{background: statusColor[c.status]+'22', color: statusColor[c.status], border:`1px solid ${statusColor[c.status]}44`}}>
                            {c.status}
                          </span>
                        </td>
                        <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                        <td>
                          <select className={styles.statusSelect} value={c.status} onChange={e => updateStatus(c._id, e.target.value)}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr><td colSpan={6} style={{textAlign:'center',color:'rgba(255,255,255,0.3)',padding:'3rem'}}>No inquiries yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── INQUIRIES TAB ── */}
        {activeTab === 'inquiries' && (
          <div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Name</th><th>Phone</th><th>Email</th><th>Project Type</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {inquiries.map(c => (
                    <tr key={c._id}>
                      <td style={{fontWeight:600}}>{c.name}</td>
                      <td><a href={`tel:${c.phone}`} style={{color:'#FF6B00'}}>{c.phone}</a></td>
                      <td style={{fontSize:'0.8rem'}}>{c.email || '—'}</td>
                      <td>{c.projectType}</td>
                      <td style={{maxWidth:200, fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}} title={c.message}>{c.message.slice(0,60)}...</td>
                      <td>
                        <select className={styles.statusSelect} value={c.status} onChange={e => updateStatus(c._id, e.target.value)}>
                          <option value="new">🔵 New</option>
                          <option value="contacted">🟡 Contacted</option>
                          <option value="converted">🟢 Converted</option>
                          <option value="closed">⚫ Closed</option>
                        </select>
                      </td>
                      <td style={{fontSize:'0.78rem'}}>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={() => deleteInquiry(c._id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── OTHER TABS — Coming with full CRUD ── */}
        {(activeTab === 'projects' || activeTab === 'employees' || activeTab === 'offices') && (
          <AdminCRUD tab={activeTab} token={token} authHeaders={authHeaders} />
        )}
      </main>
    </div>
  );
}

// Simple CRUD placeholder for Projects, Employees, Offices tabs
function AdminCRUD({ tab, authHeaders }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpointMap = { projects: '/api/projects', employees: '/api/employees', offices: '/api/offices' };
  const endpoint = endpointMap[tab];

  useEffect(() => {
    fetch(endpoint, { headers: authHeaders })
      .then(r => r.json())
      .then(d => {
        const key = tab === 'projects' ? 'projects' : tab === 'employees' ? 'employees' : 'offices';
        setItems(d[key] || []);
        setLoading(false);
      });
  }, [tab]);

  async function deleteItem(id) {
    if (!confirm('Delete this item?')) return;
    await fetch(`${endpoint}/${id}`, { method: 'DELETE', headers: authHeaders });
    setItems(items.filter(i => i._id !== id));
  }

  const renderRow = (item) => {
    if (tab === 'projects') return (
      <tr key={item._id}>
        <td>{item.emoji} {item.title}</td>
        <td>{item.category}</td>
        <td>{item.location}, {item.city}</td>
        <td><span style={{color: item.status==='Ongoing'?'#3B82F6':'#10B981'}}>{item.status}</span></td>
        <td>{item.year}</td>
        <td><button className={styles.deleteBtn} onClick={() => deleteItem(item._id)}>🗑️</button></td>
      </tr>
    );
    if (tab === 'employees') return (
      <tr key={item._id}>
        <td style={{fontWeight:600}}>{item.empId}</td>
        <td>{item.emoji} {item.name}</td>
        <td>{item.role}</td>
        <td>{item.department}</td>
        <td>{item.phone || '—'}</td>
        <td><button className={styles.deleteBtn} onClick={() => deleteItem(item._id)}>🗑️</button></td>
      </tr>
    );
    if (tab === 'offices') return (
      <tr key={item._id}>
        <td>{item.emoji} {item.name}</td>
        <td><span style={{color: item.type==='plant'?'#FF6B00':'#3B82F6'}}>{item.type.toUpperCase()}</span></td>
        <td>{item.city}, {item.state}</td>
        <td>{item.manager || item.incharge || '—'}</td>
        <td><button className={styles.deleteBtn} onClick={() => deleteItem(item._id)}>🗑️</button></td>
      </tr>
    );
  };

  const headers = {
    projects:  ['Title','Category','Location','Status','Year','Del'],
    employees: ['ID','Name','Role','Department','Phone','Del'],
    offices:   ['Name','Type','City','Manager','Del'],
  };

  return (
    <div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr>{headers[tab].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{textAlign:'center',padding:'3rem',color:'rgba(255,255,255,0.3)'}}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} style={{textAlign:'center',padding:'3rem',color:'rgba(255,255,255,0.3)'}}>No {tab} found — add via API or contact form</td></tr>
            ) : items.map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
