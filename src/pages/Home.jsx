import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CyberCard from '../components/CyberCard/CyberCard';
import CyberProfileCard from '../components/CyberProfileCard/CyberProfileCard';
import VinylMusicPlayer from '../components/VinylMusicPlayer/VinylMusicPlayer';
import TakeOffButton from '../components/TakeOffButton/TakeOffButton';
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
  Code2, 
  Headphones 
} from 'lucide-react';

export default function Home({ onNavigate, onSelectProject, onLaunchFlight }) {
  const { profile, whatIBuild, selectedWorks, techStack } = portfolioData;

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
      {/* 🌟 PANEL 1: HERO INTRO & 3D CYBER PROFILE */}
      <section className="w-full lg:w-[78vw] lg:max-w-[1100px] flex-shrink-0 min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row items-center justify-between gap-10">
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
      </section>

      {/* 🎧 PANEL 2: AUDIO LOUNGE & DOMAINS */}
      <section className="w-full lg:w-[78vw] lg:max-w-[1150px] flex-shrink-0 min-h-[calc(100vh-8rem)] flex flex-col justify-center space-y-6">
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
              <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
                02 / DOMAINS
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
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
      </section>

      {/* 🚀 PANEL 3: FEATURED PROJECTS & TECH STACK */}
      <section className="w-full lg:w-[82vw] lg:max-w-[1250px] flex-shrink-0 min-h-[calc(100vh-8rem)] flex flex-col justify-center space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
              03 / SELECTED WORK
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Featured Projects & Systems
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all repos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Work Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {selectedWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full flex justify-center"
            >
              <CyberCard
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
            </motion.div>
          ))}
        </div>

        {/* 04 / STACK ARSENAL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
              04 / ARSENAL
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">· Technologies & Tools</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-4 sm:p-5 rounded-3xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {techStack.map((tech) => (
                <div 
                  key={tech.name} 
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  title={tech.name}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center p-2 group-hover:scale-110 group-hover:border-blue-500/50 transition-all shadow-sm">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
