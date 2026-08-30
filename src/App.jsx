import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import BackgroundGrid from './components/Background/BackgroundGrid';
import AppleDock from './components/AppleDock/AppleDock';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import ProjectModal from './components/ProjectModal/ProjectModal';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { Sparkles, Terminal } from 'lucide-react';

function PortfolioApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen relative flex flex-col justify-between text-slate-900 dark:text-slate-100 selection:bg-[#00ffaa]/30 selection:text-[#00ffaa]">
      {/* Dynamic Background */}
      <BackgroundGrid />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-[#0a0a0f]/80 border-b border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Moniker */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00ffaa] to-[#00a2ff] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#00ffaa]/20 group-hover:scale-105 transition-transform">
              H
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                HARUKI
                <span className="text-[#00ffaa] text-xs">✦</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden sm:block">
                CREATIVE DEVELOPER
              </div>
            </div>
          </button>

          {/* Right Header: 3D Skeuomorphic Theme Switch */}
          <div className="flex items-center gap-4">
            <ThemeSwitch showLabels={false} />
          </div>
        </div>
      </header>

      {/* Main Content Area with Page Transitions */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 pt-6 sm:pt-8 z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Home onNavigate={setActiveTab} onSelectProject={setSelectedProject} />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ProjectsPage onSelectProject={setSelectedProject} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <AboutPage />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 pb-28 text-xs font-mono text-slate-500 dark:text-slate-500 border-t border-slate-200/50 dark:border-white/5 z-10">
        <p>© {new Date().getFullYear()} Haruki. Built with React, Tailwind & tactile 3D CSS.</p>
      </footer>

      {/* Floating Apple-Style Magnification Dock */}
      <AppleDock activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
