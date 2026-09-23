# ❄️ Yoshino's Home (四糸乃の家) — Tribute Showcase

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-yoshino--home.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://yoshino-home.vercel.app)
[![Sanity Studio](https://img.shields.io/badge/Sanity%20Studio-yoshino--home.sanity.studio-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://yoshino-home.sanity.studio)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Yoshino--home-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MonoDuckY/Yoshino-home)
[![Design Spec](https://img.shields.io/badge/Design%20Spec-DESIGN__SPEC.md-3B9DD2?style=for-the-badge&logo=markdown&logoColor=white)](./DESIGN_SPEC.md)

<br />

![React 19](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Sanity.io](https://img.shields.io/badge/Sanity.io_v3-F03E2F?style=flat-square&logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Serverless-000000?style=flat-square&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

<br />

**A refined digital sanctuary and fan-made tribute dedicated to Yoshino Himekawa (*Spirit No. 02 — The Hermit*) from the iconic series *Date A Live*.**  
*Crafted with a cozy "Warm Winter Daylight" atmosphere, high-end visual art, physical acrylic standee aesthetics, seamless micro-interactions, and a production-grade cloud architecture.*

</div>

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Live Deployments](#-live-deployments)
3. [Key Features & Highlights](#-key-features--highlights)
4. [Technical Architecture & Stack](#-technical-architecture--stack)
5. [Directory Structure](#-directory-structure)
6. [Getting Started & Local Development](#-getting-started--local-development)
7. [Engineering Specification Hub](#-engineering-specification-hub)
8. [Design Specification](#-design-specification)
9. [Copyright, Attribution & Disclaimer](#-copyright-attribution--disclaimer)

---

## 🎯 Project Overview

**Yoshino's Home** is a premium, fan-made non-profit tribute web application created to celebrate **Yoshino Himekawa (四糸乃)** and her companion spirit **Zadkiel / puppet Yoshinon (よしのん)** from *Date A Live* (authored by Kōshi Tachibana and illustrated by Tsunako).

### Engineering Methodology & Mission
Rather than relying on unguided "vibe coding", this project serves as an end-to-end case study in **spec-driven, industrial-grade web engineering**:
- **Spec-First Engineering**: Rigorous PRD (Product Requirements Document), DRD (Design Requirements Document), and explicit Architectural Decision Logs maintained in [`spec/`](./spec) and [`DESIGN_SPEC.md`](./DESIGN_SPEC.md).
- **Component-Driven Architecture**: Structured around atomic design tokens, isolated UI primitives, fully typed contracts with TypeScript, and zero runtime overhead.
- **Production Cloud Decoupling**: Complete separation between the Frontend SPA (hosted on Vercel Global Edge Network), Serverless Mutation API (`/api/guestbook`), and Headless Content Management (Sanity Studio Cloud).

---

## 🌐 Live Deployments

| Resource | URL | Description |
|---|---|---|
| 🌐 **Production Website** | [https://yoshino-home.vercel.app](https://yoshino-home.vercel.app) | Public tribute showcase optimized globally via Vercel Edge Network |
| 🎨 **Sanity Studio Cloud** | [https://yoshino-home.sanity.studio](https://yoshino-home.sanity.studio) | Cloud-hosted Sanity Studio v3 CMS for gallery curation and guestbook moderation |
| 📁 **GitHub Repository** | [MonoDuckY/Yoshino-home](https://github.com/MonoDuckY/Yoshino-home) | Open-source codebase, design specifications, and CI/CD pipelines |

---

## ✨ Key Features & Highlights

### 1. ❄️ "Top" Showcase: Acrylic Pedestal & Hololive Wardrobe Switcher
- **Official Form Switcher**: Seamlessly switch between 3 canonical character appearances:
  - 🧥 **Normal Form**: Warm everyday winter coat with rabbit-ear hood.
  - 🏫 **School Uniform**: Raizen High School student uniform.
  - 👘 **Spirit Form**: Astral Dress (*Zadkiel Coat*).
- **Physical Frosted Acrylic Stage**: Dual-ring frosted acrylic pedestal with realistic ground ambient occlusion (`radial-gradient` shadow) and a continuous 4.8s gentle breathing animation.
- **Hololive-style Circular Selector**: Vertical docked circular avatar selector with individual facial focus coordinates (`avatarPosition` and `avatarScale`) ensuring facial centers are always framed accurately.
- **Full-Viewport Crystalline Snowfall**: GPU-accelerated HTML5 Canvas particle engine delivering a steady 60 FPS with automatic `requestAnimationFrame` pausing when the browser tab is inactive (`document.hidden === true`).
- **Poetic Bilingual Typography**: High-contrast geometric headings in Google Font `Outfit`, paired with graceful Japanese calligraphy in `Klee One` for Yoshino's iconic voice quote.

### 2. 🖼️ Curated Vertical Masonry Gallery
- **Zero-Crop Architecture**: Preserves 100% of the original artist's aspect ratio (16:9, 4:3, 3:4, 1:1) with explicit container aspect-ratios, ensuring Cumulative Layout Shift (**CLS < 0.05**).
- **Interactive Multi-Column Masonry**: Pure CSS vertical columns (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5`) providing smooth, trap-free vertical scrolling.
- **Fisher-Yates Random Shuffle**: The *"All works"* tab automatically randomizes artwork order on each session visit, offering fresh discovery on every page load.
- **Instant Category Filtering**: Four client-side filter states: `All`, `Official Art`, `Community Fanart`, and `Collaborations`.
- **Transparent Attribution**: Hover overlays smoothly slide up to present the artwork title, verified artist handle, platform badge, and a secure 1-click external link to the source post (`target="_blank" rel="noopener noreferrer"`).
- **Responsive Lightbox Modal**: High-definition artwork inspection modal with escape key navigation and full attribution metadata.

### 3. 💌 Winter Hearth Noticeboard (Visitor Guestbook)
- **Crystalline Sticky Note Board**: Visitors can leave 140-character heartfelt wishes along with custom emotive stamps (❄️ Snow crystal, 💙 Blue heart, 🐰 Rabbit, ✨ Sparkle, 🍵 Warm tea).
- **Metallic Pushpin Aesthetics**: Notes appear as translucent frosted glass slips fastened with realistic metallic pushpins.
- **Secure Serverless API**: Submissions are routed through a Vercel Serverless Function (`/api/guestbook`), ensuring the sensitive write token (`SANITY_WRITE_TOKEN`) **is never exposed in the client-side bundle**.
- **Real-Time Optimistic Updates**: New messages appear immediately in the interface with zero layout jitter and persist permanently to Sanity Cloud.

### 4. ⚖️ Two-Tier Legal Attribution & 24h Takedown Policy
- **Tier 1 (Minimal Dark Footer)**: Clean, non-intrusive legal notice attributing the *Date A Live* franchise to Kōshi Tachibana, Tsunako, and KADOKAWA Corporation.
- **Tier 2 (Credits & Disclaimer Slide-over Modal)**:
  - Strict non-commercial and non-profit pledge (no ads, no monetization, fan-funded).
  - Explicit artist copyright protection and clear attribution policy.
  - Dedicated **1-Click Copy Email** (`pvietduc204@gmail.com`) and **Direct Gmail Web Compose** buttons guaranteeing a 24–48 hour takedown turnaround upon request.

---

## 🛠️ Technical Architecture & Stack

```
+---------------------------------------------------------------------------------+
|                                 VISITOR CLIENT                                  |
|         (React 19 + TypeScript + Vite 6 + Tailwind v4 + Framer Motion)          |
+----------------------------------------+----------------------------------------+
                                         |
                       +-----------------+-----------------+
                       |                                   |
                (Fetch Artworks &                    (POST Guestbook
                 Guestbook Entries)                      Entry)
                       |                                   |
                       v                                   v
+-------------------------------+         +-------------------------------------+
|        SANITY.IO CLOUD        |         |      VERCEL SERVERLESS FUNCTION     |
|   Headless Content Lake API   | <====== |         (/api/guestbook.js)         |
|  - Artworks Dataset           | (Write) |  - Input validation                 |
|  - Guestbook Dataset          |         |  - Server-side SANITY_WRITE_TOKEN   |
+---------------+---------------+         +-------------------------------------+
                ^
                | (Manage / Edit / Moderate)
+---------------+---------------+
|      SANITY STUDIO CLOUD      |
| (yoshino-home.sanity.studio)  |
+-------------------------------+
```

### Technology Breakdown

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 19 + TypeScript 5.8 | High-performance component rendering and strict type safety |
| **Build Tool** | Vite 6 | Instant HMR development server and tree-shaken production bundles |
| **Styling & Tokens** | Tailwind CSS v4 (`@theme`) | Atomic design tokens, modern CSS custom properties, minimal bundle footprint |
| **Motion Physics** | Framer Motion 13 | Physics-based spring animations, layout transitions, and dialog entrances |
| **CMS Data Fetching** | `@sanity/client` + GROQ | Structured content retrieval from Sanity Content Lake |
| **Serverless Backend** | Vercel Edge Serverless | Server-side request validation and secure write operations |
| **Content Management** | Sanity.io Studio v3 | Dedicated web dashboard for artwork management and guestbook moderation |

---

## 📁 Directory Structure

```text
yoshinos-home/
├── api/                       # Vercel Serverless Functions
│   └── guestbook.js           # Secure guestbook mutation API (utilizing SANITY_WRITE_TOKEN)
├── public/                    # Static public assets (favicons, og-image, svg icons)
├── sanity/                    # Frontend Sanity client configuration
│   └── client.ts              # @sanity/client instance for Content Lake queries
├── spec/                      # Project Engineering Hub (Single Source of Truth)
│   ├── README.md              # Overview of engineering documents
│   ├── REQUIREMENTS.md        # PRD, DRD, Decision Logs (DEC-01 to DEC-34), Data Contracts
│   └── CHANGELOG.md           # Development history from Sprint 1 to Sprint 7
├── src/                       # Frontend application source code
│   ├── assets/                # Transparent character standee graphics (WebP Retina 2x)
│   ├── components/
│   │   ├── layout/            # Fixed Navbar, navigation links, snow toggle
│   │   ├── sections/          # TopSection, GallerySection, GuestbookSection, Footer
│   │   └── ui/                # ArtworkCard, FilterBar, SnowCanvas, CreditsModal
│   ├── data/                  # Static fallback mock data for offline resilience
│   ├── hooks/                 # Custom React hooks (snow particles, animation states)
│   ├── lib/                   # Utility helpers and formatters
│   ├── types/                 # Shared TypeScript interfaces (Artwork, Guestbook, Dossier)
│   ├── App.tsx                # Application root orchestrating sections and modals
│   ├── index.css              # Tailwind CSS v4 @theme design tokens and typography imports
│   └── main.tsx               # React DOM entry point
├── studio/                    # Independent Sanity Studio project
│   ├── schemaTypes/           # Sanity schema definitions (artwork.ts, guestbook.ts)
│   ├── sanity.config.ts       # Sanity Studio project configuration
│   └── package.json           # Studio dependencies and deployment scripts
├── DESIGN_SPEC.md             # Comprehensive UI/UX Design System Specification
├── vercel.json                # Vercel routing rules and edge cache headers
├── vite.config.ts             # Vite configuration with Tailwind CSS v4 integration
└── package.json               # Frontend dependencies and npm scripts
```

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- **Node.js**: Version `>= 18.0.0` (Node 20 LTS or later recommended).
- **npm**, **pnpm**, or **yarn**.
- A [Sanity.io](https://www.sanity.io/) account (optional, for deploying your own studio).

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/MonoDuckY/Yoshino-home.git
cd yoshinos-home

# Install Frontend dependencies
npm install

# Install Sanity Studio dependencies
npm --prefix studio install
```

### 3. Environment Variables Configuration
Create a `.env` file in the project root based on [`.env.example`](.env.example):
```env
# Sanity Project Configuration
VITE_SANITY_PROJECT_ID=c45te99f
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01

# Sanity API Write Token (Required only for local serverless guestbook submission)
SANITY_WRITE_TOKEN=your_sanity_write_token_here
```

### 4. Running the Development Servers
```bash
# 🌐 Start the React Frontend development server (Default: http://localhost:5173)
npm run dev

# 🎨 Start Sanity Studio locally (Default: http://localhost:3333)
npm run studio
```

### 5. Build & Deployment Commands
```bash
# Type check and build the production bundle
npm run build

# Preview the production build locally
npm run preview

# Deploy Sanity Studio to the cloud (*.sanity.studio)
npm run studio:deploy
```

---

## 📋 Engineering Specification Hub

This project strictly adheres to **Spec-First Engineering**. The [`spec/`](./spec) directory preserves the engineering and product decisions:

- 📖 [`spec/REQUIREMENTS.md`](./spec/REQUIREMENTS.md):
  - User personas and end-to-end journey maps.
  - Complete Architectural Decision Logs (**DEC-01 through DEC-34**).
  - TypeScript interfaces, schema contracts, and non-functional requirements (FCP < 1.2s, LCP < 2.0s, CLS < 0.05).
- 📜 [`spec/CHANGELOG.md`](./spec/CHANGELOG.md):
  - Detailed release notes across all development sprints.
  - Architectural evolution from static mockups to cloud-native production.

---

## 🎨 Design Specification

For detailed UI/UX guidelines, design token matrices, typography scales, optical glassmorphism formulas, and component wireframes, see:
👉 **[`DESIGN_SPEC.md`](./DESIGN_SPEC.md)** — The single source of truth for all visual and interaction design rules.

---

## 🛡️ Copyright, Attribution & Disclaimer

- **Date A Live Intellectual Property**: All rights to the *Date A Live* franchise, the character Yoshino Himekawa (四糸乃), character designs, and the spirit Zadkiel are the sole property of author **Kōshi Tachibana**, illustrator **Tsunako**, publisher **KADOKAWA Corporation / Fujimi Shobo**, and the Date A Live Anime Production Committee.
- **Non-Profit Fan Tribute**: This website is an independent, non-commercial tribute project developed strictly for technical learning, artistic showcase, and community appreciation. It does not generate revenue, contains no advertisements, and sells no goods or services.
- **Artwork Attribution**: All artworks in the gallery belong to their respective creators as credited on each card. If you are an artist and wish to have your artwork modified or removed, please trigger the **Credits & Disclaimer** dialog in the footer or email `pvietduc204@gmail.com` for immediate removal within 24–48 hours.

---

<div align="center">

Made with ❄️ and 💚 for **Yoshino Himekawa**  
*“Together with Yoshinon, through the falling winter snow.”*

</div>
