// Hero slides — each entry drives one carousel panel.
// Images come from Unsplash with explicit sizing to avoid CLS.
// Slide 1 gets fetchPriority="high" since it's visible on first paint.
export const heroSlides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop',
    label: "WELCOME TO THE L'COFFEE",
    heading: 'The London\nCoffee House',
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
