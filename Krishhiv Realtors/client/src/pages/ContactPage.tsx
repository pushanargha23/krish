import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactService } from '../api/services';
import { APP_PHONE, APP_EMAIL, APP_ADDRESS, APP_WHATSAPP } from '../constants';
import { getWhatsAppLink } from '../utils';
import { fadeLeft, fadeRight } from '../animations/variants';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const OFFICES = [
  { city: 'Mumbai (HQ)', address: '12th Floor, One BKC, Bandra Kurla Complex', phone: '+91 98765 43210', hours: 'Mon–Sat: 9AM–7PM' },
  { city: 'Bangalore', address: '5th Floor, Prestige Tech Park, Whitefield', phone: '+91 98765 43211', hours: 'Mon–Sat: 9AM–7PM' },
  { city: 'Delhi NCR', address: 'DLF Cyber City, Phase 2, Gurgaon', phone: '+91 98765 43212', hours: 'Mon–Sat: 9AM–7PM' },
];

const ContactPage: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful, errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    await contactService.send(data);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Krishhiv Realtors</title>
        <meta name="description" content="Get in touch with Krishhiv Realtors. Our expert consultants are ready to help you find your perfect property." />
      </Helmet>

      {/* Header */}
      <div className="bg-primary pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="section-tag justify-center mb-4">
            <span className="w-8 h-px bg-secondary" />Get In Touch<span className="w-8 h-px bg-secondary" />
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-4">
            Let's Start Your <span className="text-gradient-gold italic">Journey</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">Our expert consultants are available 6 days a week to guide you through your real estate journey.</p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
              {isSubmitSuccessful ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">We'll get back to you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input {...register('name', { required: 'Name is required' })} placeholder="Full Name" className="input-luxury" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register('phone', { required: 'Phone is required' })} placeholder="Phone Number" className="input-luxury" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input {...register('email', { required: 'Email is required' })} type="email" placeholder="Email Address" className="input-luxury" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <select {...register('subject')} className="input-luxury">
                    <option value="">Select Subject</option>
                    <option>Property Inquiry</option>
                    <option>Schedule a Visit</option>
                    <option>Investment Advisory</option>
                    <option>NRI Services</option>
                    <option>General Query</option>
                  </select>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="input-luxury resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-heading font-semibold text-lg mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a href={`tel:${APP_PHONE}`} className="flex items-center gap-3 hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiPhone size={16} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">Call Us</div>
                      <div className="font-medium">{APP_PHONE}</div>
                    </div>
                  </a>
                  <a href={`mailto:${APP_EMAIL}`} className="flex items-center gap-3 hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiMail size={16} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">Email Us</div>
                      <div className="font-medium">{APP_EMAIL}</div>
                    </div>
                  </a>
                  <a
                    href={getWhatsAppLink(APP_WHATSAPP, 'Hi! I\'d like to get in touch.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-secondary transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp size={16} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">WhatsApp</div>
                      <div className="font-medium">Chat with us instantly</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiClock size={16} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">Working Hours</div>
                      <div className="font-medium">Mon–Sat: 9AM – 7PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div className="space-y-3">
                {OFFICES.map(office => (
                  <div key={office.city} className="bg-surface rounded-xl border border-gray-100 shadow-card p-5">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <FiMapPin size={14} className="text-secondary" /> {office.city}
                    </h4>
                    <p className="text-textMuted text-sm">{office.address}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-textMuted">
                      <span>{office.phone}</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
