import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { SectionHeader } from '../components/ui/SectionHeader';
import { staggerContainer, staggerItem, fadeLeft, fadeRight } from '../animations/variants';

const TIMELINE = [
  { year: '2009', title: 'Founded', desc: 'Krishhiv Realtors established in Mumbai with a vision to redefine luxury real estate.' },
  { year: '2012', title: 'Pan-India Expansion', desc: 'Expanded to Bangalore, Delhi, and Hyderabad with dedicated city offices.' },
  { year: '2015', title: '500 Properties Sold', desc: 'Crossed the milestone of 500 successful property transactions.' },
  { year: '2018', title: 'Digital Transformation', desc: 'Launched India\'s first AI-powered luxury property recommendation platform.' },
  { year: '2021', title: 'NRI Desk Launch', desc: 'Dedicated NRI investment desk serving clients across 30+ countries.' },
  { year: '2024', title: '2000+ Happy Families', desc: 'Celebrated 2000+ successful property handovers across India.' },
];

const TEAM = [
  { name: 'Krishhiv Sharma', role: 'Founder & CEO', image: 'https://i.pravatar.cc/200?img=12', exp: '20+ Years' },
  { name: 'Priya Mehta', role: 'Head of Luxury Sales', image: 'https://i.pravatar.cc/200?img=5', exp: '15+ Years' },
  { name: 'Arjun Nair', role: 'Chief Investment Advisor', image: 'https://i.pravatar.cc/200?img=11', exp: '12+ Years' },
  { name: 'Deepa Krishnan', role: 'NRI Relations Head', image: 'https://i.pravatar.cc/200?img=9', exp: '10+ Years' },
];

const AboutPage: React.FC = () => {
  const { ref: timelineRef, inView: timelineInView } = useInView();
  const { ref: teamRef, inView: teamInView } = useInView();

  return (
    <>
      <Helmet>
        <title>About Us — Krishhiv Realtors</title>
        <meta name="description" content="Learn about Krishhiv Realtors — India's premier luxury real estate consultancy with 15+ years of excellence." />
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

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader tag="Our People" title="Meet the" titleHighlight="Leadership Team" />
          <motion.div
            ref={teamRef}
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TEAM.map(member => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-400 text-center"
              >
                <div className="relative overflow-hidden h-56">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-primary text-lg">{member.name}</h3>
                  <p className="text-secondary text-sm mt-1">{member.role}</p>
                  <p className="text-textMuted text-xs mt-1">{member.exp} Experience</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
