import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts on scroll
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 500]);
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -350]);
  const orb3Y = useTransform(scrollY, [0, 3000], [0, 400]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 dark:opacity-20 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, #00ffaa 0%, #5c67ff 40%, transparent 70%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
        }}
      />

      {/* Floating Ambient Aurora Orbs with Scroll Parallax */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-[#5c67ff]/20 dark:bg-[#5c67ff]/25 rounded-full blur-[130px] animate-pulse-glow"
      />
      <motion.div
        style={{ y: orb2Y, animationDelay: '2s' }}
        className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#00a2ff]/15 dark:bg-[#00a2ff]/20 rounded-full blur-[140px] animate-pulse-glow"
      />
      <motion.div
        style={{ y: orb3Y, animationDelay: '4s' }}
        className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-[#00ffaa]/15 dark:bg-[#00ffaa]/20 rounded-full blur-[130px] animate-pulse-glow"
      />

      {/* Blueprint / Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 dark:opacity-50" />
    </div>
  );
}
