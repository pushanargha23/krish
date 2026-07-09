import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiMaximize2, FiDroplet, FiMapPin, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Property } from '../../types';
import { formatPrice, formatArea } from '../../utils';
import { cardHover, imageZoom } from '../../animations/variants';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'horizontal';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, variant = 'default' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const primaryImage = property.images.find(i => i.isPrimary) || property.images[0];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = `${property.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_image.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
        // Fallback for CORS issues
        window.open(url, '_blank');
      });
  };

  if (variant === 'horizontal') {
    return (
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="property-card flex overflow-hidden shadow-2xl hover:shadow-luxury rounded-2xl transition-shadow duration-300 bg-white"
      >
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <motion.img
            variants={imageZoom}
            src={primaryImage?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'}
            alt={property.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <span className="badge-gold text-xs mb-2">{property.type}</span>
            <h3 className="font-heading font-semibold text-primary text-base line-clamp-1">{property.title}</h3>
            <p className="text-textMuted text-xs flex items-center gap-1 mt-1">
              <FiMapPin size={11} /> {property.location.city}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-heading font-bold text-primary text-lg">{formatPrice(property.price)}</span>
            <div className="flex gap-3 text-xs text-textMuted">
              <span className="flex items-center gap-1">🛏️ {property.bedrooms}</span>
              <span className="flex items-center gap-1"><FiMaximize2 size={12} /> {formatArea(property.area)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="property-card group shadow-2xl hover:shadow-luxury rounded-2xl transition-shadow duration-300 bg-white"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56 group/carousel">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && <div className="absolute inset-0 skeleton" />}

        {/* Carousel Controls */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-sm z-10"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-sm z-10"
            >
              <FiChevronRight size={18} />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {property.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isNew && <span className="badge bg-secondary text-primary text-[10px] font-bold">NEW</span>}
          {property.isFeatured && <span className="badge bg-accent text-primary text-[10px] font-bold">FEATURED</span>}
          <span className="badge-primary text-[10px] capitalize">{property.type}</span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleDownload(e, primaryImage?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600')}
            className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all bg-white/80 text-textPrimary hover:bg-primary hover:text-white"
            title="Download Photo"
          >
            <FiDownload size={14} />
          </motion.button>
        </div>

        {/* Quick View */}
        <Link
          to={`/properties/${property.slug}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 bg-surface text-primary text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
        >
          <FiEye size={13} /> Quick View
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/properties/${property.slug}`}>
            <h3 className="font-heading font-semibold text-primary text-lg leading-tight hover:text-secondary transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          {property.isVerified && (
            <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-[10px]">✓</span>
          )}
        </div>

        <p className="text-textMuted text-sm flex items-center gap-1.5 mb-4">
          <FiMapPin size={13} className="text-secondary flex-shrink-0" />
          {property.location.address}, {property.location.city}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-textMuted border-t border-gray-100 pt-4 mb-4">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              🛏️ {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <FiDroplet size={14} className="text-secondary" /> {property.bathrooms} Baths
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <FiMaximize2 size={14} className="text-secondary" /> {formatArea(property.area)}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading font-bold text-primary text-xl">{formatPrice(property.price)}</div>
            <div className="text-textMuted text-xs">{property.possession}</div>
          </div>
          <Link
            to={`/properties/${property.slug}`}
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-secondary hover:text-primary transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
