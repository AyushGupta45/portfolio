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
      "PostgreSQL (Neon)",
      "Browser Automation",
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
      "tRPC",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "Better Auth",
      "Polar",
      "Groq LLMs",
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
      "Drizzle ORM",
      "Neon PostgreSQL",
      "Groq / OpenRouter / NVIDIA",
      "Llama 3 70B",
      "Recharts",
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
  // {
  //   slug: "assignmenthub",
  //   name: "AssignmentHub",
  //   tagline: "role-based assignment platform — admins assign, students submit, work gets evaluated",
  //   lead: "A full-stack assignment management platform.",
  //   description:
  //     "Admins create assignments, students submit work, and admins evaluate submissions — with notifications, file uploads, and real-time dashboards. React 19 + Vite SPA (Tailwind v4, shadcn/ui, Redux Toolkit) on an Express + MongoDB API with httpOnly-cookie JWT auth, role-based access, and Multer→Cloudinary upload storage.",
  //   categories: ["Web Development"],
  //   tech: [
  //     "React 19",
  //     "Vite",
  //     "Redux Toolkit",
  //     "shadcn/ui",
  //     "Express",
  //     "MongoDB",
  //     "JWT",
  //     "Cloudinary",
  //   ],
  //   achievements: [
  //     "student/admin roles enforced via httpOnly-cookie JWT auth",
  //     "file uploads through Multer + Cloudinary (memory storage)",
  //     "dashboards and notifications for both sides of the workflow",
  //   ],
  //   image: "/projects/assignmenthub.png",
  //   github: "https://github.com/AyushGupta45/AssignmentHub",
  //   period: "Feb 2024 — Mar 2026",
  //   status: "Active",
  // },
  // {
  //   slug: "cricklytics",
  //   name: "Cricklytics",
  //   tagline: "IPL win predictor — Random Forest over 15 seasons of match data",
  //   lead: "An IPL match win predictor that calculates live win/lose probabilities from the current state of play.",
  //   description:
  //     "Inputs include score, wickets left, venue, and more — fed to a Random Forest model trained on historical IPL data from 2008 to 2023. Ships as two live Streamlit apps: a past-match analysis and visualization tool, and a live match prediction tool.",
  //   categories: ["AI / ML"],
  //   tech: ["Python", "Random Forest", "Streamlit", "Jupyter"],
  //   achievements: [
  //     "trained on 15+ seasons of real IPL match data",
  //     "live win probabilities from match state — not just pre-match guesses",
  //     "two public Streamlit deployments: analysis tool + live predictor",
  //   ],
  //   image: "/projects/cricklytics.png",
  //   github: "https://github.com/AyushGupta45/Cricklytics",
  //   period: "Feb 2024 — May 2024",
  //   status: "Published",
  // },
  // {
  //   slug: "wanderlust",
  //   name: "Wanderlust",
  //   tagline: "travel-listings MVC app — Node, Express & Mongo with Cloudinary image uploads",
  //   lead: "A classic full-stack travel listings app following the MVC pattern.",
  //   description:
  //     "Express routes and controllers over Mongoose models, EJS server-rendered views, Cloudinary-backed image handling, and middleware-driven auth and validation. The project where the fundamentals got reps — routing, schemas, sessions, and server-side rendering.",
  //   categories: ["Web Development"],
  //   tech: ["Node.js", "Express", "EJS", "MongoDB", "Mongoose", "Cloudinary"],
  //   achievements: [
  //     "strict MVC separation — controllers, models, routes, middleware",
  //     "image uploads handled through Cloudinary config layer",
  //     "server-rendered EJS views with validation middleware",
  //   ],
  //   image: "/projects/wanderlust.png",
  //   github: "https://github.com/AyushGupta45/wanderlust",
  //   period: "Jan 2024",
  //   status: "Shipped",
  // },
];
