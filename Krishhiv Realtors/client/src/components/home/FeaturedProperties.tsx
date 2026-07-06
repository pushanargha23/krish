import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FiArrowRight } from 'react-icons/fi';
import { propertyService } from '../../api/services';
import { PropertyCard } from '../property/PropertyCard';
import { PropertyCardSkeleton } from '../ui/Skeleton';
import { SectionHeader } from '../ui/SectionHeader';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { useInView } from '../../hooks';

// Mock data for development (replace with real API)
const MOCK_PROPERTIES = Array.from({ length: 6 }, (_, i) => ({
  _id: `prop-${i}`,
  title: ['Lodha Altamount', 'Prestige Leela', 'Godrej BKC', 'DLF The Crest', 'Oberoi Exquisite', 'Hiranandani Fortune'][i],
  slug: ['lodha-altamount', 'prestige-leela', 'godrej-bkc', 'dlf-the-crest', 'oberoi-exquisite', 'hiranandani-fortune'][i],
  description: 'Ultra-luxury residences with panoramic city views and world-class amenities.',
  price: [45000000, 32000000, 28000000, 55000000, 38000000, 22000000][i],
  priceUnit: 'total' as const,
  type: ['luxury', 'apartment', 'apartment', 'luxury', 'villa', 'apartment'][i] as import('../../types').PropertyType,
  status: 'available' as const,
  bedrooms: [4, 3, 2, 5, 4, 3][i],
  bathrooms: [4, 3, 2, 5, 4, 3][i],
  area: [3200, 1850, 1200, 4500, 3800, 1650][i],
  areaUnit: 'sqft' as const,
  possession: ['Ready to Move', 'Dec 2025', 'Mar 2026', 'Ready to Move', 'Jun 2025', 'Sep 2025'][i],
  location: {
    address: ['Altamount Road', 'Whitefield', 'BKC', 'DLF Phase 5', 'Goregaon East', 'Powai'][i],
    city: ['Mumbai', 'Bangalore', 'Mumbai', 'Gurgaon', 'Mumbai', 'Mumbai'][i],
    state: 'Maharashtra',
    pincode: '400026',
    lat: 19.0760,
    lng: 72.8777,
  },
  builder: {
    _id: `builder-${i}`,
    name: ['Lodha', 'Prestige', 'Godrej', 'DLF', 'Oberoi', 'Hiranandani'][i],
    slug: 'lodha',
    logo: '',
    description: '',
    established: 1995,
    totalProjects: 50,
    deliveredProjects: 40,
    rating: 4.8,
    isVerified: true,
  },
  images: [{
    url: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    ][i],
    publicId: '',
    alt: 'Property',
    isPrimary: true,
  }],
  amenities: ['Pool', 'Gym', 'Clubhouse'],
  highlights: [],
  isFeatured: true,
  isNew: i < 2,
  isVerified: true,
  views: 1200 + i * 300,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const FeaturedProperties: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, isLoading } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertyService.getFeatured(),
    staleTime: 5 * 60 * 1000,
  });

  const properties = data?.data?.data || MOCK_PROPERTIES;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeader
          tag="Handpicked for You"
          title="Featured"
          titleHighlight="Properties"
          subtitle="Explore our curated selection of premium properties from India's most prestigious locations."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <PropertyCardSkeleton />
                </motion.div>
              ))
            : properties.map(property => (
                <motion.div key={property._id} variants={staggerItem}>
                  <PropertyCard property={property} />
                </motion.div>
              ))
          }
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/properties" className="btn-secondary inline-flex items-center gap-2">
            View All Properties <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
