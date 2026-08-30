import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import DiscordPresence from '../components/DiscordPresence/DiscordPresence';
import FloatingFolder from '../components/FloatingFolder/FloatingFolder';
import { 
  Briefcase, 
  GraduationCap, 
  Terminal, 
  Sparkles, 
  Laptop, 
  Heart, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const { profile, experience, skills } = portfolioData;

  return (
    <div className="space-y-16 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left max-w-3xl space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          ABOUT & ROOTS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          The Story Behind the Code
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          I'm a full-stack engineer and design technologist obsessively focused on building responsive, tactile web applications with zero lag and exceptional craftsmanship.
        </p>
      </motion.div>

      {/* Grid: Story & Live Discord Presence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Narrative Story & Skills (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-panel p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00ffaa]" />
              Philosophy & Craft
            </h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                My journey started with a curiosity for how micro-interactions, spring physics, and WebGL could transform ordinary web software into immersive playgrounds.
              </p>
              <p>
                Today, I build complete end-to-end architectures: from scalable backends, real-time WebSocket pipelines, and automated CI/CD workflows, all the way to pixel-perfect, accessible UI components.
              </p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="glass-panel p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-500" />
              Technical Stack & Arsenal
            </h3>

            <div className="space-y-4">
              {skills.map((grp) => (
                <div key={grp.category} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    <grp.icon className="w-4 h-4 text-[#5c67ff]" />
                    <span>{grp.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Discord Widget & 3D Resume Folder (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Live Discord Presence */}
          <DiscordPresence defaultDiscordId={profile.discordId} />

          {/* 3D Floating Folder Resume Box */}
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center space-y-3">
            <div className="text-left w-full">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                DOCUMENTATION
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Download Curriculum Vitae
              </h4>
            </div>

            <FloatingFolder
              label="Download Resume.pdf"
              isDownload={true}
              downloadUrl="#"
              downloadFilename="Haruki_FullStack_Resume.pdf"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2">
              Interactive 3D folder dropzone — click to download full verified CV.
            </p>
          </div>
        </div>
      </div>

      {/* Experience & Milestones Timeline */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase">
            CAREER TRAJECTORY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Experience & Journey
          </h2>
        </div>

        <div className="space-y-4">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-[#00ffaa]"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00ffaa] font-bold">
                  {item.period}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.role} <span className="text-slate-400 font-normal">@ {item.company}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
