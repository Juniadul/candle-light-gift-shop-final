import { db } from '@/db';
import { testimonials } from '@/db/schema';

async function main() {
    const sampleTestimonials = [
        {
            name: 'Ayesha & Karim Rahman',
            role: 'Bride & Groom, Dhaka - June 2024',
            content: 'আমাদের বিবাহের দাওয়াত কার্ডগুলো সত্যিই অসাধারণ হয়েছে! The quality was absolutely stunning and we received so many compliments from our guests. ডিজাইন এবং কাগজের মান দেখে সবাই মুগ্ধ হয়েছে। The team was incredibly professional and understood exactly what we wanted for our Bengali wedding. They perfectly blended traditional motifs with modern elegance. Highly recommended for anyone planning a wedding in Bangladesh!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
            isFeatured: true,
            createdAt: new Date('2024-06-20').toISOString(),
        },
        {
            name: 'Fatima Begum',
            role: 'Bride, Chittagong - March 2024',
            content: 'The custom acrylic invitations were absolutely breathtaking! আমি এমন কিছু চাইছিলাম যা আধুনিক এবং ইউনিক, এবং তারা আমার কল্পনার চেয়েও সুন্দর করে দিয়েছে। The design process was smooth and they really listened to my vision. আমাদের সব মেহমান কার্ড দেখে মুগ্ধ হয়েছেন। The attention to detail was exceptional. I highly recommend Candle Light Gift Shop to all brides in Bangladesh!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
            isFeatured: true,
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            name: 'Nusrat Jahan',
            role: 'Event Planner, Gulshan',
            content: 'As a professional event planner in Dhaka, I have worked with Candle Light Gift Shop on multiple weddings and they never disappoint. তাদের কাজের মান সবসময় উচ্চমানের এবং তারা সময়মতো ডেলিভারি দেয়। Whether it is traditional Bengali wedding cards or modern designs, they execute flawlessly. My clients are always thrilled with their invitations. বাংলাদেশের যেকোনো ইভেন্টের জন্য আমি তাদের সার্ভিস highly recommend করি!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            isFeatured: true,
            createdAt: new Date('2024-04-10').toISOString(),
        },
        {
            name: 'Sadia & Rizwan Ahmed',
            role: 'Couple, Sylhet - December 2023',
            content: 'We are so grateful for the beautiful mehndi dala and favor boxes they created for our holud ceremony! আমাদের বাঙালি ঐতিহ্য এবং সংস্কৃতিকে তারা খুব সুন্দরভাবে কার্ডে তুলে ধরেছে। Each piece was crafted with such care and our families were moved by how beautifully everything was done. The presentation was absolutely stunning. বাংলাদেশের traditional ceremonies এর জন্য perfect! Highly recommended for all Bengali weddings!',
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