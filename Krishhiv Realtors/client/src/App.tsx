import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Placeholder pages (to be expanded)
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen bg-background flex items-center justify-center pt-24">
    <div className="text-center">
      <h1 className="font-heading text-4xl font-bold text-primary mb-4">{title}</h1>
      <p className="text-textMuted">This page is coming soon.</p>
    </div>
  </div>
);

// Page loader
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center animate-float">
        <span className="font-heading font-bold text-primary text-xl">K</span>
      </div>
      <div className="w-8 h-0.5 bg-secondary/50 rounded-full animate-pulse" />
    </div>
  </div>
);

// Protected Route
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000 },
  },
});

const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/developers" element={<PlaceholderPage title="Our Developers" />} />
        <Route path="/services" element={<PlaceholderPage title="Our Services" />} />
        <Route path="/blog" element={<PlaceholderPage title="Blog & Insights" />} />
        <Route path="/blog/:slug" element={<PlaceholderPage title="Blog Post" />} />
        <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
        <Route path="/testimonials" element={<PlaceholderPage title="Testimonials" />} />
        <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
        <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
        <Route path="/wishlist" element={<PlaceholderPage title="My Wishlist" />} />
        <Route path="/login" element={<PlaceholderPage title="Login" />} />
        <Route path="/register" element={<PlaceholderPage title="Register" />} />
        <Route path="/profile" element={<PlaceholderPage title="My Profile" />} />
        <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<PlaceholderPage title="Manage Properties" />} />
        <Route path="builders" element={<PlaceholderPage title="Manage Builders" />} />
        <Route path="leads" element={<PlaceholderPage title="Lead Management" />} />
        <Route path="appointments" element={<PlaceholderPage title="Appointments" />} />
        <Route path="users" element={<PlaceholderPage title="Users" />} />
        <Route path="blogs" element={<PlaceholderPage title="Blog Management" />} />
        <Route path="gallery" element={<PlaceholderPage title="Gallery Management" />} />
        <Route path="newsletter" element={<PlaceholderPage title="Newsletter" />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

const App: React.FC = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
