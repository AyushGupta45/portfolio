"use client";

import type { ComponentType } from "react";
import { ChevronLeft } from "lucide-react";
import type { BagItemId } from "@/lib/bag-items";
import { PixelPanel } from "@/components/pixel/pixel-panel";
import { useBag } from "./bag-provider";
import { TrainerProfilePanel } from "./panels/trainer-profile-panel";
import { EducationPanel } from "./panels/education-panel";
import { JourneyPanel } from "./panels/journey-panel";
import { PokedexPanel } from "./panels/pokedex-panel";
import { MovesetPanel } from "./panels/moveset-panel";
import { PokegearPanel } from "./panels/pokegear-panel";

const PANELS: Record<BagItemId, ComponentType> = {
  about: TrainerProfilePanel,
  experience: JourneyPanel,
  education: EducationPanel,
  projects: PokedexPanel,
  skills: MovesetPanel,
  contact: PokegearPanel,
};

export function ContentPanel({ className }: { className?: string }) {
  const { items, activeId, mobileView, goBackToList } = useBag();
  const item = items.find((i) => i.id === activeId) ?? items[0];
  const Panel = PANELS[item.id];

  return (
    <div
      className={`content-panel-wrap ${mobileView === "content" ? "is-mobile-content" : ""} ${className ?? ""}`}
      style={{ "--bag-accent": item.accent } as React.CSSProperties}
    >
      <PixelPanel title={item.metaphor.toUpperCase()} className="flex flex-1 min-h-0 flex-col">
        <button type="button" onClick={goBackToList} className="bag-back-btn font-pixel">
          <ChevronLeft size={13} />
          back
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
          {/* Keyed by panel id so each switch replays the CRT power-wipe */}
          <div key={item.id} className="crt-wipe">
            <Panel />
          </div>
        </div>
      </PixelPanel>
    </div>
  );
}
