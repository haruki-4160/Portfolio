import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import VinylMusicPlayer from '../components/VinylMusicPlayer/VinylMusicPlayer';
import { Headphones } from 'lucide-react';

export default function DomainsPage() {
  const { whatIBuild } = portfolioData;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-6 py-6">
      {/* Dedicated Ambient Vinyl Music Lounge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-200/80 dark:border-white/10 shadow-lg"
      >
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
              <Headphones className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-blue-500 dark:text-blue-400 uppercase">
              AUDIO LOUNGE
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Curated Soundtrack & Vibing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Hover over the floating player to expand controls, track progress, or adjust volume.
          </p>
        </div>

        <div className="shrink-0">
          <VinylMusicPlayer />
        </div>
      </motion.div>

      {/* 02 / WHAT I BUILD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              02 / DOMAINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              What I Build
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatIBuild.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass-panel p-5 rounded-3xl space-y-3 border border-slate-200/80 dark:border-white/10 transition-shadow hover:shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
