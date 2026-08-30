import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import BackgroundGrid from './components/Background/BackgroundGrid';
import AppleDock from './components/AppleDock/AppleDock';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import ProjectModal from './components/ProjectModal/ProjectModal';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function PortfolioApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // Header offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between text-slate-900 dark:text-slate-100 selection:bg-[#00ffaa]/30 selection:text-[#00ffaa]">
      {/* Dynamic Background */}
      <BackgroundGrid />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-[#0a0a0f]/80 border-b border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Crest with new uploaded Favicon */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/20 dark:ring-white/10 group-hover:scale-105 transition-transform bg-black/40">
              <img
                src="/haruki-logo.png"
                alt="Haruki Crest"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5 font-mono">
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

      {/* Main Continuous Scroll Feed */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 pt-6 sm:pt-10 z-10 space-y-24 sm:space-y-36">
        {/* Section 1: Home / Hero */}
        <section id="home" className="scroll-mt-24">
          <Home onNavigate={handleNavigate} onSelectProject={setSelectedProject} />
        </section>

        {/* Section 2: Projects */}
        <section id="projects" className="scroll-mt-24">
          <ProjectsPage onSelectProject={setSelectedProject} />
        </section>

        {/* Section 3: About & Journey */}
        <section id="about" className="scroll-mt-24">
          <AboutPage />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="scroll-mt-24">
          <ContactPage />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-10 pb-32 text-xs font-mono text-slate-500 dark:text-slate-500 border-t border-slate-200/50 dark:border-white/5 z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/haruki-logo.png" alt="Logo" className="w-5 h-5 opacity-70" />
          <span className="font-bold text-slate-700 dark:text-slate-300">HARUKI PORTFOLIO</span>
        </div>
        <p>© {new Date().getFullYear()} Haruki. Built with React, Tailwind & tactile 3D CSS.</p>
      </footer>

      {/* Floating Apple-Style Springy Magnification Dock */}
      <AppleDock activeTab={activeTab} onTabChange={handleNavigate} />

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
