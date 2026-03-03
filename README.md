# Purple Portfolio - Photos & Video Graphics Designer

A stunning, modern portfolio website with a dreamy purple gradient aesthetic, glassmorphism effects, animated particles, and full user/admin functionality.

## 🎨 Design Features

- **Dreamy Purple Gradient**: Soft purple to lavender gradient background
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Animated Particles**: Floating sparkles throughout the page
- **Glowing Ring Animation**: Animated neon ring around hero image
- **Smooth Animations**: Scroll-triggered reveals and hover effects

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Page sections
│   │   ├── ParticleBackground.tsx
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Booking.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── admin/              # Admin dashboard
│   │   └── page.tsx
│   ├── api/                # API routes
│   │   ├── portfolio/
│   │   ├── bookings/
│   │   ├── testimonials/
│   │   └── pricing/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── db.ts               # Database types and mock data
└── public/                 # Static assets
```

## 🎯 Features

### User Section
- Browse portfolio with filterable categories
- View video reel pricing with duration calculator
- Submit testimonials/reviews
- Online booking with calendar and price calculation
- Contact form

### Admin Dashboard
- Analytics overview (bookings, revenue, pending requests)
- Portfolio management (upload, edit, delete items)
- Booking management with status updates
- Pricing management
- Testimonials moderation
- User management

## 🌈 Color Palette

- **Primary Gradient**: `linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)`
- **Accent Purple**: `#7C3AED`
- **Dark Text**: `#1F2937`
- **Light Text**: `#6B7280`
- **Glass White**: `rgba(255, 255, 255, 0.2)`

## 📱 Responsive Breakpoints

- **Desktop**: 1440px+ (full layout)
- **Laptop**: 1024px (adjusted spacing)
- **Tablet**: 768px (2-column stats, stacked hero)
- **Mobile**: 375px (single column, hamburger menu)

## 🔧 Configuration

The site is configured for static export with:
- `output: 'export'`
- `distDir: 'dist'`
- Unoptimized images for static hosting

## 📝 API Routes

- `GET /api/portfolio` - List all portfolio items
- `POST /api/bookings` - Create new booking
- `GET /api/testimonials` - List testimonials
- `GET /api/pricing` - Get pricing plans

## 🚦 Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:3000` in your browser

## 🎨 Customization

To add your own images:
1. Replace placeholder divs in components with actual `<Image>` components
2. Add images to the `public/` folder
3. Update image paths in component files

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Credits

Created with Next.js, Tailwind CSS, and Framer Motion.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
