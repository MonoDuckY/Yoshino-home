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

| Khu vực | MVP In-Scope (Sprint 1–4) | Sprint 5 (Creative Exhibition & Lore) | Backlog V2+ |
|---|---|---|---|
| Hồ sơ nhân vật | Thẻ Identity, Standee breathing animation | **Appearance / Costume Switcher (Hololive ref)**, Song ngữ Nhật-Anh (DEC-13) | Voice Lines Audio Player, Live2D |
| Bối cảnh & Dữ liệu | Bảng thông số 2×2 tóm tắt | **Màn "Data" (Character Archive Chronicles)**: Xuất thân, Ngoại hình, Zadkiel - Độ không tuyệt đối, Yoshinon alter-ego (FR-05) | Interactive 3D Model, Timeline chi tiết các Vol |
| Phòng triển lãm | Lưới tranh, 4 filter states, Hover overlay, Credit | **Exhibition Walkthrough**: Sticky Horizontal Scroll (Awwwards/FWA style), Pinned FilterBar, Progress indicator (FR-02) | Lightbox Zoom chi tiết, Bình luận tranh |
| Cộng đồng | Chưa có | **Sổ lưu bút (Mini Guestbook — Winter Hearth Wishes)** kết nối Sanity CMS (FR-06) | Hệ thống tài khoản fan, Upvote tranh |
| Yoshinon Mascot | Floating widget, Chào mừng, Tour 4 bước | **Nâng cấp Tour Guide FSM 6 bước** dẫn dắt qua Data, Walkthrough & Guestbook (FR-03) | AI Chatbot hội thoại tự do |
| Môi trường & Tech | Canvas tuyết 60 FPS, Toggle bật/tắt, Light palette | **Tuyết rơi toàn trang xuyên suốt** (DEC-11), Standee WebP 217KB, Rollup Code-Splitting (DEC-14) | BGM Audio Player, Theme switcher |
| CMS | Sanity.io artwork schema (Sprint 4) | **Guestbook Schema** trên Sanity Studio v3 (DEC-19) | Đăng nhập OAuth2 quản trị trực tiếp trên web |

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

- Render ảnh Yoshino định dạng WebP/PNG trong suốt với `floating` breathing animation (DEC-14: Retina 2x WebP ~217KB, fetchPriority='high')
- **Appearance / Costume Switcher (DEC-18)**: Thanh chọn trang phục phong cách Hololive (`Zadkiel Coat Astral Dress`, `Winter Casual`, `Raizen High Uniform`) với animation cross-fade mượt mà (`AnimatePresence mode="wait"`)
- Dossier Card (Glassmorphism):
  - Spirit Identifier: `Spirit No. 02 — The Hermit`
  - Họ tên: `氷芽川 四糸乃 (Himekawa Yoshino)`
  - Thiên sứ: `Zadkiel (Frozen Puppet — Con rối băng khổng lồ)`
  - Linh phục: `Zadkiel Coat (Thần Uy Linh Trang Số 4)`
  - Tính cách: English summary `Shy, gentle, and deeply caring — yet wielding the absolute power of freezing ice.` (DEC-13)
  - **`keyQuote`** (DEC-13): Trình bày song ngữ tinh tế với câu tiếng Nhật nguyên bản `「私……誰も傷つけたくないんです……」` và phụ đề tiếng Anh `“I... don't want to hurt anyone...”`
  - 2 CTA: [Explore Gallery ↓] và [🐰 Ask Yoshinon]

### FR-02: Gallery Wall (Adaptive Multi-column Masonry Layout)

- **Cơ chế Cuộn dọc Thuần túy (DEC-16 Revision - Phương án B)**: Toàn bộ website duy trì trục lướt dọc tự nhiên 100% (Hero → Data Archive → Gallery Wall → Guestbook → Footer), ngăn chặn triệt để hiện tượng "kẹt cuộn" (scroll trap) khi phòng tranh mở rộng hàng chục hoặc hàng trăm tác phẩm.
- **Bố cục Masonry Đa cột (DEC-12)**: Sử dụng CSS multi-column (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5`) với `break-inside-avoid`, cho phép thưởng lãm nhiều bức tranh cùng lúc trên một màn hình thoáng đãng.
- **Pinned Header & FilterBar**: 4 trạng thái lọc (`All`, `Official Art`, `Community Fanart`, `Collaborations`) lọc động không giật lag.
- **Adaptive Natural Aspect Ratio**: Hiển thị theo tỷ lệ tự nhiên dựa trên `width/height` từ metadata, tôn trọng 100% bố cục gốc của tác giả (16:9, 4:3, 3:4, 9:16, 1:1,...), chống giật layout (CLS < 0.05, DEC-12).
- Category badge góc, hover overlay với attribution và nút "View Source ↗" (US-03).

### FR-03: Yoshinon Tour Guide (Upgraded 6-Step FSM)

- `position: fixed; bottom: 24px; right: 32px; z-index: 40`
- State machine mở rộng: `Idle → Welcome → Touring (Steps 1–6) → Completed → Dismissed`
- 6 bước tour chi tiết:
  1. **Intro & Welcome** — Giới thiệu Yoshino và căn phòng tuyết ấm áp
  2. **Costume Wardrobe** — Hướng dẫn thử đổi trang phục cho Yoshino trên Hero
  3. **Archive Lore** — Dẫn sang màn Data khám phá xuất thân và bí mật về Zadkiel
  4. **Gallery Wall** — Hướng dẫn thưởng lãm phòng tranh đa cột với bộ lọc danh mục
  5. **Guestbook** — Mời để lại một dòng lưu bút gửi tặng Yoshino
  6. **Farewell** — Lời chúc thưởng lãm vui vẻ và thu về trạng thái mascot thường trực

### FR-04: Snow Canvas

- Canvas tuyết rơi cố định toàn màn hình (`fixed inset-0 pointer-events-none`), hiển thị xuyên suốt toàn bộ các section (Hero, Data, Gallery, Guestbook, Footer) nhờ hệ thống nền trong suốt và ambient lighting (DEC-11)
- 50–80 hạt tuyết (Desktop); **giảm còn 25 hạt trên Mobile** *(Decision #4)*
- Mỗi hạt: radius 1–3.5px, velocity Y 0.4–1.8px/frame, drift X theo sin, opacity 0.25–0.70
- Toggle button trên navbar
- Tự động pause khi `document.hidden === true` (tiết kiệm CPU khi ẩn tab)

### FR-05: Character Data & Archive Chronicles (DEC-17)

- Màn thông tin chuyên sâu đặt giữa Profile và Gallery với phong cách kính mờ Frost Glassmorphism
- 4 phân khu dữ liệu tương tác (Interactive Dossier Tabs / Bento Grid):
  1. **Origins & Spirit Identity**: Xuất thân Second Spirit, First Appearance (Light Novel Volume 2 / Anime S1 Ep. 4), bản chất linh hồn
  2. **Physical Traits & Attire**: Chiều cao 144 cm, tóc xoăn xanh lam, gương mặt búp bê sứ, áo mưa tai thỏ Zadkiel Coat
  3. **Angel Zadkiel (氷結傀儡)**: Quyền năng Độ Không Tuyệt Đối (-273.15°C), Siryon Cannon, Frost Barrier
  4. **Yoshinon The Alter-Ego**: Cơ chế phòng vệ tâm lý khi tổn thương, chú thỏ bịt mắt hải tặc và sự tự tin bù trừ

### FR-06: Mini Guestbook — Winter Hearth Wishes (DEC-19)

- Bảng lưu bút mùa đông đặt trước chân trang: Nơi fan và người ghé thăm để lại tin nhắn ngắn (tối đa 120 ký tự), tên/biệt danh và thả tim tuyết ❄
- Giao diện: Các mảnh giấy tuyết (Frost Note Cards) xếp so le nghệ thuật
- Tích hợp schema `guestbook` trên Sanity CMS để lưu trữ và quản trị kiểm duyệt tin nhắn

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
  ├── Nav Links: [Profile] | [Data] | [Gallery] | [Guestbook] | [Credits]
  └── Controls: [❄ Snow On/Off]

[Section 1: Hero & Living Room — 100vh]
  ├── Canvas: Full-viewport Snowflakes (50–80 particles)
  ├── Col Left: Yoshino Standee + Costume Switcher (Hololive pattern)
  └── Col Right: Dossier Card (Glassmorphism, Bilingual Quote JP/EN)
        ├── Tag: SPIRIT NO. 02 • THE HERMIT
        ├── H1: HIMEKAWA YOSHINO + Kanji
        ├── Stats Grid 2×2: Astral Dress | Angel | Personality (English)
        ├── keyQuote (Bilingual: 「私……誰も傷つけたくないんです……」 + English subtitle)
        └── CTAs: [Explore Gallery ↓] [🐰 Ask Yoshinon]

[Section 2: Character Archive & Data Chronicles]
  ├── Section Heading: ARCHIVE / CHRONICLES
  └── Interactive Dossier Grid (Origins, Physique, Angel Zadkiel, Yoshinon)

[Section 3: Exhibition Walkthrough (Horizontal Scroll Gallery)]
  ├── Sticky 350vh Viewport (Scroll Y -> Translate X)
  ├── Pinned Header & FilterBar: [All] | [Official] | [Fanart] | [Collab]
  ├── Scroll Progress Bar & Walkthrough Hint
  └── Horizontal Track with Natural Ratio Artworks (ArtworkCard × N)

[Section 4: Winter Hearth Wishes (Mini Guestbook)]
  ├── Section Heading: WINTER HEARTH WISHES
  ├── Note Wall: Frost Note Cards with visitor wishes
  └── Interactive Form: Leave a warm wish + nickname + snow heart

[Section 5: Footer — Cozy Hearth]
  ├── Legal Disclaimer (phi thương mại Kadokawa/Tsunako)
  ├── Attribution & Fan Tribute Credits
  └── Developer Portfolio Link

[Floating Element]
  └── Yoshinon Widget (fixed, bottom-right, 6-step Interactive Tour)
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
  personalitySummary: string; // Tóm tắt tính cách bằng tiếng Anh (DEC-13)
  keyQuoteJp: string;         // Câu thoại tiếng Nhật nguyên bản: 「私……誰も傷つけたくないんです……」 (DEC-13)
  keyQuoteEn: string;         // Bản dịch phụ đề tiếng Anh: "I... don't want to hurt anyone..." (DEC-13)
}

// Filter logic
const filterArtworks = (artworks: Artwork[], filter: GalleryFilter): Artwork[] => {
  if (filter === 'all') return artworks;
  return artworks.filter(art => art.category === filter);
};
```

### 7.2. Sanity Schema (Final — Chuẩn hóa tinh gọn)

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
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'File Hình ảnh',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      // blurDataUrl được lấy tự động qua: image.asset->metadata.lqip
    },
    {
      name: 'artistName',
      title: 'Tên Họa sĩ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sourceUrl',
      title: 'Đường dẫn bài đăng gốc (Pixiv, Twitter/X, ArtStation...)',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
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
| DEC-10 | Tinh giản Sanity Studio Form Fields | **Loại bỏ 3 trường thủ công**: `artistHandle`, `platform`, `publishedDate` khỏi form Studio để giảm thao tác nhập liệu; `platform` được tự động nhận diện từ `sourceUrl` (`pixiv.net`, `x.com`, `artstation.com`); thứ tự hiển thị sắp xếp theo `_createdAt desc`. | 2026-09-11 |
| DEC-11 | Đồng bộ màu nền & Hiệu ứng tuyết rơi toàn trang | **Unified Background & Full-site Snow Layering**: Loại bỏ khối nền kem đục cứng `#FDF6EC` ở Gallery và `#ECF1FB` ở Footer; toàn trang dùng chung nền `--color-winter-sky: #ECF1FB`; các section dùng nền trong suốt (`bg-transparent`) kết hợp ambient radial glow nhẹ, giúp `SnowCanvas` (`fixed inset-0`) hiển thị xuyên suốt toàn trang từ Hero đến Footer. | 2026-09-12 |
| DEC-12 | Bố cục tranh Gallery với đa dạng tỷ lệ khung hình | **Adaptive Natural Aspect Ratio & Masonry Layout**: Bỏ khóa cứng `aspect-ratio: 3/4` và `object-cover` gây cắt xén tranh; chuyển sang bố cục Masonry đa cột (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5`), tự động tính `aspectRatio` từ `width/height` của ảnh để giữ trọn vẹn bố cục gốc của họa sĩ (16:9, 4:3, 3:4, 9:16, 1:1,...) mà vẫn đảm bảo CLS < 0.05. | 2026-09-12 |
| DEC-13 | Ngôn ngữ nội dung Thẻ Hồ Sơ (Phương án B Song ngữ) | **Bilingual Japanese Quote & English Copy Cohesion**: Thống nhất `personalitySummary` sang tiếng Anh; `keyQuote` trình bày dạng song ngữ nghệ thuật với câu thoại tiếng Nhật nguyên bản `「私……誰も傷つけたくないんです……」` kèm phụ đề tiếng Anh `“I... don't want to hurt anyone...”`; các `curatorNote` trong mock data đồng bộ sang tiếng Anh. | 2026-09-12 |
| DEC-14 | Tối ưu dung lượng Standee & Bundle Size (LCP & FCP) | **Standee WebP Compression & Vite Code-Splitting**: Chuyển ảnh Standee Yoshino từ PNG 2.84 MB sang WebP Retina 2x (800px) ~212 KB (giảm hơn 92% dung lượng), đảm bảo LCP < 2.0s; cấu hình Rollup `manualChunks` trong `vite.config.ts` chia tách vendor libraries (`vendor-react`, `vendor-motion`, `vendor-sanity`), triệt tiêu cảnh báo chunk > 500 kB. | 2026-09-12 |
| DEC-15 | Định hướng ưu tiên Desktop Creative Exhibition | **Desktop Showcase First & Graceful Fallback**: Tập trung 100% tinh hoa trải nghiệm thị giác và micro-interactions cho Desktop/Laptop; thiết bị di động Mobile sử dụng cơ chế fallback thông minh (tự động co giãn theo trục dọc hoặc swipe ngón tay tự nhiên) mà không làm ảnh hưởng đến layout nghệ thuật chính. | 2026-09-12 |
| DEC-16 | Bố cục Gallery: Cuộn ngang hay Cuộn dọc thuần túy? | **Pure Vertical Flow with Adaptive Masonry (Phương án B)**: Giữ trục cuộn dọc tự nhiên 100% cho toàn bộ website; giải quyết triệt để rủi ro "scroll trap" khi phòng tranh có hàng chục hoặc hàng trăm tranh khiến người dùng không biết khi nào cuộn xong; kết hợp lưới Masonry đa cột (DEC-12) giúp xem được nhiều tác phẩm cùng lúc, giữ trọn tỷ lệ gốc và lướt qua dễ dàng xuống Guestbook/Footer. | 2026-09-12 *(cập nhật)* |
| DEC-17 | Kiến trúc Màn Data (Character Archive Chronicles) | **Interactive Bento Lore Cards**: Đặt giữa Profile và Gallery; tổng hợp thông tin nhân vật chính xác từ Date A Live (Xuất thân Second Spirit Vol. 2, Ngoại hình búp bê tuyết 144cm & áo mưa Zadkiel Coat, Thiên sứ Zadkiel - Độ không tuyệt đối, và Nhân cách Yoshinon tự vệ). | 2026-09-12 |
| DEC-18 | Chuyển đổi trang phục Standee (Hololive Pattern) | **Hero Costume Switcher Pill**: Bố trí thanh chọn trang phục phía dưới Standee Hero (`Zadkiel Coat`, `Winter Casual`, `Raizen Uniform`); chuyển đổi ảnh Standee mượt mà bằng Framer Motion `AnimatePresence mode="wait"`. | 2026-09-12 |
| DEC-19 | Sổ lưu bút cộng đồng & Sanity CMS Persistence | **Winter Hearth Wishes Note Wall**: Khu vực lưu bút đặt trước Footer cho phép fan gửi lời chúc ngắn (120 ký tự), tên/biệt danh và icon tuyết; lưu trữ và kiểm duyệt qua Sanity CMS schema `guestbook`. | 2026-09-12 |

---

## 9. Implementation Roadmap

> **Cập nhật 2026-09-12** — Phản ánh kế hoạch mở rộng toàn diện cho Sprint 5 (Creative Frontend Exhibition) và dời Deploy/Vercel sang Sprint 6.

### Trạng thái hiện tại

| Sprint | Nhiệm vụ cốt lõi | Output | Status |
|---|---|---|---|
| **Sprint 1** — Design Tokens & Setup | Vite + React + TypeScript; Tailwind v4 `@theme` Design Tokens; Snow Canvas 60 FPS; TypeScript contracts; Mock data | Dev env chuẩn, Canvas chạy, mock artworks sẵn | ✅ **DONE** `6c1334e` |
| **Sprint 2** — Hero & Dossier | Hero 100vh; Standee breathing float; Glassmorphism Dossier Card + `keyQuote` (DEC-05); Snow toggle Navbar; Footer legal | Hero hoàn chỉnh Desktop | ✅ **DONE** `9d39b30` |
| **Sprint 2b** — Design Revision | DEC-07 English UI; DEC-08 Spacious layout; DEC-09 Light "Warm Winter Daylight" palette; Real Yoshino standee | UI chuyên nghiệp, light theme | ✅ **DONE** `0a790b6` |
| **Sprint 3** — Gallery Wall (Mock Data) | FilterBar 4 states + spring animation; ArtworkCard hover overlay + lazy load + category badges; GallerySection với client-side filtering | Gallery hoạt động mượt với mock data | ✅ **DONE** `35f4d7e` |
| **Sprint 4** — Yoshinon & CMS | Floating Yoshinon widget; Tour FSM (Idle→Welcome→Touring→Completed→Dismissed); Smooth scroll + glow ring; **Sanity.io setup + Studio workspace + simplified schema + API fetch** | MVP v1.0 hoàn chỉnh, Sanity Studio & dữ liệu thực live | ✅ **DONE** `ed4a4ee`, `b8b7ba9` |
| **Sprint 5** — Creative Exhibition & Lore | **Màn Data (Archive Lore); Hero Costume Switcher (Hololive ref); Masonry Gallery (Pure Vertical Flow - DEC-16 Revision); Winter Hearth Guestbook + Sanity CMS Persistence; Nâng cấp Tour Guide 6 bước; Tuyết toàn trang; Standee WebP & Bundle split** | Awwwards-tier Interactive Experience hoàn chỉnh | ✅ **DONE** |
| **Sprint 6** — Polish, SEO & Deploy | Core Web Vitals tuning (LCP < 2.0s, CLS < 0.05); OpenGraph metadata; Vercel deployment + Custom Domain | Live Production URL | 🚀 **NEXT** |

### Ghi chú điều chỉnh kế hoạch

- **Sanity CMS** được dời từ Sprint 3 → Sprint 4. Lý do: Sprint 3 hoàn toàn có thể build Gallery UI với `mockArtworks.ts` trước — Sanity cần user tạo account + project + cấp `projectId`/`dataset`. Quy trình tốt hơn: UI hoàn thiện trước, CMS wire-in sau.
- **Sprint 2b** (Design Revision) phát sinh do yêu cầu thay đổi ngôn ngữ, spacing, và color palette sau khi Sprint 2 hoàn thành. Đây là bài học về tầm quan trọng của design sign-off trước khi code.
- **Sprint 5** tách riêng để tập trung vào production-readiness (performance, SEO, deploy) — không mix với feature work.
