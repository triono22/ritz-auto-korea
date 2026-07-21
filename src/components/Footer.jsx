import React from 'react';
import { Car, MapPin, Phone, ShieldCheck, Globe, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: '#04070e',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      marginTop: '5rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Col 1: Brand & Expat Focus */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Car size={22} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                RiTZ<span style={{ color: 'var(--accent-cyan)' }}>AUTO</span> <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>KOREA 🇰🇷</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              South Korea's premier verified car sales dealership dedicated to foreign residents, military personnel (SOFA), students, and expatriates.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--accent-gold)' }}>
              <ShieldCheck size={16} />
              <span>Official Inspection & Insurance Warranty Guaranteed</span>
            </div>
          </div>

          {/* Col 2: Showroom Hours */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.05rem' }}>Showroom Opening Hours</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--accent-cyan)" />
                <span>Monday - Saturday: 09:00 - 19:00 KST</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--accent-cyan)" />
                <span>Sunday & Holidays: 10:00 - 17:00 KST</span>
              </li>
              <li style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                *Test drives and English registration consultation can be scheduled via WhatsApp.
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.05rem' }}>Contact & Location in Korea</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Auto City Complex, Seoul / Incheon / Pyeongtaek Branch, South Korea</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                <Phone size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>+82 10 8469 0945 (English WhatsApp Direct)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Globe size={16} color="var(--accent-cyan)" />
                <span>Registration & Insurance Support for ARC / Visa Holders</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <p>© {new Date().getFullYear()} RiTZ AUTO Korea. All rights reserved.</p>
          <p>Verified Used & New Car Platform for Expats in South Korea.</p>
        </div>

      </div>
    </footer>
  );
};
