import React, { useState, useEffect, useRef } from 'react';
import { Radio, Music2, Code2, Copy, Check, MessageSquare, ExternalLink, Sparkles, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DiscordPresence({ defaultDiscordId = "1098483466926030869" }) {
  const [discordId, setDiscordId] = useState(() => {
    return localStorage.getItem('haruki_discord_id') || defaultDiscordId;
  });
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showIdInput, setShowIdInput] = useState(false);
  const [customIdInput, setCustomIdInput] = useState(discordId);
  const wsRef = useRef(null);

  // Real-time WebSocket connection to Lanyard Gateway
  useEffect(() => {
    let isMounted = true;
    let heartbeatInterval = null;

    const connectWebSocket = () => {
      try {
        const ws = new WebSocket('wss://api.lanyard.rest/socket');
        wsRef.current = ws;

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { op, d } = data;

          if (op === 1) {
            // Hello packet -> Start Heartbeat & Subscribe
            heartbeatInterval = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, d.heartbeat_interval);

            // Initialize subscription for user ID
            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: discordId }
              })
            );
          } else if (op === 0) {
            // Presence data update
            if (isMounted) {
              setPresence(d);
              setLoading(false);
            }
          }
        };

        ws.onerror = () => {
          fetchRestFallback();
        };

        ws.onclose = () => {
          if (heartbeatInterval) clearInterval(heartbeatInterval);
        };
      } catch (e) {
        fetchRestFallback();
      }
    };

    const fetchRestFallback = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await res.json();
        if (json.success && isMounted) {
          setPresence(json.data);
        }
      } catch (err) {
        console.error('Lanyard REST error', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Initial fetch then socket
    fetchRestFallback();
    connectWebSocket();

    return () => {
      isMounted = false;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (wsRef.current) wsRef.current.close();
    };
  }, [discordId]);

  const handleSaveId = () => {
    if (customIdInput.trim()) {
      setDiscordId(customIdInput.trim());
      localStorage.setItem('haruki_discord_id', customIdInput.trim());
      setShowIdInput(false);
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const handleCopyTag = () => {
    const tag = presence?.discord_user?.username || "haruki";
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
    online: 'Online on Discord',
    idle: 'Away / Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
  };

  const status = presence?.discord_status || 'online';
  const user = presence?.discord_user;
  
  // Real live Discord avatar URL (supports animated GIF or PNG)
  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
    : `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username || 'haruki'}&backgroundColor=0a0a0f`;

  // Custom status activity
  const customStatusActivity = presence?.activities?.find(a => a.type === 4);
  const vsCodeActivity = presence?.activities?.find(a => 
    a.name.toLowerCase().includes('visual studio') || 
    a.name.toLowerCase().includes('code') || 
    a.name.toLowerCase().includes('vsc')
  );
  const gameActivity = presence?.activities?.find(a => a.type === 0 && !a.name.toLowerCase().includes('visual studio'));

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-white/10 dark:border-white/10 shadow-2xl">
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#5c67ff]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#00ffaa]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
            LIVE DISCORD PRESENCE
          </span>
        </div>

        <span className="text-[10px] font-mono text-emerald-500 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          WEBSOCKET ACTIVE
        </span>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-4 mt-5">
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt="Discord Live PFP"
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-[#00ffaa]/30 bg-slate-900 shadow-lg"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#121218] ${statusColors[status]}`}
            title={statusLabels[status]}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {user?.global_name || user?.username || "Haruki"}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              @{user?.username || "haruki"}
            </span>
          </div>

          {/* Custom Status Text if available */}
          {customStatusActivity?.state ? (
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic line-clamp-1">
              "{customStatusActivity.state}"
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
              {statusLabels[status]}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleCopyTag}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              title="Copy Discord Username"
            >
              {copied ? <Check className="w-3 h-3 text-[#00ffaa]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied Tag!' : 'Copy Username'}</span>
            </button>

            <a
              href={`https://discord.com/users/${discordId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#5c67ff] hover:bg-[#4a55ee] text-white transition-colors shadow-sm"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Direct Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Spotify Live Streaming Bar */}
      {presence?.listening_to_spotify && presence?.spotify && (
        <div className="mt-5 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={presence.spotify.album_art_url}
              alt="Album Art"
              className="w-12 h-12 rounded-xl object-cover shadow-md"
            />
            <Music2 className="w-3.5 h-3.5 text-emerald-400 absolute bottom-1 right-1 drop-shadow" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
              <span>LISTENING TO SPOTIFY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
              {presence.spotify.song}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {presence.spotify.artist} • {presence.spotify.album}
            </div>
          </div>
        </div>
      )}

      {/* VS Code Rich Presence */}
      {vsCodeActivity && (
        <div className="mt-3 p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono font-bold text-blue-400 tracking-wider">
              {vsCodeActivity.name}
            </div>
            <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
              {vsCodeActivity.details || "Editing source code"}
            </div>
            {vsCodeActivity.state && (
              <div className="text-[11px] text-slate-400 truncate">
                {vsCodeActivity.state}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Activity */}
      {gameActivity && (
        <div className="mt-3 p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono font-bold text-purple-400 tracking-wider">
              PLAYING
            </div>
            <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
              {gameActivity.name}
            </div>
            {gameActivity.details && (
              <div className="text-[11px] text-slate-400 truncate">
                {gameActivity.details}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
