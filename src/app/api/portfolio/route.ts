import { NextResponse } from 'next/server';
import { mockDb, type PortfolioItem } from '@/lib/db';

// GET /api/portfolio - Get all portfolio items
export async function GET() {
  return NextResponse.json(mockDb.portfolio);
}

// POST /api/portfolio - Create new portfolio item
export async function POST(request: Request) {
  const data = await request.json();
  
  const newItem: PortfolioItem = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date(),
  };
  
  mockDb.portfolio.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
