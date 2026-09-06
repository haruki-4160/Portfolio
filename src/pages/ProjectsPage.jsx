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
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-8 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll pr-1">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 text-left max-w-2xl"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
          03 / PROJECTS & REPOSITORIES
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Featured Work & Code Arsenal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Explore featured production systems with interactive 3D perspective cards, plus live open-source repositories synchronized from GitHub.
        </p>
      </motion.div>

      {/* 🌟 Top: 3D Featured CyberCards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Featured Systems
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {portfolioData.selectedWorks.slice(0, 3).map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
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
      </div>

      {/* 💻 Bottom: Live GitHub Repositories Catalog */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Live GitHub Catalog ({filteredProjects.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchGitHubRepos}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="Sync with GitHub"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin text-blue-500' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <RetroSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search repositories by title, tag, or topic..."
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
              className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 dark:text-blue-400 font-bold">
                    {repo.subtitle || 'REPOSITORY'}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-0.5">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                  {repo.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>

                {/* Tags */}
                {repo.tags && repo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => onSelectProject && onSelectProject(repo)}
                  className="text-xs font-mono text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Specs</span>
                </button>

                <div className="flex items-center gap-2">
                  {repo.githubUrl && (
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors"
                      title="GitHub Repository"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-mono text-slate-500">No repositories found matching "{searchQuery}".</p>
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
    </div>
  );
}
