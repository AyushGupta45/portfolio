import { profile } from "@/data/profile";
import { TrainerProfile } from "@/components/pixel/trainer-profile";

export function TrainerProfilePanel() {
  return (
    <div className="space-y-6">
      <TrainerProfile />

      <div className="space-y-4">
        {profile.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
