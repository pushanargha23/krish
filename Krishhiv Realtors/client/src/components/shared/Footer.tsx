import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiLinkedin, FiYoutube, FiTwitter, FiPhone, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { APP_NAME, APP_PHONE, APP_EMAIL, APP_ADDRESS, SOCIAL_LINKS } from '../../constants';
import { newsletterService } from '../../api/services';

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'Developers', to: '/developers' },
    { label: 'Services', to: '/services' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  'Property Types': [
    { label: 'Apartments', to: '/properties?type=apartment' },
    { label: 'Villas', to: '/properties?type=villa' },
    { label: 'Luxury Homes', to: '/properties?type=luxury' },
    { label: 'Commercial', to: '/properties?type=commercial' },
    { label: 'Plots', to: '/properties?type=plot' },
    { label: 'Penthouses', to: '/properties?type=penthouse' },
  ],
  'Resources': [
    { label: 'Blog', to: '/blog' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'Careers', to: '/careers' },
    { label: 'FAQ', to: '/faq' },
    { label: 'EMI Calculator', to: '/properties#emi' },
  ],
};

const SOCIAL_ICONS = [
  { icon: FiInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FiFacebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { icon: FiYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: FiTwitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await newsletterService.subscribe(email);
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true); // Optimistic
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">Stay Ahead of the Market</h3>
              <p className="text-white/60 text-sm">Get exclusive property launches, market insights, and investment tips.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-secondary font-medium">
                <span className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">✓</span>
                You're subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 lg:w-72 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-secondary text-sm"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe <FiArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/cropped-Krisshiv-Logo-512X512.png" alt="Krisshiv Realtors Logo" className="h-24 w-auto object-contain bg-white rounded-2xl shadow-md p-2 transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted luxury real estate consultancy. Connecting discerning buyers with exceptional properties since 2009.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${APP_PHONE}`} className="flex items-center gap-3 text-white/60 hover:text-secondary transition-colors">
                <FiPhone size={15} className="text-secondary flex-shrink-0" /> {APP_PHONE}
              </a>
              <a href={`mailto:${APP_EMAIL}`} className="flex items-center gap-3 text-white/60 hover:text-secondary transition-colors">
                <FiMail size={15} className="text-secondary flex-shrink-0" /> {APP_EMAIL}
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <FiMapPin size={15} className="text-secondary flex-shrink-0 mt-0.5" />
                <span>{APP_ADDRESS}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-secondary/20 hover:text-secondary transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-5 text-sm tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/50 hover:text-secondary text-sm transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-secondary transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
            <Link to="/sitemap.xml" className="hover:text-secondary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
