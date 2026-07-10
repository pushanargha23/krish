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



export const FeaturedProperties: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, isLoading } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertyService.getFeatured(),
    staleTime: 5 * 60 * 1000,
  });

  const properties = data?.data?.data || [];
  
  // Sort by featuredLevel if available (1 is highest priority)
  let displayProperties = [...properties].sort((a, b) => {
    const scoreA = a.featuredLevel === 1 ? 2 : a.featuredLevel === 2 ? 1 : 0;
    const scoreB = b.featuredLevel === 1 ? 2 : b.featuredLevel === 2 ? 1 : 0;
    return scoreB - scoreA;
  });
  
  // Limit to top 5 at most
  displayProperties = displayProperties.slice(0, 5);

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-background">
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
            ? Array.from({ length: 3 }).map((_, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <PropertyCardSkeleton />
                </motion.div>
              ))
            : displayProperties.map((property) => (
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
