# Admin Dashboard Setup & Testing Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
The `.env.local` file is already created with your Cloudinary credentials:
- Cloud Name: `dqyt9wbj8`
- API Key: `291175571482267`
- API Secret: `RfBuxJSmjR36VhopTO-w-kvJsP8`

⚠️ **Keep this file private!** It's gitignored by default.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Admin Dashboard
Open your browser to: `http://localhost:3000/admin`

---

## What's Been Fixed

### Issue: API Routes Not Working
**Problem**: Static export configuration prevented API routes from working.

**Solution**: 
- Changed `output: 'export'` → `output: 'standalone'` in `next.config.ts`
- Added `export const dynamic = 'force-dynamic'` to all API routes
- Disabled trailing slashes for cleaner URLs

### Files Updated:
1. ✅ `next.config.ts` - Changed to standalone mode
2. ✅ `src/app/api/upload/route.ts` - Added dynamic export
3. ✅ `src/app/api/feedbacks/route.ts` - Added dynamic export
4. ✅ `src/app/api/video-payments/route.ts` - Added dynamic export
5. ✅ `.gitignore` - Added .env files for security

---

## Testing Checklist

### Test 1: Media Upload ⭐
1. Go to `/admin`
2. Click "Media Upload" in sidebar
3. Click "Select File"
4. Choose an image or video
5. Click "Upload Now"
6. ✅ Should see progress bar and success message

### Test 2: Feedback Management ⭐
1. Go to `/admin`
2. Click "Feedbacks" in sidebar
3. ✅ Should see feedback list (empty initially)
4. Add sample data via API or UI

### Test 3: Video Payments ⭐
1. Go to `/admin`
2. Click "Video Payments" in sidebar
3. ✅ Should see payment table (empty initially)
4. Stats should show $0 revenue

---

## Sample Data for Testing

### Add Sample Feedback (via API)
```javascript
// Run in browser console or Postman
fetch('/api/feedbacks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    rating: 5,
    title: 'Amazing Work!',
    comment: 'Absolutely loved the final product. The quality exceeded my expectations!'
  })
})
.then(r => r.json())
.then(console.log);
```

### Add Sample Video Payment (via API)
```javascript
fetch('/api/video-payments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientName: 'Sarah Smith',
    clientEmail: 'sarah@example.com',
    videoTitle: 'Wedding Highlights',
    duration: 180, // 3 minutes
    quality: '4K',
    price: 500
  })
})
.then(r => r.json())
.then(console.log);
```

---

## Features Overview

### 📤 Media Upload (Cloudinary)
- **Supports**: Images (JPG, PNG, WebP) and Videos (MP4, MOV)
- **Max Size**: 10MB on free tier
- **Quality**: Auto-optimized up to 4K
- **Storage**: Cloudinary cloud storage
- **CDN**: Fast delivery worldwide

### 💬 Feedback Management
- **Show/Hide Control**: Toggle visibility on public site
- **Status Workflow**: Pending → Approved → Rejected → Archived
- **Rating System**: 1-5 stars
- **Moderation**: Full control over displayed content

### 💰 Video Payment Tracking
- **Payment Status**: Pending, Paid, Refunded, Cancelled
- **Delivery Status**: Pending, Processing, Completed, Delivered
- **Quality Tiers**: SD, HD, 4K
- **Revenue Analytics**: Real-time calculations

---

## Troubleshooting

### Upload Still Fails?
1. Check if server is running: `npm run dev`
2. Verify Cloudinary credentials in `.env.local`
3. Check browser console for errors
4. Try smaller file (< 10MB)

### API Returns 500 Error?
1. Restart development server
2. Clear Next.js cache: `rm -rf .next`
3. Check terminal for error messages
4. Verify API route files exist

### Page Shows Errors?
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check browser DevTools Console
4. Verify no TypeScript errors

---

## Production Deployment

When ready for production:

### Option 1: Vercel (Recommended)
```bash
vercel deploy
```
- Automatic API route handling
- Built-in Cloudinary integration
- Zero configuration needed

### Option 2: Netlify
Already configured with `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Option 3: Custom Server
```bash
npm run build
npm start
```
Requires Node.js server running.

---

## Security Best Practices

### Before Going Live:
1. ✅ Add authentication middleware
2. ✅ Implement rate limiting
3. ✅ Validate all file uploads
4. ✅ Use HTTPS only
5. ✅ Rotate Cloudinary API keys
6. ✅ Backup database regularly

### Recommended Auth:
- NextAuth.js for login system
- JWT tokens for API protection
- Role-based access control

---

## Next Steps

### Phase 1: Database Integration
- [ ] Replace mockDb with PostgreSQL/MongoDB
- [ ] Add Prisma ORM for type safety
- [ ] Create migration scripts

### Phase 2: Enhanced Features
- [ ] Rich text editor for responses
- [ ] Drag-and-drop file upload
- [ ] Bulk actions (delete multiple)
- [ ] Export to CSV/PDF
- [ ] Email notifications

### Phase 3: Advanced Media
- [ ] Video player with controls
- [ ] Image gallery with lightbox
- [ ] Before/after slider
- [ ] Video transcoding options

---

## Support

If you encounter issues:
1. Check this guide first
2. Review error logs in terminal
3. Inspect browser DevTools
4. Test API endpoints directly

**All systems are now configured and ready to go! 🚀**

Run `npm run dev` and visit `http://localhost:3000/admin` to start testing.
