import React from "react";
import { ExternalLink, Github, Code2, Cpu, Smartphone, Palette, Box } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  accentClass: string;
  key?: string;
}

export default function ProjectCard({ project, accentClass }: ProjectCardProps) {
  // Returns matching visual representation vector based on category
  const renderMockVisual = () => {
    switch (project.category) {
      case "AI/ML":
        return (
          <div className="h-44 w-full bg-gradient-to-br from-purple-100 to-indigo-50 relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[11px] text-purple-700 border-b border-purple-100">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-60" />
            
            {/* Neural net grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-35 text-purple-400" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="currentColor" strokeWidth="1" />
              <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="currentColor" strokeWidth="1" />
              <line x1="40%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" />
              <circle cx="10%" cy="20%" r="4" fill="currentColor" />
              <circle cx="40%" cy="50%" r="5" fill="currentColor" />
              <circle cx="80%" cy="30%" r="4" fill="currentColor" />
              <circle cx="50%" cy="80%" r="4" fill="currentColor" />
            </svg>

            <div className="flex justify-between items-start z-10">
              <span className="px-2.5 py-1 rounded bg-white/80 border border-purple-200 uppercase tracking-widest text-[9px] font-bold text-purple-800">
                NEURAL NETWORK LOG
              </span>
              <Cpu size={15} className="text-purple-600" />
            </div>

            <div className="bg-white/80 p-3 rounded-lg border border-purple-200 shadow-sm z-10">
              <span className="text-purple-400 font-bold">// training model pipeline...</span>
              <div className="flex items-center space-x-2 mt-1.5">
                <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-slate-800 font-bold text-xs">Epoch 72/100 | Val_Acc: 94.62%</span>
              </div>
            </div>
          </div>
        );

      case "Mobile":
        return (
          <div className="h-44 w-full bg-gradient-to-br from-purple-100 to-pink-50 relative overflow-hidden flex items-center justify-center p-4 border-b border-purple-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent opacity-60" />
            
            {/* Styled smartphone mock container */}
            <div className="w-24 h-36 border-2 border-slate-800 rounded-2xl bg-slate-900 relative shadow-lg flex flex-col p-1.5 overflow-hidden">
              <div className="w-10 h-2 bg-white/20 rounded-full mx-auto mb-1.5" />
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg p-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-4 bg-purple-200 rounded" />
                  <Smartphone size={8} className="text-purple-600" />
                </div>
                
                <div className="space-y-1 my-2">
                  <div className="h-1 w-full bg-purple-100 rounded" />
                  <div className="h-1 w-5/6 bg-purple-100 rounded" />
                  <div className="h-1.5 w-1/2 bg-purple-600 rounded mt-1" />
                </div>

                <div className="h-3.5 w-full bg-purple-600/10 rounded-md flex items-center justify-center border border-purple-200">
                  <span className="text-[5px] text-purple-700 font-mono font-bold">RentNow</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Design":
        return (
          <div className="h-44 w-full bg-gradient-to-br from-fuchsia-100 to-pink-100 relative overflow-hidden flex flex-col justify-between p-4 border-b border-purple-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500/15 via-transparent to-transparent opacity-60" />
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded bg-white/80 border border-fuchsia-200 text-fuchsia-800 uppercase tracking-widest text-[9px] font-mono font-bold">
                VECTOR BRANDING
              </span>
              <Palette size={15} className="text-fuchsia-600" />
            </div>

            {/* Figma/Photoshop vector curves simulation */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="w-24 h-12 border border-dashed border-fuchsia-400 rounded-full rotate-12 relative flex items-center justify-center">
                <div className="absolute top-0 left-0 w-2 h-2 bg-fuchsia-500 rounded-sm" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-fuchsia-500 rounded-sm" />
                <div className="text-xs font-mono font-bold text-fuchsia-900 tracking-widest uppercase">CREATIVE</div>
              </div>
            </div>
          </div>
        );

      default: // Web
        return (
          <div className="h-44 w-full bg-gradient-to-br from-indigo-50 to-purple-100 relative overflow-hidden flex flex-col justify-between p-3 font-mono text-[11px] text-slate-700 border-b border-purple-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-60" />
            <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <Code2 size={14} className="text-purple-600" />
            </div>

            <div className="flex-1 py-2.5 space-y-1.5 text-[10px] leading-relaxed select-none">
              <div><span className="text-purple-700 font-bold">import</span> React <span className="text-purple-700 font-bold">from</span> <span className="text-indigo-600 font-bold">"react"</span>;</div>
              <div><span className="text-blue-700 font-bold">const</span> <span className="text-purple-800 font-bold">AcademicX</span> = () =&gt; &#123;</div>
              <div className="pl-3"><span className="text-purple-700 font-bold">return</span> &lt;<span className="text-blue-700 font-bold">div</span> <span className="text-purple-800 font-bold">className</span>=<span className="text-indigo-600 font-bold">"student"</span>&gt;;</div>
              <div>&#125;;</div>
            </div>

            <div className="flex items-center space-x-1 text-[9px] tracking-wider text-slate-400 uppercase border-t border-purple-200/60 pt-1.5 font-bold">
              <span>Vite React Render Host</span>
            </div>
          </div>
        );
    }
  };

  const getAccentHover = () => {
    switch (accentClass) {
      case "cyan": return "hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(6,182,212,0.1)]";
      case "emerald": return "hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(16,185,129,0.1)]";
      case "orange": return "hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(249,115,22,0.1)]";
      default: return "hover:border-purple-300 hover:shadow-[0_16px_40px_rgba(168,85,247,0.1)]";
    }
  };

  const getAccentText = () => {
    switch (accentClass) {
      case "cyan": return "text-cyan-600";
      case "emerald": return "text-emerald-600";
      case "orange": return "text-orange-600";
      default: return "text-purple-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`group bg-purple-100/40 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-200/50 hover:bg-purple-100/60 transition-all duration-300 flex flex-col h-full shadow-md ${getAccentHover()}`}
    >
      {/* Mock visuals */}
      <div className="relative overflow-hidden shrink-0">
        {renderMockVisual()}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-purple-600/90 border border-purple-400 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
          {project.category}
        </div>
      </div>

      {/* Details info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-purple-950 transition-colors">
            {project.title}
          </h4>
          {project.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-mono font-bold mt-1">{project.subtitle}</p>
          )}
          <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed font-sans">{project.description}</p>
        </div>

        {/* Tech Badges & Actions */}
        <div className="mt-6 space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple-50/70 border border-purple-100/60 text-purple-700 font-bold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 pt-2 border-t border-purple-100">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg bg-purple-50 hover:bg-purple-100/80 text-xs sm:text-sm font-mono font-bold flex items-center justify-center space-x-1.5 border border-purple-100 text-slate-700 hover:text-purple-700 transition-all cursor-pointer"
              >
                <ExternalLink size={14} className={getAccentText()} />
                <span>Visit Live</span>
              </a>
            )}
            
            <a
              href={project.github || `https://github.com/abirmahmudpritam/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-lg bg-purple-50 hover:bg-purple-100/80 text-slate-500 hover:text-purple-700 transition-all border border-purple-100 cursor-pointer"
              title="View Repository"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
