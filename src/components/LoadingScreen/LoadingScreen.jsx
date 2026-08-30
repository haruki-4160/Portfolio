import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 3 Second custom delay
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="loading-screen-overlay"
        >
          {/* Logo Crest Floating Above */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-2xl bg-black/50">
              <img
                src="/haruki-logo.png"
                alt="Haruki Crest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-mono font-bold tracking-[0.25em] text-slate-300 dark:text-slate-200">
              ASHISH SUNIL // HARUKI
            </div>
          </motion.div>

          {/* User's Exact Custom Animated Loader */}
          <div className="loader-wrapper">
            <span className="loader-letter">L</span>
            <span className="loader-letter">o</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">d</span>
            <span className="loader-letter">i</span>
            <span className="loader-letter">n</span>
            <span className="loader-letter">g</span>
            <span className="loader-letter">.</span>
            <span className="loader-letter">.</span>

            <div className="loader-bg-1"></div>
            <div className="loader-bg-2"></div>

            <div className="loader"></div>
          </div>

          {/* Subtitle Progress Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-xs font-mono text-sky-400 tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>Initializing System & Presences...</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
