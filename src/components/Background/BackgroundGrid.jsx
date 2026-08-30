import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts on scroll
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 450]);
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -300]);
  const orb3Y = useTransform(scrollY, [0, 3000], [0, 350]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {/* Dynamic Cursor Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 dark:opacity-20 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, #00a2ff 0%, #5c67ff 40%, transparent 70%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
        }}
      />

      {/* Floating Ambient Aurora Orbs with Scroll Parallax */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#3b82f6]/10 dark:bg-[#5c67ff]/25 rounded-full blur-[130px] animate-pulse-glow"
      />
      <motion.div
        style={{ y: orb2Y, animationDelay: '2s' }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[#6366f1]/10 dark:bg-[#00a2ff]/20 rounded-full blur-[140px] animate-pulse-glow"
      />
      <motion.div
        style={{ y: orb3Y, animationDelay: '4s' }}
        className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-[#10b981]/10 dark:bg-[#00ffaa]/20 rounded-full blur-[130px] animate-pulse-glow"
      />

      {/* Subtle blueprint grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-70 dark:opacity-50" />
    </div>
  );
}
