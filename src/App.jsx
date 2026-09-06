import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import BackgroundGrid from './components/Background/BackgroundGrid';
import AppleDock from './components/AppleDock/AppleDock';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import ProjectModal from './components/ProjectModal/ProjectModal';
import FlightNavigator from './components/FlightNavigator/FlightNavigator';
import { GithubIcon, DiscordIcon, LinkedinIcon, InstagramIcon } from './components/Icons/SocialIcons';
import { Mail } from 'lucide-react';
import HeroPage from './pages/HeroPage';
import DomainsPage from './pages/DomainsPage';
import FeaturedPage from './pages/FeaturedPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function PortfolioApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flightState, setFlightState] = useState(null);
  const [pageShift, setPageShift] = useState(false);

  // Scroll spy with active section detector for horizontal / vertical
  useEffect(() => {
    const sections = ['home', 'domains', 'featured', 'projects', 'about', 'contact'];
    
    const handleScroll = (scrollLeftVal) => {
      const isMobile = window.innerWidth <= 1024;
      const currentScroll = typeof scrollLeftVal === 'number'
        ? scrollLeftVal
        : (isMobile ? window.scrollY : window.scrollX);
      const scrollPos = currentScroll + (isMobile ? window.innerHeight : window.innerWidth) * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const start = isMobile ? el.offsetTop : el.offsetLeft;
          const size = isMobile ? el.offsetHeight : el.offsetWidth;
          if (scrollPos >= start && scrollPos < start + size) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', () => handleScroll(), { passive: true });
    
    // Also bind to lenis if available
    let unbindLenis = null;
    const checkLenis = setInterval(() => {
      if (window.lenis) {
        unbindLenis = window.lenis.on('scroll', (e) => handleScroll(e.scroll));
        clearInterval(checkLenis);
      }
    }, 100);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(checkLenis);
      if (typeof unbindLenis === 'function') unbindLenis();
    };
  }, []);

  const handleNavigate = (sectionId, customDuration = 1.4) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const isMobile = window.innerWidth <= 1024;
      if (window.lenis) {
        window.lenis.scrollTo(isMobile ? el.offsetTop - 70 : el.offsetLeft, { duration: customDuration });
      } else {
        if (isMobile) {
          window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
        } else {
          window.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
        }
      }
    }
  };

  // Triggered when Hero CTA TakeOff button is clicked
  const handleLaunchFlight = ({ startX, startY, targetTab }) => {
    setFlightState({ active: true, startX, startY, targetTab });

    // Smoothly scroll horizontally mid-flight to destination page
    setTimeout(() => {
      handleNavigate(targetTab, 1.8);
    }, 500);
  };

  const handleFlightComplete = (targetTab) => {
    setFlightState(null);
  };

  return (
    <div className="min-h-screen w-full lg:w-max relative flex flex-col justify-between text-slate-900 dark:text-slate-100 selection:bg-[#3b82f6]/30 selection:text-[#93c5fd]">
      {/* Custom 3-Second Loading Screen with Smooth Fade/Blur Exit */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Full-Screen Global Paper Plane Flight Overlay */}
      <FlightNavigator 
        flightState={flightState} 
        onFlightComplete={handleFlightComplete} 
      />

      {/* Top Horizontal Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Dynamic Parallax Background */}
      <BackgroundGrid />

      {/* Top Header Bar - Fixed to Viewport at Root Level */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-[#0a0a0f]/80 border-b border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
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

      {/* Main Content Feed with Cinematic Reveal Transition */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="flex flex-col lg:flex-row items-stretch w-full lg:w-max min-h-[calc(100vh-5rem)] pt-20 sm:pt-24 pb-32 z-10"
      >
        {/* Page 1: Home / Hero */}
        <section id="home" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <HeroPage 
            onNavigate={handleNavigate} 
            onLaunchFlight={handleLaunchFlight}
          />
        </section>

        {/* Page 2: Audio Lounge & Domains */}
        <section id="domains" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <DomainsPage />
        </section>

        {/* Page 3: Featured Projects & Stack */}
        <section id="featured" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <FeaturedPage 
            onNavigate={handleNavigate}
            onSelectProject={setSelectedProject} 
          />
        </section>

        {/* Page 4: All Repositories */}
        <section id="projects" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <ProjectsPage onSelectProject={setSelectedProject} />
        </section>

        {/* Page 5: About & Journey */}
        <section id="about" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <AboutPage />
        </section>

        {/* Page 6: Contact & Transmission */}
        <section id="contact" className="w-full lg:w-[100vw] lg:min-w-[100vw] min-h-[calc(100vh-6rem)] flex-shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16">
          <ContactPage />
        </section>

          {/* End Section / Horizontal Footer Dossier Panel */}
          <footer className="w-full lg:w-[40vw] lg:max-w-[460px] flex-shrink-0 flex flex-col justify-center items-center py-12 px-6 text-xs font-mono text-slate-500 dark:text-slate-500 rounded-3xl glass-panel border border-slate-200/60 dark:border-white/10 my-auto mx-8 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <img src="/haruki-logo.png" alt="Logo" className="w-8 h-8 opacity-90 rounded-lg" />
              <span className="font-bold text-slate-800 dark:text-slate-200 tracking-wider text-sm">ASHISH SUNIL · HARUKI</span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 text-center">B.Tech CSE Cyber Security · First Year</p>

            {/* Clickable Socials Bar */}
            <div className="flex items-center justify-center gap-3 my-2 flex-wrap">
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
                title="Discord Profile"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:ashishsunil4160@gmail.com"
                className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-sky-400 transition-all shadow-sm hover:scale-105"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-4 text-[10px]">© {new Date().getFullYear()} Ashish Sunil.</p>
          </footer>
        </motion.main>

      {/* Floating Apple Dock Navbar */}
      <AppleDock activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Featured Project Case Study Pop-Up Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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
