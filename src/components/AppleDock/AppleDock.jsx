import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './AppleDock.css';
import { Home, FolderGit2, User, Mail, Sparkles } from 'lucide-react';

function DockIcon({ mouseX, item, activeTab, onSelect }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Spring physics for magnification
  const widthSync = useTransform(distance, [-120, 0, 120], [54, 76, 54]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.25, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const isActive = activeTab === item.id;

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onSelect(item.id)}
      className={`dock-item group ${isActive ? 'active' : ''}`}
      title={item.label}
    >
      <motion.div style={{ scale }} className="flex flex-col items-center justify-center">
        <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span className="hidden sm:block text-[10px] tracking-wide">{item.label}</span>
      </motion.div>
      {isActive && <div className="dock-active-dot" />}
    </motion.button>
  );
}

export default function AppleDock({ activeTab, onTabChange }) {
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="apple-dock-nav">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="apple-dock-menu"
      >
        {navItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            activeTab={activeTab}
            onSelect={onTabChange}
          />
        ))}
      </motion.div>
    </nav>
  );
}
