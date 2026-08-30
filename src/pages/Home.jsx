import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CyberCard from '../components/CyberCard/CyberCard';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send,
  Code,
  Layers,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home({ onNavigate, onSelectProject }) {
  const { profile, skills, projects } = portfolioData;
  const [tokyoTime, setTokyoTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
      setTokyoTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroCta = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onNavigate('projects');
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 🌟 HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-8 sm:pt-16">
        {/* Left Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-6 max-w-2xl text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{profile.status}</span>
          </div>

          {/* Kinetic Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Engineering tactile, <br />
            <span className="bg-gradient-to-r from-[#00ffaa] via-[#00a2ff] to-[#ad51ff] bg-clip-text text-transparent">
              high-performance
            </span> <br />
            digital universes.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Hey, I'm <strong className="text-slate-900 dark:text-white font-semibold">{profile.name}</strong> — a {profile.title}. I combine cutting-edge web architecture with fluid 3D interactions to create unforgettable digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleHeroCta}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] text-black font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-lg shadow-[#00ffaa]/25 hover:shadow-[#00ffaa]/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/10 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <span>Get In Touch</span>
              <Send className="w-4 h-4 text-cyan-500" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right 3D Cyber Card Hero Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="shrink-0 relative flex justify-center items-center py-6"
        >
          {/* Ambient back aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ffaa]/20 to-[#5c67ff]/20 rounded-3xl blur-2xl -z-10" />
          
          <CyberCard
            title="HARUKI.DEV"
            subtitle="FULL-STACK"
            highlight="CREATIVE"
            prompt="HOVER ME"
            description="Specialized in reactive frontend physics, WebGL canvas shaders, and scalable distributed backends."
            tags={["React", "Node", "Tailwind", "Three.js"]}
            badge="PORTFOLIO CORE"
            icon={Sparkles}
            onClick={() => onNavigate('about')}
          />
        </motion.div>
      </section>

      {/* 🍱 BENTO GRID HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
              Bento Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              At a Glance
            </h2>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Learn more about my journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Timezone & Location */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                <MapPin className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                {tokyoTime || 'Loading...'}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Tokyo, Japan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Working globally across UTC+9 with overlap across Americas & Europe.
              </p>
            </div>
          </div>

          {/* Bento Card 2: Philosophy */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 inline-block">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Design & Engineering Harmony
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Zero compromise on performance, accessibility, and micro-interaction delight.
              </p>
            </div>
          </div>

          {/* Bento Card 3: Stack Arsenal */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-[#00ffaa]/10 text-[#00ffaa] inline-block">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Modern Arsenal
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["React", "Next.js", "Tailwind", "TypeScript", "FastAPI", "Postgres"].map((s) => (
                  <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-700 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FEATURED WORK PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View all archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.slice(0, 3).map((proj) => (
            <CyberCard
              key={proj.id}
              title={proj.title}
              subtitle={proj.subtitle}
              highlight={proj.highlight}
              prompt="VIEW CASE"
              description={proj.description}
              tags={proj.tags}
              badge={proj.badge}
              liveUrl={proj.liveUrl}
              githubUrl={proj.githubUrl}
              onClick={() => onSelectProject(proj)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
