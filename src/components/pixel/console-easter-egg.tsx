"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";

/** Silent for regular visitors — a small hello for anyone who opens devtools. */
export function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      `%c ${profile.consoleTag} `,
      "background:#c22f3d;color:#fdf6e3;font-weight:bold;padding:2px 6px;"
    );
    console.log(
      `poking around in the console, huh? nice.\nsource's right here: ${profile.links.github}\n(ノಠ益ಠ)ノ彡┻━┻`
    );
  }, []);

  return null;
}
