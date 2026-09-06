import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function DomainsStackPage() {
  const { whatIBuild, techStack } = portfolioData;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-8 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll pr-1">
      {/* 02 / WHAT I BUILD DOMAINS */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
            02 / DOMAINS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            What I Build
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Specialized engineering across automated Discord infrastructure, cybersecurity tooling, and tactile frontends.
          </p>
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

      {/* 04 / TECH ARSENAL STACK */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
            ARSENAL
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">· Technologies & Tools</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-5 rounded-3xl"
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
