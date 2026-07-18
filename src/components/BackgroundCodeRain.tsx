import React, { useEffect, useRef } from "react";

export function BackgroundCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Characters list: alphanumeric and developer-centric tokens
    const charList = "0101<>{}[]constReactVitePythonFigmaimportfunctionreturnCSS$=_=>".split("");
    const fontSize = 12;
    let columns = Math.floor(width / fontSize);

    // Track the vertical coordinate (y-position) of each rain column
    let drops: number[] = Array(columns).fill(1);

    // Handle Resize observer gracefully
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = () => {
      // Semi-transparent dark background overlay to create a trailing motion-blur fade effect
      // This is crucial for mix-blend-screen: the dark color will fade away, leaving beautiful glowing trails
      ctx.fillStyle = "rgba(15, 8, 32, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Set font settings once
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly choose a character
        const char = charList[Math.floor(Math.random() * charList.length)];
        
        // Use bright, highly visible neon and white colors that pop on the deep background
        const rand = Math.random();
        if (rand > 0.96) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.98)"; // brilliant glowing white highlight
        } else if (rand > 0.8) {
          ctx.fillStyle = "rgba(232, 121, 249, 0.85)"; // vibrant neon pink/magenta
        } else if (rand > 0.5) {
          ctx.fillStyle = "rgba(192, 132, 252, 0.8)";  // glowing lavender
        } else {
          ctx.fillStyle = "rgba(168, 85, 247, 0.65)";  // glowing royal violet
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop position to the top once it hits the bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop y-coordinate
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    // Begin render loop
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90"
    />
  );
}
