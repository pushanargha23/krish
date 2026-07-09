import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiHome, FiUsers, FiMessageSquare, FiSettings, FiLogOut,
  FiMenu, FiX, FiBarChart2, FiBriefcase, FiImage, FiFileText,
  FiCalendar, FiMail, FiBell, FiSearch,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { APP_NAME } from '../constants';

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: FiGrid, exact: true },
  { label: 'Properties', to: '/admin/properties', icon: FiHome },
  { label: 'Builders', to: '/admin/builders', icon: FiBriefcase },
  { label: 'Leads', to: '/admin/leads', icon: FiMessageSquare },
  { label: 'Appointments', to: '/admin/appointments', icon: FiCalendar },
  { label: 'Users', to: '/admin/users', icon: FiUsers },
  { label: 'Blogs', to: '/admin/blogs', icon: FiFileText },
  { label: 'Gallery', to: '/admin/gallery', icon: FiImage },
  { label: 'Newsletter', to: '/admin/newsletter', icon: FiMail },
  { label: 'Analytics', to: '/admin/analytics', icon: FiBarChart2 },
  { label: 'Settings', to: '/admin/settings', icon: FiSettings },
];

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background text-textPrimary flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-primary z-30 flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-gold rounded-xl flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">K</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-sm">{APP_NAME}</div>
                  <div className="text-secondary text-[10px] tracking-widest">ADMIN PANEL</div>
                </div>
              </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {NAV.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-secondary/20 text-secondary border border-secondary/20'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gradient-gold rounded-full flex items-center justify-center text-primary font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{user?.name}</div>
                  <div className="text-white/40 text-xs capitalize">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-all"
              >
                <FiLogOut size={15} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-surface border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-secondary w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiBell size={18} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link to="/" target="_blank" className="text-sm text-textMuted hover:text-secondary transition-colors">
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
