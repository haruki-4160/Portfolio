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
    email: "ashissunil77@gmail.com",
    discordId: "1098483466926030869",
    github: "https://github.com/haruki-4160",
    linkedin: "https://linkedin.com",
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
      stack: ["Python", "Discord.py"],
      description: "Robust Discord moderation bot built with custom permission checks, automated filtering, and server safety utilities.",
      highlight: "MODERATION",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160"
    },
    {
      id: "celune",
      title: "CELUNE",
      type: "Discord Music",
      stack: ["Python", "Discord"],
      description: "High-performance Discord music streaming bot with queue management, voice client optimization, and playback controls.",
      highlight: "MUSIC ENGINE",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160"
    },
    {
      id: "sryaa",
      title: "SRYAA",
      type: "Discord Chat",
      stack: ["Python", "Discord"],
      description: "Interactive conversational Discord bot with context-aware chat utilities and community engagement features.",
      highlight: "CHAT UTILITY",
      badge: "DISCORD BOT",
      githubUrl: "https://github.com/haruki-4160"
    },
    {
      id: "portfolio",
      title: "PORTFOLIO",
      type: "Web Experience",
      stack: ["React", "Tailwind", "Framer Motion"],
      description: "Tactile personal portfolio featuring 3D tilt cards, skeuomorphic theme switcher, spring physics Apple dock, and live Discord API integration.",
      highlight: "FRONTEND",
      badge: "WEB APP",
      githubUrl: "https://github.com/haruki-4160/Portfolio"
    },
    {
      id: "squid-game-website",
      title: "SQUID GAME WEBSITE",
      type: "Event Website",
      stack: ["Frontend", "UI/UX", "JavaScript"],
      description: "Immersive event landing page designed with themed animations, sound effects, and interactive registration stages.",
      highlight: "EVENT UI",
      badge: "EVENT WEB",
      githubUrl: "https://github.com/haruki-4160"
    }
  ]
};
