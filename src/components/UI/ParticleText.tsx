"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function useIsMobile(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  const query = window.matchMedia("(max-width: 767px)");
  const [isMobile, setIsMobile] = useState(query.matches);
  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
}

interface ParticleTextProps {
  text: string;
  className?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.1;
    this.friction = 0.85;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.size = 2; // Uniform size
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }

  update(
    context: CanvasRenderingContext2D,
    mouse: { x: number; y: number; radius: number },
    isInView: boolean
  ) {
    if (!isInView) return;
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -mouse.radius / this.distance;

    if (this.distance < mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;

    this.draw(context);
  }
}

export const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const isMobile = useIsMobile();
  
  const mouse = useRef({ x: 0, y: 0, radius: 3000 }); // Radius squared

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particlesArray: Particle[] = [];

    const init = () => {
      const parent = containerRef.current;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight || 200;

      ctx.fillStyle = "white";
      ctx.font = `bold ${canvas.width * 0.16}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + canvas.height * 0.1);

      const textCoordinates = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      particlesArray = [];

      // Adjust gap between particles based on screen size
      const gap = Math.max(3, Math.floor(canvas.width / 200));

      for (let y = 0; y < textCoordinates.height; y += gap) {
        for (let x = 0; x < textCoordinates.width; x += gap) {
          if (
            textCoordinates.data[
              y * 4 * textCoordinates.width + x * 4 + 3
            ] > 128
          ) {
            let color = "rgba(255, 255, 255, 0.8)";
            particlesArray.push(new Particle(x, y, color));
          }
        }
      }
      setParticles(particlesArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(ctx, mouse.current, isInView);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isInView) {
        animate();
    }

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, isInView]);

  useEffect(() => {
    if (isMobile) return; // Disable mouse tracking on mobile
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    }

    window.addEventListener("mousemove", handleMouseMove);
    canvasRef.current?.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};
