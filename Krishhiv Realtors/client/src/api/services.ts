import type { PropertyFilters } from '../types';
import { getProperties, saveProperties } from '../utils/csvParser';
import {
  mockBlogs,
  mockBuilders,
  mockTestimonials,
  mockFaqs,
  mockCareers,
  mockGallery,
  mockUsers,
  mockLeads,
  mockAppointments,
  mockNewsletter
} from '../mockData';

export const propertyService = {
  getAll: async (filters?: PropertyFilters) => {
    try {
      const properties = await getProperties();
      let filtered = [...properties];
      if (filters?.type) filtered = filtered.filter(p => p.type === filters.type);
      if (filters?.city) filtered = filtered.filter(p => p.location.city === filters.city);
      if (filters?.minPrice && filters.maxPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice! && p.price <= filters.maxPrice!);
      }
      return { data: { data: filtered, success: true } };
    } catch (error) {
      throw error;
    }
  },
  getFeatured: async () => {
    try {
      const properties = await getProperties();
      const featured = properties.filter(p => p.isFeatured);
      return { data: { data: featured, success: true } };
    } catch (error) {
      throw error;
    }
  },
  getBySlug: async (slug: string) => {
    try {
      const properties = await getProperties();
      const property = properties.find(p => p.slug === slug);
      if (!property) throw new Error('Property not found');
      return { data: { data: property, success: true } };
    } catch (error) {
      throw error;
    }
  },
  create: async (payload: any) => {
    try {
      const properties = await getProperties();
      const newProperty = { 
        ...payload, 
        _id: `prop_${Date.now()}`,
        slug: payload.title?.toLowerCase().replace(/\s+/g, '-') || `prop-${Date.now()}`,
        createdAt: new Date().toISOString(),
        location: { city: payload.city || '' },
        images: payload.photo ? [{ url: payload.photo, publicId: 'img1', alt: payload.title || 'Property', isPrimary: true }] : []
      };
      properties.push(newProperty);
      saveProperties(properties);
      return { data: { data: newProperty, success: true } };
    } catch (error) {
      throw error;
    }
  },
  update: async (id: string, payload: any) => {
    try {
      const properties = await getProperties();
      const index = properties.findIndex(p => p._id === id);
      if (index === -1) throw new Error('Property not found');
      const updatedProperty = { ...properties[index], ...payload };
      if (payload.city) updatedProperty.location = { ...updatedProperty.location, city: payload.city };
      if (payload.photo) updatedProperty.images = [{ url: payload.photo, publicId: 'img1', alt: updatedProperty.title || 'Property', isPrimary: true }];
      properties[index] = updatedProperty;
      saveProperties(properties);
      return { data: { data: updatedProperty, success: true } };
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      let properties = await getProperties();
      properties = properties.filter(p => p._id !== id);
      saveProperties(properties);
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  }
};

const createMockCRUD = (mockArray: any[], prefix: string) => ({
  getAll: async () => ({ data: { data: mockArray, success: true } }),
  create: async (payload: any) => {
    const newItem = { ...payload, _id: `${prefix}_${Date.now()}`, createdAt: new Date().toISOString() };
    mockArray.push(newItem);
    return { data: { data: newItem, success: true } };
  },
  update: async (id: string, payload: any) => {
    const index = mockArray.findIndex((item: any) => item._id === id);
    if (index !== -1) mockArray[index] = { ...mockArray[index], ...payload };
    return { data: { data: mockArray[index], success: true } };
  },
  delete: async (id: string) => {
    const index = mockArray.findIndex((item: any) => item._id === id);
    if (index !== -1) mockArray.splice(index, 1);
    return { data: { success: true } };
  }
});

export const leadService = createMockCRUD(mockLeads, 'lead');
export const appointmentService = {
  ...createMockCRUD(mockAppointments, 'appt'),
  book: async (payload: any) => {
    const newItem = { ...payload, _id: `appt_${Date.now()}`, createdAt: new Date().toISOString() };
    mockAppointments.push(newItem);
    return { data: { data: newItem, success: true } };
  }
};
export const builderService = createMockCRUD(mockBuilders, 'builder');
export const blogService = createMockCRUD(mockBlogs, 'blog');
export const galleryService = createMockCRUD(mockGallery, 'gal');
export const testimonialService = createMockCRUD(mockTestimonials, 'test');
export const faqService = createMockCRUD(mockFaqs, 'faq');
export const careerService = createMockCRUD(mockCareers, 'career');
export const newsletterService = {
  ...createMockCRUD(mockNewsletter, 'news'),
  subscribe: async (_email: string) => ({ data: { success: true } })
};

export const authService = {
  ...createMockCRUD(mockUsers, 'user'),
  getAllUsers: async () => ({ data: { data: mockUsers, success: true } }),
  login: async () => ({ data: { success: true } }),
  register: async () => ({ data: { success: true } }),
  logout: async () => ({ data: { success: true } }),
  getMe: async () => ({ data: { success: true } }),
  forgotPassword: async () => ({ data: { success: true } }),
  resetPassword: async () => ({ data: { success: true } }),
};

export const contactService = {
  send: async (_payload: any) => ({ success: true })
};
