# Noore Huda Online Quran Academy

A web-based platform for an online educational service specializing in Quranic studies.

## Tech Stack

- **Frontend:** HTML/CSS/Vanilla JS (main site) + React 19 + TypeScript + Vite 6 + Tailwind CSS 4
- **Package Manager:** npm
- **Build Tool:** Vite

## Project Structure

```
.
├── index.html          # Main landing page
├── about.html          # About page
├── droos.html          # Lessons/Droos page
├── main.js             # Site logic (mobile menu, slider, forms)
├── styles.css          # Primary stylesheet
├── logo.svg            # Site logo
├── src/                # React/TypeScript source
│   ├── main.tsx        # React entry point
│   ├── App.tsx         # Root React component
│   └── index.css       # Tailwind CSS imports
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Development

- **Workflow:** "Start application" runs `npm run dev`
- **Port:** 5000 (configured in vite.config.ts)
- **Host:** 0.0.0.0 with allowedHosts: true for Replit proxy compatibility

## Deployment

- **Type:** Static site
- **Build command:** `npm run build`
- **Output directory:** `dist`
