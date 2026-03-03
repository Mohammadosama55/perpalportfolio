'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Users,
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'users', label: 'Users', icon: Users },
];

// Mock data
const stats = [
  { label: 'Total Bookings', value: '156', change: '+12%', trend: 'up' },
  { label: 'Revenue', value: '$24,500', change: '+8%', trend: 'up' },
  { label: 'Pending Requests', value: '8', change: '-3', trend: 'down' },
  { label: 'Portfolio Items', value: '47', change: '+5', trend: 'up' },
];

const recentBookings = [
  { id: 1, client: 'John Smith', service: 'Video Editing', date: '2024-03-15', status: 'pending', amount: '$120' },
  { id: 2, client: 'Sarah Johnson', service: 'Photo Editing', date: '2024-03-14', status: 'completed', amount: '$60' },
  { id: 3, client: 'Mike Davis', service: 'Motion Graphics', date: '2024-03-13', status: 'in-progress', amount: '$200' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glassmorphism rounded-2xl p-6"
                >
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="glassmorphism rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-200/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-purple-100/30">
                        <td className="py-3 px-4 text-gray-800">{booking.client}</td>
                        <td className="py-3 px-4 text-gray-600">{booking.service}</td>
                        <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                        <td className="py-3 px-4 text-gray-800 font-medium">{booking.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {booking.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                            {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                            {booking.status === 'in-progress' && <Clock className="w-3 h-3" />}
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-purple-600" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Portfolio Management</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add New Item
              </button>
            </div>
            <div className="glassmorphism rounded-2xl p-8 text-center">
              <ImageIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">Portfolio management interface coming soon...</p>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Booking Management</h3>
            <div className="glassmorphism rounded-2xl p-8 text-center">
              <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">Full booking calendar coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="glassmorphism rounded-2xl p-8 text-center">
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-lg border-r border-purple-200/50 transition-all duration-300 z-50 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl text-gray-800">Admin</span>
            )}
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-lg border-b border-purple-200/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
