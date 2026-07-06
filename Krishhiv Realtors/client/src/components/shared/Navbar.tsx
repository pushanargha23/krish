import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiHeart, FiUser, FiMenu, FiX, FiMoon, FiSun, FiPhone, FiChevronDown,
} from 'react-icons/fi';
import { useScrollPosition } from '../../hooks';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { navbarVariants, dropdownVariants } from '../../animations/variants';
import { APP_NAME, APP_PHONE } from '../../constants';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'Properties', to: '/properties',
    children: [
      { label: 'All Properties', to: '/properties' },
      { label: 'Apartments', to: '/properties?type=apartment' },
      { label: 'Villas', to: '/properties?type=villa' },
      { label: 'Luxury Homes', to: '/properties?type=luxury' },
      { label: 'Commercial', to: '/properties?type=commercial' },
      { label: 'Plots', to: '/properties?type=plot' },
    ],
  },
  { label: 'Developers', to: '/developers' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const { count } = useWishlist();
  const { isDark, toggle: toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const isScrolled = scrollY > 60;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 bg-primary text-white/70 text-xs">
        <span>India's Most Trusted Luxury Real Estate Consultancy</span>
        <div className="flex items-center gap-6">
          <a href={`tel:${APP_PHONE}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <FiPhone size={12} /> {APP_PHONE}
          </a>
          <span>Mon–Sat: 9AM – 7PM</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        variants={navbarVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        className="fixed top-0 left-0 right-0 z-40 lg:top-8"
        style={{ top: isScrolled ? 0 : undefined }}
      >
        <div className="container-custom flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
              <span className="font-heading font-bold text-primary text-lg">K</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-white text-lg leading-tight">{APP_NAME}</div>
              <div className="text-secondary text-[10px] tracking-widest uppercase">Premium Realty</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive ? 'text-secondary' : 'text-white/80 hover:text-white'}`
                  }
                >
                  {link.label}
                  {link.children && <FiChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </NavLink>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-2 w-52 glass-dark rounded-xl overflow-hidden shadow-luxury"
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className="block px-4 py-3 text-sm text-white/80 hover:text-secondary hover:bg-white/5 transition-all"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiSearch size={18} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all">
              <FiHeart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all">
                  <div className="w-7 h-7 bg-gradient-gold rounded-full flex items-center justify-center text-primary text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm">{user?.name?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 glass-dark rounded-xl overflow-hidden shadow-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-3 text-sm text-white/80 hover:text-secondary hover:bg-white/5">My Profile</Link>
                  <Link to="/wishlist" className="block px-4 py-3 text-sm text-white/80 hover:text-secondary hover:bg-white/5">Wishlist</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-3 text-sm text-secondary hover:bg-white/5">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-primary text-sm font-semibold rounded-xl hover:shadow-gold transition-all">
                <FiUser size={15} /> Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button onClick={() => setSearchOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
              <FiX size={28} />
            </button>
            <div className="w-full max-w-2xl">
              <p className="text-secondary text-sm tracking-widest uppercase mb-4 text-center">Search Properties</p>
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by location, project, or builder..."
                  className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-xl placeholder:text-white/40 focus:outline-none focus:border-secondary"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gradient-gold rounded-xl text-primary">
                  <FiSearch size={20} />
                </button>
              </form>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Delhi'].map(city => (
                  <button
                    key={city}
                    onClick={() => { navigate(`/properties?city=${city}`); setSearchOpen(false); }}
                    className="px-4 py-2 bg-white/10 text-white/70 rounded-full text-sm hover:bg-secondary/20 hover:text-secondary transition-all"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-primary overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-heading text-white font-bold text-lg">{APP_NAME}</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                  <FiX size={24} />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <div key={link.label}>
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive ? 'bg-secondary/20 text-secondary' : 'text-white/80 hover:bg-white/5 hover:text-white'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.slice(1).map(child => (
                          <NavLink
                            key={child.label}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 rounded-lg text-xs text-white/50 hover:text-secondary transition-colors"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10 mt-4">
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
