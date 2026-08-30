import { 
  Code, 
  Cpu, 
  Globe, 
  Layout, 
  Sparkles, 
  Terminal, 
  Zap, 
  Database,
  Smartphone,
  Shield,
  Layers,
  Palette
} from 'lucide-react';

export const portfolioData = {
  profile: {
    name: "Haruki",
    title: "Full-Stack Engineer & Creative Technologist",
    tagline: "Bridging tactile aesthetics with high-performance web systems.",
    location: "Tokyo / Remote",
    status: "Available for ambitious freelance & full-time roles",
    email: "haruki.engineer@gmail.com",
    discordId: "1098483466926030869",
    github: "https://github.com/haruki-4160",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    stats: [
      { label: "Years Exp.", value: "4+" },
      { label: "Shipped Projects", value: "30+" },
      { label: "Git Commits", value: "2.4k+" },
      { label: "Client Satisfaction", value: "100%" },
    ]
  },

  skills: [
    {
      category: "Frontend & Creative UI",
      icon: Layout,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js / WebGL", "Framer Motion", "Vite", "Vue.js"]
    },
    {
      category: "Backend & Systems",
      icon: Database,
      skills: ["Node.js", "Express", "Python / FastAPI", "PostgreSQL", "Prisma", "Redis", "GraphQL", "Supabase"]
    },
    {
      category: "AI, ML & Tools",
      icon: Cpu,
      skills: ["OpenAI API", "LangChain", "Vector DBs", "Docker", "AWS", "Git / GitHub Actions", "Figma", "Linux"]
    }
  ],

  projects: [
    {
      id: "neural-canvas",
      title: "NEURAL CANVAS",
      subtitle: "GENERATIVE AI",
      highlight: "WEBGL",
      category: "AI/ML",
      badge: "FEATURED",
      description: "Real-time generative art canvas running local diffusion models with interactive 3D particle brush strokes.",
      fullDescription: "Neural Canvas is an experimental creative playground blending Three.js GPU shaders with web-workers to render interactive generative patterns and AI-assisted vector artwork at 60 FPS.",
      tags: ["React", "Three.js", "WebGPU", "FastAPI"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
    },
    {
      id: "hyper-terminal",
      title: "HYPER DOCK",
      subtitle: "SYSTEMS",
      highlight: "DESKTOP",
      category: "Tools",
      badge: "POPULAR",
      description: "Next-generation developer workstation with native telemetry, container debugging, and spring physics launcher.",
      fullDescription: "A high-performance Electron & Rust workspace environment for modern full-stack engineers, featuring hot-reloading terminals, Docker metrics, and an Apple-inspired tactile command dock.",
      tags: ["TypeScript", "Rust", "Tailwind", "Electron"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      id: "zenith-exchange",
      title: "ZENITH PAY",
      subtitle: "FINTECH",
      highlight: "ZERO-LATENCY",
      category: "Web Apps",
      badge: "ENTERPRISE",
      description: "Decentralized treasury management dashboard with real-time WebSocket order books and multi-sig security.",
      fullDescription: "Engineered for institutional crypto traders, Zenith Pay delivers sub-millisecond execution charts, automated smart-contract rebalancing, and dark-glass analytical charts.",
      tags: ["Next.js", "WebSocket", "Solidity", "Tailwind"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80"
    },
    {
      id: "aether-audio",
      title: "AETHER SYNTH",
      subtitle: "AUDIO DSP",
      highlight: "WEBAUDIO",
      category: "Creative",
      badge: "EXPERIMENT",
      description: "Modular polyphonic browser synthesizer with real-time waveform visualizers and MIDI keyboard integration.",
      fullDescription: "Built with the Web Audio API and Canvas 2D, Aether Synth provides tactile rotary dials, filter envelopes, and interactive frequency spectrograms directly in the browser.",
      tags: ["Web Audio", "Canvas API", "React", "DSP"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
    }
  ],

  experience: [
    {
      period: "2024 — Present",
      role: "Senior Creative Developer",
      company: "Aether Dynamics",
      description: "Leading frontend architecture and high-fidelity interaction design for enterprise AI platforms."
    },
    {
      period: "2022 — 2024",
      role: "Full-Stack Engineer",
      company: "Kuro Web Labs",
      description: "Shipped scalable microservices, WebGL 3D product visualizers, and robust backend APIs."
    },
    {
      period: "2020 — 2022",
      role: "Frontend Engineer & UI Designer",
      company: "Studio Nexus",
      description: "Crafted accessible component libraries, design systems, and responsive modern web apps."
    }
  ]
};
