import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';
import Link from 'next/link';

const stats = [
  { number: '120+', label: 'Projects Completed' },
  { number: '2026', label: 'Est. Year' },
  { number: '1200+',label: 'Happy Clients' },
  { number: '30+',  label: 'Team Members' },
];

const services = [
  { icon: '🏗️', title: 'Residential Construction', desc: 'Premium homes built with precision — from foundation to finishing.' },
  { icon: '🏢', title: 'Commercial Construction', desc: 'Office spaces, malls, and commercial complexes that inspire.' },
  { icon: '🧱', title: 'RMC Supply', desc: 'Ready Mix Concrete of every grade, delivered on time to your site.' },
  { icon: '🎨', title: 'Interior Finishing', desc: 'End-to-end interior design and luxury finishing services.' },
  { icon: '🔨', title: 'Renovation & Remodeling', desc: 'Breathe new life into old structures with modern upgrades.' },
  { icon: '📋', title: 'Project Management', desc: 'Expert consulting to keep your project on time and on budget.' },
];

// ── All projects for the scrolling ticker ──
const allProjects = [
  { id: 1,  emoji: '🏙️', title: 'Skyline Residency',        category: 'Residential',  location: 'patna',     year: '2026', status: 'Completed' },
  { id: 2,  emoji: '🏢', title: 'TechHub Corporate Park',   category: 'Commercial',   location: 'Patna',       year: '2026', status: 'Completed' },
  { id: 3,  emoji: '🌿', title: 'Green Valley Villas',      category: 'Residential',  location: 'patna',     year: '2026', status: 'Completed' },
  { id: 4,  emoji: '🏭', title: 'Apex Industrial Hub',      category: 'Industrial',   location: 'patna',     year: '2026', status: 'Completed' },
  { id: 5,  emoji: '🏨', title: 'Royal Comfort Hotel',      category: 'Commercial',   location: 'patna',  year: '2026', status: 'Completed' },
  
];

const whyUs = [
  { icon: '🏆', title: 'Award-Winning Quality', desc: 'ISO certified processes ensuring every project meets international standards.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: '98% of our projects delivered on or before the promised deadline.' },
  { icon: '🛡️', title: 'Safety First', desc: 'Zero-compromise safety protocols on every construction site.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges. Clear quotations before work begins.' },
];

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Homeowner, Mumbai', text: 'Carbon RMC built our dream home. The quality of work and on-time delivery was exceptional. Highly recommend!' },
  { name: 'Priya Mehta', role: 'Director, TechSoft Pvt Ltd', text: 'Our corporate office project was handled professionally. Great team, great results.' },
  { name: 'Anil Patel', role: 'Real Estate Developer', text: 'Been working with Carbon RMC for 5 years. Their RMC supply and construction quality is unmatched.' },
];

// Single project ticker card
function ProjectTickerCard({ emoji, title, category, location, year, status }) {
  return (
    <div className={styles.tickerCard}>
      <div className={styles.tickerEmoji}>{emoji}</div>
      <div className={styles.tickerBody}>
        <div className={styles.tickerMeta}>
          <span className={`badge ${status === 'Ongoing' ? 'badge-blue' : 'badge-gold'}`}>
            {status === 'Ongoing' ? '🔨 Ongoing' : '✅ Done'}
          </span>
          <span className={styles.tickerCat}>{category}</span>
        </div>
        <h3 className={styles.tickerTitle}>{title}</h3>
        <p className={styles.tickerLoc}>📍 {location} &nbsp;·&nbsp; 📅 {year}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Duplicate array for seamless infinite loop
  const tickerItems = [...allProjects, ...allProjects];

  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}></div>
        <div className={styles.heroGlow}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            Est. 2026 · ISO Certified · RERA Approved
          </div>
          <h1 className={styles.heroTitle}>
            Building <span className={styles.heroHighlight}>Dreams</span><br />
            With Precision
          </h1>
          <p className={styles.heroSub}>
            Carbon RMC — India's trusted name in construction and Ready Mix Concrete.
            From residential homes to commercial landmarks, we build with quality you can trust.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/projects" className="btn btn-primary" id="hero-projects-btn">
              View Our Projects →
            </Link>
            <Link href="/contact" className="btn btn-ghost" id="hero-contact-btn">
              Get Free Quote
            </Link>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>✅ 200+ Projects</div>
            <div className={styles.trustItem}>✅ Pan-India Presence</div>
            <div className={styles.trustItem}>✅ Est. 2026</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot}></div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS TICKER — Hero ke bilkul neeche
          Left → Right, Infinite, Seamless
      ══════════════════════════════════════════ */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerFadeLeft}></div>
        <div className={styles.tickerFadeRight}></div>
        <div className={styles.tickerTrack}>
          {tickerItems.map((p, i) => (
            <ProjectTickerCard key={`${p.id}-${i}`} {...p} />
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map(({ number, label }) => (
              <div key={label} className={`card stat-card ${styles.statCard}`}>
                <div className="stat-number">{number}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImg}>
              <div className={styles.aboutImgBox}>
                <div className={styles.aboutImgEmoji}>🏗️</div>
                <div className={styles.aboutImgLabel}>Since 2026</div>
              </div>
              <div className={styles.aboutImgAccent}></div>
            </div>
            <div className={styles.aboutText}>
              <p className="section-label">About Carbon RMC</p>
              <h2 className="section-title">Our Journey of <span>Building Excellence</span></h2>
              <div className="divider"></div>
              <p className="section-desc">
                Carbon RMC has been at the forefront of construction excellence since 2026.
                We specialize in delivering high-quality residential, commercial, and industrial projects
                across India, backed by our state-of-the-art RMC plant and expert team.
              </p>
              <p className="section-desc" style={{ marginTop: '1rem' }}>
                Our commitment to quality, safety, and timely delivery has earned us the trust
                of over 1,200 clients and 200+ successful projects across multiple states.
              </p>
              <div className={styles.aboutBtns}>
                <Link href="/about" className="btn btn-primary">Learn More About Us</Link>
                <Link href="/projects" className="btn btn-outline">View Portfolio</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className={`section ${styles.servicesBg}`}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Our <span>Services</span></h2>
            <div className="divider center"></div>
            <p className="section-desc">Comprehensive construction solutions from planning to completion.</p>
          </div>
          <div className="grid-3">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className={`card ${styles.serviceCard}`}>
                <div className={styles.serviceIcon}>{icon}</div>
                <h3 className={styles.serviceTitle}>{title}</h3>
                <p className={styles.serviceDesc}>{desc}</p>
                <Link href="/services" className={styles.serviceLink}>Learn More →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS FULL SECTION (page ke andar) ─── */}
      <section className={`section ${styles.tickerSection}`}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Our Portfolio</p>
            <h2 className="section-title">All <span>Projects</span></h2>
            <div className="divider center"></div>
          </div>
        </div>
        <div className={styles.tickerWrapper}>
          <div className={styles.tickerFadeLeft}></div>
          <div className={styles.tickerFadeRight}></div>
          <div className={styles.tickerTrack}>
            {tickerItems.map((p, i) => (
              <ProjectTickerCard key={`t2-${p.id}-${i}`} {...p} />
            ))}
          </div>
        </div>
        <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/projects" className="btn btn-primary">
            View All {allProjects.length}+ Projects →
          </Link>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className={`section ${styles.whyBg}`}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Why Carbon RMC</p>
            <h2 className="section-title">Why Choose <span>Us?</span></h2>
            <div className="divider center"></div>
          </div>
          <div className="grid-4">
            {whyUs.map(({ icon, title, desc }) => (
              <div key={title} className={`card ${styles.whyCard}`}>
                <div className={styles.whyIcon}>{icon}</div>
                <h3 className={styles.whyTitle}>{title}</h3>
                <p className={styles.whyDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Client Reviews</p>
            <h2 className="section-title">What Our <span>Clients Say</span></h2>
            <div className="divider center"></div>
          </div>
          <div className="grid-3">
            {testimonials.map(({ name, role, text }) => (
              <div key={name} className={`card ${styles.testimonialCard}`}>
                <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p className={styles.testimonialText}>"{text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{name[0]}</div>
                  <div>
                    <div className={styles.authorName}>{name}</div>
                    <div className={styles.authorRole}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow}></div>
        <div className={`container ${styles.ctaContent}`}>
          <div>
            <h2 className={styles.ctaTitle}>Start Your Construction Journey</h2>
            <p className={styles.ctaSub}>Get a free site visit and detailed quotation from our experts.</p>
          </div>
          <div className={styles.ctaBtns}>
            <a href="tel:+919031835122" className="btn btn-primary" style={{ fontSize: '1rem' }}>
              📞 +91 90318 35122
            </a>
            <a href="tel:+919031835123" className="btn btn-outline" style={{ fontSize: '1rem' }}>
              📞 +91 90318 35123
            </a>
            <Link href="/contact" className="btn btn-ghost">Get Free Quote</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
