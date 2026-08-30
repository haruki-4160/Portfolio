import React, { useState, useEffect } from 'react';
import { Radio, Music2, Code2, Copy, Check, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DiscordPresence({ defaultDiscordId = "1056581297597956100" }) {
  const [discordId, setDiscordId] = useState(() => {
    return localStorage.getItem('haruki_discord_id') || defaultDiscordId;
  });
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showIdInput, setShowIdInput] = useState(false);
  const [customIdInput, setCustomIdInput] = useState(discordId);

  // Fetch from Lanyard REST API & WebSocket fallback
  useEffect(() => {
    let isMounted = true;
    
    async function fetchPresence() {
      try {
        setLoading(true);
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await res.json();
        if (json.success && isMounted) {
          setPresence(json.data);
        } else if (isMounted) {
          // Demo fallback
          setPresence(getMockPresence());
        }
      } catch (err) {
        if (isMounted) setPresence(getMockPresence());
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPresence();
    const interval = setInterval(fetchPresence, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [discordId]);

  function getMockPresence() {
    return {
      discord_user: {
        username: "haruki.dev",
        global_name: "Haruki ✦",
        avatar: "demo",
        discriminator: "0"
      },
      discord_status: "online",
      activities: [
        {
          name: "Visual Studio Code",
          type: 0,
          details: "Building Haruki-Portfolio.jsx",
          state: "Workspace: Modern Tech & Creative UI"
        }
      ],
      listening_to_spotify: true,
      spotify: {
        song: "Midnight City",
        artist: "M83",
        album_art_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
        album: "Hurry Up, We're Dreaming"
      }
    };
  }

  const handleSaveId = () => {
    if (customIdInput.trim()) {
      setDiscordId(customIdInput.trim());
      localStorage.setItem('haruki_discord_id', customIdInput.trim());
      setShowIdInput(false);
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const handleCopyTag = () => {
    const tag = presence?.discord_user?.username || "haruki.dev";
    navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors = {
    online: 'bg-emerald-500 shadow-[0_0_12px_#10b981]',
    idle: 'bg-amber-400 shadow-[0_0_12px_#f59e0b]',
    dnd: 'bg-rose-500 shadow-[0_0_12px_#f43f5e]',
    offline: 'bg-slate-400'
  };

  const statusLabels = {
    online: 'Online',
    idle: 'Away / Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
  };

  const status = presence?.discord_status || 'online';
  const user = presence?.discord_user;
  const avatarUrl = user?.avatar === "demo" || !user?.avatar
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username || 'haruki'}&backgroundColor=0a0a0f`
    : `https://cdn.discordapp.com/avatars/${user?.id || discordId}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`;

  const vsCodeActivity = presence?.activities?.find(a => a.name.toLowerCase().includes('visual studio') || a.name.toLowerCase().includes('code'));
  const otherActivity = presence?.activities?.find(a => a.type === 0 && !a.name.toLowerCase().includes('visual studio'));

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/10 dark:border-white/10 shadow-xl">
      {/* Ambient background glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#5c67ff]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#00ffaa]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title & Live Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="w-4 h-4 text-[#5c67ff] animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 dark:text-slate-300">
            DISCORD PRESENCE (LIVE)
          </span>
        </div>

        <button
          onClick={() => setShowIdInput(!showIdInput)}
          className="text-[11px] font-mono text-slate-400 hover:text-[#00ffaa] transition-colors underline"
        >
          {showIdInput ? 'Close' : 'Configure User ID'}
        </button>
      </div>

      {/* Quick User ID configure drawer */}
      {showIdInput && (
        <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs flex flex-col gap-2">
          <p className="text-slate-300">
            Enter your 18/19-digit <strong>Discord User ID</strong> (Make sure you joined the <a href="https://discord.gg/lanyard" target="_blank" rel="noreferrer" className="text-[#00ffaa] underline">Lanyard Gateway</a>):
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customIdInput}
              onChange={(e) => setCustomIdInput(e.target.value)}
              placeholder="e.g. 1056581297597956100"
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono flex-1 text-xs outline-none focus:border-[#00ffaa]"
            />
            <button
              onClick={handleSaveId}
              className="px-3 py-1.5 rounded-lg bg-[#5c67ff] hover:bg-[#4a55ee] text-white font-semibold text-xs transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Profile Info */}
      <div className="flex items-center gap-4 mt-5">
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt="Discord Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 bg-slate-900"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#121218] ${statusColors[status]}`}
            title={statusLabels[status]}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 truncate">
              {user?.global_name || user?.username || "Haruki"}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
              @{user?.username || "haruki"}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
            {statusLabels[status]}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCopyTag}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              title="Copy Discord Username"
            >
              {copied ? <Check className="w-3 h-3 text-[#00ffaa]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied Tag!' : 'Copy Tag'}</span>
            </button>

            <a
              href={`https://discord.com/users/${discordId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md bg-[#5c67ff]/20 hover:bg-[#5c67ff]/30 text-[#858eff] transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Message</span>
            </a>
          </div>
        </div>
      </div>

      {/* Spotify Live Activity */}
      {presence?.listening_to_spotify && presence?.spotify && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={presence.spotify.album_art_url}
              alt="Album Artwork"
              className="w-12 h-12 rounded-lg object-cover shadow-md"
            />
            <Music2 className="w-3.5 h-3.5 text-emerald-400 absolute bottom-1 right-1 drop-shadow" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 tracking-wider">
              <span>LISTENING TO SPOTIFY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
              {presence.spotify.song}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {presence.spotify.artist}
            </div>
          </div>
        </div>
      )}

      {/* VS Code / Coding Activity */}
      {vsCodeActivity && (
        <div className="mt-3 p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono font-semibold text-blue-400 tracking-wider">
              {vsCodeActivity.name}
            </div>
            <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
              {vsCodeActivity.details || "Editing code"}
            </div>
            {vsCodeActivity.state && (
              <div className="text-[11px] text-slate-400 truncate">
                {vsCodeActivity.state}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gaming / Other Activity */}
      {otherActivity && (
        <div className="mt-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono font-semibold text-purple-400 tracking-wider">
              PLAYING A GAME
            </div>
            <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
              {otherActivity.name}
            </div>
            {otherActivity.details && (
              <div className="text-[11px] text-slate-400 truncate">
                {otherActivity.details}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
