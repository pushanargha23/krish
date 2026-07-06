import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import { useInView } from '../../hooks';
import { APP_PHONE, APP_WHATSAPP } from '../../constants';
import { getWhatsAppLink } from '../../utils';
import { fadeUp } from '../../animations/variants';
import { FaWhatsapp } from 'react-icons/fa';

export const ContactCTA: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative bg-gradient-luxury rounded-3xl overflow-hidden p-12 md:p-16 text-center"
        >
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-noise opacity-20" />

          <div className="relative z-10">
            <div className="section-tag justify-center mb-4">
              <span className="w-8 h-px bg-secondary" />
              Let's Connect
              <span className="w-8 h-px bg-secondary" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Find Your{' '}
              <span className="text-gradient-gold italic">Perfect Home?</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Our expert consultants are ready to guide you through every step of your real estate journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Schedule Consultation <FiArrowRight size={16} />
              </Link>
              <a
                href={getWhatsAppLink(APP_WHATSAPP, 'Hi! I\'d like to schedule a property consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20b858] transition-all"
              >
                <FaWhatsapp size={18} /> WhatsApp Us
              </a>
              <a
                href={`tel:${APP_PHONE}`}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-secondary hover:text-secondary transition-all"
              >
                <FiPhone size={16} /> {APP_PHONE}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
