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

  projects: [],

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
