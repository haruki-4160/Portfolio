import React, { useEffect, useState } from 'react';

export default function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

      {/* Floating Ambient Aurora Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5c67ff]/20 dark:bg-[#5c67ff]/25 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00a2ff]/15 dark:bg-[#00a2ff]/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#00ffaa]/15 dark:bg-[#00ffaa]/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Blueprint / Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 dark:opacity-50" />
    </div>
  );
}
