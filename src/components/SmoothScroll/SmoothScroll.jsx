import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: isMobile ? 'vertical' : 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // Convert mouse wheel vertically into horizontal scroll
    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;

      // If user is scrolling inside a vertically scrollable container (e.g. repos list, modal, etc.)
      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        const isScrollable = target.scrollHeight > target.clientHeight;
        const style = window.getComputedStyle(target);
        if (isScrollable && (style.overflowY === 'auto' || style.overflowY === 'scroll')) {
          const atTop = target.scrollTop <= 0 && e.deltaY < 0;
          const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 2 && e.deltaY > 0;
          if (!atTop && !atBottom) {
            return; // Let internal element scroll vertically!
          }
        }
        target = target.parentElement;
      }

      // If user is scrolling with a mouse wheel (dominant deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        e.preventDefault();
        lenis.scrollTo(lenis.scroll + e.deltaY * 1.3, { immediate: false, duration: 0.6 });
      }
    };

    // Keyboard arrow keys (Left/Right slide by page width)
    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        lenis.scrollTo(lenis.scroll + window.innerWidth, { duration: 0.8 });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        lenis.scrollTo(lenis.scroll - window.innerWidth, { duration: 0.8 });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
