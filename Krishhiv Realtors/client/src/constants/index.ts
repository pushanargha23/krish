import type { PropertyType } from '../types';

export const APP_NAME = 'Krisshiv Realtors';
export const APP_TAGLINE = 'Where Luxury Meets Legacy';
export const APP_DESCRIPTION = 'Premium real estate consultancy offering exclusive residential and commercial properties across India\'s most coveted locations.';
export const APP_PHONE = '+91 70032 15308';
export const APP_EMAIL = 'info@krisshivrealtors.com';
export const APP_ADDRESS = '12th Floor, One BKC, Bandra Kurla Complex, Mumbai - 400051';
export const APP_WHATSAPP = '917003215308';

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/krisshivrealtors',
  facebook: 'https://facebook.com/krisshivrealtors',
  linkedin: 'https://linkedin.com/company/krisshivrealtors',
  youtube: 'https://youtube.com/@krisshivrealtors',
  twitter: 'https://twitter.com/krisshivrealtors',
};

export const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'luxury', label: 'Luxury', icon: '💎' },
  { value: 'commercial', label: 'Commercial', icon: '🏬' },
  { value: 'plot', label: 'Plot', icon: '🗺️' },
  { value: 'penthouse', label: 'Penthouse', icon: '🌆' },
  { value: 'studio', label: 'Studio', icon: '🏠' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹50L', min: 0, max: 5000000 },
  { label: '₹50L – ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr – ₹3Cr', min: 10000000, max: 30000000 },
  { label: '₹3Cr – ₹5Cr', min: 30000000, max: 50000000 },
  { label: '₹5Cr – ₹10Cr', min: 50000000, max: 100000000 },
  { label: 'Above ₹10Cr', min: 100000000, max: Infinity },
];

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

export const AMENITIES_LIST = [
  'Swimming Pool', 'Gym', 'Clubhouse', 'Security 24/7', 'Power Backup',
  'Parking', 'Garden', 'Jogging Track', 'Kids Play Area', 'Spa',
  'Tennis Court', 'Basketball Court', 'Yoga Deck', 'Concierge',
  'EV Charging', 'Smart Home', 'Rooftop Lounge', 'Business Center',
  'Amphitheatre', 'Pet Zone',
];

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida',
];

export const STATS = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Premium Builders' },
  { value: 2000, suffix: '+', label: 'Happy Families' },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'shield',
    title: 'Verified Properties',
    description: 'Every listing is RERA verified and legally vetted by our expert team.',
  },
  {
    icon: 'star',
    title: 'Premium Portfolio',
    description: 'Exclusive access to luxury properties from India\'s top developers.',
  },
  {
    icon: 'headset',
    title: 'Dedicated Support',
    description: '24/7 relationship managers for a seamless buying experience.',
  },
  {
    icon: 'chart',
    title: 'Investment Advisory',
    description: 'Data-driven insights to maximize your real estate ROI.',
  },
  {
    icon: 'key',
    title: 'End-to-End Service',
    description: 'From search to possession — we handle everything for you.',
  },
  {
    icon: 'globe',
    title: 'Pan-India Presence',
    description: 'Offices across 10+ cities with deep local market expertise.',
  },
];

export const TRUSTED_BUILDERS = [
  'Lodha', 'DLF', 'Prestige', 'Godrej', 'Sobha',
  'Brigade', 'Oberoi', 'Hiranandani', 'Shapoorji', 'Tata Housing',
];

export const BLOG_CATEGORIES = [
  'Market Trends', 'Investment Tips', 'Home Buying Guide',
  'Interior Design', 'Legal & Finance', 'NRI Corner',
];

export const FAQ_CATEGORIES = [
  'Buying Process', 'Legal & Documentation', 'Finance & Loans',
  'NRI Investments', 'Rental', 'General',
];

export const POSSESSION_OPTIONS = [
  'Ready to Move', 'Within 6 Months', '6-12 Months',
  '1-2 Years', '2-3 Years', '3+ Years',
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';
