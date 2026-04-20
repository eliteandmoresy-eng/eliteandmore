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
    const rows = density === "high" ? 18 : 7;
    for (let i = 0; i < rows; i++) {
      const yPos = `${(i / (rows - 1)) * 96}%`;
      const isThird = i % 3 === 0;

      let xPos = "-5%";
      if (i % 4 === 1) xPos = "72%";
      if (i % 4 === 2) xPos = "25%";
      if (i % 4 === 3) xPos = "50%";

      s.push({
        x: xPos,
        y: yPos,
        rot: i % 2 === 0 ? 8 : -12,
        op: density === "high" ? (isThird ? 0.28 : 0.18) : 0.12,
        duration: 20 + (i % 10),
        scale: density === "high" ? 1 : 0.7,
        flip: i % 3 === 0,
      });
    }
    return s;
  }, [density]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[0] overflow-hidden select-none">
      {shapes.map((s, i) => (
        <EliteButterfly
          key={i}
          x={s.x}
          y={s.y}
          rotate={s.rot}
          opacity={s.op}
          duration={s.duration}
          scale={s.scale}
          flip={s.flip}
        />
      ))}
    </div>
  );
}

function EliteButterfly({ x, y, duration, rotate, opacity, scale = 1, flip = false }: {
  x: string; y: string; duration: number; rotate: number; opacity: number; scale?: number; flip?: boolean;
}) {
  return (
    <motion.div
      initial={{ left: x, top: y, opacity, rotate, scale: flip ? -scale : scale }}
      animate={{
        y: [0, -35, 0],
        rotate: [rotate, rotate + 6, rotate],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="absolute will-change-transform"
      style={{
        width: 'max(160px, 26vw)',
        maxWidth: '460px',
        aspectRatio: '1/1',
        backgroundImage: "url('/images/butterfly.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transform: flip ? 'scaleX(-1)' : undefined,
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.08))',
      }}
    />
  );
}
