'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export default function CreativeBackground({ density = "high" }: { density?: "low" | "high" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shapes = useMemo(() => {
    const s = [];
    const rows = density === "high" ? 28 : 10; // high density for home, lower for other pages
    for (let i = 0; i < rows; i++) {
        const yPos = `${(i / (rows - 1)) * 96}%`;
        const isEven = i % 2 === 0;
        const isThird = i % 3 === 0;
        
        // Zig-Zag Logic for both Mobile & Desktop
        // 0: Left, 1: Right, 2: Mid-Left, 3: Mid-Right
        let xPos = "-5%"; 
        if (i % 4 === 1) xPos = "65%";
        if (i % 4 === 2) xPos = "20%";
        if (i % 4 === 3) xPos = "45%";

        s.push({
            x: xPos,
            y: yPos,
            color: isEven ? "text-gold" : "text-primary",
            rot: isEven ? 15 : -15,
            op: density === "high" ? (isThird ? 0.25 : 0.18) : 0.12, // reduce opacity too
            duration: 18 + (i % 12),
            scale: density === "high" ? 1 : 0.7 // smaller on other pages
        });

        // Occasional giant background wings (center) - only in high density or fewer in low
        if (density === "high" && i % 7 === 0) {
            s.push({
                x: "30%",
                y: yPos,
                color: isEven ? "text-primary" : "text-gold",
                rot: 0,
                op: 0.05,
                duration: 40,
                scale: 1.2
            });
        }
    }
    return s;
  }, [density]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[0] overflow-hidden select-none">
      {shapes.map((s, i) => (
        <EliteShape 
          key={i}
          x={s.x} 
          y={s.y} 
          rotate={s.rot} 
          opacity={s.op} 
          color={s.color} 
          duration={s.duration}
          scale={s.scale}
        />
      ))}
    </div>
  );
}

function EliteShape({ x, y, duration, rotate, opacity, color, scale = 1 }: { 
  x: string, y: string, duration: number, rotate: number, opacity: number, color: string, scale?: number
}) {
  return (
    <motion.div
      initial={{ left: x, top: y, opacity: opacity, rotate, scale }}
      animate={{ 
        y: [0, -40, 0],
        rotate: [rotate, rotate + 8, rotate]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute will-change-transform"
      style={{ 
        width: 'max(150px, 28vw)',
        maxWidth: '500px',
        aspectRatio: '1/1'
      }}
    >
      <svg viewBox="0 0 100 100" fill="currentColor" className={`${color} w-full h-full filter drop-shadow-sm`}>
        <path d="M50 40 C30 10 0 20 5 50 C10 80 40 60 50 55 C45 70 30 85 20 80 C10 75 40 90 50 60" className="opacity-80" />
        <path d="M50 40 C70 10 100 20 95 50 C90 80 60 60 50 55 C55 70 70 85 80 80 C90 75 60 90 50 60" className="opacity-70" />
        <path d="M50 40 L48 60 L52 60 Z" className="opacity-95" />
      </svg>
    </motion.div>
  );
}
