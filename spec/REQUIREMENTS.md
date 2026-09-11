# REQUIREMENTS.md — Yoshino's Home

> Tài liệu này là phiên bản chuẩn hóa và hợp nhất của PRD & DRD gốc, **tích hợp toàn bộ quyết định kỹ thuật đã được thống nhất**.
> Nguồn gốc tài liệu gốc: `docs/[PRD & DRD] Yoshino's Home - Product & Design Requirements Document.docx`
> **Cập nhật lần cuối: 2026-09-11** — Sprint 3 hoàn thành (Gallery Wall); Sprint 4 (Yoshinon + Sanity CMS) tiếp theo.

---

## 1. Tổng quan Dự án

### 1.1. Bối cảnh & Tầm nhìn

**Yoshino's Home** là website tôn vinh nhân vật (Fan-made Non-profit Tribute Showcase) dành riêng cho **Yoshino Himekawa (Spirit No. 02 — The Hermit)** trong tác phẩm *Date A Live* của Kōshi Tachibana.

Tầm nhìn cốt lõi: Tạo ra một *"căn nhà mùa đông ấm áp"* trên nền tảng số — người dùng ngay lập tức thấu hiểu câu chuyện nhân vật, thưởng lãm tác phẩm nghệ thuật chọn lọc, và tương tác tự nhiên với chú rối Yoshinon trong vai trò Tour Guide.

### 1.2. Mục tiêu & Success Metrics

| Loại mục tiêu | Chi tiết |
|---|---|
| Cá nhân | Hoàn thiện quy trình PRD → Wireframe → Design Tokens → Code với TypeScript + Tailwind CSS |
| Hiệu năng | FCP < 1.2s, LCP < 2.0s, CLS < 0.05, Canvas 55–60 FPS |
| Minh bạch | 100% tác phẩm có attribution rõ ràng, link trực tiếp đến tác giả gốc |
| Mở rộng | Dữ liệu phòng tranh quản trị qua Sanity.io (không cần re-deploy khi thêm tranh mới) |

### 1.3. User Personas

| Persona | Đặc điểm | Kỳ vọng cốt lõi |
|---|---|---|
| Anime Fan / Date A Live Fan | Thích tranh chất lượng cao, tìm fanart độc đáo | Tranh có chọn lọc, biết tác giả, click link theo dõi họa sĩ |
| Nhà tuyển dụng / Tech Visitor | Đánh giá portfolio Frontend | Thẩm mỹ cao, TypeScript sạch, micro-interactions mượt, không lỗi console |
| Casual Visitor | Chưa biết Date A Live, ghé thăm vì tò mò | Hiểu nhân vật trong 5 giây, không bị quá tải |

---

## 2. Phạm vi Sản phẩm (MVP v1.0)

### 2.1. Scope Matrix

| Khu vực | MVP In-Scope | Backlog V2+ |
|---|---|---|
| Hồ sơ nhân vật | Thẻ Identity, Standee breathing animation | Story Timeline, Voice Lines Player |
| Phòng triển lãm | Lưới tranh, 4 filter states (All/Official/Fanart/Collab), Hover overlay, Credit, External link | Comments, Like, Lightbox với zoom |
| Yoshinon Mascot | Floating widget, Chào mừng, Tour 4 bước | Live2D vật lý, AI Chatbot tự do |
| Môi trường | Canvas tuyết 60 FPS, Toggle bật/tắt, Glassmorphism theme | Weather switch, BGM |
| CMS | Sanity.io integration (Sprint 4) | Admin auth riêng trên frontend |

### 2.2. User Stories & Acceptance Criteria

#### US-01: Xem nhanh hồ sơ nhân vật
> Là người ghé thăm, tôi muốn xem thông tin cốt lõi về Yoshino ngay tại màn hình đầu tiên.

**AC:**
- Hero section hiển thị trọn trong 100vh tại 1920×1080 và 1366×768
- Dossier Card chứa đủ 4 trường: Tên (Kanji + Romaji), Linh phục, Thiên sứ, Tính cách
- Có thêm trường `keyQuote` — câu thoại kinh điển, đặt dưới khối thông số 2×2 (xem Decision #5)
- 2 CTA: [Khám phá phòng tranh ↓] và [Hỏi Yoshinon]

#### US-02: Khám phá & Lọc phòng tranh
> Là người thưởng thức nghệ thuật, tôi muốn phân loại tranh theo 3 danh mục.

**AC:**
- Filter bar có 4 trạng thái UI: `All` | `Official Art` | `Community Fanart` | `Collaborations`
- `All` là UI State (không phải domain category) — hiển thị toàn bộ khi được chọn
- Client-side filtering, không reload trang
- Mỗi thẻ tranh: thumbnail, tên tác phẩm, tác giả, nguồn

#### US-03: Dẫn nguồn minh bạch
> Là người ủng hộ bản quyền, tôi muốn click vào tranh và đến bài đăng gốc.

**AC:**
- Hover vào card → overlay trượt mượt hiện nút "Ghé thăm bài đăng"
- Click → mở URL gốc trong tab mới (`target="_blank"` + `rel="noopener noreferrer"`)
- Tab Yoshino's Home giữ nguyên, không bị navigate đi

#### US-04: Tham quan cùng Yoshinon
> Là người dùng mới, tôi muốn được Yoshinon hướng dẫn dạo quanh trang.

**AC:**
- Yoshinon xuất hiện góc dưới phải sau 2 giây tải trang, có hoạt ảnh vẫy tay
- Hộp thoại chào có nút "Tham quan ngay" và "Để sau"
- Tour tự động scroll + highlight element (xem Decision #6)

---

## 3. Functional Requirements (FR)

### FR-01: Hero & Character Dossier

- Render ảnh Yoshino định dạng WebP/PNG trong suốt với `floating` breathing animation
- Dossier Card (Glassmorphism):
  - Spirit Identifier: `Spirit No. 02 — The Hermit`
  - Họ tên: `氷芽川 四糸乃 (Himekawa Yoshino)`
  - Thiên sứ: `Zadkiel (Frozen Puppet — Con rối băng khổng lồ)`
  - Linh phục: `Zadkiel Coat (Thần Uy Linh Trang Số 4)`
  - Tính cách: `Nhút nhát, vị tha, quan tâm người khác — kiểm soát băng giá tuyệt đối`
  - **`keyQuote`** *(đã quyết định — Decision #5)*: italic Serif, border-left xanh băng, đặt trên CTA

### FR-02: The Gallery Wall

- Bộ lọc 4 UI states: `all` | `official` | `fanart` | `collab`
- Lazy Loading cho tất cả ảnh trong gallery
- ArtworkCard: thumbnail tỷ lệ cố định, category badge góc, hover overlay với attribution

### FR-03: Yoshinon Tour Guide

- `position: fixed; bottom: 24px; right: 32px; z-index: 40`
- State machine: `Idle → Welcome → Touring → Completed → Dismissed`
- 4 bước tour:
  1. **Intro** — Giới thiệu Yoshino và căn phòng tuyết
  2. **Profile** — Chỉ vào Dossier Card và Zadkiel
  3. **Gallery** — Dẫn xuống phòng tranh, hướng dẫn filter
  4. **Farewell** — Cảm ơn, thu về trạng thái mascot thường trực

### FR-04: Snow Canvas

- 50–80 hạt tuyết (Desktop); **giảm còn 25 hạt trên Mobile** *(Decision #4)*
- Mỗi hạt: radius 1–3.5px, velocity Y 0.5–2.0px/frame, drift X theo sin, opacity 0.3–0.85
- Toggle button trên navbar
- Tự động pause khi `document.hidden === true` (tiết kiệm CPU khi ẩn tab)

---

## 4. Non-Functional Requirements (NFR)

### 4.1. Hiệu năng (Performance & Core Web Vitals)

| Metric | Target |
|---|---|
| FCP | < 1.2s (mạng 4G/High-speed Desktop) |
| LCP | < 2.0s (ảnh nén WebP + CDN) |
| CLS | < 0.05 (định sẵn `aspect-ratio` cho tất cả image container) |
| Canvas FPS | 55–60 FPS ổn định qua `requestAnimationFrame` |

### 4.2. Tương thích & Tiếp cận

- **Trình duyệt:** Chrome, Edge, Firefox, Safari (Desktop modern)
- **Độ phân giải:** 1920×1080 (primary), 1440×900, 2K/4K
- **Responsive (đã bổ sung — Decision #4):**
  - Desktop: layout 2 cột (Hero), grid 3–4 cột (Gallery)
  - Tablet (`md`): grid 2 cột Gallery
  - Mobile (`sm`): flex-col 1 cột Hero, grid 1 cột Gallery, mascot thu nhỏ
- **Accessibility:** `alt` cho mọi ảnh, tương phản chữ/nền đạt WCAG 2.1 AA (tối thiểu 4.5:1)

### 4.3. Bản quyền & Disclaimer

Trang hoạt động phi thương mại. Footer bắt buộc có:

> *"Date A Live và nhân vật Yoshino Himekawa thuộc bản quyền của tác giả Koushi Tachibana, họa sĩ Tsunako và nhà xuất bản KADOKAWA Corporation. Toàn bộ tác phẩm nghệ thuật thuộc quyền sở hữu của các họa sĩ tương ứng."*

---

## 5. Information Architecture & User Flow

### 5.1. Sitemap (SPA)

```
[Top Navigation Bar — fixed, h:64px, backdrop-blur:12px]
  ├── Logo: Yoshino's Home ❄
  ├── Nav Links: [Hồ sơ] | [Phòng tranh] | [Credit & Nguồn]
  └── Controls: [❄ Bật/Tắt Tuyết]

[Section 1: Hero & Living Room — 100vh]
  ├── Canvas: Falling Snowflakes (50–80 particles)
  ├── Col Left: Yoshino Standee (breathing float + radial glow)
  └── Col Right: Dossier Card (Glassmorphism)
        ├── Tag: SPIRIT NO. 02 • THE HERMIT
        ├── H1: HIMEKAWA YOSHINO + Kanji
        ├── Stats Grid 2×2: Linh phục | Thiên sứ | Tính cách | (mở rộng sau)
        ├── keyQuote (italic serif, border-left ice-blue)
        └── CTAs: [Khám phá tranh ↓] [Hỏi Yoshinon]

[Section 2: The Gallery Wall]
  ├── Heading + Epigraph
  ├── Filter Bar: [Tất cả] | [Official Art] | [Fanart] | [Collaborations]
  └── Art Grid (max-w:1280px, centered)
        └── ArtworkCard × N (Thumbnail | Badge | Hover Overlay | External Link)

[Section 3: Footer — Cozy Hearth]
  ├── Attribution & Artist Thanks
  ├── Legal Disclaimer (phi thương mại)
  └── Developer Portfolio Link

[Floating Element]
  └── Yoshinon Widget (fixed, bottom-right)
```

### 5.2. End-to-End User Journey

1. **Bước vào căn nhà** → Thấy tuyết rơi + Yoshino standee + Dossier Card
2. **Yoshinon chào hỏi** → 2s delay → hỏi muốn tham quan không
3. **Tour hồ sơ** → Scroll + highlight Dossier, Yoshinon bình luận về Zadkiel
4. **Tour phòng tranh** → Scroll xuống Gallery, hướng dẫn click filter
5. **Khám phá tự do** → Hover tranh, đọc credit, click "Ghé thăm bài đăng" → tab mới

---

## 6. Design Tokens & Visual Language

### 6.1. Color Palette

| Token | HEX / RGBA | Ứng dụng |
|---|---|---|
| `--bg-deep-winter` | `#0B1325` | Nền chủ đạo — đêm mùa đông sâu |
| `--primary-ice-blue` | `#7DD3FC` (Sky-300) | Tiêu đề phụ, hover link, border Dossier Card |
| `--accent-yoshino-green` | `#6EE7B7` (Emerald-300) | Primary CTA, active filter tag |
| `--surface-glass` | `rgba(255,255,255,0.06)` | Nền Glassmorphism (backdrop-blur: 12px) |
| `--text-snow` | `#F8FAFC` (Slate-50) | Chữ tiêu đề H1, H2 |
| `--text-mist` | `#94A3B8` (Slate-400) | Chữ mô tả, credit họa sĩ, thông tin phụ |

### 6.2. Typography

| Role | Font | Áp dụng |
|---|---|---|
| Display / Heading | Playfair Display hoặc Cinzel (Serif) | Logo, H1 HIMEKAWA YOSHINO, THE GALLERY WALL |
| Body / Functional | Plus Jakarta Sans hoặc Inter (Sans-serif) | Mô tả hồ sơ, nhãn nút, filter tab, credit |

### 6.3. Wireframe Desktop

```
==============================================================================
TOP NAVIGATION (Fixed, h:64px, backdrop-blur:12px)
[❄] Yoshino's Home      [Hồ sơ]  [Phòng tranh]  [Credit]  [❄ Tắt tuyết]
==============================================================================

HERO (100vh, display:flex, align-items:center)
──────────────────────────────────────────────────────────────────────────────
|   [ CỘT TRÁI: STANDEE ART ]          |   [ CỘT PHẢI: DOSSIER CARD ]      |
|                                       |                                    |
|   Ảnh chân dung Yoshino áo xanh      |   Tag: SPIRIT NO. 02 • THE HERMIT  |
|   breathing float animation           |   H1: HIMEKAWA YOSHINO             |
|   radial gradient glow nền            |       氷芽川 四糸乃                |
|                                       |                                    |
|                                       |   ┌──────────────────────────────┐ |
|                                       |   │ Linh phục: Zadkiel Coat      │ |
|                                       |   │ Thiên sứ:  Zadkiel (Frozen)  │ |
|                                       |   │ Tính cách: Dịu dàng, nhút nhát│|
|                                       |   └──────────────────────────────┘ |
|                                       |                                    |
|                                       |   " Mình không muốn làm tổn        |
|                                       |     thương bất cứ ai cả... "       |
|                                       |                                    |
|                                       |   [ Khám phá tranh ↓ ]  [Yoshinon]|
──────────────────────────────────────────────────────────────────────────────
                          [ ⌄ scroll indicator ]

==============================================================================
GALLERY (padding:80px 0, max-w:1280px, centered)
                    PHÒNG TRIỂN LÃM NGHỆ THUẬT
          Những khoảnh khắc dịu dàng và ấm áp của Yoshino

     (•) Tất cả    ( ) Official Art    ( ) Fanart    ( ) Collaborations

+------------------+ +------------------+ +------------------+ +------------------+
| [Thumbnail 1]    | | [Thumbnail 2]    | | [Thumbnail 3]    | | [Thumbnail 4]    |
| Tag: Official    | | Tag: Fanart      | | Tag: Collab      | | Tag: Fanart      |
| Hover → Overlay  | | Hover → Overlay  | | Hover → Overlay  | | Hover → Overlay  |
| Tsunako          | | @pixiv_user      | | Compile♥         | | @tw_artist       |
| [Xem bài gốc ↗] | | [Xem bài gốc ↗] | | [Xem bài gốc ↗] | | [Xem bài gốc ↗] |
+------------------+ +------------------+ +------------------+ +------------------+

==============================================================================
FOOTER (padding:40px 0, background: dark slate)
Disclaimer phi thương mại | Thiết kế & phát triển với đam mê | Portfolio link
==============================================================================

                                               ┌───────────────────────────┐
                                               │  [ 🐰 YOSHINON ]          │
                                               │  "Cậu muốn tớ dẫn đi xem │
                                               │   tranh của Yoshino ko?"  │
                                               └───────────────────────────┘
```

---

## 7. Data Contracts (TypeScript)

### 7.1. TypeScript Interfaces (Final)

```typescript
// Domain Data Model — lưu trong DB/CMS
export type ArtworkCategory = 'official' | 'fanart' | 'collab';

// UI State — trạng thái bộ lọc trên giao diện
// 'all' = không áp dụng filter → trả về toàn bộ artworks
export type GalleryFilter = 'all' | ArtworkCategory;

export interface ArtistCredit {
  name: string;
  platform: 'pixiv' | 'twitter' | 'artstation' | 'official';
  handle?: string;       // Ví dụ: "@tsunako_official"
  sourceUrl: string;
}

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;  // Không bao giờ là 'all'
  imageUrl: string;
  blurDataUrl?: string;       // Lấy từ Sanity asset->metadata.lqip (tự động, không nhập thủ công)
  width: number;
  height: number;
  credit: ArtistCredit;
  publishedDate?: string;
  curatorNote?: string;       // Ghi chú cảm xúc/đánh giá của curator — nhập thủ công trong Sanity Studio
}

export interface CharacterDossier {
  codename: string;           // "The Hermit"
  spiritNumber: string;       // "02"
  nameRomanized: string;      // "Himekawa Yoshino"
  nameKanji: string;          // "氷芽川 四糸乃"
  astralDress: string;        // "Zadkiel Coat"
  angelName: string;          // "Zadkiel"
  personalitySummary: string;
  keyQuote: string;           // Câu thoại kinh điển — hiển thị trong Dossier Card (xem Decision #5)
}

// Filter logic
const filterArtworks = (artworks: Artwork[], filter: GalleryFilter): Artwork[] => {
  if (filter === 'all') return artworks;
  return artworks.filter(art => art.category === filter);
};
```

### 7.2. Sanity Schema (Final — chuẩn hóa)

```javascript
export default {
  name: 'artwork',
  title: 'Yoshino Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề tác phẩm',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Phân loại',
      type: 'string',
      options: {
        list: [
          { title: 'Official Art (Kadokawa / Tsunako)', value: 'official' },
          { title: 'Community Fanart', value: 'fanart' },
          { title: 'Collaboration & Events', value: 'collab' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'File Hình ảnh',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      // blurDataUrl được lấy qua: image.asset->metadata.lqip (không cần trường riêng)
    },
    {
      name: 'artistName',
      title: 'Tên Họa sĩ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'artistHandle',
      title: 'Handle / Username (@...)',
      type: 'string',
      // Optional — ví dụ: "@tsunako_official"
    },
    {
      name: 'platform',
      title: 'Nền tảng xuất bản',
      type: 'string',
      options: {
        list: ['Pixiv', 'X (Twitter)', 'Official Kadokawa', 'ArtStation'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sourceUrl',
      title: 'Đường dẫn bài đăng gốc',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'publishedDate',
      title: 'Ngày đăng tranh',
      type: 'date',
      // Optional
    },
    {
      name: 'curatorNote',
      title: 'Ghi chú của Curator (Cảm xúc / Nhận xét)',
      type: 'text',
      rows: 3,
      // Optional — nhập thủ công trong Sanity Studio
    },
  ],
};
```

---

## 8. Decisions Log

Ghi lại tất cả quyết định kỹ thuật đã được thống nhất. Tham chiếu trước khi code.

| ID | Câu hỏi | Quyết định | Ngày |
|---|---|---|---|
| DEC-01 | `All` trong Gallery Filter là Category hay UI State? | **UI State**. `ArtworkCategory` chỉ có 3 giá trị domain. `GalleryFilter = 'all' \| ArtworkCategory` là type riêng cho UI. | 2026-09-10 |
| DEC-02 | Sync giữa Sanity Schema và TypeScript Interface? | **Schema Sanity được chuẩn hóa** để match Interface: bổ sung `artistHandle`, `publishedDate`, `curatorNote`. `blurDataUrl` lấy từ `asset->metadata.lqip` tự động. | 2026-09-10 |
| DEC-03 | Sanity: tích hợp từ Sprint nào? | **Mock Data First**: Sprint 1–3 dùng `src/data/mockArtworks.ts`. **Sprint 4** thay bằng `client.fetch()` từ Sanity *(dời từ Sprint 3 — lý do: UI Gallery hoàn thiện với mock data trước, Sanity wire-in sau khi có account + projectId)*. | 2026-09-11 *(cập nhật)* |
| DEC-04 | Mobile Responsive có hay không? | **Graceful Degradation**: Desktop-first nhưng có mobile breakpoints. Hero → flex-col, Gallery → grid-cols-1, Snow → 25 hạt, Yoshinon → thu gọn icon. | 2026-09-10 |
| DEC-05 | `keyQuote` hiển thị ở đâu? | **Trong Dossier Card**, bên dưới bảng thông số 2×2, trên CTA buttons. Kiểu chữ: italic Serif, `border-l-2 border-ice-blue/40 pl-3`. | 2026-09-10 |
| DEC-06 | Cơ chế "Highlight" trong Yoshinon Tour? | **Smooth Scroll + Pulsing Glow Ring**: `scrollIntoView({ behavior: 'smooth', block: 'center' })` + class `ring-2 ring-yoshino-green shadow-[0_0_20px_rgba(110,231,183,0.4)]`. Không dùng thư viện ngoài (Driver.js/Intro.js). | 2026-09-10 |
| DEC-07 | Ngôn ngữ hiển thị trên UI? | **English toàn bộ UI** — tiếng Anh là ngôn ngữ phổ biến toàn cầu. Dữ liệu nội dung (keyQuote, tên nhân vật Kanji) giữ nguyên bản gốc. | 2026-09-10 |
| DEC-08 | Spacing & layout — card cảm giác bí bách? | **Mở rộng padding** — DossierCard: `p-10 md:p-12`, `max-w-lg`. Tăng `gap` giữa các element. Letter-spacing labels thoáng hơn. Gap giữa 2 cột Hero tăng. | 2026-09-10 |
| DEC-09 | Color theme — dark hay light? | **Light "Warm Winter Daylight"** — chuyển từ dark `#0B1325` sang palette sáng ấm áp, mô phỏng ánh nắng mùa đông. Background: `#ECF1FB` (winter sky blue-white). Text: dark navy `#18264A`. Glass: `rgba(255,255,255,0.72)`. Snow particles: soft blue `rgba(100,160,220,α)`. Các accent colors được làm sâu hơn để đủ contrast trên nền sáng: Ice Blue `#3B9DD2`, Yoshino Green `#10B87E`. | 2026-09-10 |

---

## 9. Implementation Roadmap

> **Cập nhật 2026-09-11** — Phản ánh thực tế các Sprint đã hoàn thành và điều chỉnh kế hoạch.

### Trạng thái hiện tại

| Sprint | Nhiệm vụ cốt lõi | Output | Status |
|---|---|---|---|
| **Sprint 1** — Design Tokens & Setup | Vite + React + TypeScript; Tailwind v4 `@theme` Design Tokens; Snow Canvas 60 FPS; TypeScript contracts; Mock data | Dev env chuẩn, Canvas chạy, mock artworks sẵn | ✅ **DONE** `6c1334e` |
| **Sprint 2** — Hero & Dossier | Hero 100vh; Standee breathing float; Glassmorphism Dossier Card + `keyQuote` (DEC-05); Snow toggle Navbar; Footer legal | Hero hoàn chỉnh Desktop | ✅ **DONE** `9d39b30` |
| **Sprint 2b** — Design Revision | DEC-07 English UI; DEC-08 Spacious layout; DEC-09 Light "Warm Winter Daylight" palette; Real Yoshino standee | UI chuyên nghiệp, light theme | ✅ **DONE** `0a790b6` |
| **Sprint 3** — Gallery Wall (Mock Data) | FilterBar 4 states + spring animation; ArtworkCard hover overlay + lazy load + category badges; GallerySection với client-side filtering | Gallery hoạt động mượt với mock data | ✅ **DONE** `35f4d7e` |
| **Sprint 4** — Yoshinon & CMS | Floating Yoshinon widget; Tour FSM (Idle→Welcome→Touring→Completed→Dismissed); Smooth scroll + glow ring; **Sanity.io setup + Schema + API fetch** (thay `mockArtworks.ts`) | MVP v1.0 hoàn chỉnh, dữ liệu thực từ CMS | ✅ **DONE** |
| **Sprint 5** — Polish & Deploy | Core Web Vitals tuning (FCP < 1.2s, LCP < 2.0s, CLS < 0.05); Image WebP conversion; Vercel deploy + domain | Live production URL |  **NEXT** |

### Ghi chú điều chỉnh kế hoạch

- **Sanity CMS** được dời từ Sprint 3 → Sprint 4. Lý do: Sprint 3 hoàn toàn có thể build Gallery UI với `mockArtworks.ts` trước — Sanity cần user tạo account + project + cấp `projectId`/`dataset`. Quy trình tốt hơn: UI hoàn thiện trước, CMS wire-in sau.
- **Sprint 2b** (Design Revision) phát sinh do yêu cầu thay đổi ngôn ngữ, spacing, và color palette sau khi Sprint 2 hoàn thành. Đây là bài học về tầm quan trọng của design sign-off trước khi code.
- **Sprint 5** tách riêng để tập trung vào production-readiness (performance, SEO, deploy) — không mix với feature work.
