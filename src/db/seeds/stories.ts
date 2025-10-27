import { db } from '@/db';
import { stories } from '@/db/schema';

async function main() {
    const sampleStories = [
        {
            title: "A Garden Romance: Sarah & David's Elegant Spring Wedding",
            client: "Sarah & David Martinez",
            date: "May 15, 2024",
            excerpt: "An enchanting garden wedding brought to life with delicate floral acrylic invitations that set the perfect tone for their magical day.",
            content: "Sarah and David knew from the beginning that their wedding would be a celebration of natural beauty and timeless elegance. When they discovered our custom floral acrylic invitations, they immediately fell in love with how the transparent material captured light, creating an ethereal quality that perfectly matched their garden venue. The invitations featured hand-painted watercolor botanicals pressed between crystal-clear acrylic layers, with gold calligraphy that shimmered in the sunlight.\n\nThe couple worked closely with our design team to select wildflowers that would bloom during their May wedding—delicate peonies, garden roses, and trailing jasmine vines. Each invitation was a miniature work of art, with real pressed flowers carefully preserved within the acrylic. Sarah recalled, 'When our guests received these invitations, they called us immediately. Everyone said they'd never seen anything so beautiful and unique. Some even framed them as keepsakes.'\n\nOn their wedding day, the garden venue came alive with the same flowers featured in their invitations. Guests were amazed at the thoughtful continuity between the invitations and the actual celebration. The acrylic theme continued with escort cards, table numbers, and even their welcome sign—all featuring the same botanical designs. David shared, 'The invitations weren't just paper you throw away. They set expectations and built excitement. Our wedding felt cohesive from the very first moment our guests opened those beautiful acrylic pieces.'\n\nLooking back, Sarah and David credit their invitation choice as one of the best decisions they made. The invitations became conversation starters, heirlooms, and the perfect introduction to their love story. Their wedding was featured in several bridal magazines, with photographers specifically highlighting the stunning invitation suite that started it all.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
            createdAt: new Date('2024-06-01').toISOString(),
            updatedAt: new Date('2024-06-01').toISOString(),
        },
        {
            title: "Cultural Fusion: Zainab & Omar's Traditional Mehndi Celebration",
            client: "Zainab & Omar Hassan",
            date: "March 22, 2024",
            excerpt: "A vibrant mehndi ceremony celebrated with authentic decorative dalas and hand-crafted invitation cards that honored their heritage.",
            content: "For Zainab and Omar, preserving their cultural heritage while celebrating their modern love story was paramount. Their mehndi ceremony needed to honor traditional Pakistani customs while reflecting their personal style. When they approached us about creating custom decorative dalas and invitation cards, they shared family heirlooms and vintage designs that had been passed down through generations. We knew this project would be special.\n\nOur artisans spent weeks hand-crafting each dala, incorporating traditional motifs like paisley patterns, intricate henna designs, and symbolic peacocks. The dalas were adorned with vibrant marigold silk flowers, shimmering gold trim, and delicate mirror work that caught the light beautifully. Zainab's mother cried when she first saw them, saying they reminded her of her own wedding in Lahore. The invitation cards featured raised gold foil with Urdu calligraphy alongside English text, bound with silk threads in deep reds and golds. Each card was nestled in a hand-embroidered pouch, making the unboxing experience feel like opening a treasure.\n\nThe mehndi celebration itself was a spectacular fusion of tradition and personalization. The decorative dalas served as stunning centerpieces, filled with rose petals, dates, and traditional sweets. Guests used smaller dalas as favors, taking home pieces of the celebration. Omar's grandmother, who had traveled from Pakistan, was particularly moved. She told us, 'In our modern world, it's rare to see young couples honor our traditions with such detail and care. These dalas and invitations aren't just decorations—they're a bridge between generations.'\n\nZainab and Omar's celebration became a testament to the power of thoughtful design. Their guests didn't just attend a party; they experienced a cultural journey. The couple later shared that several friends, inspired by their celebration, commissioned similar pieces for their own weddings. The dalas and invitations became more than wedding décor—they became family heirlooms, with Zainab's younger sister already claiming one of the centerpiece dalas for her future wedding.",
            image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200",
            createdAt: new Date('2024-04-10').toISOString(),
            updatedAt: new Date('2024-04-10').toISOString(),
        },
        {
            title: "Modern Minimalism: Emma & James' City Loft Wedding",
            client: "Emma & James Chen",
            date: "November 8, 2023",
            excerpt: "Clean lines and contemporary design defined their urban wedding, perfectly reflected in their minimalist acrylic invitations.",
            content: "Emma and James are architects by profession, and their aesthetic is unmistakably modern. When they began planning their wedding at a converted industrial loft in the heart of downtown, they knew traditional paper invitations wouldn't align with their vision. They wanted something architectural, something that felt like an art installation rather than a card. That's when they discovered our minimalist acrylic invitation collection, and everything clicked into place.\n\nThe invitations were masterpieces of restraint—ultra-clear 3mm acrylic panels with laser-etched typography in a custom sans-serif font. No embellishments, no color, just pure geometry and negative space. The text appeared to float on the transparent surface, creating a three-dimensional effect. Each invitation came with a sleek black envelope lined with architectural blueprints of famous buildings, adding an unexpected personal touch. Emma explained, 'We wanted our invitations to be sculptures, not just cards. When you held them up to light, the etched letters created beautiful shadows. Our guests said opening them felt like experiencing a piece of modern art.'\n\nThe wedding itself was a study in sophisticated minimalism. The loft's exposed brick, concrete floors, and floor-to-ceiling windows provided the perfect industrial-chic backdrop. All signage, menus, and table numbers continued the acrylic theme—each piece precisely laser-cut with the same clean typography. The overall effect was cohesive, intentional, and breathtaking. James noted, 'In architecture, we talk about how every element should serve a purpose. Our invitations weren't just functional; they were the thesis statement for our entire wedding design.'\n\nThe impact of their design choices extended beyond the wedding day. Several architecture and design blogs featured their celebration, specifically praising the invitation design as innovative and bold. Emma and James even displayed one of their invitations in their home office, mounted on a wall alongside their favorite architectural drawings. For couples who appreciate contemporary design, their wedding proved that invitations can be more than announcements—they can be design statements that elevate the entire celebration.",
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
            createdAt: new Date('2023-11-20').toISOString(),
            updatedAt: new Date('2023-11-20').toISOString(),
        }
    ];

    await db.insert(stories).values(sampleStories);
    
    console.log('✅ Stories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});