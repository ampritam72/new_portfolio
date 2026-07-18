export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: "Web" | "Mobile" | "AI/ML" | "Design";
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string; // We can use beautiful styled abstract code cards or custom svgs/backgrounds
  featured?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journalOrConference: string;
  year: string;
  type: "Conference" | "Review Paper" | "Journal";
  abstract: string;
  doi?: string;
  link?: string;
  pdfUrl?: string;
  tags?: string[];
}

export interface Skill {
  name: string;
  percentage: number;
  iconName: string; // Tailwind icon name
  category: "frontend" | "mobile" | "language" | "design" | "tools";
}

export interface Tool {
  name: string;
  category: "Design" | "Code" | "Office" | "AI" | "Agile";
  iconUrl?: string; // optional fallback
  iconName?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
  bullets?: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface UserCustomizer {
  name: string;
  roleTitle: string;
  accentColor: "purple" | "cyan" | "emerald" | "orange";
  bioText: string;
}

export interface LinkedInComment {
  id: string;
  author: string;
  avatar?: string;
  headline: string;
  text: string;
  date: string;
  likes: number;
}

export interface LinkedInPost {
  id: string;
  author: string;
  avatar?: string;
  headline: string;
  date: string;
  text: string;
  hashtags: string[];
  imageType: "ucics" | "robosoccer" | "academic" | "deeplearning";
  likes: number;
  comments: LinkedInComment[];
  reposts: number;
  hasLiked?: boolean;
}
