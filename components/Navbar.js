'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/services',   label: 'Services' },
  { href: '/projects',   label: 'Projects' },
  { href: '/employees',  label: 'Our Team' },
  { href: '/offices',    label: 'Locations' },
  { href: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          {/* Circular logo image */}
          <Image
            src="/logo.jpg"
            alt="Carbon RMC"
            width={52}
            height={52}
            className={styles.logoImg}
            priority
          />
          {/* Text beside image */}
          <div className={styles.logoText}>
            <span className={styles.logoName}>
              <span className={styles.logoCarb}>CARB</span><span className={styles.logoOn}>ON</span>
            </span>
            <span className={styles.logoRmc}>R M C</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/contact" className="btn btn-primary" id="nav-cta-btn">
            Get Quote
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span className={menuOpen ? styles.barOpen : styles.bar}></span>
            <span className={menuOpen ? styles.barOpen : styles.bar}></span>
            <span className={menuOpen ? styles.barOpen : styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.mobileLink} ${pathname === href ? styles.mobileActive : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" style={{ margin: '1rem 1.5rem 0' }}>
          Get Free Quote
        </Link>
      </div>
    </nav>
  );
}
