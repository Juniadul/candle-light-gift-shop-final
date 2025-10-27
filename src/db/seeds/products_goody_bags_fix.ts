import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const currentTimestamp = new Date().toISOString();

    // Product image updates for Goody Bags category
    const productUpdates = [
        {
            name: 'Silk Drawstring Goody Bag',
            image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80',
        },
        {
            name: 'Organza Gift Bag',
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
        },
        {
            name: 'Burlap Favor Pouch',
            image: 'https://images.unsplash.com/photo-1621782311038-16c7789e3255?w=800&q=80',
        },
        {
            name: 'Velvet Drawstring Bag',
            image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
        },
        {
            name: 'Cotton Canvas Tote Bag',
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
        },
    ];

    for (const product of productUpdates) {
        await db
            .update(products)
            .set({
                image: product.image,
                updated_at: currentTimestamp,
            })
            .where(eq(products.name, product.name));
        
        console.log(`✅ Updated image for: ${product.name}`);
    }

    console.log('✅ Goody Bags products seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});