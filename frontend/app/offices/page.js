import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Locations | Carbon RMC',
  description: 'Find Carbon RMC office branches and RMC plant locations near you across India.',
};

const officeLocations = [
  {
    id: 'off-1',
    name: 'Head Office',
    isHQ: true,
    emoji: '🏢',
    address: 'Office Address —Ram Nagari, Rukanpura, Patna, Bihar 800025',
    city: 'Patna, Bihar – 800025',
    phones: ['+91 90318 35122', '+91 90318 35123'],
    email: 'carbonrmc@gmail.com',
    manager: 'Manager Name',
    weekdays: '9:00 AM – 8:00 PM',
    saturday: '9:00 AM – 8:00 PM',
    sunday: 'According to Your Requirements',
    mapLatitude: 25.618261, 
    mapLongitude:85.075385 ,
  },
  
];

const plantLocations = [
  {
    id: 'plt-1',
    name: 'Carbon RMC Plant',
    emoji: '🏭',
    address: 'Near Patna, Bihar',
    city: 'Patna, Bihar',
    phones: ['+91 90318 35122', '+91 90318 35123'],
    email: 'carbonrmc@gmail.com',
    incharge: 'Plant Incharge',
    capacity: '60 Cum/hr',
    grades: 'M15 to M60',
    weekdays: 'Open 24 Hours',
    saturday: 'Open 24 Hours',
    sunday: 'Open 24 Hours',
    mapLatitude:  25.5637777,
    mapLongitude: 84.9905708,
  },
];

function LocationCard({ loc, type }) {
  const isPlant = type === 'plant';
  return (
    <div className={`card ${styles.locationCard} ${isPlant ? styles.plantCard : styles.officeCardStyle}`}>
      {/* Top badge */}
      <div className={styles.cardTopRow}>
        {loc.isHQ && <span className={`badge badge-gold`}>🏆 Head Office</span>}
        <span className={`badge ${isPlant ? styles.plantBadge : styles.officeBadge}`}>
          {isPlant ? '🏭 RMC Plant' : '🏢 Office'}
        </span>
      </div>

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={`${styles.iconBox} ${isPlant ? styles.plantIconBox : styles.officeIconBox}`}>
          <span>{loc.emoji}</span>
        </div>
        <div>
          <h3 className={styles.locName}>{loc.name}</h3>
          <p className={styles.locCity}>📍 {loc.city}</p>
        </div>
      </div>

      {/* Map */}
      <div className={styles.mapWrap}>
        <iframe
          title={loc.name}
          src={`https://maps.google.com/maps?q=${loc.mapLat},${loc.mapLng}&z=14&output=embed`}
          width="100%"
          height="170"
          style={{ border: 0, borderRadius: '10px', display: 'block' }}
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Details */}
      <div className={styles.details}>
        <div className={styles.detRow}>
          <span className={styles.detIcon}>📍</span>
          <span>{loc.address}, {loc.city}</span>
        </div>
        {loc.phones.map((p) => (
          <div key={p} className={styles.detRow}>
            <span className={styles.detIcon}>📞</span>
            <a href={`tel:${p.replace(/\s/g,'')}`}>{p}</a>
          </div>
        ))}
        <div className={styles.detRow}>
          <span className={styles.detIcon}>✉️</span>
          <a href={`mailto:${loc.email}`}>{loc.email}</a>
        </div>

        {/* Person in charge */}
        <div className={styles.detRow}>
          <span className={styles.detIcon}>👤</span>
          <span>{isPlant ? `Incharge: ${loc.incharge}` : `Manager: ${loc.manager}`}</span>
        </div>

        {/* Plant-specific info */}
        {isPlant && (
          <div className={styles.plantSpecs}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Capacity</span>
              <span className={styles.specValue}>{loc.capacity}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Grades</span>
              <span className={styles.specValue}>{loc.grades}</span>
            </div>
          </div>
        )}
      </div>

      {/* Hours */}
      <div className={styles.hoursBox}>
        <h4 className={styles.hoursTitle}>⏰ Working Hours</h4>
        {loc.weekdays === 'Open 24 Hours' ? (
          /* Plant — 24×7 badge */
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(74,222,128,0.3)',
              color: '#4ADE80',
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '0.08em',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
            }}>
              🟢 24 × 7 OPEN
            </span>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
              Har din, har waqt — concrete ready hai
            </div>
          </div>
        ) : (
          /* Office — row-by-row */
          <>
            <div className={styles.hourRow}><span>Mon – Fri</span><span>{loc.weekdays}</span></div>
            <div className={styles.hourRow}><span>Saturday</span><span>{loc.saturday}</span></div>
            <div className={styles.hourRow}>
              <span>Sunday</span>
              <span className={loc.sunday === 'Closed' ? styles.closed : styles.onDemand}>
                {loc.sunday}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <a
          href={
            loc.mapLatitude
              ? `https://www.google.com/maps?q=${loc.mapLatitude},${loc.mapLongitude}`
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.city)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary ${styles.actionBtn}`}
        >
          🗺️ Get Directions
        </a>
        <a
          href={`tel:${loc.phones[0].replace(/\s/g,'')}`}
          className={`btn btn-outline ${styles.actionBtn}`}
        >
          📞 Call Now
        </a>
      </div>
    </div>
  );
}

export default function OfficesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <p className="section-label">Find Us Near You</p>
          <h1 className="section-title">Our <span>Locations</span></h1>
          <div className="divider"></div>
          <p className="section-desc">
            Carbon RMC ke offices aur RMC plants alag alag jagah hain — dono locations yahan dekhen.
          </p>
        </div>
      </div>

      {/* Quick Jump Tabs */}
      <div className={styles.jumpBar}>
        <div className="container">
          <a href="#offices" className={`${styles.jumpTab} ${styles.jumpOffice}`}>
            🏢 Office Locations
            <span className={styles.jumpCount}>{officeLocations.length}</span>
          </a>
          <a href="#plants" className={`${styles.jumpTab} ${styles.jumpPlant}`}>
            🏭 RMC Plant Locations
            <span className={styles.jumpCount}>{plantLocations.length}</span>
          </a>
        </div>
      </div>

      {/* ─── OFFICE SECTION ─── */}
      <section className="section" id="offices">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Administrative</p>
            <h2 className="section-title">🏢 Office <span>Locations</span></h2>
            <div className="divider"></div>
            <p className="section-desc">
              Hamare office branches jahan aap visit karke project discussion, quotation aur consultation le sakte hain.
            </p>
          </div>

          <div className={styles.locGrid}>
            {officeLocations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} type="office" />
            ))}
          </div>
        </div>
      </section>

      {/* Divider between sections */}
      <div className={styles.sectionDivider}>
        <div className="container">
          <div className={styles.dividerLine}></div>
        </div>
      </div>

      {/* ─── PLANT SECTION ─── */}
      <section className="section" id="plants">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Manufacturing</p>
            <h2 className="section-title">🏭 RMC Plant <span>Locations</span></h2>
            <div className="divider"></div>
            <p className="section-desc">
              Hamare state-of-the-art Ready Mix Concrete plants jahan se fresh RMC directly aapke site par deliver hota hai.
            </p>
          </div>

          <div className={styles.locGrid}>
            {plantLocations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} type="plant" />
            ))}
          </div>

          {/* RMC Info Banner */}
          <div className={`card ${styles.rmcBanner}`}>
            <div className={styles.rmcBannerLeft}>
              <div className={styles.rmcBannerIcon}>🧱</div>
              <div>
                <h3 className={styles.rmcBannerTitle}>Fresh RMC Delivery — Pan India</h3>
                <p className={styles.rmcBannerDesc}>
                  M15 se M60 grade tak — lab tested, on-time delivery, transit mixer se directly aapke site par.
                </p>
              </div>
            </div>
            <a href="/contact" className="btn btn-primary" style={{ flexShrink: 0 }}>
              📋 Order RMC Now
            </a>
          </div>
        </div>
      </section>

      {/* Full India Map */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">All Locations</p>
            <h2 className="section-title">Pan-India <span>Presence</span></h2>
            <div className="divider center"></div>
          </div>
          <div className={styles.fullMapWrap} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Office Map */}
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>🏢 Head Office — Patna</p>
              <iframe
                title="Carbon RMC Head Office"
                src="https://maps.google.com/maps?q=25.618019,85.0754069&z=16&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: '14px', display: 'block' }}
                loading="lazy"
                allowFullScreen
              />
            </div>
            {/* Plant Map */}
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>🏭 RMC Plant — Patna</p>
              <iframe
                title="Carbon RMC Plant"
                src="https://maps.google.com/maps?q=25.5637777,84.9905708&z=16&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: '14px', display: 'block' }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
