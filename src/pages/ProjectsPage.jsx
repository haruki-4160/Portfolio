import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import RetroSearchBar from '../components/RetroSearchBar/RetroSearchBar';
import CyberCard from '../components/CyberCard/CyberCard';
import { RefreshCw, Star, GitFork, ExternalLink, Code2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectsPage({ onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [githubRepos, setGithubRepos] = useState(() => {
    return portfolioData.selectedWorks.map(w => ({
      ...w,
      category: w.type === 'bot' ? 'AI/ML' : w.type === 'frontend' ? 'Web Apps' : 'Tools',
      stars: w.highlight?.includes('★') ? parseInt(w.highlight.replace(/\D/g, '')) || 0 : 0,
      tags: w.stack || []
    }));
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const username = "haruki-4160";

  // Fetch live repos from GitHub API
  const fetchGitHubRepos = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(repo => {
            const lang = repo.language || (repo.topics && repo.topics[0]) || "Code";
            return {
              id: `gh-${repo.id}`,
              name: repo.name,
              title: repo.name.toUpperCase().replace(/[-_]/g, ' '),
              subtitle: lang.toUpperCase(),
              highlight: repo.stargazers_count > 0 ? `★ ${repo.stargazers_count} STARS` : "ACTIVE REPO",
              category: mapRepoCategory(repo.language, repo.topics),
              badge: repo.stargazers_count > 0 ? "POPULAR" : "GITHUB",
              description: repo.description || "GitHub repository actively maintained by Haruki.",
              fullDescription: repo.description ? `${repo.description}\n\nRepository: ${repo.full_name}\nStars: ${repo.stargazers_count} | Forks: ${repo.forks_count}\nLast updated: ${new Date(repo.updated_at).toLocaleDateString()}` : `Public GitHub repository maintained by ${username}.`,
              tags: [repo.language, ...(repo.topics || [])].filter(Boolean),
              liveUrl: repo.homepage || null,
              githubUrl: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updatedAt: new Date(repo.updated_at).toLocaleDateString(),
              image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            };
          });
          setGithubRepos(formatted);
        }
      }
    } catch (err) {
      console.error('Failed to fetch GitHub repos', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  function mapRepoCategory(lang, topics = []) {
    const combined = `${lang || ''} ${topics.join(' ')}`.toLowerCase();
    if (combined.includes('python') || combined.includes('ai') || combined.includes('ml') || combined.includes('torch')) return 'AI/ML';
    if (combined.includes('react') || combined.includes('next') || combined.includes('vue') || combined.includes('html') || combined.includes('css') || combined.includes('javascript') || combined.includes('typescript')) return 'Web Apps';
    if (combined.includes('rust') || combined.includes('c++') || combined.includes('c') || combined.includes('cli') || combined.includes('go')) return 'Tools';
    return 'Web Apps';
  }

  const categories = ['All', 'Web Apps', 'AI/ML', 'Tools'];

  const filteredProjects = useMemo(() => {
    return githubRepos.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));
      return matchesCat && matchesSearch;
    });
  }, [githubRepos, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-24 pt-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-left max-w-2xl"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
          ALL REPOSITORIES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Code Arsenal & Open Source
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Explore all public repositories directly synchronized from GitHub with live commit metadata, stars, and language breakdowns.
        </p>

        {/* Live GitHub Sync Indicator & Refresh Trigger */}
        <div className="flex items-center gap-3 pt-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync: @{username}</span>
          </div>

          <button
            onClick={fetchGitHubRepos}
            disabled={refreshing}
            className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh GitHub Repositories"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-500' : 'text-slate-400'}`} />
            <span>{refreshing ? 'Fetching Live Repos...' : 'Sync Latest GitHub Commits'}</span>
          </button>
        </div>
      </motion.div>

      {/* Retro Conic Search Bar */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <RetroSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterClick={() => {
            const nextIdx = (categories.indexOf(selectedCategory) + 1) % categories.length;
            setSelectedCategory(categories[nextIdx]);
          }}
          placeholder="Search repositories, tech stack..."
        />

        {/* Category Pills with Sapphire Active State */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white font-bold shadow-md shadow-blue-500/25'
                  : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pt-6">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
              className="w-full flex justify-center"
            >
              <CyberCard
                title={proj.title}
                subtitle={proj.subtitle}
                highlight={proj.highlight}
                prompt="VIEW DETAILS"
                description={proj.description}
                tags={proj.tags}
                badge={proj.badge}
                githubUrl={proj.githubUrl}
                liveUrl={proj.liveUrl}
                onClick={() => onSelectProject(proj)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center py-16 rounded-3xl space-y-3 max-w-lg mx-auto">
          <p className="text-base font-bold text-slate-900 dark:text-white">No repositories match your filter</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Try adjusting your search query or selecting a different category pill.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-mono text-blue-500 dark:text-blue-400 hover:underline pt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
