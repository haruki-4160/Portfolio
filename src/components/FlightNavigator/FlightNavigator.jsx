import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FlightNavigator.css';

export default function FlightNavigator({ flightState, onFlightComplete }) {
  // flightState: { active: boolean, startX: number, startY: number, targetTab: string } | null
  const [particles, setParticles] = useState([]);
  const [windLines, setWindLines] = useState([]);

  useEffect(() => {
    if (!flightState?.active) {
      setParticles([]);
      setWindLines([]);
      return;
    }

    const { startX, startY } = flightState;
    const screenHeight = window.innerHeight;
    const distanceY = screenHeight - startY + 200;

    // Generate glowing contrail sparkle particles along the vertical downward flight path
    const newParticles = Array.from({ length: 22 }, (_, i) => {
      const progress = (i + 1) / 22;
      return {
        id: `v-particle-${i}`,
        x: startX + Math.sin(progress * Math.PI * 2) * 50 + (Math.random() * 20 - 10),
        y: startY + distanceY * progress,
        delay: 0.15 + progress * 1.2,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 0.7 + 0.5,
      };
    });

    // Generate vertical aerodynamic air stream lines
    const newWindLines = Array.from({ length: 6 }, (_, i) => ({
      id: `v-wind-${i}`,
      x: startX - 30 + i * 15 + (Math.random() * 16 - 8),
      delay: 0.2 + (i * 0.12),
      height: Math.random() * 100 + 70,
    }));

    setParticles(newParticles);
    setWindLines(newWindLines);
  }, [flightState]);

  if (!flightState?.active) return null;

  const startX = flightState.startX || window.innerWidth * 0.5;
  const startY = flightState.startY || window.innerHeight * 0.3;
  const screenHeight = window.innerHeight;

  // Smooth downward dive coordinates
  const midX = startX + 55;
  const endX = startX + 20;

  const midY = startY + (screenHeight - startY) * 0.45;
  const endY = screenHeight + 140;

  return (
    <div className="flight-overlay-container" aria-hidden="true">
      {/* Vertical Aerodynamic Streamlines */}
      {windLines.map((w) => (
        <motion.div
          key={w.id}
          initial={{ y: -100, opacity: 0, scaleY: 0.2 }}
          animate={{
            y: [0, screenHeight + 200],
            opacity: [0, 0.8, 0.4, 0],
            scaleY: [0.4, 1.6, 0.2],
          }}
          transition={{
            duration: 1.1,
            delay: w.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            left: `${w.x}px`,
            height: `${w.height}px`,
          }}
          className="flight-vertical-wind-line"
        />
      ))}

      {/* Trailing Stardust Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: startX, y: startY }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0.2, 1.5, 1, 0],
            x: p.x,
            y: p.y,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
          style={{ width: p.size, height: p.size }}
          className="flight-light-particle"
        />
      ))}

      {/* Smooth Downward Gliding Paper Plane */}
      <motion.div
        initial={{
          x: startX,
          y: startY,
          scale: 0.85,
          rotate: -15,
          opacity: 1,
        }}
        animate={{
          x: [startX, startX + 40, midX, endX],
          y: [startY, startY - 45, midY, endY],
          scale: [0.85, 1.3, 1.35, 1.1],
          rotate: [-15, 25, 75, 85], // Smooth bank into downward vertical glide
          opacity: [1, 1, 1, 0.85],
        }}
        transition={{
          duration: 1.7, // Smooth, natural vertical pace
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.18, 0.58, 1],
        }}
        onAnimationComplete={() => {
          if (onFlightComplete) {
            onFlightComplete(flightState.targetTab);
          }
        }}
        className="flight-plane-wrapper"
      >
        {/* Glowing engine pulse aura */}
        <div className="flight-engine-glow" />

        {/* Paper Plane SVG Vector */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flight-plane-svg"
        >
          <path
            d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
            fill="currentColor"
          />
          <path
            d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}
