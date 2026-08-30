import React, { useState, useEffect } from 'react';
import '../CyberCard/CyberCard.css';
import { Shield, Sparkles, MessageSquare, Copy, Check, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CyberProfileCard({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const trackers = Array.from({ length: 25 }, (_, i) => `ctr-${i + 1}`);

  const handleCopyTag = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("lunar_.ash");
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cyber-container select-none group w-full max-w-[340px] sm:max-w-[380px] h-[440px]">
      <div className="cyber-canvas">
        {trackers.map((trClass) => (
          <div key={trClass} className={`cyber-tracker ${trClass}`} />
        ))}

        <div className="cyber-card">
          <div className="cyber-card-content p-6">
            <div className="cyber-card-glare" />

            {/* Cyber lines animation */}
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Prompt on idle */}
            <p className="cyber-prompt">3D HOVER ME</p>

            {/* Top Status & Role Header */}
            <div className="flex items-center justify-between w-full z-10">
              <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE & ACTIVE</span>
              </span>

              <span className="text-[11px] font-mono text-sky-500 dark:text-sky-400 font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>CYBERSEC</span>
              </span>
            </div>

            {/* Middle: Live Avatar & Name Info */}
            <div className="my-auto z-10 w-full flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-blue-500/50 p-0.5 bg-slate-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/haruki-logo.png"
                    alt="Ashish Sunil PFP"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>

              <div>
                <div className="cyber-title text-xl sm:text-2xl font-extrabold text-center">
                  ASHISH SUNIL
                </div>
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 tracking-wider mt-0.5">
                  HARUKI · @lunar_.ash
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 italic font-medium max-w-[260px] mx-auto leading-relaxed">
                  "Champions Don't Specialize in One Type !"
                </p>
              </div>
            </div>

            {/* Glowing Orbs */}
            <div className="cyber-glowing-elements">
              <div className="cyber-glow-1" />
              <div className="cyber-glow-2" />
              <div className="cyber-glow-3" />
            </div>

            {/* Bottom: Tags & Quick Action Buttons */}
            <div className="z-10 w-full flex flex-col gap-3">
              <div className="flex flex-wrap justify-center gap-1.5">
                {["Python", "Discord.py", "CyberSec", "React"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-sky-300 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div
                className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Copy Discord tag button */}
                <button
                  onClick={handleCopyTag}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-3 py-1.5 rounded-xl bg-slate-200/90 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-slate-100 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  title="Copy Discord Username"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Discord'}</span>
                </button>

                {/* Direct Chat */}
                <a
                  href="https://discord.com/users/1098483466926030869"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all shadow-md shadow-[#5865F2]/25 hover:scale-[1.02]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct Chat</span>
                </a>
              </div>
            </div>

            {/* Particles */}
            <div className="cyber-card-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Corner Bracket Elements */}
            <div className="cyber-corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Scanline */}
            <div className="cyber-scan-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
