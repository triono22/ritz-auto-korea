import React from 'react';

export const CensorBadge = ({ x, y }) => {
  if (x === undefined || y === undefined || x === null || y === null) return null;

  return (
    <div style={{
      position: 'absolute',
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0a0f1d',
      border: '2px solid var(--accent-cyan)',
      borderRadius: '4px',
      padding: '4px 12px',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
      width: 'max-content',
      pointerEvents: 'none'
    }}>
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.2rem',
        fontWeight: 900,
        letterSpacing: '0.05em',
        lineHeight: 1,
        whiteSpace: 'nowrap'
      }}>
        <span style={{ color: '#ffffff' }}>RiTZ</span>
        <span style={{ color: 'var(--accent-cyan)' }}>AUTO</span>
      </span>
    </div>
  );
};
