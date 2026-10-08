import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Core Pages
import Home               from './pages/Home';
import AboutPage          from './pages/AboutPage';
import MenuPage           from './pages/MenuPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import CoffeeMenuPage     from './pages/CoffeeMenuPage';
import FoodServicesPage   from './pages/FoodServicesPage';
import BlogPage           from './pages/BlogPage';
import BlogPostPage       from './pages/BlogPostPage';
import ContactPage        from './pages/ContactPage';
import BookingPage        from './pages/BookingPage';
import NotFound           from './pages/NotFound';

// Pages Dropdown
import ServicesPage       from './pages/ServicesPage';
import ReservationPage    from './pages/ReservationPage';
import HistoryPage        from './pages/HistoryPage';
import GalleryPage        from './pages/GalleryPage';
import FAQPage            from './pages/FAQPage';

// Shared Layout wrapping fixed headers & footer
const Layout = ({ children }) => (
  <>
    {/* Fixed top bar */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <TopBar />
    </div>

    <div className="min-h-screen bg-[#121212]">
      <Navbar />

      <main id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  </>
);

const App = () => (
  <>
    {/* Instant scroll restoration on route navigation */}
    <ScrollToTop />

    <Routes>
      {/* Primary Navigation */}
      <Route path="/"                element={<Layout><Home /></Layout>} />
      <Route path="/about"           element={<Layout><AboutPage /></Layout>} />
      <Route path="/menu"            element={<Layout><MenuPage /></Layout>} />
      <Route path="/menu/restaurant" element={<Layout><RestaurantMenuPage /></Layout>} />
      <Route path="/menu/coffee"     element={<Layout><CoffeeMenuPage /></Layout>} />
      <Route path="/menu/food"       element={<Layout><FoodServicesPage /></Layout>} />
      <Route path="/menu-coffee"     element={<Layout><CoffeeMenuPage /></Layout>} />
      <Route path="/menu-restaurant" element={<Layout><RestaurantMenuPage /></Layout>} />

      {/* Pages Dropdown Routes (matching reference lcoffee.vercel.app) */}
      <Route path="/services"        element={<Layout><ServicesPage /></Layout>} />
      <Route path="/service"         element={<Layout><ServicesPage /></Layout>} />
      <Route path="/reservation"     element={<Layout><ReservationPage /></Layout>} />
      <Route path="/book-table"      element={<Layout><ReservationPage /></Layout>} />
      <Route path="/history"         element={<Layout><HistoryPage /></Layout>} />
      <Route path="/gallery"         element={<Layout><GalleryPage /></Layout>} />
      <Route path="/faq"             element={<Layout><FAQPage /></Layout>} />

      {/* Blog & Contact */}
      <Route path="/blog"            element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog-grid"       element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug"      element={<Layout><BlogPostPage /></Layout>} />
      <Route path="/contact"         element={<Layout><ContactPage /></Layout>} />
      <Route path="/contacts"        element={<Layout><ContactPage /></Layout>} />

      {/* 404 Catch-All */}
      <Route path="*"                element={<Layout><NotFound /></Layout>} />
    </Routes>
  </>
);

export default App;
