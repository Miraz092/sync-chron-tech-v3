"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { brandLogos } from "@/data/hero";

const SPEED = 50; // px per second

/** Inline sizing so every logo reads at the same optical size (scaled by --logo-k). */
function logoStyle(logo) {
  if (!logo.crop) {
    return { height: `calc(${logo.h}px * var(--logo-k))`, width: "auto" };
  }
  const { ch, t, r, b, l } = logo.crop;
  const s = `(${logo.h}px * var(--logo-k) / ${ch})`;
  return {
    height: `calc(${logo.h0} * ${s})`,
    width: "auto",
    // Cancel the PNG's baked-in transparent padding
    margin: `calc(${-t} * ${s}) calc(${-r} * ${s}) calc(${-b} * ${s}) calc(${-l} * ${s})`,
  };
}

function LogoSet({ hidden, setRef }) {
  return (
    <ul ref={setRef} aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {brandLogos.map((logo) => (
        <li key={logo.name} className="flex h-[calc(44px*var(--logo-k))] shrink-0 items-center pr-(--logo-gap)">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.name}
            width={logo.w}
            height={logo.h0}
            style={logoStyle(logo)}
            draggable={false}
            className="max-w-none opacity-90 transition duration-300 select-none hover:-translate-y-0.5 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

export default function LogoMarquee() {
  const wrapRef = useRef(null);
  const setRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [setWidth, setSetWidth] = useState(0);
  const [repeats, setRepeats] = useState(1);

  const x = useMotionValue(0);
  // 1 = running, 0 = paused; spring gives a quick, smooth ease into the pause
  const speedTarget = useMotionValue(1);
  const speed = useSpring(speedTarget, { stiffness: 260, damping: 40 });

  // Measure one logo set and repeat it until half the track covers the viewport
  useEffect(() => {
    const wrap = wrapRef.current;
    const set = setRef.current;
    if (!wrap || !set) return;

    const measure = () => {
      const w = set.offsetWidth;
      if (!w) return;
      setSetWidth(w);
      setRepeats(Math.max(1, Math.ceil(wrap.clientWidth / w)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(set);
    return () => observer.disconnect();
  }, []);

  const halfWidth = setWidth * repeats;

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !halfWidth) return;
    let next = x.get() - (SPEED * delta * speed.get()) / 1000;
    if (next <= -halfWidth) next += halfWidth;
    x.set(next);
  });

  const pause = () => speedTarget.set(0);
  const resume = () => speedTarget.set(1);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className="mask-fade-x pointer-events-auto overflow-hidden [--logo-gap:64px] [--logo-k:1] max-[1180px]:[--logo-gap:48px] max-md:[--logo-gap:40px] max-md:[--logo-k:0.8]"
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: repeats * 2 }, (_, i) => (
          <LogoSet key={i} hidden={i > 0} setRef={i === 0 ? setRef : undefined} />
        ))}
      </motion.div>
    </div>
  );
}
