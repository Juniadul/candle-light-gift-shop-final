import { db } from '@/db';
import { heroSlides } from '@/db/schema';

async function main() {
    await db.delete(heroSlides);

    const sampleSlides = [
        {
            title: 'Premium Collections',
            subtitle: 'Elegant Wedding Invitations',
            description: 'Discover our exquisite collection of custom wedding invitations crafted with love and attention to detail',
            image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&h=1080&fit=crop',
            buttonText: 'View Collections',
            buttonLink: '/products',
            displayOrder: 1,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Special Occasions',
            subtitle: 'Gifts That Create Memories',
            description: 'From birthdays to anniversaries, find the perfect gift that speaks from the heart',
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&h=1080&fit=crop',
            buttonText: 'Shop Gifts',
            buttonLink: '/products',
            displayOrder: 2,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Custom Invitations',
            subtitle: 'Your Story, Beautifully Told',
            description: 'Let us help you create personalized invitations that perfectly capture your special moments',
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop',
            buttonText: 'Start Designing',
            buttonLink: '/contact',
            displayOrder: 3,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Free Shipping',
            subtitle: 'Orders Over 100 Pieces',
            description: 'Get free shipping on bulk orders - perfect for weddings, corporate events, and special celebrations',
            image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=1920&h=1080&fit=crop',
            buttonText: 'Order Now',
            buttonLink: '/products',
            displayOrder: 4,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(heroSlides).values(sampleSlides);
    
    console.log('✅ Hero slides seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});