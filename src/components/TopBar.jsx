import React from 'react';

// Thin ribbon that sits above the navbar.
// Intentionally kept very simple — just hours and address.
// The gold dots are purely decorative, so aria-hidden keeps them out of the a11y tree.
const TopBar = () => {
  return (
    <div
      className="w-full bg-[#181818] border-b border-[#2A2A2A]"
      role="complementary"
      aria-label="Store information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 gap-4 overflow-hidden">

          {/* Hours */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-jakarta font-medium tracking-[0.15em] text-[#A5A5A5] uppercase whitespace-nowrap">
              08:00 AM – 08:00 PM
            </span>
          </div>

          {/* Vertical divider — only shows when there's enough room */}
          <div className="hidden sm:block h-3 w-px bg-[#2A2A2A] flex-shrink-0" aria-hidden="true" />

          {/* Address — truncates on very small screens instead of wrapping */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-jakarta font-medium tracking-[0.15em] text-[#A5A5A5] uppercase truncate">
              KRISHNAMANDIR PATAN, KATHMANDU
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
