# MongoDB Integration Setup Guide

## Overview

The system now automatically saves Cloudinary CDN URLs to MongoDB and displays media on the frontend. When you upload images/videos to Cloudinary, the URLs are automatically stored in MongoDB and displayed on your portfolio.

---

## Architecture Flow

```
Upload → Cloudinary → MongoDB → Frontend Display
  ↓        ↓          ↓           ↓
File   Storage    URL Save   Auto Display
```

### Process:
1. **Admin uploads** media via `/admin` → Media Upload tab
2. **Cloudinary stores** the file and returns CDN URL
3. **MongoDB saves** the URL + metadata automatically
4. **Frontend fetches** from MongoDB and displays with lightbox

---

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

#### Step 1: Create Free Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new cluster (M0 Free tier)

#### Step 2: Get Connection String
1. Click "Connect" button
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority
   ```

#### Step 3: Update Environment
Add to `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority
MONGODB_DB_NAME=portfolio_db
```

#### Step 4: Whitelist IP (Important!)
1. In Atlas, go to Network Access
2. Add IP Address
3. For development: `0.0.0.0/0` (allow all)
4. For production: Add your server IP

---

### Option 2: Local MongoDB

#### Step 1: Install MongoDB
**Windows:**
```bash
# Download MongoDB Community Server from:
https://www.mongodb.com/try/download/community
# Install and run as Windows Service
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Step 2: Verify Installation
```bash
mongosh
# Should connect to local MongoDB
```

#### Step 3: Update Environment
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=portfolio_db
```

---

## Testing the Integration

### Test 1: Upload Media
1. Start server: `npm run dev`
2. Go to `http://localhost:3000/admin`
3. Click "Media Upload" tab
4. Select image or video file
5. Click "Upload Now"
6. ✅ Check terminal for: `✅ Media saved to MongoDB with CDN URL: ...`

### Test 2: View on Frontend
1. Go to `http://localhost:3000`
2. Scroll to Portfolio section
3. ✅ Your uploaded media should display automatically
4. Click to view in lightbox

### Test 3: Check MongoDB
```javascript
// Connect to MongoDB
mongosh

// Use database
use portfolio_db

// Query media assets
db.mediaAssets.find().pretty()

// Should see documents like:
{
  "_id": ObjectId("..."),
  "title": "your-file.jpg",
  "publicId": "portfolio/xxx",
  "url": "http://res.cloudinary.com/...",
  "secureUrl": "https://res.cloudinary.com/...",
  "resourceType": "image",
  "category": "Photos",
  "isDisplayed": true,
  "createdAt": ISODate("...")
}
```

---

## Automatic Features

### ✅ Auto-Save to MongoDB
Every upload to Cloudinary automatically triggers MongoDB save:
- Cloudinary CDN URL
- File metadata (size, format, dimensions)
- Category (Photos/Videos/Graphics)
- Display status (auto-set to visible)

### ✅ Auto-Display on Frontend
Portfolio component fetches from MongoDB:
- Shows only `isDisplayed: true` items
- Filters by category
- Real-time updates
- Lightbox viewer included

### ✅ Fallback System
If MongoDB is unavailable:
- Falls back to mock database
- App continues working
- No errors shown to users

---

## Database Schema

### Collection: `mediaAssets`
```javascript
{
  _id: ObjectId,
  title: String,              // File name
  description: String,        // Optional description
  publicId: String,           // Cloudinary public ID
  url: String,                // Cloudinary URL (HTTP)
  secureUrl: String,          // Cloudinary CDN URL (HTTPS) ⭐
  resourceType: String,       // 'image' | 'video' | 'raw'
  format: String,             // 'jpg', 'mp4', etc.
  bytes: Number,              // File size
  width: Number,              // Image/video width
  height: Number,             // Image/video height
  duration: Number,           // Video duration in seconds
  folder: String,             // Cloudinary folder
  category: String,           // 'Photos' | 'Videos' | 'Graphics'
  isDisplayed: Boolean,       // Show on frontend? ⭐
  uploadedBy: String,         // Admin username
  tags: [String],             // Optional tags
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `feedbacks`
```javascript
{
  _id: ObjectId,
  clientName: String,
  clientEmail: String,
  rating: Number,             // 1-5 stars
  title: String,
  comment: String,
  status: String,             // 'pending' | 'approved' | 'rejected'
  isDisplayed: Boolean,       // Show on site? ⭐
  adminResponse: String,      // Your reply
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `videoPayments`
```javascript
{
  _id: ObjectId,
  clientName: String,
  clientEmail: String,
  videoTitle: String,
  videoUrl: String,           // Cloudinary CDN URL ⭐
  duration: Number,
  quality: String,            // 'SD' | 'HD' | '4K'
  price: Number,
  paymentStatus: String,      // 'pending' | 'paid' | etc.
  status: String,             // 'pending' | 'processing' | etc.
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### GET /api/media
Fetch media assets from MongoDB
```javascript
// Get all displayed media
GET /api/media

// Filter by category
GET /api/media?category=Photos

// Get only displayed
GET /api/media?isDisplayed=true
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "secureUrl": "https://res.cloudinary.com/dqyt9wbj8/...",
      "title": "Wedding Video",
      "resourceType": "video",
      "category": "Videos",
      "isDisplayed": true
    }
  ],
  "source": "mongodb"
}
```

### POST /api/upload
Upload to Cloudinary + auto-save to MongoDB
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'My Photo');
formData.append('uploadedBy', 'admin');

fetch('/api/upload', { method: 'POST', body: formData });
```

---

## Troubleshooting

### MongoDB Connection Error
**Error**: `MongoServerError: Authentication failed`
- Check username/password in connection string
- Ensure database user has read/write permissions
- Verify IP whitelist includes your address

### Media Not Displaying
**Check**:
1. Is `isDisplayed` set to `true` in MongoDB?
2. Did upload complete successfully?
3. Check browser console for errors
4. Verify `/api/media` endpoint returns data

### Upload Fails
**Solutions**:
- Check Cloudinary credentials in `.env.local`
- Verify file size < 10MB (free tier limit)
- Check terminal for error details
- Restart MongoDB service

### Performance Issues
**Optimize**:
```javascript
// Add indexes in MongoDB
db.mediaAssets.createIndex({ category: 1, isDisplayed: 1 });
db.mediaAssets.createIndex({ createdAt: -1 });
```

---

## Production Deployment

### Environment Variables (Production)
```env
# MongoDB Atlas (Production Cluster)
MONGODB_URI=mongodb+srv://user:pass@prod-cluster.mongodb.net/portfolio_prod
MONGODB_DB_NAME=portfolio_prod

# Cloudinary (Production)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dqyt9wbj8
NEXT_PUBLIC_CLOUDINARY_API_KEY=291175571482267
CLOUDINARY_API_SECRET=RfBuxJSmjR36VhopTO-w-kvJsP8
```

### Security Best Practices
1. ✅ Use environment-specific databases
2. ✅ Enable MongoDB authentication
3. ✅ Restrict IP whitelist in production
4. ✅ Use SSL/TLS connections
5. ✅ Regular database backups
6. ✅ Monitor connection pool size

---

## Quick Commands

### MongoDB Shell Queries
```javascript
// Count all media
db.mediaAssets.countDocuments()

// Find displayed videos
db.mediaAssets.find({ 
  resourceType: 'video', 
  isDisplayed: true 
})

// Update display status
db.mediaAssets.updateOne(
  { _id: ObjectId("...") },
  { $set: { isDisplayed: false } }
)

// Delete old items
db.mediaAssets.deleteMany({ 
  createdAt: { $lt: new Date('2024-01-01') }
})
```

---

## What's Working Now

✅ **Auto-Save**: Cloudinary URLs → MongoDB  
✅ **Auto-Display**: MongoDB → Frontend Portfolio  
✅ **Fallback**: Mock DB if MongoDB unavailable  
✅ **Lightbox**: Click to view full size  
✅ **Categories**: Photos/Videos filtering  
✅ **Responsive**: Mobile-friendly gallery  

**Next Steps:**
1. Set up MongoDB (Atlas or local)
2. Update `.env.local` with connection string
3. Upload test media via admin panel
4. Visit homepage to see it displayed!

---

**Status**: 🟢 Fully Functional  
**Version**: 2.0 - MongoDB Integrated
