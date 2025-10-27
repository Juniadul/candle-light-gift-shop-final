import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const createdAt = ninetyDaysAgo.toISOString();

    const sampleCategories = [
        {
            name: 'All Products',
            slug: 'all-products',
            displayOrder: 0,
            createdAt: createdAt,
        },
        {
            name: 'Paper Invitations',
            slug: 'paper-invitations',
            displayOrder: 1,
            createdAt: createdAt,
        },
        {
            name: 'Acrylic Invitations',
            slug: 'acrylic-invitations',
            displayOrder: 2,
            createdAt: createdAt,
        },
        {
            name: 'Semi-transparent',
            slug: 'semi-transparent',
            displayOrder: 3,
            createdAt: createdAt,
        },
        {
            name: 'Favor Boxes',
            slug: 'favor-boxes',
            displayOrder: 4,
            createdAt: createdAt,
        },
        {
            name: 'Goody Bags',
            slug: 'goody-bags',
            displayOrder: 5,
            createdAt: createdAt,
        },
        {
            name: 'Accessories',
            slug: 'accessories',
            displayOrder: 6,
            createdAt: createdAt,
        },
        {
            name: 'Dala',
            slug: 'dala',
            displayOrder: 7,
            createdAt: createdAt,
        },
        {
            name: 'Gift Envelopes',
            slug: 'gift-envelopes',
            displayOrder: 8,
            createdAt: createdAt,
        },
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});