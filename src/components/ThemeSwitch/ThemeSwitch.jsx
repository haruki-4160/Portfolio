import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeSwitch.css';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitch({ showLabels = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {showLabels && (
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          Light
        </span>
      )}
      <div className="theme-switch-container">
        <input
          type="checkbox"
          name="theme-checkbox"
          id="theme-checkbox"
          className="theme-switch-checkbox"
          checked={isDark}
          onChange={toggleTheme}
        />
        <label htmlFor="theme-checkbox" className="theme-switch-label" title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
        </label>
      </div>
      {showLabels && (
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Moon className="w-3.5 h-3.5 text-cyan-400" />
          Dark
        </span>
      )}
    </div>
  );
}
