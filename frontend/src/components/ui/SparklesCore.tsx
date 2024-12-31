"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const createParticles = () => {
      const density = particleDensity || 50;
      for (let i = 0; i < density; i++) {
        particles.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (maxSize || 2 - minSize || 0.5) + (minSize || 0.5),
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random(),
        });
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > rect.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > rect.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor || "255, 255, 255"}, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      particles.current = [];
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      style={{
        background: background || "transparent",
        position: "absolute",
        inset: 0,
      }}
    />
  );
}; 