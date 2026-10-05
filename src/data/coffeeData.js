// ─────────────────────────────────────────────────────────────────────────────
// coffeeData.js — single source of truth for all page content
// Updated for React Router: navLinks now use `to` (path) instead of `href`,
// blogPosts include `slug` + `content`, services include `to` paths.
// ─────────────────────────────────────────────────────────────────────────────

// Hero carousel slides
export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop',
    label: "WELCOME TO THE L'COFFEE",
    heading: 'The Nepal\nCoffee House',
    subheading: 'Handcrafted espresso, ethically sourced beans, and a sanctuary for those who believe great coffee deserves great company.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80&auto=format&fit=crop',
    label: 'CRAFTED WITH PASSION',
    heading: 'Great Coffee.\nGood Vibes.',
    subheading: 'Every cup tells a story — from the highlands of Ethiopia to your morning ritual. We brew moments worth savoring.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80&auto=format&fit=crop',
    label: 'A PLACE TO BELONG',
    heading: 'Where Every\nSip Inspires.',
    subheading: "Step into warmth, aroma, and artistry. L'Coffee is more than a café — it's a curated experience for the senses.",
  },
];

// About section content
export const aboutData = {
  label: "ABOUT L'COFFEE",
  heading: 'Organic & Fresh Coffee Provider Center',
  description: "Since 2015, L'Coffee has been sourcing the finest single-origin beans from sustainable farms across Ethiopia, Colombia, and Guatemala. Every batch is roasted in-house with precision and care, preserving the nuanced flavours that make each origin unique.",
  secondary: "We believe that great coffee is a conversation between the farmer, the roaster, and you. Our baristas are trained artisans, and our space is designed to inspire — whether you're here for a quiet morning solo or a spirited afternoon with friends.",
  cta: 'DISCOVER OUR STORY',
  quote: {
    text: '"Every morning starts with a perfect cup — and L\'Coffee has never let me down. The flavours are extraordinary."',
    author: 'Eleanor Whitfield',
    role: 'Food Critic, The Times',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=face',
  },
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80&auto=format&fit=crop',
};

// Navigation links — `to` is a React Router path.
// `children` drives the Pages dropdown.
export const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',   to: '/about' },
  { label: 'Menu',    to: '/menu' },
  {
    label: 'Pages',
    to: null,
    hasDropdown: true,
    children: [
      { label: 'Restaurant Menu', to: '/menu/restaurant' },
      { label: 'Coffee Menu',     to: '/menu/coffee'      },
      { label: 'Food Services',   to: '/menu/food'        },
    ],
  },
  { label: 'Blog',     to: '/blog'    },
  { label: 'Contacts', to: '/contact' },
];

// Service cards — `to` navigates to the relevant sub-menu page
export const services = [
  {
    id: 1,
    icon: 'UtensilsCrossed',
    title: 'Restaurant Menu',
    to: '/menu/restaurant',
    description: 'A curated dining experience featuring seasonal dishes crafted around the finest local ingredients — perfectly paired with your coffee.',
  },
  {
    id: 2,
    icon: 'Coffee',
    title: 'Coffee Menu',
    to: '/menu/coffee',
    description: 'From single-origin pour-overs to velvety flat whites, every drink is dialled in by our trained baristas using freshly roasted beans.',
  },
  {
    id: 3,
    icon: 'ShoppingBag',
    title: 'Food Services',
    to: '/menu/food',
    description: 'Fresh pastries, artisan sandwiches, and house-made sweets — available for dine-in, takeaway, or delivered straight to your door.',
  },
];

// Coffee menu items (used on Coffee Menu page + Popular Menu section)
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

// Restaurant food menu items
export const restaurantItems = [
  {
    id: 1,
    name: 'Avocado Toast',
    composition: 'Sourdough, smashed avocado, poached egg, chilli flakes',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Eggs Benedict',
    composition: 'English muffin, Canadian bacon, hollandaise',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    composition: 'Romaine, parmesan, croutons, house Caesar dressing',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Smoked Salmon Bagel',
    composition: 'Cream cheese, capers, red onion, dill',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Club Sandwich',
    composition: 'Grilled chicken, bacon, lettuce, tomato, aioli',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'French Onion Soup',
    composition: 'Caramelised onions, beef broth, gruyère crust',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&q=80&auto=format&fit=crop',
  },
];

// Food / bakery service items
export const foodItems = [
  {
    id: 1,
    name: 'Butter Croissant',
    composition: 'Laminated dough, fresh-baked daily',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Blueberry Muffin',
    composition: 'Wild blueberries, lemon zest, streusel top',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Chocolate Brownie',
    composition: 'Dark chocolate, walnuts, sea salt',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Banana Bread',
    composition: 'Ripe banana, cinnamon, toasted pecans',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Cinnamon Roll',
    composition: 'Cardamom dough, cream cheese glaze',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=120&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Almond Danish',
    composition: 'Flaky pastry, almond frangipane, icing',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1486428263684-28ec9e4f2584?w=120&q=80&auto=format&fit=crop',
  },
];

// Feature highlight points
export const features = [
  {
    id: 1,
    icon: 'Leaf',
    title: 'Natural Coffee Beans',
    description: 'We source exclusively from certified organic farms — no pesticides, no shortcuts. Just clean, traceable coffee from crop to cup.',
  },
  {
    id: 2,
    icon: 'BadgeCheck',
    title: '100% ISO Certification',
    description: 'Our roasting facility and supply chain meet ISO 22000 food safety standards, so every cup you drink is held to the highest global benchmark.',
  },
];

// Gallery items — span field controls row height in the CSS grid
export const galleryItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80&auto=format&fit=crop', category: 'Latte Art',     span: 2 },
  { id: 2, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80&auto=format&fit=crop', category: 'Espresso',      span: 1 },
  { id: 3, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80&auto=format&fit=crop', category: 'Coffee Beans',  span: 1 },
  { id: 4, image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80&auto=format&fit=crop', category: 'Barista',       span: 1 },
  { id: 5, image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80&auto=format&fit=crop', category: 'Café Interior',  span: 2 },
  { id: 6, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop', category: 'Cappuccino',    span: 1 },
  { id: 7, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop', category: 'Pastries',       span: 1 },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    review: "The atmosphere at L'Coffee is unlike anything else in the city. Every visit feels like a ritual — the aromas, the service, the coffee. Absolutely world-class.",
    name: 'Sarah Mitchell', role: 'Creative Director', location: 'New York',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 2,
    review: "I've travelled to coffee houses across three continents, and L'Coffee holds its own against the very best. The Flat White here is simply extraordinary.",
    name: 'James Harrington', role: 'Travel Journalist', location: 'London',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 3,
    review: "As someone who takes coffee seriously, I appreciate that L'Coffee never cuts corners. The single-origin pour-over changed the way I think about what coffee can be.",
    name: 'Priya Sharma', role: 'Food & Lifestyle Writer', location: 'Kathmandu',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80&auto=format&fit=crop&crop=face',
  },
  {
    id: 4,
    review: "The team here genuinely cares — about the beans, the craft, and the guest. You feel that in every interaction. My go-to spot before every big meeting.",
    name: 'David Chen', role: 'Tech Entrepreneur', location: 'San Francisco',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop&crop=face',
  },
];

// Stats counter section
export const stats = [
  { id: 1, value: 256, suffix: '+', label: 'Premium Clients'  },
  { id: 2, value: 362, suffix: '+', label: 'Expert Members'   },
  { id: 3, value: 753, suffix: '+', label: 'Winning Awards'   },
];

// Blog posts — slug field drives /blog/:slug routing
export const blogPosts = [
  {
    id: 1,
    slug: 'art-behind-perfect-espresso',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop',
    category: 'Brewing',
    date: 'Sep 28, 2026',
    comments: 12,
    title: 'The Art Behind a Perfect Espresso',
    excerpt: 'Great espresso is science and intuition in equal measure. We break down the variables that separate a flat shot from an extraordinary one.',
    content: [
      "Espresso is the most scrutinised of all coffee preparations — and for good reason. Within a 25–30 second extraction window, a cascade of chemical reactions must unfold in precise sequence to produce a shot with full body, golden crema, and balanced flavour. Even a one-degree variation in water temperature or a two-second deviation in extraction time can shift the cup from extraordinary to mediocre.",
      "The journey begins long before the shot is pulled. Grind size is perhaps the single most consequential variable. Too coarse and water rushes through, under-extracting the grounds and producing a thin, sour shot. Too fine and the puck resists the pump, over-extracting bitter compounds. At L'Coffee, our baristas calibrate the grinder at the start of each shift and re-check every thirty minutes, because ambient humidity alone can change the ideal setting.",
      "Dose and distribution come next. We use 18–19 grams of coffee for a double shot and invest time in even distribution before tamping. An uneven puck creates channels — paths of least resistance where water bypasses most of the coffee and produces an uneven extraction. Tamping pressure is applied evenly at approximately 30 lbs, a figure that feels intuitive only after hundreds of repetitions.",
      "Water quality is often overlooked outside professional settings, but it matters enormously. We filter our water to a total dissolved solids count of 150 ppm — soft enough not to coat equipment with scale, yet mineralised enough to carry flavour compounds efficiently. Our espresso machine maintains brew temperature at 93°C, measured at the group head, not in the boiler.",
      "Finally, the pull itself. Nine bars of pressure forces hot water through the puck in a process that is part physics, part artistry. The first few seconds produce the most concentrated fraction — dense with oils and sugars. The final seconds thin out considerably. Understanding when to stop is the skill that separates a competent barista from an exceptional one. At L'Coffee, we stop at a 2:1 ratio: 18 grams in, 36 grams out. The result, when everything aligns, is a shot that needs nothing added to it.",
    ],
  },
  {
    id: 2,
    slug: 'freshly-roasted-beans-matter',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80&auto=format&fit=crop',
    category: 'Sourcing',
    date: 'Sep 19, 2026',
    comments: 8,
    title: 'Why Freshly Roasted Beans Matter',
    excerpt: 'Coffee is a perishable product. Understanding the difference between roast dates and best-before dates can transform your morning cup.',
    content: [
      "Walk into most supermarkets and you will find coffee bags stamped with best-before dates twelve to eighteen months in the future. This figure is technically accurate — the coffee will not make you ill — but it tells you almost nothing about when you should actually drink it. Coffee is not preserved by roasting; it is transformed, and that transformation continues long after it leaves the roaster.",
      "Freshly roasted coffee undergoes degassing — releasing carbon dioxide trapped during the roasting process. This is why freshly roasted beans should rest for 24–72 hours before brewing. But degassing also signals the beginning of a gradual decline. Oxygen attacks the aromatic compounds that give coffee its complexity, a process called oxidation. Staling is not dramatic; it happens slowly, imperceptibly, until one morning your cup tastes flat and cardboard-like and you cannot quite remember when it started.",
      "The window of peak flavour is narrower than most people realise. For espresso, we find the ideal window is between five and twenty-one days from the roast date. For filter coffee, it opens slightly earlier — around three days — and extends a little longer. Beyond twenty-five to thirty days, most of the volatile aromatics have dissipated, and the cup begins to lose its distinctiveness.",
      "At L'Coffee, we roast in small batches every Tuesday and Thursday, calibrating our weekly order quantities so that no coffee sits in our hopper for more than ten days. We display roast dates on every bag we sell. When guests ask which beans to buy, our first question is always: when do you plan to drink them? Freshness is not a marketing claim. It is the single greatest quality lever that exists between farm and cup.",
      "If you are buying coffee to brew at home, look for the roast date, not the best-before date. Buy smaller quantities more frequently. Store in an airtight container at room temperature — not the freezer, despite common advice. Freeze only unopened, vacuum-sealed bags, and only if you are buying in bulk for long-term storage. The investment in freshness will transform your daily ritual.",
    ],
  },
  {
    id: 3,
    slug: 'beginners-guide-specialty-coffee',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=80&auto=format&fit=crop',
    category: 'Education',
    date: 'Sep 10, 2026',
    comments: 21,
    title: "A Beginner's Guide to Specialty Coffee",
    excerpt: "From the cherry to the cup, specialty coffee has a fascinating story. Here is where to start if you want to explore beyond the high street.",
    content: [
      "Specialty coffee is a term that carries real meaning. The Specialty Coffee Association defines it as coffee that scores 80 points or above on a 100-point grading scale, assessed by certified Q Graders who evaluate aroma, flavour, aftertaste, acidity, body, balance, uniformity, sweetness, and overall impression. Coffee scoring below 80 is classified as commercial grade — the kind that fills most supermarket shelves and chain café blends.",
      "The score reflects the coffee's journey from seed to cup. It begins at origin, with elevation, soil composition, rainfall patterns, and the care taken during harvesting. Most specialty coffee is hand-picked, selecting only ripe cherries — a labour-intensive process that dramatically raises quality. The processing method that follows — washed, natural, or honey — determines how much of the fruit's character transfers to the bean.",
      "Roasting is the next critical stage. Specialty roasters roast lighter than commercial producers, preserving the unique origin characteristics rather than masking them with the caramelised, roasty notes that come from darker profiles. This is why specialty coffee often tastes different from what many beginners expect — brighter, fruitier, more complex.",
      "Brewing methodology matters enormously. The same beans prepared as a pour-over, French press, AeroPress, or espresso will produce significantly different cups. Pour-overs — V60, Chemex, Kalita Wave — tend to produce the cleanest expression of a bean's origin character. They are an excellent starting point for anyone wanting to understand what a specific coffee tastes like. The investment in equipment is modest: a quality grinder (the most important purchase), a kettle with temperature control, and a simple dripper.",
      "Our advice for beginners: start with a washed Ethiopian or Colombian — both origins produce coffees that are balanced and approachable. Ask your barista or roaster about the processing method and flavour notes. Drink it black first before adding milk, even if you normally wouldn't. You may be surprised by what you find. Specialty coffee is not elitist; it is simply the belief that coffee, at its best, can be as nuanced and rewarding as wine or chocolate — and that the people who grew it deserve recognition for that.",
    ],
  },
];

// Footer mini-gallery
export const footerGallery = [
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=200&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=75&auto=format&fit=crop',
];
