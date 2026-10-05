import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/coffeeData';
import { viewport } from '../utils/animations';

// Animates a number from 0 to `target` over `duration` ms using rAF.
// Only starts once `shouldStart` becomes true (i.e. when the section enters view).
const useCountUp = (target, duration = 1800, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    // Respect reduced-motion: jump straight to the final value
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad — decelerates as it approaches the target
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, shouldStart]);

  return count;
};

const StatItem = ({ stat, isLast, shouldStart }) => {
  const count = useCountUp(stat.value, 1800, shouldStart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay: stat.id * 0.1 }}
      className={`
        flex flex-col items-center text-center px-6 py-10
        ${!isLast ? 'border-b sm:border-b-0 sm:border-r border-[#2A2A2A]' : ''}
      `}
    >
      <div className="flex items-start leading-none mb-3" aria-live="polite" aria-atomic="true">
        <span className="font-playfair font-bold text-[#F5F1E8] text-5xl sm:text-6xl lg:text-7xl tabular-nums">
          {count}
        </span>
        <span className="font-playfair font-bold text-[#C5A880] text-3xl sm:text-4xl mt-1">
          {stat.suffix}
        </span>
      </div>
      <p className="font-jakarta font-medium text-[#A5A5A5] text-xs tracking-[0.15em] uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  // useInView triggers the count-up — `once: true` so it only fires once
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      id="stats"
      className="bg-[#181818] border-y border-[#2A2A2A]"
      aria-label="Business statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              isLast={i === stats.length - 1}
              shouldStart={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
