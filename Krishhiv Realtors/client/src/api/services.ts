import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const propertyService = {
  getAll: async (filters: PropertyFilters) => {
    try {
      const propertiesRef = collection(db, 'properties');
      let q = query(propertiesRef);
      
      if (filters.type) q = query(propertiesRef, where('type', '==', filters.type));
      if (filters.city) q = query(propertiesRef, where('city', '==', filters.city));
      if (filters.minPrice && filters.maxPrice) {
        q = query(propertiesRef, where('price', '>=', filters.minPrice), where('price', '<=', filters.maxPrice));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const q = query(collection(db, 'properties'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error('Property not found');
      const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const q = query(collection(db, 'properties'), where('featured', '==', true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getRelated: async (id: string, type: string) => {
    try {
      const q = query(collection(db, 'properties'), where('type', '==', type));
      const snapshot = await getDocs(q);
      const data = snapshot.docs
        .filter(d => d.id !== id)
        .slice(0, 3)
        .map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  search: async (query: string) => {
    try {
      const propertiesRef = collection(db, 'properties');
      const snapshot = await getDocs(propertiesRef);
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(prop => 
          prop.title?.toLowerCase().includes(query.toLowerCase()) ||
          prop.location?.toLowerCase().includes(query.toLowerCase())
        );
      return { data: { data: results, success: true } };
    } catch (error) {
      throw error;
    }
  },

  toggleWishlist: async (propertyId: string, userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      const wishlist = userSnap.data()?.wishlist || [];
      
      if (wishlist.includes(propertyId)) {
        await updateDoc(userRef, { wishlist: arrayRemove(propertyId) });
      } else {
        await updateDoc(userRef, { wishlist: arrayUnion(propertyId) });
      }
      
      return { data: { data: { wishlisted: !wishlist.includes(propertyId) }, success: true } };
    } catch (error) {
      throw error;
    }
  },

  trackView: async (propertyId: string) => {
    try {
      const propertyRef = doc(db, 'properties', propertyId);
      const propertyDoc = await getDoc(propertyRef);
      const currentViews = propertyDoc.data()?.views || 0;
      await updateDoc(propertyRef, {
        views: currentViews + 1
      });
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const leadService = {
  create: async (payload: {
    name: string; email: string; phone: string;
    message?: string; propertyId?: string; source: string;
  }) => {
    try {
      const leadsRef = collection(db, 'leads');
      const docRef = await addDoc(leadsRef, {
        ...payload,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      return { data: { data: { id: docRef.id }, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const appointmentService = {
  book: async (payload: {
    name: string; email: string; phone: string;
    propertyId: string; date: string; time: string; type: string;
  }) => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const docRef = await addDoc(appointmentsRef, {
        ...payload,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      return { data: { data: { id: docRef.id }, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const blogService = {
  getAll: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      let q = query(collection(db, 'blogs'));
      if (params?.category) {
        q = query(collection(db, 'blogs'), where('category', '==', params.category));
      }
      const snapshot = await getDocs(q);
      const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data: { blogs, pagination: { page: 1, limit: 10, total: blogs.length } }, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const q = query(collection(db, 'blogs'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error('Blog not found');
      const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const testimonialService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, 'testimonials'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const builderService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, 'builders'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const q = query(collection(db, 'builders'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error('Builder not found');
      const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const faqService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, 'faqs'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const galleryService = {
  getAll: async (category?: string) => {
    try {
      let q = query(collection(db, 'gallery'));
      if (category) {
        q = query(collection(db, 'gallery'), where('category', '==', category));
      }
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const careerService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, 'careers'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      return { data: { data, success: true } };
    } catch (error) {
      throw error;
    }
  },

  apply: async (careerId: string, _formData: FormData) => {
    try {
      const applicationsRef = collection(db, 'applications');
      await addDoc(applicationsRef, {
        careerId,
        createdAt: serverTimestamp(),
        status: 'received',
      });
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const contactService = {
  send: async (payload: { name: string; email: string; phone: string; subject: string; message: string }) => {
    try {
      const contactRef = collection(db, 'contact-submissions');
      await addDoc(contactRef, {
        ...payload,
        createdAt: serverTimestamp(),
      });
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

export const newsletterService = {
  subscribe: async (email: string) => {
    try {
      const subscribersRef = collection(db, 'newsletter-subscribers');
      const q = query(subscribersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) throw new Error('Already subscribed');
      
      await addDoc(subscribersRef, {
        email,
        createdAt: serverTimestamp(),
      });
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },
};

// Auth service is now handled by Firebase Authentication in AuthContext
export const authService = {
  // These are now handled in AuthContext using Firebase Auth
  login: async (_email: string, _password: string) => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },

  register: async (_payload: { name: string; email: string; phone: string; password: string }) => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },

  logout: async () => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },

  getMe: async () => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },

  forgotPassword: async (_email: string) => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },

  resetPassword: async (_token: string, _password: string) => {
    // Use Firebase auth in AuthContext
    return { data: { success: true } };
  },
};
