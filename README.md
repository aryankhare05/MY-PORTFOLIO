# Aryan — Developer Portfolio

A modern, dark, single-page developer portfolio for **Aryan** — B.Tech
Information Technology student and aspiring full-stack developer. Built with
React and Vite, using a solid dark color system (no glassmorphism, no
blur/transparency) with one accent color for emphasis.

## Sections

- **Hero** — name, role, a short intro, "View My Work" / "Download Resume"
  CTAs, and social links.
- **About** — quick-fact stats, education, full bio, and interest tags.
- **Skills** — categorized skill badges (Languages, Frontend, Backend,
  Databases, Tools).
- **Projects** — a responsive card grid (WanderLust, Garbage Detection,
  Video Conferencing Web App) with tech stack, key features, and
  GitHub/live-demo buttons.
- **Contact** — contact links plus a frontend-only contact form (clearly
  labeled as a demo — no backend is wired up).
- **Footer** — social links and a back-to-top button.

The navbar is sticky, highlights the section currently in view (scroll-spy),
and collapses into a mobile menu below 860px.

## Technologies used

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- Plain CSS (custom properties / design tokens, no CSS framework)
- No icon library — a small hand-rolled inline-SVG icon set (`src/components/Icon.jsx`)
- No animation library — a small `IntersectionObserver`-based `Reveal`
  component handles fade-up-on-scroll; everything respects
  `prefers-reduced-motion`.

## Design system

- **Background**: `#08090D` (page), `#0C0E14` (alternating sections), `#12141B` (cards)
- **Text**: `#F5F5F7` (primary), `#9CA3AF` (secondary)
- **Accent**: `#2DD4BF` (teal) — the only accent color, used for headings,
  active nav state, buttons, and small highlights
- **Type**: Space Grotesk for headings, Inter for body text, JetBrains Mono
  for small uppercase labels

All tokens live in `src/styles/variables.css` — change them there to
re-theme the whole site.

## Project structure

```
aryan-os/
├── index.html
├── package.json
├── vite.config.js
├── public/                  # static assets — your resume, photo, project screenshots
└── src/
    ├── main.jsx              # entry point, imports global + section CSS
    ├── App.jsx                # renders Navbar, Hero, About, Skills, Projects, Contact, Footer
    ├── data/                  # <-- your personal info lives here
    │   ├── profile.js         #   name, title, bio, interests, education, photo path
    │   ├── links.js           #   email, LinkedIn, GitHub, LeetCode, resume
    │   ├── skills.js          #   skill categories
    │   └── projects.js        #   project list
    ├── utils/
    │   └── isPlaceholder.js   # hides any field still left as "[ADD ...]"
    ├── hooks/
    │   └── useActiveSection.js  # scroll-spy for the navbar
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Projects.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── Reveal.jsx           # fade-up-on-scroll wrapper
    │   └── Icon.jsx             # inline SVG icon set
    └── styles/
        ├── variables.css        # design tokens (colors, type, spacing)
        ├── global.css           # resets, layout helpers, shared elements
        ├── navbar.css
        ├── hero.css
        ├── about.css
        ├── skills.css
        ├── projects.css
        ├── contact.css
        └── footer.css
```

## Installation

Requires Node.js 18+.

```bash
npm install
```

## Running locally

```bash
npm run dev
```

Starts the Vite dev server (default `http://localhost:5173`) with hot reload.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## Customization

Everything personal lives in `src/data/` — you shouldn't need to touch
component code to update your info:

- `src/data/profile.js` — name, title, intro paragraphs, interests, education, photo path
- `src/data/links.js` — email, LinkedIn, GitHub, LeetCode, resume URL/path
- `src/data/skills.js` — skills grouped by category
- `src/data/projects.js` — your project list

Any field still left as `[ADD ...]` (a placeholder) is automatically hidden
from the live site instead of showing the bracket text — fill it in and it
appears automatically (see `src/utils/isPlaceholder.js`).

**Photo**: put your image in `public/` and set `photo: '/your-file.jpg'` in
`profile.js`.

**Resume**: put your PDF in `public/` and set `resumeUrl: '/resume.pdf'` in
`links.js` — the navbar and hero "Download Resume" buttons appear
automatically once this is set.

### Adding a new project

Push a new object into the `projects` array in `src/data/projects.js`,
matching the shape of the existing entries. It appears in the Projects grid
automatically.

### Adding a new skill category

Push a new `{ id, label, skills }` object into `skillCategories` in
`src/data/skills.js`.

## Deployment

Static Vite build — deploy to any static host.

**Vercel / Netlify (recommended)**
1. Push this project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Build command: `npm run build` — Output directory: `dist`.
4. Deploy — you get a live URL on every push.

**GitHub Pages**
1. `npm run build` to generate `dist/`.
2. Deploy the contents of `dist/` to a `gh-pages` branch.
3. `vite.config.js` already sets `base: './'` so asset paths work from a project subpath.
