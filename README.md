# M. Daffa Raygama — Portfolio

> Personal portfolio of **M. Daffa Raygama**, Junior AI Engineer at PT Sigma Cipta Utama.  
> Built to showcase production LLM systems, real-time AI infrastructure, and open-source work.  
> Includes interactive blog visualizations for technical writing on transformers and AI systems.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Pages & Routes](#pages--routes)
- [Blog System](#blog-system)
- [Interactive Visualizations](#interactive-visualizations)
- [Design System](#design-system)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

This is the second version of my personal portfolio. It's a static Next.js site with:

- **Hero section** with typewriter role animation and live wink effect
- **AURA project spotlight** — featured case study with Live2D emotion preview
- **Case studies** for Rizzy Bytes and Sunkatsu App with screenshot lightbox
- **Technical blog** with hand-built interactive visualizations (no D3, no Chart.js — pure React + SVG)
- **About, Papers, and Projects** pages with full detail

The entire visual system runs off CSS custom properties — one `globals.css` file owns all design tokens, layout, and component styles.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS v4 + custom CSS (globals.css) |
| **Animation** | CSS-only (framer-motion available but unused) |
| **Fonts** | Syne (headings), JetBrains Mono (mono), Caveat (accent) via `next/font/google` |
| **Deployment** | Vercel |
| **Package Manager** | npm |

---

## Project Structure

```                        # Next.js app root (git repo lives here)
├── app/
│   ├── page.tsx              # Home — Hero, AURA spotlight, case studies, blog strip
│   ├── layout.tsx            # Root layout — fonts, metadata, NavBar wrapper
│   ├── globals.css           # Entire design system: tokens, layout, all component styles
│   ├── about/
│   │   └── page.tsx          # /about — bio, experience timeline, skills
│   ├── blog/
│   │   ├── page.tsx          # /blog — post listing (cards from lib/posts.ts)
│   │   ├── [slug]/
│   │   │   └── page.tsx      # /blog/:slug — rendered post with dynamic import
│   │   ├── components/
│   │   │   ├── AttentionViz.tsx   # Self-attention heatmap (interactive)
│   │   │   ├── EmbeddingViz.tsx   # Word embedding 2D scatter (SVG)
│   │   │   └── TokenizerViz.tsx   # BPE tokenizer demo (interactive chips)
│   │   └── posts/
│   │       └── how-transformers-work.tsx  # Post content component
│   ├── papers/
│   │   └── page.tsx          # /papers — academic papers list
│   └── projects/
│       └── aura/
│           └── page.tsx      # /projects/aura — full AURA case study
├── components/
│   ├── NavBar.tsx            # Top navigation (scroll-aware)
│   ├── Lightbox.tsx          # Full-screen image lightbox
│   └── Icons.tsx             # SVG icon components
├── lib/
│   └── posts.ts              # Blog post registry (add new posts here)
├── public/
│   └── assets/               # Static images served at /assets/*
│       ├── aura/             # AURA project screenshots + Live2D frames
│       ├── rizzy/            # Rizzy Bytes screenshots
│       ├── sunkatsu/         # Sunkatsu App screenshots
│       └── blogs/            # Blog cover images
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── .gitignore
```

---

## Getting Started

### Prerequisites

- **Node.js** 20 or higher — [nodejs.org](https://nodejs.org)
- **npm** (comes with Node)
- That's it. No database, no backend, no environment variables needed.

### 1. Clone

```bash
git clone https://github.com/Raygama/Portofolio.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Hot reload is enabled — editing any file under `app/` updates the browser instantly.

---

## Architecture

### Rendering Strategy

All pages are **`'use client'`** — there are no React Server Components currently. This keeps the architecture simple: every page is a client-side React component with full access to browser APIs (IntersectionObserver for scroll reveals, setInterval for animations, etc.).

Pages are statically generated at build time (`○ Static` in the build output), except `/blog/[slug]` which uses `generateStaticParams` (`● SSG`).

### Request Lifecycle

```
Browser → Vercel CDN → Static HTML (pre-rendered)
                          ↓
                    React hydrates
                          ↓
                  Client-side interactions
                  (typewriter, lightbox, viz hover, etc.)
```

### Font Loading

Fonts are loaded in `app/layout.tsx` via `next/font/google` and exposed as CSS variables:

```css
--font-heading: var(--font-syne), 'Syne', sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: var(--font-jetbrains), 'JetBrains Mono', monospace;
--font-accent: var(--font-caveat), 'Caveat', cursive;
```

### Scroll Reveal

A `useReveal()` hook (defined in `app/page.tsx` and `app/projects/aura/page.tsx`) wires up an `IntersectionObserver` to any element with class `reveal`. When 10% of the element enters the viewport, the `in` class is added, triggering a CSS fade-in + translateY animation.

```tsx
// Usage: add class="reveal" to any element
<div className="case-study reveal">...</div>
```

### Static Assets

Images live under `public/assets/` and are referenced in JSX as `/assets/aura/aura-01-idle.png` etc. Next.js serves everything under `public/` at the root path.

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home — hero, AURA spotlight, case studies, other projects, about snapshot, blog strip, contact |
| `/about` | `app/about/page.tsx` | Full bio, experience timeline, skills, contact |
| `/blog` | `app/blog/page.tsx` | Blog post listing — sourced from `lib/posts.ts` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual post — dynamically imports post component |
| `/papers` | `app/papers/page.tsx` | Academic papers and research |
| `/projects/aura` | `app/projects/aura/page.tsx` | Full AURA case study — pipeline, demo video, emotion gallery |

---

## Blog System

### Adding a New Post

**1. Create the post content component** at `app/blog/posts/your-slug.tsx`:

```tsx
export default function YourPost() {
  return (
    <>
      <p className="bp-lede">Intro paragraph with left teal border.</p>
      <h2>Section Title</h2>
      <p>Body text...</p>
      {/* Drop in any viz component */}
      <MyVizComponent />
    </>
  );
}
```

**2. Register it in `lib/posts.ts`:**

```ts
export const POSTS: Post[] = [
  {
    slug: 'your-slug',
    title: 'Your Post Title',
    date: '2026-06-01',           // ISO 8601
    readingTime: '8 min read',
    tags: ['AI', 'LLM'],
    excerpt: 'One paragraph summary shown on the listing page.',
    coverImage: '/assets/blogs/your-cover.png',  // optional
  },
  // ...existing posts
];
```

**3. Register the dynamic import** in `app/blog/[slug]/page.tsx`:

```ts
const POST_COMPONENTS: Record<string, () => Promise<...>> = {
  'your-slug': () => import('@/app/blog/posts/your-slug'),
  // ...
};
```

The post immediately appears on `/blog`, in the homepage blog strip, and is accessible at `/blog/your-slug`.

### Blog Post Styling Classes

All blog content is wrapped in `.blog-post-body` (720px centered column). Available utility classes:

| Class | Use |
|---|---|
| `.bp-lede` | Large intro paragraph with teal left border |
| `.bp-callout.teal` / `.amber` | Callout box with accent border |
| `.bp-formula` | Centered monospace formula block |
| `.bp-references` | Styled reference list |

---

## Interactive Visualizations

Three custom React visualizations live in `app/blog/components/`. All are built with plain React state + SVG — no visualization library.

### `TokenizerViz`

Demonstrates BPE tokenization. Select a sentence and see:
- **Colored inline split** — the sentence with each token highlighted in its accent color
- **Token chips** — each token with its GPT-2 vocabulary ID

### `AttentionViz`

Self-attention heatmap for the sentence *"The cat sat on the mat because it was sleepy."*

- 10×10 grid of pre-computed attention weights
- Hover a row word to see its full attention distribution
- Default state shows "it" attending strongly to "cat" (coreference resolution demo)
- Column highlight tracks the max-attended token for the active row
- Heat color scale: dark blue (low attention) → bright amber (high attention), normalized to the data range

### `EmbeddingViz`

2D projection of word embedding space (hand-placed coordinates illustrating real clustering behavior):

- **Cluster halos** — dashed ellipses showing royalty / animal / food / tech groups
- **Analogy arrows** — dashed lines from `man→king` and `woman→queen` showing the parallel gender offset vector
- Hover any word for glow + label emphasis
- Invisible `r=5` hit areas for comfortable hover targets on small dots

---

## Design System

Everything lives in `app/globals.css`. No component library, no Tailwind config file — just CSS custom properties and BEM-like class names.

### Color Tokens

```css
--bg-primary:    #0A0A0F   /* page background */
--bg-secondary:  #111118   /* card backgrounds */
--bg-tertiary:   #1A1A24   /* elevated surfaces */
--text-primary:  #F0EEE8
--text-secondary:#8A8899
--text-tertiary: #4A4860
--accent-amber:  #F59E0B   /* primary accent — CTAs, highlights */
--accent-teal:   #2DD4BF   /* secondary accent — code, links */
--accent-purple: #7C3AED
--accent-rose:   #F43F5E
--accent-green:  #4ADE80
```

### Layout

```css
.page          /* max-width: 1240px, centered, 32px horizontal padding */
.section       /* vertical padding sections */
.page-header   /* page title sections with glow orbs */
```

### Key Component Classes

| Class | Description |
|---|---|
| `.viz-card` | Bordered card shell for interactive visualizations |
| `.blog-feat-card` | Blog post card on the listing page |
| `.other-row` | Project row in the "Other Projects" list |
| `.case-study` | Full case study block with gallery |
| `.btn` / `.btn-primary` | CTA buttons |
| `.tag-pill` / `.tag-pill.amber` | Colored tag chips |
| `.reveal` | Scroll-reveal target (gets `.in` class on viewport entry) |
| `.terminal-prefix` | Monospace breadcrumb/path line |

### Typography Scale

Headings use **Syne** (geometric sans), body uses **Inter**, code/mono uses **JetBrains Mono**, accent/handwritten uses **Caveat**.

---

## Available Scripts

Run from the `root` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` with Turbopack |
| `npm run build` | Production build — runs TypeScript check + static generation |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |

### Useful one-liners

```bash
# Check for TypeScript errors without building
npx tsc --noEmit

# See all statically generated routes
npm run build 2>&1 | grep -E "○|●"

# Analyze bundle size (requires @next/bundle-analyzer)
ANALYZE=true npm run build
```

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic deploy.

### First-time Setup

**1. Push to GitHub:**

```bash
git remote add origin https://github.com/Raygama/porto-v2.git
git branch -M main
git add .
git commit -m "Initial portfolio commit"
git push -u origin main
```

**2. Import on Vercel:**

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo
3. Hit **Deploy**

No environment variables required — the site is fully static.

### Subsequent Deploys

```bash
git add .
git commit -m "your message"
git push
```

Vercel picks it up automatically.

### Manual Deploy via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

### Build fails with "Static generation failed"

Usually a runtime error in a page component. Run:

```bash
npm run build 2>&1
```

Look for the specific page that failed. Common cause: using `window` or `document` at module level (not inside `useEffect`).

### Images not loading (`/assets/...` returns 404)

All images must be under `/public/assets/`. Check the path:

```
/public/assets/aura/aura-01-idle.png  →  /assets/aura/aura-01-idle.png  ✓
/assets/aura/aura-01-idle.png         →  404                             ✗
```

### Fonts look wrong / fallback fonts showing

Google Fonts are loaded via `next/font` in `app/layout.tsx`. If you see system fonts, the CSS variables aren't applying. Check that `--font-syne`, `--font-jetbrains`, and `--font-caveat` are set on `:root` in `globals.css` and that the font variables from layout are passed through correctly.

---

## License

Personal portfolio — all rights reserved. Feel free to take inspiration from the code; just don't copy content (bio, project descriptions, images) as your own.

---

*Built with Next.js 16 · Deployed on Vercel · South Tangerang, Indonesia*
