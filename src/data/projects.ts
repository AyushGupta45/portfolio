export type ProjectCategory =
  | "Robotics"
  | "Computer Vision"
  | "Embedded Systems"
  | "AI / ML"
  | "Automation"
  | "Infrastructure"
  | "Web Development";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** Short bold lead line shown above `description` in the Projectdex
   * detail panel. Optional — when absent the description renders alone. */
  lead?: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  achievements: string[];
  /** Screenshot image URI (e.g., /projects/scrapeflow.png). Optional — if omitted,
   * the UI automatically generates a sleek, retro code canvas thumbnail mockup! */
  image?: string;
  /** Live demo URL (e.g., https://meetai-steel.vercel.app). Optional — if omitted,
   * only the GitHub repo button will be rendered. */
  demo?: string;
  /** Repo URL — leave undefined for private/off-GitHub projects and the
   * "view source" link disappears from the UI automatically. */
  github?: string;
  period: string;
  status: "Active" | "Shipped" | "Published";
  /** false = hidden from the curated Projectdex. Defaults to true. */
  showInDex?: boolean;
}

/* Sourced from github.com/AyushGupta45 (public repos + READMEs), Aug 2026.
 * Set showInDex: false to keep a repo out of the curated list. */

export const projects: Project[] = [
  {
    slug: "scrapeflow",
    name: "ScrapeFlow",
    tagline:
      "build web-scraping pipelines on a node canvas — with AI that understands HTML",
    lead: "A visual workflow platform for web scraping and data processing.",
    description:
      "Drag and drop nodes like 'Launch Browser', 'Extract Data with AI', 'Filter Array', and 'Export CSV', then connect them into a pipeline that runs on demand or on a schedule. AI is embedded directly in the pipeline — extract structured data from any page with natural-language prompts, then summarize, analyze sentiment, generate charts, and produce full analytical reports inside the same workflow.",
    categories: ["Web Development", "AI / ML", "Automation"],
    tech: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Tailwind CSS",
      "shadcn/ui",
      "ReactFlow",
      "PostgreSQL",
      "Prisma",
      "Puppeteer",
      "Cheerio",
      "Zod",
    ],
    achievements: [
      "no-code pipeline builder — nodes on a canvas instead of brittle scraping scripts",
      "natural-language data extraction embedded as a pipeline node",
      "runs on demand or scheduled; exports straight to CSV",
    ],
    image: "/projects/scrapeflow.png",
    demo: "https://scrape-flow-steel.vercel.app",
    github: "https://github.com/AyushGupta45/ScrapeFlow",
    period: "Aug 2025 — Apr 2026",
    status: "Active",
  },
  {
    slug: "meetai",
    name: "MeetAI",
    tagline:
      "mock one-on-ones with AI agents — transcripts, summaries & contextual chat",
    lead: "A full-stack mock-call meeting platform.",
    description:
      "Create AI agents, hold one-on-one meetings with them, and get detailed summaries, transcripts, and contextual chats afterwards. Built end-to-end with Next.js SSR, a tRPC API layer over Drizzle ORM + Neon PostgreSQL, Better Auth, Polar subscriptions (monthly/yearly, sandbox-ready), and Groq language models powering agent responses.",
    categories: ["Web Development", "AI / ML"],
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "Polar",
      "Groq LLMs",
      "Tailwind CSS",
      "Zod",
      "Vercel",
    ],
    achievements: [
      "custom AI agents with editable name + instructions (10 on the free tier)",
      "post-meeting summaries, transcripts, and chats grounded in the conversation",
      "subscription billing wired through Polar",
      "live at meetai-steel.vercel.app",
    ],
    image: "/projects/meetai.png",
    demo: "https://meetai-steel.vercel.app",
    github: "https://github.com/AyushGupta45/Meetai",
    period: "Jun 2025 — Jun 2026",
    status: "Active",
  },
  {
    slug: "tradesafe",
    name: "TradeSafe",
    tagline:
      "crypto arbitrage scanner that makes LLM agents debate the trade first",
    lead: "An AI-powered cryptocurrency arbitrage platform.",
    description:
      "It detects price spreads across five exchanges (Binance, Kraken, KuCoin, Bybit, Gate.io), then runs a Bull / Bear / Mediator multi-agent debate through an LLM cascade (Groq → OpenRouter → NVIDIA, Llama 3 70B) before simulating execution and logging it to the portfolio. Next.js 14 App Router over Drizzle ORM + Neon PostgreSQL, BetterAuth (email/password + Google OAuth), Recharts dashboards.",
    categories: ["Web Development", "AI / ML", "Infrastructure"],
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Drizzle ORM",
      "PostgreSQL",
      "BetterAuth",
      "Groq",
      "OpenRouter",
      "NVIDIA",
      "Llama 3 70B",
      "Recharts",
      "Tailwind CSS",
    ],
    achievements: [
      "live price-spread detection across 5 exchanges",
      "Bull/Bear/Mediator agent debate gates every simulated trade",
      "cascading LLM fallback: Groq → OpenRouter → NVIDIA",
      "portfolio analytics: win rate, drawdown, profit factor",
    ],
    image: "/projects/tradesafe.png",
    demo: "https://tradesafe-beta.vercel.app",
    github: "https://github.com/AyushGupta45/tradesafe",
    period: "Nov 2025 — Mar 2026",
    status: "Active",
  },
  {
    slug: "assignmenthub",
    name: "AssignmentHub",
    tagline:
      "role-based assignment platform — admins assign, students submit, work gets evaluated",
    lead: "A full-stack assignment management platform.",
    description:
      "Admins create assignments, students submit work, and admins evaluate submissions — with notifications, file uploads, and real-time dashboards. React 19 + Vite SPA (Tailwind v4, shadcn/ui, Redux Toolkit) on an Express + MongoDB API with httpOnly-cookie JWT auth, role-based access, and Multer→Cloudinary upload storage.",
    categories: ["Web Development"],
    tech: [
      "React 19",
      "Vite",
      "Redux Toolkit",
      "shadcn/ui",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Multer",
    ],
    achievements: [
      "student/admin roles enforced via httpOnly-cookie JWT auth",
      "file uploads through Multer + Cloudinary (memory storage)",
      "dashboards and notifications for both sides of the workflow",
    ],
    github: "https://github.com/AyushGupta45/AssignmentHub",
    image: "projects/assignment-hub.png",
    period: "Feb 2024 — Mar 2026",
    status: "Active",
  },
  {
    slug: "dns-toggler",
    name: "DNS Toggler",
    tagline:
      "an Android TV app to set a custom ad-blocking DNS when the Settings UI isn't available",
    lead: "Bring custom DNS (and ad-blocking) to Android TV.",
    description:
      "Android lets you change your DNS in Settings, but Android TV hides that panel — so this Android Studio app restores the ability. After a one-time ADB setup from a PC/laptop to grant write-settings permission, you can point the TV at any custom DNS — e.g. AdGuard — to block ads inside streaming apps.",
    categories: ["Automation"],
    tech: ["Kotlin", "Android", "Android TV", "ADB", "DNS", "Android Studio"],
    achievements: [
      "restores DNS control that Android TV's Settings UI hides",
      "one-time ADB-based write-settings permission setup",
      "custom DNS (e.g. AdGuard) blocks ads in streaming apps",
    ],
    github: "https://github.com/AyushGupta45/DNS_toggler",
    image: "projects/dns-toggler.png",
    period: "2024",
    status: "Shipped",
  },
  {
    slug: "cricklytics",
    name: "Cricklytics",
    tagline:
      "an IPL second-innings win predictor — Random Forest on current match state",
    lead: "A Streamlit app that predicts live win probability from the state of play.",
    description:
      "For second-innings teams: pick the batting team, bowling team, city, target, current score, overs and wickets, and Cricklytics returns each side's win/loss percentage on a graph. The model is a Random Forest trained on clean, current data — prepared from Cricsheet instead of stale public sets — so predictions reflect up-to-date match trends, then served through a Streamlit app.",
    categories: ["AI / ML"],
    tech: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Random Forest",
      "Streamlit",
      "Cricsheet",
      "Matplotlib",
    ],
    achievements: [
      "trains on current Cricsheet data instead of outdated sets",
      "live win/loss percentages from the current match state",
      "interactive Streamlit predictor with graph output",
    ],
    github: "https://github.com/AyushGupta45/Cricklytics",
    image: "projects/cricklytics.png",
    period: "2024",
    status: "Published",
  },
  {
    slug: "spotify-clone",
    name: "Spotify Clone",
    tagline:
      "a Spotify homepage clone — add your own songs to a Supabase library and play them",
    lead: "A front-end-driven Spotify-inspired music player.",
    description:
      "Recreates the Spotify homepage with album cards backed by real Spotify embed iframes. Add your own songs into a Supabase (Postgres) library and play them straight from the home screen. Includes search that works across the songs you've added — a light, UI-first side project.",
    categories: ["Web Development"],
    tech: [
      "JavaScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Spotify",
      "HTML",
      "CSS",
    ],
    achievements: [
      "cloned the Spotify homepage with album cards and embeds",
      "custom song library stored in a Supabase Postgres DB",
      "working search across user-added songs",
    ],
    demo: "https://spotify-clone-ten-blue-11.vercel.app",
    image: "projects/spotify-clone.png",
    period: "2024",
    status: "Published",
  },
  {
    slug: "wanderlust",
    name: "Wanderlust",
    tagline:
      "a classic MERN travel-listings site — add, review, edit & delete listings",
    lead: "The project where the MERN fundamentals got reps.",
    description:
      "A classic full-stack travel listings app following the MVC pattern. Users log in, add listings, browse a listings index, open individual listing pages, and leave, view, edit, and delete reviews. Basic builds with Cloudinary + Multer handling image uploads and EJS server-rendered views carrying the UI.",
    categories: ["Web Development"],
    tech: [
      "Node.js",
      "Express",
      "EJS",
      "MongoDB",
      "Mongoose",
      "Cloudinary",
      "Multer",
    ],
    achievements: [
      "full CRUD over listings and reviews",
      "image uploads wired through Cloudinary + Multer",
      "strict MVC separation — controllers, models, routes, middleware",
    ],
    github: "https://github.com/AyushGupta45/wanderlust",
    image: "projects/wanderlust.png",
    period: "Jan 2024",
    status: "Shipped",
  },
  {
    slug: "simonsays",
    name: "Simon Says",
    tagline:
      "my first HTML/JS project — follow the glowing 3×3 grid pattern, round after round",
    lead: "A memory game grid that glows one tile more each round.",
    description:
      "The very first project I built with HTML, CSS and JS. Start the game and a tile glows — click it. Another tile glows — click both in order. A third tile glows — click all three. The sequence grows every round, testing your memory across a simple 3×3 grid.",
    categories: ["Web Development"],
    tech: ["JavaScript", "HTML", "CSS", "DOM", "Event Handling", "Game Logic"],
    achievements: [
      "first-ever HTML/CSS/JS project",
      "gradually growing memory sequence on a 3×3 grid",
      "live and playable on Vercel",
    ],
    demo: "https://simon-says-theta-smoky.vercel.app/",
    github: "https://github.com/AyushGupta45/Simon-says",
    image: "projects/simon-says.png",
    period: "2023",
    status: "Published",
  },
  {
    slug: "edutract",
    name: "EduTract",
    tagline:
      "enrollment & fee tracking for an offline coaching institute — Spring Boot + Angular",
    lead: "Course enrollment and fee-tracking system built in the TCS ILP program.",
    description:
      "A Spring Boot + Angular system for a private offline coaching institute with multiple batches and front-desk-collected fees. Admins manage students, faculty, courses, and enrollments and know exactly who owes what and when; faculty run their batch (attendance, materials, announcements); students see their own fee status, schedule, and batch updates. No online payments or self-registration — fees are recorded at the desk, matching how offline institutes actually work.",
    categories: ["Web Development"],
    tech: ["Java", "Spring Boot", "Angular", "PostgreSQL", "REST API"],
    achievements: [
      "role-aware workflow for admin, faculty, and students",
      "tracks exactly who owes what and when across batches",
      "built and demoed within the TCS ILP program",
    ],
    period: "TCS ILP",
    status: "Shipped",
  },
  {
    slug: "bank-fraud-chatbot",
    name: "Guardian Bank Chatbot",
    tagline: "a four-stage bank fraud assistant built at TCS AI Fridays",
    lead: "A guardrailed, RAG-backed banking assistant for fraud queries.",
    description:
      "Built across four stages at TCS AI Fridays. First, input sanitation and guardrails — a local Ollama LLM masks confidential data like card numbers and pins. Second, common actions (blocking a card, etc.) short-circuit straight to the API without an LLM. Third, a LangChain RAG over bank policies and actions grounds every answer. Fourth, the assistant returns the final response.",
    categories: ["AI / ML", "Automation"],
    tech: ["LangChain", "Ollama", "Llama", "RAG", "Python", "Guardrails"],
    achievements: [
      "local-model guardrails mask card numbers & pins in queries",
      "routine actions bypass the LLM straight to the API",
      "LangChain RAG grounded in bank policies and actions",
    ],
    period: "TCS AI Fridays",
    status: "Shipped",
  },
];
