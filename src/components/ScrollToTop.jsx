import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top of the page on every route change.
// Without this, navigating to a new page would keep the previous scroll position.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
