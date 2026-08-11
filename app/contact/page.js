'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

const projectTypes = ['Residential', 'Commercial', 'Industrial', 'RMC Supply', 'Renovation', 'Other'];

const socialLinks = [
  { href: '#', label: 'Whatsapp',  icon: '💬',  bg: '#1877F2' },
  { href: '#', label: 'Instagram', icon: '📷', bg: '#E1306C' },
  
];

const offices = [
  { city: 'Patna (HQ)', phone: '+91 9031835122', address: 'Ram Nagari, Rukanpura, Patna, Bihar 800025' },
  
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', projectType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with real API later
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <p className="section-label">Get In Touch</p>
          <h1 className="section-title">Contact <span>Us</span></h1>
          <div className="divider"></div>
          <p className="section-desc">Have a project in mind? Let’s turn your ideas into reality.
            Tell us about your goals and requirements, and our team will
            get in touch with you within 24 hours.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>

            {/* ── LEFT — Form ── */}
            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✅</div>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. Our team will contact you immediately.</p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your full name"
                        required
                        id="contact-name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        id="contact-phone"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="your@email.com"
                      id="contact-email"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Project Type *</label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="input"
                      required
                      id="contact-project-type"
                    >
                      <option value="">Select project type...</option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="input"
                      placeholder="Tell us about your project — location, size, timeline, budget..."
                      rows={5}
                      required
                      id="contact-message"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
                    disabled={loading}
                    id="contact-submit"
                  >
                    {loading ? '⏳ Sending...' : '📤 Send Message'}
                  </button>

                  <p className={styles.formNote}>
                    🔒 Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* ── RIGHT — Info ── */}
            <div className={styles.infoSection}>

              {/* Quick Contact */}
              <div className={`card ${styles.quickContact}`}>
                <h3 className={styles.infoTitle}>Quick Contact</h3>
                <div className={styles.contactItems}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIconBox}>📞</div>
                    <div>
                      <div className={styles.contactLabel}>Call / WhatsApp</div>
                      <a href="tel:+919031835122" className={styles.contactValue}>+91 90318 35122</a>
                      <a href="tel:+919031835123" className={styles.contactValue} style={{display:'block',marginTop:'4px'}}>+91 90318 35123</a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIconBox}>✉️</div>
                    <div>
                      <div className={styles.contactLabel}>Email Us</div>
                      <a href="mailto:carbonrmc@gmail.com" className={styles.contactValue}>carbonrmc@gmail.com</a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIconBox}>🕐</div>
                    <div>
                      <div className={styles.contactLabel}>Business Hours</div>
                      <div className={styles.contactValue}>Mon–Sat: 9 AM – 6 PM</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919031835122?text=Hi Carbon RMC, I need a quote for my project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                  id="contact-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="20" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* All Offices */}
              <div className={`card ${styles.officesList}`}>
                <h3 className={styles.infoTitle}>Our Offices</h3>
                {offices.map(({ city, phone, address }) => (
                  <div key={city} className={styles.officeItem}>
                    <div className={styles.officeCity}>📍 {city}</div>
                    <div className={styles.officeAddr}>{address}</div>
                    <a href={`tel:${phone.replace(/\s/g,'')}`} className={styles.officePhone}>{phone}</a>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className={`card ${styles.socialCard}`}>
                <h3 className={styles.infoTitle}>Follow Us</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Stay updated with our latest projects and news.
                </p>
                <div className={styles.socialGrid}>
                  {socialLinks.map(({ href, label, icon, bg }) => (
                    <a
                      key={label}
                      href={href}
                      className={styles.socialBtn}
                      style={{ '--social-bg': bg }}
                      title={label}
                      id={`contact-social-${label.toLowerCase()}`}
                    >
                      <span className={styles.socialIcon}>{icon}</span>
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className={styles.mapSection}>
        <div className="container">
          <iframe
            title="Carbon RMC Head Office — Patna"
            src="https://maps.google.com/maps?q=25.618019,85.0754069&z=16&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
