"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { heroCards } from "@/data/hero";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroCards() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);

  // Normalised pointer position over the hero (-0.5 … 0.5), inverted for parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const section = ref.current?.closest("section");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!section || !finePointer) return;

    const onMove = (event) => {
      const rect = section.getBoundingClientRect();
      mx.set(-((event.clientX - rect.left) / rect.width - 0.5));
      my.set(-((event.clientY - rect.top) / rect.height - 0.5));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, mx, my]);

  return (
    <div ref={ref} className="absolute inset-0 z-[1]">
      {heroCards.map((card, index) => (
        <HeroCard
          key={card.id}
          card={card}
          index={index}
          sx={sx}
          sy={sy}
          reduceMotion={reduceMotion}
          isActive={activeId === card.id}
          isDimmed={activeId !== null && activeId !== card.id}
          onActiveChange={(active) => setActiveId((current) => (active ? card.id : current === card.id ? null : current))}
        />
      ))}
    </div>
  );
}

function HeroCard({ card, index, sx, sy, reduceMotion, isActive, isDimmed, onActiveChange }) {
  // Layer 1: parallax
  const x = useTransform(sx, (v: any) => v * card.depth);
  const y = useTransform(sy, (v: any) => v * card.depth);

  // Layer 4: pointer tilt
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (event) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onActiveChange(false);
  };

  return (
    <motion.div
      className="absolute"
      style={{ left: `${card.left}%`, top: `${card.top}%`, width: `${card.width}%`, x, y }}
    >
      {/* Layer 2: entrance */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.35 + index * 0.12 }}
      >
        {/* Layer 3: idle float */}
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: card.floatDelay }}
        >
          {/* Layer 4: hover lift + tilt */}
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 900, transformOrigin: "50% 80%" }}
            animate={isActive ? { y: -16, scale: 1.04 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className={`relative transition-[filter] duration-500 ${isDimmed ? "brightness-97 saturate-85" : ""}`}
          >
            <Image
              src={card.src}
              alt=""
              width={card.w}
              height={card.h}
              sizes="(max-width: 768px) 30vw, 14vw"
              draggable={false}
              className={`pointer-events-none h-auto w-full select-none transition-[filter] duration-500 ${
                isActive
                  ? "brightness-104 saturate-110 drop-shadow-[0_28px_40px_rgba(124,92,252,0.35)]"
                  : "drop-shadow-[0_18px_30px_rgba(76,72,250,0.12)]"
              }`}
            />
            {/* Hit area trimmed to the visible glass (PNG has transparent padding) */}
            <div
              className="absolute inset-x-[8%] inset-y-[6%] cursor-pointer"
              onPointerEnter={() => onActiveChange(true)}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
