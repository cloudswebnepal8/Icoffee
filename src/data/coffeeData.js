// Hero slides — each entry drives one carousel panel.
// Images come from Unsplash with explicit sizing to avoid CLS.
// Slide 1 gets fetchPriority="high" since it's visible on first paint.
export const heroSlides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop',
    label: "WELCOME TO THE L'COFFEE",
    heading: 'The Nepal\nCoffee House',
    subheading:
      'Handcrafted espresso, ethically sourced beans, and a sanctuary for those who believe great coffee deserves great company.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80&auto=format&fit=crop',
    label: 'CRAFTED WITH PASSION',
    heading: 'Great Coffee.\nGood Vibes.',
    subheading:
      'Every cup tells a story — from the highlands of Ethiopia to your morning ritual. We brew moments worth savoring.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80&auto=format&fit=crop',
    label: 'A PLACE TO BELONG',
    heading: 'Where Every\nSip Inspires.',
    subheading:
      "Step into warmth, aroma, and artistry. L'Coffee is more than a café — it's a curated experience for the senses.",
  },
];

// Static content for the About section.
// Keeping this in data/ means the component stays presentational
// and copy changes don't require touching JSX.
export const aboutData = {
  label: "ABOUT L'COFFEE",
  heading: 'Organic & Fresh Coffee Provider Center',
  description:
    "Since 2015, L'Coffee has been sourcing the finest single-origin beans from sustainable farms across Ethiopia, Colombia, and Guatemala. Every batch is roasted in-house with precision and care, preserving the nuanced flavours that make each origin unique.",
  secondary:
    "We believe that great coffee is a conversation between the farmer, the roaster, and you. Our baristas are trained artisans, and our space is designed to inspire — whether you're here for a quiet morning solo or a spirited afternoon with friends.",
  cta: 'DISCOVER OUR STORY',
  quote: {
    text: '"Every morning starts with a perfect cup — and L\'Coffee has never let me down. The flavours are extraordinary."',
    author: 'Eleanor Whitfield',
    role: 'Food Critic, The Times',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=face',
  },
  image:
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80&auto=format&fit=crop',
};

// Nav links drive both the desktop menu and the mobile drawer.
// hasDropdown tells NavLink to render a ChevronDown icon alongside the label.
export const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',   href: '#about' },
  { label: 'Menu',    href: '#menu' },
  { label: 'Pages',   href: '#pages', hasDropdown: true },
  { label: 'Blog',    href: '#blog' },
  { label: 'Contacts',href: '#contacts' },
];

// ─── Part 2 Data ────────────────────────────────────────────────

// Services shown in the 3-card grid just below the About section.
// icon is a string matching the Lucide icon name — the component does the import.
export const services = [
  {
    id: 1,
    icon: 'UtensilsCrossed',
    title: 'Restaurant Menu',
    description:
      'A curated dining experience featuring seasonal dishes crafted around the finest local ingredients — perfectly paired with your coffee.',
  },
  {
    id: 2,
    icon: 'Coffee',
    title: 'Coffee Menu',
    description:
      'From single-origin pour-overs to velvety flat whites, every drink is dialled in by our trained baristas using freshly roasted beans.',
  },
  {
    id: 3,
    icon: 'ShoppingBag',
    title: 'Food Services',
    description:
      'Fresh pastries, artisan sandwiches, and house-made sweets — available for dine-in, takeaway, or delivered straight to your door.',
  },
];

// Menu items for the Popular Menu section.
// Price is stored as a number so we can format it consistently in JSX.
export const menuItems = [
  {
    id: 1,
    name: 'Cappuccino',
    composition: '2/3 espresso, 1/3 steamed milk',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Espresso',
    composition: 'Rich concentrated coffee with a golden crema',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Americano',
    composition: 'Espresso pulled long with hot water',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Café Latte',
    composition: 'Espresso with velvety steamed milk',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Mocha',
    composition: 'Espresso, dark chocolate, steamed milk',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Flat White',
    composition: 'Double ristretto, micro-foam milk',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Cold Brew',
    composition: '18-hour cold-steeped single origin',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Caramel Macchiato',
    composition: 'Vanilla, steamed milk, espresso, caramel drizzle',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=120&q=80&auto=format&fit=crop',
  },
];

// Feature highlight points used in the "Why Choose Us" section.
export const features = [
  {
    id: 1,
    icon: 'Leaf',
    title: 'Natural Coffee Beans',
    description:
      'We source exclusively from certified organic farms — no pesticides, no shortcuts. Just clean, traceable coffee from crop to cup.',
  },
  {
    id: 2,
    icon: 'BadgeCheck',
    title: '100% ISO Certification',
    description:
      'Our roasting facility and supply chain meet ISO 22000 food safety standards, so every cup you drink is held to the highest global benchmark.',
  },
];

// Gallery items — using a `span` field for the CSS grid masonry layout.
// span: 2 means the tile takes up two row units so the grid looks editorial.
export const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80&auto=format&fit=crop',
    category: 'Latte Art',
    span: 2,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80&auto=format&fit=crop',
    category: 'Espresso',
    span: 1,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80&auto=format&fit=crop',
    category: 'Coffee Beans',
    span: 1,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80&auto=format&fit=crop',
    category: 'Barista',
    span: 1,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80&auto=format&fit=crop',
    category: 'Café Interior',
    span: 2,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop',
    category: 'Cappuccino',
    span: 1,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop',
    category: 'Pastries',
    span: 1,
  },
];

// Testimonials for the carousel section.
export const testimonials = [
  {
    id: 1,
    review:
      "The atmosphere at L'Coffee is unlike anything else in the city. Every visit feels like a ritual — the aromas, the service, the coffee. Absolutely world-class.",
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    location: 'New York',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 2,
    review:
      "I've travelled to coffee houses across three continents, and L'Coffee holds its own against the very best. The Flat White here is simply extraordinary.",
    name: 'James Harrington',
    role: 'Travel Journalist',
    location: 'London',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 3,
    review:
      "As someone who takes coffee seriously, I appreciate that L'Coffee never cuts corners. The single-origin pour-over changed the way I think about what coffee can be.",
    name: 'Priya Sharma',
    role: 'Food & Lifestyle Writer',
    location: 'Kathmandu',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 4,
    review:
      "The team here genuinely cares — about the beans, the craft, and the guest. You feel that in every interaction. My go-to spot before every big meeting.",
    name: 'David Chen',
    role: 'Tech Entrepreneur',
    location: 'San Francisco',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop&crop=face',
  },
];
