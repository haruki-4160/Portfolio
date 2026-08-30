import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import RetroSearchBar from '../components/RetroSearchBar/RetroSearchBar';
import CyberCard from '../components/CyberCard/CyberCard';
import { RefreshCw, Star, GitFork, ExternalLink, Code2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectsPage({ onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const username = "haruki-4160";

  // Fetch live repos from GitHub API
  const fetchGitHubRepos = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`);
      if (res.ok) {
        const data = await res.json();
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
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [githubRepos, selectedCategory, searchQuery]);

  const handleRefreshClick = () => {
    fetchGitHubRepos();
    confetti({ particleCount: 35, spread: 50 });
  };

  return (
    <div className="space-y-12 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-4"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#00ffaa] uppercase px-3.5 py-1 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30">
          GITHUB REPOSITORIES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Live Repositories & Work
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Directly synced from <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[#00ffaa] underline font-mono">github.com/{username}</a>
        </p>

        {/* Live Sync Trigger */}
        <div className="pt-2">
          <button
            onClick={handleRefreshClick}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#00ffaa]' : 'text-slate-400'}`} />
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

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
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

      {/* Repositories Grid */}
      {loading ? (
        <div className="text-center py-16 space-y-3">
          <RefreshCw className="w-8 h-8 text-[#00ffaa] animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Loading GitHub repositories...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pt-6">
          {filteredProjects.map((proj) => (
            <CyberCard
              key={proj.id}
              title={proj.title}
              subtitle={proj.subtitle}
              highlight={proj.highlight}
              prompt="VIEW REPO"
              description={proj.description}
              tags={proj.tags.length > 0 ? proj.tags : ["GitHub", "Source"]}
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
            No repositories matched "{searchQuery}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-mono text-[#00ffaa] underline pt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
