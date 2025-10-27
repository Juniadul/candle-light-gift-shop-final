import { Product } from '@/context/CartContext';

export const products: Product[] = [
  // Paper Invitations
  {
    id: 'paper-1',
    name: 'Floral Elegance Wedding Card',
    price: 250,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
    category: 'paper',
    description: 'Beautiful purple and blue watercolor floral design on premium paper',
  },
  {
    id: 'paper-2',
    name: 'Classic Romance Invitation',
    price: 220,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500',
    category: 'paper',
    description: 'Elegant red rose design with blue ribbon accents',
  },
  {
    id: 'paper-3',
    name: 'Royal Purple Suite',
    price: 280,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500',
    category: 'paper',
    description: 'Luxury purple invitation with gold foil details',
  },
  {
    id: 'paper-4',
    name: 'Blue Botanical Card',
    price: 240,
    image: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=500',
    category: 'paper',
    description: 'Modern blue botanical patterns with clean typography',
  },
  {
    id: 'paper-5',
    name: 'Crimson Bloom Invitation',
    price: 260,
    image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=500',
    category: 'paper',
    description: 'Stunning crimson floral design with gold embossing',
  },
  {
    id: 'paper-6',
    name: 'Royal Blue Elegance',
    price: 270,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500',
    category: 'paper',
    description: 'Sophisticated royal blue with silver details',
  },

  // Acrylic Invitations
  {
    id: 'acrylic-1',
    name: 'Modern Acrylic Invitation',
    price: 450,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500',
    category: 'acrylic',
    description: 'Clear acrylic with purple and gold printing',
  },
  {
    id: 'acrylic-2',
    name: 'Blue Elegance Acrylic',
    price: 480,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500',
    category: 'acrylic',
    description: 'Frosted acrylic with deep blue design',
  },
  {
    id: 'acrylic-3',
    name: 'Red Romance Acrylic',
    price: 500,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500',
    category: 'acrylic',
    description: 'Premium clear acrylic with red floral artwork',
  },
  {
    id: 'acrylic-4',
    name: 'Purple Luxe Acrylic',
    price: 520,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
    category: 'acrylic',
    description: 'Elegant purple design on clear acrylic base',
  },

  // Semi-transparent Invitations
  {
    id: 'semi-1',
    name: 'Vellum Overlay Purple',
    price: 320,
    image: 'https://images.unsplash.com/photo-1481480700189-4ec99f5fb2f3?w=500',
    category: 'semi-transparent',
    description: 'Delicate vellum overlay with purple floral patterns',
  },
  {
    id: 'semi-2',
    name: 'Translucent Blue Dream',
    price: 340,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
    category: 'semi-transparent',
    description: 'Semi-transparent card with royal blue accents',
  },
  {
    id: 'semi-3',
    name: 'Frosted Elegance',
    price: 360,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500',
    category: 'semi-transparent',
    description: 'Frosted semi-transparent with crimson details',
  },
  {
    id: 'semi-4',
    name: 'Vellum Gold Accent',
    price: 380,
    image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500',
    category: 'semi-transparent',
    description: 'Premium vellum with gold foil printing',
  },

  // Favor Boxes
  {
    id: 'favor-1',
    name: 'Purple Dream Box',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500',
    category: 'favor-box',
    description: 'Elegant purple gift box with gold ribbon',
  },
  {
    id: 'favor-2',
    name: 'Royal Blue Favor Box',
    price: 130,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
    category: 'favor-box',
    description: 'Luxurious blue favor box with custom printing',
  },
  {
    id: 'favor-3',
    name: 'Red Velvet Box',
    price: 140,
    image: 'https://images.unsplash.com/photo-1515168833906-accb5a2b5be0?w=500',
    category: 'favor-box',
    description: 'Premium red velvet finish favor box',
  },
  {
    id: 'favor-4',
    name: 'Gold Accent Box',
    price: 150,
    image: 'https://images.unsplash.com/photo-1549298916-c6c5f85fa167?w=500',
    category: 'favor-box',
    description: 'White favor box with gold ribbon and details',
  },

  // Goody Bags
  {
    id: 'bag-1',
    name: 'Purple Elegance Bag',
    price: 80,
    image: 'https://images.unsplash.com/photo-1549492423-400259a2e574?w=500',
    category: 'goody-bag',
    description: 'Stylish purple goody bag with handle',
  },
  {
    id: 'bag-2',
    name: 'Blue & White Favor Bag',
    price: 75,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500',
    category: 'goody-bag',
    description: 'Classic blue and white striped favor bag',
  },
  {
    id: 'bag-3',
    name: 'Red Premium Bag',
    price: 90,
    image: 'https://images.unsplash.com/photo-1550639524-a6c8f8866333?w=500',
    category: 'goody-bag',
    description: 'Luxury red goody bag with gold accents',
  },
  {
    id: 'bag-4',
    name: 'Royal Purple Gift Bag',
    price: 85,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    category: 'goody-bag',
    description: 'Premium purple gift bag with satin handles',
  },

  // Accessories
  {
    id: 'acc-1',
    name: 'Gold Wax Seal Set',
    price: 180,
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500',
    category: 'accessories',
    description: 'Luxury wax seal kit with gold wax and custom stamp',
  },
  {
    id: 'acc-2',
    name: 'Purple Ribbon Collection',
    price: 95,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    category: 'accessories',
    description: 'Assorted purple satin ribbons for invitations',
  },
  {
    id: 'acc-3',
    name: 'Blue Silk Tassel Set',
    price: 110,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500',
    category: 'accessories',
    description: 'Handmade royal blue silk tassels',
  },
  {
    id: 'acc-4',
    name: 'Red Rose Embellishments',
    price: 125,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
    category: 'accessories',
    description: 'Delicate crimson rose embellishments pack',
  },
  {
    id: 'acc-5',
    name: 'Gold Foil Paper',
    price: 140,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'accessories',
    description: 'Premium gold foil paper sheets for accents',
  },

  // Dala (Traditional Decorative Plates)
  {
    id: 'dala-1',
    name: 'Royal Purple Dala',
    price: 350,
    image: 'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=500',
    category: 'dala',
    description: 'Ornate purple decorative dala with gold border',
  },
  {
    id: 'dala-2',
    name: 'Blue & Gold Dala',
    price: 380,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500',
    category: 'dala',
    description: 'Elegant royal blue dala with gold artwork',
  },
  {
    id: 'dala-3',
    name: 'Crimson Heritage Dala',
    price: 400,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500',
    category: 'dala',
    description: 'Traditional crimson red dala with intricate patterns',
  },
  {
    id: 'dala-4',
    name: 'Premium Gold Dala',
    price: 420,
    image: 'https://images.unsplash.com/photo-1608613304899-ea8098577e38?w=500',
    category: 'dala',
    description: 'Luxurious gold-finished decorative dala',
  },

  // Gift Envelopes
  {
    id: 'env-1',
    name: 'Purple Silk Envelope',
    price: 65,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500',
    category: 'gift-envelope',
    description: 'Luxurious purple silk fabric envelope',
  },
  {
    id: 'env-2',
    name: 'Royal Blue Money Envelope',
    price: 60,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
    category: 'gift-envelope',
    description: 'Traditional royal blue money envelope',
  },
  {
    id: 'env-3',
    name: 'Red Gold Trim Envelope',
    price: 70,
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=500',
    category: 'gift-envelope',
    description: 'Crimson envelope with gold trim details',
  },
  {
    id: 'env-4',
    name: 'Gold Brocade Envelope',
    price: 80,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
    category: 'gift-envelope',
    description: 'Premium gold brocade fabric envelope',
  },
  {
    id: 'env-5',
    name: 'Purple Velvet Envelope',
    price: 75,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
    category: 'gift-envelope',
    description: 'Soft purple velvet money envelope',
  },
];

export const categories = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'paper', name: 'Paper Invitations', slug: 'paper' },
  { id: 'acrylic', name: 'Acrylic Invitations', slug: 'acrylic' },
  { id: 'semi-transparent', name: 'Semi-transparent', slug: 'semi-transparent' },
  { id: 'favor-box', name: 'Favor Boxes', slug: 'favor-box' },
  { id: 'goody-bag', name: 'Goody Bags', slug: 'goody-bag' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'dala', name: 'Dala', slug: 'dala' },
  { id: 'gift-envelope', name: 'Gift Envelopes', slug: 'gift-envelope' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    role: 'Bride',
    content: 'Candle Light Gift Shop created the most stunning invitations for our wedding. The purple and gold design was exactly what we envisioned!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
  {
    id: 2,
    name: 'Kabir Hassan',
    role: 'Groom',
    content: 'Exceptional quality and service! The acrylic invitations were a hit with all our guests. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
  {
    id: 3,
    name: 'Nadia Islam',
    role: 'Event Planner',
    content: 'I always recommend Candle Light Gift Shop to my clients. Their attention to detail and customer service is unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
  },
  {
    id: 4,
    name: 'Farhan Ahmed',
    role: 'Groom',
    content: 'The customization options are incredible. They brought our vision to life beautifully!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  },
];

export const stories = [
  {
    id: 'story-1',
    title: 'A Royal Purple Wedding in Dhaka',
    client: 'Ayesha & Kabir',
    date: 'December 2024',
    excerpt: 'Discover how we created a stunning collection of purple and gold invitations for this elegant winter wedding.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    content: `When Ayesha and Kabir approached us for their winter wedding invitations, they had a clear vision: elegant, luxurious, and timeless. We worked closely with them to create a bespoke collection featuring their signature purple and gold color palette.

    The suite included laser-cut paper invitations, acrylic save-the-date cards, and matching favor boxes. Each piece was carefully crafted to reflect the couple's sophisticated style and attention to detail.

    The result was a cohesive collection that perfectly set the tone for their magical celebration at the Westin Dhaka.`,
  },
  {
    id: 'story-2',
    title: 'Modern Minimalism with Royal Blue',
    client: 'Nisha & Raj',
    date: 'November 2024',
    excerpt: 'A contemporary take on traditional wedding stationery with clean lines and royal blue accents.',
    image: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800',
    content: `Nisha and Raj wanted something different - a modern, minimalist approach to their wedding stationery. We designed a collection featuring clean typography, geometric patterns, and their chosen royal blue color.

    The invitations were printed on premium textured paper with subtle gold foil details. We also created custom acrylic place cards and menu cards that complemented their overall wedding aesthetic.

    Their guests loved the contemporary elegance, and the invitations became a talking point at the reception.`,
  },
  {
    id: 'story-3',
    title: 'Traditional Charm with Crimson Accents',
    client: 'Fatima & Rahim',
    date: 'October 2024',
    excerpt: 'Embracing Bengali traditions with modern design elements and rich crimson red details.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    content: `For Fatima and Rahim's traditional wedding, we incorporated classic Bengali motifs with a contemporary twist. The crimson red and gold color scheme reflected their cultural heritage while maintaining a modern aesthetic.

    We designed intricate laser-cut invitations with traditional alpana patterns, complemented by crimson velvet favor boxes and gold-embossed gift envelopes.

    The couple was thrilled with how we honored their traditions while creating something fresh and unique.`,
  },
];