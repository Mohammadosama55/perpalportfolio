// Database schema and types for the portfolio application

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Photos' | 'Videos' | 'Graphics';
  image: string;
  description?: string;
  createdAt: Date;
  featured: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  service: string;
  duration: number;
  date: string;
  time: string;
  description: string;
  price: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface PricingPlan {
  id: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: Date;
}

export interface VideoPayment {
  id: string;
  clientName: string;
  clientEmail: string;
  videoTitle: string;
  videoUrl: string;
  videoPublicId: string;
  duration: number; // in seconds
  quality: 'SD' | 'HD' | '4K';
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled';
  paymentMethod?: string;
  transactionId?: string;
  description?: string;
  status: 'pending' | 'processing' | 'completed' | 'delivered';
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  id: string;
  projectId?: string;
  bookingId?: string;
  clientName: string;
  clientEmail: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  mediaUrls?: string[]; // Additional media (images/videos)
  mediaPublicIds?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  isDisplayed: boolean; // Control visibility on public site
  adminResponse?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaAsset {
  id: string;
  title: string;
  description?: string;
  publicId: string;
  url: string;
  secureUrl: string;
  resourceType: 'image' | 'video' | 'raw';
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  folder: string;
  tags?: string[];
  uploadedBy: string;
  createdAt: Date;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for development
export const mockDb = {
  portfolio: [] as PortfolioItem[],
  bookings: [] as Booking[],
  testimonials: [] as Testimonial[],
  pricing: [] as PricingPlan[],
  users: [] as User[],
  videoPayments: [] as VideoPayment[],
  feedbacks: [] as Feedback[],
  mediaAssets: [] as MediaAsset[],
  adminProfiles: [] as AdminProfile[],
};
