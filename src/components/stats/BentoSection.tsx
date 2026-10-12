"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
}

export const industries: IndustryItem[] = [
  { id: "education", name: "Education", icon: "/assets/icons/education.png" },
  { id: "agro", name: "Agriculture", icon: "/assets/icons/agro.png" },
  { id: "healthcare", name: "Healthcare", icon: "/assets/icons/healthcare.png" },
  { id: "real_estate", name: "Real Estate", icon: "/assets/icons/real_estate.png" },
  { id: "ecommerce", name: "E-Commerce", icon: "/assets/icons/ecommerce.png" },
  { id: "restaurant", name: "Restaurant", icon: "/assets/icons/restaurant.png" },
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
    <div ref={ref} className="max-w-[913px] 2xl:max-w-[1100px]">
      <h2 className="max-md:text-[32px] max-md:leading-10 text-[42px] 2xl:text-[48px] leading-[50px] 2xl:leading-[58px] tracking-[-0.84px] font-medium font-display">
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
  const [hoveredGlobalIndex, setHoveredGlobalIndex] = useState<number | null>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  const x = useMotionValue(0);

  // Measure single set width for seamless infinite looping
  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        setSetWidth(setRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Glitch-free freeze on hover: when hoveredGlobalIndex is set, frame advances by 0 (freezes exactly in place)
  useAnimationFrame((_, delta) => {
    if (hoveredGlobalIndex !== null || setWidth === 0) return;
    const speed = 35; // px per second
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -setWidth) {
      next += setWidth;
    }
    x.set(next);
  });

  // Render 4 sets to ensure wide screen coverage and smooth loop
  const repeatedSets = [0, 1, 2, 3];

  return (
    <div
      style={{ flex: "182 1 0%" }}
      className="flex flex-col justify-between items-center rounded-[16px] bg-white px-4 pt-2 pb-4 2xl:px-6 2xl:pt-3 2xl:pb-6 w-full min-w-0 overflow-hidden shrink-0 min-h-0"
    >
      <div className="relative w-full overflow-hidden flex pt-9 pb-2 my-auto">
        
        {/* Left Side Seamless Feathered Blur & Gradient Overlay */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Right Side Seamless Feathered Blur & Gradient Overlay */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Marquee Track */}
        <motion.div
          style={{ x }}
          className="flex items-center flex-nowrap will-change-transform"
        >
          {repeatedSets.map((setIdx) => (
            <div
              key={setIdx}
              ref={setIdx === 0 ? setRef : undefined}
              className="flex items-center gap-3 pr-3 shrink-0"
            >
              {industries.map((ind, i) => {
                const globalIndex = setIdx * industries.length + i;
                const isHovered = hoveredGlobalIndex === globalIndex;

                return (
                  <div
                    key={`${setIdx}-${ind.id}`}
                    className="relative cursor-pointer select-none"
                    onMouseEnter={() => setHoveredGlobalIndex(globalIndex)}
                    onMouseLeave={() => setHoveredGlobalIndex(null)}
                  >
                    <div className="w-[48px] h-[48px] 2xl:w-[56px] 2xl:h-[56px] relative shrink-0 transition-transform duration-300 ease-out hover:scale-108">
                      <Image
                        src={ind.icon}
                        alt={ind.name}
                        fill
                        sizes="(min-width: 1536px) 56px, 48px"
                        draggable={false}
                        className="object-contain pointer-events-none drop-shadow-xs"
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 2, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                        >
                          <div className="bg-[#1D293D] text-white font-sans text-[11px] font-medium px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                            {ind.name}
                          </div>
                          <div className="w-1.5 h-1 bg-[#1D293D] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-neutral-700 font-display text-[20px] 2xl:text-[24px] font-semibold leading-[26px] 2xl:leading-[30px] tracking-[-0.1px]">
          10+
        </span>
        <span className="text-neutral-500 font-sans text-[16px] 2xl:text-[18px] font-normal leading-[24px] 2xl:leading-[26px]">
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

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,376.67fr)_minmax(0,312.67fr)_minmax(0,360.67fr)_minmax(0,250fr)] lg:grid-rows-1 gap-3 lg:aspect-[1336/300] lg:min-h-[300px] lg:max-h-[440px]">
          
          {/* Card 1: 20+ Projects Delivered (376.67fr - scales proportionally) */}
          <div
            className="relative flex flex-col justify-end items-start rounded-[16px] p-8 2xl:p-10 overflow-hidden h-full min-h-[300px] min-w-0"
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
              className="absolute pointer-events-none mix-blend-screen h-[130%] 2xl:h-[135%] w-auto max-w-none object-contain"
              style={{
                right: "-20%",
                top: "-15%",
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
            <div className="relative z-10 flex flex-col gap-0 w-full shrink-0">
              <div className="font-display text-[42px] 2xl:text-[52px] font-semibold leading-[50px] 2xl:leading-[60px] tracking-[-0.84px] text-white">
                20+
              </div>
              <div className="font-display text-[24px] 2xl:text-[28px] font-normal leading-[32px] 2xl:leading-[36px] tracking-[-0.48px] text-white/85">
                Projects Delivered
              </div>
            </div>
          </div>

          {/* Column 2: MarqueeCard (182fr) + Fast Delivery (106fr) with 12px gap (312.67fr) */}
          <div className="flex flex-col gap-3 h-full min-w-0 overflow-hidden">
            <MarqueeCard />
            
            <div
              style={{ flex: "106 1 0%" }}
              className="flex items-center justify-center gap-4 2xl:gap-6 rounded-[16px] bg-white px-5 py-3 2xl:px-7 2xl:py-4 w-full min-w-0 shrink-0 min-h-0"
            >
              <div 
                className="text-neutral-800 text-[42px] 2xl:text-[50px] font-medium leading-[48px] 2xl:leading-[56px] tracking-[-0.42px] shrink-0"
                style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
              >
                3x
              </div>
              <div className="w-[1px] h-[52px] 2xl:h-[64px] bg-neutral-200 shrink-0" />
              <div className="flex flex-col items-start gap-0.5 min-w-0">
                <span className="text-neutral-700 font-sans text-[16px] 2xl:text-[18px] font-semibold leading-[24px] 2xl:leading-[26px]">
                  Fast Delivery
                </span>
                <p className="text-neutral-400 font-sans text-[12px] 2xl:text-[14px] font-normal leading-[16px] 2xl:leading-[20px]">
                  Agile execution from<br />idea to launch.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Scalable Architecture (360.67fr at 1440px) - Exact Figma Node 2458:6660 */}
          <div className="flex flex-col justify-center items-center rounded-[16px] bg-white p-6 2xl:p-8 h-full min-h-[300px] min-w-0 overflow-hidden gap-6 2xl:gap-8">
            <div className="relative w-full max-w-[249px] 2xl:max-w-[280px] aspect-[249/140] flex items-center justify-center shrink-0">
              <video
                src="/assets/videos/box_animation.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
                style={{
                  filter: "contrast(106%) brightness(102%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 85% at center, #000 60%, transparent 95%)",
                  maskImage: "radial-gradient(ellipse 90% 85% at center, #000 60%, transparent 95%)",
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center w-full shrink-0 max-w-[237px] 2xl:max-w-[280px]">
              <div className="text-[#364153] font-display text-[24px] 2xl:text-[28px] font-medium leading-[32px] 2xl:leading-[36px] tracking-[-0.48px]">
                Scalable Architecture
              </div>
              <div className="text-[#99A1AF] font-sans text-[14px] 2xl:text-[16px] font-normal leading-[20px] 2xl:leading-[24px] max-w-[220px] 2xl:max-w-[260px]">
                Reliable systems designed for<br />security, performance, and growth.
              </div>
            </div>
          </div>

          {/* Card 4: $30M+ Revenue (250fr) - Prominent Coins matching Figma */}
          <div className="relative flex flex-col justify-between items-start rounded-[16px] bg-white p-4 2xl:p-6 overflow-hidden h-full min-h-[300px] min-w-0">
            <div className="relative w-full h-[155px] 2xl:h-[185px] flex items-center justify-center my-auto overflow-visible">
              <video
                src="/assets/videos/coin animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none mix-blend-multiply scale-[1.7] 2xl:scale-[1.85] origin-center"
                style={{
                  filter: "contrast(106%) brightness(102%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 85% at center, #000 55%, transparent 95%)",
                  maskImage: "radial-gradient(ellipse 90% 85% at center, #000 55%, transparent 95%)",
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-1 relative z-10 w-full shrink-0">
              <div className="text-neutral-700 font-display text-[24px] 2xl:text-[28px] font-medium leading-[32px] 2xl:leading-[36px] tracking-[-0.48px]">
                $30M+
              </div>
              <div className="text-neutral-400 font-sans text-[14px] 2xl:text-[16px] font-normal leading-[20px] 2xl:leading-[24px] max-w-[218px] 2xl:max-w-[260px]">
                Revenue enabled through our Softwares
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
