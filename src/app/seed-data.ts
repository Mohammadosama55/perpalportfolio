// Sample data seeder for testing the admin dashboard
// Run this once to populate test data

const API_BASE = 'http://localhost:3000/api';

async function seedFeedbacks() {
  const feedbacks = [
    {
      clientName: 'Emily Johnson',
      clientEmail: 'emily@example.com',
      rating: 5,
      title: 'Absolutely Stunning Work!',
      comment: 'The video editing was beyond my expectations. Every detail was perfect and the final product brought tears to my eyes. Highly recommend!',
      status: 'approved' as const,
      isDisplayed: true,
    },
    {
      clientName: 'Michael Chen',
      clientEmail: 'michael@example.com',
      rating: 5,
      title: 'Professional and Creative',
      comment: 'Amazing attention to detail and incredible creativity. The graphics added such a nice touch to our wedding video.',
      status: 'approved' as const,
      isDisplayed: true,
    },
    {
      clientName: 'Sarah Williams',
      clientEmail: 'sarah@example.com',
      rating: 4,
      title: 'Great Experience',
      comment: 'Very professional service and quick turnaround. The photos were beautiful, though I wished we had a few more edits.',
      status: 'pending' as const,
      isDisplayed: false,
    },
    {
      clientName: 'David Martinez',
      clientEmail: 'david@example.com',
      rating: 5,
      title: 'Best Investment Ever',
      comment: 'Worth every penny! The 4K quality and motion graphics made our corporate video stand out. Will definitely work together again.',
      status: 'approved' as const,
      isDisplayed: true,
    },
  ];

  console.log('Seeding feedbacks...');
  for (const feedback of feedbacks) {
    try {
      const response = await fetch(`${API_BASE}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await response.json();
      console.log('✅ Added:', data.data?.title);
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
}

async function seedVideoPayments() {
  const payments = [
    {
      clientName: 'Jessica Taylor',
      clientEmail: 'jessica@example.com',
      videoTitle: 'Wedding Highlights Reel',
      duration: 240, // 4 minutes
      quality: '4K' as const,
      price: 800,
      paymentStatus: 'paid' as const,
      status: 'delivered' as const,
    },
    {
      clientName: 'Robert Anderson',
      clientEmail: 'robert@example.com',
      videoTitle: 'Corporate Brand Video',
      duration: 120, // 2 minutes
      quality: 'HD' as const,
      price: 450,
      paymentStatus: 'paid' as const,
      status: 'completed' as const,
    },
    {
      clientName: 'Amanda White',
      clientEmail: 'amanda@example.com',
      videoTitle: 'Birthday Celebration',
      duration: 180, // 3 minutes
      quality: 'HD' as const,
      price: 300,
      paymentStatus: 'pending' as const,
      status: 'processing' as const,
    },
    {
      clientName: 'Christopher Lee',
      clientEmail: 'chris@example.com',
      videoTitle: 'Music Video Production',
      duration: 300, // 5 minutes
      quality: '4K' as const,
      price: 1200,
      paymentStatus: 'paid' as const,
      status: 'delivered' as const,
    },
    {
      clientName: 'Jennifer Brown',
      clientEmail: 'jennifer@example.com',
      videoTitle: 'Real Estate Tour',
      duration: 90, // 1.5 minutes
      quality: 'SD' as const,
      price: 200,
      paymentStatus: 'pending' as const,
      status: 'pending' as const,
    },
  ];

  console.log('Seeding video payments...');
  for (const payment of payments) {
    try {
      const response = await fetch(`${API_BASE}/video-payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      });
      const data = await response.json();
      console.log('✅ Added:', data.data?.videoTitle);
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
}

async function runSeeder() {
  console.log('🌱 Starting data seeder...\n');
  
  await seedFeedbacks();
  console.log('\n---\n');
  await seedVideoPayments();
  
  console.log('\n✅ Seeding complete!');
  console.log('Refresh the admin dashboard to see the data.');
}

// Export for use in browser console or Node.js
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('📊 Data Seeder Loaded');
  console.log('Run: await runSeeder() to populate test data');
  (window as any).seedData = runSeeder;
} else {
  // Node.js environment
  runSeeder();
}

export { runSeeder, seedFeedbacks, seedVideoPayments };
