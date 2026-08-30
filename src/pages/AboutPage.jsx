import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import DiscordPresence from '../components/DiscordPresence/DiscordPresence';
import FloatingFolder from '../components/FloatingFolder/FloatingFolder';
import { 
  Shield, 
  Terminal, 
  Sparkles, 
  Laptop, 
  Code2, 
  GraduationCap, 
  Lock,
  Network,
  Cpu,
  Bot
} from 'lucide-react';

export default function AboutPage() {
  const { profile, skillDomains, techStack } = portfolioData;

  return (
    <div className="space-y-16 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left max-w-3xl space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          01 / BACKGROUND & FOCUS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          About {profile.name}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {profile.education} with a strong foundation in Python, Discord bot architectures, security fundamentals, and modern web interfaces.
        </p>
      </motion.div>

      {/* Grid: Narrative / Domains & Live Discord Presence */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Column: Bio Details & Domain Trees (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Bio Overview */}
          <div className="glass-panel p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00ffaa]" />
              Focus & Core Philosophy
            </h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                I'm a first-year Computer Science Engineering student specializing in <strong>Cyber Security</strong>. My technical journey is driven by building real-world software, starting with <strong>Discord bot systems</strong> in Python and expanding into application security, systems/networks, and interactive frontends.
              </p>
              <p>
                I actively practice <strong>AI-Assisted Development</strong> — utilizing modern AI to accelerate research, prototyping, and debugging while strictly understanding, optimizing, and maintaining the underlying architecture.
              </p>
            </div>
          </div>

          {/* Cybersecurity & Development Domain Trees */}
          <div className="glass-panel p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              Domains & Technical Focus
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillDomains.map((dom) => {
                const Icon = dom.icon;
                return (
                  <div key={dom.domain} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00ffaa] tracking-wider">
                      <Icon className="w-4 h-4 text-[#5c67ff]" />
                      <span>{dom.domain}</span>
                    </div>

                    <div className="space-y-2 pl-2 border-l-2 border-slate-200 dark:border-white/10">
                      {dom.items.map((item) => (
                        <div key={item} className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="text-slate-400">├──</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Discord Widget & 3D Resume Folder (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Live Discord Presence Widget */}
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
              downloadFilename="Ashish_Sunil_Resume.pdf"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2">
              Interactive 3D folder dropzone — click to download full CV.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
