import { db } from '@/db';
import { testimonials } from '@/db/schema';

async function main() {
    const sampleTestimonials = [
        {
            name: 'Sarah & Michael Johnson',
            role: 'Bride & Groom, June 2024',
            content: 'Our wedding invitations exceeded all expectations! The quality was absolutely stunning, and we received so many compliments from our guests. The attention to detail was remarkable, from the elegant design to the luxurious paper quality. The team was incredibly professional throughout the entire process, making sure every aspect was perfect. We couldn\'t be happier with how our invitations turned out - they truly set the tone for our special day!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
            isFeatured: true,
            createdAt: new Date('2024-06-20').toISOString(),
        },
        {
            name: 'Aisha Khan',
            role: 'Bride, March 2024',
            content: 'The custom acrylic invitations were absolutely breathtaking! I wanted something modern and unique, and they delivered beyond my imagination. The design process was smooth, and they really listened to my vision. The invitations arrived on time, beautifully packaged, and the attention to detail was exceptional. Every guest was amazed by how elegant and contemporary they looked. I highly recommend their services to any bride looking for something special!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
            isFeatured: true,
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            name: 'Emily Chen',
            role: 'Event Planner',
            content: 'As a professional event planner, I\'ve worked with this company on multiple weddings, and they never disappoint. The quality is consistently outstanding, making them my go-to choice for high-end clients. Their reliability and professionalism are unmatched in the industry. They understand the importance of deadlines and always deliver exceptional results. Whether it\'s traditional or modern designs, they execute flawlessly. My clients are always thrilled with their invitations!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            isFeatured: true,
            createdAt: new Date('2024-04-10').toISOString(),
        },
        {
            name: 'Fatima & Ahmed Ali',
            role: 'Couple, December 2023',
            content: 'We are so grateful for the beautiful traditional mehndi dala and favor boxes they created for our wedding! The cultural authenticity and attention to our traditions were remarkable. Each piece was crafted with such care and respect for our heritage. The presentation was absolutely stunning, and our families were moved by how beautifully everything was done. They truly understand the significance of cultural elements in weddings. Highly recommended for traditional ceremonies!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=400',
            isFeatured: true,
            createdAt: new Date('2023-12-18').toISOString(),
        },
    ];

    await db.insert(testimonials).values(sampleTestimonials);
    
    console.log('✅ Testimonials seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});