import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FlightNavigator.css';

export default function FlightNavigator({ flightState, onFlightComplete }) {
  // flightState: { active: boolean, startX: number, startY: number, targetTab: string } | null
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!flightState?.active) return;

    // Generate dynamic trail particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: flightState.startX + (window.innerWidth - flightState.startX) * (i / 12),
      y: flightState.startY + (Math.sin(i * 0.5) * 40),
      delay: i * 0.05,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, [flightState]);

  if (!flightState?.active) return null;

  const endX = window.innerWidth + 120;
  const controlY = flightState.startY - 80;
  const endY = flightState.startY + 40;

  return (
    <div className="flight-overlay-container">
      {/* Contrail Sparkle Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: flightState.startX, y: flightState.startY }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.5, 0],
            x: p.x,
            y: p.y,
          }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
          style={{ width: p.size, height: p.size }}
          className="flight-light-particle"
        />
      ))}

      {/* Main Flying Paper Plane with Parabolic Flight to the Right */}
      <motion.div
        initial={{
          x: flightState.startX,
          y: flightState.startY,
          scale: 0.8,
          rotate: 0,
          opacity: 1,
        }}
        animate={{
          x: [flightState.startX, flightState.startX + 200, endX],
          y: [flightState.startY, controlY, endY],
          scale: [0.8, 1.4, 1.1],
          rotate: [0, 15, 30],
          opacity: [1, 1, 0.9],
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.4, 1],
        }}
        onAnimationComplete={() => {
          if (onFlightComplete) {
            onFlightComplete(flightState.targetTab);
          }
        }}
        className="flight-plane-wrapper"
      >
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
