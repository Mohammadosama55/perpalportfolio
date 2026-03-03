// Cloudinary configuration and utilities
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqyt9wbj8',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '291175571482267',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'RfBuxJSmjR36VhopTO-w-kvJsP8',
});

export interface UploadResult {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  allowed_formats?: string[];
  max_file_size?: number;
}

/**
 * Upload file to Cloudinary
 */
export async function uploadToCloudinary(
  file: Buffer,
  options: CloudinaryUploadOptions = {}
): Promise<UploadResult> {
  const {
    folder = 'portfolio',
    resource_type = 'auto',
    allowed_formats,
    max_file_size,
  } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        allowed_formats,
        max_file_size,
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: result?.public_id || '',
            url: result?.url || '',
            secure_url: result?.secure_url || '',
            format: result?.format || '',
            resource_type: result?.resource_type || '',
            bytes: result?.bytes || 0,
            width: result?.width,
            height: result?.height,
            duration: result?.duration,
          });
        }
      }
    );

    uploadStream.end(file);
  });
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

/**
 * Generate Cloudinary video URL with transformations
 */
export function getVideoUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const { width, height, quality = 'auto:good', format = 'mp4' } = options;
  
  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqyt9wbj8'}/video/upload/${transformationString}${publicId}.${format}`;
}

/**
 * Generate Cloudinary image URL with transformations
 */
export function getImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
  } = {}
): string {
  const { 
    width, 
    height, 
    quality = 'auto:good', 
    format = 'webp',
    crop = 'fill'
  } = options;
  
  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (crop) transformations.push(`c_${crop}`);
  
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqyt9wbj8'}/image/upload/${transformationString}${publicId}.${format}`;
}

export default cloudinary;
