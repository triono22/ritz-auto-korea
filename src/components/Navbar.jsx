import React from 'react';
import { Car, Lock, Unlock, PhoneCall, PlusCircle, Globe } from 'lucide-react';

export const Navbar = ({ isAdmin, onToggleAdmin, onOpenAddModal, totalCars, availableCount }) => {
  const whatsappNumber = "821084690945"; // Korean phone number format (+82)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 10, 18, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Car size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                color: '#ffffff'
              }}>
                RiTZ<span style={{ color: 'var(--accent-cyan)' }}>AUTO</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                background: 'rgba(245, 158, 11, 0.2)',
                color: 'var(--accent-gold)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                KOREA 🇰🇷
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '-2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={11} color="var(--accent-cyan)" /> #1 Expat Car Sales & Registration Support
            </p>
          </div>
        </div>

        {/* Action Buttons & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Direct English WhatsApp Call */}
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Hello%20RiTZ%20AUTO%20Korea,%20I%20am%20an%20expat%20looking%20to%20buy%20a%20car.`}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            <PhoneCall size={16} />
            <span>English Support WhatsApp</span>
          </a>

          {/* Admin Add Unit Button */}
          {isAdmin && (
            <button 
              onClick={onOpenAddModal}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
            >
              <PlusCircle size={17} />
              <span>+ Add Vehicle</span>
            </button>
          )}

          {/* Admin Mode Switcher */}
          <button
            onClick={onToggleAdmin}
            className={`btn ${isAdmin ? 'btn-gold' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
            title={isAdmin ? "Exit Admin Mode" : "Switch to Admin Mode"}
          >
            {isAdmin ? (
              <>
                <Unlock size={16} />
                <span>Admin Mode (Active)</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Admin Portal</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
