import { db } from '@/db';
import { heroSlides } from '@/db/schema';

async function main() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const createdDate = thirtyDaysAgo.toISOString();

    const sampleHeroSlides = [
        {
            title: 'Spring Wedding Sale',
            subtitle: 'Save Up to 30% Off',
            description: 'Discover stunning invitation designs for your perfect spring wedding. Premium paper, acrylic, and vellum invitations now on sale.',
            image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80',
            buttonText: 'Shop Sale',
            buttonLink: '/products',
            displayOrder: 0,
            isActive: true,
            createdAt: createdDate,
            updatedAt: createdDate,
        },
        {
            title: 'New Luxury Collection',
            subtitle: 'Elegance Meets Tradition',
            description: 'Introducing our exclusive collection of handcrafted Bengali wedding invitations featuring gold foil accents and traditional calligraphy.',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
            buttonText: 'Explore Collection',
            buttonLink: '/products?category=Paper+Invitations',
            displayOrder: 1,
            isActive: true,
            createdAt: createdDate,
            updatedAt: createdDate,
        },
        {
            title: 'Bespoke Wedding Stationery',
            subtitle: 'Your Vision, Our Craftsmanship',
            description: 'Let our expert designers create custom invitations that perfectly capture your love story. From acrylic to traditional paper designs.',
            image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80',
            buttonText: 'Book Consultation',
            buttonLink: '/appointments',
            displayOrder: 2,
            isActive: true,
            createdAt: createdDate,
            updatedAt: createdDate,
        },
    ];

    await db.insert(heroSlides).values(sampleHeroSlides);
    
    console.log('✅ Hero slides seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});