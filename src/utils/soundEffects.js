// Programmatic Web Audio API Tactile Sound Engine (Pop Theme)
// Zero external assets needed, instant response, low latency

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = typeof window !== 'undefined' ? localStorage.getItem('haruki_sound_enabled') !== 'false' : true;
    this.masterGain = null;
    this.lastHoverTime = 0;
    this.lastHoverTarget = null;
    this.initializedListeners = false;

    if (typeof window !== 'undefined') {
      this.initGlobalListeners();
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initGlobalListeners() {
    if (this.initializedListeners || typeof window === 'undefined') return;
    this.initializedListeners = true;

    // Unlock Web Audio Context on first user touch/click/key
    const unlockAudio = () => {
      this.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    // Intelligent Global Hover Sound Delegation
    document.addEventListener('mouseover', (e) => {
      if (!this.enabled) return;

      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      // Select interactive elements
      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="range"], input[type="checkbox"], input[type="radio"], select, .cursor-pointer, [data-sound="hover"], .cyber-card'
      );

      if (interactiveEl && interactiveEl !== this.lastHoverTarget) {
        this.lastHoverTarget = interactiveEl;
        this.playHover();
      }
    }, { passive: true });

    // Reset target on mouseout
    document.addEventListener('mouseout', (e) => {
      if (this.lastHoverTarget && e.target && (e.target === this.lastHoverTarget || !this.lastHoverTarget.contains(e.target))) {
        this.lastHoverTarget = null;
      }
    }, { passive: true });
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('haruki_sound_enabled', this.enabled ? 'true' : 'false');
    }
    if (this.enabled) {
      this.playPop();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // 1. Playful Bubble Pop (for button clicks, actions)
  playPop(freq = 600) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.09);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // 2. Soft Wooden / Apple Tap (for Dock & Tab navigation)
  playTap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  // 3. Subtle Acoustic Bubble Hover Tick (for card & item hovers)
  playHover(freq = 920) {
    if (!this.enabled) return;
    
    // Throttle hover sounds so rapid mouse movement stays crisp without audio lag
    const nowMs = Date.now();
    if (nowMs - this.lastHoverTime < 45) return;
    this.lastHoverTime = nowMs;

    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 0.02);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {}
  }

  // 4. Dual Pop Switch (for Theme Toggle)
  playSwitch(isDark) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = isDark ? 450 : 700;
      const endFreq = isDark ? 750 : 400;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // 5. High-Pitched Success Chime Pop (for form submits / copies)
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio pop

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const time = now + idx * 0.04;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.09);
      });
    } catch (e) {}
  }
}

export const soundFx = new SoundEngine();
