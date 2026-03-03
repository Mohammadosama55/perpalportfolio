import { NextResponse } from 'next/server';
import { mockDb, type Testimonial } from '@/lib/db';

// GET /api/testimonials - Get all testimonials (approved only for public)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  
  let testimonials = mockDb.testimonials;
  
  if (status) {
    testimonials = testimonials.filter(t => t.status === status);
  }
  
  return NextResponse.json(testimonials);
}

// POST /api/testimonials - Submit new testimonial
export async function POST(request: Request) {
  const data = await request.json();
  
  const newTestimonial: Testimonial = {
    id: Date.now().toString(),
    ...data,
    status: 'pending',
    createdAt: new Date(),
  };
  
  mockDb.testimonials.push(newTestimonial);
  return NextResponse.json(newTestimonial, { status: 201 });
}

// PATCH /api/testimonials - Update testimonial status (admin only)
export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  
  const testimonial = mockDb.testimonials.find(t => t.id === id);
  if (!testimonial) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }
  
  testimonial.status = status;
  return NextResponse.json(testimonial);
}

// DELETE /api/testimonials - Delete testimonial
export async function DELETE(request: Request) {
  const { id } = await request.json();
  
  const index = mockDb.testimonials.findIndex(t => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }
  
  mockDb.testimonials.splice(index, 1);
  return NextResponse.json({ success: true });
}
