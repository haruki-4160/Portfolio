import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CyberCard from '../components/CyberCard/CyberCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedPage({ onNavigate, onSelectProject }) {
  const { selectedWorks, techStack } = portfolioData;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
            03 / FEATURED
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            Selected Work & Architecture
          </h2>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all repositories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selected Work Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {selectedWorks.slice(0, 3).map((work, idx) => (
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
      <div className="space-y-3 pt-2">
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
    </div>
  );
}
