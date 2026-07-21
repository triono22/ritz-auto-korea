import React from 'react';
import { ShieldCheck, CheckCircle2, FileText, Globe, CreditCard } from 'lucide-react';

export const HeroSection = ({ totalCars, availableCount, soldCount }) => {
  return (
    <section style={{
      padding: '3.5rem 0 2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 22, 38, 0.9) 0%, rgba(10, 14, 23, 0.95) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3rem 2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Ambient Background Glow */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}>
                <Globe size={16} />
                <span>#1 Trusted Car Sales Platform for Foreigners & Expats in South Korea</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.15,
                marginBottom: '1rem',
                fontWeight: 800
              }}>
                Drive in Korea with <span className="gradient-text">100% Certified Vehicles & Full Registration Support</span>
              </h1>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1.05rem',
                maxWidth: '820px',
                marginBottom: '2rem'
              }}>
                Every car at <strong style={{ color: '#ffffff' }}>RiTZ AUTO Korea</strong> is backed by the official <strong style={{ color: 'var(--accent-cyan)' }}>Korean Performance & Inspection Record (성능점검기록부)</strong> and Certified Insurance Warranties. We handle full registration, insurance setup, and nationwide Korea delivery for all visa holders. We accept both <strong style={{ color: '#ffffff' }}>Cash</strong> and <strong style={{ color: 'var(--accent-gold)' }}>Auto Loan / Installment (할부)</strong>.
              </p>

              {/* Verified Expat Service Badges */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <FileText size={18} color="var(--accent-cyan)" />
                  <span>Official Performance Inspection Guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <ShieldCheck size={18} color="var(--accent-gold)" />
                  <span>Certified Insurance Warranty Covered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--status-available)" />
                  <span>Full Registration & Insurance Assistance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <CreditCard size={18} color="var(--accent-cyan)" />
                  <span>Cash & Auto Loan / Installment (할부) Accepted</span>
                </div>
              </div>

              {/* Live Inventory Counters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{totalCars}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Inventory</p>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-available)' }}>{availableCount}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Vehicles</p>
                </div>
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fb7185' }}>{soldCount}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sold Vehicles</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
