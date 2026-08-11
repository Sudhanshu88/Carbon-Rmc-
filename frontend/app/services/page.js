import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Services | Carbon RMC',
  description: 'Comprehensive construction services — residential, commercial, RMC supply, interior finishing, renovation, and project management.',
};

const services = [
  {
    icon: '🏠', title: 'Residential Construction', slug: 'residential',
    shortDesc: 'Dream homes crafted with precision and passion.',
    features: ['Custom Home Design', 'Foundation to Finish', 'Luxury Villas & Apartments', 'Vastu-Compliant Layouts', 'Premium Materials Only'],
    highlight: 'Most Popular',
  },
  {
    icon: '🏢', title: 'Commercial Construction', slug: 'commercial',
    shortDesc: 'Office spaces and commercial complexes built for success.',
    features: ['Office Buildings', 'Retail & Shopping Malls', 'Warehouses & Industrial Units', 'Hospitals & Schools', 'Fast-Track Projects'],
    highlight: null,
  },
  {
    icon: '🧱', title: 'RMC Supply', slug: 'rmc',
    shortDesc: 'High-grade Ready Mix Concrete delivered fresh to your site.',
    features: ['M15 to M60 Grade', 'On-Time Delivery', '3 RMC Plants', 'Lab-Tested Quality', 'Pan-India Supply'],
    highlight: 'Core Service',
  },
  {
    icon: '🎨', title: 'Interior Finishing', slug: 'interior',
    shortDesc: 'Elegant interiors that reflect your taste and lifestyle.',
    features: ['Turnkey Interiors', 'False Ceiling & Flooring', 'Kitchen & Bathroom Design', 'Custom Furniture', 'Smart Home Integration'],
    highlight: null,
  },
  {
    icon: '🔨', title: 'Renovation & Remodeling', slug: 'renovation',
    shortDesc: 'Transform old structures into modern masterpieces.',
    features: ['Full Renovation', 'Structural Strengthening', 'Facade Upgrade', 'Bathroom & Kitchen Makeover', 'Commercial Refurbishment'],
    highlight: null,
  },
  {
    icon: '📋', title: 'Project Management', slug: 'consulting',
    shortDesc: 'Expert oversight to keep your project on time and budget.',
    features: ['Site Supervision', 'Contractor Management', 'Quality Control Audits', 'Cost Optimization', 'Progress Reporting'],
    highlight: null,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h1 className="section-title">Our <span>Services</span></h1>
          <div className="divider"></div>
          <p className="section-desc">
            From the first brick to the final finish — we handle it all with expertise and care.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.servicesGrid}>
            {services.map(({ icon, title, slug, shortDesc, features, highlight }) => (
              <div key={slug} className={`card ${styles.serviceCard}`}>
                {highlight && <span className={`badge badge-gold ${styles.highlight}`}>{highlight}</span>}
                <div className={styles.serviceIcon}>{icon}</div>
                <h2 className={styles.serviceTitle}>{title}</h2>
                <p className={styles.serviceDesc}>{shortDesc}</p>
                <ul className={styles.featureList}>
                  {features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.featureCheck}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn btn-outline ${styles.serviceBtn}`}>
                  Get Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Our Edge</p>
            <h2 className="section-title">Why Our Services <span>Stand Out</span></h2>
            <div className="divider center"></div>
          </div>
          <div className="grid-4">
            {[
              { icon: '🏆', title: 'ISO Certified', desc: 'All services follow ISO 9001:2015 quality standards.' },
              { icon: '🔬', title: 'Lab Tested', desc: 'Every material tested in our in-house quality lab.' },
              { icon: '📱', title: 'Real-Time Updates', desc: 'Daily progress reports via WhatsApp & our app.' },
              { icon: '💯', title: '5-Year Warranty', desc: 'Structural warranty on all completed projects.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className={`card ${styles.whyCard}`}>
                <span style={{ fontSize: '2rem' }}>{icon}</span>
                <h3 className={styles.whyTitle}>{title}</h3>
                <p className={styles.whyDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Not Sure Which Service <span>You Need?</span></h2>
          <p className="section-desc" style={{ margin: '1rem auto 2rem' }}>
            Talk to our experts — we'll guide you to the perfect solution for your project.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem' }}>
            📞 Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
