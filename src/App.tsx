import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Sliders,
  Download,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileText,
  Upload,
  User,
  Heart,
  ExternalLink,
  Palette,
  Calendar,
  Clock,
  BookOpen as BlogIcon,
  Terminal,
  CheckSquare,
  Table,
  Brain,
  Database,
  Trello,
  LayoutGrid,
  Image,
  PenTool,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Share2,
  MoreHorizontal,
  Globe,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TypewriterCode } from "./components/TypewriterCode";
import { BackgroundCodeRain } from "./components/BackgroundCodeRain";
import { InteractivePortrait } from "./components/InteractivePortrait";
import { TypewriterGreeting } from "./components/TypewriterGreeting";

import { Project, Skill, Tool, Publication } from "./types";
import {
  initialProjects,
  initialSkills,
  initialTools,
  experiences,
  educationList,
  certifications,
  initialPublications,
} from "./data";

import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import SkillSection from "./components/SkillSection";


interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Designing for the Modern Web: A UI/UX Case Study",
    category: "UI/UX Design",
    date: "June 24, 2026",
    readTime: "4 min read",
    summary: "Exploring the harmony of layout spacing, visual hierarchy, and color palettes to enhance interactive micro-moments and tactile web experiences.",
    content: "When designing for the modern web, aesthetics and usability must work in absolute harmony. Establishing a strong visual hierarchy is vital: this means pairing clear typographic sizing with generous negative space to minimize cognitive load, and defining a deliberate accent system. Good design is invisible—it guides users through layout flow, intuitive touch targets, and subtle visual feedback, creating experiences that feel native and effortless."
  },
  {
    id: "2",
    title: "Bridging the Gap Between Design and Frontend Code",
    category: "Frontend",
    date: "July 08, 2026",
    readTime: "6 min read",
    summary: "How to translate pixel-perfect visual components from Figma directly into modular React components using clean Tailwind CSS utility classes.",
    content: "The biggest challenge for multi-disciplinary creators is translation: turning a high-fidelity design wireframe into interactive frontend code. By leveraging Vite, React, and Tailwind CSS, developers can build modular, component-driven layouts that match the design intent exactly. Using utility classes allows for rapid styling directly within markup, preventing CSS bloating. Storing shared UI patterns, such as layout grids and responsive padding configurations, makes it easy to construct fluid layouts that resize gracefully on all screen widths."
  },
  {
    id: "3",
    title: "A Student's Guide to Machine Learning & Coding Pipelines",
    category: "Computer Science",
    date: "July 14, 2026",
    readTime: "5 min read",
    summary: "A look into building structured programming pipelines in C++ and Python as a CSE student, fusing data models with software design.",
    content: "Studying Computer Science and Engineering offers a profound understanding of computer systems, database design, and algorithmic efficiency. Whether you are modeling signal processes in Matlab, querying relational databases, or structuring model pipelines in Python, clean code principles are identical. Writing modular logic, defining clear interfaces, and handling errors proactively are the foundations of building scalable systems. Fusing these rigid backend architectures with interactive frontend designs results in robust, real-world full-stack products."
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Professional details
  const name = "Abir Mahmud Pritam";
  const roleTitle = "Full-Stack Developer | Graphic & UI/UX Designer | B.Sc CSE Student";
  const bioText = "A versatile Full-Stack Developer, Graphic & UI/UX Designer, and B.Sc. Computer Science & Engineering (CSE) student at Varendra University. Fusing design elegance with engineering rigor, I build high-performance full-stack web applications, dynamic interactive client interfaces, and robust backend pipelines using React, Tailwind, Python, C/C++, and SQL Databases.";

  // Custom uploaded portrait picture
  const [portraitImage, setPortraitImage] = useState<string | null>("/portrait.jpg");

  // Projects filter
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch GitHub repos
  useEffect(() => {
    async function fetchGitHubRepos() {
      // First, try to load from localStorage cache if available to prevent API delays and handle offline states
      try {
        const cached = localStorage.getItem("github_repos_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(prev => {
              const merged = [...prev];
              parsed.forEach((fp) => {
                const isDuplicate = merged.some(existing => {
                  const sameGithub = existing.github && fp.github && existing.github.toLowerCase() === fp.github.toLowerCase();
                  const sameTitle = existing.title.toLowerCase().replace(/\s+/g, "") === fp.title.toLowerCase().replace(/\s+/g, "");
                  const sameLink = existing.link && fp.link && existing.link.toLowerCase() === fp.link.toLowerCase();
                  return sameGithub || sameTitle || sameLink;
                });

                if (!isDuplicate) {
                  merged.push(fp);
                }
              });
              return merged;
            });
          }
        }
      } catch (e) {
        // Silent catch for localStorage issues
      }

      setLoadingRepos(true);
      try {
        const response = await fetch("https://api.github.com/users/abirmahmudpritam/repos?sort=updated&per_page=100");
        if (!response.ok) {
          throw new Error("Failed to fetch repositories from GitHub API");
        }
        const repos = await response.json();
        
        const acronyms = ["ECG", "CNN", "ViT", "MRI", "AI", "ML", "UI", "UX", "CSE", "VU", "DSP", "API", "SQL", "HTML", "CSS", "JS", "TS"];
        const formatRepoName = (rawName: string) => {
          return rawName
            .split(/[-_]+/)
            .map(word => {
              const upperWord = word.toUpperCase();
              if (acronyms.includes(upperWord)) return upperWord;
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
        };

        const fetchedProjects: Project[] = repos
          .filter((repo: any) => !repo.fork) // Keep only repositories authored by Abir
          .map((repo: any) => {
            const title = formatRepoName(repo.name);
            const topics = repo.topics || [];
            const lang = repo.language || "";
            const lowerLang = lang.toLowerCase();
            const lowerName = repo.name.toLowerCase();
            
            // Intelligently categorize project
            let category: "Web" | "Mobile" | "AI/ML" | "Design" = "Web";
            if (
              lowerLang === "dart" || 
              lowerLang === "kotlin" || 
              lowerLang === "swift" || 
              topics.some((t: string) => ["flutter", "android", "ios", "mobile", "react-native"].includes(t.toLowerCase())) ||
              lowerName.includes("flutter") || 
              lowerName.includes("android") || 
              lowerName.includes("mobile")
            ) {
              category = "Mobile";
            } else if (
              lowerLang === "python" || 
              lowerLang === "jupyter notebook" ||
              topics.some((t: string) => ["machine-learning", "deep-learning", "neural-network", "ai", "nlp", "computer-vision", "data-science", "tensorflow", "pytorch", "cnn", "vit"].includes(t.toLowerCase())) ||
              lowerName.includes("classification") ||
              lowerName.includes("detection") ||
              lowerName.includes("model") ||
              lowerName.includes("learning")
            ) {
              category = "AI/ML";
            } else if (
              topics.some((t: string) => ["design", "ui", "ux", "figma", "canvas", "photoshop", "illustrator"].includes(t.toLowerCase())) ||
              lowerName.includes("design") ||
              lowerName.includes("uiux") ||
              lowerName.includes("creative")
            ) {
              category = "Design";
            }

            // Tech stack formatting
            const techSet = new Set<string>();
            if (repo.language) techSet.add(repo.language);
            topics.forEach((t: string) => {
              if (t.toLowerCase() === "reactjs" || t.toLowerCase() === "react") techSet.add("React");
              else if (t.toLowerCase() === "tailwindcss" || t.toLowerCase() === "tailwind") techSet.add("Tailwind CSS");
              else if (t.toLowerCase() === "typescript" || t.toLowerCase() === "ts") techSet.add("TypeScript");
              else if (t.toLowerCase() === "javascript" || t.toLowerCase() === "js") techSet.add("JavaScript");
              else if (t.toLowerCase() === "firebase") techSet.add("Firebase");
              else if (t.toLowerCase() === "python") techSet.add("Python");
              else if (t.toLowerCase() === "flutter") techSet.add("Flutter");
              else if (t.toLowerCase() === "cnn") techSet.add("CNN");
              else if (t.toLowerCase() === "deep-learning") techSet.add("Deep Learning");
              else techSet.add(t.charAt(0).toUpperCase() + t.slice(1));
            });

            if (techSet.size === 0) {
              techSet.add("GitHub");
              techSet.add("Git");
            }

            return {
              id: repo.id.toString(),
              title,
              subtitle: repo.language ? `${repo.language} Open Source` : "Open Source Project",
              category,
              description: repo.description || `An elegant open-source ${repo.language || "software"} project authored on GitHub by Abir Mahmud Pritam. Features streamlined code organization and production-ready architecture.`,
              tech: Array.from(techSet).slice(0, 5),
              link: repo.homepage || repo.html_url,
              github: repo.html_url,
              featured: repo.stargazers_count > 0 || repo.watchers_count > 0
            };
          });

        // Save successfully fetched projects to local cache
        try {
          localStorage.setItem("github_repos_cache", JSON.stringify(fetchedProjects));
        } catch (e) {
          // Silent catch for localStorage space limits
        }

        // Merge keeping handcrafted ones first, and preventing duplicates
        setProjects(prev => {
          const merged = [...prev];
          fetchedProjects.forEach((fp) => {
            const isDuplicate = merged.some(existing => {
              const sameGithub = existing.github && fp.github && existing.github.toLowerCase() === fp.github.toLowerCase();
              const sameTitle = existing.title.toLowerCase().replace(/\s+/g, "") === fp.title.toLowerCase().replace(/\s+/g, "");
              const sameLink = existing.link && fp.link && existing.link.toLowerCase() === fp.link.toLowerCase();
              return sameGithub || sameTitle || sameLink;
            });

            if (!isDuplicate) {
              merged.push(fp);
            }
          });
          return merged;
        });

      } catch (err) {
        // Silently log warning instead of console.error to avoid error trackers or test environments raising failures
        console.warn("GitHub API fetch limited or offline. Falling back to cached data and local project catalog.");
      } finally {
        setLoadingRepos(false);
      }
    }

    fetchGitHubRepos();
  }, []);

  // Publications filter
  const [selectedPubType, setSelectedPubType] = useState<string>("All");
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);

  // Contact form submission state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    try {
      const storedImg = localStorage.getItem("portfolio_portrait");
      if (storedImg) {
        setPortraitImage(storedImg);
      }
    } catch (e) {
      console.error("Error reading localStorage image", e);
    }
  }, []);

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "publications", "blog", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle contact submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    try {
      const existing = localStorage.getItem("portfolio_messages");
      const messagesList = existing ? JSON.parse(existing) : [];
      
      const newMsg = {
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
        time: new Date().toLocaleString(),
      };

      messagesList.unshift(newMsg);
      localStorage.setItem("portfolio_messages", JSON.stringify(messagesList));
      
      setFormSubmitted(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to store contact submission", err);
    }
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPortraitImage(base64String);
        localStorage.setItem("portfolio_portrait", base64String);
      };
      reader.readAsDataURL(file);
    }
  };  // Fixed visual styles
  const getAccentClass = () => "purple";
  const getAccentTextClass = () => "text-purple-600 font-bold";
  const getAccentBgClass = () => "bg-purple-600 hover:bg-purple-700";
  const getAccentBorderClass = () => "border-purple-300";
  const getAccentGlassGlowClass = () => "cyber-glass-glow-purple";

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const filteredPublications = selectedPubType === "All"
    ? initialPublications
    : initialPublications.filter(p => p.type === selectedPubType);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen relative text-slate-800 selection:bg-purple-200 selection:text-purple-900 bg-[#FAF9FF]">
      {/* Fixed light background container with beautiful 60% blurred bgpic.png and global coding rain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base light theme background */}
        <div className="absolute inset-0 bg-[#FCFAFF]" />
        
        {/* The uploaded bgpic.png background image used directly for the whole website */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.7]"
          style={{ 
            backgroundImage: `url("/bgpic.png")`,
          }}
        />
        
        {/* Global matrix-style coding rain streaming across the entire website, fixed behind everything */}
        <div className="absolute inset-0 opacity-100">
          <BackgroundCodeRain />
        </div>
      </div>

      {/* Main navigation Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={handleNavigateSection}
        accentClass={getAccentClass()}
      />

      {/* Hero Presentation Stage */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:pb-0 overflow-hidden z-10">
        
        {/* MOBILE VERSION: Custom layout for mobile view (vertical stack with requested order) */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col space-y-6 items-start relative z-10 pt-4 text-left">
          
          {/* 1. Badge / Card */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 w-fit shadow-sm self-start">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getAccentBgClass()}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${getAccentBgClass()}`}></span>
            </span>
            <span className="text-xs font-mono font-bold text-purple-700 tracking-wide uppercase">
              Available for Projects & Tech Internships
            </span>
          </div>

          {/* 2. Profile picture in Clean Large Purple Round Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center w-full my-6"
          >
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              {/* Clean round purple border frame, made larger and with no background shapes */}
              <div className="w-[280px] h-[280px] rounded-full border-[8px] border-purple-600 p-1 bg-white shadow-[0_16px_48px_rgba(147,51,234,0.25)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src="/mbpic.png"
                    alt="Abir Mahmud Pritam"
                    className="w-full h-full object-cover object-center"
                    style={{ minWidth: '100%', minHeight: '100%' }}
                    onError={(e) => {
                      // Fallback if mbpic.png isn't fully loaded yet
                      (e.target as HTMLImageElement).src = portraitImage || "/portrait.jpg";
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Hello, I'm Abir Mahmud Pritam and other elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 flex flex-col items-start w-full"
          >
            <div className="space-y-2.5 w-full">
              <TypewriterGreeting isMobile={true} className="text-left" />
              
              {/* Dynamic Subheading Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-x-2.5 gap-y-2 pt-1"
              >
                <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 shadow-sm">
                  <Sparkles size={13} className="text-purple-600 animate-pulse" />
                  <span className="text-xs font-semibold text-purple-700">
                    Full-Stack Developer, Graphic & UI/UX Designer
                  </span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-50/60 border border-purple-100/50 text-xs text-purple-700 font-semibold shadow-sm">
                  <span className="text-purple-600 font-bold">&lt;/&gt;</span>
                  <span>CSE Student</span>
                </div>
              </motion.div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl">
              {bioText}
            </p>

            {/* Social Links Row exactly underneath description */}
            <div className="flex items-center space-x-3 pt-1.5 pb-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="Facebook">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="Instagram">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="https://linkedin.com/in/abirmahmudpritam" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="LinkedIn">
                <Linkedin size={18} className="text-white" />
              </a>
              <a href="https://github.com/abirmahmudpritam" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="GitHub">
                <Github size={18} className="text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="YouTube">
                <Youtube size={18} className="text-white" />
              </a>
            </div>

            {/* Developer interactive terminal code block with high fidelity continuous typing animation */}
            <div className="w-full text-left">
              <TypewriterCode />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              <button
                onClick={() => handleNavigateSection("contact")}
                className={`px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center space-x-2 cursor-pointer ${getAccentBgClass()}`}
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </button>

              <button
                onClick={() => handleNavigateSection("projects")}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-white hover:bg-purple-50/50 border border-purple-200 text-slate-700 hover:text-purple-700 transition-all flex items-center space-x-2 cursor-pointer shadow-sm hover:shadow"
              >
                <span>View My Portfolio</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* WEB VERSION: Spectacular Centered Portrait with side columns matching requested image */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-8 w-full items-stretch justify-between relative z-10 min-h-[75vh] mt-4">
          
          {/* Left Column: Hello & Personal Info (Width: 35%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[35%] flex flex-col justify-center space-y-6 z-20 pr-4"
          >
            <div className="space-y-2">
              <TypewriterGreeting isMobile={false} className="text-left" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm font-sans">
              A developer who loves blending creative frontends with scalable backends to deliver meaningful digital products.
            </p>

            <button
              onClick={() => handleNavigateSection("projects")}
              className="px-8 py-3.5 rounded-full font-extrabold text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 hover:shadow-[0_8px_25px_rgba(219,39,119,0.3)] transition-all duration-300 flex items-center space-x-2 w-fit uppercase tracking-wider cursor-pointer shadow-md"
            >
              <span>Download Portfolio</span>
              <ArrowRight size={13} className="text-white" />
            </button>
          </motion.div>

          {/* Center Column: Portrait Image sitting at the bottom, perfectly fading out (Width: 30%) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
            className="w-[30%] flex flex-col justify-end relative z-10 self-end h-[680px] group/img overflow-visible"
          >
            <div className="w-full h-full relative flex items-end">
              {portraitImage ? (
                <div className="w-full h-full relative flex items-end justify-center">
                  <img
                    src="/webpic.png"
                    alt="Abir Mahmud Pritam"
                    className="w-full h-[95%] object-cover object-center transition-all duration-700 hover:scale-[1.02]"
                    style={{
                      maskImage: 'linear-gradient(to top, transparent 0%, black 18%, black 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 18%, black 100%)'
                    }}
                    onError={(e) => {
                      // Fallback if webpic.png isn't fully loaded or available yet
                      (e.target as HTMLImageElement).src = portraitImage || "/portrait.jpg";
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle clean bottom background blend matching #FCFAFF and #FAF9FF */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FCFAFF] via-[#FCFAFF]/40 to-transparent pointer-events-none z-10" />

                  {/* Interactive camera overlay for smooth portrait changes */}
                  <label className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 cursor-pointer z-30 rounded-3xl m-4 h-[90%] self-end">
                    <div className="p-3.5 rounded-full bg-white/10 border border-white/20 mb-2 shadow-lg">
                      <Camera size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Change Portrait</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="w-full h-[380px] flex flex-col items-center justify-center p-6 bg-white/50 border border-purple-100 rounded-3xl text-center space-y-4 mb-12 shadow-md">
                  <User size={50} className="text-purple-600" />
                  <span className="text-xs font-mono font-bold text-slate-700">Creative Portrait</span>
                  <label className="cursor-pointer py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105">
                    <Camera size={13} />
                    <span>Upload Picture</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Web Developer Tag Display (Width: 35%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-[35%] flex flex-col justify-center items-end text-right z-20 pl-4"
          >
            <div className="space-y-3 font-sans text-right">
              <h2 className="text-5xl xl:text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                A WEB
              </h2>
              <div className="flex justify-end pr-1">
                <div className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-purple-200/50 text-2xl xl:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 shadow-sm">
                  &lt;/&gt;
                </div>
              </div>
              <h2 className="text-5xl xl:text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                DEVELOPER
              </h2>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Interests Block Section ("Things I Love") */}
      <section className="py-24 relative z-10 border-t border-purple-100 bg-purple-50/20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
              Interests & Passion
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
              Things I Love
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Designing */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
                  <Palette className="text-purple-600" size={20} />
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-slate-800 group-hover:text-purple-950 transition-colors">Designing</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                  Passionate about designing. I focus on creating user-centered and visually engaging interfaces, paying attention to every detail. Whether it's graphics or UI/UX, my goal is to craft designs that are both functional and inspiring.
                </p>
              </div>
            </motion.div>

            {/* Developing */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                  <Code2 className="text-cyan-600" size={20} />
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-slate-800 group-hover:text-purple-950 transition-colors">Developing</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                  Fascinated by high-performance backend pipelines and dynamic frontend user experiences, I build full-stack web applications. I integrate robust technologies like React, Node.js, Python, and SQL databases to turn interactive layouts into scalable, functional, and secure software.
                </p>
              </div>
            </motion.div>

            {/* Exploring */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
                  <Sparkles className="text-amber-600" size={20} />
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-slate-800 group-hover:text-purple-950 transition-colors">Exploring</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                  I constantly explore new tools, creative techniques, and coding practices to expand my skills. From experimenting with AI-assisted web apps to trying out design innovations, I aim to combine creativity and technology to make impactful projects.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 relative z-10 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Biography Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
                  But who am I?
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
                  About Me
                </h2>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 shadow-md">
                <p>
                  Hey there, I'm <strong className="text-purple-700 font-bold">Pritam</strong>, a 23-year-old Full-Stack Developer, Graphic & UI/UX Designer from Bangladesh. I'm currently studying in the Department of CSE at Varendra University, while building high-fidelity full-stack applications. Fusing algorithmic logic with polished UI design, I craft interactive systems from responsive frontend views down to scalable database and server structures.
                </p>
                <p>
                  My professional focus is simple: engineering design-to-code solutions that not only look spectacular but are optimized for speed, security, and exceptional user experience. Whether it's crafting intelligent student dashboards, deep-learning classifiers, or high-performance APIs, I thrive on tackling full-stack challenges.
                </p>
                <p>
                  Outside of coding and designing, I'm passionate about exploring cutting-edge tech trends, diving into creative content, and playing competitive games like PUBG Mobile. I love sharing my coding experiments to inspire and build meaningful digital connections.
                </p>
              </div>
            </div>

            {/* Timelines Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Education block */}
              <div>
                <h4 className="font-display font-bold text-base text-slate-800 uppercase tracking-wider mb-5 flex items-center space-x-2">
                  <BookOpen size={18} className={getAccentTextClass()} />
                  <span>Educational Background</span>
                </h4>

                <div className="space-y-5 border-l border-purple-100 pl-4 ml-2">
                  {educationList.map((edu, idx) => (
                    <div key={idx} className="relative group space-y-1.5">
                      <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-purple-600 border border-white" />
                      <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                        <span className="font-bold text-slate-800 text-sm sm:text-base">{edu.degree}</span>
                        <span className="text-slate-500 font-bold">{edu.duration}</span>
                      </div>
                      <p className="text-sm text-slate-500 font-display font-medium">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm font-mono text-slate-500">GPA Score: <span className="text-slate-800 font-bold">{edu.gpa}</span></p>
                      )}
                      {edu.bullets && edu.bullets.map((b, i) => (
                        <p key={i} className="text-xs sm:text-sm text-slate-500 italic leading-relaxed pt-1 font-sans">• {b}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and achievements block */}
              <div className="pt-4">
                <h4 className="font-display font-bold text-base text-slate-800 uppercase tracking-wider mb-5 flex items-center space-x-2">
                  <Award size={18} className={getAccentTextClass()} />
                  <span>Certifications & Involvements</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="p-4 rounded-xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 flex items-start space-x-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${getAccentTextClass()}`} />
                      <span className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Skills Section */}
      <section id="skills" className="py-20 relative z-10 border-t border-purple-100 bg-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
              My Tech Stack
            </span>
            <h2 className="text-3xl font-serif text-slate-900 mt-1">
              Skills & Experience
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-2">
              Here are some of the design systems and programming skills I have learned so far:
            </p>
          </div>

          <SkillSection skills={initialSkills} accentClass={getAccentClass()} />

          {/* Tools know grid list */}
          <div className="mt-16 pt-12 border-t border-purple-100/60">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-mono text-purple-600 uppercase tracking-widest font-bold">
                Productivity suite
              </span>
              <h4 className="text-xl font-display font-bold text-slate-800 mt-1">
                Tools I Work With
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {initialTools.map((tool, idx) => {
                const getToolBrand = (name: string) => {
                  switch (name) {
                    case "Figma": return { logoUrl: "https://cdn.simpleicons.org/figma/F24E1E", bg: "bg-[#F24E1E]/10" };
                    case "Photoshop": return { logoUrl: "https://cdn.simpleicons.org/adobephotoshop/31A8FF", bg: "bg-[#31A8FF]/10" };
                    case "Canva": return { logoUrl: "https://cdn.simpleicons.org/canva/00C4CC", bg: "bg-[#00C4CC]/10" };
                    case "VS Code": return { logoUrl: "https://cdn.simpleicons.org/visualstudiocode/007ACC", bg: "bg-[#007ACC]/10" };
                    case "GitHub": return { logoUrl: "https://cdn.simpleicons.org/github/181717", bg: "bg-[#181717]/10" };
                    case "Kaggle": return { logoUrl: "https://cdn.simpleicons.org/kaggle/20BEFF", bg: "bg-[#20BEFF]/10" };
                    case "ChatGPT": return { logoUrl: "https://cdn.simpleicons.org/openai/10A37F", bg: "bg-[#10A37F]/10" };
                    case "Google AI Studio": return { logoUrl: "https://cdn.simpleicons.org/google/4285F4", bg: "bg-[#4285F4]/10" };
                    case "MS Word": return { logoUrl: "https://cdn.simpleicons.org/microsoftword/2B579A", bg: "bg-[#2B579A]/10" };
                    case "MS Excel": return { logoUrl: "https://cdn.simpleicons.org/microsoftexcel/217346", bg: "bg-[#217346]/10" };
                    case "Trello": return { logoUrl: "https://cdn.simpleicons.org/trello/0079BF", bg: "bg-[#0079BF]/10" };
                    case "ClickUp": return { logoUrl: "https://cdn.simpleicons.org/clickup/7B68EE", bg: "bg-[#7B68EE]/10" };
                    case "Jira": return { logoUrl: "https://cdn.simpleicons.org/jira/0052CC", bg: "bg-[#0052CC]/10" };
                    default: return { logoUrl: "https://cdn.simpleicons.org/google/a855f7", bg: "bg-purple-50" };
                  }
                };
                const brand = getToolBrand(tool.name);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="p-5 rounded-xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 text-center flex flex-col items-center justify-between space-y-3 transition-all duration-300 group hover:shadow-[0_12px_32px_rgba(168,85,247,0.08)] shadow-sm"
                  >
                    <div className={`p-3 rounded-xl ${brand.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <img
                        src={brand.logoUrl}
                        alt={tool.name}
                        className="w-6 h-6 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-800 group-hover:text-purple-950 transition-colors">
                        {tool.name}
                      </div>
                      <span className="block text-[10px] tracking-wider font-mono font-bold text-slate-400 uppercase mt-0.5">
                        {tool.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Detailed Initiatives & Initiatives timeline */}
      <section className="py-24 relative z-10 border-t border-purple-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
              Work History
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
              Experience & Initiatives
            </h2>
            <p className="text-sm text-slate-500 font-mono mt-3">
              My progressive journey in UI/UX design, visual engineering, and technical leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Interactive Experience Timeline */}
            <div className="lg:col-span-7 space-y-8 relative border-l-2 border-purple-100/70 pl-6 ml-2 sm:ml-4">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="relative group space-y-3 p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.06)] transition-all duration-300 shadow-sm"
                >
                  {/* Timeline node centered vertically with the padding */}
                  <div className="absolute -left-[35px] top-[30px] h-4.5 w-4.5 rounded-full bg-white border-4 border-purple-600 shadow-sm group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <h4 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 group-hover:text-purple-950 transition-colors">
                        {exp.role}
                      </h4>
                      <p className={`text-xs sm:text-sm font-mono font-bold ${getAccentTextClass()}`}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 py-1.5 px-3.5 rounded-full border border-purple-100 w-fit mt-1.5 sm:mt-0 shadow-sm">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <ul className="space-y-2 pt-2 border-t border-purple-50">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start space-x-2">
                        <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${getAccentBgClass()}`} />
                        <span className="text-slate-650">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Key Professional Stats / Interactive Creed Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Interactive Profile status card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 shadow-md space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-serif text-lg font-bold shadow-md">
                      AMP
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white h-4.5 w-4.5 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-slate-800 text-base sm:text-lg">Abir Mahmud Pritam</h4>
                    <p className="text-[10px] sm:text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider">AVAILABLE FOR PROJECTS & DESIGN GIGS</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  "I specialize in constructing pixel-perfect design solutions and converting complex UI layouts into responsive, accessible codebases."
                </p>

                {/* Professional Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-purple-100/30 border border-purple-200/50 text-center hover:bg-purple-100/50 hover:shadow-sm transition-all">
                    <span className="block text-2xl font-display font-extrabold text-purple-700">37+</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">PROJECTS INKED</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-100/30 border border-purple-200/50 text-center hover:bg-purple-100/50 hover:shadow-sm transition-all">
                    <span className="block text-2xl font-display font-extrabold text-purple-700">98%</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">SATISFACTION</span>
                  </div>
                </div>

                {/* Interactive Download Resume Button */}
                <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "#"; 
                    alert("Resume Download initialized! Preparing PDF packet of Abir's visual designs and academic achievements...");
                  }}
                  className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-purple-500/10 flex items-center justify-center space-x-2.5 cursor-pointer font-mono"
                >
                  <Download size={16} />
                  <span>Download Professional CV</span>
                </motion.button>
              </div>

              {/* My Professional Creed */}
              <div className="p-6 sm:p-7 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 shadow-md space-y-4">
                <h5 className="font-display font-extrabold text-slate-800 text-sm sm:text-base tracking-wide uppercase flex items-center space-x-2.5 border-b border-purple-100/50 pb-2.5">
                  <Sparkles size={16} className="text-purple-600 animate-pulse" />
                  <span>My Design Manifesto</span>
                </h5>
                <div className="space-y-4 pt-1.5">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5 shrink-0">
                      <Palette size={15} />
                    </div>
                    <div>
                      <h6 className="text-xs sm:text-sm font-mono font-extrabold text-slate-700">01. Pixel-Perfect Integrity</h6>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
                        Every spacing token, typographic scale, and visual border is placed with strict mathematical precision and aesthetic focus.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5 shrink-0">
                      <Code2 size={15} />
                    </div>
                    <div>
                      <h6 className="text-xs sm:text-sm font-mono font-extrabold text-slate-700">02. Design-to-Code Symmetry</h6>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
                        Fusing user-centered wireframes directly into robust, semantic TypeScript code, bypassing boundaries between disciplines.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5 shrink-0">
                      <Brain size={15} />
                    </div>
                    <div>
                      <h6 className="text-xs sm:text-sm font-mono font-extrabold text-slate-700">03. Lifelong Cognitive Growth</h6>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
                        Evolving constantly with cutting-edge front-end animations, interactive state engines, and machine learning structures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Projects Grid Bento Layout */}
      <section id="projects" className="py-20 relative z-10 border-t border-purple-100 bg-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
                What I've Done
              </span>
              <h2 className="text-3xl font-serif text-slate-900 mt-1">
                My Projects
              </h2>
            </div>

            {/* Category Filters bar */}
            <div className="flex flex-nowrap items-center gap-1 p-1 bg-white/70 backdrop-blur-md rounded-xl border border-purple-100 max-w-full overflow-x-auto scrollbar-none shadow-sm select-none">
              {["All", "Web", "Mobile", "AI/ML", "Design"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? `${getAccentBgClass()} text-white shadow-sm`
                      : "text-slate-500 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} accentClass={getAccentClass()} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 relative z-10 border-t border-purple-100 bg-purple-50/10 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
                Academic Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
                Research & Publications
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-mono mt-3">
                Scholarly papers and review articles reflecting deep exploration in medical AI, deep learning, and DSP.
              </p>
            </div>

            {/* Publication Type Filter bar */}
            <div className="flex flex-nowrap items-center gap-1 p-1 bg-white/70 backdrop-blur-md rounded-xl border border-purple-100 max-w-full overflow-x-auto scrollbar-none shadow-sm select-none">
              {["All", "Conference", "Review Paper", "Journal"].map((pubType) => (
                <button
                  key={pubType}
                  onClick={() => setSelectedPubType(pubType)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedPubType === pubType
                      ? `${getAccentBgClass()} text-white shadow-sm`
                      : "text-slate-500 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  {pubType}
                </button>
              ))}
            </div>
          </div>

          {/* Publications List */}
          <div className="space-y-6">
            {filteredPublications.map((pub) => {
              const isExpanded = expandedPubId === pub.id;
              return (
                <motion.div
                  key={pub.id}
                  whileHover={{ y: -4, scale: 1.008 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-6 md:p-8 rounded-2xl border border-purple-200/50 bg-purple-100/40 backdrop-blur-md hover:bg-purple-100/60 hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(168,85,247,0.06)] transition-all duration-300 shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      
                      {/* Publication Type Badge and Year */}
                      <div className="flex items-center space-x-3 text-xs sm:text-sm">
                        <span className={`px-3 py-1 rounded-full font-bold text-xs uppercase font-mono tracking-wider ${
                          pub.type === "Journal" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                            : pub.type === "Review Paper" 
                            ? "bg-amber-50 text-amber-700 border border-amber-200" 
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {pub.type}
                        </span>
                        <span className="text-slate-400 font-mono font-bold text-sm">{pub.year}</span>
                      </div>

                      {/* Paper Title */}
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-snug hover:text-purple-700 transition-colors">
                        {pub.title}
                      </h3>

                      {/* Authors List (Highlighting Abir Mahmud Pritam) */}
                      <div className="text-sm sm:text-base text-slate-600 font-display">
                        {pub.authors.split(", ").map((author, index, arr) => {
                          const isMe = author.includes("Abir Mahmud Pritam");
                          return (
                            <React.Fragment key={index}>
                              <span className={isMe ? "font-extrabold text-purple-700" : "text-slate-600"}>
                                {author}
                              </span>
                              {index < arr.length - 1 ? ", " : ""}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Venue / Journal Name */}
                      <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
                        {pub.journalOrConference}
                      </p>

                      {/* Toggleable Abstract */}
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedPubId(isExpanded ? null : pub.id)}
                          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-mono font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Abstract" : "View Abstract"}</span>
                          <ChevronRight size={14} className={`transform transition-transform duration-300 ${isExpanded ? "rotate-90 text-purple-800" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 sm:p-5 rounded-xl bg-purple-50/40 border border-purple-100/60 text-sm sm:text-base leading-relaxed text-slate-600">
                                <span className="font-mono font-bold block text-purple-800 text-[11px] uppercase tracking-wider mb-2">Abstract:</span>
                                {pub.abstract}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Paper Tags */}
                      {pub.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {pub.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-150 text-[11px] font-mono text-slate-500 font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Paper Actions / Links */}
                    <div className="flex flex-row md:flex-col items-center gap-3 shrink-0 md:self-start w-full md:w-48">
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-purple-100 bg-white hover:border-purple-300 text-xs sm:text-sm font-mono font-bold text-slate-700 hover:text-purple-700 shadow-sm transition-all cursor-pointer w-full justify-center"
                        >
                          <ExternalLink size={14} className={getAccentTextClass()} />
                          <span>View Publisher</span>
                        </a>
                      )}
                      
                      {pub.doi && (
                        <div className="text-[11px] font-mono text-slate-400 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg text-center select-all w-full leading-normal">
                          <span className="text-slate-500 font-bold">DOI:</span> {pub.doi}
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 relative z-10 border-t border-purple-100 bg-white/40 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
              My Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
              Latest Blog Articles
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-mono mt-3">
              Deep-dives into graphic design, UI/UX philosophy, and computer science logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-2xl border border-purple-200/50 bg-purple-100/40 backdrop-blur-md hover:bg-purple-100/60 hover:border-purple-300 hover:shadow-[0_12px_32px_rgba(168,85,247,0.06)] transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-md p-6"
              >
                <div className="space-y-3">
                  {/* Category & Metadata */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 font-bold">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2.5 font-bold">
                      <span className="flex items-center space-x-1">
                        <Calendar size={11} className="text-slate-400" />
                        <span>{post.date}</span>
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-slate-900 tracking-tight group-hover:text-purple-700 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 font-sans">
                    {post.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="mt-6 inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer w-fit self-start"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch / Contact Section */}
      <section id="contact" className="py-24 relative z-10 border-t border-purple-100/50 bg-white/30 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest ${getAccentTextClass()}`}>
              Let's Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2">
              Get In Touch
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-mono mt-3">
              Interested in working together? We should schedule a time to chat. I'll bring the coffee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Left Column: Contact and Social Channels */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 space-y-4 shadow-md flex-1 flex flex-col justify-center"
              >
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-800">Contact Channels</h4>
                <div className="space-y-4 font-mono text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center space-x-3.5 font-bold">
                    <Phone size={16} className={getAccentTextClass()} />
                    <span>+880 1718-169072</span>
                  </div>
                  <div className="flex items-center space-x-3.5 font-bold">
                    <Mail size={16} className={getAccentTextClass()} />
                    <span>abirmahmudpritam001@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3.5 font-bold">
                    <MapPin size={16} className={getAccentTextClass()} />
                    <span>Rajshahi, Bangladesh</span>
                  </div>
                </div>
              </motion.div>

              {/* Instant Social Channels */}
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 space-y-4 shadow-md"
              >
                <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">Find me on social media</h5>
                <div className="flex items-center space-x-3 pt-1">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="Facebook">
                    <Facebook size={18} className="text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="Instagram">
                    <Instagram size={18} className="text-white" />
                  </a>
                  <a href="https://linkedin.com/in/abirmahmudpritam" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="LinkedIn">
                    <Linkedin size={18} className="text-white" />
                  </a>
                  <a href="https://github.com/abirmahmudpritam" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md hover:shadow-purple-200" title="GitHub">
                    <Github size={18} className="text-white" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Contact Form panel */}
            <div className="lg:col-span-7">
              <motion.form
                onSubmit={handleContactSubmit}
                whileHover={{ y: -2 }}
                className="p-6 sm:p-8 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 space-y-5 h-full flex flex-col justify-between shadow-md"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-purple-600 font-extrabold uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Abir"
                      className="w-full bg-purple-50/50 border border-purple-100 focus:bg-white focus:border-purple-300 rounded-xl p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all font-mono"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-purple-600 font-extrabold uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-purple-50/50 border border-purple-100 focus:bg-white focus:border-purple-300 rounded-xl p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-purple-600 font-extrabold uppercase">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Pitch"
                    className="w-full bg-purple-50/50 border border-purple-100 focus:bg-white focus:border-purple-300 rounded-xl p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-purple-600 font-extrabold uppercase">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your design or software requirements..."
                    className="w-full bg-purple-50/50 border border-purple-100 focus:bg-white focus:border-purple-300 rounded-xl p-3.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all leading-relaxed"
                  />
                </div>

                {formSubmitted && (
                  <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs sm:text-sm text-green-700 font-mono font-bold flex items-center space-x-2 shadow-sm animate-pulse">
                    <CheckCircle2 size={15} />
                    <span>Message received! Thank you for reaching out, I'll reply soon.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all shadow-md flex items-center justify-center space-x-2.5 cursor-pointer ${getAccentBgClass()}`}
                >
                  <Mail size={18} />
                  <span>Send Message</span>
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer block */}
      <footer className="border-t border-purple-100 bg-purple-50/50 py-8 relative z-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleNavigateSection("home")}
              className="text-slate-600 hover:text-purple-600 font-mono font-bold cursor-pointer"
            >
              Back to Top
            </button>
          </div>

          <p className="font-mono text-[10px] text-slate-500 leading-relaxed">
            © 2026 | Abir Mahmud Pritam. All rights reserved. Created as an interactive professional developer portfolio.
          </p>
        </div>
      </footer>

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-purple-200 bg-purple-50/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl space-y-6 text-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header details */}
              <div className="space-y-3">
                <div className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 font-bold">
                  {selectedPost.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-snug">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center space-x-4 text-xs sm:text-sm font-mono text-slate-500">
                  <span className="flex items-center space-x-1.5">
                    <Calendar size={14} className="text-purple-600" />
                    <span>{selectedPost.date}</span>
                  </span>
                  <span className="text-purple-100">|</span>
                  <span className="flex items-center space-x-1.5">
                    <Clock size={14} className="text-purple-600" />
                    <span>{selectedPost.readTime}</span>
                  </span>
                </div>
              </div>

              <hr className="border-purple-100" />

              {/* Content text */}
              <div className="text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-wrap font-sans font-normal">
                {selectedPost.content}
              </div>

              {/* Footer buttons */}
              <div className="pt-4 border-t border-purple-100 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-white transition-colors cursor-pointer ${getAccentBgClass()}`}
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
