/* ===================================================================
    EDUCATION — single source of truth for the Education section.
    Newest first. `grade` (CGPA or percentage) shows as a chip when
    filled in; leave "" to hide the chip.
    =================================================================== */

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  grade?: string;
  highlights?: string[];
  coursework?: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "B.E. in AI & Data Science",
    school: "Vasantdada Patil Pratishthan's College of Engineering",
    period: "Sept 2023 — May 2026",
    grade: "8.4 CGPA",
    highlights: [
      "Specialized in Artificial Intelligence, Deep Learning, & Agentic Systems",
      "Lead developer for final year capstone AI pipeline & research implementations",
    ],
    coursework: ["Machine Learning", "Deep Learning", "Data Structures", "Database Systems", "Web Engineering"],
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "S.H. Jondhale Polytechnic, Dombivli (W)",
    period: "Sept 2021 — May 2023",
    grade: "83.6%",
    highlights: [
      "Core foundation in Software Engineering, Object Oriented Design, & Operating Systems",
      "Built full-stack web applications and algorithm benchmark suites for departmental events",
    ],
    coursework: ["Object-Oriented Programming", "Computer Networks", "Software Testing", "Java & C++"],
  },
  {
    degree: "HSC — Science & Vocational Studies",
    school: "Mulund Vidyamandir & Jr. College, Mulund (W)",
    period: "Jun 2018 — Mar 2020",
    grade: "66.7%",
    highlights: [
      "Focused on Mathematics, Physics, Chemistry, and Fundamentals of Computer Science",
    ],
    coursework: ["Mathematics", "Physics", "Computer Fundamentals"],
  },
  {
    degree: "SSC — Secondary School Certificate",
    school: "St. Xavier's High School & Junior College, Bhandup (W)",
    period: "Jun 2016 — Mar 2018",
    grade: "86%",
    highlights: [
      "Achieved distinction grade with strong focus on Science & Mathematics",
    ],
    coursework: ["Mathematics", "Science & Technology", "English"],
  },
];
