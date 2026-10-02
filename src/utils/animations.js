// Shared Framer Motion variants used across all Part 2 sections.
// Centralising them here means we change the feel in one place,
// not scattered across five different components.

export const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay } },
});

export const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

// Container variant that staggers its children automatically.
// Pair with a child variant that uses hidden/visible.
export const staggerContainer = (stagger = 0.1, delayChildren = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

// Standard viewport config — trigger once, when 20% of the element is visible.
export const viewport = { once: true, amount: 0.2 };
