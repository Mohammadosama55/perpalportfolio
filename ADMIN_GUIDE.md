# Admin Dashboard - Complete Guide

## Overview

The admin dashboard provides full control over your portfolio with advanced features for media management, feedback control, and video payment tracking, all powered by Cloudinary integration.

## Features Implemented

### 1. **Media Upload (Cloudinary Integration)** ✅
- Upload high-quality images and videos (up to 4K)
- Automatic optimization without quality loss
- CDN delivery for fast loading worldwide
- Support for multiple formats (MP4, MOV, JPG, PNG, WebP)
- Real-time upload progress tracking
- Secure cloud storage

**Cloudinary Credentials:**
- Cloud Name: `dqyt9wbj8`
- API Key: `291175571482267`
- API Secret: `RfBuxJSmjR36VhopTO-w-kvJsP8`

### 2. **Feedback Management System** ✅
- Collect and manage client feedback
- **Show/Hide Control**: Toggle feedback visibility on public site
- **Status Management**: Pending → Approved → Rejected → Archived
- Rating system (1-5 stars)
- Media attachments support
- Admin response capability

**Key Controls:**
- 👁️ Eye icon: Show feedback on public site
- 👁️‍🗨️ Eye-off icon: Hide feedback from public site
- Status dropdown: Change approval status
- Edit/Delete actions

### 3. **Video Payment Tracking** ✅
- Track video editing/rendering payments
- Quality tiers: SD, HD, 4K
- Payment status: Pending, Paid, Refunded, Cancelled
- Delivery status: Pending, Processing, Completed, Delivered
- Duration tracking
- Revenue analytics

**Dashboard Stats:**
- Total payments count
- Paid vs Pending breakdown
- Total revenue calculation
- Quality distribution

### 4. **Enhanced Database Schema**
New models added:
- `VideoPayment`: Track video service payments
- `Feedback`: Client feedback with display controls
- `MediaAsset`: Cloudinary-uploaded media assets

### 5. **API Routes Created**

#### `/api/upload` (POST, GET)
Upload media to Cloudinary
```typescript
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: File (image/video)
- title: string
- description?: string
- folder?: string (default: 'portfolio')
- uploadedBy?: string (default: 'admin')
```

#### `/api/feedbacks` (GET, POST, PUT, DELETE)
Manage feedback entries
```typescript
GET /api/feedbacks?status=approved&isDisplayed=true
POST /api/feedbacks
PUT /api/feedbacks
DELETE /api/feedbacks?id=xxx
```

#### `/api/video-payments` (GET, POST, PUT, DELETE)
Manage video payment tracking
```typescript
GET /api/video-payments
POST /api/video-payments
PUT /api/video-payments
DELETE /api/video-payments?id=xxx
```

## Navigation Structure

### Sidebar Menu Items:
1. **Dashboard** - Overview and statistics
2. **Portfolio** - Portfolio item management
3. **Bookings** - Booking calendar and management
4. **Testimonials** - Client testimonials
5. **Feedbacks** ⭐ - NEW: Feedback control system
6. **Video Payments** ⭐ - NEW: Payment tracking
7. **Media Upload** ⭐ - NEW: Cloudinary upload interface
8. **Pricing** - Pricing plans
9. **Users** - User management

## Usage Guide

### Managing Feedbacks

1. Navigate to **Admin → Feedbacks**
2. View all submitted feedbacks
3. **Show/Hide from Site**:
   - Click 👁️ to show on public testimonials
   - Click 👁️‍🗨️ to hide from public view
4. **Change Status**:
   - Select from dropdown: Pending/Approved/Rejected/Archived
5. **Edit/Delete**: Use action buttons

### Uploading Media

1. Navigate to **Admin → Media Upload**
2. Click "Select File" or drag & drop
3. Choose image or video file
4. Click "Upload Now"
5. Wait for progress bar to complete
6. File is stored in Cloudinary and database

### Tracking Video Payments

1. Navigate to **Admin → Video Payments**
2. View all payment records
3. Filter by status or quality
4. Update payment/delivery status
5. Download invoice or delete records

## Environment Setup

Create `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dqyt9wbj8
NEXT_PUBLIC_CLOUDINARY_API_KEY=291175571482267
CLOUDINARY_API_SECRET=RfBuxJSmjR36VhopTO-w-kvJsP8

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Technical Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Framer Motion, Tailwind CSS, Lucide Icons
- **Storage**: Cloudinary (images & videos)
- **State**: React Hooks (useState, useEffect)
- **API**: Next.js App Router API routes

## Data Flow

```
User Action → API Route → Cloudinary → Response → Database → UI Update
     ↓
File Upload → /api/upload → Cloudinary CDN → URL → MediaAsset → Display
Feedback → /api/feedbacks → Database → Status Update → Toggle Display
Payment → /api/video-payments → Database → Analytics → Dashboard
```

## Security Notes

⚠️ **IMPORTANT**: 
- Keep `CLOUDINARY_API_SECRET` private (server-side only)
- Use `NEXT_PUBLIC_` prefix only for client-safe keys
- Implement authentication before deploying to production
- Add rate limiting for upload endpoints

## Future Enhancements

- [ ] Authentication/Authorization for admin access
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Bulk upload functionality
- [ ] Advanced filtering and search
- [ ] Export analytics to CSV/PDF
- [ ] Email notifications for new feedbacks
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Video preview player
- [ ] Before/after comparison slider

## Accessing the Dashboard

1. Start development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/admin`

3. Default view shows Dashboard with stats
4. Use sidebar to navigate between sections

## Component Architecture

```
admin/page.tsx (Main Container)
├── Sidebar (Navigation)
├── Header (User info, collapse sidebar)
└── Content Area
    ├── Dashboard Tab
    ├── Portfolio Tab
    ├── Bookings Tab
    ├── Testimonials Tab
    ├── Feedbacks Tab ← NEW
    │   ├── Stats Cards
    │   ├── Feedback List
    │   └── Toggle/Status Controls
    ├── Video Payments Tab ← NEW
    │   ├── Revenue Stats
    │   └── Payment Table
    └── Media Upload Tab ← NEW
        └── Upload Interface
```

## API Response Examples

### Upload Success Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "video.mp4",
    "publicId": "portfolio/video_hash",
    "url": "https://res.cloudinary.com/...",
    "resourceType": "video",
    "bytes": 12345678,
    "duration": 120
  }
}
```

### Feedback Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "clientName": "John Doe",
      "rating": 5,
      "title": "Amazing Work!",
      "comment": "Excellent service...",
      "status": "approved",
      "isDisplayed": true
    }
  ]
}
```

## Troubleshooting

### Upload fails
- Check Cloudinary credentials in `.env.local`
- Verify file size is within limits (free tier: 10MB)
- Ensure proper file format

### Feedback not showing
- Check `isDisplayed` flag is true
- Verify status is "approved"
- Refresh page to fetch latest data

### API errors
- Check terminal for error messages
- Verify API route files exist
- Restart development server

---

**Version**: 1.0  
**Last Updated**: March 4, 2026  
**Status**: ✅ Fully Functional
