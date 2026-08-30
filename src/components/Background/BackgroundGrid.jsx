import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts on scroll
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 450]);
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -320]);
  const orb3Y = useTransform(scrollY, [0, 3000], [0, 380]);
  const orb4Y = useTransform(scrollY, [0, 3000], [0, -220]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {/* Dynamic Cursor Spotlight with Rich Multi-Tone Bloom */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[150px] opacity-25 dark:opacity-30 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(99, 102, 241, 0.4) 40%, rgba(37, 99, 235, 0.2) 70%, transparent 100%)',
          left: `${mousePos.x - 325}px`,
          top: `${mousePos.y - 325}px`,
        }}
      />

      {/* 1. Sapphire Blue Floating Aurora Orb */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-slate-300/30 dark:bg-[#1e40af]/30 rounded-full blur-[140px] animate-pulse-glow"
      />

      {/* 2. Electric Indigo & Violet Floating Aurora Orb */}
      <motion.div
        style={{ y: orb2Y, animationDelay: '2s' }}
        className="absolute top-1/4 -right-32 w-[580px] h-[580px] bg-slate-400/20 dark:bg-[#6366f1]/25 rounded-full blur-[150px] animate-pulse-glow"
      />

      {/* 3. Luminous Icy Cyan Floating Aurora Orb */}
      <motion.div
        style={{ y: orb3Y, animationDelay: '4s' }}
        className="absolute -bottom-32 left-1/4 w-[560px] h-[560px] bg-sky-200/25 dark:bg-[#0284c7]/25 rounded-full blur-[140px] animate-pulse-glow"
      />

      {/* 4. Deep Royal Purple Ambient Corner (Rich Dark Mode Depth) */}
      <motion.div
        style={{ y: orb4Y, animationDelay: '3s' }}
        className="hidden dark:block absolute bottom-1/3 right-1/4 w-[480px] h-[480px] bg-[#7c3aed]/15 rounded-full blur-[160px] animate-pulse-glow"
      />

      {/* Subtle Blueprint & Tech Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-80 dark:opacity-40" />
    </div>
  );
}
