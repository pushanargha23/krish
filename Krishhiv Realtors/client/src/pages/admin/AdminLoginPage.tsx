import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiUser } from 'react-icons/fi';
import { APP_NAME } from '../../constants';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login — {APP_NAME}</title></Helmet>
      
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-heading font-bold text-primary text-3xl">K</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-bold text-primary">
            Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-textMuted">
            Secure login area
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-surface py-8 px-4 shadow-card sm:rounded-2xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-primary font-medium bg-gradient-gold hover:opacity-90 transition-opacity focus:outline-none disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
