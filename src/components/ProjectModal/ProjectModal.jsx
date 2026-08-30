import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../Icons/SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="glass-panel relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 z-10 my-auto"
        >
          {/* Header Image with close button */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[#00ffaa]/20 text-[#00ffaa] border border-[#00ffaa]/40">
                {project.badge || project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#00ffaa] uppercase">
                Overview & Architecture
              </h4>
              <p className="text-slate-300 dark:text-slate-300 text-sm leading-relaxed mt-2">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#5c67ff] dark:text-[#00ffaa]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] text-black font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-[#00ffaa]/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Project</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors border border-white/10"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
