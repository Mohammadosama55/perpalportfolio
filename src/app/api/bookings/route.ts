import { NextResponse } from 'next/server';
import { mockDb, type Booking } from '@/lib/db';

// GET /api/bookings - Get all bookings
export async function GET() {
  return NextResponse.json(mockDb.bookings);
}

// POST /api/bookings - Create new booking
export async function POST(request: Request) {
  const data = await request.json();
  
  const newBooking: Booking = {
    id: Date.now().toString(),
    ...data,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(),
  };
  
  mockDb.bookings.push(newBooking);
  return NextResponse.json(newBooking, { status: 201 });
}

// PATCH /api/bookings - Update booking status
export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  
  const booking = mockDb.bookings.find(b => b.id === id);
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }
  
  booking.status = status;
  return NextResponse.json(booking);
}
