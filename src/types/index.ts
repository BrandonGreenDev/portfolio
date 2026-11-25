export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "toolsCloud" | "servicenow" | "a11y";
}
