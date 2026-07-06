import React from 'react';
import { APP_WHATSAPP } from '../../constants';
import { getWhatsAppLink } from '../../utils';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => (
  <motion.a
    href={getWhatsAppLink(APP_WHATSAPP, 'Hi! I\'m interested in a property. Can you help me?')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
  >
    <FaWhatsapp size={28} className="text-white" />
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
  </motion.a>
);
