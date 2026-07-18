import React, { useEffect, useRef } from "react";

export const BackgroundCodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler to keep canvas full screen
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Reinitialize drops array on resize
      const columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener("resize", handleResize);

    // Characters for the coding animation
    const charList = "01<>{}[];+-=*&%$#@!/\\()_".split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    // Drops array tracks the y-coordinate of the drop for each column
    let drops = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent overlay to create a trailing fade effect on the light theme
      ctx.fillStyle = "rgba(250, 249, 255, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // Set font settings
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly select a code character
        const char = charList[Math.floor(Math.random() * charList.length)];
        
        // Use beautiful light-purple, violet, and soft indigo colors that blend perfectly on the light background
        const rand = Math.random();
        if (rand > 0.95) {
          ctx.fillStyle = "rgba(109, 40, 217, 0.9)";  // Deep purple accent
        } else if (rand > 0.75) {
          ctx.fillStyle = "rgba(139, 92, 246, 0.75)"; // Violet
        } else if (rand > 0.5) {
          ctx.fillStyle = "rgba(167, 139, 250, 0.6)";  // Soft lavender
        } else {
          ctx.fillStyle = "rgba(196, 181, 253, 0.45)"; // Very light purple
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop back to top once it reaches the bottom or randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Start the animation loop
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.55] mix-blend-multiply"
    />
  );
};
