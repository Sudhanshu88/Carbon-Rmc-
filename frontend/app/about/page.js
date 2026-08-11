import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | Carbon RMC',
  description: 'Learn about Carbon RMC — our history, mission, vision, values, and the team that drives excellence in construction.',
};

const milestones = [
  { year: '2026', event: 'Carbon RMC founded with a vision to redefine construction quality in India.' },
  { year: '2026', event: 'Launched our first RMC plant, enabling high-grade concrete supply across the region.' },
  { year: '2026', event: 'Expanded operations. Completed first 10 landmark projects.' },
  { year: '2026', event: 'Received ISO 9001:2015 certification. Team grew to 50+ members.' },
  { year: '2026', event: 'Pan-India presence established. 100+ projects completed.' },
  { year: '2026', event: '500+ projects completed. Trusted by 1200+ clients across India.' },
];

const values = [
  { icon: '🎯', title: 'Quality', desc: 'Every brick, every beam — built to last a lifetime.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent dealings, honest pricing, no hidden costs.' },
  { icon: '⚡', title: 'Innovation', desc: 'Modern techniques and latest technology in every project.' },
  { icon: '🛡️', title: 'Safety', desc: 'Zero-compromise safety on every construction site.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Eco-conscious construction practices for a greener future.' },
  { icon: '👥', title: 'Teamwork', desc: 'Our strength lies in our passionate, skilled team.' },
];

const process = [
  { step: '01', title: 'Consultation', desc: 'Free site visit and understanding your vision and budget.' },
  { step: '02', title: 'Planning', desc: 'Detailed blueprints, material selection, and timeline planning.' },
  { step: '03', title: 'Execution', desc: 'Construction with daily progress updates and quality checks.' },
  { step: '04', title: 'Handover', desc: 'Final inspection, snag fixing, and keys in your hand.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <p className="section-label">Who We Are</p>
          <h1 className="section-title">About <span>Carbon RMC</span></h1>
          <div className="divider"></div>
          <p className="section-desc">
            1+ years of building trust, quality, and landmark structures across India.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={`card ${styles.mvCard}`}>
              <div className={styles.mvIcon}>🎯</div>
              <h2 className={styles.mvTitle}>Our Mission</h2>
              <p className={styles.mvText}>
                To deliver world-class construction services with unmatched quality, on-time delivery,
                and complete client satisfaction — making every project a landmark of trust and excellence.
              </p>
            </div>
            <div className={`card ${styles.mvCard} ${styles.mvCardAccent}`}>
              <div className={styles.mvIcon}>🔭</div>
              <h2 className={styles.mvTitle}>Our Vision</h2>
              <p className={styles.mvText}>
                To be India's most trusted and innovative construction company — shaping skylines,
                transforming communities, and building a sustainable future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { n: '150+',  l: 'Projects Completed' },
              { n: '15+',   l: 'Years Experience' },
              { n: '200+', l: 'Happy Clients' },
              { n: '30+',   l: 'Expert Team Members' },
              { n: '1+',     l: 'RMC Plants' },
              { n: '1+',     l: 'States Served' },
            ].map(({ n, l }) => (
              <div key={l} className={`card stat-card`}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">What We Stand For</p>
            <h2 className="section-title">Our Core <span>Values</span></h2>
            <div className="divider center"></div>
          </div>
          <div className="grid-3">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className={`card ${styles.valueCard}`}>
                <span className={styles.valueIcon}>{icon}</span>
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className={`section ${styles.processBg}`}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">How We Work</p>
            <h2 className="section-title">Our <span>Process</span></h2>
            <div className="divider center"></div>
          </div>
          <div className={styles.processGrid}>
            {process.map(({ step, title, desc }, i) => (
              <div key={step} className={styles.processStep}>
                <div className={styles.processNum}>{step}</div>
                {i < process.length - 1 && <div className={styles.processLine}></div>}
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Our Journey</p>
            <h2 className="section-title">Company <span>Timeline</span></h2>
            <div className="divider center"></div>
          </div>
          <div className={styles.timeline}>
            {milestones.map(({ year, event }, i) => (
              <div key={year} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                <div className={styles.timelineYear}>{year}</div>
                <div className={`card ${styles.timelineCard}`}>
                  <p className={styles.timelineText}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Build with <span>Carbon RMC?</span></h2>
          <p className="section-desc" style={{ margin: '1rem auto 2rem' }}>
            Let's discuss your project and bring your vision to life.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Get Free Consultation</Link>
            <Link href="/projects" className="btn btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
