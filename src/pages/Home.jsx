import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CyberCard from '../components/CyberCard/CyberCard';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Send,
  Shield,
  Bot,
  Globe,
  Cpu,
  Lock,
  ExternalLink,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home({ onNavigate, onSelectProject }) {
  const { profile, whatIBuild, selectedWorks, techStack } = portfolioData;

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
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{profile.education}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-[#00ffaa] via-[#00a2ff] to-[#ad51ff] bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          {/* Subtitle / Focus */}
          <div className="text-sm font-mono text-cyan-400 font-semibold flex items-center gap-2">
            <span className="text-[#00ffaa]">#</span>
            <span>Focus: {profile.specialty} · {profile.primaryLanguage}</span>
          </div>

          {/* Bio Subtext */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {profile.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleHeroCta}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] text-black font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-lg shadow-[#00ffaa]/25 hover:shadow-[#00ffaa]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/10 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
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

        {/* Right 3D Cyber Tilt Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="shrink-0 relative flex justify-center items-center py-6"
        >
          {/* Ambient back glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ffaa]/20 to-[#5c67ff]/20 rounded-3xl blur-2xl -z-10" />
          
          <CyberCard
            title="ASHISH.DEV"
            subtitle="CYBERSEC"
            highlight="PYTHON"
            prompt="HOVER ME"
            description="B.Tech Cyber Security student building Discord automation systems, security tools, and responsive web apps."
            tags={["Python", "Discord.py", "CyberSec", "React"]}
            badge="HARUKI CORE"
            icon={Shield}
            onClick={() => onNavigate('about')}
          />
        </motion.div>
      </section>

      {/* 02 / WHAT I BUILD */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
              02 / DOMAINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              What I Build
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatIBuild.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 border border-slate-200/80 dark:border-white/10 transition-shadow hover:shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-[#00ffaa]/10 text-[#00ffaa] group-hover:bg-[#00ffaa]/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00ffaa] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* 03 / SELECTED WORK */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
              03 / SELECTED WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Projects & Systems
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all repositories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Work Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {selectedWorks.map((work) => (
            <CyberCard
              key={work.id}
              title={work.title}
              subtitle={work.type.toUpperCase()}
              highlight={work.highlight}
              prompt="VIEW SPECS"
              description={work.description}
              tags={work.stack}
              badge={work.badge}
              githubUrl={work.githubUrl}
              onClick={() => onSelectProject(work)}
            />
          ))}
        </div>
      </motion.section>

      {/* 04 / STACK & ARSENAL */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
            04 / STACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Technologies & Tools
          </h2>
        </div>

        {/* Devicon Icons Floating Strip */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
            {techStack.map((tech) => (
              <div 
                key={tech.name} 
                className="flex flex-col items-center gap-2 group cursor-pointer"
                title={tech.name}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-[#00ffaa]/50 transition-all shadow-sm">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(0,255,170,0.5)]"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-[#00ffaa] transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
