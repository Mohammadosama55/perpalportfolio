'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Users,
  Video,
  Upload,
  Star,
  Eye,
  EyeOff,
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  ToggleLeft,
  ToggleRight,
  Download,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'feedbacks', label: 'Feedbacks', icon: Star },
  { id: 'video-payments', label: 'Video Payments', icon: Video },
  { id: 'media-upload', label: 'Media Upload', icon: Upload },
  { id: 'profile', label: 'Profile Settings', icon: Users },
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

interface Feedback {
  id: string;
  clientName: string;
  clientEmail: string;
  rating: number;
  title: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  isDisplayed: boolean;
  createdAt: Date;
}

interface VideoPayment {
  id: string;
  clientName: string;
  clientEmail: string;
  videoTitle: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled';
  status: 'pending' | 'processing' | 'completed' | 'delivered';
  quality: 'SD' | 'HD' | '4K';
  duration: number;
  createdAt: Date;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [videoPayments, setVideoPayments] = useState<VideoPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin',
    email: 'admin@portfolio.com',
    profileImage: '',
    bio: 'Portfolio Administrator',
  });

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    if (activeTab === 'feedbacks') {
      fetchFeedbacks();
    } else if (activeTab === 'video-payments') {
      fetchVideoPayments();
    }
  }, [activeTab]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedbacks');
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const fetchVideoPayments = async () => {
    try {
      const response = await fetch('/api/video-payments');
      if (!response.ok) {
        console.warn('Video payments API not ready, using empty array');
        setVideoPayments([]);
        return;
      }
      const data = await response.json();
      if (data.success) {
        setVideoPayments(data.data);
      } else {
        setVideoPayments([]);
      }
    } catch (error) {
      console.error('Error fetching video payments:', error);
      setVideoPayments([]); // Fallback to empty array
    }
  };

  const toggleFeedbackDisplay = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/feedbacks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isDisplayed: !currentStatus }),
      });
      
      if (response.ok) {
        setFeedbacks(feedbacks.map(f => 
          f.id === id ? { ...f, isDisplayed: !currentStatus } : f
        ));
      }
    } catch (error) {
      console.error('Error toggling feedback display:', error);
    }
  };

  const updateFeedbackStatus = async (id: string, status: Feedback['status']) => {
    try {
      const response = await fetch(`/api/feedbacks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      
      if (response.ok) {
        setFeedbacks(feedbacks.map(f => 
          f.id === id ? { ...f, status } : f
        ));
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (uploadType: 'media' | 'profile' = 'media') => {
    if (!selectedFile) return;

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', selectedFile.name);
      formData.append('uploadedBy', 'admin');
      
      if (uploadType === 'profile') {
        formData.append('folder', 'profile');
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        alert('File uploaded successfully!');
        
        // If profile image, update admin profile in database
        if (uploadType === 'profile' && result.data?.secureUrl) {
          const updatedProfile = {
            ...adminProfile,
            profileImage: result.data.secureUrl,
          };
          
          // Save to backend
          await fetch('/api/admin-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProfile),
          });
          
          setAdminProfile(updatedProfile);
        }
        
        setSelectedFile(null);
        setUploadProgress(0);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      const response = await fetch(`/api/feedbacks?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setFeedbacks(feedbacks.filter(f => f.id !== id));
        alert('Feedback deleted successfully!');
      } else {
        alert('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback');
    }
  };

  const deleteVideoPayment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video payment?')) return;
    
    try {
      const response = await fetch(`/api/video-payments?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setVideoPayments(videoPayments.filter(vp => vp.id !== id));
        alert('Video payment deleted successfully!');
      } else {
        alert('Failed to delete video payment');
      }
    } catch (error) {
      console.error('Error deleting video payment:', error);
      alert('Failed to delete video payment');
    }
  };

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

      case 'testimonials':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Testimonial Management</h3>
            <div className="glassmorphism rounded-2xl p-8 text-center">
              <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">Testimonial management interface coming soon...</p>
            </div>
          </div>
        );

      case 'feedbacks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Feedback Management</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Feedback
              </button>
            </div>
            <div className="glassmorphism rounded-2xl p-6">
              {feedbacks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No feedbacks to display. Connect to database to see data.</p>
              ) : (
                <div className="space-y-4">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="border border-purple-200/50 rounded-xl p-4 bg-white/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold">{feedback.title}</h4>
                          <p className="text-sm text-gray-600">{feedback.clientName}</p>
                          <p className="text-gray-700 mt-2">{feedback.comment}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              feedback.status === 'approved' ? 'bg-green-100 text-green-700' :
                              feedback.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {feedback.status}
                            </span>
                            {feedback.isDisplayed && (
                              <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">Displayed</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleFeedbackDisplay(feedback.id, feedback.isDisplayed)}
                            className={`p-2 rounded ${feedback.isDisplayed ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                          >
                            {feedback.isDisplayed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <select
                            value={feedback.status}
                            onChange={(e) => updateFeedbackStatus(feedback.id, e.target.value as Feedback['status'])}
                            className="p-2 border rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => deleteFeedback(feedback.id)}
                            className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                            title="Delete Feedback"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'video-payments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Video Payment Tracking</h3>
              <button 
                onClick={() => document.getElementById('video-upload-input')?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Upload & Add Payment
              </button>
              <input
                id="video-upload-input"
                type="file"
                accept="video/*,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Upload Progress */}
            {selectedFile && (
              <div className="glassmorphism rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  {!isLoading && (
                    <button
                      onClick={() => handleUpload('media')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Upload to Cloudinary
                    </button>
                  )}
                </div>
                {isLoading && (
                  <div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm mt-2">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="glassmorphism rounded-xl p-4">
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold">{videoPayments.length}</p>
              </div>
              <div className="glassmorphism rounded-xl p-4">
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {videoPayments.filter(vp => vp.paymentStatus === 'paid').length}
                </p>
              </div>
              <div className="glassmorphism rounded-xl p-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {videoPayments.filter(vp => vp.paymentStatus === 'pending').length}
                </p>
              </div>
              <div className="glassmorphism rounded-xl p-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${videoPayments.reduce((sum, vp) => sum + vp.price, 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment List */}
            <div className="glassmorphism rounded-2xl p-6">
              {videoPayments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No video payments yet. Upload a video to get started!</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Video</th>
                      <th className="text-left py-3 px-4">Quality</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Payment Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoPayments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{payment.clientName}</p>
                            <p className="text-xs text-gray-500">{payment.clientEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{payment.videoTitle}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700">
                            {payment.quality}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold">${payment.price.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            payment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {payment.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-purple-100 rounded"><Edit className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-blue-100 rounded" title="View Media">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteVideoPayment(payment.id)}
                              className="p-2 hover:bg-red-100 rounded" 
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );

      case 'media-upload':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Media Upload (Cloudinary)</h3>
            <div className="glassmorphism rounded-2xl p-8">
              <div className="max-w-2xl mx-auto text-center">
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Upload High-Quality Media</h4>
                <p className="text-gray-600 mb-4">Support for images and videos up to 4K quality</p>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileSelect}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Select File
                </label>
                {selectedFile && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
                {isLoading && (
                  <div className="mt-4">
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm mt-2">Uploading... {uploadProgress}%</p>
                  </div>
                )}
                {selectedFile && !isLoading && (
                  <button
                    onClick={() => handleUpload('media')}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Now
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Profile Settings</h3>
            
            {/* Profile Preview */}
            <div className="glassmorphism rounded-2xl p-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    {adminProfile.profileImage ? (
                      <img
                        src={adminProfile.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                        A
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">{adminProfile.name}</h3>
                    <p className="text-gray-600">{adminProfile.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{adminProfile.bio}</p>
                  </div>
                </div>

                {/* Upload Profile Picture */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold mb-4">Update Profile Picture</h4>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="profile-upload"
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </label>
                    {selectedFile && (
                      <div className="flex-1 bg-purple-50 rounded-lg p-3">
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}
                    {selectedFile && !isLoading && (
                      <button
                        onClick={() => handleUpload('profile')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Upload Profile Picture
                      </button>
                    )}
                  </div>
                  {isLoading && (
                    <div className="mt-4">
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm mt-2">Uploading profile picture... {uploadProgress}%</p>
                    </div>
                  )}
                </div>

                {/* Admin Controls */}
                <div className="border-t mt-6 pt-6">
                  <h4 className="text-lg font-bold mb-4">Admin Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Portfolio Control</p>
                        <p className="text-sm text-gray-600">Full access to all portfolio features</p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Active
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Media Management</p>
                        <p className="text-sm text-gray-600">Upload and manage all media assets</p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Enabled
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Feedback Moderation</p>
                        <p className="text-sm text-gray-600">Approve or hide client feedbacks</p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Enabled
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
