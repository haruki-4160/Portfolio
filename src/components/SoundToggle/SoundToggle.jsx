import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(soundFx.isEnabled());

  const handleToggle = () => {
    const newState = soundFx.toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shadow-sm ${
        enabled
          ? 'bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/30 hover:bg-blue-500/20 shadow-blue-500/10'
          : 'bg-slate-200/80 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/10'
      }`}
      title={enabled ? "Tactile UI Sounds: ON" : "Tactile UI Sounds: OFF"}
    >
      {enabled ? <Volume2 className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" /> : <VolumeX className="w-3.5 h-3.5" />}
      <span className="hidden sm:inline-block text-[11px]">{enabled ? 'SFX ON' : 'SFX OFF'}</span>
    </button>
  );
}
