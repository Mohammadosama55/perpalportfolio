// API route for feedback management
import { NextRequest, NextResponse } from 'next/server';
import { mockDb, Feedback } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const isDisplayed = searchParams.get('isDisplayed');

    let feedbacks = mockDb.feedbacks;

    if (id) {
      const feedback = feedbacks.find(f => f.id === id);
      if (!feedback) {
        return NextResponse.json(
          { error: 'Feedback not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: feedback });
    }

    // Filter by status if provided
    if (status) {
      feedbacks = feedbacks.filter(f => f.status === status);
    }

    // Filter by display status if provided
    if (isDisplayed !== null && isDisplayed !== undefined) {
      feedbacks = feedbacks.filter(f => f.isDisplayed === (isDisplayed === 'true'));
    }

    return NextResponse.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectId,
      bookingId,
      clientName,
      clientEmail,
      rating,
      title,
      comment,
      mediaUrls,
      mediaPublicIds,
    } = body;

    // Validate required fields
    if (!clientName || !clientEmail || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newFeedback: Feedback = {
      id: crypto.randomUUID(),
      projectId,
      bookingId,
      clientName,
      clientEmail,
      rating,
      title,
      comment,
      mediaUrls: mediaUrls || [],
      mediaPublicIds: mediaPublicIds || [],
      status: 'pending',
      isDisplayed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockDb.feedbacks.push(newFeedback);

    return NextResponse.json({
      success: true,
      data: newFeedback,
      message: 'Feedback created successfully',
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json(
      { error: 'Failed to create feedback' },
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
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    const index = mockDb.feedbacks.findIndex(f => f.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    const updatedFeedback = {
      ...mockDb.feedbacks[index],
      ...updates,
      updatedAt: new Date(),
    };

    mockDb.feedbacks[index] = updatedFeedback;

    return NextResponse.json({
      success: true,
      data: updatedFeedback,
      message: 'Feedback updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update feedback' },
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
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    const index = mockDb.feedbacks.findIndex(f => f.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    mockDb.feedbacks.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete feedback' },
      { status: 500 }
    );
  }
}
