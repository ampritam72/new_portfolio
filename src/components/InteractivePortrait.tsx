import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Camera, Sparkles, Code2, Cpu, User, Palette, Layers, Terminal } from "lucide-react";

interface InteractivePortraitProps {
  portraitImage: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InteractivePortrait({ portraitImage, onImageUpload }: InteractivePortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values for 3D parallax tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring configuration for elegant mouse movement response
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 18 });

  // Floating background layers translation based on mouse moves (parallax effect!)
  const bgTranslateX = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 120, damping: 25 });
  const bgTranslateY = useSpring(useTransform(y, [-0.5, 0.5], [-20, 20]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Entrance animations when website loads
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 90, 
        damping: 15,
        duration: 0.8
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative select-none flex items-center justify-center py-10 px-4 md:px-0"
    >
      {/* 1. Backdrop Glow System & Design Layers behind the portrait */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Pulsating colorful gradient glow */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[125%] h-[125%] rounded-full bg-gradient-to-tr from-purple-500/20 via-indigo-500/10 to-pink-500/20 blur-[100px]" 
        />
        
        {/* Soft abstract graphic background mesh design */}
        <motion.div 
          style={{ x: bgTranslateX, y: bgTranslateY }}
          className="absolute w-[95%] h-[95%] rounded-full bg-indigo-500/5 border border-dashed border-indigo-500/10 scale-[1.05]" 
        />
      </div>

      {/* 2. Layered Abstract Shapes Floating behind the Portrait */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-500/20 blur-xl z-0"
      />
      
      <motion.div
        animate={{
          y: [12, -12, 12],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-2xl z-0"
      />

      {/* 3. The Modern Frame-free 3D Parallax Portrait card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        variants={itemVariants}
        className="relative z-10 w-[20rem] sm:w-[24rem] h-[23rem] sm:h-[27rem] flex items-center justify-center cursor-pointer"
      >
        {/* Ultra-slim, elegant gradient ring and high-end drop shadow (NO thick vintage white frame) */}
        <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500/30 via-purple-500/5 to-indigo-500/25 shadow-[0_24px_60px_rgba(168,85,247,0.14)] z-20 pointer-events-none" />

        {/* The main picture container with sleek borderless design */}
        <div className="w-full h-full rounded-3xl bg-gradient-to-b from-slate-50/80 via-white/95 to-slate-50/90 overflow-hidden relative z-10">
          
          {/* Decorative design layers directly behind his picture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] z-0" />
          
          {/* Subtle gradient light cast */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl z-0" />

          {portraitImage ? (
            <div className="w-full h-full relative group/img z-10">
              {/* Image itself */}
              <img
                src={portraitImage}
                alt="Abir Mahmud Pritam"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover/img:scale-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated dark gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Interactive Upload trigger hover action overlay */}
              <label className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 cursor-pointer z-40">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="p-4 rounded-full bg-white/10 border border-white/20 mb-2 shadow-lg"
                >
                  <Camera size={22} className="text-white" />
                </motion.div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase">Change Portrait</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            // High fidelity modern fallback if no picture is available
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 pt-10 z-20">
              <div className="relative group/avatar">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-75 blur-md group-hover/avatar:opacity-100 transition-opacity animate-pulse" />
                <div className="p-4 rounded-full bg-white border border-purple-100 relative shadow-sm">
                  <User size={50} className="text-purple-600" />
                  <Sparkles size={16} className="absolute top-1.5 right-1.5 text-yellow-500 animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="font-display font-extrabold text-slate-800 text-sm sm:text-base">Creative Profile Portrait</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-1.5 max-w-[180px] leading-relaxed mx-auto">
                  Click below to load your portrait. It will render beautifully without outdated borders!
                </p>
              </div>

              <label className="cursor-pointer py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105">
                <Camera size={13} />
                <span>Upload Portrait</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* 4. Elegant Interactive Floating Tech Badge (Figma / React / Python) */}
        <motion.div 
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-4 left-6 z-40 py-2.5 px-4 rounded-full bg-white border border-purple-150 text-xs font-mono font-extrabold text-purple-700 shadow-lg flex items-center space-x-2 hover:scale-[1.03] transition-all select-none"
        >
          <Code2 size={13} className="text-purple-600 animate-pulse" />
          <span className="tracking-wide text-[11px]">Figma / React / Python</span>
        </motion.div>

        {/* Micro system engineering design coordinates tag */}
        <div className="absolute -bottom-4 right-6 z-40 font-mono text-[9px] text-slate-500 select-none bg-white px-3 py-1.5 rounded-xl border border-purple-100 shadow-md">
          SYS_ACTIVE: Borderless_3D
        </div>
      </motion.div>

      {/* 5. Mini Interactive Floating Tech Badgets orbiting around portrait */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [-3, 3, -3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 -left-6 z-30 hidden sm:flex items-center space-x-1.5 bg-white/95 border border-purple-100 px-3 py-1.5 rounded-2xl shadow-md text-[10px] font-mono text-purple-700 font-bold"
      >
        <Terminal size={11} className="text-purple-500" />
        <span>Full-Stack</span>
      </motion.div>

      <motion.div
        animate={{
          y: [8, -8, 8],
          x: [3, -3, 3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-16 -right-10 z-30 hidden sm:flex items-center space-x-1.5 bg-white/95 border border-indigo-100 px-3 py-1.5 rounded-2xl shadow-md text-[10px] font-mono text-indigo-700 font-bold"
      >
        <Layers size={11} className="text-indigo-500" />
        <span>UI/UX Design</span>
      </motion.div>
    </motion.div>
  );
}
