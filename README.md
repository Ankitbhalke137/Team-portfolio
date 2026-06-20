# SynthSpace — Agency Portfolio

> **We Build Award-Winning Experiences**

A modern, single-page agency portfolio website built with **vanilla HTML, CSS, and JavaScript (ES6 Modules)** — zero frameworks, zero build tools, zero dependencies. Features a dual dark/light theme engine, scroll-triggered animations, particle effects, 3D card tilt interactions, and a fully validated contact form.

## Live Site

**[https://ankitbhalke137.github.io/Team-portfolio/](https://ankitbhalke137.github.io/Team-portfolio/)**

## Sections

| Section | ID | Description |
|---|---|---|
| Home | `#hero` | Hero banner with particle canvas, parallax effect, and CTA buttons |
| Our Team | `#team` | Four team member cards with 3D tilt and skill tags |
| Projects | `#projects` | Six project showcase cards with status badges and action links |
| Contact | `#contact` | Contact form with real-time validation and simulated submission |

## Features

### Theme System
- Dark/light mode toggle with smooth transitions
- Persists preference to `localStorage` (`portfolio-theme`)
- Respects `prefers-color-scheme: dark` on first visit
- Anti-FOUC inline script loads theme before the stylesheet

### Animations & Effects (`js/motion.js`)
- **Scroll reveals** — IntersectionObserver-driven fade-in for all sections
- **Particle system** — Canvas-based floating particles (gold in dark mode, blue in light mode)
- **Custom cursor** — Lerp-following dot with hover scaling on interactive elements
- **Card mouse glow** — Radial gradient glow that follows the cursor on project cards
- **3D card tilt** — Perspective transform on team cards based on mouse position
- **Nav scroll behavior** — Auto-hides header on scroll down, reveals on scroll up
- **Hero parallax** — Subtle background parallax on the hero section
- All effects respect `prefers-reduced-motion: reduce`

### Team Section (`js/team.js`)
- Team data rendered dynamically into an `#team-grid`
- Each card shows avatar (via `ui-avatars.com`), name, role, skill tags, GitHub, and LinkedIn links
- Staggered reveal delays for sequential card entrance animations

### Projects Section (`js/projects.js`)
- Six projects rendered dynamically into `#projects-grid`
- Each card has an inline SVG icon, title, description, status badge (Active / Completed), and buttons for GitHub Repo and Live Demo

### Contact Form (`js/utils.js`)
- Real-time validation on `input` and `blur` events
- Validation rules: name (3+ chars, letters/spaces), email (RFC-like regex), message (20+ chars)
- Simulated submission with 1.5s loading spinner
- Success banner with 4-second auto-dismiss

### Accessibility
- Skip-to-content link
- Semantic HTML landmarks (`header`, `main`, `section`, `nav`, `footer`, `article`)
- ARIA attributes (`aria-label`, `aria-expanded`, `aria-controls`, `role`, `aria-hidden`)
- Keyboard-closeable mobile nav (`Escape` key)
- `loading="lazy"` on images, `rel="noopener noreferrer"` on external links
- Focus-visible ring styles
- WCAG 2.1 AA contrast compliance for both themes

### Responsive Design
- Mobile-first layout with breakpoints at 640px, 768px, and 1024px
- Hamburger navigation collapses to inline nav on wider screens
- Card grids: 1 column → 2 columns (768px) → 3 columns (1024px, projects only)

## Tech Stack

| Layer | Technology |
|---|---|
| HTML | Semantic HTML5 |
| CSS | Custom properties, `backdrop-filter` glassmorphism, CSS Grid, Flexbox, SVG noise texture |
| JavaScript | ES6 Modules, `IntersectionObserver`, `requestAnimationFrame`, Canvas 2D API |
| Fonts | Playfair Display (headings), Inter (body) — via Google Fonts CDN |
| Polyfill | `smoothscroll-polyfill` via unpkg (loaded only for older browsers) |
| Icons | Inline SVG paths — no icon library dependency |

## Project Structure

```
├── index.html           # Single HTML entry point
├── styles.css           # All styles, theming, responsive (1160 lines)
├── js/
│   ├── app.js           # Main entry module — bootstraps everything
│   ├── utils.js         # Theme persistence, form validation
│   ├── motion.js        # Animations, parallax, cursor, particles
│   ├── team.js          # Team data model + card rendering
│   └── projects.js      # Projects data model + card rendering
├── prompts/             # Internal development prompts (gitignored)
└── README.md
```

## Getting Started

No build step, no package install — just serve the directory:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# VS Code
npx live-server
```

Open `http://localhost:8000` in your browser.

## Color Palette

| Token | Light Mode | Dark Mode |
|---|---|---|
| Background | `#e4e5e9` | `#0a0a0a` |
| Surface | `#ffffff` | `#161616` |
| Accent | `#0066cc` (Blue) | `#d4af37` (Gold) |
| Text Primary | `#000000` | `#ffffff` |
| Text Secondary | `#444444` | `#a0a0a0` |

## Team

| Name | Role |
|---|---|
| Kshitij Das | Frontend Developer |
| Ankit Bhalke | Full-Stack Developer |
| Sai Shendge | UI/UX Designer |
| Dhruv Teja | DevOps Engineer |
