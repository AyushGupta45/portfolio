"use client";

import { useEffect, useState } from "react";
import { Backpack } from "lucide-react";
import { profile } from "@/data/profile";

const STORAGE_KEY = "bag-first-open-seen";

/** GBA-style "obtained an item!" popup, shown once ever (localStorage-gated)
 * the first time a visitor opens the Bag. Reserved for this one moment —
 * in-game these only fire for genuinely new items, so it doesn't repeat. */
export function FirstOpenPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — just skip the popup.
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — nothing to persist, just close.
    }
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Item obtained"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4"
      onClick={dismiss}
    >
      <div
        className="pixel-panel pixel-corners flex max-w-xs flex-col items-center gap-3 p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Backpack size={28} className="text-amber" aria-hidden="true" />
        <p className="font-pixel text-[10px] uppercase tracking-wide text-[var(--pixel-ink)]">
          obtained the BAG!
        </p>
        <p className="text-xs text-muted-foreground">
          {profile.bagTitle}, in full — browse the tabs on the left.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="pixel-btn mt-1 bg-primary px-4 py-2 font-pixel text-[9px] text-primary-foreground"
        >
          ok!
        </button>
      </div>
    </div>
  );
}
