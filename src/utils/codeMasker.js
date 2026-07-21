/**
 * Formats a public vehicle code from the real plate number for public website visitors.
 * Example: '126호9415' -> 'RZ-9415'
 * Admin can always see the real plate number in the Admin Panel.
 */
export const getPublicVehicleCode = (plateNumber, carId) => {
  if (!plateNumber) {
    const num = (carId || '').replace(/\D/g, '').slice(-4) || '1001';
    return `RZ-${num}`;
  }
  
  // Extract numbers from license plate (e.g., '126호9415' -> '9415')
  const matches = plateNumber.match(/\d+/g);
  if (matches && matches.length > 0) {
    const lastDigits = matches[matches.length - 1];
    // If digits are 4 or more, take last 4 digits
    const codeDigits = lastDigits.length >= 4 ? lastDigits.slice(-4) : lastDigits.padStart(4, '0');
    return `RZ-${codeDigits}`;
  }
  
  return `RZ-${plateNumber.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase()}`;
};
