import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const timestamp = new Date().toISOString();
    
    // Paper Invitations Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-wedding-invitation-card-with-pur-52654b08-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Elegant Floral Border Invitation'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/classic-wedding-invitation-with-red-rose-345d39c6-20251027185501.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Modern Minimalist Card'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxury-royal-purple-wedding-invitation-s-5b60e953-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Vintage Lace Pattern Invitation'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/modern-wedding-invitation-with-blue-bota-b4a506ee-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Botanical Greenery Suite'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/stunning-wedding-invitation-with-crimson-3f510bdf-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Royal Blue and Gold Invitation'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/sophisticated-royal-blue-wedding-invitat-571b2908-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Rustic Kraft Paper Card'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-wedding-invitation-card-with-pur-52654b08-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Blush Pink Watercolor Suite'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/classic-wedding-invitation-with-red-rose-345d39c6-20251027185501.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Monogram Elegance Card'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/modern-wedding-invitation-with-blue-bota-b4a506ee-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Geometric Modern Suite'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/sophisticated-royal-blue-wedding-invitat-571b2908-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Timeless Classic White Card'));

    // Acrylic Invitations Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/modern-clear-acrylic-wedding-invitation--ab48345b-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Rose Gold Acrylic Card'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/frosted-acrylic-wedding-invitation-with--0fed2721-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Clear Acrylic with Gold Foil'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-clear-acrylic-invitation-with-re-731c1f1a-20251027185505.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Frosted Acrylic Suite'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-purple-design-on-clear-acrylic-w-775f6673-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Minimalist Clear Acrylic'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/modern-clear-acrylic-wedding-invitation--ab48345b-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Floral Acrylic Design'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/frosted-acrylic-wedding-invitation-with--0fed2721-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Marble Effect Acrylic'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-clear-acrylic-invitation-with-re-731c1f1a-20251027185505.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Black and White Acrylic'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-purple-design-on-clear-acrylic-w-775f6673-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Hexagon Shaped Acrylic'));

    // Semi-transparent Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/delicate-vellum-overlay-wedding-invitati-d699f0f3-20251027185534.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Frosted Vellum Overlay'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/semi-transparent-wedding-invitation-card-f799d2a0-20251027185533.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Translucent Pearl Vellum'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/frosted-semi-transparent-wedding-invitat-b1a89eec-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Botanical Vellum Wrap'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-vellum-wedding-invitation-with-g-21492e68-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Lace Pattern Vellum'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/delicate-vellum-overlay-wedding-invitati-d699f0f3-20251027185534.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Watercolor Vellum Suite'));

    // Favor Boxes Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-purple-gift-box-with-gold-ribbon-b08e82c3-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Pearl White Favor Box'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxurious-royal-blue-favor-box-with-cust-e7eee24c-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Kraft Pillow Box'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-red-velvet-finish-favor-box-wedd-05255ccf-20251027185501.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Gold Foil Cube Box'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/white-favor-box-with-gold-ribbon-and-det-4cf3ab8c-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Clear Window Favor Box'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-purple-gift-box-with-gold-ribbon-b08e82c3-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Vintage Lace Pattern Box'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxurious-royal-blue-favor-box-with-cust-e7eee24c-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Rose Gold Drawer Box'));

    // Goody Bags Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/stylish-purple-goody-bag-with-handles-we-387f21b0-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Silk Drawstring Goody Bag'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/classic-blue-and-white-striped-favor-bag-7f3c0aa9-20251027185459.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Organza Gift Bag'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxury-red-goody-bag-with-gold-accents-p-02f25c03-20251027185459.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Burlap Favor Pouch'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-royal-purple-gift-bag-with-satin-c3f46f61-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Velvet Drawstring Bag'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/stylish-purple-goody-bag-with-handles-we-387f21b0-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Cotton Canvas Tote Bag'));

    // Accessories Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxury-wax-seal-kit-with-gold-wax-sticks-584c787e-20251027185459.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Wax Seal Stickers - Gold'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/assorted-purple-satin-ribbons-for-weddin-6a4b3e3c-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Satin Ribbon Roll'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/handmade-royal-blue-silk-tassels-wedding-a5aaff48-20251027185505.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Pearl Embellishment Pack'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/delicate-crimson-red-rose-embellishments-62dc8fce-20251027185534.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Decorative Envelope Liners'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/premium-gold-foil-paper-sheets-metallic--05c191be-20251027185503.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Belly Band Kit - Assorted'));

    // Dala Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/ornate-royal-purple-decorative-dala-plat-52c84cb0-20251027185504.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Handcrafted Mehndi Dala'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/elegant-royal-blue-dala-with-gold-artwor-b2810222-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Royal Gold Dala Set'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/traditional-crimson-red-dala-with-intric-cd426bf1-20251027185500.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Floral Garden Dala'));

    // Gift Envelopes Updates
    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/luxurious-purple-silk-fabric-envelope-fo-63a9b21e-20251027185534.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Embossed Gift Envelope'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/traditional-royal-blue-money-envelope-we-bcd5ae19-20251027185535.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Gold Foil Gift Envelope'));

    await db.update(products)
        .set({ 
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/crimson-red-envelope-with-gold-trim-deta-8b4b2723-20251027185502.jpg',
            updated_at: timestamp 
        })
        .where(eq(products.name, 'Lace Pattern Gift Envelope'));

    console.log('✅ Products image updates completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});