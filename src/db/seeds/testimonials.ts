import { db } from '@/db';
import { testimonials } from '@/db/schema';

async function main() {
    // Delete all existing testimonials first
    await db.delete(testimonials);
    
    const sampleTestimonials = [
        {
            name: 'Fatima Rahman',
            role: 'Bride, Dhaka - June 2024',
            content: 'The acrylic invitations were absolutely stunning! Our guests were amazed by the quality and elegant design. The team perfectly captured our vision and delivered on time for our holud ceremony. The custom calligraphy work was exceptional. Highly recommend for anyone looking for premium wedding invitations in Dhaka!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2024-06-15').toISOString(),
        },
        {
            name: 'Nusrat Jahan',
            role: 'Bride, Chittagong - April 2024',
            content: 'I ordered paper invitations with custom designs for my wedding reception and they exceeded all expectations. The attention to detail was remarkable, and the traditional Bengali motifs were beautifully incorporated. Our families in Chittagong loved them so much that many guests kept them as keepsakes. Worth every taka!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2024-04-20').toISOString(),
        },
        {
            name: 'Ayesha Siddique',
            role: 'Event Planner, Gulshan - March 2024',
            content: 'As an event planner in Gulshan, I've worked with many invitation vendors, but this shop stands out. Their acrylic and paper invitation collections are top-notch. The quality is consistently excellent and clients always appreciate the sophisticated designs. Perfect for upscale weddings in Banani and Dhanmondi areas.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2024-03-10').toISOString(),
        },
        {
            name: 'Rubina Khan',
            role: 'Bride, Sylhet - January 2024',
            content: 'The custom design service made our mehndi invitations truly special. They incorporated our family crest and created a unique color palette that matched our wedding theme perfectly. Beautiful quality, professional service, and delivered all the way to Sylhet without any issues. Our guests loved them and kept asking where we got them made!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2024-01-25').toISOString(),
        },
        {
            name: 'Taslima Begum',
            role: 'Bride, Dhaka - December 2023',
            content: 'I was worried about finding quality invitations for our winter wedding, but this shop delivered beyond expectations. The acrylic invitations looked luxurious and the paper quality was premium. They helped us design invitations that reflected both traditional Bengali culture and modern elegance. Highly recommend for brides in Dhaka looking for something special!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2023-12-18').toISOString(),
        },
        {
            name: 'Sakina Ahmed',
            role: 'Bride, Rajshahi - November 2023',
            content: 'Outstanding service from start to finish! The team listened to our requirements and created beautiful custom paper invitations for our wedding reception. The printing quality was flawless and the traditional Bengali patterns were elegantly designed. Even though we're based in Rajshahi, the delivery was smooth and on time. Our guests loved them!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
            is_featured: true,
            created_at: new Date('2023-11-22').toISOString(),
        },
    ];

    await db.insert(testimonials).values(sampleTestimonials);
    
    console.log('✅ Testimonials seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});