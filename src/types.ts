
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Certification {
  name: string;
  provider: string;
  description: string;
  year: number | string;
}

export interface Project {
  title: string;
  description: string[];
  technologies?: string[];
  type: 'Project' | 'Thesis';
  outcome?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}
