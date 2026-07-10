import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

const NotFoundPage: React.FC = () => (
  <>
    <Helmet><title>404 — Page Not Found | Krisshiv Realtors</title></Helmet>
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4"
      >
        <div className="font-heading text-[180px] font-bold text-white/5 leading-none select-none">404</div>
        <div className="-mt-16">
          <h1 className="font-heading text-5xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/properties" className="btn-secondary">Browse Properties</Link>
          </div>
        </div>
      </motion.div>
    </div>
  </>
);

export default NotFoundPage;
