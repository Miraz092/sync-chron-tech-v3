"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExploreMoreCard({ index = 5 }: { index?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#works"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-center items-center w-full h-full p-6 gap-4 rounded-[20px] bg-[#F3F4F6] cursor-pointer select-none overflow-hidden"
      aria-label="Explore More Works"
    >
      {/* File Image Container */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex justify-center items-center w-[184px] h-[124px] max-sm:w-[150px] max-sm:h-[101px] shrink-0"
      >
        {/* Default State: file-bw.png */}
        <Image
          src="/assets/works/explore/file-bw.png"
          alt="Explore More"
          width={184}
          height={124}
          priority
          className="w-full h-full object-contain transition-all duration-700 ease-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        />

        {/* Hover State: file-color.png */}
        <Image
          src="/assets/works/explore/file-color.png"
          alt="Explore More"
          width={184}
          height={124}
          priority
          className="w-full h-full object-contain absolute inset-0 transition-all duration-700 ease-out"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>

      {/* Explore More CTA */}
      <div className="flex items-center justify-center gap-[6px] self-stretch">
        <span
          className="font-sans text-[18px] font-semibold leading-[26px] transition-colors duration-500 ease-out whitespace-nowrap"
          style={{
            color: isHovered ? "#364153" : "#99A1AF",
          }}
        >
          Explore More
        </span>

        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="w-5 h-5 aspect-square shrink-0 transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? "translate(3px, -3px)" : "translate(0px, 0px)",
          }}
        >
          <path
            d="M5.83325 4.1665H15.8333V14.1665"
            stroke={isHovered ? "#364153" : "#99A1AF"}
            strokeWidth="2.08333"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500 ease-out"
          />
          <path
            d="M15.8334 4.1665L4.16675 15.8332"
            stroke={isHovered ? "#364153" : "#99A1AF"}
            strokeWidth="2.08333"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500 ease-out"
          />
        </svg>
      </div>
    </motion.a>
  );
}
