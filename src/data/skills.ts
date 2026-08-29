interface SkillCategory {
  category: string;
  skills: string[];
}

/* Merged from LinkedIn "Technical Skills" + stacks actually used across
 * github.com/AyushGupta45 repos. Category names map to icons in
 * moveset-panel.tsx (unknown categories fall back to a wrench icon). */
export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "Angular", "Tailwind CSS", "ShadCN UI", "ReactFlow", "Recharts", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "tRPC", "REST APIs", "Better Auth", "JWT"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Drizzle ORM", "Prisma", "NeonDb"],
  },
  {
    category: "AI & ML",
    skills: ["Agentic AI", "Agentic Workflows", "RAG", "LangChain", "Multi-Agent Systems", "Puppeteer", "Cheerio"],
  },
  {
    category: "Tools",
    skills: ["Git & GitHub", "Postman", "Vercel", "Zod", "AWS","Docker", "Figma"],
  },
];

