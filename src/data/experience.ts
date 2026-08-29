interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  domain: string;
  points: string[];
  tags: string[];
}

/* Newest first. The first entry marked `current: true` feeds the intro
 * screen and trainer card. */
export const experience: ExperienceEntry[] = [
  {
    role: "Systems Engineer",
    company: "Tata Consultancy Services",
    companyUrl: "https://www.tcs.com",
    period: "Jun 2026 — Present",
    current: true,
    domain: "Enterprise-Scale Projects",
    points: [
      "Joined the Digital track, applying full-stack skills to enterprise-scale projects.",
      "Deepening expertise in full-stack architecture, agentic AI systems and scalable backend design.",
      "Still building independently — see the Projectdex for open-source work.",
    ],
    tags: ["Enterprise", "Full-Stack", "Next.js", "TypeScript"],
  },
  // {
  //   role: "Freelance Full-Stack Developer",
  //   company: "Independent Clients",
  //   period: "2025 — 2026", // REPLACE: exact months if you want them
  //   current: false,
  //   domain: "Production Systems for Real Businesses",
  //   points: [
  //     "Shipped a shift-scheduling backend to production for a Canada-based construction company.",
  //     "Built a zero-cost, Git-backed CMS website for Ayushman Hospitals.",
  //   ],
  //   tags: ["Node.js", "CMS", "Client Delivery"],
  // },
];
