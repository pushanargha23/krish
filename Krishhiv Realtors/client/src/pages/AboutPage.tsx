import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { SectionHeader } from '../components/ui/SectionHeader';
import { staggerContainer, staggerItem, fadeLeft, fadeRight } from '../animations/variants';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const TIMELINE = [
  { year: '2009', title: 'Founded', desc: 'Krisshiv Realtors established in Mumbai with a vision to redefine luxury real estate.' },
  { year: '2012', title: 'Pan-India Expansion', desc: 'Expanded to Bangalore, Delhi, and Hyderabad with dedicated city offices.' },
  { year: '2015', title: '500 Properties Sold', desc: 'Crossed the milestone of 500 successful property transactions.' },
  { year: '2018', title: 'Digital Transformation', desc: 'Launched India\'s first AI-powered luxury property recommendation platform.' },
  { year: '2021', title: 'NRI Desk Launch', desc: 'Dedicated NRI investment desk serving clients across 30+ countries.' },
  { year: '2024', title: '2000+ Happy Families', desc: 'Celebrated 2000+ successful property handovers across India.' },
];

const AboutPage: React.FC = () => {
  const { ref: timelineRef, inView: timelineInView } = useInView();
  const { ref: teamRef, inView: teamInView } = useInView();

  return (
    <>
      <Helmet>
        <title>About Us — Krisshiv Realtors</title>
        <meta name="description" content="Learn about Krisshiv Realtors — India's premier luxury real estate consultancy with 15+ years of excellence." />
      </Helmet>

      {/* Hero */}
      <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <div className="section-tag justify-center mb-4">
            <span className="w-8 h-px bg-secondary" />Our Story<span className="w-8 h-px bg-secondary" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5">
            Where <span className="text-gradient-gold italic">Luxury</span> Meets Legacy
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            For over 15 years, we've been India's most trusted partner for luxury real estate — connecting discerning buyers with exceptional properties.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 bg-primary rounded-2xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              <div className="text-secondary text-4xl mb-4 font-heading italic">Mission</div>
              <p className="text-white/80 leading-relaxed">
                To democratize access to premium real estate by providing transparent, expert-driven guidance that empowers every client to make confident investment decisions.
              </p>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 bg-surface rounded-2xl border border-gray-100 shadow-card relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
              <div className="text-secondary text-4xl mb-4 font-heading italic">Vision</div>
              <p className="text-textMuted leading-relaxed">
                To be the most respected luxury real estate brand in India — known for integrity, innovation, and an unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10">
          <SectionHeader tag="Our Journey" title="15 Years of" titleHighlight="Excellence" light />
          <motion.div
            ref={timelineRef}
            variants={staggerContainer}
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-secondary/30 hidden md:block" />
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                variants={staggerItem}
                className={`flex items-center gap-8 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass rounded-xl p-5 inline-block text-left">
                    <div className="text-secondary font-bold text-lg mb-1">{item.year}</div>
                    <div className="text-white font-semibold mb-1">{item.title}</div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 bg-secondary rounded-full border-4 border-primary flex-shrink-0 z-10" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Subtle decorative elements for the background */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container-custom flex justify-center relative z-10">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-2xl p-10 md:p-16 rounded-[2rem] overflow-hidden bg-surface shadow-luxury border border-white/5"
          >
            {/* Background "CEO" text */}
            <div className="absolute top-8 right-8 text-[7rem] md:text-[9rem] font-black tracking-tighter text-primary/5 select-none pointer-events-none leading-none">
              CEO
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center mt-4">
              {/* Image with concentric borders */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Rotating dashed ring */}
                <div className="absolute inset-[-20px] border-[1.5px] border-dashed border-secondary/40 rounded-[30px] animate-[spin_30s_linear_infinite]" />
                
                {/* Inner image container */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-secondary p-1.5 bg-surface">
                  <img 
                    src="/Akash-Mondal-scaled.jpg" 
                    alt="Akash Mondal" 
                    className="w-full h-full object-cover rounded-2xl bg-primary/10"
                  />
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-primary">
                Akash Mondal
              </h2>
              
              <div className="px-6 py-2 rounded-full font-bold text-sm tracking-wider mb-10 bg-gradient-gold text-primary shadow-lg">
                CEO
              </div>

              <p className="max-w-md mx-auto text-[15px] md:text-base leading-relaxed mb-12 text-textMuted">
                Leading the vision, strategy, and growth of the company while empowering businesses through innovation and artificial intelligence.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-5">
                <a href="mailto:akash@krisshivrealtors.com" className="w-14 h-14 rounded-2xl border border-secondary/30 flex items-center justify-center hover:bg-secondary/10 transition-colors text-secondary hover:shadow-[0_0_15px_rgba(var(--secondary),0.3)]">
                  <FiMail size={22} />
                </a>
                <a href="https://www.linkedin.com/in/akash-mondal-4984382aa/" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl border border-secondary/30 flex items-center justify-center hover:bg-secondary/10 transition-colors text-secondary hover:shadow-[0_0_15px_rgba(var(--secondary),0.3)]">
                  <FiLinkedin size={22} />
                </a>
                <a href="https://wa.me/917003215308" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl border border-secondary/30 flex items-center justify-center hover:bg-secondary/10 transition-colors text-secondary hover:shadow-[0_0_15px_rgba(var(--secondary),0.3)]">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
