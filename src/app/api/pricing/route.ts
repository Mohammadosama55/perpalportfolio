import { NextResponse } from 'next/server';
import { mockDb, type PricingPlan } from '@/lib/db';

// Default pricing data
const defaultPricing: PricingPlan[] = [
  {
    id: '1',
    duration: '0-1 minutes',
    price: 50,
    description: 'Short video clips, social media content',
    features: ['Basic editing', 'Color correction', '1 revision'],
    popular: false,
  },
  {
    id: '2',
    duration: '1-3 minutes',
    price: 120,
    description: 'Medium-length content, promotional videos',
    features: ['Advanced editing', 'Motion graphics', 'Color grading', '2 revisions'],
    popular: true,
  },
  {
    id: '3',
    duration: '3-5 minutes',
    price: 200,
    description: 'Long-form content, detailed storytelling',
    features: ['Premium editing', 'Advanced graphics', 'Sound design', '3 revisions', 'Priority delivery'],
    popular: false,
  },
  {
    id: '4',
    duration: '5+ minutes',
    price: 0,
    description: 'Full productions, documentaries, events',
    features: ['Full production', 'Custom graphics', 'Professional sound', 'Unlimited revisions', 'Dedicated support'],
    popular: false,
  },
];

// GET /api/pricing - Get all pricing plans
export async function GET() {
  // Initialize with default data if empty
  if (mockDb.pricing.length === 0) {
    mockDb.pricing = [...defaultPricing];
  }
  return NextResponse.json(mockDb.pricing);
}

// PUT /api/pricing - Update pricing plan
export async function PUT(request: Request) {
  const data = await request.json();
  const { id, ...updates } = data;
  
  const planIndex = mockDb.pricing.findIndex(p => p.id === id);
  if (planIndex === -1) {
    return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
  }
  
  mockDb.pricing[planIndex] = { ...mockDb.pricing[planIndex], ...updates };
  return NextResponse.json(mockDb.pricing[planIndex]);
}
