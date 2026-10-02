import React from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PopularMenu from './components/PopularMenu';
import FeatureHighlight from './components/FeatureHighlight';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';

const App = () => {
  return (
    <>
      {/* TopBar is fixed so it always sits at the very top.
          Navbar's `style={{ top: 36 }}` accounts for the 36px height of this bar. */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      <div className="min-h-screen bg-[#121212]">
        <Navbar />

        <main id="main-content">
          {/* Part 1 */}
          <Hero />
          <About />

          {/* Part 2 — inserted directly after About */}
          <Services />
          <PopularMenu />
          <FeatureHighlight />
          <Gallery />
          <Testimonials />
        </main>

        {/* Footer — will be expanded in Part 3 */}
        <footer
          className="bg-[#181818] border-t border-[#2A2A2A] py-8 text-center"
          aria-label="Site footer"
        >
          <p className="font-jakarta text-[#A5A5A5] text-xs tracking-[0.12em] uppercase">
            © {new Date().getFullYear()} L'Coffee. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
