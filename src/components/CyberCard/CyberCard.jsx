import React from 'react';
import './CyberCard.css';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../Icons/SocialIcons';

export default function CyberCard({
  title = "CYBER CARD",
  subtitle = "INTERACTIVE",
  highlight = "3D EFFECT",
  prompt = "HOVER ME",
  description = "A responsive high-performance system crafted with sleek architecture.",
  tags = ["React", "Tailwind", "Motion"],
  githubUrl,
  liveUrl,
  icon: Icon,
  badge = "FEATURED",
  onClick
}) {
  const trackers = Array.from({ length: 25 }, (_, i) => `ctr-${i + 1}`);

  return (
    <div className="cyber-container select-none group" onClick={onClick}>
      <div className="cyber-canvas">
        {trackers.map((trClass) => (
          <div key={trClass} className={`cyber-tracker ${trClass}`} />
        ))}

        <div className="cyber-card">
          <div className="cyber-card-content">
            <div className="cyber-card-glare" />
            
            {/* Cyber lines animation */}
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Prompt on idle */}
            <p className="cyber-prompt">{prompt}</p>

            {/* Top Bar / Badge & Icon */}
            <div className="flex items-center justify-between w-full z-10">
              <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#00ffaa]/10 text-[#00ffaa] border border-[#00ffaa]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00ffaa]" />
                {badge}
              </span>
              {Icon && <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#00ffaa] transition-colors" />}
            </div>

            {/* Title & Description */}
            <div className="my-auto z-10 w-full">
              <div className="cyber-title">{title}</div>
              {description && (
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Glowing Orbs */}
            <div className="cyber-glowing-elements">
              <div className="cyber-glow-1" />
              <div className="cyber-glow-2" />
              <div className="cyber-glow-3" />
            </div>

            {/* Subtitle / Tags / Footer Links */}
            <div className="z-10 w-full flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="cyber-subtitle">
                  <span>{subtitle}</span>
                  <span className="cyber-highlight">{highlight}</span>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                      title="View GitHub Source"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-[#00ffaa]/20 hover:bg-[#00ffaa]/30 text-[#00ffaa] transition-colors"
                      title="Launch Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
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
