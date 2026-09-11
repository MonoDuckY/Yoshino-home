# CHANGELOG.md — Yoshino's Home

> Nhật ký ghi lại tất cả thay đổi yêu cầu, quyết định thiết kế và cập nhật spec theo thời gian.
> Format: `[YYYY-MM-DD] — Loại thay đổi: Mô tả`

---

## [2026-09-11] — Sprint 4 Complete: Yoshinon Tour Guide & Sanity.io CMS Integration

### ✅ Đã hoàn thành
- **Yoshinon Tour Guide (FR-03, US-04, DEC-06)**:
  - Mascot puppet widget fixed góc dưới phải (`bottom: 24px; right: 32px; z-index: 40`), animation vẫy tay và breathing float.
  - State machine FSM 5 trạng thái: `idle` → `welcome` → `touring` → `completed` → `dismissed`.
  - Tự động kích hoạt sau 2s khi tải trang (`sessionStorage` check), hoặc kích hoạt thủ công qua nút "🐰 Ask Yoshinon" trong DossierCard.
  - Highlight engine native: `scrollIntoView` smooth + pulsing green glow ring `.tour-highlight-target` (DEC-06).
  - 4 bước tour chi tiết với step indicator pills, next/back/skip, và copywriting dí dỏm bằng tiếng Anh (DEC-07).
  - Mobile responsive (DEC-04) co giãn gọn gàng trên màn hình hẹp.
- **Sanity.io CMS Integration (FR-02, §7.2, DEC-02, DEC-03)**:
  - Cài đặt `@sanity/client` và `@sanity/image-url`.
  - Chuẩn hóa schema file `sanity/schemas/artwork.ts` theo DRD §7.2.
  - Setup service `src/lib/sanity.ts` với GROQ query đầy đủ metadata LQIP (`blurDataUrl`), kích thước, credit họa sĩ.
  - **Graceful Fallback Mechanism**: Tự động fallback về `mockArtworks.ts` khi chưa cấu hình `VITE_SANITY_PROJECT_ID` hoặc offline, không làm gián đoạn trải nghiệm người dùng.
  - Template biến môi trường `.env.example`.
  - Hook `useArtworks` và Skeleton loading state trong `GallerySection`.

### 📁 Files mới
- `src/components/ui/YoshinonMascot.tsx`
- `src/hooks/useTourGuide.ts`
- `src/hooks/useArtworks.ts`
- `src/lib/sanity.ts`
- `sanity/schemas/artwork.ts`
- `.env.example`

---

## [2026-09-11] — Sprint 3 Complete: Gallery Wall

### ✅ Đã hoàn thành
- **FilterBar** — 4 states: All Works / Official Art / Community Fanart / Collaborations
  - Framer Motion `layoutId` spring animation trên active pill
  - `aria-pressed` attribute cho accessibility
- **ArtworkCard** — `aspect-ratio: 3/4` fixed → CLS = 0 (NFR §4.1)
  - `loading="lazy"` + `decoding="async"` trên tất cả ảnh
  - Category badges màu-coded: ice-blue (Official) / green (Fanart) / amber (Collab)
  - Hover overlay với `AnimatePresence`: title, artist handle, curatorNote (line-clamp-2)
  - **"View Source ↗"** button → `target="_blank"` (US-03 compliant)
- **GallerySection** — client-side filtering với `useState<GalleryFilter>('all')`
  - `filterArtworks()` từ `src/types/index.ts` (DEC-01)
  - `AnimatePresence mode="popLayout"` cho card exit animation
  - Work count indicator + empty state handling
- **App.tsx** — `GalleryPlaceholder` → `GallerySection` swap

### 📁 Files mới
- `src/components/ui/FilterBar.tsx`
- `src/components/ui/ArtworkCard.tsx`
- `src/components/sections/GallerySection.tsx`

### 📋 Commits
- `35f4d7e` feat(sprint-3): Gallery Wall — FilterBar, ArtworkCard, GallerySection

---

## [2026-09-11] — Design Revision: DEC-07/08/09

### Quyết định mới
- **DEC-07** — Full English UI (Profile / Gallery / Credits / Explore Gallery / Ask Yoshinon)
- **DEC-08** — Spacious layout: DossierCard `p-10 md:p-12`, `max-w-lg`, tăng gaps/letter-spacing
- **DEC-09** — Light "Warm Winter Daylight" palette: bg `#ECF1FB` + `#FDF6EC`, text navy `#18264A`, snow cornflower blue
- Standee: swap `hero.png` placeholder → ảnh Yoshino + Yoshinon thật (PNG transparent)

### 📋 Commits
- `0a790b6` refactor: DEC-07/08/09 — English UI, light palette, spacious layout
- `85df2d7` feat: replace placeholder standee with real Yoshino artwork

---

## [2026-09-10] — Sprint 2 Complete: Hero Section & Dossier Card

### ✅ Đã hoàn thành
- **Navbar** — fixed 64px, `backdrop-blur: 12px`, logo Cinzel, nav links smooth-scroll, snow toggle button
- **HeroSection** — 100vh, 2-cột Desktop / flex-col Mobile (DEC-04)
  - Standee breathing float: `y: [0, -14, 0]` với `duration: 4.5s` (FR-01)
  - Radial glow ring phía sau standee
  - Scroll indicator animate ở cuối section
- **DossierCard** (Glassmorphism) — `backdrop-blur: 12px`, `rgba(255,255,255,0.06)` bg
  - Spirit tag, H1 HIMEKAWA/YOSHINO, Kanji subtitle
  - Stats grid 2×2: Linh phục | Thiên sứ | Tính cách (col-span-2)
  - `keyQuote` — italic Georgia/Playfair serif + `border-left: 2px ice-blue/35` (DEC-05)
  - CTA: "Khám phá tranh ↓" (yoshino-green) + "🐰 Hỏi Yoshinon" (ghost)
  - Staggered entrance animation (Framer Motion variants)
- **GalleryPlaceholder** — stub section #gallery với placeholder grid 2×4
- **Footer** — legal disclaimer đầy đủ (NFR §4.3), "Fan-made Non-profit Tribute"
- **Fix** — khôi phục tiếng Việt đầy đủ dấu trong tất cả components

### 📁 Files mới
- `src/components/layout/Navbar.tsx`
- `src/components/ui/DossierCard.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/GalleryPlaceholder.tsx`
- `src/components/sections/Footer.tsx`

### 📋 Commits
- `9d39b30` feat(sprint-2): Hero section, Navbar, DossierCard, Footer
- `7b76847` fix(sprint-2): restore Vietnamese diacritics, polish keyQuote font

---

## [2026-09-10] — Khởi tạo dự án & Requirements Alignment

### ✅ Đã hoàn thành
- Đọc và review toàn bộ tài liệu PRD & DRD gốc (`docs/[PRD & DRD] Yoshino's Home...docx`)
- Phát hiện và giải quyết 6 điểm khúc mắc trong phiên thảo luận đầu tiên
- Thiết lập bộ spec files trong `spec/` làm nguồn sự thật dài hạn

### 📋 Decisions được ghi nhận (xem chi tiết trong REQUIREMENTS.md → Decisions Log)

| ID | Tóm tắt quyết định |
|---|---|
| DEC-01 | `GalleryFilter` tách biệt khỏi `ArtworkCategory` — `'all'` là UI state, không phải domain value |
| DEC-02 | Sanity Schema chuẩn hóa: thêm `artistHandle`, `publishedDate`, `curatorNote`; `blurDataUrl` dùng LQIP tự động |
| DEC-03 | Mock Data First (Sprint 1–2) → Sanity integration (Sprint 3) |
| DEC-04 | Desktop-first + Graceful Mobile Degradation: flex-col Hero, 1-col Gallery, 25 snow particles trên mobile |
| DEC-05 | `keyQuote` hiển thị trong Dossier Card, dưới bảng thông số, trên CTA — italic Serif + border-left |
| DEC-06 | Yoshinon Tour dùng native `scrollIntoView` + pulsing glow ring CSS, không dùng thư viện ngoài |

### 📁 Files được tạo
- `spec/README.md` — Tổng quan spec hub
- `spec/REQUIREMENTS.md` — PRD + DRD chuẩn hóa đầy đủ
- `spec/CHANGELOG.md` — File này

---

## Template cho entries tương lai

```
## [YYYY-MM-DD] — Loại thay đổi (ví dụ: Sprint 1 Complete / Requirement Change / Design Update)

### ✅ Đã hoàn thành
- ...

### 🔄 Thay đổi yêu cầu
- **Trước:** ...
- **Sau:** ...
- **Lý do:** ...

### ⚠️ Breaking Changes
- ...

### 🐛 Issues phát hiện
- ...
```
