import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { useCounter, useInView } from '../../hooks';
import { STATS, CITIES, PROPERTY_TYPES } from '../../constants';
import { staggerContainer, staggerItem, fadeUp } from '../../animations/variants';

// Animated stat counter
const StatItem: React.FC<{ value: number; suffix: string; label: string; start: boolean }> = ({
  value, suffix, label, start,
}) => {
  const count = useCounter(value, 2000, start);
  return (
    <div className="text-center">
      <div className="font-heading text-3xl lg:text-4xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('apartment');
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const { ref, inView } = useInView(0.3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (city) params.set('city', city);
    if (searchType) params.set('type', searchType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video / Gradient */}
      <div className="absolute inset-0 bg-gradient-luxury">
        <div className="absolute inset-0 bg-noise opacity-30" />
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.28) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center pt-32 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Tag */}
          <motion.div variants={staggerItem} className="section-tag justify-center mb-6">
            <span className="w-8 h-px bg-secondary" />
            India's Premier Luxury Real Estate
            <span className="w-8 h-px bg-secondary" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={staggerItem}
            className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6"
          >
            Find Your{' '}
            <span className="text-gradient-gold italic">Dream</span>
            <br />
            Property Today
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Discover exclusive luxury homes, premium apartments, and investment properties
            curated by India's most trusted real estate experts.
          </motion.p>

          {/* Search Box */}
          <motion.div variants={staggerItem}>
            <form
              onSubmit={handleSearch}
              className="glass rounded-2xl p-2 max-w-4xl mx-auto shadow-luxury"
            >
              {/* Type Tabs */}
              <div className="flex gap-1 mb-3 px-2 pt-2 overflow-x-auto scrollbar-hide">
                {PROPERTY_TYPES.slice(0, 5).map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSearchType(type.value)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      searchType === type.value
                        ? 'bg-secondary text-primary'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                {/* Location */}
                <div className="relative flex-1">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-secondary appearance-none text-sm"
                  >
                    <option value="" className="text-primary">Select City</option>
                    {CITIES.map(c => (
                      <option key={c} value={c} className="text-primary">{c}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                </div>

                {/* Search Input */}
                <div className="relative flex-[2]">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by project, location, or builder..."
                    className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-secondary text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-gold text-primary font-bold rounded-xl hover:shadow-gold transition-all whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3 mt-6">
            {['Ready to Move', 'Under ₹1 Cr', 'New Launch', '3 BHK', 'Luxury Villas'].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/properties?search=${tag}`)}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 rounded-full text-xs hover:bg-secondary/20 hover:text-secondary hover:border-secondary/40 transition-all"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {STATS.map(stat => (
            <StatItem key={stat.label} {...stat} start={inView} />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};
