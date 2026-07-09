import type { PropertyFilters } from '../types';
import { getProperties } from '../utils/csvParser';
import { 
  mockBlogs, 
  mockBuilders, 
  mockTestimonials, 
  mockFaqs, 
  mockCareers, 
  mockGallery 
} from '../mockData';

export const propertyService = {
  getAll: async (filters: PropertyFilters) => {
    try {
      const properties = await getProperties();
      let filtered = [...properties];
      
      if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
      if (filters.city) filtered = filtered.filter(p => p.location.city === filters.city);
      if (filters.minPrice && filters.maxPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice! && p.price <= filters.maxPrice!);
      }

      return { data: { data: filtered, success: true } };
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

  getFeatured: async () => {
    try {
      const properties = await getProperties();
      const data = properties.filter(p => p.isFeatured);
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getRelated: async (id: string, type: string) => {
    try {
      const properties = await getProperties();
      const data = properties
        .filter(p => p.type === type && p._id !== id)
        .slice(0, 3);
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  search: async (query: string) => {
    try {
      const properties = await getProperties();
      const results = properties.filter(prop => 
        prop.title?.toLowerCase().includes(query.toLowerCase()) ||
        prop.location.address?.toLowerCase().includes(query.toLowerCase())
      );
      return { data: { data: results, success: true } };
    } catch (error) {
      throw error;
    }
  },

  toggleWishlist: async (_propertyId: string, _userId: string) => {
    try {
      return { data: { data: { wishlisted: true }, success: true } };
    } catch (error) {
      throw error;
    }
  },

  trackView: async (_propertyId: string) => {
    try {
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const leadService = {
  create: async (_payload: {
    name: string; email: string; phone: string;
    message?: string; propertyId?: string; source: string;
  }) => {
    try {
      return { data: { data: { id: 'mock_lead_id' }, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const appointmentService = {
  book: async (_payload: {
    name: string; email: string; phone: string;
    propertyId: string; date: string; time: string; type: string;
  }) => {
    try {
      return { data: { data: { id: 'mock_appt_id' }, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const blogService = {
  getAll: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      let filtered = [...mockBlogs];
      if (params?.category) {
        filtered = filtered.filter(b => b.category === params.category);
      }
      return { data: { data: { blogs: filtered, pagination: { page: 1, limit: 10, total: filtered.length } }, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const blog = mockBlogs.find(b => b.slug === slug);
      if (!blog) throw new Error('Blog not found');
      return { data: { data: blog, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const testimonialService = {
  getAll: async () => {
    try {
      return { data: { data: mockTestimonials, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const builderService = {
  getAll: async () => {
    try {
      return { data: { data: mockBuilders, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const builder = mockBuilders.find(b => b.slug === slug);
      if (!builder) throw new Error('Builder not found');
      return { data: { data: builder, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const faqService = {
  getAll: async () => {
    try {
      return { data: { data: mockFaqs, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const galleryService = {
  getAll: async (category?: string) => {
    try {
      let filtered = [...mockGallery];
      if (category) {
        filtered = filtered.filter(g => g.category === category);
      }
      return { data: { data: filtered, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const careerService = {
  getAll: async () => {
    try {
      return { data: { data: mockCareers, success: true } };
    } catch (error) {
      throw error;
    }
  },

  apply: async (_careerId: string, _formData: FormData) => {
    try {
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const contactService = {
  send: async (_payload: { name: string; email: string; phone: string; subject: string; message: string }) => {
    try {
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const newsletterService = {
  subscribe: async (_email: string) => {
    try {
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const authService = {
  login: async (_email: string, _password: string) => {
    return { data: { success: true } };
  },

  register: async (_payload: { name: string; email: string; phone: string; password: string }) => {
    return { data: { success: true } };
  },

  logout: async () => {
    return { data: { success: true } };
  },

  getMe: async () => {
    return { data: { success: true } };
  },

  forgotPassword: async (_email: string) => {
    return { data: { success: true } };
  },

  resetPassword: async (_token: string, _password: string) => {
    return { data: { success: true } };
  },
};
