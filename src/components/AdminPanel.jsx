import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Fuel, RefreshCw, CheckCircle, XCircle, Car, ShieldCheck, Image, AlertTriangle } from 'lucide-react';
import { getPublicVehicleCode } from '../utils/codeMasker';
import { convertDriveUrl } from '../utils/imageUtils';

export const AdminPanel = ({ 
  isOpen, 
  onClose, 
  cars, 
  onAddCar, 
  onUpdateCar, 
  onToggleStatus, 
  onDeleteCar, 
  onResetData,
  editingCar,
  setEditingCar
}) => {
  if (!isOpen) return null;

  const initialFormState = {
    title: '',
    brand: 'Hyundai',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    status: 'AVAILABLE',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mileage: '',
    engineCapacity: '',
    color: '',
    plateNumber: '',
    vinNumber: '',
    warrantyType: 'Certified Performance Inspection Warranty Covered',
    location: 'RiTZ AUTO Korea Showroom - Seoul / Incheon',
    description: '',
    featuresText: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    censorData: { 0: null, 1: null, 2: null }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    if (editingCar) {
      setFormData({
        id: editingCar.id,
        title: editingCar.title || '',
        brand: editingCar.brand || 'Hyundai',
        model: editingCar.model || '',
        year: editingCar.year || new Date().getFullYear(),
        price: editingCar.price || '',
        status: editingCar.status || 'AVAILABLE',
        fuelType: editingCar.fuelType || 'Gasoline',
        transmission: editingCar.transmission || 'Automatic',
        mileage: editingCar.mileage || '',
        engineCapacity: editingCar.engineCapacity || '',
        color: editingCar.color || '',
        plateNumber: editingCar.plateNumber || '',
        vinNumber: editingCar.vinNumber || '',
        warrantyType: editingCar.warrantyType || 'Certified Performance Inspection Warranty Covered',
        location: editingCar.location || 'RiTZ AUTO Korea Showroom - Seoul / Incheon',
        description: editingCar.description || '',
        featuresText: editingCar.features ? editingCar.features.join(', ') : '',
        imageUrl1: editingCar.images && editingCar.images[0] ? editingCar.images[0] : '',
        imageUrl2: editingCar.images && editingCar.images[1] ? editingCar.images[1] : '',
        imageUrl3: editingCar.images && editingCar.images[2] ? editingCar.images[2] : '',
        censorData: editingCar.censorData || { 0: null, 1: null, 2: null }
      });
      setActiveTab('form');
    }
  }, [editingCar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCensorClick = (index, e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFormData(prev => ({
      ...prev,
      censorData: { ...prev.censorData, [index]: { x, y } }
    }));
  };

  const clearCensor = (index, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      censorData: { ...prev.censorData, [index]: null }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a Vehicle Title!');
      return;
    }

    const imagesArray = [];
    if (formData.imageUrl1.trim()) imagesArray.push(formData.imageUrl1.trim());
    if (formData.imageUrl2.trim()) imagesArray.push(formData.imageUrl2.trim());
    if (formData.imageUrl3.trim()) imagesArray.push(formData.imageUrl3.trim());

    if (imagesArray.length === 0) {
      imagesArray.push('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80');
    }

    const featuresList = formData.featuresText
      ? formData.featuresText.split(',').map(f => f.trim()).filter(Boolean)
      : ['Certified Inspection Certificate Verified (#0232333172)', 'Certified Engine Warranty', 'English Registration Assistance'];

    const carPayload = {
      ...formData,
      price: formData.price !== '' ? Number(formData.price) : 0,
      year: Number(formData.year),
      mileage: formData.mileage ? Number(formData.mileage) : 0,
      features: featuresList,
      images: imagesArray,
      censorData: formData.censorData
    };

    if (formData.id) {
      onUpdateCar(carPayload);
      alert('Vehicle successfully updated!');
    } else {
      onAddCar(carPayload);
      alert('New vehicle successfully added to inventory!');
    }

    setFormData(initialFormState);
    setEditingCar(null);
    setActiveTab('list');
  };

  const handleStartAdd = () => {
    setEditingCar(null);
    setFormData(initialFormState);
    setActiveTab('form');
  };

  const formatKRW = (num) => {
    if (!num || Number(num) <= 0) return 'Price on Request';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(num).replace('KRW', '₩');
  };

  const previewImg1 = formData.imageUrl1 ? convertDriveUrl(formData.imageUrl1) : null;
  const previewImg2 = formData.imageUrl2 ? convertDriveUrl(formData.imageUrl2) : null;
  const previewImg3 = formData.imageUrl3 ? convertDriveUrl(formData.imageUrl3) : null;

  const renderPreview = (imgUrl, index) => {
    if (!imgUrl) return null;
    return (
      <div style={{ marginTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
            <strong>Smart Censor:</strong> Click on the license plate below to cover it.
          </span>
          {formData.censorData[index] && (
            <button type="button" onClick={(e) => clearCensor(index, e)} className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
              Clear Censor
            </button>
          )}
        </div>
        <div style={{ position: 'relative', display: 'inline-block', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <img 
            src={imgUrl} 
            alt="Preview" 
            style={{ maxHeight: '250px', objectFit: 'contain', display: 'block', cursor: 'crosshair' }}
            onClick={(e) => handleCensorClick(index, e)}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {formData.censorData[index] && (
            <div style={{
              position: 'absolute',
              top: `${formData.censorData[index].y}%`,
              left: `${formData.censorData[index].x}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#0a0f1d',
              border: '2px solid var(--accent-cyan)',
              borderRadius: '4px',
              padding: '4px 12px',
              pointerEvents: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.8)'
            }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 900, whiteSpace: 'nowrap' }}>
                <span style={{ color: '#ffffff' }}>RiTZ</span>
                <span style={{ color: 'var(--accent-cyan)' }}>AUTO</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: '#0a0f1d',
          border: '1px solid rgba(245, 158, 11, 0.4)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="status-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)' }}>
                ADMIN DASHBOARD
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                🔒 Real License Plates are only visible to Admin
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: '4px' }}>Inventory & Vehicle Privacy Management</h2>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('list')}
            className={`btn ${activeTab === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.9rem' }}
          >
            <Car size={16} /> Manage Inventory ({cars.length})
          </button>

          <button
            onClick={handleStartAdd}
            className={`btn ${activeTab === 'form' ? 'btn-gold' : 'btn-secondary'}`}
            style={{ fontSize: '0.9rem' }}
          >
            <Plus size={16} /> {formData.id ? 'Edit Vehicle' : '+ Add New Vehicle'}
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all car data to default inventory?')) {
                onResetData();
              }
            }}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', marginLeft: 'auto', color: 'var(--text-dim)' }}
          >
            <RefreshCw size={14} /> Reset Demo Data
          </button>
        </div>

        {activeTab === 'list' && (
          <div>
            <div style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShieldCheck size={18} color="var(--accent-cyan)" />
              <span>
                <strong style={{ color: '#ffffff' }}>Plate Privacy Active:</strong> Admin writes real plate numbers e.g. <code style={{ color: 'var(--accent-gold)' }}>126호9415</code>. On the public website, it automatically displays masked code e.g. <code style={{ color: 'var(--accent-cyan)' }}>RZ-9415</code>. Price is optional. Drive link converter is active.
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem' }}>Vehicle</th>
                    <th style={{ padding: '0.75rem' }}>Real Plate (Admin)</th>
                    <th style={{ padding: '0.75rem' }}>Public Code</th>
                    <th style={{ padding: '0.75rem' }}>Fuel</th>
                    <th style={{ padding: '0.75rem' }}>KRW Price</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>1-Click Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((c) => {
                    const isSold = c.status === 'SOLD';
                    const pubCode = getPublicVehicleCode(c.plateNumber, c.id);
                    const carImg = c.images && c.images[0] ? convertDriveUrl(c.images[0]) : '';
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: isSold ? 'rgba(244, 63, 94, 0.03)' : 'transparent' }}>
                        <td style={{ padding: '0.85rem 0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img 
                              src={carImg || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'} 
                              alt="" 
                              style={{ width: '48px', height: '34px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                            <div>
                              <strong style={{ display: 'block', color: '#ffffff' }}>{c.title}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.year} • {c.transmission}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--accent-gold)',
                            background: 'rgba(245, 158, 11, 0.15)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(245, 158, 11, 0.3)'
                          }}>
                            {c.plateNumber || 'No Plate'}
                          </span>
                        </td>

                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--accent-cyan)',
                            background: 'rgba(6, 182, 212, 0.12)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(6, 182, 212, 0.3)'
                          }}>
                            {pubCode}
                          </span>
                        </td>

                        <td style={{ padding: '0.75rem' }}>
                          <span className="fuel-badge gasoline" style={{ fontSize: '0.75rem' }}>
                            <Fuel size={11} /> {c.fuelType || 'Gasoline'}
                          </span>
                        </td>

                        <td style={{ padding: '0.75rem', fontWeight: 700, color: isSold ? 'var(--text-muted)' : 'var(--accent-cyan)' }}>
                          {formatKRW(c.price)}
                        </td>

                        <td style={{ padding: '0.75rem' }}>
                          <span className={`status-badge ${isSold ? 'sold' : 'available'}`}>
                            {isSold ? 'SOLD' : 'AVAILABLE'}
                          </span>
                        </td>

                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                          <button
                            onClick={() => onToggleStatus(c.id, isSold ? 'AVAILABLE' : 'SOLD')}
                            className={`btn ${isSold ? 'btn-success' : 'btn-danger'}`}
                            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                          >
                            {isSold ? (
                              <>
                                <CheckCircle size={13} /> Set AVAILABLE
                              </>
                            ) : (
                              <>
                                <XCircle size={13} /> Set to SOLD
                              </>
                            )}
                          </button>
                        </td>

                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setEditingCar(c)}
                              className="btn btn-secondary"
                              style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete vehicle ${c.title}?`)) {
                                  onDeleteCar(c.id);
                                }
                              }}
                              className="btn btn-danger"
                              style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Vehicle Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Hyundai Grandeur (GRANDEUR) 2.0 LPG Premium"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Make / Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Hyundai, Genesis, Kia, BMW, Mercedes, etc."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Grandeur, G80, Carnival, Ioniq 5, K5..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price in Korean Won (KRW ₩) (Optional)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Leave empty for 'Price on Request'"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: 'var(--accent-cyan)' }}>
                  ⛽ Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="form-select"
                  style={{ borderColor: 'var(--accent-cyan)' }}
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="LPG">LPG (Korea Fuel)</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric EV">Electric EV</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="AVAILABLE">AVAILABLE (For Sale)</option>
                  <option value="SOLD">SOLD (Sold out)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🚘 Real Plate Number (Admin Only)
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. 126호9415"
                  className="form-input"
                  style={{ borderColor: 'var(--accent-gold)' }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Public site will display generated Vehicle Code: <code style={{ color: 'var(--accent-cyan)' }}>{getPublicVehicleCode(formData.plateNumber, 'preview')}</code>
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Odometer Mileage (KM)</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="e.g. 38200"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Engine Capacity / Code</label>
                <input
                  type="text"
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g. L6DB 2.0 LPG / 2497 cc Turbo"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Chassis Number (VIN)</label>
                <input
                  type="text"
                  name="vinNumber"
                  value={formData.vinNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. KMHF241NBNA457894"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Warranty / Performance Record Status</label>
                <input
                  type="text"
                  name="warrantyType"
                  value={formData.warrantyType}
                  onChange={handleInputChange}
                  placeholder="e.g. Certified Performance Inspection Warranty Covered"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Image size={15} color="var(--accent-cyan)" /> Main Image URL (Google Drive / Web links supported)
                </label>
                <input
                  type="url"
                  name="imageUrl1"
                  value={formData.imageUrl1}
                  onChange={handleInputChange}
                  placeholder="Paste Google Drive link or standard image link..."
                  className="form-input"
                />
                
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: 'var(--accent-gold)',
                  marginTop: '0.4rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.4rem'
                }}>
                  <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Important for Google Drive Links:</strong> You must set your Google Drive file's sharing permission to <u>&quot;Anyone with the link can view&quot;</u> (Public). If it is set to &quot;Restricted&quot;, the image will not load!
                  </div>
                </div>
                {renderPreview(previewImg1, 0)}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Second Image URL (Optional)</label>
                <input
                  type="url"
                  name="imageUrl2"
                  value={formData.imageUrl2}
                  onChange={handleInputChange}
                  placeholder="Paste second Google Drive link or standard image link..."
                  className="form-input"
                />
                {renderPreview(previewImg2, 1)}
              </div>

              {/* THIRD IMAGE URL INPUT */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Third Image URL (Optional)</label>
                <input
                  type="url"
                  name="imageUrl3"
                  value={formData.imageUrl3}
                  onChange={handleInputChange}
                  placeholder="Paste third Google Drive link or standard image link..."
                  className="form-input"
                />
                {renderPreview(previewImg3, 2)}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Key Features (comma separated)</label>
                <input
                  type="text"
                  name="featuresText"
                  value={formData.featuresText}
                  onChange={handleInputChange}
                  placeholder="Certified Inspection Certificate Verified (#0232333172), Engine Warranty, Leather Seats"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Vehicle Description & Expat Inspection Notes</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide inspection certificate details, warranty coverage, English assistance..."
                  className="form-textarea"
                />
              </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveTab('list')} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-gold" style={{ padding: '0.75rem 2rem' }}>
                {formData.id ? 'Save Changes' : 'Add Vehicle to Inventory'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
