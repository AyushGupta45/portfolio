"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { initSfxPreference, isSfxMuted, setSfxMuted, sfx } from "@/lib/sfx";

export function SfxToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    initSfxPreference();
    setMuted(isSfxMuted());
  }, []);

  const toggle = () => {
    const next = !muted;
    setSfxMuted(next);
    setMuted(next);
    if (!next) sfx.select();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      aria-pressed={!muted}
      className="pixel-module font-pixel text-[9px]"
    >
      {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
      <span className="hidden sm:inline">{muted ? "sfx off" : "sfx on"}</span>
    </button>
  );
}
