import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { FaBuilding, FaHandsHelping, FaHandshake, FaHandHoldingUsd } from 'react-icons/fa';
import { SectionHeader } from '../ui/SectionHeader';

const CUSTOM_FEATURES = [
  {
    icon: <FaBuilding size={32} />,
    title: 'Dream Merchant',
    description: '',
    offset: 'md:mt-0',
  },
  {
    icon: <FaHandsHelping size={36} />,
    title: '24x7 Assistance',
    description: "Our commitment to exceptional service extends beyond business hours. We understand that your needs don't adhere to a strict schedule, which is why we offer 24/7 support. Experience the convenience of round-the-clock assistance as our dedicated team is always ready to assist you.",
    offset: 'md:mt-16',
  },
  {
    icon: <FaHandshake size={36} />,
    title: 'Homeownership, simplified',
    description: "We provide End to End support. Your homeownership journey, simplified. From property selection and financing to interior design, we offer a seamless and comprehensive experience. Let us transform your dream home vision into reality.",
    offset: 'md:mt-8',
  },
  {
    icon: <FaHandHoldingUsd size={36} />,
    title: 'Financing Made Easy',
    description: "With in-depth knowledge of the market and a commitment to your financial well-being, we guide you through a seamless process to secure the best possible home loan terms. Let us handle the financial intricacies while you focus on creating your ideal living space.",
    offset: 'md:mt-24',
  },
];

export const WhyChooseUs: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeader
          tag="Our Advantage"
          title="Why Buy"
          titleHighlight="from Us"
          subtitle="We are the best option to buy your dream house from, offering unparalleled service and luxury."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-12"
        >
          {CUSTOM_FEATURES.map((item, i) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`group flex-1 flex flex-col items-center p-8 bg-surface rounded-2xl shadow-card hover:shadow-luxury border border-primary/5 transition-all duration-300 ${item.offset}`}
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md bg-gradient-gold text-primary group-hover:scale-110 group-hover:animate-float transition-all duration-500"
              >
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-primary text-center mb-4 leading-tight group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-textMuted text-sm text-center leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
