import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  setItemsPerPage, 
  totalItems,
  startIndex,
  endIndex
}) => {
  if (totalPages <= 1 && totalItems <= itemsPerPage) return null;

  // Generate array of page numbers e.g. [1, 2, 3]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '1rem 1.5rem',
      marginTop: '2.5rem'
    }}>
      {/* Item Range Info */}
      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--accent-cyan)' }}>{totalItems > 0 ? startIndex + 1 : 0}</strong> to{' '}
        <strong style={{ color: 'var(--accent-cyan)' }}>{Math.min(endIndex, totalItems)}</strong> of{' '}
        <strong style={{ color: '#ffffff' }}>{totalItems}</strong> vehicles
      </div>

      {/* Page Numbers Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary"
          style={{
            padding: '0.45rem 0.75rem',
            fontSize: '0.85rem',
            opacity: currentPage === 1 ? 0.4 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Number Buttons */}
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: currentPage === page ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              background: currentPage === page 
                ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)' 
                : 'rgba(255, 255, 255, 0.04)',
              color: currentPage === page ? '#ffffff' : 'var(--text-muted)',
              fontWeight: currentPage === page ? '700' : '500',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: currentPage === page ? '0 0 15px rgba(6, 182, 212, 0.35)' : 'none'
            }}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="btn btn-secondary"
          style={{
            padding: '0.45rem 0.75rem',
            fontSize: '0.85rem',
            opacity: (currentPage === totalPages || totalPages === 0) ? 0.4 : 1,
            cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer'
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Items Per Page Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>Show per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="form-select"
          style={{ width: '70px', padding: '0.35rem 0.5rem', fontSize: '0.85rem' }}
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
};
