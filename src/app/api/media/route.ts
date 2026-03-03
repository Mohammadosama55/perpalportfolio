// API route for fetching media assets from MongoDB
import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/lib/mongodb';
import { mockDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const isDisplayed = searchParams.get('isDisplayed');

    // Try MongoDB first
    try {
      let filter: any = {};
      
      if (category) {
        filter.category = category;
      }
      
      if (isDisplayed !== null && isDisplayed !== undefined) {
        filter.isDisplayed = isDisplayed === 'true';
      }

      const mediaAssets = await dbOperations.mediaAssets.getAll(filter);
      
      // Convert MongoDB IDs to strings for JSON serialization
      const formattedMedia = mediaAssets.map((item: any) => ({
        ...item,
        _id: item._id.toString(),
        id: item._id.toString(),
      }));

      return NextResponse.json({
        success: true,
        data: formattedMedia,
        source: 'mongodb',
      });
    } catch (mongoError) {
      console.warn('MongoDB error, falling back to mock DB:', mongoError);
      
      // Fallback to mock DB
      let media = mockDb.mediaAssets;
      
      if (category) {
        media = media.filter(m => 'category' in m && (m as any).category === category);
      }
      
      if (isDisplayed === 'true') {
        media = media.filter(m => 'isDisplayed' in m ? (m as any).isDisplayed !== false : true);
      }
      
      return NextResponse.json({
        success: true,
        data: media,
        source: 'mockdb',
      });
    }
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media assets', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
