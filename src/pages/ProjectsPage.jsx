import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import RetroSearchBar from '../components/RetroSearchBar/RetroSearchBar';
import CyberCard from '../components/CyberCard/CyberCard';
import { Sparkles, Layers, SlidersHorizontal } from 'lucide-react';

export default function ProjectsPage({ onSelectProject }) {
  const { projects } = portfolioData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI/ML', 'Web Apps', 'Tools', 'Creative'];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          PROJECTS & ARCHITECTURE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Digital Creations & Systems
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          A showcase of full-stack engineering, generative AI shaders, developer tools, and high-fidelity user interfaces.
        </p>
      </motion.div>

      {/* Retro Conic Search Bar */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <RetroSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterClick={() => {
            // Cycle category on filter icon click
            const nextIdx = (categories.indexOf(selectedCategory) + 1) % categories.length;
            setSelectedCategory(categories[nextIdx]);
          }}
          placeholder="Search by keywords, tech, or tags..."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] text-black font-bold shadow-md shadow-[#00ffaa]/20'
                  : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pt-6">
          {filteredProjects.map((proj) => (
            <CyberCard
              key={proj.id}
              title={proj.title}
              subtitle={proj.subtitle}
              highlight={proj.highlight}
              prompt="VIEW SPECS"
              description={proj.description}
              tags={proj.tags}
              badge={proj.badge}
              liveUrl={proj.liveUrl}
              githubUrl={proj.githubUrl}
              onClick={() => onSelectProject(proj)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center py-16 px-6 rounded-3xl max-w-md mx-auto space-y-3">
          <p className="text-base font-bold text-slate-900 dark:text-white">No projects found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No projects matched "{searchQuery}" under "{selectedCategory}". Try clearing your search.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-mono text-[#00ffaa] underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
