import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1, Sparkles, Repeat, Shuffle, Play, Pause, SkipBack, SkipForward, Disc } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VinylMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("2:48");
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [playMode, setPlayMode] = useState(false);
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
        } catch (e) {
          // ignore
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

  // Play / Pause Toggle
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
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      }
    } catch (err) {
      console.warn("Audio toggle error", err);
    }
  };

  // Volume Controller
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
      playerRef.current.setVolume(volume || 70);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  // Progress Seek Scrubber
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
    <div className="relative flex flex-col items-center group/he select-none my-3">
      {/* Hidden YouTube IFrame Audio Driver */}
      <div id="yt-vinyl-audio-player" className="hidden pointer-events-none" />

      {/* 💿 Vinyl Disc Emerging Out of Card */}
      <div className="relative z-0 h-14 -mb-3 transition-all duration-300 group-hover/he:-translate-y-4">
        <div className={`duration-500 rounded-full shadow-2xl border-4 border-slate-700 dark:border-zinc-500 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''} transition-all`}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 128 128"
            className="rounded-full shadow-lg"
          >
            <rect width="128" height="128" fill="#090a10"></rect>
            {/* Vinyl Grooves */}
            <circle cx="64" cy="64" r="58" fill="none" stroke="#1e2235" strokeWidth="1.5" opacity="0.6" />
            <circle cx="64" cy="64" r="48" fill="none" stroke="#1e2235" strokeWidth="1.5" opacity="0.6" />
            <circle cx="64" cy="64" r="38" fill="none" stroke="#1e2235" strokeWidth="1.5" opacity="0.6" />
            <circle cx="64" cy="64" r="28" fill="none" stroke="#1e2235" strokeWidth="1.5" opacity="0.6" />
            
            {/* Cosmic Stars & Sapphire Gradients */}
            <circle cx="20" cy="20" r="2" fill="white"></circle>
            <circle cx="40" cy="30" r="2" fill="white"></circle>
            <circle cx="60" cy="10" r="2" fill="white"></circle>
            <circle cx="80" cy="40" r="2" fill="white"></circle>
            <circle cx="100" cy="20" r="2" fill="white"></circle>
            <circle cx="120" cy="50" r="2" fill="white"></circle>
            <circle cx="90" cy="30" r="10" fill="#38bdf8" fillOpacity="0.4"></circle>
            <circle cx="90" cy="30" r="8" fill="#60a5fa"></circle>
            <path d="M0 128 Q32 64 64 128 T128 128" fill="#2563eb" stroke="black" strokeWidth="1" opacity="0.85"></path>
            <path d="M0 128 Q32 48 64 128 T128 128" fill="#3b82f6" stroke="black" strokeWidth="1" opacity="0.85"></path>
            <path d="M0 128 Q32 32 64 128 T128 128" fill="#6366f1" stroke="black" strokeWidth="1" opacity="0.85"></path>
          </svg>
        </div>
        {/* Center Spindle Hole */}
        <div className="absolute z-10 w-6 h-6 bg-white dark:bg-slate-900 border-2 rounded-full shadow-sm border-slate-400 dark:border-zinc-400 top-9 left-9" />
      </div>

      {/* 🎛️ Expandable Glass Player Chassis */}
      <div className="z-20 w-72 sm:w-80 group-hover/he:w-88 transition-all duration-300 bg-white/95 dark:bg-[#121422]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-2xl rounded-2xl p-3.5 flex flex-col gap-3">
        {/* Top Header: Track Title & Play/Pause */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div className="min-w-0">
              <a
                href={trackInfo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block hover:text-blue-500 transition-colors"
                title="Listen on YouTube"
              >
                {trackInfo.title}
              </a>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {trackInfo.artist}
              </p>
            </div>
          </div>

          {/* Quick Play Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all cursor-pointer"
            title={isPlaying ? "Pause" : "Play Track"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>

        {/* Progress Seeker Bar */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-2.5 py-1.5 rounded-xl">
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            {currentTime}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            {duration}
          </span>
        </div>

        {/* Expanded Controls Row (Volume + Transport Buttons) */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300">
          {/* Transport Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPlayMode(!playMode)}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={playMode ? "Shuffle Mode" : "Repeat Mode"}
            >
              {playMode ? <Shuffle className="w-3.5 h-3.5 text-blue-500" /> : <Repeat className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Restart"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Loop"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume Controller Slider */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
