"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pointer-events-none relative z-[2] mt-[clamp(40px,8.5vh,96px)] flex flex-col items-start px-10 max-md:mt-8 max-md:px-5 [&>*]:pointer-events-auto"
    >
      <h1
        id="hero-title"
        className="text-display-56 max-md:text-[40px] max-md:leading-[46px] max-md:tracking-[-0.8px] max-[400px]:text-[34px] max-[400px]:leading-10"
      >
        <motion.span variants={item} className="block text-neutral-400">
          Ideas to Products
        </motion.span>
        <motion.span variants={item} className="block text-ink">
          That Scale
        </motion.span>
      </h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-[420px] text-base leading-6 text-slate-copy max-md:mt-4 max-md:text-[15px]"
      >
        We help businesses grow with scalable custom
        <br className="max-md:hidden" /> software solutions.
      </motion.p>

      <motion.a
        variants={item}
        href="#"
        id="hero-start-project"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        className="group shine bg-brand-gradient mt-10 inline-flex items-center gap-2 rounded-xl py-1 pr-3 pl-1 text-sm leading-5 font-medium text-white shadow-[0_8px_20px_-8px_rgba(76,72,250,0.6),inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-8px_rgba(76,72,250,0.65),inset_0_0_0_1px_rgba(255,255,255,0.25)] max-md:mt-7"
      >
        <span className="grid size-10 place-items-center rounded-lg bg-white shadow-[0_1px_2px_rgba(29,41,61,0.12)] transition-transform duration-400 ease-out-expo group-hover:scale-106 group-hover:-rotate-8">
          <Image src="/assets/bolt.svg" alt="" width={20} height={20} />
        </span>
        Start Project
      </motion.a>
    </motion.div>
  );
}
