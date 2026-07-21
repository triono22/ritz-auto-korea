import React from 'react';
import { Search, Fuel, RotateCcw } from 'lucide-react';

export const FilterBar = ({ 
  filters, 
  setFilters, 
  brands, 
  onReset 
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
      
      {/* Search Input Top */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search 
            size={20} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search make, model, fuel, or plate (e.g. Grandeur, LPG, Genesis, 126호9415)..."
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        {/* Sort Selector */}
        <div style={{ width: '220px' }}>
          <select 
            name="sortBy" 
            value={filters.sortBy} 
            onChange={handleChange} 
            className="form-select"
          >
            <option value="newest">Sort: Newly Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year-newest">Year: Newest First</option>
            <option value="mileage-lowest">Mileage: Lowest First</option>
          </select>
        </div>
      </div>

      {/* Filter Row Options */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        alignItems: 'end'
      }}>

        {/* Brand Filter */}
        <div>
          <label className="form-label">Make / Brand</label>
          <select name="brand" value={filters.brand} onChange={handleChange} className="form-select">
            <option value="">All Makes</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Fuel Type Filter */}
        <div>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Fuel size={14} color="var(--accent-cyan)" /> Fuel Type
          </label>
          <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="form-select">
            <option value="">All Fuel Types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="LPG">LPG (Economical Korea Fuel)</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric EV">Electric EV</option>
          </select>
        </div>

        {/* Transmission Filter */}
        <div>
          <label className="form-label">Transmission</label>
          <select name="transmission" value={filters.transmission} onChange={handleChange} className="form-select">
            <option value="">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="form-label">Vehicle Status</label>
          <select name="status" value={filters.status} onChange={handleChange} className="form-select">
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available Only</option>
            <option value="SOLD">Sold Only</option>
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <button 
            onClick={onReset} 
            className="btn btn-secondary" 
            style={{ width: '100%', height: '42px', padding: '0 1rem', fontSize: '0.85rem' }}
          >
            <RotateCcw size={15} /> Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
};
