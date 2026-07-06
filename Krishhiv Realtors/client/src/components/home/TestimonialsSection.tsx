import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks';
import { SectionHeader } from '../ui/SectionHeader';
import { Rating } from '../ui/Rating';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TESTIMONIALS = [
  {
    _id: '1',
    name: 'Rahul Singhania',
    designation: 'CEO, TechVentures India',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    review: 'Krishhiv Realtors made our dream home a reality. Their team\'s expertise and dedication throughout the entire process was exceptional. We found our perfect 4BHK in Lodha Altamount within weeks.',
    propertyBought: 'Lodha Altamount, Mumbai',
    isVerified: true,
  },
  {
    _id: '2',
    name: 'Ananya Krishnamurthy',
    designation: 'Investment Banker',
    avatar: 'https://i.pravatar.cc/80?img=5',
    rating: 5,
    review: 'As an NRI investor, I was skeptical about buying property remotely. Krishhiv\'s team handled everything seamlessly — from virtual tours to documentation. Highly recommend!',
    propertyBought: 'Prestige Leela, Bangalore',
    isVerified: true,
  },
  {
    _id: '3',
    name: 'Vikram & Deepa Malhotra',
    designation: 'Business Owners',
    avatar: 'https://i.pravatar.cc/80?img=33',
    rating: 5,
    review: 'The level of personalization and attention to detail was remarkable. They understood exactly what we wanted and presented only the most relevant options. Truly a premium experience.',
    propertyBought: 'DLF The Crest, Gurgaon',
    isVerified: true,
  },
  {
    _id: '4',
    name: 'Priya Nambiar',
    designation: 'Doctor, Apollo Hospitals',
    avatar: 'https://i.pravatar.cc/80?img=9',
    rating: 5,
    review: 'From the first consultation to getting the keys, every step was smooth and transparent. The EMI calculator and investment advisory helped me make a confident decision.',
    propertyBought: 'Godrej BKC, Mumbai',
    isVerified: true,
  },
];

export const TestimonialsSection: React.FC = () => {
  const { ref, inView: _inView } = useInView();
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          tag="Client Stories"
          title="What Our Clients"
          titleHighlight="Say About Us"
          subtitle="Real experiences from real people who found their dream properties with us."
          light
        />

        <div ref={ref} className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                <Rating value={TESTIMONIALS[active].rating} size={20} />
              </div>
              <blockquote className="font-heading text-white text-xl md:text-2xl italic leading-relaxed mb-8">
                "{TESTIMONIALS[active].review}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={TESTIMONIALS[active].avatar}
                  alt={TESTIMONIALS[active].name}
                  className="w-14 h-14 rounded-full border-2 border-secondary object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-white">{TESTIMONIALS[active].name}</div>
                  <div className="text-secondary text-sm">{TESTIMONIALS[active].designation}</div>
                  {TESTIMONIALS[active].propertyBought && (
                    <div className="text-white/50 text-xs mt-0.5">Bought: {TESTIMONIALS[active].propertyBought}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary transition-all">
              <FiChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-secondary' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary transition-all">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
