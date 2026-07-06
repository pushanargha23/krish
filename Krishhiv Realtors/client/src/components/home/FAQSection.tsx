import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useInView } from '../../hooks';
import { SectionHeader } from '../ui/SectionHeader';
import { staggerContainer, staggerItem } from '../../animations/variants';

const FAQS = [
  {
    q: 'How do I schedule a property visit?',
    a: 'You can schedule a visit directly from any property page by clicking "Schedule Visit". Our team will confirm within 2 hours and arrange a convenient time for you.',
  },
  {
    q: 'Are all properties RERA registered?',
    a: 'Yes, every property listed on our platform is RERA registered and legally verified by our in-house legal team. You can find the RERA number on each property page.',
  },
  {
    q: 'Do you assist NRI buyers?',
    a: 'Absolutely. We have a dedicated NRI desk that handles everything from virtual tours and documentation to FEMA compliance and repatriation of funds.',
  },
  {
    q: 'What is your brokerage fee?',
    a: 'Our brokerage is transparent and competitive. For residential properties, we charge 1-2% of the property value. We\'ll discuss this upfront before any commitment.',
  },
  {
    q: 'Can you help with home loans?',
    a: 'Yes, we have partnerships with 15+ leading banks and NBFCs. Our finance team will help you get the best interest rates and process your loan application end-to-end.',
  },
  {
    q: 'How do I compare multiple properties?',
    a: 'Use the "Compare" feature on any property card. You can compare up to 4 properties side-by-side across all key parameters including price, amenities, and location.',
  },
];

export const FAQSection: React.FC = () => {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeader
          tag="Got Questions?"
          title="Frequently Asked"
          titleHighlight="Questions"
          subtitle="Everything you need to know about buying, selling, and investing in real estate with us."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto space-y-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-primary pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open === i ? 'bg-secondary text-primary' : 'bg-gray-100 text-textMuted'}`}>
                  {open === i ? <FiMinus size={14} /> : <FiPlus size={14} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-6 pb-5 text-textMuted text-sm leading-relaxed border-t border-gray-50 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
