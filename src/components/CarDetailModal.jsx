import React, { useState } from 'react';
import { X, Fuel, Gauge, Calendar, ShieldCheck, MapPin, CheckCircle2, MessageCircle, FileText, Globe, Award } from 'lucide-react';
import { getPublicVehicleCode } from '../utils/codeMasker';
import { convertDriveUrl } from '../utils/imageUtils';
import { WatermarkOverlay } from './WatermarkOverlay';
import { CensorBadge } from './CensorBadge';

export const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatKRW = (num) => {
    if (!num || Number(num) <= 0) return 'Inquire for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(num).replace('KRW', '₩');
  };

  const isSold = car.status === 'SOLD';
  const publicCode = getPublicVehicleCode(car.plateNumber, car.id);
  const formattedPrice = formatKRW(car.price);

  // Convert raw image links including Google Drive sharing URLs
  const rawImages = car.images && car.images.length > 0 ? car.images : [];
  const images = rawImages.map(convertDriveUrl);
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80');
  }

  const whatsappMessage = encodeURIComponent(
    `Hello RiTZ AUTO Korea, I am an expat inquiring about the *${car.title} (${car.year})* [Vehicle Code: ${publicCode}] (${formattedPrice}).\nFuel: ${car.fuelType || 'Gasoline'}\nWarranty: ${car.warrantyType || 'Certified'}\nCan I schedule a test drive and get registration support?`
  );
  const whatsappUrl = `https://wa.me/821084690945?text=${whatsappMessage}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          background: '#0c1220',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        {/* Close Button Header */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)'
          }}
        >
          <X size={20} />
        </button>

        {/* Gallery Image Display */}
        <div style={{ position: 'relative', height: '380px', background: '#050810' }}>
          <img
            src={images[activeImageIndex]}
            alt={car.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Watermark */}
          <WatermarkOverlay size="medium" />

          {/* Smart Censor Overlay */}
          {car.censorData && car.censorData[activeImageIndex] && (
            <CensorBadge x={car.censorData[activeImageIndex].x} y={car.censorData[activeImageIndex].y} />
          )}

          {/* Badges Overlay */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '0.6rem' }}>
            <span className={`status-badge ${isSold ? 'sold' : 'available'}`}>
              {isSold ? 'SOLD / RESERVED' : 'AVAILABLE FOR EXPATS'}
            </span>
            <span className="fuel-badge gasoline" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
              <Fuel size={14} color="var(--accent-cyan)" />
              <strong style={{ color: '#ffffff' }}>{car.fuelType || 'Gasoline'}</strong>
            </span>
          </div>

          {/* Image Thumbnails Strip */}
          {images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(0,0,0,0.6)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(8px)'
            }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '45px',
                    height: '32px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: activeImageIndex === idx ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    opacity: activeImageIndex === idx ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Content */}
        <div style={{ padding: '2rem' }}>
          
          {/* Header Info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {car.brand} • {car.model}
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '4px' }}>{car.title}</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px' }}>
                <MapPin size={15} color="var(--accent-gold)" />
                {car.location || 'RiTZ AUTO Korea Showroom'}
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Price Status</span>
              <h2 style={{ fontSize: (!car.price || Number(car.price) <= 0) ? '1.5rem' : '2rem', color: isSold ? 'var(--text-muted)' : (!car.price || Number(car.price) <= 0) ? 'var(--accent-gold)' : 'var(--accent-cyan)', fontWeight: 800 }}>
                {formattedPrice}
              </h2>
            </div>
          </div>

          {/* Technical Inspection Certificate Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            margin: '1.5rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Award size={32} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)' }}>
                Official Korean Performance & Inspection Record Certified (성능·상태점검기록부)
              </h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                Warranty Protection: <strong style={{ color: '#ffffff' }}>{car.warrantyType || 'Certified Performance Inspection Warranty Covered'}</strong>
              </p>
            </div>
          </div>

          {/* Full Technical Specifications Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="var(--accent-cyan)" />
              Full Specification & Inspection Data
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vehicle Identification Code</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  🏷️ {publicCode}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fuel Type</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  ⛽ {car.fuelType || 'Gasoline'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Model Year</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  📅 {car.year}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transmission</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  ⚙️ {car.transmission}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Odometer Mileage</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  🛣️ {car.mileage ? `${(car.mileage).toLocaleString('en-US')} KM` : '-'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Engine Capacity / Code</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  ⚡ {car.engineCapacity || '-'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Chassis Number (VIN)</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  🔑 {car.vinNumber || 'KMHF241NBNA457894'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Inspection Valid Period</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  📄 {car.inspectionValid || 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>Vehicle Condition & Expat Notes</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {car.description}
              </p>
            </div>
          )}

          {/* Key Features List */}
          {car.features && car.features.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>Highlighted Features</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '0.6rem'
              }}>
                {car.features.map((feat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)'
                  }}>
                    <CheckCircle2 size={16} color="var(--accent-cyan)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expat Registration Support Assurance */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <Globe size={36} color="var(--accent-cyan)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>Complete English Assistance for Foreign Residents in Korea</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                We guide you through mandatory Korean vehicle insurance, ARC / Passport registration paperwork, city hall registration, and nationwide door-to-door delivery.
              </p>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'flex-end',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button onClick={onClose} className="btn btn-secondary">
              Close Details
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
            >
              <MessageCircle size={20} />
              <span>Inquire via WhatsApp Direct (English)</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
