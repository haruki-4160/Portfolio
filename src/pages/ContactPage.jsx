import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import FloatingFolder from '../components/FloatingFolder/FloatingFolder';
import SendMessageButton from '../components/SendMessageButton/SendMessageButton';
import { 
  Send, 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight,
  QrCode,
  ExternalLink,
  ScanLine,
  AlertCircle,
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from '../components/Icons/SocialIcons';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { profile } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Discord Bot & Automation' });
  const [attachedFile, setAttachedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 5) {
      setErrorMessage('Please write a brief message or project description (minimum 5 characters).');
      return;
    }

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
        <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Let's Build Something Exceptional.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Have an exciting project, architectural challenge, or collaboration in mind? Drop a message or connect directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form & 3D Folder Upload (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
            {/* Success State */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. I'll review your project details and get back to you within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '', projectType: 'Discord Bot & Automation' });
                    }}
                    className="text-xs font-mono text-blue-500 dark:text-blue-400 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message Banner */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

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
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#121218] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Discord Bot & Automation">Discord Bot & Automation</option>
                    <option value="Cybersecurity Audit / Systems">Cybersecurity Audit / Systems</option>
                    <option value="Web & Frontend Application">Web & Frontend Application</option>
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors resize-none"
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

                {/* Interactive Plane Take-Off Send Message Button */}
                <div className="pt-2">
                  <SendMessageButton isSubmitted={submitted} type="submit" />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Connect, Scannable Instagram QR & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Scannable Instagram QR Code Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 relative overflow-hidden border border-white/80 dark:border-white/10">
            {/* Ambient Instagram Brand Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] opacity-20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white inline-block shadow-sm">
                  <InstagramIcon className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Instagram Official
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    @huesofharuki
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                <ScanLine className="w-3 h-3" />
                SCANNABLE
              </span>
            </div>

            {/* High-Contrast Scannable QR Container */}
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-md flex flex-col items-center justify-center group relative">
              <img
                src="/instagram-qr.png"
                alt="Hues of Haruki Instagram QR Code"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <span className="text-[10px] font-mono text-slate-600 font-semibold mt-1">
                Scan with phone camera or Instagram
              </span>
            </div>

            {/* Direct Open Button */}
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white flex items-center justify-center gap-2 text-xs font-mono font-bold shadow-md hover:opacity-95 transition-all hover:scale-[1.01]"
            >
              <span>Open @huesofharuki on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Clickable Direct Email Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 inline-block">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Email
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click below to copy or launch mail client:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 transition-all shadow-sm"
              >
                <span className="truncate">{profile.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-sky-400 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Discord Direct Connect Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <span className="p-2.5 rounded-xl bg-[#5865F2]/10 text-[#5865F2] inline-block">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Discord Direct
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Chat or hop on a call via Discord:
              </p>
            </div>

            <a
              href={`https://discord.com/users/${profile.discordId}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-between text-xs font-mono font-semibold transition-all shadow-md shadow-[#5865F2]/25 hover:scale-[1.01]"
            >
              <span>Connect on Discord</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Elsewhere on the Web (GitHub, LinkedIn, Email) */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Elsewhere on the Web
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all hover:-translate-y-1 shadow-sm"
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5 mb-1 text-slate-800 dark:text-slate-200" />
                <span className="text-[11px] font-mono font-semibold">GitHub</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#0077B5] transition-all hover:-translate-y-1 shadow-sm"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5 mb-1 text-slate-800 dark:text-slate-200" />
                <span className="text-[11px] font-mono font-semibold">LinkedIn</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-sky-400 transition-all hover:-translate-y-1 shadow-sm"
                title="Direct Email"
              >
                <Mail className="w-5 h-5 mb-1 text-slate-800 dark:text-slate-200" />
                <span className="text-[11px] font-mono font-semibold">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
