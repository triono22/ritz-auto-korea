import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { 
  getStoredCars, 
  addCar, 
  updateCarStatus, 
  updateCarDetails, 
  deleteCar, 
  resetToDefaultCars 
} from './services/storage';
import { Sparkles, AlertCircle } from 'lucide-react';

export function App() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [editingCar, setEditingCar] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 6 vehicles per page for comfortable scrolling
  const catalogRef = useRef(null);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    fuelType: '',
    transmission: '',
    status: '',
    sortBy: 'newest'
  });

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, itemsPerPage]);

  // Load cars on initial render
  useEffect(() => {
    const loaded = getStoredCars();
    setCars(loaded);
  }, []);

  // Compute unique brands
  const brands = useMemo(() => {
    const setB = new Set(cars.map(c => c.brand).filter(Boolean));
    return Array.from(setB).sort();
  }, [cars]);

  // Compute Inventory Counters
  const availableCount = useMemo(() => cars.filter(c => c.status === 'AVAILABLE').length, [cars]);
  const soldCount = useMemo(() => cars.filter(c => c.status === 'SOLD').length, [cars]);

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Search text filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchTitle = car.title?.toLowerCase().includes(q);
        const matchBrand = car.brand?.toLowerCase().includes(q);
        const matchModel = car.model?.toLowerCase().includes(q);
        const matchFuel = car.fuelType?.toLowerCase().includes(q);
        const matchPlate = car.plateNumber?.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchModel && !matchFuel && !matchPlate) return false;
      }

      // Brand Filter
      if (filters.brand && car.brand !== filters.brand) return false;

      // Fuel Type Filter
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;

      // Transmission Filter
      if (filters.transmission && car.transmission !== filters.transmission) return false;

      // Status Filter
      if (filters.status && car.status !== filters.status) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'year-newest') return b.year - a.year;
      if (filters.sortBy === 'mileage-lowest') return (a.mileage || 0) - (b.mileage || 0);
      return 0; // Default order
    });
  }, [cars, filters]);

  // Compute Paginated Cars
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCars = useMemo(() => {
    return filteredCars.slice(startIndex, endIndex);
  }, [filteredCars, startIndex, endIndex]);

  // Smooth scroll to top of catalog when changing page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (catalogRef.current) {
        catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsAdminPanelOpen(false);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Handlers for Admin Operations
  const handleAddCar = (newCarData) => {
    const updated = addCar(newCarData);
    setCars(updated);
  };

  const handleToggleStatus = (carId, newStatus) => {
    const updated = updateCarStatus(carId, newStatus);
    setCars(updated);
  };

  const handleUpdateCar = (updatedCarData) => {
    const updated = updateCarDetails(updatedCarData);
    setCars(updated);
  };

  const handleDeleteCar = (carId) => {
    const updated = deleteCar(carId);
    setCars(updated);
  };

  const handleResetData = () => {
    const reset = resetToDefaultCars();
    setCars(reset);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      fuelType: '',
      transmission: '',
      status: '',
      sortBy: 'newest'
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Navigation */}
      <Navbar
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenAddModal={() => {
          setEditingCar(null);
          setIsAdminPanelOpen(true);
        }}
        totalCars={cars.length}
        availableCount={availableCount}
      />

      {/* Hero Section */}
      <HeroSection
        totalCars={cars.length}
        availableCount={availableCount}
        soldCount={soldCount}
      />

      {/* Main Catalog Showcase Section */}
      <main ref={catalogRef} className="container" style={{ flex: 1, paddingBottom: '3rem', scrollMarginTop: '100px' }}>
        
        {/* Title Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '1.5rem',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              Verified Inventory for <span className="gradient-text">Expats in Korea</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Showing Page {currentPage} of {Math.max(totalPages, 1)} ({filteredCars.length} total matched vehicles)
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAdminPanelOpen(true)}
              className="btn btn-gold"
              style={{ fontSize: '0.85rem' }}
            >
              <Sparkles size={16} /> Open Admin Dashboard
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          brands={brands}
          onReset={handleResetFilters}
        />

        {/* Cars Showcase Grid (Paginated) */}
        {paginatedCars.length > 0 ? (
          <>
            <div className="grid-cars">
              {paginatedCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  onSelectCar={(c) => setSelectedCar(c)}
                  isAdmin={isAdmin}
                  onToggleStatus={handleToggleStatus}
                  onEditCar={(c) => {
                    setEditingCar(c);
                    setIsAdminPanelOpen(true);
                  }}
                  onDeleteCar={handleDeleteCar}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalItems={filteredCars.length}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </>
        ) : (
          <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', margin: '2rem 0' }}>
            <AlertCircle size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Vehicles Found Matching Your Filters</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              Try adjusting your search keyword, fuel type, or clear filters to view all available cars in Korea.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Car Detailed Specification Modal */}
      {selectedCar && (
        <CarDetailModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => {
          setIsAdminPanelOpen(false);
          setEditingCar(null);
        }}
        cars={cars}
        onAddCar={handleAddCar}
        onUpdateCar={handleUpdateCar}
        onToggleStatus={handleToggleStatus}
        onDeleteCar={handleDeleteCar}
        onResetData={handleResetData}
        editingCar={editingCar}
        setEditingCar={setEditingCar}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsLoginModalOpen(false);
        }}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
