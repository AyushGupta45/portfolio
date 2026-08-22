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
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "Kotlin"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "ShadCN UI", "ReactFlow", "Redux Toolkit", "Recharts"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "tRPC", "REST APIs", "Better Auth", "JWT"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Drizzle ORM", "Mongoose", "Cloudinary"],
  },
  {
    category: "AI & ML",
    skills: ["LLM Integration", "Agentic Workflows", "Multi-Agent Systems", "Groq API", "Puppeteer", "Cheerio"],
  },
  {
    category: "Tools",
    skills: ["Git & GitHub", "Postman", "Vercel", "Zod", "Nodemailer"],
  },
];

