// API route for managing admin profile
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db';
import { dbOperations } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

// GET - Fetch admin profile
export async function GET() {
  try {
    // Try to fetch from MongoDB first
    try {
      const mongoProfile = await dbOperations.adminProfiles.findOne({ id: 'admin' });
      if (mongoProfile) {
        return NextResponse.json({
          success: true,
          data: mongoProfile,
        });
      }
    } catch (mongoError) {
      console.log('MongoDB not available, using mock DB');
    }

    // Fallback to mock DB
    const mockProfile = mockDb.adminProfiles.find(p => p.id === 'admin');
    if (mockProfile) {
      return NextResponse.json({
        success: true,
        data: mockProfile,
      });
    }

    // Return default profile if none exists
    const defaultProfile = {
      id: 'admin',
      name: 'Admin',
      email: 'admin@portfolio.com',
      profileImage: '',
      bio: 'Portfolio Administrator',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: defaultProfile,
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin profile' },
      { status: 500 }
    );
  }
}

// PUT - Update admin profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, profileImage, bio } = body;

    const updatedProfile = {
      id: 'admin',
      name: name || 'Admin',
      email: email || 'admin@portfolio.com',
      profileImage: profileImage || '',
      bio: bio || 'Portfolio Administrator',
      updatedAt: new Date(),
    };

    // Update in MongoDB
    try {
      await dbOperations.adminProfiles.update('admin', updatedProfile);
      console.log('✅ Admin profile updated in MongoDB');
    } catch (mongoError) {
      console.log('MongoDB update failed, updating mock DB');
      // Update in mock DB
      const mockIndex = mockDb.adminProfiles.findIndex(p => p.id === 'admin');
      if (mockIndex >= 0) {
        mockDb.adminProfiles[mockIndex] = updatedProfile;
      } else {
        mockDb.adminProfiles.push(updatedProfile);
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    return NextResponse.json(
      { error: 'Failed to update admin profile' },
      { status: 500 }
    );
  }
}
