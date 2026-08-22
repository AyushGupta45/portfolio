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
 
}

export const education: EducationEntry[] = [
  {
    degree: "B.E. in Artificial Intelligence & Data Science",
    school: "Vasantdada Patil Pratishthan's College of Engineering",
    period: "Sept 2023 — May 2026",
    grade: "8.4 CGPA",  
  },
  {
    // TODO(chat): replace with the exact junior college name once provided.
    degree: "Maharashtra State Board of Technical Education, Mumbai",
    school: "S.H. Jondhale Polytechnic, Dombivli (W)",
    period: "Sept 2021 — May 2023",
    grade: "83.6%",
  
  },
  {
    // TODO(chat): replace with the exact junior college name once provided.
    degree: "Maharashtra State Board of Secondary & Higher Secondary Education, Pune",
    school: "Mulund vidyamandir & jr. college, Mulund (W)",
    period: "Jun 2018 — Mar 2020",
    grade: "66.7%",
   
  },
  {
    degree: "Maharashtra State Board of Secondary & Higher Secondary Education, Pune",
    school: "St. Xavier's High School & Junior College, Bhandup (W)",
    period: "Jun 2016 — Mar 2018",
    grade: "86%",
  },
];
