import React, { useState, useEffect } from "react";

interface LineConfig {
  raw: string;
  render: (len: number) => React.ReactNode;
}

export function TypewriterCode() {
  const lines: LineConfig[] = [
    {
      raw: "const developer = {",
      render: (len) => {
        const text = "const developer = {".substring(0, len);
        if (len <= 5) {
          return <span className="text-purple-600 font-bold">{text}</span>;
        }
        return (
          <>
            <span className="text-purple-600 font-bold">const</span>
            <span className="text-slate-800">{text.substring(5)}</span>
          </>
        );
      },
    },
    {
      raw: '  name: "Abir Mahmud Pritam",',
      render: (len) => {
        const text = '  name: "Abir Mahmud Pritam",'.substring(0, len);
        if (len <= 8) {
          return <span className="text-slate-800">{text}</span>;
        }
        return (
          <>
            <span className="text-slate-800">  name: </span>
            <span className="text-indigo-600 font-medium">{text.substring(8)}</span>
          </>
        );
      },
    },
    {
      raw: '  role: "Graphic & UI/UX",',
      render: (len) => {
        const text = '  role: "Graphic & UI/UX",'.substring(0, len);
        if (len <= 8) {
          return <span className="text-slate-800">{text}</span>;
        }
        return (
          <>
            <span className="text-slate-800">  role: </span>
            <span className="text-indigo-600 font-medium">{text.substring(8)}</span>
          </>
        );
      },
    },
    {
      raw: '  skills: ["React", "Vite", "Python", "Figma"],',
      render: (len) => {
        const text = '  skills: ["React", "Vite", "Python", "Figma"],'.substring(0, len);
        if (len <= 11) {
          return <span className="text-slate-800">{text}</span>;
        }
        return (
          <>
            <span className="text-slate-800">  skills: [</span>
            {len > 11 && (
              <span className="text-pink-600 font-medium">
                {"\"React\"".substring(0, Math.max(0, len - 11))}
              </span>
            )}
            {len > 18 && <span className="text-slate-800">, </span>}
            {len > 20 && (
              <span className="text-pink-600 font-medium">
                {"\"Vite\"".substring(0, Math.max(0, len - 20))}
              </span>
            )}
            {len > 26 && <span className="text-slate-800">, </span>}
            {len > 28 && (
              <span className="text-pink-600 font-medium">
                {"\"Python\"".substring(0, Math.max(0, len - 28))}
              </span>
            )}
            {len > 36 && <span className="text-slate-800">, </span>}
            {len > 38 && (
              <span className="text-pink-600 font-medium">
                {"\"Figma\"".substring(0, Math.max(0, len - 38))}
              </span>
            )}
            {len >= 45 && <span className="text-slate-800">]</span>}
            {len >= 46 && <span className="text-slate-800">,</span>}
          </>
        );
      },
    },
    {
      raw: '  focus: "modern interactive interfaces"',
      render: (len) => {
        const text = '  focus: "modern interactive interfaces"'.substring(0, len);
        if (len <= 9) {
          return <span className="text-slate-800">{text}</span>;
        }
        return (
          <>
            <span className="text-slate-800">  focus: </span>
            <span className="text-indigo-600 font-medium">{text.substring(9)}</span>
          </>
        );
      },
    },
    {
      raw: "};",
      render: (len) => {
        return <span className="text-slate-800">{"};".substring(0, len)}</span>;
      },
    },
  ];

  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      // Pause when finished, then reset to type again continuously!
      const timer = setTimeout(() => {
        setActiveLineIdx(0);
        setCharCount(0);
        setTypedLines([]);
        setIsDone(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const currentLine = lines[activeLineIdx];
    const typingInterval = setInterval(() => {
      if (charCount < currentLine.raw.length) {
        setCharCount((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        // Completed the active line, transition to next
        if (activeLineIdx < lines.length - 1) {
          setTypedLines((prev) => [...prev, currentLine.raw]);
          setActiveLineIdx((prev) => prev + 1);
          setCharCount(0);
        } else {
          setIsDone(true);
        }
      }
    }, 45); // highly responsive typing speed

    return () => clearInterval(typingInterval);
  }, [activeLineIdx, charCount, isDone]);

  return (
    <div className="bg-white/90 border border-purple-150 rounded-2xl p-5 font-mono text-xs sm:text-sm text-slate-700 shadow-[0_16px_40px_rgba(168,85,247,0.06)] max-w-xl backdrop-blur-md relative overflow-hidden group">
      {/* Decorative window header */}
      <div className="flex items-center justify-between border-b border-purple-100/50 pb-3 mb-4 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm shadow-red-400/25" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-sm shadow-yellow-400/25" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-sm shadow-emerald-400/25" />
        </div>
        <div className="flex items-center space-x-1.5 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100/40">
          <span className="text-[10px] text-purple-600 font-extrabold uppercase tracking-wide">portfolio.js</span>
        </div>
      </div>

      {/* Code Area */}
      <div className="space-y-2 select-all leading-relaxed relative min-h-[140px] sm:min-h-[160px]">
        {/* Render completed lines */}
        {typedLines.map((line, idx) => (
          <div key={idx} className="flex items-center">
            <span className="w-6 text-slate-300 text-right pr-2 text-[10px] select-none font-bold">
              {idx + 1}
            </span>
            <div className="flex-1">{lines[idx].render(line.length)}</div>
          </div>
        ))}

        {/* Render active line with blinking cursor */}
        {!isDone && activeLineIdx < lines.length && (
          <div className="flex items-center">
            <span className="w-6 text-slate-300 text-right pr-2 text-[10px] select-none font-bold">
              {activeLineIdx + 1}
            </span>
            <div className="flex-1 flex items-center">
              {lines[activeLineIdx].render(charCount)}
              <span className="inline-block w-1.5 h-4 bg-purple-600 ml-0.5 animate-[pulse_0.8s_infinite] rounded-sm shadow-sm shadow-purple-500/50" />
            </div>
          </div>
        )}

        {/* Render rest of the code in ghost state */}
        {lines.map((line, idx) => {
          if (idx > activeLineIdx) {
            return (
              <div key={idx} className="flex items-center opacity-15">
                <span className="w-6 text-slate-300 text-right pr-2 text-[10px] select-none font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1 text-slate-400">{line.raw}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Completed status indicator */}
        {isDone && (
          <div className="absolute bottom-1 right-2 flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/50 text-[10px] font-bold tracking-wide uppercase select-none animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Compiled Successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}
