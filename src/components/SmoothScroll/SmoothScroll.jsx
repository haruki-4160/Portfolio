import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 2.0,
      infinite: false,
    });

    window.lenis = lenis;

    // Convert vertical wheel scroll into horizontal scroll for standard mice
    const handleWheel = (e) => {
      // If user scrolls vertically with mouse wheel, translate deltaY into horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        lenis.scrollTo(lenis.scroll + e.deltaY * 1.2, { immediate: false });
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
