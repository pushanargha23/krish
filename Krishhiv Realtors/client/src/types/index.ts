// Core domain types for the entire application

export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceUnit: 'total' | 'per_sqft';
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  areaUnit: 'sqft' | 'sqm';
  floor?: number;
  totalFloors?: number;
  facing?: string;
  furnishing?: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
  possession: string; // "Ready to Move" | "Dec 2025" etc.
  location: Location;
  builder: Builder;
  images: PropertyImage[];
  videos?: string[];
  virtualTour?: string;
  amenities: string[];
  floorPlans?: FloorPlan[];
  highlights: string[];
  rera?: string;
  isFeatured: boolean;
  featuredLevel?: 1 | 2;
  isNew: boolean;
  isVerified: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 'apartment' | 'villa' | 'luxury' | 'commercial' | 'plot' | 'penthouse' | 'studio';
export type PropertyStatus = 'available' | 'sold' | 'under_construction' | 'coming_soon';

export interface PropertyImage {
  url: string;
  publicId: string;
  alt: string;
  isPrimary: boolean;
}

export interface FloorPlan {
  name: string;
  image: string;
  area: number;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  lat: number;
  lng: number;
  micromarket?: string;
}

export interface Builder {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  established: number;
  totalProjects: number;
  deliveredProjects: number;
  website?: string;
  rating: number;
  isVerified: boolean;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  designation: string;
  experience: number;
  languages: string[];
  specialization: PropertyType[];
  rating: number;
  totalDeals: number;
  bio: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  wishlist: string[];
  savedSearches: SavedSearch[];
  recentlyViewed: string[];
  createdAt: string;
}

export interface SavedSearch {
  _id: string;
  name: string;
  filters: PropertyFilters;
  createdAt: string;
}

export interface PropertyFilters {
  search?: string;
  type?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  possession?: string;
  builder?: string;
  amenities?: string[];
  status?: PropertyStatus;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: { name: string; avatar: string };
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  publishedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  avatar?: string;
  designation: string;
  company?: string;
  rating: number;
  review: string;
  propertyBought?: string;
  isVerified: boolean;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId?: string;
  source: 'contact' | 'property' | 'whatsapp' | 'callback';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}

export interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  agentId?: string;
  date: string;
  time: string;
  type: 'site_visit' | 'video_call' | 'office_visit';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  postedAt: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principal: number;
}
