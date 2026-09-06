import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Play, Pause, RotateCcw, Sparkles, ExternalLink, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VinylMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("2:48");
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const videoId = "eR-u3XauxDU"; // DOCE BRISA - QMIIR (Slowed) x Cipher
  const trackInfo = {
    title: "DOCE BRISA (Slowed)",
    artist: "QMIIR x Cipher",
    youtubeUrl: `https://youtu.be/${videoId}`
  };

  // Initialize YouTube IFrame Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('yt-vinyl-audio-player', {
          height: '0',
          width: '0',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volume);
              const totalSec = event.target.getDuration();
              if (totalSec) {
                const mins = Math.floor(totalSec / 60);
                const secs = Math.floor(totalSec % 60);
                setDuration(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [videoId]);

  // Track progress timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 1;
          setProgress((cur / dur) * 100);

          const mins = Math.floor(cur / 60);
          const secs = Math.floor(cur % 60);
          setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      }
    } catch (err) {
      console.warn("Audio toggle error", err);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
      if (newVol > 0 && playerRef.current.isMuted && playerRef.current.isMuted()) {
        playerRef.current.unMute();
      }
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 75);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    const newPercent = Number(e.target.value);
    setProgress(newPercent);
    if (playerRef.current && playerRef.current.getDuration && playerRef.current.seekTo) {
      const totalSec = playerRef.current.getDuration();
      const targetSec = (newPercent / 100) * totalSec;
      playerRef.current.seekTo(targetSec, true);
    }
  };

  const handleRestart = (e) => {
    e?.stopPropagation();
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="relative select-none my-2 group"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Hidden YouTube IFrame */}
      <div id="yt-vinyl-audio-player" className="hidden pointer-events-none" />

      {/* 🌟 Apple-Style Floating Glass Morphing Pill Chassis */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className={`relative overflow-hidden backdrop-blur-2xl bg-white/80 dark:bg-[#0f111a]/85 border border-slate-200/90 dark:border-white/10 shadow-2xl rounded-3xl p-4 transition-colors ${
          isExpanded ? 'w-80 sm:w-96' : 'w-72 sm:w-80'
        }`}
      >
        {/* Subtle Ambient Backlight when playing */}
        <div 
          className={`absolute -inset-10 bg-gradient-to-r from-blue-500/15 via-sky-400/15 to-indigo-500/15 rounded-full blur-2xl pointer-events-none transition-opacity duration-700 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Top Core Row: Spinning Vinyl Badge + Title + Soundwave + Main Play Button */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          {/* Mini Cosmic Vinyl Artwork with Real Spin */}
          <div className="relative shrink-0">
            <div className={`w-12 h-12 rounded-full shadow-lg border-2 border-slate-700 dark:border-zinc-500 overflow-hidden bg-[#090a10] flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <svg width="48" height="48" viewBox="0 0 128 128">
                <rect width="128" height="128" fill="#090a10"></rect>
                <circle cx="64" cy="64" r="54" fill="none" stroke="#1e2235" strokeWidth="2" opacity="0.6" />
                <circle cx="64" cy="64" r="42" fill="none" stroke="#1e2235" strokeWidth="2" opacity="0.6" />
                <circle cx="64" cy="64" r="30" fill="none" stroke="#1e2235" strokeWidth="2" opacity="0.6" />
                <circle cx="90" cy="30" r="10" fill="#38bdf8" fillOpacity="0.5"></circle>
                <circle cx="90" cy="30" r="8" fill="#60a5fa"></circle>
                <path d="M0 128 Q32 64 64 128 T128 128" fill="#2563eb" stroke="black" strokeWidth="1" opacity="0.85"></path>
                <path d="M0 128 Q32 32 64 128 T128 128" fill="#6366f1" stroke="black" strokeWidth="1" opacity="0.85"></path>
              </svg>
            </div>
            {/* Spindle hole */}
            <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-400" />
          </div>

          {/* Track Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate block">
                {trackInfo.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
              {trackInfo.artist}
            </p>
          </div>

          {/* Animated Equalizer Soundwaves (Dance on playing) */}
          <div className="flex items-center gap-0.5 h-6 px-1 shrink-0">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-1 rounded-full bg-gradient-to-t from-[#2563eb] to-[#38bdf8] transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : 'h-1.5 opacity-40'
                }`}
                style={{
                  height: isPlaying ? `${Math.sin(bar * 1.5) * 10 + 14}px` : '4px',
                  animationDelay: `${bar * 0.15}s`
                }}
              />
            ))}
          </div>

          {/* Luxury Play/Pause Capsule Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#38bdf8] via-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? "Pause Track" : "Play Track"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
          </button>
        </div>

        {/* 🎚️ Expandable Tray: Seeker Timeline & Volume Scrubber */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3 pt-2 border-t border-slate-200/70 dark:border-white/10 relative z-10"
            >
              {/* Progress Slider */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-7 text-left">
                  {currentTime}
                </span>
                <div className="relative flex-1 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/80 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-7 text-right">
                  {duration}
                </span>
              </div>

              {/* Bottom Row: Restart + Volume Control + YouTube Link */}
              <div className="flex items-center justify-between pt-1">
                {/* Restart Loop Button */}
                <button
                  onClick={handleRestart}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Restart Track"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Restart</span>
                </button>

                {/* Tactile Volume Slider */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-xl">
                  <button
                    onClick={toggleMute}
                    className="text-slate-500 hover:text-blue-500 dark:text-slate-400 transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                    ) : volume < 50 ? (
                      <Volume1 className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                    title={`Volume: ${isMuted ? 0 : volume}%`}
                  />
                </div>

                {/* YouTube Link */}
                <a
                  href={trackInfo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  title="Watch on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
