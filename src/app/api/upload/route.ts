// API route for uploading media to Cloudinary
import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { mockDb } from '@/lib/db';
import { dbOperations } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const folder = formData.get('folder') as string || 'portfolio';
    const uploadedBy = formData.get('uploadedBy') as string || 'admin';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type
    const resourceType = file.type.startsWith('video/') 
      ? 'video' 
      : file.type.startsWith('image/') 
        ? 'image' 
        : 'raw';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder,
      resource_type: resourceType as 'image' | 'video' | 'raw',
    });

    // Save to MongoDB (auto-save Cloudinary URL)
    try {
      const mongoData = {
        title: title || file.name,
        description,
        publicId: result.public_id,
        url: result.url,
        secureUrl: result.secure_url, // Cloudinary CDN URL
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        duration: result.duration,
        folder,
        tags: [],
        uploadedBy,
        category: resourceType === 'video' ? 'Videos' : resourceType === 'image' ? 'Photos' : 'Other',
        isDisplayed: true, // Automatically display on frontend
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to MongoDB
      await dbOperations.mediaAssets.create(mongoData);
      console.log('✅ Media saved to MongoDB with CDN URL:', result.secure_url);
    } catch (dbError) {
      console.error('MongoDB save error:', dbError);
      // Continue even if MongoDB fails - we still have the Cloudinary upload
    }

    // Also save to mock DB for fallback
    const mediaAsset = {
      id: crypto.randomUUID(),
      title: title || file.name,
      description,
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      resourceType: result.resource_type as 'image' | 'video' | 'raw',
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration,
      folder,
      tags: [],
      uploadedBy,
      createdAt: new Date(),
    };

    mockDb.mediaAssets.push(mediaAsset);

    return NextResponse.json({
      success: true,
      data: mediaAsset,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockDb.mediaAssets,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media assets' },
      { status: 500 }
    );
  }
}
