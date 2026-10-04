"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const industries = [
  { id: "ecommerce", name: "Ecommerce", icon: "/assets/icons/ecommerce.png" },
  { id: "education", name: "Education", icon: "/assets/icons/education.png" },
  { id: "healthcare", name: "Healthcare", icon: "/assets/icons/healthcare.png" },
  { id: "real_estate", name: "Real Estate", icon: "/assets/icons/real_estate.png" },
  { id: "restaurant", name: "Restaurant", icon: "/assets/icons/restaurant.png" },
  { id: "agro", name: "Agriculture", icon: "/assets/icons/agro.png" },
];

function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#D1D5DC", "#1E2939"]);
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

function HeaderText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = (
    "Transform ideas into scalable digital products. We design and engineer solutions that help businesses grow."
  ).split(" ");

  return (
    <div ref={ref} className="max-w-[913px]">
      <h2 className="max-md:text-[32px] max-md:leading-10 text-[42px] leading-[50px] tracking-[-0.84px] font-medium font-display">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <RevealWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />
          );
        })}
      </h2>
    </div>
  );
}

function MarqueeCard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4 rounded-[16px] bg-white p-6 overflow-hidden min-h-[140px]">
      <div className="relative w-full overflow-hidden flex py-4 mask-fade-x">
        <motion.div
          animate={{ x: hoveredId ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-4 flex-nowrap"
          style={{ width: "fit-content" }}
        >
          {/* Duplicate for infinite scroll */}
          {[...industries, ...industries, ...industries].map((ind, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(ind.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="w-[48px] h-[48px] relative flex-shrink-0">
                <Image src={ind.icon} alt={ind.name} fill className="object-contain" />
              </div>
              
              {/* Tooltip */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200 pointer-events-none z-10 ${
                  hoveredId === ind.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {ind.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-[6px]">
        <span className="text-neutral-700 font-display text-[28px] font-semibold leading-[36px] tracking-[-0.56px]">
          10+
        </span>
        <span className="text-neutral-500 font-sans text-[18px] font-normal leading-[26px]">
          industries served
        </span>
      </div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="w-full flex flex-col items-start gap-2 bg-white">
      <div className="flex w-full flex-col items-start gap-20 rounded-[16px] bg-neutral-100 px-10 py-[120px] max-md:px-5 max-md:py-16 max-md:gap-10 overflow-hidden">
        
        <HeaderText />

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:h-[400px]">
          
          {/* Card 1: 20+ Projects */}
          <div
            className="relative flex flex-col justify-end items-start gap-2 rounded-[16px] p-8 overflow-hidden lg:h-full h-[300px]"
            style={{
              background:
                "radial-gradient(120% 90% at 100% 0%, #2f6bff 0%, #1a3fb8 35%, #0b1a4a 65%, #050b1f 100%)",
            }}
          >
            <video
              src="/assets/videos/card_tilt.mov"
              autoPlay
              loop
              muted
              playsInline
              className="absolute pointer-events-none mix-blend-screen h-[125%] w-auto max-w-none object-contain"
              style={{
                right: "-20%",
                top: "-10%",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 100%), linear-gradient(to right, transparent 0%, #000 20%, #000 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 100%), linear-gradient(to right, transparent 0%, #000 20%, #000 100%)",
                maskComposite: "intersect",
              }}
            />
            {/* bottom/left dark fade for text legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,11,31,0.85) 0%, rgba(5,11,31,0.35) 45%, rgba(5,11,31,0) 70%), linear-gradient(0deg, rgba(5,11,31,0.7) 0%, rgba(5,11,31,0) 35%)",
              }}
            />
            <div className="relative z-10 flex flex-col gap-2 w-full">
              <div className="font-display text-[48px] font-semibold leading-[56px] tracking-[-0.96px] text-white">
                20+
              </div>
              <div className="font-display text-[24px] font-normal leading-[32px] tracking-[-0.48px] text-white/85">
                Projects Delivered
              </div>
            </div>
          </div>

          {/* Cards 2 & 3: Middle Column */}
          <div className="flex flex-col gap-4 lg:h-full">
            <MarqueeCard />
            
            <div className="flex justify-center items-center gap-6 rounded-[16px] bg-white p-6 min-h-[140px] flex-shrink-0">
              <div 
                className="text-neutral-800 text-[48px] font-medium leading-[56px] tracking-[-0.48px]"
                style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
              >
                3x
              </div>
              <div className="w-[1px] h-[56px] bg-neutral-200 flex-shrink-0"></div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-neutral-700 font-display text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">
                  Fast Delivery
                </span>
                <p className="text-neutral-400 font-sans text-[15px] font-normal leading-[22px]">
                  Agile execution from<br/>idea to launch.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Scalable Architecture */}
          <div className="flex flex-col justify-center items-center gap-6 rounded-[16px] bg-white p-6 lg:h-full">
            <div className="relative w-[249px] h-[140px]">
              <video
                src="/assets/videos/box_animation.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-neutral-700 font-display text-[32px] font-medium leading-[40px] tracking-[-0.64px] text-center">
                Scalable Architecture
              </div>
              <div className="text-neutral-400 font-sans text-[16px] font-normal leading-[24px] text-center">
                Reliable systems designed for<br/>security, performance, and growth.
              </div>
            </div>
          </div>

          {/* Card 5: $30M+ Revenue */}
          <div className="relative flex flex-col items-start gap-4 rounded-[16px] bg-white p-6 overflow-hidden lg:h-full h-[360px]">
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
              <video
                src="/assets/videos/coin animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[95%] h-full object-contain pointer-events-none mix-blend-darken"
              />
            </div>
            <div className="flex flex-col items-start gap-2 relative z-10 w-full">
              <div className="text-neutral-700 font-display text-[32px] font-medium leading-[40px] tracking-[-0.64px]">
                $30M+
              </div>
              <div className="text-neutral-400 font-sans text-[16px] font-normal leading-[24px] max-w-[240px]">
                Revenue enabled through our Softwares
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
