import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const categoryImageUpdates = [
        {
            slug: 'all-products',
            imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'
        },
        {
            slug: 'paper-invitations',
            imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80'
        },
        {
            slug: 'acrylic-invitations',
            imageUrl: 'https://images.unsplash.com/photo-1543931828-f5e436e44bc1?w=800&q=80'
        },
        {
            slug: 'semi-transparent',
            imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80'
        },
        {
            slug: 'favor-boxes',
            imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80'
        },
        {
            slug: 'goody-bags',
            imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
        },
        {
            slug: 'accessories',
            imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80'
        },
        {
            slug: 'dala',
            imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80'
        },
        {
            slug: 'gift-envelopes',
            imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80'
        }
    ];

    let updatedCount = 0;

    for (const update of categoryImageUpdates) {
        await db
            .update(categories)
            .set({ 
                imageUrl: update.imageUrl 
            })
            .where(eq(categories.slug, update.slug));
        
        updatedCount++;
    }

    console.log(`✅ Categories images seeder completed successfully - Updated ${updatedCount} categories`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});