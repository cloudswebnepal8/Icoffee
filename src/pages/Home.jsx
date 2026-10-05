import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import PopularMenu from '../components/PopularMenu';
import FeatureHighlight from '../components/FeatureHighlight';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';
import Blog from '../components/Blog';
import BookingCTA from '../components/BookingCTA';

// The home page assembles all section components in order.
// No PageHero here — the Hero carousel IS the page banner.
const Home = () => (
  <>
    <Hero />
    <About />
    <Services />
    <PopularMenu />
    <FeatureHighlight />
    <Gallery />
    <Testimonials />
    <Stats />
    <Blog />
    <BookingCTA />
  </>
);

export default Home;
