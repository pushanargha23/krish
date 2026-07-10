import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';
import { LeadCapturePopup } from '../components/shared/LeadCapturePopup';
import { pageTransition } from '../animations/variants';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          {...(pageTransition as any)}
          className="flex-1 bg-background"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <LeadCapturePopup />
    </div>
  );
};
