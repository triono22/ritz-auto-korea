export const INITIAL_CARS = [
  {
    id: "ritz-kr-001",
    title: "Hyundai Grandeur (GRANDEUR) 2.0 LPG Premium",
    brand: "Hyundai",
    model: "Grandeur",
    year: 2022,
    price: 24500000, // KRW 24,500,000 (₩24.5M)
    status: "AVAILABLE",
    fuelType: "LPG",
    transmission: "Automatic",
    mileage: 38200, // KM
    engineCapacity: "L6DB 2.0 LPG Engine",
    color: "Midnight Black",
    plateNumber: "126호9415", // Real plate stored in DB, displayed as Code: RZ-9415 publicly
    vinNumber: "KMHF241NBNA457894",
    firstRegistration: "2021-07-21",
    inspectionValid: "2026-07-21 ~ 2027-07-20",
    warrantyType: "Certified Performance Inspection Warranty Covered",
    location: "RiTZ AUTO Showroom - Seoul / Incheon",
    description: "Official 100% Certified Used Vehicle Inspection Record Verified (Document #0232333172). First registration 2021-07-21. Powered by economical LPG (L6DB engine). Backed by Certified Performance Warranty. Complete English registration assistance for Foreigners & Expats in Korea.",
    features: [
      "Official Inspection Certificate Verified (#0232333172)",
      "Certified Engine & Transmission Inspection Warranty",
      "Smart Cruise Control with Stop & Go",
      "Lane Keeping Assist & Blind Spot Collision Warning",
      "Full Leather Seats with Heated & Ventilated Front Seats",
      "Apple CarPlay & Android Auto English Interface"
    ],
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ritz-kr-002",
    title: "Genesis G80 2.5 AWD Prestige",
    brand: "Genesis",
    model: "G80",
    year: 2023,
    price: 52000000,
    status: "AVAILABLE",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 14500,
    engineCapacity: "2497 cc Turbo Gasoline",
    color: "Uyuni White Metallic",
    plateNumber: "341가8821",
    vinNumber: "KMTG241NBNA883109",
    firstRegistration: "2022-11-15",
    inspectionValid: "2026-11-15 ~ 2027-11-14",
    warrantyType: "Genesis Official Manufacturer Warranty Active",
    location: "RiTZ AUTO Showroom - Seoul / Pyeongtaek",
    description: "Pristine condition flagship Korean luxury sedan. Ultra-low mileage (14.5k km). Fully English infotainment system, Heads-up Display, 360 Surround View Camera. Ideal luxury drive for diplomats and expatriates.",
    features: [
      "Genesis Active Safety Control ADAS",
      "Lexicon 17-Speaker Surround Sound System",
      "14.5-inch High Definition English Navigation",
      "Ergo Motion Massage Seats",
      "AWD All-Wheel Drive Performance",
      "Soft Door Closing & Remote Smart Parking"
    ],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ritz-kr-003",
    title: "Kia Carnival 2.2 Diesel Signature 7-Seater",
    brand: "Kia",
    model: "Carnival",
    year: 2022,
    price: 36800000,
    status: "AVAILABLE",
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 29000,
    engineCapacity: "2151 cc Smartstream Diesel",
    color: "Astra Blue Metallic",
    plateNumber: "159마4012",
    vinNumber: "KNAF241NBNA991024",
    firstRegistration: "2022-03-10",
    inspectionValid: "2026-03-10 ~ 2027-03-09",
    warrantyType: "Certified Inspection Warranty Covered",
    location: "RiTZ AUTO Showroom - Incheon / Pyeongtaek",
    description: "The ultimate family & expat travel MPV in South Korea. 7 VIP Relaxation Seats, Dual Sunroofs, Electric Power Sliding Doors. English navigation loaded. SOFA & foreign worker visa registration support included.",
    features: [
      "VIP Premium Relaxation Seats with Footrest",
      "Dual Electric Sunroofs",
      "Dual Power Sliding Doors & Power Backdoor",
      "BOSE Surround Audio System",
      "Drive Wise Safety ADAS",
      "Rear Passenger Climate Control"
    ],
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ritz-kr-004",
    title: "Hyundai Ioniq 5 EV Long Range AWD",
    brand: "Hyundai",
    model: "Ioniq 5",
    year: 2023,
    price: 43500000,
    status: "AVAILABLE",
    fuelType: "Electric EV",
    transmission: "Automatic Single Speed",
    mileage: 18000,
    engineCapacity: "72.6 kWh Battery (Range: 450 KM)",
    color: "Cyber Gray Metallic",
    plateNumber: "180하5019",
    vinNumber: "KMHE241NBNA338192",
    firstRegistration: "2023-01-20",
    inspectionValid: "2027-01-20 ~ 2028-01-19",
    warrantyType: "Hyundai Battery 8-Year / 160,000 KM Warranty",
    location: "RiTZ AUTO Showroom - Seoul",
    description: "Exempt from Seoul Congestion Fees & Bus Lane Tolls! 100% Electric EV with 450km range. Includes V2L (Vehicle to Load) external power supply adapter and wallbox charger.",
    features: [
      "V2L (Vehicle to Load) 220V Power Outlet",
      "Relaxation Comfort Seats with Zero Gravity Mode",
      "Vision Glass Roof",
      "BOSE Sound System",
      "Ultra-Fast 800V DC Charging Capability",
      "Hyundai SmartSense Safety Suite"
    ],
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ritz-kr-005",
    title: "Kia K5 2.0 LPG Nobless Facelift",
    brand: "Kia",
    model: "K5",
    year: 2021,
    price: 18900000,
    status: "SOLD",
    fuelType: "LPG",
    transmission: "Automatic",
    mileage: 52000,
    engineCapacity: "1999 cc LPI Engine",
    color: "Interstellar Gray",
    plateNumber: "235서8014",
    vinNumber: "KNAK241NBNA772910",
    firstRegistration: "2021-04-18",
    inspectionValid: "2025-04-18 ~ 2026-04-17",
    warrantyType: "Certified Performance Inspection Warranty Covered",
    location: "RiTZ AUTO Showroom - Incheon",
    description: "UNIT SOLD! Popular economical LPG sedan sold to an expat engineer in Suwon. Super cheap fuel cost per kilometer in Korea.",
    features: [
      "LPG Donut Tank for Full Trunk Space",
      "10.25-inch English Navigation Screen",
      "Heated Steering Wheel & Front Seats",
      "Smart Keyless Entry & Push Start Button"
    ],
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ritz-kr-006",
    title: "BMW 520i M Sport (G30 LCI)",
    brand: "BMW",
    model: "5 Series",
    year: 2022,
    price: 46800000,
    status: "AVAILABLE",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 26500,
    engineCapacity: "1998 cc TwinPower Turbo",
    color: "Carbon Black Metallic",
    plateNumber: "208고9102",
    vinNumber: "WBA520I000NA55410",
    firstRegistration: "2022-05-12",
    inspectionValid: "2026-05-12 ~ 2027-05-11",
    warrantyType: "BMW Official Service Inclusive (BSI) Active",
    location: "RiTZ AUTO Showroom - Seoul / Gangnam",
    description: "Imported luxury German sedan with complete English iDrive System. M Sport Package, M Aerodynamics, Shadowline trims. English vehicle registration & insurance support included.",
    features: [
      "M Sport Aerodynamic Package",
      "BMW Live Cockpit Professional English Interface",
      "Wireless Apple CarPlay & Android Auto",
      "Harman Kardon Surround Sound System",
      "Driving Assistant Professional ADAS",
      "Head-Up Display & Gesture Control"
    ],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];
