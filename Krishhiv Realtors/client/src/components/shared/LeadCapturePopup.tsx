import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { leadService } from '../../api/services';
import { FloatingInput } from './FloatingInput';

export const LeadCapturePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

  useEffect(() => {
    // Only show popup once per session
    const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');
    if (!hasSeenPopup) {
      // Wait 12 seconds before showing the popup
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenLeadPopup', 'true');
  };

  const onSubmit = async (data: any) => {
    await leadService.create({ ...data, source: 'Global Popup' });
    setHasSubmitted(true);
    setTimeout(() => {
      closePopup();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-surface rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-white/20"
          >
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-primary bg-white/50 hover:bg-white rounded-full backdrop-blur-md transition-all"
            >
              <FiX size={20} />
            </button>

            <div className="relative z-10 p-8 sm:p-10 text-center">
              {hasSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={40} className="text-green-600" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-primary mb-3">Thank You!</h3>
                  <p className="text-textMuted text-lg">Our luxury property expert will call you shortly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                    Exclusive Access
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
                    Looking for a Premium <br/><span className="text-gradient-gold italic">Property?</span>
                  </h3>
                  <p className="text-textMuted mb-8">
                    Drop your details below and our expert consultants will curate a personalized portfolio for you.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <FloatingInput 
                      label="Full Name" 
                      registration={register('name', { required: true })} 
                      icon={<FiUser size={18} />}
                      error={errors.name && 'Name is required'}
                    />
                    <FloatingInput 
                      label="Phone Number" 
                      registration={register('phone', { required: true })} 
                      icon={<FiPhone size={18} />}
                      error={errors.phone && 'Phone is required'}
                    />
                    <FloatingInput 
                      label="Email Address" 
                      type="email"
                      registration={register('email', { required: true })} 
                      icon={<FiMail size={18} />}
                      error={errors.email && 'Email is required'}
                    />
                    
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center group relative overflow-hidden mt-4 shadow-xl shadow-secondary/20">
                      <span className="relative z-10 flex items-center gap-2 py-1 text-lg">
                        {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                        {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-white/20 to-secondary/0 -translate-x-full group-hover:animate-shimmer" />
                    </button>
                  </form>
                  <p className="text-xs text-textLight mt-6">
                    We respect your privacy. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
