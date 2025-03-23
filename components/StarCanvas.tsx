"use client";
import { useEffect, useRef } from "react";

// 🎇 Moving Stars Background Canvas Component
const StarsCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const stars = Array.from({ length: 200 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 1,
      }));
  
      const animateStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fill();
  
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });
  
        requestAnimationFrame(animateStars);
      };
  
      animateStars();
  
      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    );
  };

  export default StarsCanvas;