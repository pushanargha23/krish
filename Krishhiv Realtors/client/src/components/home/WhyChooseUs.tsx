import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiStar, FiHeadphones, FiTrendingUp, FiKey, FiGlobe } from 'react-icons/fi';
import { useInView } from '../../hooks';
import { SectionHeader } from '../ui/SectionHeader';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { WHY_CHOOSE_US } from '../../constants';

const ICONS: Record<string, React.ReactNode> = {
  shield: <FiShield size={28} />,
  star: <FiStar size={28} />,
  headset: <FiHeadphones size={28} />,
  chart: <FiTrendingUp size={28} />,
  key: <FiKey size={28} />,
  globe: <FiGlobe size={28} />,
};

export const WhyChooseUs: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeader
          tag="Our Advantage"
          title="Why Choose"
          titleHighlight="Krishhiv Realtors"
          subtitle="We combine deep market expertise with personalized service to deliver an unmatched real estate experience."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group p-8 bg-surface rounded-xl border border-gray-100 shadow-card hover:shadow-luxury hover:border-secondary/30 transition-all duration-400 cursor-default"
            >
              <div className="w-14 h-14 bg-primary/5 group-hover:bg-gradient-gold rounded-xl flex items-center justify-center text-primary group-hover:text-primary transition-all duration-300 mb-5">
                {ICONS[item.icon]}
              </div>
              <h3 className="font-heading font-semibold text-primary text-xl mb-3">{item.title}</h3>
              <p className="text-textMuted text-sm leading-relaxed">{item.description}</p>
              <div className="mt-5 w-8 h-0.5 bg-secondary/30 group-hover:w-16 group-hover:bg-secondary transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
