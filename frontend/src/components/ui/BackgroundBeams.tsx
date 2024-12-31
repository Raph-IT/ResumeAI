"use client";
import { useEffect, useRef } from "react";

export const BackgroundBeams = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1E40AF");
    gradient.addColorStop(1, "#7C3AED");

    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      frame++;
      const rows = 50;
      const cols = 50;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellWidth;
          const y = i * cellHeight;
          const noise = Math.sin(frame * 0.02 + (i + j) * 0.5) * 0.5 + 0.5;

          ctx.fillStyle = gradient;
          ctx.globalAlpha = noise * 0.3;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 h-full w-full bg-black opacity-40"
    />
  );
}; 