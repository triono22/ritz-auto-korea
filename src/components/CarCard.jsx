import React from 'react';
import { Fuel, Gauge, Calendar, Eye, MessageCircle, Edit3, Trash2, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { getPublicVehicleCode } from '../utils/codeMasker';
import { convertDriveUrl } from '../utils/imageUtils';
import { WatermarkOverlay } from './WatermarkOverlay';
import { CensorBadge } from './CensorBadge';

export const CarCard = ({ 
  car, 
  onSelectCar, 
  isAdmin, 
  onToggleStatus, 
  onEditCar, 
  onDeleteCar 
}) => {

  const formatKRW = (num) => {
    if (!num || Number(num) <= 0) return 'Inquire for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(num).replace('KRW', '₩');
  };

  const getFuelBadgeClass = (fuel) => {
    const f = (fuel || '').toLowerCase();
    if (f.includes('ev') || f.includes('electric')) return 'fuel-badge ev';
    if (f.includes('hybrid')) return 'fuel-badge hybrid';
    if (f.includes('lpg')) return 'fuel-badge lpg';
    if (f.includes('diesel')) return 'fuel-badge diesel';
    return 'fuel-badge gasoline';
  };

  const publicCode = getPublicVehicleCode(car.plateNumber, car.id);
  const formattedPrice = formatKRW(car.price);
  
  // Convert Google Drive link to direct renderable link
  const primaryImage = car.images && car.images[0] 
    ? convertDriveUrl(car.images[0]) 
    : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80';

  const whatsappMessage = encodeURIComponent(
    `Hello RiTZ AUTO Korea, I am an expat interested in vehicle *${car.title} (${car.year})* [${publicCode}] (${formattedPrice}).\nFuel: ${car.fuelType || 'Gasoline'}\nIs this car available for a test drive and registration assistance?`
  );
  const whatsappUrl = `https://wa.me/821084690945?text=${whatsappMessage}`;

  const isSold = car.status === 'SOLD';

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      opacity: isSold ? 0.88 : 1
    }}>
      
      {/* Image Container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#050810' }}>
        <img
          src={primaryImage}
          alt={car.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            filter: isSold ? 'grayscale(40%)' : 'none'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Watermark */}
        <WatermarkOverlay size="small" />
        
        {/* Status Badge Overlay */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
          <span className={`status-badge ${isSold ? 'sold' : 'available'}`}>
            {isSold ? <XCircle size={14} /> : <CheckCircle size={14} />}
            {isSold ? 'SOLD OUT' : 'AVAILABLE'}
          </span>
        </div>

        {/* Smart Censor Overlay for Primary Image */}
        {car.censorData && car.censorData[0] && (
          <CensorBadge x={car.censorData[0].x} y={car.censorData[0].y} />
        )}

        {/* Fuel Badge Overlay */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2 }}>
          <span className={getFuelBadgeClass(car.fuelType)}>
            <Fuel size={12} />
            {car.fuelType || 'Gasoline'}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(to top, rgba(7, 10, 18, 0.95) 0%, transparent 100%)',
          padding: '1.25rem 1.25rem 0.75rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {(!car.price || Number(car.price) <= 0) ? 'Price Status' : 'KRW Price'}
            </p>
            <h3 style={{
              fontSize: (!car.price || Number(car.price) <= 0) ? '1.15rem' : '1.4rem',
              color: isSold ? 'var(--text-muted)' : (!car.price || Number(car.price) <= 0) ? 'var(--accent-gold)' : 'var(--accent-cyan)',
              fontWeight: 800
            }}>
              {formattedPrice}
            </h3>
          </div>
        </div>
      </div>

      {/* Content Specs Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Title */}
        <h4 style={{
          fontSize: '1.1rem',
          marginBottom: '0.75rem',
          lineHeight: 1.3,
          height: '2.6rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {car.title}
        </h4>

        {/* Key Specs Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Calendar size={14} color="var(--accent-gold)" style={{ marginBottom: '2px' }} />
            <span>{car.year}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
            <Gauge size={14} color="var(--accent-cyan)" style={{ marginBottom: '2px' }} />
            <span>{car.mileage ? `${(car.mileage).toLocaleString('en-US')} km` : '-'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* Vehicle Code */}
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} color="var(--status-available)" /> Vehicle Code: <strong style={{ color: 'var(--accent-cyan)' }}>{publicCode}</strong>
          {isAdmin && car.plateNumber && (
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', marginLeft: 'auto', background: 'rgba(245,158,11,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
              Plate: {car.plateNumber}
            </span>
          )}
        </p>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={() => onSelectCar(car)}
              className="btn btn-secondary"
              style={{ fontSize: '0.82rem', padding: '0.6rem 0.5rem' }}
            >
              <Eye size={15} />
              <span>Full Specs</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ fontSize: '0.82rem', padding: '0.6rem 0.5rem' }}
            >
              <MessageCircle size={15} />
              <span>Inquire WA</span>
            </a>
          </div>

          {/* Admin Management Controls */}
          {isAdmin && (
            <div style={{
              marginTop: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px dashed rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  ⚙️ Admin Control
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {car.id}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.4rem' }}>
                
                {/* 1-Click Status Switcher */}
                <button
                  onClick={() => onToggleStatus(car.id, isSold ? 'AVAILABLE' : 'SOLD')}
                  className={`btn ${isSold ? 'btn-success' : 'btn-danger'}`}
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.4rem' }}
                  title={isSold ? "Mark as AVAILABLE" : "Mark as SOLD"}
                >
                  {isSold ? (
                    <>
                      <CheckCircle size={13} />
                      <span>Set AVAILABLE</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={13} />
                      <span>Set to SOLD</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onEditCar(car)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.4rem' }}
                >
                  <Edit3 size={13} /> Edit
                </button>

                <button
                  onClick={() => onDeleteCar(car.id)}
                  className="btn btn-danger"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.4rem' }}
                >
                  <Trash2 size={13} /> Delete
                </button>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
