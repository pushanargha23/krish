import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { TRUSTED_BUILDERS } from '../../constants';
import { staggerContainer, staggerItem } from '../../animations/variants';

export const TrustedBy: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="text-center text-textMuted text-sm tracking-widest uppercase mb-8">
            Trusted Partners & Developers
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {TRUSTED_BUILDERS.map(builder => (
              <div
                key={builder}
                className="font-heading font-bold text-gray-300 text-lg md:text-xl hover:text-secondary transition-colors duration-300 cursor-default"
              >
                {builder}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
