/* ===================================================================
   YOUR IDENTITY — the single file to edit to make this site yours.
   Every personal string across the app is sourced from here (or from
   experience.ts / projects.ts / skills.ts / education.ts). Search for
   "REPLACE" to find anything still placeholder.
   =================================================================== */

export const profile = {
  name: "Ayush Gupta",
  firstName: "Ayush",
  initials: "AG",
  role: "Full-Stack Developer",
  positioning: "Building end-to-end systems where web dev meets agentic AI.",
  heroHeadline: "AI-powered & automation-driven web applications.", // REPLACE: your own words
  location: "Mumbai, Maharashtra, India",
  status: "Systems Engineer",

  email: "guptaayushrajeshwar@gmail.com",
  phone: "+00 00000 00000", // REPLACE

  links: {
    github: "https://github.com/AyushGupta45",
    linkedin: "https://www.linkedin.com/in/ayush-gupta-1078a52a9/",
    resume: "/Ayush_Gupta_Resume.pdf",
  },

  // Derived chrome labels — tweak freely, they're plain strings.
  bagTitle: "ayush's pokedex", // header of the device shell
  githubHandle: "AyushGupta45", // shown without the @
  linkedinHandle: "ayushgupta045", // shown without /in/
  pcName: "ayush-pc", // GitHub panel title ("YOURNAME-PC")
  consoleTag: "AYUSH.EXE", // devtools easter egg badge

 about: [
  "Hey, I'm Ayush! A Full-Stack Trainer on a quest to build cool things with code, AI, and automation. My adventure spans Next.js, TypeScript, Node.js, and GenAI.",
  "I recently graduated in AI & Data Science and joined TCS as a Systems Engineer. New badge unlocked!",
  "Currently exploring AI-powered builds, automation, and ambitious side quests like ScrapeFlow and TradeSafe.",
  "Always ready for the next adventure. Got a quest for me, Trainer?",
],

  stats: [
    { label: "Years building", value: "4+" },
    { label: "Public repositories", value: "12" },
    { label: "Live deployments", value: "8+" },
    { label: "LLM-powered builds", value: "3" },
  ],

  dialogue: [
    "...! A wild visitor appeared!",
    "Pika-pika! Oh wait, that's not me.",
    "It's super effective! ...Whatever it was.",
    "My Pokémon and I are on an adventure!",
    "Thanks for stopping by, Trainer! See ya!",
  ],
} as const;
