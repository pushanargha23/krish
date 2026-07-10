import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { FiHome, FiUsers, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../../animations/variants';

const MONTHLY_LEADS = [
  { month: 'Aug', leads: 42, sales: 8 },
  { month: 'Sep', leads: 58, sales: 12 },
  { month: 'Oct', leads: 71, sales: 15 },
  { month: 'Nov', leads: 65, sales: 11 },
  { month: 'Dec', leads: 89, sales: 18 },
  { month: 'Jan', leads: 95, sales: 22 },
];

const PROPERTY_TYPES_DATA = [
  { name: 'Apartment', value: 45, color: '#14532D' },
  { name: 'Villa', value: 20, color: '#22C55E' },
  { name: 'Luxury', value: 15, color: '#A3E635' },
  { name: 'Commercial', value: 12, color: '#6B7280' },
  { name: 'Plot', value: 8, color: '#9CA3AF' },
];

const RECENT_LEADS = [
  { name: 'Rahul Singhania', email: 'rahul@example.com', property: 'Lodha Altamount', status: 'new', time: '2 min ago' },
  { name: 'Priya Mehta', email: 'priya@example.com', property: 'Prestige Leela', status: 'contacted', time: '15 min ago' },
  { name: 'Vikram Nair', email: 'vikram@example.com', property: 'DLF The Crest', status: 'qualified', time: '1 hr ago' },
  { name: 'Ananya K.', email: 'ananya@example.com', property: 'Godrej BKC', status: 'new', time: '2 hr ago' },
  { name: 'Deepa Malhotra', email: 'deepa@example.com', property: 'Oberoi Exquisite', status: 'converted', time: '3 hr ago' },
];

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

const AdminDashboard: React.FC = () => (
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
        { icon: <FiHome size={18} />, label: 'Total Properties', value: '248', change: '+12%' },
        { icon: <FiUsers size={18} />, label: 'Registered Users', value: '1,842', change: '+8%' },
        { icon: <FiMessageSquare size={18} />, label: 'New Leads', value: '95', change: '+23%' },
        { icon: <FiTrendingUp size={18} />, label: 'Revenue (MTD)', value: '₹2.4Cr', change: '+18%' },
      ].map(stat => (
        <motion.div key={stat.label} variants={staggerItem}>
          <StatCard {...stat} />
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
          <AreaChart data={MONTHLY_LEADS}>
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
            <Pie data={PROPERTY_TYPES_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {PROPERTY_TYPES_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {PROPERTY_TYPES_DATA.map(item => (
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
            {RECENT_LEADS.map((lead, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2">
                  <div className="font-medium text-primary">{lead.name}</div>
                  <div className="text-textMuted text-xs">{lead.email}</div>
                </td>
                <td className="py-3 px-2 text-textMuted">{lead.property}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-textMuted text-xs">{lead.time}</td>
                <td className="py-3 px-2">
                  <button className="text-secondary text-xs hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default AdminDashboard;
