import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { SectionHeader } from '../ui/SectionHeader';
import { staggerContainer, staggerItem } from '../../animations/variants';

const CATEGORIES = [
  {
    type: 'apartment',
    label: 'Apartments',
    count: '120+ Properties',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
    description: 'Modern urban living',
  },
  {
    type: 'villa',
    label: 'Villas',
    count: '45+ Properties',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500',
    description: 'Spacious private retreats',
  },
  {
    type: 'luxury',
    label: 'Luxury Homes',
    count: '30+ Properties',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500',
    description: 'Ultra-premium residences',
  },
  {
    type: 'commercial',
    label: 'Commercial',
    count: '60+ Properties',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500',
    description: 'Prime business spaces',
  },
  {
    type: 'plot',
    label: 'Plots',
    count: '80+ Properties',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500',
    description: 'Build your vision',
  },
];

export const PropertyCategories: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          tag="Browse by Category"
          title="Explore Property"
          titleHighlight="Types"
          subtitle="From cozy apartments to sprawling villas — find the perfect property type for your lifestyle."
          light
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {CATEGORIES.map(cat => (
            <motion.div key={cat.type} variants={staggerItem}>
              <Link
                to={`/properties?type=${cat.type}`}
                className="group relative block rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading font-bold text-white text-lg leading-tight">{cat.label}</h3>
                  <p className="text-secondary text-xs mt-1">{cat.count}</p>
                  <p className="text-white/60 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-secondary/30">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
