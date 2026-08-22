import {
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layout,
  Server,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { skills } from "@/data/skills";

const ICONS: Record<string, React.ReactNode> = {
  "AI & ML": <Sparkles size={15} />,
  Languages: <Code2 size={15} />,
  "Computer Vision": <Video size={15} />,
  Robotics: <Bot size={15} />,
  "Embedded Systems": <Cpu size={15} />,
  Automation: <Boxes size={15} />,
  Cloud: <Cloud size={15} />,
  Databases: <Database size={15} />,
  Backend: <Server size={15} />,
  Frontend: <Layout size={15} />,
  Tools: <Wrench size={15} />,
};

/* Type-tinting per skill card — same palette the type badges use. */
const ACCENT: Record<string, string> = {
  Languages: "var(--pixel-yellow)",
  Frontend: "var(--dex-blue)",
  Backend: "var(--pixel-red)",
  Databases: "var(--pixel-brown)",
  "AI & ML": "oklch(58% 0.08 320)",
  Tools: "oklch(68% 0.02 250)",
};

export function MovesetPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((group) => (
        <div
          key={group.category}
          className="move-card border-2 border-border bg-card p-4"
          style={{ "--move-accent": ACCENT[group.category] ?? "var(--amber)" } as React.CSSProperties}
        >
          <div className="moves-head mb-3 flex items-center gap-2 border-b-2 border-border pb-2.5">
            {ICONS[group.category] ?? ICONS.Tools}
            <h3 className="font-pixel text-[9px] uppercase tracking-wide">
              {group.category}
            </h3>
            <span className="pp-chip">pp {group.skills.length}/{group.skills.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span key={skill} className="pixel-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
