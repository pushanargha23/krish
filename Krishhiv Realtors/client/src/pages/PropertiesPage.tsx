import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FiFilter, FiGrid, FiList, FiX, FiSliders, FiSearch } from 'react-icons/fi';
import { propertyService } from '../api/services';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/ui/Skeleton';
import type { PropertyFilters, PropertyType } from '../types';
import { PROPERTY_TYPES, PRICE_RANGES, BEDROOM_OPTIONS, SORT_OPTIONS, CITIES, POSSESSION_OPTIONS, AMENITIES_LIST } from '../constants';
import { useDebounce } from '../hooks';
import { staggerContainer, staggerItem } from '../animations/variants';

// Mock data reuse
const MOCK_PROPERTIES = Array.from({ length: 12 }, (_, i) => ({
  _id: `prop-${i}`,
  title: ['Lodha Altamount', 'Prestige Leela', 'Godrej BKC', 'DLF The Crest', 'Oberoi Exquisite', 'Hiranandani Fortune', 'Shapoorji Pallonji', 'Tata Housing', 'Brigade Utopia', 'Sobha Dream', 'Mahindra Happinest', 'Puravankara Purva'][i],
  slug: `property-${i}`,
  description: 'Premium residential property with world-class amenities.',
  price: [45000000, 32000000, 28000000, 55000000, 38000000, 22000000, 18000000, 25000000, 35000000, 42000000, 15000000, 29000000][i],
  priceUnit: 'total' as const,
  type: ['luxury', 'apartment', 'apartment', 'luxury', 'villa', 'apartment', 'apartment', 'villa', 'apartment', 'luxury', 'apartment', 'villa'][i] as PropertyType,
  status: 'available' as const,
  bedrooms: [4, 3, 2, 5, 4, 3, 2, 4, 3, 4, 2, 3][i],
  bathrooms: [4, 3, 2, 5, 4, 3, 2, 4, 3, 4, 2, 3][i],
  area: [3200, 1850, 1200, 4500, 3800, 1650, 1100, 2800, 1750, 3100, 950, 2200][i],
  areaUnit: 'sqft' as const,
  possession: ['Ready to Move', 'Dec 2025', 'Mar 2026', 'Ready to Move', 'Jun 2025', 'Sep 2025', 'Dec 2026', 'Ready to Move', 'Mar 2026', 'Jun 2026', 'Sep 2025', 'Dec 2025'][i],
  location: {
    address: 'Premium Location',
    city: ['Mumbai', 'Bangalore', 'Mumbai', 'Gurgaon', 'Mumbai', 'Mumbai', 'Pune', 'Chennai', 'Bangalore', 'Mumbai', 'Pune', 'Bangalore'][i],
    state: 'Maharashtra',
    pincode: '400001',
    lat: 19.0760,
    lng: 72.8777,
  },
  builder: { _id: `b-${i}`, name: ['Lodha', 'Prestige', 'Godrej', 'DLF', 'Oberoi', 'Hiranandani', 'Shapoorji', 'Tata', 'Brigade', 'Sobha', 'Mahindra', 'Puravankara'][i], slug: 'builder', logo: '', description: '', established: 1995, totalProjects: 50, deliveredProjects: 40, rating: 4.8, isVerified: true },
  images: [{ url: `https://images.unsplash.com/photo-${['1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c', '1512917774080-9991f1c4c750', '1613490493576-7fde63acd811', '1580587771525-78b9dba3b914', '1564013799919-ab600027ffc6', '1545324418-cc1a3fa10c00', '1560518883-ce09059eeffa', '1486325212027-8081e485255e', '1600607687939-ce8a6c25118c', '1558618666-fcd25c85cd64', '1600047509807-ba8f99d2cdde'][i]}?w=600`, publicId: '', alt: 'Property', isPrimary: true }],
  amenities: ['Pool', 'Gym', 'Clubhouse'],
  highlights: [],
  isFeatured: i < 3,
  isNew: i < 2,
  isVerified: true,
  views: 1000 + i * 200,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const FilterPanel: React.FC<{
  filters: PropertyFilters;
  onChange: (f: Partial<PropertyFilters>) => void;
  onReset: () => void;
}> = ({ filters, onChange, onReset }) => (
  <div className="space-y-6">
    {/* Search */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">Search</label>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
        <input
          value={filters.search || ''}
          onChange={e => onChange({ search: e.target.value })}
          placeholder="Project, location..."
          className="input-luxury pl-9 text-sm"
        />
      </div>
    </div>

    {/* City */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">City</label>
      <select value={filters.city || ''} onChange={e => onChange({ city: e.target.value })} className="input-luxury text-sm">
        <option value="">All Cities</option>
        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>

    {/* Property Type */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">Property Type</label>
      <div className="flex flex-wrap gap-2">
        {PROPERTY_TYPES.map(t => (
          <button
            key={t.value}
            onClick={() => onChange({ type: filters.type === t.value ? undefined : t.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              filters.type === t.value
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 text-textMuted hover:border-secondary hover:text-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">Price Range</label>
      <div className="space-y-2">
        {PRICE_RANGES.map(range => (
          <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice === range.min && filters.maxPrice === range.max}
              onChange={() => onChange({ minPrice: range.min, maxPrice: range.max === Infinity ? undefined : range.max })}
              className="accent-secondary"
            />
            <span className="text-sm text-textMuted group-hover:text-primary transition-colors">{range.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Bedrooms */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">Bedrooms</label>
      <div className="flex gap-2">
        {BEDROOM_OPTIONS.map(n => (
          <button
            key={n}
            onClick={() => onChange({ bedrooms: filters.bedrooms === n ? undefined : n })}
            className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
              filters.bedrooms === n
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 text-textMuted hover:border-secondary hover:text-secondary'
            }`}
          >
            {n}+
          </button>
        ))}
      </div>
    </div>

    {/* Possession */}
    <div>
      <label className="block text-sm font-medium text-primary mb-2">Possession</label>
      <select value={filters.possession || ''} onChange={e => onChange({ possession: e.target.value })} className="input-luxury text-sm">
        <option value="">Any</option>
        {POSSESSION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>

    {/* Reset */}
    <button onClick={onReset} className="w-full py-3 border border-gray-200 text-textMuted rounded-xl text-sm hover:border-red-300 hover:text-red-500 transition-all flex items-center justify-center gap-2">
      <FiX size={14} /> Reset Filters
    </button>
  </div>
);

const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<PropertyFilters>({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    type: (searchParams.get('type') as PropertyType) || undefined,
    sortBy: 'newest',
    page: 1,
    limit: 12,
  });

  const debouncedSearch = useDebounce(filters.search || '', 400);

  const updateFilters = useCallback((updates: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...updates, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ sortBy: 'newest', page: 1, limit: 12 });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['properties', { ...filters, search: debouncedSearch }],
    queryFn: () => propertyService.getAll({ ...filters, search: debouncedSearch }),
    staleTime: 2 * 60 * 1000,
  });

  const properties = data?.data?.data || MOCK_PROPERTIES;
  const total = data?.data?.pagination?.total || MOCK_PROPERTIES.length;

  return (
    <>
      <Helmet>
        <title>Properties — Krisshiv Realtors</title>
        <meta name="description" content="Browse premium residential and commercial properties across India's top cities." />
      </Helmet>

      {/* Page Header */}
      <div className="bg-primary pt-32 pb-12">
        <div className="container-custom">
          <div className="section-tag">
            <span className="w-8 h-px bg-secondary" />
            Explore Properties
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Find Your <span className="text-gradient-gold italic">Perfect Property</span>
          </h1>
          <p className="text-white/60 mt-3">{total} properties available across India</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-surface rounded-xl border border-gray-100 shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <FiSliders size={16} /> Filters
                </h3>
                <button onClick={resetFilters} className="text-xs text-textMuted hover:text-secondary transition-colors">
                  Reset All
                </button>
              </div>
              <FilterPanel filters={filters} onChange={updateFilters} onReset={resetFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-sm font-medium hover:border-secondary transition-all"
                >
                  <FiFilter size={15} /> Filters
                </button>
                <span className="text-textMuted text-sm">{total} results</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filters.sortBy}
                  onChange={e => updateFilters({ sortBy: e.target.value as PropertyFilters['sortBy'] })}
                  className="px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-secondary"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface text-textMuted hover:bg-background'}`}
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-surface text-textMuted hover:bg-background'}`}
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
              }
            >
              {isLoading
                ? Array.from({ length: 9 }).map((_, i) => (
                    <motion.div key={i} variants={staggerItem}>
                      <PropertyCardSkeleton />
                    </motion.div>
                  ))
                : properties.map(p => (
                    <motion.div key={p._id} variants={staggerItem}>
                      <PropertyCard property={p} variant={viewMode === 'list' ? 'horizontal' : 'default'} />
                    </motion.div>
                  ))
              }
            </motion.div>

            {/* Pagination */}
            {!isLoading && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: Math.ceil(total / 12) }, (_, i) => i + 1).slice(0, 5).map(page => (
                  <button
                    key={page}
                    onClick={() => updateFilters({ page })}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      filters.page === page
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-gray-200 text-textMuted hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-primary">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}><FiX size={20} /></button>
            </div>
            <FilterPanel filters={filters} onChange={updateFilters} onReset={resetFilters} />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesPage;
