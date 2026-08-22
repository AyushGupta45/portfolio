"use client";

/* Tiny Web Audio chiptune SFX engine — square-wave bleeps, no assets.
 * All sounds are triggered by user gestures (clicks/keys), so the
 * AudioContext is created lazily inside a gesture call and autoplay-safe.
 * Preference persists in localStorage; default is ON.
 *
 * Every played sound also dispatches a `dex-sfx` CustomEvent (detail =
 * sound name) so hardware chrome elsewhere (LEDs, speaker grille) can
 * react to audio without being coupled to callers. */

const STORAGE_KEY = "dex-sfx-muted";

type SfxName = "nav" | "select" | "back" | "boot" | "blip" | "fanfare";

let ctx: AudioContext | null = null;
let muted = false;

function readStoredMute(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function isSfxMuted(): boolean {
  if (typeof window === "undefined") return true;
  return muted;
}

export function initSfxPreference(): void {
  muted = readStoredMute();
}

export function setSfxMuted(next: boolean): void {
  muted = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // localStorage unavailable — preference just won't persist.
  }
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function beep(
  freq: number,
  duration: number,
  options: { when?: number; gain?: number; slideTo?: number } = {}
): void {
  const audio = getCtx();
  if (!audio) return;
  const { when = 0, gain = 0.04, slideTo } = options;

  const osc = audio.createOscillator();
  const amp = audio.createGain();
  const t0 = audio.currentTime + when;

  osc.type = "square";
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo !== undefined) {
    osc.frequency.linearRampToValueAtTime(slideTo, t0 + duration);
  }

  amp.gain.setValueAtTime(0, t0);
  amp.gain.linearRampToValueAtTime(gain, t0 + 0.005);
  amp.gain.setValueAtTime(gain, t0 + duration - 0.01);
  amp.gain.linearRampToValueAtTime(0, t0 + duration);

  osc.connect(amp).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function play(name: SfxName, fn: () => void): void {
  if (muted) return;
  try {
    fn();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent<SfxName>("dex-sfx", { detail: name }));
    }
  } catch {
    // Audio unavailable — stay silent rather than break the interaction.
  }
}

export const sfx = {
  /** cursor move in lists */
  nav() {
    play("nav", () => beep(880, 0.05, { gain: 0.03 }));
  },
  /** item select / open */
  select() {
    play("select", () => {
      beep(660, 0.06);
      beep(990, 0.09, { when: 0.06 });
    });
  },
  /** back / close */
  back() {
    play("back", () => {
      beep(660, 0.06);
      beep(440, 0.1, { when: 0.06 });
    });
  },
  /** power-on jingle */
  boot() {
    play("boot", () => {
      beep(523, 0.09, { gain: 0.035 });
      beep(659, 0.09, { when: 0.1, gain: 0.035 });
      beep(784, 0.09, { when: 0.2, gain: 0.035 });
      beep(1047, 0.22, { when: 0.3, gain: 0.04 });
    });
  },
  /** single typewriter character tick — very quiet */
  blip() {
    play("blip", () => beep(1245, 0.02, { gain: 0.014 }));
  },
  /** rare-event fanfare (shiny mode) */
  fanfare() {
    play("fanfare", () => {
      beep(659, 0.08, { gain: 0.04 });
      beep(784, 0.08, { when: 0.09, gain: 0.04 });
      beep(880, 0.08, { when: 0.18, gain: 0.04 });
      beep(1047, 0.08, { when: 0.27, gain: 0.04 });
      beep(1319, 0.26, { when: 0.36, gain: 0.045 });
      beep(1568, 0.3, { when: 0.36, gain: 0.03 });
    });
  },
};
