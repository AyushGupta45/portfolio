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
  role: "Full-Stack Developer | Systems Engineer @ TCS",
  positioning: "Building end-to-end systems where web dev meets agentic AI.",
  heroHeadline: "AI-powered & automation-driven web applications.", // REPLACE: your own words
  location: "Mumbai, Maharashtra, India",
  status: "Systems Engineer @ TCS Digital",

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
  linkedinHandle: "ayush-gupta-1078a52a9", // shown without /in/
  pcName: "ayush-pc", // GitHub panel title ("YOURNAME-PC")
  consoleTag: "AYUSH.EXE", // devtools easter egg badge

  about: [
    "I'm Ayush — a full-stack developer with hands-on experience shipping production-grade applications using Next.js, TypeScript, and Node.js. Over the past two years I've moved beyond a single-stack mindset to building end-to-end systems that combine web development, workflow automation, and agentic AI.",
    "I hold a Bachelor's degree in Artificial Intelligence & Data Science from the University of Mumbai (2022–2026), and recently joined Tata Consultancy Services as a Systems Engineer on the Digital track — applying full-stack skills to enterprise-scale projects while continuing to build independently.",
    "Recent work: ScrapeFlow, a visual DAG-based scraping orchestration platform with AI extraction nodes; TradeSafe, an agentic crypto arbitrage platform where Bull, Bear and Mediator LLM agents debate every signal; plus freelance production systems for clients in Canada and Mumbai.",
    "What's next: deepening full-stack architecture, agentic AI systems, and scalable backend design — while contributing to TCS's digital initiatives. Always open to connecting over system design or collaborative AI + automation projects.",
  ],

  stats: [
    { label: "Years building", value: "4+" }, // keep the "Years building" label — the trainer card reads it by name
    { label: "Public repositories", value: "14" },
    { label: "Live deployments", value: "3+" },
    { label: "LLM-powered builds", value: "3" },
  ],

  /** NPC dialogue lines — cycled when visitors click your avatar. */
  dialogue: [
    "...",
    "shipping enterprise-scale at TCS Digital now.",
    "ask me about TradeSafe's arguing AI agents.",
    "ctrl+s is my love language.",
    "thanks for stopping by!",
  ],
} as const;

