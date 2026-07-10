import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  FiDroplet, FiMaximize2, FiMapPin, FiHeart, FiShare2,
  FiPhone, FiCalendar, FiDownload, FiCheck, FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Property } from '../types';
import { propertyService, appointmentService } from '../api/services';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, formatArea, calculateEMI, getWhatsAppLink, shareProperty } from '../utils';
import { APP_WHATSAPP } from '../constants';
import { FloatingInput } from '../components/shared/FloatingInput';
import { FloatingSelect } from '../components/shared/FloatingSelect';

import FacilityIcon from '../components/property/FacilityIcon';

// EMI Calculator Component
const EMICalculator: React.FC<{ price: number }> = ({ price }) => {
  const [principal, setPrincipal] = useState(Math.round(price * 0.8));
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const result = calculateEMI(principal, rate, tenure);

  return (
    <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-6">
      <h3 className="font-heading font-semibold text-primary text-lg mb-5">EMI Calculator</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-textMuted">Loan Amount</span>
            <span className="font-medium text-primary">{formatPrice(principal)}</span>
          </div>
          <input type="range" min={1000000} max={price} step={100000} value={principal}
            onChange={e => setPrincipal(+e.target.value)}
            className="w-full accent-secondary" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-textMuted">Interest Rate</span>
            <span className="font-medium text-primary">{rate}%</span>
          </div>
          <input type="range" min={6} max={15} step={0.1} value={rate}
            onChange={e => setRate(+e.target.value)}
            className="w-full accent-secondary" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-textMuted">Tenure</span>
            <span className="font-medium text-primary">{tenure} Years</span>
          </div>
          <input type="range" min={5} max={30} step={1} value={tenure}
            onChange={e => setTenure(+e.target.value)}
            className="w-full accent-secondary" />
        </div>
      </div>
      <div className="mt-5 p-4 bg-primary/5 rounded-xl">
        <div className="text-center">
          <div className="text-textMuted text-xs mb-1">Monthly EMI</div>
          <div className="font-heading font-bold text-primary text-3xl">{formatPrice(result.emi)}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div className="text-center p-2 bg-surface rounded-lg">
            <div className="text-textMuted">Principal</div>
            <div className="font-semibold text-primary">{formatPrice(result.principal)}</div>
          </div>
          <div className="text-center p-2 bg-surface rounded-lg">
            <div className="text-textMuted">Total Interest</div>
            <div className="font-semibold text-secondary">{formatPrice(result.totalInterest)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Visit Form
const ScheduleVisit: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    await appointmentService.book({ ...data, propertyId, type: 'site_visit' } as Parameters<typeof appointmentService.book>[0]);
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FiCheck size={24} className="text-green-600" />
        </div>
        <h4 className="font-semibold text-green-800 mb-1">Visit Scheduled!</h4>
        <p className="text-green-600 text-sm">Our team will confirm your appointment within 2 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-gray-100 shadow-luxury p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <h3 className="font-heading font-semibold text-primary text-xl mb-6 flex items-center gap-2 relative z-10">
        <FiCalendar size={20} className="text-secondary" /> Schedule a Visit
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <FloatingInput 
          label="Your Name" 
          registration={register('name', { required: true })} 
        />
        <FloatingInput 
          label="Email Address" 
          type="email"
          registration={register('email', { required: true })} 
        />
        <FloatingInput 
          label="Phone Number" 
          registration={register('phone', { required: true })} 
        />
        <div className="grid grid-cols-2 gap-4">
          <FloatingInput 
            label="Date"
            type="date" 
            min={new Date().toISOString().split('T')[0]} 
            registration={register('date', { required: true })} 
          />
          <FloatingSelect 
            label="Time"
            registration={register('time')} 
            options={['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(t => ({ value: t, label: t }))}
          />
        </div>
        <div className="pt-2">
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? 'Booking...' : 'Book Site Visit'}
              {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-white/20 to-secondary/0 -translate-x-full group-hover:animate-shimmer" />
          </button>
        </div>
      </form>
    </div>
  );
};

const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toggle, isWishlisted } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);

  const { data } = useQuery({
    queryKey: ['property', slug],
    queryFn: () => propertyService.getBySlug(slug!),
    enabled: !!slug,
  });

  // Mock property for development
  const property: Property = (data?.data?.data || {
    _id: 'mock-1',
    title: 'Lodha Altamount — Ultra Luxury Residences',
    slug: slug || 'lodha-altamount',
    description: `Lodha Altamount redefines luxury living in Mumbai. Perched atop Altamount Road — one of the world's most expensive streets — these ultra-luxury residences offer panoramic views of the Arabian Sea and the city skyline.

Each residence is a masterpiece of design, featuring Italian marble flooring, Gaggenau appliances, and bespoke interiors by world-renowned designers. The building offers an unparalleled suite of amenities including a rooftop infinity pool, private cinema, wine cellar, and 24-hour concierge service.`,
    price: 450000000,
    priceUnit: 'total' as const,
    type: 'luxury' as const,
    status: 'available' as const,
    bedrooms: 4,
    bathrooms: 5,
    area: 6500,
    areaUnit: 'sqft' as const,
    floor: 32,
    totalFloors: 40,
    facing: 'Sea Facing',
    furnishing: 'fully-furnished' as const,
    possession: 'Ready to Move',
    location: {
      address: 'Altamount Road, Cumballa Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      landmark: 'Near Kemp\'s Corner',
      lat: 18.9647,
      lng: 72.8076,
    },
    builder: { _id: 'b1', name: 'Lodha Group', slug: 'lodha', logo: '', description: '', established: 1980, totalProjects: 80, deliveredProjects: 65, rating: 4.9, isVerified: true },
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', publicId: '', alt: 'Living Room', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', publicId: '', alt: 'Exterior', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', publicId: '', alt: 'Kitchen', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200', publicId: '', alt: 'Bedroom', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200', publicId: '', alt: 'Bathroom', isPrimary: false },
    ],
    amenities: ['Infinity Pool', 'Private Gym', 'Concierge 24/7', 'Valet Parking', 'Private Cinema', 'Wine Cellar', 'Rooftop Lounge', 'Spa & Wellness', 'Smart Home', 'EV Charging', 'Helipad', 'Business Center'],
    highlights: ['Sea Facing', 'RERA Registered', 'Vastu Compliant', 'Green Building', 'Pet Friendly'],
    rera: 'P51900012345',
    isFeatured: true,
    isNew: false,
    isVerified: true,
    views: 8500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Property);

  const wishlisted = isWishlisted(property._id);

  const prevImage = () => setActiveImage(i => (i - 1 + property.images.length) % property.images.length);
  const nextImage = () => setActiveImage(i => (i + 1) % property.images.length);

  return (
    <>
      <Helmet>
        <title>{property.title} — Krisshiv Realtors</title>
        <meta name="description" content={property.description.slice(0, 160)} />
        <meta property="og:title" content={property.title} />
        <meta property="og:image" content={property.images[0]?.url} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-primary pt-24 pb-6">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-secondary transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
              <div className="relative h-[400px] md:h-[520px]">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={property.images[activeImage]?.url}
                  alt={property.images[activeImage]?.alt}
                  className="w-full h-full object-cover"
                />
                {/* Nav Arrows */}
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-surface transition-all shadow-md">
                  <FiChevronLeft size={18} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-surface transition-all shadow-md">
                  <FiChevronRight size={18} />
                </button>
                {/* Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                  {activeImage + 1} / {property.images.length}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 p-3 bg-surface overflow-x-auto no-scrollbar">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-secondary' : 'border-transparent'}`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Actions */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge-gold capitalize">{property.type}</span>
                    <span className="badge-primary">{property.status.replace('_', ' ')}</span>
                    {property.isVerified && <span className="badge bg-green-100 text-green-700 border border-green-200">✓ Verified</span>}
                    {property.rera && <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">RERA: {property.rera}</span>}
                  </div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary leading-tight">{property.title}</h1>
                  <p className="text-textMuted flex items-center gap-1.5 mt-2">
                    <FiMapPin size={15} className="text-secondary" />
                    {property.location.address}, {property.location.city} — {property.location.pincode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggle(property._id)}
                    className={`p-3 rounded-xl border transition-all ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-textMuted hover:border-red-200 hover:text-red-500'}`}
                  >
                    <FiHeart size={18} style={{ fill: wishlisted ? 'currentColor' : 'none' }} />
                  </button>
                  <button
                    onClick={() => shareProperty(property.title, window.location.href)}
                    className="p-3 rounded-xl border border-gray-200 text-textMuted hover:border-secondary hover:text-secondary transition-all"
                  >
                    <FiShare2 size={18} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end gap-3">
                <div className="font-heading font-bold text-primary text-4xl">{formatPrice(property.price)}</div>
                <div className="text-textMuted text-sm mb-1">
                  ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sqft
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-6">
              <h2 className="font-heading font-semibold text-primary text-xl mb-5">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <span className="text-lg">🛏️</span>, label: 'Bedrooms', value: `${property.bedrooms} BHK` },
                  { icon: <FiDroplet size={20} />, label: 'Bathrooms', value: `${property.bathrooms} Baths` },
                  { icon: <FiMaximize2 size={20} />, label: 'Area', value: formatArea(property.area) },
                  { icon: <span className="text-lg">🏢</span>, label: 'Floor', value: `${property.floor}/${property.totalFloors}` },
                  { icon: <span className="text-lg">🧭</span>, label: 'Facing', value: property.facing || 'N/A' },
                  { icon: <span className="text-lg">🛋️</span>, label: 'Furnishing', value: property.furnishing?.replace('-', ' ') || 'N/A' },
                  { icon: <span className="text-lg">📅</span>, label: 'Possession', value: property.possession },
                  { icon: <span className="text-lg">🏗️</span>, label: 'Builder', value: property.builder.name },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-secondary">{item.icon}</div>
                    <div>
                      <div className="text-textMuted text-xs">{item.label}</div>
                      <div className="font-medium text-primary text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-6">
              <h2 className="font-heading font-semibold text-primary text-xl mb-4">About This Property</h2>
              <div className="text-textMuted text-sm leading-relaxed whitespace-pre-line">{property.description}</div>
            </div>

            {/* Highlights */}
            {property.highlights.length > 0 && (
              <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-6">
                <h2 className="font-heading font-semibold text-primary text-xl mb-4">Key Highlights</h2>
                <div className="flex flex-wrap gap-3">
                  {property.highlights.map(h => (
                    <span key={h} className="flex items-center gap-1.5 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20">
                      <FiCheck size={13} /> {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities / Available Facilities */}
            <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-6">
              <h2 className="font-heading font-semibold text-primary text-xl mb-6">Available Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4">
                {property.amenities.map(amenity => (
                  <FacilityIcon key={amenity} name={amenity} />
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator price={property.price} />
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-5">
            {/* Price Card */}
            <div className="bg-primary rounded-xl p-6 text-white sticky top-24">
              <div className="font-heading font-bold text-3xl mb-1">{formatPrice(property.price)}</div>
              <div className="text-white/60 text-sm mb-5">{property.possession} · {formatArea(property.area)}</div>

              <div className="space-y-3">
                <a
                  href={getWhatsAppLink(APP_WHATSAPP, `Hi! I'm interested in ${property.title}. Can you share more details?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20b858] transition-all"
                >
                  <FaWhatsapp size={18} /> WhatsApp Inquiry
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-gold text-primary font-semibold rounded-xl hover:shadow-gold transition-all"
                >
                  <FiPhone size={16} /> Call Now
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/20 text-white/80 font-medium rounded-xl hover:border-secondary hover:text-secondary transition-all text-sm">
                  <FiDownload size={15} /> Download Brochure
                </button>
              </div>

              {/* Agent */}
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-primary font-bold">A</div>
                <div>
                  <div className="text-white text-sm font-medium">Arjun Sharma</div>
                  <div className="text-white/50 text-xs">Senior Property Advisor</div>
                </div>
              </div>
            </div>

            {/* Schedule Visit */}
            <ScheduleVisit propertyId={property._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;
