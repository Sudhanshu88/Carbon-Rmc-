import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Projects | Carbon RMC',
  description: 'Explore Carbon RMC\'s portfolio — 500+ completed residential, commercial, and industrial projects across India.',
};

const projects = [
  { id: 1,  emoji: '🏙️', title: 'Skyline Residency',       category: 'Residential', location: 'patna',    year: '2026', area: '85,000 sq ft', status: 'Completed' },
  { id: 2,  emoji: '🏢', title: 'TechHub Corporate Park',  category: 'Commercial',  location: 'Patna',      year: '2026', area: '1.2 Lakh sq ft', status: 'Completed' },
  { id: 3,  emoji: '🌿', title: 'Green Valley Villas',     category: 'Residential', location: 'patna',    year: '2026', area: '60,000 sq ft', status: 'Completed' },
  { id: 4,  emoji: '🏭', title: 'Apex Industrial Hub',     category: 'Industrial',  location: 'patna',    year: '2026', area: '2.5 Lakh sq ft', status: 'Completed' },
  { id: 5,  emoji: '🏨', title: 'Royal Comfort Hotel',     category: 'Commercial',  location: 'patna', year: '2026', area: '75,000 sq ft', status: 'Completed' },
  { id: 6,  emoji: '🏫', title: 'Excellence Public School',category: 'Institutional',location: 'patna',    year: '2026', area: '40,000 sq ft', status: 'Completed' },
  { id: 7,  emoji: '🏗️', title: 'Metro Heights Phase 2',  category: 'Residential', location: 'patna',     year: '2026', area: '1.1 Lakh sq ft', status: 'Ongoing' },
  { id: 8,  emoji: '🛍️', title: 'Central Mall Complex',   category: 'Commercial',  location: 'patna',    year: '2026', area: '3 Lakh sq ft', status: 'Ongoing' },
  { id: 9,  emoji: '🌅', title: 'Sunset Premium Villas',  category: 'Residential', location: 'patna',           year: '2026', area: '45,000 sq ft', status: 'Completed' },
];

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Institutional'];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <p className="section-label">Our Portfolio</p>
          <h1 className="section-title">Featured <span>Projects</span></h1>
          <div className="divider"></div>
          <p className="section-desc">150+ projects completed across India. Each one a story of trust, quality, and craftsmanship.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter Pills */}
          <div className={styles.filterRow}>
            {categories.map((c) => (
              <span key={c} className={`tag-pill ${c === 'All' ? 'active' : ''}`}>{c}</span>
            ))}
          </div>

          {/* Stats bar */}
          <div className={styles.statsBar}>
            <span>🏆 <strong>150+</strong> Total Projects</span>
            <span>✅ <strong>120+</strong> Completed</span>
            <span>🔨 <strong>20+</strong> Ongoing</span>
            <span>🌍 <strong>12+</strong> States</span>
          </div>

          {/* Projects Grid */}
          <div className={styles.projectsGrid}>
            {projects.map(({ id, emoji, title, category, location, year, area, status }) => (
              <div key={id} className={styles.projectCard}>
                <div className={`${styles.projectImg} ${styles[`cat${category.replace(/\s/g,'')}`]}`}>
                  <span className={styles.projectEmoji}>{emoji}</span>
                  <span className={`badge ${status === 'Ongoing' ? 'badge-blue' : 'badge-green'} ${styles.statusBadge}`}>
                    {status}
                  </span>
                </div>
                <div className={styles.projectInfo}>
                  <span className="badge badge-gold">{category}</span>
                  <h3 className={styles.projectTitle}>{title}</h3>
                  <div className={styles.projectMeta}>
                    <span>📍 {location}</span>
                    <span>📅 {year}</span>
                    <span>📐 {area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
