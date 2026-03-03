// API route for video payment management
import { NextRequest, NextResponse } from 'next/server';
import { mockDb, VideoPayment } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const payment = mockDb.videoPayments.find(p => p.id === id);
      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: payment });
    }

    return NextResponse.json({
      success: true,
      data: mockDb.videoPayments,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch video payments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      videoTitle,
      videoUrl,
      videoPublicId,
      duration,
      quality,
      price,
      description,
    } = body;

    // Validate required fields
    if (!clientName || !clientEmail || !videoTitle || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPayment: VideoPayment = {
      id: crypto.randomUUID(),
      clientName,
      clientEmail,
      videoTitle,
      videoUrl: videoUrl || '',
      videoPublicId: videoPublicId || '',
      duration: duration || 0,
      quality: quality || 'HD',
      price,
      paymentStatus: 'pending',
      description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockDb.videoPayments.push(newPayment);

    return NextResponse.json({
      success: true,
      data: newPayment,
      message: 'Video payment created successfully',
    });
  } catch (error) {
    console.error('Error creating video payment:', error);
    return NextResponse.json(
      { error: 'Failed to create video payment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const index = mockDb.videoPayments.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    const updatedPayment = {
      ...mockDb.videoPayments[index],
      ...updates,
      updatedAt: new Date(),
    };

    mockDb.videoPayments[index] = updatedPayment;

    return NextResponse.json({
      success: true,
      data: updatedPayment,
      message: 'Payment updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const index = mockDb.videoPayments.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    mockDb.videoPayments.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    );
  }
}
