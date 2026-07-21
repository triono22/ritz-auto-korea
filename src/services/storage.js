import { INITIAL_CARS } from '../data/initialCars';

const STORAGE_KEY = 'ritz_auto_cars_kr_v3';

export const getStoredCars = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CARS));
      return INITIAL_CARS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read cars from localStorage:', err);
    return INITIAL_CARS;
  }
};

export const saveCars = (cars) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  } catch (err) {
    console.error('Failed to save cars to localStorage:', err);
  }
};

export const addCar = (newCar) => {
  const cars = getStoredCars();
  const carWithId = {
    ...newCar,
    id: `ritz-kr-${Date.now()}`,
    status: newCar.status || 'AVAILABLE',
    images: newCar.images && newCar.images.length > 0 
      ? newCar.images 
      : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80']
  };
  const updated = [carWithId, ...cars];
  saveCars(updated);
  return updated;
};

export const updateCarStatus = (carId, newStatus) => {
  const cars = getStoredCars();
  const updated = cars.map(car => {
    if (car.id === carId) {
      return { ...car, status: newStatus };
    }
    return car;
  });
  saveCars(updated);
  return updated;
};

export const updateCarDetails = (updatedCar) => {
  const cars = getStoredCars();
  const updated = cars.map(car => car.id === updatedCar.id ? updatedCar : car);
  saveCars(updated);
  return updated;
};

export const deleteCar = (carId) => {
  const cars = getStoredCars();
  const updated = cars.filter(car => car.id !== carId);
  saveCars(updated);
  return updated;
};

export const resetToDefaultCars = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CARS));
  return INITIAL_CARS;
};
