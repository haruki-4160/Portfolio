import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CyberProfileCard from '../components/CyberProfileCard/CyberProfileCard';
import VinylMusicPlayer from '../components/VinylMusicPlayer/VinylMusicPlayer';
import TakeOffButton from '../components/TakeOffButton/TakeOffButton';
import { Shield, Headphones } from 'lucide-react';

export default function HeroPage({ onNavigate, onLaunchFlight }) {
  const { profile } = portfolioData;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-8 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll pr-1">
      {/* 🌟 Top Hero Row: Text Info + 3D Cyber Profile Card */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-14">
        {/* Left Hero Text & Quick Action Badges */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-5 max-w-2xl text-left"
        >
          {/* Sapphire Status & Education Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono shadow-sm">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>{profile.education}</span>
            </div>
          </div>

          {/* Headline with Liquid Ice & Deep Sapphire Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-[#f0f9ff] via-[#60a5fa] to-[#2563eb] dark:from-[#f0f9ff] dark:via-[#93c5fd] dark:to-[#3b82f6] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(59,130,246,0.3)]">
              {profile.name}
            </span>
          </h1>

          {/* Subtitle / Focus Accent */}
          <div className="text-sm font-mono text-sky-500 dark:text-sky-400 font-semibold flex items-center gap-2">
            <span className="text-blue-500 dark:text-blue-400">#</span>
            <span>Focus: {profile.specialty} · {profile.primaryLanguage}</span>
          </div>

          {/* Bio Subtext */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {profile.tagline}
          </p>

          {/* Action CTAs with Full-Screen Paper Plane Take-Off Animation */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <TakeOffButton
              text="View Selected Work"
              sentText="Navigating..."
              variant="primary"
              targetTab="projects"
              onLaunch={onLaunchFlight}
            />

            <TakeOffButton
              text="Get In Touch"
              sentText="Opening..."
              variant="secondary"
              targetTab="contact"
              onLaunch={onLaunchFlight}
            />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-200 dark:border-white/10">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Hero Column: 3D Cyber Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="shrink-0 flex items-center justify-center py-4 relative z-10"
        >
          {/* Ambient sapphire back glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-3xl blur-3xl -z-10" />

          {/* 3D Cyber Profile Card */}
          <CyberProfileCard onNavigate={onNavigate} />
        </motion.div>
      </div>

      {/* 🎧 Dedicated Ambient Vinyl Music Lounge */}
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
            Hover over the vinyl player to expand controls, scrub through the track, or adjust volume.
          </p>
        </div>

        <div className="shrink-0">
          <VinylMusicPlayer />
        </div>
      </motion.div>
    </div>
  );
}
