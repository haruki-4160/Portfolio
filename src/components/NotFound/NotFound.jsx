import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home, Terminal } from 'lucide-react';

export default function NotFound({ onReturnHome }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      {/* 404 Glitch Hologram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 mx-auto shadow-2xl shadow-blue-500/20">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30 text-[10px] font-mono font-bold">
          ERROR 404
        </span>
      </motion.div>

      {/* Narrative */}
      <div className="max-w-md space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Sector Not Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
          The requested route, memory address, or project blueprint does not exist in the system core.
        </p>
      </div>

      {/* Return Action */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReturnHome}
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#38bdf8] via-[#2563eb] to-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Terminal</span>
      </motion.button>
    </div>
  );
}
