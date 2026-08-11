import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Team | Carbon RMC',
  description: 'Meet the expert team behind Carbon RMC — engineers, architects, and construction professionals dedicated to excellence.',
};

const departments = ['All', 'Engineering', 'Site', 'Admin', 'Sales', 'Finance', 'HR', 'Operations'];

const employees = [
  
  { id: 'CRMC-012', name: 'Cheeku Sharma',      role: 'Admin & Procurement Head',   dept: 'Admin',       exp: '10 yrs',  emoji: '👩‍💼', linkedin: '#' },
];

const deptColors = {
  Engineering: 'badge-blue',
  Site: 'badge-gold',
  Admin: 'badge-green',
  Sales: 'badge-gold',
  Finance: 'badge-blue',
  HR: 'badge-green',
  Operations: 'badge-gold',
};

export default function EmployeesPage() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <p className="section-label">The People Behind The Work</p>
          <h1 className="section-title">Meet Our <span>Team</span></h1>
          <div className="divider"></div>
          <p className="section-desc">
            30+ skilled professionals united by a passion for quality construction and client satisfaction.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className={styles.filterRow}>
            {departments.map((d) => (
              <span key={d} className={`tag-pill ${d === 'All' ? 'active' : ''}`}>{d}</span>
            ))}
          </div>

          {/* Team Stats */}
          <div className={styles.teamStats}>
            {[
              { n: '30+', l: 'Total Employees' },
              { n: '7',   l: 'Departments' },
              { n: '12+', l: 'Avg Years Exp.' },
              { n: '100%',l: 'ESIC Covered' },
            ].map(({ n, l }) => (
              <div key={l} className={styles.teamStat}>
                <span className={styles.teamStatNum}>{n}</span>
                <span className={styles.teamStatLabel}>{l}</span>
              </div>
            ))}
          </div>

          {/* Employee Grid */}
          <div className={styles.empGrid}>
            {employees.map(({ id, name, role, dept, exp, emoji, linkedin }) => (
              <div key={id} className={`card ${styles.empCard}`}>
                <div className={styles.empAvatar}>
                  <span className={styles.empEmoji}>{emoji}</span>
                </div>
                <div className={styles.empInfo}>
                  <h3 className={styles.empName}>{name}</h3>
                  <p className={styles.empRole}>{role}</p>
                  <div className={styles.empMeta}>
                    <span className={`badge ${deptColors[dept] || 'badge-gold'}`}>{dept}</span>
                    <span className={styles.empExp}>⏱ {exp}</span>
                  </div>
                  <div className={styles.empId}>{id}</div>
                </div>
                <a href={linkedin} className={styles.linkedinBtn} title="LinkedIn Profile" aria-label="LinkedIn">
                  <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>in</span>
                </a>
              </div>
            ))}
          </div>

          {/* More employees note */}
          <div className={styles.moreNote}>
            <span>30+ more team members across all departments</span>
            <a href="/contact" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              Join Our Team →
            </a>
          </div>
        </div>
      </section>

      {/* Join Us Banner */}
      <section className={styles.joinBanner}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Want to Join <span>Carbon RMC?</span></h2>
          <p className="section-desc" style={{ margin: '1rem auto 2rem' }}>
            We're always looking for talented professionals. Send your resume and let's build together.
          </p>
          <a href="mailto:carbonrmc@gmail.com" className="btn btn-primary">
            📧 carbonrmc@gmail.com
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
