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

// Mock database for development
export const mockDb = {
  portfolio: [] as PortfolioItem[],
  bookings: [] as Booking[],
  testimonials: [] as Testimonial[],
  pricing: [] as PricingPlan[],
  users: [] as User[],
};
