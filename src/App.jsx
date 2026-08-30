import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import BackgroundGrid from './components/Background/BackgroundGrid';
import AppleDock from './components/AppleDock/AppleDock';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import ProjectModal from './components/ProjectModal/ProjectModal';
import { GithubIcon, DiscordIcon, LinkedinIcon, InstagramIcon } from './components/Icons/SocialIcons';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function PortfolioApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll spy with active section detector
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
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70, duration: 1.4 });
      } else {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between text-slate-900 dark:text-slate-100 selection:bg-[#3b82f6]/30 selection:text-[#93c5fd]">
      {/* Custom 3-Second Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Dynamic Parallax Background */}
      <BackgroundGrid />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-[#0a0a0f]/80 border-b border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Crest with Favicon */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/20 dark:ring-white/10 group-hover:scale-105 transition-transform bg-black/40 shadow-md">
              <img
                src="/haruki-logo.png"
                alt="Haruki Crest"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5 font-mono">
                HARUKI
                <span className="text-sky-500 text-xs">✦</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden sm:block">
                ASHISH SUNIL // CYBERSECURITY
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

      {/* Footer with Real Verified Social Links */}
      <footer className="w-full text-center py-10 pb-32 text-xs font-mono text-slate-500 dark:text-slate-500 border-t border-slate-200/50 dark:border-white/5 z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/haruki-logo.png" alt="Logo" className="w-6 h-6 opacity-80" />
          <span className="font-bold text-slate-800 dark:text-slate-200 tracking-wider">ASHISH SUNIL · HARUKI</span>
        </div>

        {/* Clickable Socials Bar */}
        <div className="flex items-center justify-center gap-4 my-4">
          <a
            href="https://github.com/haruki-4160"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all shadow-sm hover:scale-105"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-sunil-159503364"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-[#0077B5] transition-all shadow-sm hover:scale-105"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/huesofharuki?igsi=MW5mcWQ0cXFtN3ppNg%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-[#E4405F] transition-all shadow-sm hover:scale-105"
            title="Instagram (@huesofharuki)"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://discord.com/users/1098483466926030869"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-[#5865F2] transition-all shadow-sm hover:scale-105"
            title="Discord Direct"
          >
            <DiscordIcon className="w-4 h-4" />
          </a>
        </div>

        <p>© {new Date().getFullYear()} Ashish Sunil (Haruki). Built with React, Tailwind & tactile 3D CSS.</p>
      </footer>

      {/* Floating Rectangular Glass Apple-Style Dock */}
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
      <SmoothScroll>
        <PortfolioApp />
      </SmoothScroll>
    </ThemeProvider>
  );
}
