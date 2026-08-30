import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import RetroSearchBar from '../components/RetroSearchBar/RetroSearchBar';
import CyberCard from '../components/CyberCard/CyberCard';
import { GithubIcon } from '../components/Icons/SocialIcons';
import { Sparkles, RefreshCw, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectsPage({ onSelectProject }) {
  const { projects: curatedProjects, profile } = portfolioData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'curated', 'github'
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const username = "haruki-4160";

  // Fetch live repos from GitHub API
  const fetchGitHubRepos = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data
          .filter(repo => !repo.fork) // Filter out forks if desired
          .map(repo => ({
            id: `gh-${repo.id}`,
            title: repo.name.toUpperCase().replace(/[-_]/g, ' '),
            subtitle: repo.language ? repo.language.toUpperCase() : "OPEN SOURCE",
            highlight: `★ ${repo.stargazers_count} STARS`,
            category: mapRepoCategory(repo.language, repo.topics),
            badge: repo.stargazers_count > 0 ? "POPULAR" : "GITHUB REPO",
            description: repo.description || "Public repository engineered with clean architecture and modular codebase.",
            fullDescription: repo.description ? `${repo.description}\n\nLive repository tracked on GitHub with ${repo.stargazers_count} stars, ${repo.forks_count} forks, and continuous commits.` : `Live open source project maintained on GitHub by ${username}.`,
            tags: [repo.language, ...(repo.topics || [])].filter(Boolean),
            liveUrl: repo.homepage || null,
            githubUrl: repo.html_url,
            isLiveGitHub: true,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: new Date(repo.updated_at).toLocaleDateString(),
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
          }));
        setGithubRepos(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch GitHub repos', err);
    } finally {
      setLoadingGithub(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  function mapRepoCategory(lang, topics = []) {
    const combined = `${lang || ''} ${topics.join(' ')}`.toLowerCase();
    if (combined.includes('python') || combined.includes('ai') || combined.includes('ml') || combined.includes('torch')) return 'AI/ML';
    if (combined.includes('react') || combined.includes('next') || combined.includes('vue') || combined.includes('web')) return 'Web Apps';
    if (combined.includes('rust') || combined.includes('tool') || combined.includes('cli') || combined.includes('go')) return 'Tools';
    return 'Web Apps';
  }

  // Combine curated + live github repos
  const allProjects = useMemo(() => {
    if (viewMode === 'curated') return curatedProjects;
    if (viewMode === 'github') return githubRepos;
    // 'all': Curated first, then any extra unique repos
    const curatedTitles = new Set(curatedProjects.map(p => p.title.toLowerCase()));
    const uniqueGh = githubRepos.filter(g => !curatedTitles.has(g.title.toLowerCase()));
    return [...curatedProjects, ...uniqueGh];
  }, [curatedProjects, githubRepos, viewMode]);

  const categories = ['All', 'AI/ML', 'Web Apps', 'Tools', 'Creative'];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const handleRefreshClick = () => {
    fetchGitHubRepos();
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="space-y-12 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          PROJECTS & LIVE REPOSITORIES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Digital Creations & Systems
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Actively syncing with <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[#00ffaa] underline font-mono">@{username}</a> on GitHub.
        </p>

        {/* View Mode Switcher & Live Sync Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'curated', label: 'Featured Only' },
              { id: 'github', label: 'Live GitHub Repos' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  viewMode === tab.id
                    ? 'bg-black text-[#00ffaa] dark:bg-white/15 dark:text-white font-bold shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefreshClick}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Fetch latest GitHub commits and repos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#00ffaa]' : 'text-slate-400'}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync GitHub'}</span>
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
          placeholder="Search repos, tech stack, tools..."
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
              prompt={proj.isLiveGitHub ? "GITHUB REPO" : "VIEW CASE"}
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
          <p className="text-base font-bold text-slate-900 dark:text-white">No repositories found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No projects matched "{searchQuery}". Try clearing filters or syncing GitHub.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setViewMode('all'); }}
            className="text-xs font-mono text-[#00ffaa] underline pt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
