"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    num: "/01",
    title: "MVP & SaaS Development",
    desc: "Transform ideas into scalable SaaS products with rapid development, modern architecture, and production-ready solutions built for growth.",
    image: "/assets/services_icons/mvp_ts.png",
  },
  {
    num: "/02",
    title: "Ecom & ERP Development",
    desc: "Build powerful commerce and business management systems that streamline operations, improve efficiency, and support your growing needs.",
    image: "/assets/services_icons/ecom_ts.png", // Note: ecom_ts.png was missing from the folder
  },
  {
    num: "/03",
    title: "Migration & Transformation",
    desc: "Modernize existing platforms with improved architecture, better performance, and seamless technology transformation.",
    image: "/assets/services_icons/migration_ts.png",
  },
  {
    num: "/04",
    title: "UI/UX Design & Prototyping",
    desc: "Create intuitive digital experiences through research-driven design, interactive prototypes, and user-focused solutions.",
    image: "/assets/services_icons/uiux_ts.png",
  },
  {
    num: "/05",
    title: "AI Integrated Solutions",
    desc: "Integrate practical AI solutions into your products and workflows to automate processes and unlock new possibilities.",
    image: "/assets/services_icons/ai_ts.png", // Note: ai_ts.png was missing from the folder
  },
  {
    num: "/06",
    title: "DevOps & CI-CD",
    desc: "Create reliable delivery pipelines with scalable infrastructure, automated workflows, and efficient deployment processes.",
    image: "/assets/services_icons/devops_ts.png",
  },
  {
    num: "/07",
    title: "Testing & Maintenance",
    desc: "Ensure long-term product stability with continuous testing, monitoring, optimization, and technical support.",
    image: "/assets/services_icons/testing_ts.png",
  },
];

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Add a small delay to prevent accidental triggers while cards are sliding
    hoverTimeoutRef.current = setTimeout(() => {
      setActive(index);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <section className="w-full bg-[#202736] rounded-b-[16px] py-[120px] max-md:py-16 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-[80px] items-center px-10 max-md:px-5">
        
        {/* Top Part */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 max-w-[1336px]">
          <div className="flex flex-col gap-6 max-w-[600px]">
            <div className="relative inline-flex items-center justify-center px-4 py-2 w-fit">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#4B5563]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#4B5563]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#4B5563]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#4B5563]" />
              <span className="font-sans text-[14px] font-medium leading-[20px] text-[#99A1AF]">
                Our Services
              </span>
            </div>
            <h2 className="font-display text-[42px] max-md:text-[32px] max-md:leading-10 font-medium leading-[50px] tracking-[-0.84px] text-white">
              Services that deliver<br className="max-md:hidden" />
              Real Business impact.
            </h2>
          </div>
          <p className="font-sans text-[18px] max-md:text-[16px] font-normal leading-[26px] text-[#99A1AF] max-w-[486px] lg:pt-14">
            We create robust software designed to scale efficiently, deliver exceptional performance, and endure over time, focusing not only on features but also on long-term value.
          </p>
        </div>

        {/* Accordion Part */}
        <div className="flex w-full max-w-[1336px] md:h-[650px] max-md:flex-col items-start gap-3">
          {services.map((svc, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={svc.num}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-[16px] overflow-hidden flex-shrink-0 cursor-pointer border transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]
                  ${
                    isActive
                      ? "md:w-[664px] bg-[#222B3B] border-[#374151] max-md:h-[500px]"
                      : "md:w-[100px] md:flex-1 bg-[#222B3b] border-transparent hover:bg-[#2A3445] max-md:h-[80px]"
                  }
                  md:h-full max-md:w-full`}
              >
                <AnimatePresence mode="wait">
                  {!isActive ? (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 z-10 pointer-events-none"
                    >
                      {/* Desktop Closed State Text */}
                      <div className="flex flex-col items-center py-8 h-full max-md:hidden">
                        <span className="text-[#D1D5DC] font-display text-[20px] leading-[26px] opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                          {svc.num}
                        </span>
                        <div className="flex-1 flex justify-center items-center h-full">
                          <span className="text-[#D1D5DC] font-display text-[24px] whitespace-nowrap transform -rotate-90 tracking-[-0.48px] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                            {svc.title}
                          </span>
                        </div>
                      </div>
                      
                      {/* Mobile Closed State Text */}
                      <div className="flex items-center px-6 h-full md:hidden">
                        <span className="text-[#D1D5DC] font-display text-[16px] w-12 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                          {svc.num}
                        </span>
                        <span className="text-[#D1D5DC] font-display text-[18px] whitespace-nowrap tracking-[-0.36px] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                          {svc.title}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.1 }}
                      className="absolute inset-0 p-8 max-md:p-6 flex flex-col pointer-events-none"
                    >
                      <div className="flex flex-col min-w-[598px] w-[598px] max-md:min-w-0 max-md:w-full h-full">
                        <div className="flex justify-between items-start w-full">
                          <div className="flex flex-col gap-4 min-w-[450px] w-[450px] max-md:min-w-0 max-md:w-full">
                            <h3 className="text-white font-display text-[36px] max-md:text-[24px] max-md:leading-8 font-medium leading-[42px] tracking-[-0.72px]">
                              {svc.title}
                            </h3>
                            <p className="text-[#D1D5DC] opacity-60 font-sans text-[16px] max-md:text-[14px] font-normal leading-[24px]">
                              {svc.desc}
                            </p>
                          </div>
                          <span className="text-white font-display text-[20px] max-md:hidden leading-[26px] tracking-[-0.1px] opacity-50">
                            {svc.num}
                          </span>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center mt-auto min-h-[320px] max-md:min-h-[200px]">
                          <motion.img
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ 
                              x: 0, 
                              opacity: 0.9
                            }}
                            transition={{ 
                              x: { duration: 0.4, delay: 0.1, ease: "easeOut" },
                              opacity: { duration: 0.4, delay: 0.1, ease: "easeOut" }
                            }}
                            src={svc.image}
                            className="w-[384px] h-[320px] max-md:w-full max-md:h-auto max-md:max-h-[220px] object-contain"
                            alt={svc.title}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
