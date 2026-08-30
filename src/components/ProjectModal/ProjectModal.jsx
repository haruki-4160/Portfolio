import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Shield, Layers, Code2 } from 'lucide-react';
import { GithubIcon } from '../Icons/SocialIcons';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const tags = project.tags || project.stack || [];
  const features = project.features || [
    "Modular system architecture and clean separation of concerns",
    "Optimized execution and high-reliability error handling",
    "Built for responsive, modern developer environments"
  ];
  const image = project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Darkened Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Pop-up Card */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="glass-panel relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 dark:border-white/15 z-10 my-auto bg-slate-100 dark:bg-[#121420]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Visual Banner */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900">
            <img
              src={image}
              alt={project.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg z-20"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Banner Title & Badge */}
            <div className="absolute bottom-4 left-6 right-6 z-10">
              <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-sky-400 border border-blue-400/40 inline-flex items-center gap-1.5 backdrop-blur shadow-sm">
                <Sparkles className="w-3 h-3 text-sky-400" />
                {project.badge || project.type || "FEATURED SYSTEM"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 drop-shadow-md">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Overview & Architecture */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-sky-400 uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Overview & Architecture</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Key Capabilities / Features */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Key Capabilities & Highlights</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {features.map((feat, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            {tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Technologies & Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-sky-300 font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono transition-all shadow-md hover:scale-[1.02]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#2563eb] to-[#1d4ed8] text-white font-bold text-xs font-mono hover:opacity-95 transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Site</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
