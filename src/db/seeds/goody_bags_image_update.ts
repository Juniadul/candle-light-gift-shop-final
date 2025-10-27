import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const imageUrl = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-product-photography-of-eleg-33492e4c-20251027190912.jpg';
    
    await db.update(products)
        .set({
            image: imageUrl,
            updated_at: new Date().toISOString(),
        })
        .where(eq(products.category, 'Goody Bags'));
    
    const updatedProducts = await db.select()
        .from(products)
        .where(eq(products.category, 'Goody Bags'));
    
    const count = updatedProducts.length;
    
    console.log(`✅ Successfully updated ${count} Goody Bags products with new image`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});