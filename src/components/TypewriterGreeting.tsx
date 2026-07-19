import React, { useState, useEffect } from "react";

interface TypewriterGreetingProps {
  className?: string;
  isMobile?: boolean;
}

export function TypewriterGreeting({ className = "", isMobile = false }: TypewriterGreetingProps) {
  const prefix = "Hello, I'm ";
  const nameText = "Abir Mahmud Pritam";
  
  const [prefixDisplayText, setPrefixDisplayText] = useState("");
  const [nameDisplayText, setNameDisplayText] = useState("");
  const [phase, setPhase] = useState<"typingPrefix" | "typingName" | "paused" | "deletingName">("typingPrefix");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (phase === "typingPrefix") {
      if (prefixDisplayText.length < prefix.length) {
        timer = setTimeout(() => {
          setPrefixDisplayText(prefix.substring(0, prefixDisplayText.length + 1));
        }, 80);
      } else {
        setPhase("typingName");
      }
    } else if (phase === "typingName") {
      if (nameDisplayText.length < nameText.length) {
        timer = setTimeout(() => {
          setNameDisplayText(nameText.substring(0, nameDisplayText.length + 1));
        }, 100);
      } else {
        setPhase("paused");
      }
    } else if (phase === "paused") {
      timer = setTimeout(() => {
        setPhase("deletingName");
      }, 5000); // Pause for 5 seconds before repeating
    } else if (phase === "deletingName") {
      if (nameDisplayText.length > 0) {
        timer = setTimeout(() => {
          setNameDisplayText(nameDisplayText.substring(0, nameDisplayText.length - 1));
        }, 40);
      } else {
        setPhase("typingName");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, prefixDisplayText, nameDisplayText]);

  return (
    <h1 
      className={`${
        isMobile 
          ? "text-3xl sm:text-4xl font-extrabold" 
          : "text-4xl lg:text-5xl xl:text-6xl font-black"
      } font-display text-slate-900 tracking-tight leading-tight ${className}`}
    >
      <span className="text-slate-800">
        {prefixDisplayText}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 drop-shadow-sm inline-block">
        {nameDisplayText}
      </span>
      <span className="inline-block w-[3px] h-[0.8em] bg-purple-600 ml-1.5 translate-y-[0.05em] animate-[pulse_0.8s_infinite] rounded shadow-sm shadow-purple-500/50" />
    </h1>
  );
}
