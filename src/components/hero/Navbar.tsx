"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/hero";

const ease = [0.22, 1, 0.36, 1] as const;

function Chevron({ open }) {
  return (
    <Image
      src="/assets/nav-arrow-down.svg"
      alt=""
      width={16}
      height={16}
      className={`size-4 opacity-85 transition-transform duration-300 ease-out-expo ${open ? "rotate-180" : ""}`}
    />
  );
}

function BookCallButton({ id, className = "" }) {
  return (
    <motion.a
      href="#"
      id={id}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={`shine bg-brand-gradient inline-flex items-start rounded-lg px-5 py-3.5 text-sm leading-5 font-medium whitespace-nowrap text-white shadow-[0_6px_16px_-6px_rgba(76,72,250,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-8px_rgba(76,72,250,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] ${className}`}
    >
      Book A Call
    </motion.a>
  );
}

const linkClass =
  "inline-flex items-center gap-1 rounded-lg p-2 text-sm leading-5 font-normal text-neutral-600 transition-colors duration-200 hover:bg-white/45 hover:text-ink";

export default function Navbar() {
  const navRef = useRef(null);
  const hoverTimer = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openOnHover = (label) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    clearTimeout(hoverTimer.current);
    setOpenMenu(label);
  };

  const closeOnLeave = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <motion.header
      ref={navRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="relative z-10 flex items-center gap-12 p-3 max-[1180px]:gap-6"
    >
      <a href="#" id="nav-logo" aria-label="Sync Chron Tech home" className="shrink-0">
        <Image
          src="/assets/brand-logo.svg"
          alt="Sync Chron Tech"
          width={180}
          height={42}
          preload
          className="aspect-[30/7] h-[42px] w-[180px] max-[400px]:h-[35px] max-[400px]:w-[150px]"
        />
      </a>

      {/* Desktop menu */}
      <nav aria-label="Primary" className="hidden flex-1 nav:block">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) =>
            link.items ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => openOnHover(link.label)}
                onMouseLeave={closeOnLeave}
              >
                <button
                  type="button"
                  id={`nav-${link.label.toLowerCase()}`}
                  aria-expanded={openMenu === link.label}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu((cur) => (cur === link.label ? null : link.label))}
                  className={`${linkClass} cursor-pointer ${openMenu === link.label ? "bg-white/45 text-ink" : ""}`}
                >
                  {link.label}
                  <Chevron open={openMenu === link.label} />
                </button>

                <AnimatePresence>
                  {openMenu === link.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease }}
                      className="absolute top-[calc(100%+8px)] left-0 min-w-[200px] origin-top-left rounded-xl border border-white/70 bg-white/82 p-1.5 shadow-[0_16px_40px_-12px_rgba(29,41,61,0.25)] backdrop-blur-[16px] backdrop-saturate-140"
                    >
                      {link.items.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            className="block rounded-lg px-3 py-2.5 text-sm leading-5 text-neutral-600 transition-colors hover:bg-brand-500/8 hover:text-brand-500"
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <a href={link.href} id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      <BookCallButton id="nav-book-call" className="ml-auto hidden nav:inline-flex" />

      {/* Mobile toggle */}
      <button
        type="button"
        id="nav-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="nav-mobile"
        onClick={() => setMobileOpen((v) => !v)}
        className="ml-auto inline-flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[10px] bg-white/60 backdrop-blur-[10px] nav:hidden"
      >
        <motion.span
          animate={mobileOpen ? { y: 3.75, rotate: 45 } : { y: 0, rotate: 0 }}
          className="block h-[1.5px] w-[18px] rounded-sm bg-ink"
        />
        <motion.span
          animate={mobileOpen ? { y: -3.75, rotate: -45 } : { y: 0, rotate: 0 }}
          className="block h-[1.5px] w-[18px] rounded-sm bg-ink"
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="nav-mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
            className="absolute top-[calc(100%+4px)] right-3 left-3 rounded-2xl bg-white/90 p-3 shadow-[0_20px_50px_-16px_rgba(29,41,61,0.3)] backdrop-blur-[20px] backdrop-saturate-140 nav:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.items ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSection === link.label}
                        onClick={() => setMobileSection((cur) => (cur === link.label ? null : link.label))}
                        className={`${linkClass} w-full cursor-pointer justify-between p-3 text-[15px]`}
                      >
                        {link.label}
                        <Chevron open={mobileSection === link.label} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSection === link.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease }}
                            className="overflow-hidden pl-3"
                          >
                            {link.items.map((sub) => (
                              <li key={sub.label}>
                                <a
                                  href={sub.href}
                                  className="block rounded-lg px-3 py-2.5 text-sm text-neutral-600 hover:bg-brand-500/8 hover:text-brand-500"
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={link.href} className={`${linkClass} w-full p-3 text-[15px]`}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <BookCallButton id="nav-book-call-mobile" className="mt-2 w-full justify-center" />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
