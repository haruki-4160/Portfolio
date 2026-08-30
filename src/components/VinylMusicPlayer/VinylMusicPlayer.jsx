import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VinylMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("2:48");
  const [playMode, setPlayMode] = useState(false); // repeat vs shuffle
  const [playerReady, setPlayerReady] = useState(false);
  
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const videoId = "eR-u3XauxDU"; // DOCE BRISA - QMIIR (Slowed) x Cipher
  const trackInfo = {
    title: "DOCE BRISA (Slowed)",
    artist: "QMIIR x Cipher",
    youtubeUrl: `https://youtu.be/${videoId}`
  };

  // Initialize YouTube IFrame Player API for Real Audio Playback
  useEffect(() => {
    // Load YouTube API script if not already present
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
              setPlayerReady(true);
              const totalSec = event.target.getDuration();
              if (totalSec) {
                const mins = Math.floor(totalSec / 60);
                const secs = Math.floor(totalSec % 60);
                setDuration(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
              }
            },
            onStateChange: (event) => {
              // 1 = playing, 2 = paused, 0 = ended
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
        } catch (e) {
          // ignore cleanup error
        }
      }
    };
  }, [videoId]);

  // Track progress ticker
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

  // Real Play / Pause Toggle
  const togglePlay = () => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      }
    } catch (err) {
      console.warn("Audio playback trigger error", err);
    }
  };

  // Seek bar scrubber
  const handleSeek = (e) => {
    const newPercent = Number(e.target.value);
    setProgress(newPercent);
    if (playerRef.current && playerRef.current.getDuration && playerRef.current.seekTo) {
      const totalSec = playerRef.current.getDuration();
      const targetSec = (newPercent / 100) * totalSec;
      playerRef.current.seekTo(targetSec, true);
    }
  };

  const handleRestart = () => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center group/he select-none relative z-20 my-4">
      {/* Hidden YouTube IFrame Container for real audio streaming */}
      <div id="yt-vinyl-audio-player" className="hidden pointer-events-none" />

      {/* Vinyl Disc Container */}
      <div className="relative z-0 h-16 -mb-2 transition-all duration-300 group-hover/he:h-0">
        <div className={`duration-500 rounded-full shadow-xl border-4 border-slate-700 dark:border-zinc-500 border-spacing-5 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''} transition-all`}>
          <svg
            width="112"
            height="112"
            viewBox="0 0 128 128"
            className="rounded-full shadow-lg"
          >
            <rect width="128" height="128" fill="#090a10"></rect>
            {/* Vinyl grooves */}
            <circle cx="64" cy="64" r="58" fill="none" stroke="#1e2235" strokeWidth="1" opacity="0.6" />
            <circle cx="64" cy="64" r="48" fill="none" stroke="#1e2235" strokeWidth="1" opacity="0.6" />
            <circle cx="64" cy="64" r="38" fill="none" stroke="#1e2235" strokeWidth="1" opacity="0.6" />
            <circle cx="64" cy="64" r="28" fill="none" stroke="#1e2235" strokeWidth="1" opacity="0.6" />
            
            {/* Cosmic Stars & Color Waves */}
            <circle cx="20" cy="20" r="2" fill="white"></circle>
            <circle cx="40" cy="30" r="2" fill="white"></circle>
            <circle cx="60" cy="10" r="2" fill="white"></circle>
            <circle cx="80" cy="40" r="2" fill="white"></circle>
            <circle cx="100" cy="20" r="2" fill="white"></circle>
            <circle cx="120" cy="50" r="2" fill="white"></circle>
            <circle cx="90" cy="30" r="10" fill="#38bdf8" fillOpacity="0.4"></circle>
            <circle cx="90" cy="30" r="8" fill="#60a5fa"></circle>
            <path d="M0 128 Q32 64 64 128 T128 128" fill="#2563eb" stroke="black" strokeWidth="1" opacity="0.8"></path>
            <path d="M0 128 Q32 48 64 128 T128 128" fill="#3b82f6" stroke="black" strokeWidth="1" opacity="0.8"></path>
            <path d="M0 128 Q32 32 64 128 T128 128" fill="#6366f1" stroke="black" strokeWidth="1" opacity="0.8"></path>
            <path d="M0 128 Q16 64 32 128 T64 128" fill="#1d4ed8" stroke="black" strokeWidth="1" opacity="0.8"></path>
            <path d="M64 128 Q80 64 96 128 T128 128" fill="#818cf8" stroke="black" strokeWidth="1" opacity="0.8"></path>
          </svg>
        </div>
        {/* Center spindle hole */}
        <div className="absolute z-10 w-7 h-7 bg-white dark:bg-slate-900 border-4 rounded-full shadow-sm border-slate-400 dark:border-zinc-400 top-11 left-11" />
      </div>

      {/* Expandable Player Chassis */}
      <div className="z-30 flex flex-col w-48 h-22 transition-all duration-300 bg-white/90 dark:bg-[#121422] backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl group-hover/he:h-44 group-hover/he:w-80 rounded-2xl">
        {/* Expanded Top Row (Spinning mini vinyl + Song title) */}
        <div className="flex flex-row w-full h-0 group-hover/he:h-20 transition-all duration-300">
          <div className="relative flex items-center justify-center w-24 h-24 group-hover/he:-top-6 group-hover/he:-left-4 opacity-0 group-hover/he:opacity-100 transition-all duration-200">
            <div className={`duration-500 rounded-full shadow-md border-4 border-slate-400 dark:border-zinc-400 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
              <svg width="84" height="84" viewBox="0 0 128 128" className="rounded-full">
                <rect width="128" height="128" fill="#090a10"></rect>
                <circle cx="20" cy="20" r="2" fill="white"></circle>
                <circle cx="40" cy="30" r="2" fill="white"></circle>
                <circle cx="60" cy="10" r="2" fill="white"></circle>
                <circle cx="80" cy="40" r="2" fill="white"></circle>
                <circle cx="100" cy="20" r="2" fill="white"></circle>
                <circle cx="120" cy="50" r="2" fill="white"></circle>
                <circle cx="90" cy="30" r="10" fill="#38bdf8" fillOpacity="0.4"></circle>
                <circle cx="90" cy="30" r="8" fill="#60a5fa"></circle>
                <path d="M0 128 Q32 64 64 128 T128 128" fill="#2563eb" stroke="black" strokeWidth="1"></path>
                <path d="M0 128 Q32 48 64 128 T128 128" fill="#3b82f6" stroke="black" strokeWidth="1"></path>
                <path d="M0 128 Q32 32 64 128 T128 128" fill="#6366f1" stroke="black" strokeWidth="1"></path>
                <path d="M0 128 Q16 64 32 128 T64 128" fill="#1d4ed8" stroke="black" strokeWidth="1"></path>
                <path d="M64 128 Q80 64 96 128 T128 128" fill="#818cf8" stroke="black" strokeWidth="1"></path>
              </svg>
            </div>
            <div className="absolute z-10 w-5 h-5 bg-white dark:bg-slate-900 border-2 rounded-full shadow-sm border-slate-400 top-8 left-8" />
          </div>

          {/* Song Details */}
          <div className="flex flex-col justify-center w-full pl-3 -ml-20 overflow-hidden group-hover/he:-ml-3 text-nowrap transition-all duration-300">
            <a
              href={trackInfo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate hover:text-blue-500 transition-colors"
              title="Open Track on YouTube"
            >
              {trackInfo.title}
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
              {trackInfo.artist}
            </p>
          </div>
        </div>

        {/* Progress Seeker Bar */}
        <div className="flex flex-row items-center mx-3 mt-2 bg-slate-100 dark:bg-white/5 rounded-md min-h-6 group-hover/he:mt-0 px-2 transition-all">
          <span className="hidden text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover/he:inline-block pr-1">
            {currentTime}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-24 group-hover/he:w-full flex-grow h-1.5 mx-2 my-auto bg-slate-300 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <span className="hidden text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover/he:inline-block pl-1">
            {duration}
          </span>
        </div>

        {/* Player Controls (Shuffle, Prev, Play/Pause, Next, List) */}
        <div className="flex flex-row items-center justify-center flex-grow mx-3 space-x-4 text-slate-700 dark:text-slate-200">
          {/* Mode Switch (Repeat / Shuffle) */}
          <button
            onClick={() => setPlayMode(!playMode)}
            className="hidden group-hover/he:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
            title={playMode ? "Shuffle Mode" : "Repeat Mode"}
          >
            {playMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            )}
          </button>

          {/* Previous / Restart Track */}
          <button
            onClick={handleRestart}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
            title="Restart Track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          {/* Real Play / Pause Toggle Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-all shadow-md shadow-blue-500/30 hover:scale-105"
            title={isPlaying ? "Pause" : "Play (DOCE BRISA)"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          {/* Next / Restart Track */}
          <button
            onClick={handleRestart}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
            title="Loop Track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>

          {/* Direct Link */}
          <a
            href={trackInfo.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden group-hover/he:flex items-center justify-center w-8 h-8 text-slate-400 hover:text-blue-500 cursor-pointer transition-colors"
            title="Listen on YouTube"
          >
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
