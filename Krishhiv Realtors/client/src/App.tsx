import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { propertyService, builderService, leadService, appointmentService, blogService, galleryService, newsletterService, authService } from './api/services';
import { formatPrice } from './utils';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminGenericPage = lazy(() => import('./pages/admin/AdminGenericPage'));
const DataUploadPage = lazy(() => import('./pages/DataUploadPage'));

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
  if (adminOnly) {
    if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/admin/login" replace />;
  } else {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
  }
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
        <Route path="/admin/login" element={<AdminLoginPage />} />
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
        <Route path="properties" element={
          <AdminGenericPage 
            title="Manage Properties" 
            fetchData={() => propertyService.getAll({} as any)} 
            columns={[
              { key: 'title', header: 'Title' },
              { key: 'type', header: 'Type', render: (r) => <span className="capitalize">{r.type}</span> },
              { key: 'price', header: 'Price', render: (r) => formatPrice(r.price || 0) },
              { key: 'status', header: 'Status', render: (r) => <span className="capitalize">{r.status}</span> }
            ]}
            formFields={[
              { name: 'title', label: 'Property Title', type: 'text', required: true },
              { name: 'type', label: 'Property Type', type: 'select', options: [{ label: 'Apartment', value: 'apartment' }, { label: 'Villa', value: 'villa' }, { label: 'Luxury', value: 'luxury' }, { label: 'Commercial', value: 'commercial' }, { label: 'Plot', value: 'plot' }], required: true },
              { name: 'price', label: 'Price', type: 'number', required: true },
              { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
              { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
              { name: 'area', label: 'Area (sqft)', type: 'number' },
              { name: 'possession', label: 'Possession Status', type: 'text' },
              { name: 'city', label: 'City', type: 'text' },
              { name: 'status', label: 'Status', type: 'select', options: [{ label: 'Available', value: 'available' }, { label: 'Sold', value: 'sold' }], required: true },
              { name: 'photo', label: 'Property Photo', type: 'image' },
              { name: 'description', label: 'Description', type: 'textarea' },
            ]}
            createData={propertyService.create}
            updateData={propertyService.update}
            deleteData={propertyService.delete}
          />
        } />
        <Route path="builders" element={
          <AdminGenericPage 
            title="Manage Builders" 
            fetchData={builderService.getAll} 
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'totalProjects', header: 'Total Projects' },
              { key: 'rating', header: 'Rating' }
            ]}
            formFields={[
              { name: 'name', label: 'Builder Name', type: 'text', required: true },
              { name: 'logo', label: 'Builder Logo', type: 'image' },
              { name: 'totalProjects', label: 'Total Projects', type: 'number' },
              { name: 'rating', label: 'Rating (0-5)', type: 'number' }
            ]}
            createData={builderService.create}
            updateData={builderService.update}
            deleteData={builderService.delete}
          />
        } />
        <Route path="leads" element={
          <AdminGenericPage 
            title="Lead Management" 
            fetchData={leadService.getAll} 
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'email', header: 'Email' },
              { key: 'phone', header: 'Phone' },
              { key: 'status', header: 'Status', render: (r) => <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">{r.status}</span> }
            ]}
            formFields={[
              { name: 'name', label: 'Lead Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'text', required: true },
              { name: 'phone', label: 'Phone Number', type: 'text', required: true },
              { name: 'status', label: 'Status', type: 'select', options: [{ label: 'New', value: 'new' }, { label: 'Contacted', value: 'contacted' }, { label: 'Qualified', value: 'qualified' }, { label: 'Converted', value: 'converted' }, { label: 'Lost', value: 'lost' }] }
            ]}
            createData={leadService.create}
            updateData={leadService.update}
            deleteData={leadService.delete}
          />
        } />
        <Route path="appointments" element={
          <AdminGenericPage 
            title="Appointments" 
            fetchData={appointmentService.getAll} 
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'date', header: 'Date' },
              { key: 'time', header: 'Time' },
              { key: 'type', header: 'Type' },
              { key: 'status', header: 'Status', render: (r) => <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">{r.status}</span> }
            ]}
            formFields={[
              { name: 'name', label: 'Client Name', type: 'text', required: true },
              { name: 'date', label: 'Date', type: 'text', required: true },
              { name: 'time', label: 'Time', type: 'text', required: true },
              { name: 'type', label: 'Appointment Type', type: 'select', options: [{ label: 'Site Visit', value: 'site_visit' }, { label: 'Office Meeting', value: 'office_meeting' }, { label: 'Virtual', value: 'virtual' }] },
              { name: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'pending' }, { label: 'Confirmed', value: 'confirmed' }, { label: 'Completed', value: 'completed' }, { label: 'Cancelled', value: 'cancelled' }] }
            ]}
            createData={appointmentService.create}
            updateData={appointmentService.update}
            deleteData={appointmentService.delete}
          />
        } />
        <Route path="users" element={
          <AdminGenericPage 
            title="Users" 
            fetchData={authService.getAllUsers} 
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'email', header: 'Email' },
              { key: 'role', header: 'Role', render: (r) => <span className="capitalize font-medium">{r.role}</span> }
            ]}
            formFields={[
              { name: 'name', label: 'User Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'text', required: true },
              { name: 'avatar', label: 'Profile Photo', type: 'image' },
              { name: 'role', label: 'Role', type: 'select', options: [{ label: 'User', value: 'user' }, { label: 'Admin', value: 'admin' }, { label: 'Agent', value: 'agent' }], required: true }
            ]}
            createData={authService.create}
            updateData={authService.update}
            deleteData={authService.delete}
          />
        } />
        <Route path="blogs" element={
          <AdminGenericPage 
            title="Blog Management" 
            fetchData={() => blogService.getAll()} 
            columns={[
              { key: 'title', header: 'Title' },
              { key: 'category', header: 'Category' },
              { key: 'author', header: 'Author', render: (r) => <span>{r.author?.name || 'Unknown'}</span> }
            ]}
            formFields={[
              { name: 'title', label: 'Blog Title', type: 'text', required: true },
              { name: 'category', label: 'Category', type: 'text', required: true },
              { name: 'coverImage', label: 'Cover Image', type: 'image' },
              { name: 'content', label: 'Content', type: 'textarea' }
            ]}
            createData={blogService.create}
            updateData={blogService.update}
            deleteData={blogService.delete}
          />
        } />
        <Route path="gallery" element={
          <AdminGenericPage 
            title="Gallery Management" 
            fetchData={() => galleryService.getAll()} 
            columns={[
              { key: 'title', header: 'Title' },
              { key: 'category', header: 'Category' }
            ]}
            formFields={[
              { name: 'title', label: 'Gallery Title', type: 'text', required: true },
              { name: 'category', label: 'Category', type: 'text', required: true },
              { name: 'image', label: 'Upload Image', type: 'image', required: true }
            ]}
            createData={galleryService.create}
            updateData={galleryService.update}
            deleteData={galleryService.delete}
          />
        } />
        <Route path="newsletter" element={
          <AdminGenericPage 
            title="Newsletter" 
            fetchData={newsletterService.getAll} 
            columns={[
              { key: 'email', header: 'Email' },
              { key: 'createdAt', header: 'Subscribed On', render: (r) => new Date(r.createdAt).toLocaleDateString() }
            ]}
            formFields={[
              { name: 'email', label: 'Subscriber Email', type: 'text', required: true }
            ]}
            createData={newsletterService.create}
            updateData={newsletterService.update}
            deleteData={newsletterService.delete}
          />
        } />
        <Route path="upload" element={<DataUploadPage />} />
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
