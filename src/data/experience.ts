// Work history, certifications and education shown in the Experience section.

/** A month/year date. `iso` is used for the <time dateTime> attribute (YYYY-MM). */
export interface MonthYear {
  label: string;
  iso: string;
}

export interface Job {
  id: string;
  role: string;
  team?: string;
  company: string;
  location: string;
  start: MonthYear;
  /** Omit `end` for a current role. */
  end?: MonthYear;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  abbreviation: string;
  issuer: string;
  date: MonthYear;
}

export interface Education {
  id: string;
  credential: string;
  institution: string;
  year: string;
}

export const jobs: Job[] = [
  {
    id: "servicenow",
    role: "Technical Support Engineer",
    team: "User Experience (UX) Team",
    company: "ServiceNow",
    location: "Orlando, FL",
    start: { label: "Dec 2025", iso: "2025-12" },
    highlights: [
      "Resolved 314+ enterprise customer cases with a 9.8/10 average CSAT",
      "Product areas: AI Agents, Now Assist, Service Portal, UI Builder and Employee Center",
      "Owned P1 escalations and raised product defects (PRBs) with development teams",
    ],
  },
  {
    id: "investcloud",
    role: "Front End Developer",
    company: "InvestCloud",
    location: "Tampa, FL",
    start: { label: "Apr 2021", iso: "2021-04" },
    end: { label: "Jun 2025", iso: "2025-06" },
    highlights: [
      "Built reusable React and Angular component libraries",
      "Built responsive apps integrated with REST APIs",
      "Led accessibility and performance work with Axe and Lighthouse to meet WCAG",
      "Mentored junior developers",
    ],
  },
  {
    id: "softrams",
    role: "Full Stack Web Developer Intern",
    company: "Softrams",
    location: "Leesburg, VA",
    start: { label: "Jan 2021", iso: "2021-01" },
    end: { label: "Mar 2021", iso: "2021-03" },
    highlights: [
      "Modernized a legacy ASP app to Angular with Node/Express services",
    ],
  },
  {
    id: "fis",
    role: "Executive Financial Technology Consultant",
    company: "FIS Global",
    location: "Maitland, FL",
    start: { label: "Mar 2018", iso: "2018-03" },
    end: { label: "Aug 2020", iso: "2020-08" },
    highlights: ["Presidential Club, top 20% of sales executives"],
  },
];

export const certifications: Certification[] = [
  {
    id: "csa",
    name: "Certified System Administrator",
    abbreviation: "CSA",
    issuer: "ServiceNow",
    date: { label: "Apr 2026", iso: "2026-04" },
  },
  {
    id: "cad",
    name: "Certified Application Developer",
    abbreviation: "CAD",
    issuer: "ServiceNow",
    date: { label: "Nov 2026", iso: "2026-11" },
  },
];

export const education: Education[] = [
  {
    id: "ucf-bootcamp",
    credential: "Full Stack Web Development Boot Camp",
    institution: "University of Central Florida",
    year: "2020",
  },
  {
    id: "ucf-bs",
    credential: "B.S. Psychology",
    institution: "University of Central Florida",
    year: "2018",
  },
];
