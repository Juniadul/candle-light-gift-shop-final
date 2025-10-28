import { db } from '@/db';
import { heroSlides } from '@/db/schema';

async function main() {
    // Delete all existing records first
    await db.delete(heroSlides);

    const sampleHeroSlides = [
        {
            title: 'Premium Collections',
            subtitle: 'Elegant Wedding Invitations',
            description: 'Discover our exquisite collection of handcrafted wedding invitations and gifts',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            buttonText: 'Shop Collections',
            buttonLink: '/products',
            displayOrder: 1,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Special Occasions',
            subtitle: 'Gifts That Create Memories',
            description: 'From birthdays to anniversaries, find the perfect gift for every celebration',
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200',
            buttonText: 'Browse Gifts',
            buttonLink: '/products',
            displayOrder: 2,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Custom Invitations',
            subtitle: 'Your Story, Beautifully Told',
            description: 'Personalized invitations that make your special moments unforgettable',
            image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200',
            buttonText: 'Customize Now',
            buttonLink: '/contact',
            displayOrder: 3,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Free Shipping',
            subtitle: 'Orders Over 100 Pieces',
            description: 'Get free delivery on bulk orders. Perfect for weddings and large events',
            image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1200',
            buttonText: 'Learn More',
            buttonLink: '/products',
            displayOrder: 4,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(heroSlides).values(sampleHeroSlides);
    
    console.log('✅ Hero slides seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});