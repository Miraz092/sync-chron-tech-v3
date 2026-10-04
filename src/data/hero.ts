export const navLinks = [
  {
    label: "Services",
    items: [
      { label: "Web Development", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "UI/UX Design", href: "#" },
      { label: "Cloud & DevOps", href: "#" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "ERP Suite", href: "#" },
      { label: "CRM Platform", href: "#" },
      { label: "Analytics", href: "#" },
    ],
  },
  { label: "Case Studies", href: "#" },
  {
    label: "Company",
    items: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  { label: "Pricing", href: "#" },
];

/**
 * Card placement as % of the 1416 × 797 scene (measured from the design).
 * `depth` controls parallax strength; order = back → front.
 */
export const heroCards = [
  { id: "design", src: "/assets/hero-card-1.png", w: 384, h: 589, left: 61.16, top: 32.12, width: 12.64, depth: 10, floatDelay: 0 },
  { id: "scale", src: "/assets/hero-card-3.png", w: 289, h: 513, left: 81.85, top: 29.61, width: 10.24, depth: 14, floatDelay: 2.4 },
  { id: "build", src: "/assets/hero-card-2.png", w: 308, h: 571, left: 71.47, top: 24.34, width: 11.09, depth: 18, floatDelay: 1.2 },
];

/**
 * Brand logos.
 * `h`    = optical display height (px) so every logo reads as the same size.
 * `crop` = transparent padding baked into the PNG (native px), plus artwork height `ch`.
 */
export const brandLogos = [
  { name: "Salextra", src: "/assets/logos/brand-1.svg", w: 112, h0: 28, h: 34 },
  { name: "Moda V'Lore", src: "/assets/logos/brand-2.svg", w: 163, h0: 32, h: 30 },
  { name: "MRJN", src: "/assets/logos/brand-3.png", w: 172, h0: 57, h: 33, crop: { ch: 29, t: 14, r: 29, b: 14, l: 20 } },
  { name: "Azmee Global Ventures", src: "/assets/logos/brand-4.png", w: 172, h0: 57, h: 34, crop: { ch: 31, t: 13, r: 24, b: 13, l: 20 } },
  { name: "Agriculture Ventures Ltd", src: "/assets/logos/brand-5.png", w: 155, h0: 57, h: 36, crop: { ch: 31, t: 13, r: 20, b: 13, l: 21 } },
  { name: "Environment Protection Society", src: "/assets/logos/brand-6.png", w: 134, h0: 57, h: 40, crop: { ch: 33, t: 13, r: 21, b: 11, l: 20 } },
  { name: "OMPHD", src: "/assets/logos/brand-7.png", w: 172, h0: 57, h: 30, crop: { ch: 24, t: 16, r: 24, b: 17, l: 21 } },
  { name: "The 4 Hands", src: "/assets/logos/brand-8.png", w: 134, h0: 57, h: 39, crop: { ch: 31, t: 14, r: 21, b: 12, l: 22 } },
];
