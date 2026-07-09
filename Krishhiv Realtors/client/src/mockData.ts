import type { Property, Blog, Builder, Testimonial, FAQ, Career, GalleryItem } from './types';

export const mockProperties: Property[] = [
  {
    _id: 'prop_1',
    title: 'Luxury Villa in Beverly Hills',
    slug: 'luxury-villa-beverly-hills',
    description: 'A stunning luxury villa...',
    price: 15000000,
    priceUnit: 'total',
    type: 'villa',
    status: 'available',
    bedrooms: 5,
    bathrooms: 6,
    area: 8000,
    areaUnit: 'sqft',
    possession: 'Ready to Move',
    location: {
      address: '123 Beverly Hills',
      city: 'Mumbai',
      state: 'MH',
      pincode: '400050',
      lat: 19.076,
      lng: 72.877
    },
    builder: {
      _id: 'builder_1',
      name: 'Prestige Builders',
      slug: 'prestige-builders',
      logo: '',
      description: 'Top builder',
      established: 1990,
      totalProjects: 50,
      deliveredProjects: 45,
      rating: 4.8,
      isVerified: true
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        publicId: 'img1',
        alt: 'Villa Front',
        isPrimary: true
      }
    ],
    amenities: ['Swimming Pool', 'Gym'],
    highlights: ['Sea View', 'Private Garden'],
    isFeatured: true,
    isNew: true,
    isVerified: true,
    views: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockBlogs: Blog[] = [];
export const mockBuilders: Builder[] = [];
export const mockTestimonials: Testimonial[] = [];
export const mockFaqs: FAQ[] = [];
export const mockCareers: Career[] = [];
export const mockGallery: GalleryItem[] = [];
