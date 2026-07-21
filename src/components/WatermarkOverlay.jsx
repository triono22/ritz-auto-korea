import React from 'react';

export const WatermarkOverlay = ({ size = 'medium' }) => {
  const getFontSize = () => {
    if (size === 'small') return '1.8rem';
    if (size === 'large') return '4rem';
    return '2.5rem';
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        transform: 'rotate(-25deg)',
        opacity: 0.35, // Semi-transparent for watermark effect
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.8))'
      }}>
        <h2 style={{
          fontSize: getFontSize(),
          fontWeight: 900,
          letterSpacing: '0.05em',
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          whiteSpace: 'nowrap'
        }}>
          <span style={{ color: '#ffffff' }}>RiTZ</span>
          <span style={{ color: 'var(--accent-cyan)' }}>AUTO</span>
        </h2>
        <span style={{ 
          color: '#ffffff', 
          fontSize: size === 'large' ? '1rem' : '0.65rem', 
          letterSpacing: '0.2em', 
          fontWeight: 600,
          marginTop: '-4px',
          textShadow: '1px 1px 4px rgba(0,0,0,0.9)'
        }}>
          VERIFIED INVENTORY
        </span>
      </div>
    </div>
  );
};
