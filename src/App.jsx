import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home              from './pages/Home';
import AboutPage         from './pages/AboutPage';
import MenuPage          from './pages/MenuPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import CoffeeMenuPage    from './pages/CoffeeMenuPage';
import FoodServicesPage  from './pages/FoodServicesPage';
import BlogPage          from './pages/BlogPage';
import BlogPostPage      from './pages/BlogPostPage';
import ContactPage       from './pages/ContactPage';
import BookingPage       from './pages/BookingPage';
import NotFound          from './pages/NotFound';

// Layout wraps every route with the fixed header and shared footer.
// Children are the page-specific content.
const Layout = ({ children }) => (
  <>
    {/* Fixed top-bar — sits above the navbar at z-50 */}
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
    {/* Scrolls to top on every route change */}
    <ScrollToTop />

    <Routes>
      <Route path="/"                element={<Layout><Home /></Layout>} />
      <Route path="/about"           element={<Layout><AboutPage /></Layout>} />
      <Route path="/menu"            element={<Layout><MenuPage /></Layout>} />
      <Route path="/menu/restaurant" element={<Layout><RestaurantMenuPage /></Layout>} />
      <Route path="/menu/coffee"     element={<Layout><CoffeeMenuPage /></Layout>} />
      <Route path="/menu/food"       element={<Layout><FoodServicesPage /></Layout>} />
      <Route path="/blog"            element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug"      element={<Layout><BlogPostPage /></Layout>} />
      <Route path="/contact"         element={<Layout><ContactPage /></Layout>} />
      <Route path="/book-table"      element={<Layout><BookingPage /></Layout>} />
      <Route path="*"                element={<Layout><NotFound /></Layout>} />
    </Routes>
  </>
);

export default App;
