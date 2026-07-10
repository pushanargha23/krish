import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { FiHome, FiUsers, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { propertyService, leadService, authService } from '../../api/services';
import { formatPrice } from '../../utils';

// Removed static MONTHLY_LEADS

// Removed static PROPERTY_TYPES_DATA and RECENT_LEADS

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-emerald-100 text-emerald-700',
  contacted: 'bg-lime-100 text-lime-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; change: string; positive?: boolean }> = ({
  icon, label, value, change, positive = true,
}) => (
  <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-5">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">{icon}</div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change}
      </span>
    </div>
    <div className="font-heading font-bold text-primary text-2xl">{value}</div>
    <div className="text-textMuted text-sm mt-1">{label}</div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    properties: { value: 0, change: '+0%' },
    users: { value: 0, change: '+0%' },
    leads: { value: 0, change: '+0%' },
    portfolioValue: { value: '₹0', change: '+0%' },
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  // Helper to calculate month-over-month growth
  const calculateGrowth = (items: any[], valueExtractor?: (item: any) => number) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    let currentMonthValue = 0;
    let lastMonthValue = 0;

    items.forEach(item => {
      const date = new Date(item.createdAt || Date.now());
      const val = valueExtractor ? valueExtractor(item) : 1;
      
      if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
        currentMonthValue += val;
      } else if (
        (currentMonth === 0 && date.getFullYear() === currentYear - 1 && date.getMonth() === 11) ||
        (currentMonth > 0 && date.getFullYear() === currentYear && date.getMonth() === currentMonth - 1)
      ) {
        lastMonthValue += val;
      }
    });

    if (lastMonthValue === 0) return currentMonthValue > 0 ? '+100%' : '+0%';
    const change = Math.round(((currentMonthValue - lastMonthValue) / lastMonthValue) * 100);
    return change >= 0 ? `+${change}%` : `${change}%`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, userRes, leadRes] = await Promise.all([
          propertyService.getAll({} as any),
          authService.getAllUsers(),
          leadService.getAll()
        ]);
        
        const properties = propRes.data?.data || [];
        const users = userRes.data?.data || [];
        const leads = leadRes.data?.data || [];
        
        const totalValue = properties.reduce((sum: number, p: any) => sum + (p.price || 0), 0);
        
        setStats({
          properties: { value: properties.length, change: calculateGrowth(properties) },
          users: { value: users.length, change: calculateGrowth(users) },
          leads: { value: leads.length, change: calculateGrowth(leads) },
          portfolioValue: { value: formatPrice(totalValue), change: calculateGrowth(properties, p => p.price || 0) },
        });
        
        setRecentLeads(leads.slice(0, 5));
        
        const typeCount: Record<string, number> = {};
        properties.forEach((p: any) => {
          typeCount[p.type] = (typeCount[p.type] || 0) + 1;
        });
        
        const colors = ['#14532D', '#22C55E', '#A3E635', '#6B7280', '#9CA3AF'];
        const typesData = Object.entries(typeCount).map(([name, value], i) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value: properties.length > 0 ? Math.round((value / properties.length) * 100) : 0,
          color: colors[i % colors.length]
        }));
        
        setPropertyTypes(typesData);
        
        // Calculate monthly leads
        const mData: Record<string, { leads: number; sales: number }> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const mName = d.toLocaleString('default', { month: 'short' });
          mData[mName] = { leads: 0, sales: 0 };
        }
        
        leads.forEach((l: any) => {
          const date = new Date(l.createdAt || new Date());
          const mName = date.toLocaleString('default', { month: 'short' });
          if (mData[mName]) {
            mData[mName].leads += 1;
            if (l.status === 'converted') mData[mName].sales += 1;
          }
        });
        
        setMonthlyData(Object.entries(mData).map(([month, d]) => ({ month, leads: d.leads, sales: d.sales })));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  return (
  <>
    <Helmet><title>Dashboard — Admin | Krisshiv Realtors</title></Helmet>

    <div className="mb-6">
      <h1 className="font-heading text-2xl font-bold text-primary">Dashboard</h1>
      <p className="text-textMuted text-sm mt-1">Welcome back! Here's what's happening today.</p>
    </div>

    {/* Stats */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {[
        { icon: <FiHome size={18} />, label: 'Total Properties', value: stats.properties.value.toString(), change: stats.properties.change },
        { icon: <FiUsers size={18} />, label: 'Registered Users', value: stats.users.value.toString(), change: stats.users.change },
        { icon: <FiMessageSquare size={18} />, label: 'New Leads', value: stats.leads.value.toString(), change: stats.leads.change },
        { icon: <FiTrendingUp size={18} />, label: 'Portfolio Value', value: stats.portfolioValue.value, change: stats.portfolioValue.change },
      ].map(stat => (
        <motion.div key={stat.label} variants={staggerItem}>
          <StatCard {...stat} positive={!stat.change.startsWith('-')} />
        </motion.div>
      ))}
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Leads Chart */}
      <div className="lg:col-span-2 bg-surface rounded-xl border border-gray-100 shadow-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-primary">Leads & Sales Overview</h3>
          <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14532D" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#14532D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="leads" stroke="#14532D" fill="url(#leadsGrad)" strokeWidth={2} name="Leads" />
            <Area type="monotone" dataKey="sales" stroke="#22C55E" fill="url(#salesGrad)" strokeWidth={2} name="Sales" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Property Types Pie */}
      <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-5">
        <h3 className="font-semibold text-primary mb-5">Property Types</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={propertyTypes} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {propertyTypes.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {propertyTypes.map(item => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-textMuted">{item.name}</span>
              </div>
              <span className="font-medium text-primary">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Leads */}
    <div className="bg-surface rounded-xl border border-gray-100 shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-primary">Recent Leads</h3>
        <a href="/admin/leads" className="text-secondary text-sm hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-textMuted font-medium text-xs">Name</th>
              <th className="text-left py-3 px-2 text-textMuted font-medium text-xs">Property</th>
              <th className="text-left py-3 px-2 text-textMuted font-medium text-xs">Status</th>
              <th className="text-left py-3 px-2 text-textMuted font-medium text-xs">Time</th>
              <th className="text-left py-3 px-2 text-textMuted font-medium text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2">
                  <div className="font-medium text-primary">{lead.name}</div>
                  <div className="text-textMuted text-xs">{lead.email}</div>
                </td>
                <td className="py-3 px-2 text-textMuted">{lead.property || 'General Inquiry'}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-textMuted text-xs">
                  {new Date(lead.createdAt || lead.time).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  <button className="text-secondary text-xs hover:underline">View</button>
                </td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-textMuted">No recent leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default AdminDashboard;
