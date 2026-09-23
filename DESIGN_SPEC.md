# DESIGN_SPEC.md: Yoshino's Shrine

> **Single Source of Truth** — Technical UI/UX design specification connecting design intentions directly to the codebase for the tribute web showcase **Yoshino's Home**.
>
> **Version:** 1.0 (Production Release)  
> **Last Updated:** 2026-09-24  
> **Deployment Status:** Fully Live on Vercel Edge (`https://yoshino-home.vercel.app`) and Sanity Studio Cloud (`https://yoshino-home.sanity.studio`).

---

## 1. Design Concept & Principles

### 1.1. Atmosphere & Visual Mood
**Yoshino's Home** is aesthetically calibrated as a **"Warm Winter Sanctuary"**. Contrasting with dark-mode anime fan pages or the oversaturated neon palettes typical of generic AI generation, Yoshino's Home delivers an experience defined by:
- **Crystalline Purity:** Evoking the quiet clarity of early morning sunlight filtering through pristine snowfall.
- **Warmth & Shelter:** Embodying the gentle, timid, and empathetic soul of Yoshino Himekawa (*Spirit No. 02 — The Hermit*).
- **Physical Tactility in a Digital Medium:** Presenting the feel of an authentic tabletop acrylic figure exhibition and an art gallery space.

```
+-------------------------------------------------------------------------------+
|                             WARM WINTER SANCTUARY                             |
|                                                                               |
|      [ Crystalline Clarity ]       ◄──►       [ Tactile Physicality ]         |
|      (Frosted glassmorphism,                  (Dual-ring acrylic figure base, |
|       specular optical edges)                  ground AO shadow, metal pins)  |
|                 ▲                                        ▲                    |
|                 │                                        │                    |
|                 ▼                                        ▼                    |
|      [ Poetic Typographic Harmony ] ◄──►      [ Anti-Slop & Zero Bloat ]      |
|      (Bilingual synergy:                      (Strictly no pure black #000000,|
|       Outfit + Klee One + Cinzel)              no neon glows, zero scroll-trap|
+-------------------------------------------------------------------------------+
```

### 1.2. Core Design Principles

1. **Crystalline Clarity (Optical Depth through Glassmorphism)**
   - Utilizes multi-layered frosted glassmorphism (`backdrop-filter: blur(6px ... 12px)`) accented with a specular inner bevel highlight (`inset 0 1px 2px rgba(255,255,255,0.95)`). Glass surfaces enhance text legibility while allowing the organic motion of falling snow particles to remain visible beneath.

2. **Tactile Physicality (Real-World Materiality)**
   - Eliminates flat, sterile web layouts. Elements communicate physical weight and texture: a standee model set upon a **dual-ring frosted acrylic pedestal** with realistic ground ambient occlusion (`radial-gradient` shadow); an interactive guestbook board pinned with metallic studs.

3. **Bilingual Typographic Harmony (English & Japanese Synergy)**
   - Avoids generic, uninspired system fonts. Applies purposeful typographic pairing: modern geometric sans-serif (`Outfit`) conveys structured metadata and English titles, harmonizing with fluid Japanese brush calligraphy (`Klee One`) for poetic character voice lines.

4. **Zero Scroll-Trap & Infinite Vertical Rhythm (Natural 100% Vertical Flow)**
   - Strictly prohibits horizontal scroll traps on desktop screens. The viewport experience flows along a single, natural vertical axis: *Top Section → Curated Gallery Wall → Noticeboard → Footer*.

5. **Unconditional Respect for Art & Artists (Zero-Crop Architecture)**
   - Honors 100% of the original artist's aspect ratio (`Adaptive Natural Aspect Ratio`). No forced cropping. Every artwork provides clear attribution and a direct 1-click external link to the artist's original post.

---

## 2. Design Tokens & Foundations

The system adheres to a **3-tier design token architecture**:
$$\text{Global Primitives} \longrightarrow \text{Semantic Tokens} \longrightarrow \text{Component Tokens}$$
Integrated natively through Tailwind CSS v4 `@theme` and CSS custom properties in `src/index.css`.

### 2.1 Color System (Semantic Tokens)

Calibrated under architectural decision **DEC-09 (Warm Winter Daylight Palette)**, shifting from an opaque midnight canvas to a bright, crisp daylight winter palette.

```
CANVAS BASE:
  --color-winter-sky: #ECF1FB ───► Daylight Winter Sky (Primary global canvas background)
  --color-warm-ivory: #FDF6EC ───► Warm Ivory (Warm gradient fills & alternating sections)

BRAND & INTERACTIVE ACCENTS:
  --color-ice-blue:      #3B9DD2 ───► Primary Ice Blue (Interactive focus, active rings)
  --color-ice-blue-soft: #7DD3FC ───► Soft Frost Blue (Hover highlights, borders)
  --color-yoshino-green: #10B87E ───► Zadkiel Emerald Green (CTA, fanart badge, success)
  --color-amber-collab:  #F59E0B ───► Amber Gold (Collaboration badges, special notices)

TYPOGRAPHY & READABILITY:
  --color-text-primary:   #18264A ───► Deep Navy (Primary readable text, 10.4:1 contrast)
  --color-text-secondary: #5C6E8F ───► Muted Blue-Gray (Labels, specs, 4.6:1 WCAG AA)
  --color-text-muted:     #8FA3BC ───► Mist (Placeholders, inactive indicators)

FROSTED GLASS SURFACES:
  Level 1 (Subtle / Card):    rgba(255, 255, 255, 0.28) + blur(10px)
  Level 2 (Pedestal Base):    rgba(255, 255, 255, 0.55) + blur(10px)
  Level 3 (Navbar / Gallery): rgba(255, 255, 255, 0.72) + blur(12px)
  Level 4 (Hover / Active):   rgba(255, 255, 255, 0.88) + blur(16px)
```

#### Color Matrix & WCAG 2.1 Contrast Compliance

| Token Name | Value (Hex / RGBA) | Semantic Role | Contrast on `#ECF1FB` | WCAG Rating |
|---|---|---|---|---|
| `--color-winter-sky` | `#ECF1FB` | Primary viewport background canvas | — | Base Canvas |
| `--color-warm-ivory` | `#FDF6EC` | Alternating section fills & warm notes | — | Secondary Base |
| `--color-text-primary` | `#18264A` | Headings, primary body text, Romaji name | **10.42:1** | **Pass AAA** |
| `--color-text-secondary` | `#5C6E8F` | Metric labels, artist credits, quotes | **4.68:1** | **Pass AA** |
| `--color-text-muted` | `#8FA3BC` | Placeholders, inactive tab counters | 2.51:1 | Decorative |
| `--color-ice-blue` | `#3B9DD2` | Interactive primary, active ring, Kanji name | **3.05:1** (UI Component) | **Pass AA Large** |
| `--color-yoshino-green` | `#10B87E` | Primary CTA button, Community Fanart badge | **2.65:1** (With white text) | **Pass AA Large** |
| `--color-border` | `rgba(59, 157, 210, 0.18)` | Frosted glass borders, subtle dividers | — | Decorative |
| `--color-shadow` | `rgba(30, 55, 110, 0.08)` | Layered ambient elevation shadow | — | Elevation |

> [!IMPORTANT]
> **Anti-Pattern Directive:** Pure black (`#000000`) is strictly banned for text and shadows. Deep Navy (`#18264A`) and tinted blue shadows (`rgba(30, 55, 110, 0.08)`) must be used to preserve optical translucency and prevent visual muddiness.

---

### 2.2 Typography Scale

The typographic architecture integrates 4 open-source Google Font families:

```
TYPOGRAPHY STACK:
  ├── Display / Grand Title:     "Cinzel", Georgia, serif
  ├── Modern Title / Specs:      "Outfit", "Plus Jakarta Sans", sans-serif
  ├── Japanese Calligraphy:      "Klee One", "Yu Mincho", serif
  └── Body & Functional UI:      "Plus Jakarta Sans", system-ui, sans-serif
```

#### Typographic Hierarchy Matrix

| Level / Token | Font Family | Size (Desktop / Mobile) | Weight | Tracking (Letter-spacing) | Line-height | Production Application |
|---|---|---|---|---|---|---|
| **Display Hero H1** | `Outfit` | `2.65rem` (42px) / `2.0rem` (32px) | Bold (700) | `0.09em` | 1.15 | Romaji Name: `HIMEKAWA YOSHINO` |
| **Kanji H1 Sub** | `Klee One` | `1.5rem` (24px) / `1.25rem` (20px) | SemiBold (600) | `0.18em` | 1.3 | Japanese Name: `氷芽川 四糸乃` |
| **Section Title H2** | `Outfit` / `Cinzel` | `1.75rem` (28px) / `1.5rem` (24px) | Bold (700) | `0.06em` | 1.25 | Area Headers: `CURATED GALLERY`, `HEARTH NOTICEBOARD` |
| **Card Subhead H3** | `Outfit` | `1.125rem` (18px) / `1.0rem` (16px) | SemiBold (600) | `0.03em` | 1.35 | Artwork titles, section cards |
| **Quote JP (Iconic)** | `Klee One` | `1.0rem` (16px) / `0.875rem` (14px) | SemiBold (600) | `0.04em` | 1.4 | Japanese Voice Quote: `「私……誰も傷つけたくないんです……」` |
| **Quote EN (Sub)** | `Plus Jakarta Sans` | `0.75rem` (12px) | Regular Italic (400) | Normal | 1.6 | English translated quote subtitle |
| **Body Large (Editorial)**| `Plus Jakarta Sans` | `0.9375rem` (15px) | Regular (400) | `0.01em` | 1.85 | "About Yoshino & Yoshinon" Tribute Monologue (Max 65ch) |
| **Body UI / Buttons** | `Plus Jakarta Sans` | `0.875rem` (14px) | Medium (500) | Normal | 1.5 | Button labels, filter tabs, guestbook wishes |
| **Micro Caption / Tags**| `Outfit` / `Body` | `0.6875rem` (11px) | Bold (700) | `0.08em` | 1.2 | Metric Labels: `AGE`, `HEIGHT`, `CODENAME`, `SPIRIT NO. 02` |

---

### 2.3 Spacing, Radius & Elevation

#### Spacing Scale (4px / 8px Base Grid)
- `4px` (`gap-1` / `p-1`): Inner borders, micro icon gaps.
- `8px` (`gap-2` / `p-2`): Wardrobe selector avatar gaps.
- `12px` (`gap-3` / `p-3`): Compact button padding, filter tag gaps.
- `16px` (`gap-4` / `p-4`): Vital Specs grid gaps, input padding.
- `24px` (`gap-6` / `p-6`): Column gutters between content blocks.
- `32px` (`p-8` / `gap-8`): Internal padding for frosted profile cards.
- `64px` (`--spacing-navbar`): Global fixed navbar height.
- `80px – 96px` (`py-20` – `py-24`): Vertical section breathing rhythm.

#### Radius Tokens
- `rounded-full` (`9999px`): Category badges, avatar buttons, pill buttons.
- `rounded-3xl` (`24px`): Top profile card container, noticeboard whiteboard frame, wardrobe dock.
- `rounded-2xl` (`16px`): Artwork cards, voice line quote container, vital specs cards, sticky slips.
- `rounded-xl` (`12px`): Text inputs, interactive icon badges, filter chips.

#### Elevation & Optical Bevel Tokens

```css
/* Elevation Level 1: Subtle separation for flat components */
--elevation-1: 0 2px 8px rgba(30, 55, 110, 0.04);

/* Elevation Level 2: Artwork tiles & interactive cards */
--elevation-2: 0 4px 20px rgba(30, 55, 110, 0.08);

/* Elevation Level 3: Large frosted glass cards, noticeboard frame */
--elevation-3: 0 16px 48px rgba(30, 55, 110, 0.07);

/* Elevation Level 4: Slide-over modals, full dialogs */
--elevation-4: 0 24px 64px rgba(18, 38, 74, 0.18);

/* Specular Inner Highlight: Simulates physical light refraction on beveled glass edges */
--specular-frost: inset 0 1px 2px rgba(255, 255, 255, 0.95), 
                  inset 0 -1px 2px rgba(59, 157, 210, 0.10);
```

---

## 3. Layout & Responsive Breakpoints

### 3.1. Responsive Breakpoints

| Breakpoint | Viewport Width | Hero / Standee Layout | Gallery Wall Grid | Noticeboard Structure |
|---|---|---|---|---|
| **Mobile (`<640px`)** | `360px – 639px` | Single-column stack; Standee clamped to 420px; Streamlined layout | 1 column (`columns-1`) | 1 column; Wish composer stacked above note wall |
| **Phablet (`sm`)** | `640px – 767px` | Single-column stack; Centered standee; Horizontal avatar dock | 2 columns (`sm:columns-2`) | 1 wide column |
| **Tablet (`md`)** | `768px – 1023px`| Expanded horizontal padding; 3-column Vital Specs | 3 columns (`md:columns-3`) | 2 columns (5:7 split) |
| **Desktop (`lg`)** | `1024px – 1279px`| 2 symmetrical columns `6:6`; Vertical wardrobe dock | 4 columns (`lg:columns-4`) | 2 side-by-side independent columns |
| **Wide Desktop (`xl`)** | `≥1280px` (`max-w-7xl`)| Fixed 1280px container; Standee scales to 640px max | 4 columns masonry | Centered 2-column layout |

> [!TIP]
> **Viewport Safety Directive:** All full-height sections utilize `min-h-[100dvh]` instead of `h-screen`. This completely avoids layout jumps caused by address bar expansion and retraction on iOS Safari and mobile Chrome.

---

### 3.2. Layout Blueprints (Wireframes)

#### [Wireframe 01]: Fixed Top Navigation Bar (Height: 64px)
```
+---------------------------------------------------------------------------------------------------------+
| [❄ Yoshino's Home]                          [Top]    [Gallery]    [Noticeboard]    [Credits]  [❄ Snow On] |
+---------------------------------------------------------------------------------------------------------+
```

#### [Wireframe 02]: Top Section (Hero Standee & Vital Profile & Monologue)
```
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|   +---------------- LEFT COLUMN (6/12) ---------------+ +--------------- RIGHT COLUMN (6/12) --------------+  |
|   |  (Wardrobe Dock)       (Character Standee)        | | [Badge]: SPIRIT NO. 02 • IV CHESED            |  |
|   |   +---+               .---.                       | | H1: HIMEKAWA YOSHINO                          |  |
|   |   | O | Normal       /     \                      | |     氷芽川 四糸乃                             |  |
|   |   +---+             | () () |                     | |                                               |  |
|   |   | O | Raizen       \  -  /                      | | +----------------- VoiceLineCard -----------+ |  |
|   |   +---+              /|   |\   (Breathing 4.8s)   | | | ❄️ 「私……誰も傷つけたくないんです……」        | |  |
|   |   | O | Spirit      / |   | \                     | | |    "I... don't want to hurt anyone..."      | |  |
|   |   +---+            (  |   |  )                    | | +-------------------------------------------+ |  |
|   |                     \ |___| /                     | |                                               |  |
|   |                      /     \                      | | +----- Vital Specs Grid (6 Frosted Cards) -+ |  |
|   |                     |       |                     | | | [Age: 13 / 39-40] | [Height: 144cm]       | |  |
|   |                    =========== (Dual-ring Mica)   | | | [Codename: Hermit]| [CV: Iori Nomizu]     | |  |
|   |                   (___________) + Ground AO       | | | [Astral: Zadkiel] | [Angel: Zadkiel]      | |  |
|   |                                                   | | +-------------------------------------------+ |  |
|   +---------------------------------------------------+ +-----------------------------------------------+  |
|                                                                                                         |
|   +────────────────────────────────── Editorial Tribute Monologue ──────────────────────────────────+  |
|   |  “ Yoshino embodies a rare archetype in anime storytelling — not defined by destructive force,   |  |
|   |    but by gentle kindness and the courage to remain empathetic in the face of despair... ”       |  |
|   +──────────────────────────────────────────────────────────────────────────────────────────────────+  |
+---------------------------------------------------------------------------------------------------------+
```

#### [Wireframe 03]: Vertical Adaptive Masonry Gallery Wall
```
+---------------------------------------------------------------------------------------------------------+
|                     [ Centered FilterBar: (•) All  ( ) Official  ( ) Fanart  ( ) Collab ]               |
|                                                                                                         |
|   +-------------------+  +-------------------+  +-------------------+  +-------------------+            |
|   | [Artwork Card 01] |  | [Artwork Card 02] |  | [Artwork Card 03] |  | [Artwork Card 04] |            |
|   | Ratio: 3:4        |  | Ratio: 16:9       |  | Ratio: 1:1        |  | Ratio: 9:16       |            |
|   | Badge: Official   |  | Badge: Fanart     |  | Badge: Collab     |  | Badge: Fanart     |            |
|   | Hover: Smooth     |  | Hover: Smooth     |  | Hover: Smooth     |  | Hover: Smooth     |            |
|   | source link ↗     |  | source link ↗     |  | source link ↗     |  | source link ↗     |            |
|   +-------------------+  +-------------------+  +-------------------+  +-------------------+            |
|   +-------------------+  +-------------------+  +-------------------+  +-------------------+            |
|   | [Artwork Card 05] |  | [Artwork Card 06] |  | [Artwork Card 07] |  | [Artwork Card 08] |            |
|   | Ratio: 1:1        |  | Ratio: 4:5        |  | Ratio: 16:9       |  | Ratio: 3:2        |            |
+---------------------------------------------------------------------------------------------------------+
```

#### [Wireframe 04]: Winter Hearth Noticeboard & Sticky Note Composer
```
+---------------------------------------------------------------------------------------------------------+
|   +---------------------------- FROSTED WHITEBOARD FRAME (MAX-W-4XL) -------------------------------+  |
|   |                                                                                                 |  |
|   |   +-- LEFT COLUMN: WISH COMPOSER --+   +-- RIGHT COLUMN: PINNED WISH NOTE WALL -------------+   |  |
|   |   | [Your nickname...]             |   |  📌 (Blue Pin)           📌 (Mint Pin)             |   |  |
|   |   | [Message for Yoshino...]       |   |  +--------------------+  +--------------------+    |   |  |
|   |   | (Stamp select: ❄️ 💙 🐰 ✨ 🍵)  |   |  | "Forever our warm  |  | "A peaceful winter |    |   |  |
|   |   |                                |   |  |  winter angel! ❄️"  |  |  sanctuary! ✨"    |    |   |  |
|   |   | [ Pin Wish to Board ↗ ]        |   |  | — Shido_Fan        |  | — Kurumi_Collector |    |   |  |
|   |   +--------------------------------+   |  +--------------------+  +--------------------+    |   |  |
|   |                                        +----------------------------------------------------+   |  |
|   +-------------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------------+
```

---

## 4. Component Specifications

### 4.1 Component: `VoiceLineCard`

The `VoiceLineCard` encapsulates the spiritual essence of Yoshino, presenting her iconic quote while establishing the architectural foundation for a future audio voice player.

```
+-----------------------------------------------------------------------+
|  [❄️]  氷芽川 四糸乃 (Klee One, 16px, SemiBold, #18264A)               |
|        「私……誰も傷つけたくないんです……」                              |
|                                                                       |
|        "I... don't want to hurt anyone..."                            |
|        (Plus Jakarta Sans, 12px, Italic, #5C6E8F)                     |
|                                                                       |
|        [Optional Future Audio: ▶ Mini Play Button | Waveform Pulse]   |
+-----------------------------------------------------------------------+
```

- **Purpose:** Resonates with Yoshino's gentle, selfless heart and her desire to protect others without causing harm.
- **Optical Properties:**
  - Background fill: `rgba(224, 242, 254, 0.25)` (Pale frost tint).
  - Backdrop blur: `backdrop-filter: blur(6px)`.
  - Border: `1px solid rgba(186, 230, 253, 0.70)`.
  - Specular bevel: `box-shadow: 0 4px 16px rgba(59, 157, 210, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.90)`.
  - Corner radius: `rounded-2xl` (`16px`).
- **Typographic Hierarchy:**
  - Japanese: Font `Klee One`, size `text-sm sm:text-base`, color `--color-text-primary`, `leading-snug`.
  - English: Font `Plus Jakarta Sans`, size `text-xs`, style `italic`, color `--color-text-secondary`.
- **Future Audio Player Roadmap Spec:**
  - Circular playback button: `w-8 h-8` in `--color-ice-blue` with an audio icon.
  - Animated sound bars: 4 CSS keyframe-driven waveform bars oscillating when `isPlaying === true`.
  - Audio source specification: `yoshino_quote_01.m4a` (AAC 128kbps, normalized to `-14 LUFS`).

---

### 4.2 Component: `GalleryCard` & `Lightbox`

The gallery card serves as the focal unit of the exhibition wall, upholding zero-crop presentation rules while prioritizing artist attribution.

```
+-----------------------------------------------------------------------+
| [Official / Fanart Badge]                                             |
|                                                                       |
|                                                                       |
|                                ARTWORK                                |
|                        (Natural Aspect Ratio)                         |
|                                                                       |
|                                                                       |
| - - - - - - - - - - - - - - [HOVER OVERLAY] - - - - - - - - - - - - - |
| Title: Snowdrop Melody                                                |
| Artist: @tsunako_official • Pixiv                                     |
| Curator Note: "Soft morning light catching the winter coat..."        |
|                                                                       |
| [ Visit Source Post ↗ ] (Opens safely in new tab)                     |
+-----------------------------------------------------------------------+
```

- **Props Interface:**
  ```typescript
  interface ArtworkCardProps {
    artwork: {
      id: string;
      title: string;
      category: 'official' | 'fanart' | 'collab';
      imageUrl: string;
      blurDataUrl?: string; // LQIP Base64 blur string from Sanity
      width: number;
      height: number;
      credit: {
        name: string;
        platform: 'pixiv' | 'twitter' | 'artstation' | 'official';
        sourceUrl: string;
      };
      curatorNote?: string;
    };
    index: number;
  }
  ```
- **Adaptive Aspect Ratio (Zero-Crop & CLS < 0.05):**
  - Outer container applies `aspectRatio: width / height` directly in inline style.
  - Image attributes: `loading="lazy" decoding="async"`.
- **Category Badge System:**
  - `Official`: `--color-ice-blue` (`#3B9DD2`) background with white text.
  - `Fanart`: `--color-yoshino-green` (`#10B87E`) background with white text.
  - `Collab`: Amber Gold (`#F59E0B`) background with white text.
- **Hover Overlay (US-03):**
  - Gradient backdrop: `linear-gradient(to top, rgba(18,38,74,0.88) 0%, rgba(18,38,74,0.50) 55%, transparent 100%)`.
  - Motion parameters: `transition: transform 500ms ease, opacity 220ms ease`. Image gently zooms to `scale(1.05)`.
  - "View Source ↗" Button: Opens source post safely with `target="_blank" rel="noopener noreferrer"`.
- **Lightbox Inspection Modal Spec:**
  - Trigger: Activated upon double-clicking card or clicking inspection trigger.
  - Backdrop: `rgba(15, 23, 42, 0.88)` with `backdrop-blur-md`.
  - Keyboard Navigation: `Escape` closes modal; `ArrowLeft`/`ArrowRight` traverses adjacent artworks.

---

### 4.3 Component: `StandeeAcrylicPedestal` & `WardrobeSelectorDock`

Recreates the look and feel of a premium physical acrylic collector's figure paired with a vertical wardrobe appearance switcher inspired by Hololive UI design.

```
+-----------------------------------------------------------------------+
|  (Vertical Wardrobe Selector)           (Acrylic Figure Stage)        |
|                                                                       |
|   +----+  Normal Form (Winter Coat)         .---.                     |
|   | () |  Zoom: 50% 18%, Scale: 2.4         /     \                    |
|   +----+                                  | () () |                   |
|   +----+  Raizen School Uniform            \  -  /                    |
|   | () |  Active: Ring-3 Cyan               /|   |\   (Breathing 4.8s)|
|   +----+                                   / |   | \                  |
|   +----+  Spirit Form (Zadkiel Coat)      (  |   |  )                 |
|   | () |  Framer AnimatePresence           \ |___| /                  |
|   +----+                                    /     \                   |
|                                            |       |                  |
|                                           =========== (Dual-ring Mica)|
|                                          (___________) + Ground AO    |
+-----------------------------------------------------------------------+
```

- **Character Standee Stage (`StandeeStage`):**
  - Adaptive Height: `height: clamp(420px, 60vh, 640px)`. Guarantees full-body display without cropping character feet on any device screen.
  - Gentle Breathing Motion: `4.8s` continuous loop oscillating along vertical axis `y: [0, -8, 0]` via `easeInOut` easing.
  - Smooth Costume Transitions: Handled via Framer Motion `AnimatePresence mode="wait"` with `duration: 0.35s`.
- **Dual-Ring Frosted Acrylic Pedestal:**
  - Outer Rim: `border: 1px solid rgba(255, 255, 255, 0.90)`, `background: rgba(255, 255, 255, 0.55)`, `backdrop-filter: blur(10px)`.
  - Inner Ring: `border: 1px solid rgba(59, 157, 210, 0.25)`.
  - Ground Ambient Occlusion: `radial-gradient(ellipse, rgba(30,55,110,0.22) 0%, transparent 75%)`, `filter: blur(3px)`.
- **Vertical Wardrobe Selector Dock (`WardrobeSelectorDock`):**
  - Vertical dock displaying 3 circular avatars representing official character forms: *Normal, School Uniform, and Spirit Form*.
  - Independent Facial Focus Coordinates: Configured with `avatarPosition: "50% 18%"` and `avatarScale: 2.4` to align Yoshino's facial center within the circular frame.
  - Active Indicator: `ring-3 ring-[var(--color-ice-blue)] ring-offset-2 scale-105 shadow-md`.

---

### 4.4 Component: `NoticeboardWishPad` & `CreditsModal`

- **Frosted Hearth Noticeboard (`NoticeboardWishPad`):**
  - Whiteboard frame constrained to `max-w-4xl`, featuring `backdrop-filter: blur(10px)` over a subtle dot grid pattern.
  - Dual-column architecture: Sticky Wish Composer on the left, Wish Note Wall on the right.
  - Interactive frosted glass slips pinned with reflective metallic pushpins, supporting emotive stamps (❄️, 💙, 🐰, ✨, 🍵).
- **Two-Tier Legal Credits Modal (`CreditsModal`):**
  - Tier 1: Minimal dark frosted footer occupying minimal vertical space.
  - Tier 2: Slide-over frosted glass modal containing:
    1. *Copyright & IP Statement* (Recognizing KADOKAWA Corporation, Kōshi Tachibana, and Tsunako).
    2. *Artist Rights & 24–48h Takedown Policy* (Guaranteed immediate removal upon artist inquiry).
    3. *Non-commercial Pledge* (Permanent non-profit commitment).
  - Interaction Utilities: **1-Click Copy Email** (`pvietduc204@gmail.com`) and **Direct Gmail Web Compose** buttons resolving missing native email client issues on Windows/Chrome.

---

## 5. Interaction & Micro-animations

### 5.1. Spring Physics & Transitions
All interface animations leverage **Framer Motion** spring physics rather than mechanical linear easing:

```typescript
// Standard spring configuration for dialogs, modals, and dropdowns
export const springPhysicsStandard = {
  type: "spring",
  stiffness: 100, // Spring tension
  damping: 20,    // Dampening to prevent jarring overshoot
  mass: 1.0,
};

// Gentle fluid transition for standee and floating elements
export const gentleTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier curve
};
```

### 5.2. Crystalline Snowfall Particle Dynamics (`SnowCanvas`)
- **Particle Density:** `50 – 80 particles` on desktop; `25 particles` on mobile to preserve GPU performance and battery life.
- **Drift Equation:** Combines vertical gravitational fall with sinusoidal horizontal oscillation:
  $$x(t) = x_0 + A \cdot \sin(\omega t + \phi)$$
  Where $A$ denotes sway amplitude (1.5px – 3.0px), $\omega$ is angular frequency, and $\phi$ is the particle's initial randomized phase.
- **Battery & Performance Optimization:**
  - Rendered via a dedicated `requestAnimationFrame` loop.
  - Automatically paused whenever the tab loses visibility via `document.hidden === true`.

---

## 6. Media Asset Guidelines

### 6.1. Character Standee & Graphic Standards
- **File Format:** Transparent `WebP` with clean alpha channel edges.
- **Retina 2x Resolution:** Minimum vertical dimension `1200px` – `1400px` for high-density 4K/Retina sharpness.
- **File Size Target:** Under `350KB` per full-body standee through lossless/near-lossless compression.

### 6.2. Gallery Artworks & Sanity Asset Pipeline
- **Aspect Ratio Fidelity:** Respects 100% of native dimensions (`16:9`, `4:3`, `3:4`, `9:16`, `1:1`).
- **Sanity CDN Dynamic Optimization:** Serves dynamically formatted URLs:
  `?auto=format&w=800&q=80` for grid thumbnails, and full-resolution uncompressed assets for the Lightbox modal.
- **LQIP (Low-Quality Image Placeholder):** Leverages base64 blur strings generated directly from `asset->metadata.lqip` to prevent visual jumpiness during asset loading.

### 6.3. Anti-Patterns Checklist

| Prohibited Pattern | Technical & Aesthetic Rationale | Approved Design Solution |
|---|---|---|
| **BANNED:** Pure black `#000000` | Ruins frosted glass translucency and introduces harsh visual clipping | Use Deep Navy `#18264A` for text and `#0B1325` for footer layers |
| **BANNED:** Neon / AI Purple Glow | Hallmarks of generic AI slop that create harsh visual fatigue | Use specular white highlights `rgba(255,255,255,0.9)` with pale blue drop shadows |
| **BANNED:** Horizontal Scroll-Trap | Traps mouse wheel interactions on desktop, causing user frustration | Pure vertical masonry grid with natural column flow (`break-inside-avoid`) |
| **BANNED:** Soulless generic fonts (`Inter`) | Destroys artistic atmosphere; makes a tribute page look like a SaaS tool | Bilingual pairing of `Outfit` (Modern Geometric) and `Klee One` (Brush Calligraphy) |
| **BANNED:** Touch targets < 44px on mobile | Violates mobile accessibility guidelines, causing mistaps | Ensure all interactive buttons and selector avatars span at least `44×44px` |

---

*Authored by the Engineering & Design Team of the Yoshino's Home project. Maintained and version-controlled directly within the source repository.*
