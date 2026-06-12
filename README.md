# Malhotra Sons India, Website

Single-page website for Malhotra Sons India, Delhi's wholesale tyre
distributor since 1995. Clean editorial design (inspired by serverobotics.com):
off-white canvas, bold Bricolage Grotesque headlines, orange accent, hairline
borders. Built with React, Tailwind CSS v4, Three.js (React Three Fiber) and
Framer Motion.

## Run locally

```bash
npm install
npm run dev      # opens at http://localhost:5173
```

## Build for production

```bash
npm run build    # output in dist/
npm run preview  # preview the production build
```

The `dist/` folder is a fully static site, host it anywhere
(Vercel, Netlify, Hostinger, GoDaddy, etc.).

## Editing business details

All business content lives in one file: [`src/data.js`](src/data.js)

- **Phone / WhatsApp number**, `BUSINESS.phone` and `BUSINESS.phoneIntl`
- **Address**, `BUSINESS.address` (currently "Delhi, India", replace with
  the full shop address)
- **Google Maps pin**, `BUSINESS.mapsQuery` (text searched on Google Maps
  for the embed)
- **Pre-filled WhatsApp message**, `BUSINESS.whatsappMessage`
- **Brands, categories, "why us" points**, arrays in the same file

## Structure

- `src/components/Hero.jsx`, pinned scrollytelling hero (3 headline stages over 320vh)
- `src/components/TyreScene.jsx`, scroll-driven 3D wheel (`public/tyre.glb`,
  Draco-compressed from the Jaguar wheel model; parts recoloured by mesh name,
  caliper stays static while the wheel rolls)
- `src/components/`, one file per page section
- `src/index.css`, colours, fonts and animation theme (Tailwind v4)

The original model source files (`*.FBX`, `*.obj`, `*.max`, `*.rar`) in the
project root are not used by the site and are git-ignored; only
`public/tyre.glb` ships.
