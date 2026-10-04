# Sync Chron Tech — Website

Static marketing site built with plain HTML, CSS, and JavaScript (no build step).

## Structure

```
index.html            Page markup (hero section)
src/styles/main.css   Design tokens, layout, components, responsive rules
src/scripts/main.js   Navbar dropdowns, mobile menu, card parallax/tilt, logo marquee
assets/               Images, logos, and icons from Figma
```

## Development

Serve the project root with any static server, then open http://localhost:3000:

```sh
npx --yes serve -l 3000 .
```

Opening `index.html` directly also works, but a server is recommended.

## Hero background layers (bottom → top)

1. `sky.png`
2. Glass overlay — `rgba(255,255,255,0.24)` + `backdrop-filter: blur(10.16px)`
3. Interactive cards — `hero-card-1/2/3.png`
4. `grass.png`
5. Bottom fade — dark gradient + `blur(16px)` (keeps brand logos legible)

Cards and grass share a "scene" container locked to the Figma aspect ratio
(1416 × 797), so they stay aligned at any viewport size.
