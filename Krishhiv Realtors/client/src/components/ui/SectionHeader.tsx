import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { staggerContainer, staggerItem } from '../../animations/variants';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag, title, titleHighlight, subtitle, centered = true, light = false,
}) => {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`mb-14 ${centered ? 'text-center' : ''}`}
    >
      {tag && (
        <motion.div variants={staggerItem} className="section-tag justify-center">
          <span className="w-8 h-px bg-secondary" />
          {tag}
          <span className="w-8 h-px bg-secondary" />
        </motion.div>
      )}
      <motion.h2
        variants={staggerItem}
        className={`section-title ${light ? 'text-white' : 'text-primary'}`}
      >
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient-gold">{titleHighlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className={`section-subtitle ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-textMuted'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
