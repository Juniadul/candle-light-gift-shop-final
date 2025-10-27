import { db } from '@/db';
import { testimonials } from '@/db/schema';

async function main() {
    // First, delete all existing testimonials
    await db.delete(testimonials);
    
    console.log('🗑️ Deleted all existing testimonials');

    // Insert the 5 new testimonials with exact data
    const sampleTestimonials = [
        {
            name: 'Shifat Rahman',
            role: 'Bride, Dhaka - June 2024',
            content: 'আমাদের বিবাহের দাওয়াত কার্ডগুলো সত্যিই অসাধারণ হয়েছে! The quality was absolutely stunning and we received so many compliments from our guests. ডিজাইন এবং কাগজের মান দেখে সবাই মুগ্ধ হয়েছে। Candle Light Gift Shop understood exactly what we wanted for our Bengali wedding. Highly recommended!',
            rating: 5,
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-portrait-photo-of-a-young-b-0e27a2b2-20251027162436.jpg',
            is_featured: true,
            created_at: '2024-06-20T00:00:00.000Z',
        },
        {
            name: 'Shammi Akter',
            role: 'Bride, Chittagong - March 2024',
            content: 'The custom acrylic invitations were absolutely breathtaking! আমি এমন কিছু চাইছিলাম যা আধুনিক এবং ইউনিক, এবং তারা আমার কল্পনার চেয়েও সুন্দর করে দিয়েছে। The design process was smooth and they really listened to my vision. আমাদের সব মেহমান কার্ড দেখে মুগ্ধ হয়েছেন। Highly recommend to all brides in Bangladesh!',
            rating: 5,
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-portrait-photo-of-a-young-b-b8da4fb8-20251027162435.jpg',
            is_featured: true,
            created_at: '2024-03-15T00:00:00.000Z',
        },
        {
            name: 'Nabila Hossain',
            role: 'Event Planner, Gulshan',
            content: 'As a professional event planner in Dhaka, I have worked with Candle Light Gift Shop on multiple weddings and they never disappoint. তাদের কাজের মান সবসময় উচ্চমানের এবং তারা সময়মতো ডেলিভারি দেয়। Whether it is traditional Bengali wedding cards or modern designs, they execute flawlessly. বাংলাদেশের যেকোনো ইভেন্টের জন্য আমি তাদের highly recommend করি!',
            rating: 5,
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-portrait-photo-of-a-young-b-425900c3-20251027162434.jpg',
            is_featured: true,
            created_at: '2024-04-10T00:00:00.000Z',
        },
        {
            name: 'Alif Ahmed',
            role: 'Groom, Sylhet - December 2023',
            content: 'We are so grateful for the beautiful wedding cards they created for our celebration! আমাদের বাঙালি ঐতিহ্য এবং সংস্কৃতিকে তারা খুব সুন্দরভাবে কার্ডে তুলে ধরেছে। Each piece was crafted with such care and our families were moved by how beautifully everything was done. বাংলাদেশের traditional ceremonies এর জন্য perfect! Highly recommended for all Bengali weddings!',
            rating: 5,
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-portrait-photo-of-a-young-b-b3cfeec1-20251027162433.jpg',
            is_featured: true,
            created_at: '2023-12-18T00:00:00.000Z',
        },
        {
            name: 'Jakia Sultana',
            role: 'Bride, Dhaka - October 2023',
            content: 'Candle Light Gift Shop made our wedding invitations so special! ডিজাইন এবং প্রিন্টিং কোয়ালিটি ছিল exceptional। The team was very professional and delivered on time. আমাদের guests সবাই invitation cards দেখে impressed হয়েছে। The purple and gold theme we chose looked absolutely stunning. Thank you for making our special day even more memorable!',
            rating: 5,
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6b4356b4-70fd-4da1-9cc0-c78d9dc959ad/generated_images/professional-portrait-photo-of-a-young-b-491c52f0-20251027162434.jpg',
            is_featured: true,
            created_at: '2023-10-25T00:00:00.000Z',
        }
    ];

    await db.insert(testimonials).values(sampleTestimonials);
    
    console.log('✅ Testimonials seeder completed successfully - 5 testimonials inserted');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});