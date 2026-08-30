import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import FloatingFolder from '../components/FloatingFolder/FloatingFolder';
import { 
  Send, 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/Icons/SocialIcons';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { profile } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Full-Stack Web App' });
  const [attachedFile, setAttachedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    confetti({ particleCount: 30, spread: 50 });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="space-y-16 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left max-w-2xl space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Let's Build Something Exceptional.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Have an exciting project, architectural challenge, or full-time opportunity? Drop a message or connect via Discord.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form & 3D Folder Upload (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00ffaa]/20 border border-[#00ffaa]/40 text-[#00ffaa] flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-[#00ffaa] underline pt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#00ffaa] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#00ffaa] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
                    Project Focus
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#121218] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#00ffaa]"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="AI / Generative Model Integration">AI / Generative Model Integration</option>
                    <option value="Creative 3D / WebGL Landing Page">Creative 3D / WebGL Landing Page</option>
                    <option value="Consulting / Architecture">Consulting / Architecture</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
                    Message / Requirements
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#00ffaa] transition-colors resize-none"
                  />
                </div>

                {/* 3D Animated Floating Folder Upload */}
                <div className="pt-2 flex flex-col items-center sm:items-start">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                    Optional: Attach Specs / Wireframes
                  </span>
                  <FloatingFolder
                    label="Attach Brief or Specs"
                    onFileSelect={(file) => setAttachedFile(file)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-[#00ffaa]/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Connect & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* One Click Email Copy Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 inline-block">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Direct Email
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Prefer direct communication? Click below to copy:
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
            >
              <span className="truncate">{profile.email}</span>
              <span className="flex items-center gap-1 text-[#00ffaa] font-semibold">
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                {copiedEmail ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Discord Connect Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-[#5c67ff]/10 text-[#5c67ff] inline-block">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Discord Direct
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Chat or hop on a call via Discord:
              </p>
            </div>

            <a
              href={`https://discord.com/users/${profile.discordId}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#5c67ff] hover:bg-[#4a55ee] text-white flex items-center justify-between text-xs font-mono font-semibold transition-all shadow-md shadow-[#5c67ff]/30"
            >
              <span>Connect on Discord</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links Grid */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Elsewhere on the Web
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'GitHub', icon: GithubIcon, url: profile.github },
                { name: 'LinkedIn', icon: LinkedinIcon, url: profile.linkedin },
                { name: 'Twitter', icon: TwitterIcon, url: profile.twitter },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-all hover:-translate-y-1"
                >
                  <s.icon className="w-5 h-5 mb-1 text-slate-800 dark:text-slate-200" />
                  <span className="text-[11px] font-mono">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
