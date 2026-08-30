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
            heartbeatInterval = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, d.heartbeat_interval);

            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: discordId }
              })
            );
          } else if (op === 0) {
            if (isMounted) {
              setPresence(d);
              setLoading(false);
            }
          }
        };

        ws.onerror = () => fetchRestFallback();
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

    fetchRestFallback();
    connectWebSocket();

    return () => {
      isMounted = false;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (wsRef.current) wsRef.current.close();
    };
  }, [discordId]);

  const handleCopyTag = () => {
    const tag = presence?.discord_user?.username || "lunar_.ash";
    navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors = {
    online: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    idle: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]',
    dnd: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]',
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
  
  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
    : `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username || 'haruki'}&backgroundColor=0a0a0f`;

  const customStatusActivity = presence?.activities?.find(a => a.type === 4);
  const vsCodeActivity = presence?.activities?.find(a => 
    a.name.toLowerCase().includes('visual studio') || 
    a.name.toLowerCase().includes('code') || 
    a.name.toLowerCase().includes('vsc')
  );
  const gameActivity = presence?.activities?.find(a => a.type === 0 && !a.name.toLowerCase().includes('visual studio') && !a.name.toLowerCase().includes('code'));

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-white/80 dark:border-white/10 shadow-2xl transition-all duration-300">
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#5c67ff]/20 dark:bg-[#5c67ff]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#00ffaa]/20 dark:bg-[#00ffaa]/25 rounded-full blur-3xl pointer-events-none" />

      {/* iOS Header Strip */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-300/60 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
            LIVE DISCORD PRESENCE
          </span>
        </div>

        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20">
          WEBSOCKET ACTIVE
        </span>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-4 mt-5">
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt="Discord Live PFP"
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-slate-300 dark:ring-[#00ffaa]/30 bg-slate-900 shadow-md"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#121218] ${statusColors[status]}`}
            title={statusLabels[status]}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {user?.global_name || user?.username || "Haruki [Chaos]"}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-400">
              @{user?.username || "lunar_.ash"}
            </span>
          </div>

          {/* Custom Status Quote */}
          {customStatusActivity?.state ? (
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 italic font-medium line-clamp-1">
              "{customStatusActivity.state}"
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
              {statusLabels[status]}
            </p>
          )}

          {/* iOS-Style Pill Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleCopyTag}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Copy Discord Username"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ffaa]" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Username'}</span>
            </button>

            <a
              href={`https://discord.com/users/${discordId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all shadow-md shadow-[#5865F2]/25 hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Activity Tiles (iOS Widget Style) */}
      <div className="space-y-2.5 mt-5">
        {/* Spotify Live Streaming Bar */}
        {presence?.listening_to_spotify && presence?.spotify && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center gap-3 shadow-sm">
            <div className="relative shrink-0">
              <img
                src={presence.spotify.album_art_url}
                alt="Album Art"
                className="w-11 h-11 rounded-xl object-cover shadow"
              />
              <Music2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 absolute bottom-1 right-1 drop-shadow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                <span>LISTENING TO SPOTIFY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                {presence.spotify.song}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                {presence.spotify.artist}
              </div>
            </div>
          </div>
        )}

        {/* VS Code Rich Presence (iOS Widget Style) */}
        {vsCodeActivity && (
          <div className="p-3 rounded-2xl bg-sky-500/10 dark:bg-blue-950/30 border border-sky-500/20 dark:border-blue-500/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-mono font-bold text-sky-600 dark:text-blue-400 tracking-wider uppercase">
                {vsCodeActivity.name}
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                {vsCodeActivity.details || "Editing source code"}
              </div>
              {vsCodeActivity.state && (
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                  {vsCodeActivity.state}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gaming Activity (iOS Widget Style) */}
        {gameActivity && (
          <div className="p-3 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/20 dark:border-purple-500/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                PLAYING
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                {gameActivity.name}
              </div>
              {gameActivity.details && (
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                  {gameActivity.details}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
