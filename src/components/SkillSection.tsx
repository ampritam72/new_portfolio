import React from "react";
import {
  Palette,
  Terminal,
  Database,
} from "lucide-react";
import { motion } from "motion/react";
import { Skill } from "../types";

interface SkillSectionProps {
  skills: Skill[];
  accentClass: string;
}

// Maps each skill to its corresponding brand color, Simple Icons logo URL, and background style
const getBrandColorAndIcon = (name: string) => {
  switch (name) {
    case "HTML":
      return { logoUrl: "https://cdn.simpleicons.org/html5/E34F26", bgClass: "bg-[#E34F26]/10" };
    case "CSS":
      return { logoUrl: "https://cdn.simpleicons.org/css3/1572B6", bgClass: "bg-[#1572B6]/10" };
    case "JavaScript / React":
      return { logoUrl: "https://cdn.simpleicons.org/react/61DAFB", bgClass: "bg-[#61DAFB]/10" };
    case "Vite & Tailwind":
      return { logoUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4", bgClass: "bg-[#06B6D4]/10" };
    case "Python":
      return { logoUrl: "https://cdn.simpleicons.org/python/3776AB", bgClass: "bg-[#3776AB]/10" };
    case "C / C++":
      return { logoUrl: "https://cdn.simpleicons.org/cplusplus/00599C", bgClass: "bg-[#00599C]/10" };
    case "Java":
      return { logoUrl: "https://cdn.simpleicons.org/oracle/F8981D", bgClass: "bg-[#F8981D]/10" };
    case "SQL Database":
      return { logoUrl: "https://cdn.simpleicons.org/postgresql/4169E1", bgClass: "bg-[#4169E1]/10" };
    case "Matlab":
      return { logoUrl: "https://cdn.simpleicons.org/mathworks/D91414", bgClass: "bg-[#D91414]/10" };
    case "Figma UI/UX":
      return { logoUrl: "https://cdn.simpleicons.org/figma/F24E1E", bgClass: "bg-[#F24E1E]/10" };
    case "Photoshop & Canva":
      return { logoUrl: "https://cdn.simpleicons.org/adobephotoshop/31A8FF", bgClass: "bg-[#31A8FF]/10" };
    case "FlutterFlow":
      return { logoUrl: "https://cdn.simpleicons.org/flutter/02569B", bgClass: "bg-[#02569B]/10" };
    default:
      return { logoUrl: "https://cdn.simpleicons.org/google/a855f7", bgClass: "bg-purple-50" };
  }
};

export default function SkillSection({ skills, accentClass }: SkillSectionProps) {
  return (
    <div className="space-y-12">
      {/* Skill Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const brand = getBrandColorAndIcon(skill.name);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.08)] transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center justify-between mb-4.5">
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl ${brand.bgClass} flex items-center justify-center transition-all duration-300`}>
                    <img
                      src={brand.logoUrl}
                      alt={skill.name}
                      className="w-5 h-5 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-display font-bold text-base text-slate-800 group-hover:text-purple-950 transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono text-sm font-extrabold text-slate-500 group-hover:text-purple-600 transition-colors">
                  {skill.percentage}%
                </span>
              </div>

              {/* Custom Track and Progress slider bar */}
              <div className="h-2 w-full bg-purple-50/75 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Structured categorizations (matches PDF bottom section in high design standard) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-purple-100/60">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-md transition-all duration-300 space-y-3 shadow-sm"
        >
          <div className="flex items-center space-x-2.5 text-slate-800">
            <Palette size={18} className="text-purple-500 animate-pulse" />
            <h5 className="font-display font-bold text-base text-slate-800">Design to Code</h5>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Fusing creative UI/UX wireframes with native semantic HTML, Tailwind, and React implementations. Pixel-perfect visuals with fluid structures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-md transition-all duration-300 space-y-3 shadow-sm"
        >
          <div className="flex items-center space-x-2.5 text-slate-800">
            <Terminal size={18} className="text-purple-500 animate-pulse" />
            <h5 className="font-display font-bold text-base text-slate-800">Programming Logic</h5>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Strong foundational structures in C, C++, and Python. Structuring neural models, signal processing algorithms, and backends with robust performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/60 hover:shadow-md transition-all duration-300 space-y-3 shadow-sm"
        >
          <div className="flex items-center space-x-2.5 text-slate-800">
            <Database size={18} className="text-purple-500 animate-pulse" />
            <h5 className="font-display font-bold text-base text-slate-800">Data Practice</h5>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Advanced database manipulation through structured SQL, Java app pipelines, and Matlab simulations for modeling technical and business data.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
