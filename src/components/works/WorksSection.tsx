"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { worksProjects, WorkProject } from "@/data/works";

const ease = [0.22, 1, 0.36, 1] as const;

function WorkCard({ project, index }: { project: WorkProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.08 }}
      className="group flex flex-col gap-[2px] rounded-[20px] bg-[#E5E8EB] p-[2px] w-full"
    >
      {/* Cover / Image Area (Figma: 408 × 306) */}
      <div
        className="relative w-full overflow-hidden rounded-t-[18px] rounded-b-[10px] cursor-pointer"
        style={{ aspectRatio: "408 / 306" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 412px"
          className="object-cover object-center grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.08]"
        />

        {/* Bottom-up dark gradient overlay (Figma: rgba(18,18,18,0.8) to transparent at 74%) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0) 74%)",
          }}
        />

        {/* Tag Chip */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full bg-white/92 px-3 py-1 font-sans text-[12px] font-medium leading-[16px] text-[#4A5565] shadow-xs backdrop-blur-sm">
            {project.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="absolute right-4 bottom-4 left-4 z-10 font-sans text-[16px] font-semibold leading-[24px] text-white">
          {project.title}
        </h3>
      </div>

      {/* KPI Metrics — 2×2 grid with 2px gap (Figma: itemSpacing: 2) */}
      <div className="grid grid-cols-2 gap-[2px]">
        {project.kpis.map((kpi, kIdx) => (
          <div
            key={kIdx}
            className={`flex flex-col justify-center bg-white p-3 min-h-[68px] ${
              kIdx === 0
                ? "rounded-tl-[10px]"
                : kIdx === 1
                  ? "rounded-tr-[10px]"
                  : kIdx === 2
                    ? "rounded-bl-[18px]"
                    : "rounded-br-[18px]"
            }`}
          >
            <span className="font-sans text-[16px] font-semibold leading-[24px] text-[#364153]">
              {kpi.value}
            </span>
            <span className="mt-[2px] font-sans text-[12px] leading-[16px] text-[#99A1AF] whitespace-nowrap overflow-hidden text-ellipsis">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WorksSection() {
  return (
    <section id="works" className="w-full bg-white py-[120px] max-md:py-16 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-20 px-10 max-md:px-5 max-md:gap-12">
        
        {/* Header Part (Figma: itemSpacing: 376 between left & right, bottom-aligned) */}
        <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8 max-w-[1336px] mx-auto max-md:items-start">
          <div className="flex flex-col gap-3 max-w-[620px]">
            {/* Corner Bracket Badge */}
            <div className="relative inline-flex items-center justify-center px-4 py-2 w-fit">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#99A1AF]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#99A1AF]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#99A1AF]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#99A1AF]" />
              <span className="font-sans text-[14px] font-medium leading-[20px] text-[#62748E]">
                Our Works
              </span>
            </div>

            <h2 className="font-display text-[42px] max-md:text-[32px] max-md:leading-10 font-medium leading-[50px] tracking-[-0.84px] text-ink">
              Solutions Built For<br />
              Real-World Challenges
            </h2>
          </div>

          <p className="font-sans text-[18px] max-md:text-[16px] font-medium leading-[26px] text-[#6A7282] max-w-[486px] lg:pb-1">
            Explore how we help businesses transform ideas into scalable digital products across industries.
          </p>
        </div>

        {/* Outer Grid Table Container (Figma: border-[#E5E7EB] strokes around and between cells) */}
        <div className="w-full max-w-[1336px] mx-auto border border-[#E5E7EB]">
          
          {/* Desktop 3×2 Layout (Figma: 1336px frame, 2 rows of 3 cells) */}
          <div className="hidden lg:grid lg:grid-cols-3 border-b border-[#E5E7EB]">
            {worksProjects.slice(0, 3).map((project, idx) => (
              <div
                key={project.id}
                className={`p-4 flex items-center justify-center ${
                  idx < 2 ? "border-r border-[#E5E7EB]" : ""
                }`}
              >
                <WorkCard project={project} index={idx} />
              </div>
            ))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-3">
            {worksProjects.slice(3, 6).map((project, idx) => (
              <div
                key={project.id}
                className={`p-4 flex items-center justify-center ${
                  idx < 2 ? "border-r border-[#E5E7EB]" : ""
                }`}
              >
                <WorkCard project={project} index={idx + 3} />
              </div>
            ))}
          </div>

          {/* Responsive Layout for Tablets & Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden">
            {worksProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`p-4 flex items-center justify-center border-b last:border-b-0 border-[#E5E7EB] ${
                  idx % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <WorkCard project={project} index={idx} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
