import { 
  Shield, 
  Terminal, 
  Bot, 
  Globe, 
  Cpu, 
  Code2, 
  Layers, 
  Sparkles, 
  Database,
  Lock,
  Network,
  Binary
} from 'lucide-react';

export const portfolioData = {
  profile: {
    name: "Ashish Sunil",
    alias: "Haruki",
    title: "Cybersecurity Specialist & Discord Systems Developer",
    tagline: "First-year B.Tech CSE (Cyber Security) building secure backend systems, Discord infrastructure, and tactile web interfaces.",
    education: "B.Tech CSE — Cyber Security (First Year)",
    location: "India / Remote",
    status: "Exploring Cybersecurity & Systems Engineering",
    email: "ashishsunil4160@gmail.com",
    discordId: "1098483466926030869",
    github: "https://github.com/haruki-4160",
    linkedin: "https://www.linkedin.com/in/ashish-sunil-159503364",
    instagram: "https://www.instagram.com/huesofharuki?igsi=MW5mcWQ0cXFtN3ppNg%3D%3D",
    twitter: "https://x.com",
    specialty: "Discord Bot Development & System Automation",
    primaryLanguage: "Python",
    interests: ["Cybersecurity", "Discord Systems", "Frontend UI", "AI-Assisted Dev", "Software Architecture"],
    stats: [
      { label: "Degree Focus", value: "CyberSec" },
      { label: "Core Lang", value: "Python" },
      { label: "Discord Bots", value: "3+ Systems" },
      { label: "Year of Study", value: "1st Year" },
    ]
  },

  whatIBuild: [
    {
      id: "discord-systems",
      title: "Discord Systems",
      subtitle: "MODERATION & UTILITIES",
      icon: Bot,
      description: "Moderation bots, music engines, AI chat systems, community utilities, and custom Discord API integrations."
    },
    {
      id: "web-experiences",
      title: "Web Experiences",
      subtitle: "FRONTEND & UI",
      icon: Globe,
      description: "Modern tactile frontend interfaces, responsive event websites, and interactive experimental UI designs."
    },
    {
      id: "software-tools",
      title: "Software Projects",
      subtitle: "SYSTEMS & APPS",
      icon: Terminal,
      description: "Custom developer tools, lightweight scripts, and applications built to solve problems and automate workflows."
    },
    {
      id: "ai-dev",
      title: "AI-Assisted Dev",
      subtitle: "RESEARCH & PROTOTYPING",
      icon: Cpu,
      description: "Leveraging modern AI to research, prototype, debug, and accelerate production while mastering core architectures."
    }
  ],

  skillDomains: [
    {
      domain: "CYBERSECURITY",
      icon: Shield,
      items: [
        "Security Fundamentals",
        "Application Security",
        "Systems & Networks",
        "Exploring Different Domains"
      ]
    },
    {
      domain: "DEVELOPMENT",
      icon: Code2,
      items: [
        "Python (Primary)",
        "JavaScript",
        "APIs / REST Architecture",
        "Linux CLI & Systems",
        "Software Architecture"
      ]
    }
  ],

  techStack: [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  ],

  selectedWorks: [
    {
      id: "celeste",
      title: "CELESTE",
      type: "Discord Moderation",
      stack: ["Python", "Discord.py", "AsyncIO", "SQLite"],
      tags: ["Python", "Discord.py", "AsyncIO", "SQLite"],
      description: "Robust Discord moderation bot built with custom permission checks, automated filtering, and server safety utilities.",
      fullDescription: "Celeste is a production-grade Discord moderation and security engine built with Python and Discord.py. It features asynchronous rate-limiting, custom permission hierarchies, automated raid detection, message content filtering, and audit logging to keep communities safe and organized.",
      features: [
        "Automated anti-spam and content filtering",
        "Granular role and permission hierarchies",
        "Asynchronous event dispatching with Python AsyncIO",
        "Audit logging and moderation history tracking"
      ],
      highlight: "MODERATION",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
    },
    {
      id: "celune",
      title: "CELUNE",
      type: "Discord Music",
      stack: ["Python", "Discord.py", "FFmpeg", "Audio Streaming"],
      tags: ["Python", "Discord.py", "FFmpeg", "Audio Streaming"],
      description: "High-performance Discord music streaming bot with queue management, voice client optimization, and playback controls.",
      fullDescription: "Celune delivers high-fidelity audio playback directly into Discord voice channels. Optimized with custom FFmpeg streaming buffers, dynamic queue management, and volume normalization for uninterrupted community listening sessions.",
      features: [
        "Low-latency voice client streaming via FFmpeg",
        "Dynamic audio queue and playlist support",
        "Interactive playback controls with Discord UI components",
        "Stream recovery and auto-disconnect timers"
      ],
      highlight: "MUSIC ENGINE",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80"
    },
    {
      id: "sryaa",
      title: "SRYAA",
      type: "Discord Chat",
      stack: ["Python", "Discord.py", "APIs", "Natural Language"],
      tags: ["Python", "Discord.py", "APIs", "Natural Language"],
      description: "Interactive conversational Discord bot with context-aware chat utilities and community engagement features.",
      fullDescription: "Sryaa brings life and personality into Discord servers with interactive dialogue flows, dynamic API integrations, and community engagement minigames designed to boost server interaction and member retention.",
      features: [
        "Context-aware conversational flows and prompts",
        "Third-party REST API integrations for real-time data",
        "Custom server leveling and activity rewards",
        "Smart message command parsing and response caching"
      ],
      highlight: "CHAT UTILITY",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160",
      image: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=1200&q=80"
    },
    {
      id: "portfolio",
      title: "TACTILE PORTFOLIO",
      type: "Web Experience",
      stack: ["React 18", "Tailwind CSS", "Framer Motion", "Lenis"],
      tags: ["React 18", "Tailwind CSS", "Framer Motion", "Lenis"],
      description: "Tactile personal portfolio featuring 3D tilt cards, skeuomorphic theme switcher, spring physics Apple dock, and live Discord API integration.",
      fullDescription: "A high-performance personal portfolio engineered with React and Tailwind CSS. Showcases skeuomorphic 3D UI components, custom 25-zone perspective mouse trackers, live WebSocket Lanyard Discord streaming, and Lenis momentum smooth scrolling.",
      features: [
        "25-zone 3D perspective mouse tracker cards",
        "Skeuomorphic 3D tilt dark/light theme toggle",
        "Spring-physics Apple magnification dock navbar",
        "Real-time WebSocket Discord presence and Spotify live bar"
      ],
      highlight: "FRONTEND",
      badge: "WEB APP",
      liveUrl: "https://portfolio-haruki.vercel.app",
      githubUrl: "https://github.com/haruki-4160/Portfolio",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
    },
    {
      id: "squid-game-website",
      title: "SQUID GAME WEBSITE",
      type: "Event Website",
      stack: ["JavaScript", "HTML5", "CSS3", "Web Audio"],
      tags: ["JavaScript", "HTML5", "CSS3", "Web Audio"],
      description: "Immersive event landing page designed with themed animations, sound effects, and interactive registration stages.",
      fullDescription: "An immersive, cinematic event landing page built for campus gaming tournaments. Features atmospheric animations, custom web audio triggers, interactive player registration stages, and reactive game countdown timers.",
      features: [
        "Cinematic themed visual styling and glitch animations",
        "Interactive registration forms with client-side validation",
        "Atmospheric ambient audio and interactive sound effects",
        "Fully responsive layout across mobile and ultra-wide displays"
      ],
      highlight: "EVENT UI",
      badge: "EVENT WEB",
      githubUrl: "https://github.com/haruki-4160",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
    }
  ]
};
