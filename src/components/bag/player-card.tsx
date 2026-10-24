import { profile } from "@/data/profile";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";

export function PlayerCard() {
  return (
    <div className="pixel-panel pixel-corners flex flex-col items-center gap-3 p-4 text-center">
      <PixelAvatar cellSize={7} showDialogue={false} />
      <div>
        <p className="text-sm font-semibold text-foreground leading-tight text-balance">{profile.name}</p>
        <p className="mt-1 font-pixel text-[7px] uppercase tracking-[0.14em] text-amber">{profile.role}</p>
      </div>
    </div>
  );
}
