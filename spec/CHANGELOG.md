# CHANGELOG.md — Yoshino's Home

> Nhật ký ghi lại tất cả thay đổi yêu cầu, quyết định thiết kế và cập nhật spec theo thời gian.
> Format: `[YYYY-MM-DD] — Loại thay đổi: Mô tả`

## [2026-09-12] — Pre-Sprint 5 Design Polish: Unified Background, Continuous Snow & Masonry Gallery

### 🎨 Quyết định & Thay đổi thiết kế
- **DEC-11 (Đồng bộ màu nền & Tuyết rơi toàn trang)**:
  - Loại bỏ màu nền đục `#FDF6EC` ở GallerySection và `#ECF1FB` ở FooterSection.
  - Toàn trang dùng chung nền `--color-winter-sky: #ECF1FB`; các section sử dụng nền trong suốt (`bg-transparent`) kết hợp dải ambient radial glow (pha lẫn sắc xanh băng `rgba(59,157,210,0.06)` và lục bảo `rgba(16,184,126,0.04)`).
  - Canvas tuyết rơi `SnowCanvas` (`fixed inset-0`) hiển thị mượt mà xuyên suốt từ Hero qua Gallery, Credits đến Footer mà không bị che khuất.
- **DEC-12 (Bố cục tranh Masonry & Tỷ lệ khung hình tự nhiên)**:
  - Bỏ khóa cứng `aspect-ratio: 3/4` và `object-cover` gây cắt xén tranh trong `ArtworkCard`.
  - Chuyển `GallerySection` sang bố cục Masonry đa cột (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5`) với `break-inside-avoid`.
  - Tính toán `aspectRatio` tự nhiên linh hoạt dựa trên `width / height` từ metadata của Sanity hoặc mock data, tôn trọng 100% tỷ lệ gốc (16:9, 4:3, 3:4, 9:16, 1:1,...) mà không bị crop bất kỳ góc nào, đồng thời duy trì CLS < 0.05.
  - Cập nhật mock data đa dạng tỷ lệ để kiểm thử trực quan.
- **DEC-13 (Ngôn ngữ nội dung Thẻ Hồ Sơ — Song ngữ Nhật-Anh)**:
  - Thống nhất `personalitySummary` sang tiếng Anh chuẩn (`"Shy, gentle, and deeply caring — yet wielding the absolute power of freezing ice."`).
  - `keyQuote` trình bày dạng song ngữ nghệ thuật: câu thoại tiếng Nhật nguyên bản `「私……誰も傷つけたくないんです……」` kèm phụ đề tiếng Anh `“I... don't want to hurt anyone...”`.
  - Cập nhật toàn bộ `curatorNote` trong mock data sang tiếng Anh nhất quán.
- **DEC-14 (Tối ưu Standee WebP & Rollup Vendor Code-Splitting)**:
  - Chuyển đổi ảnh Standee từ PNG 2.84 MB sang WebP Retina 2x (800px) ~212 KB (giảm hơn 92% dung lượng), giải quyết triệt để nút thắt cổ chai LCP trên Hero.
  - Cấu hình Rollup `manualChunks` trong `vite.config.ts` chia tách vendor libraries (`vendor-react`, `vendor-motion`, `vendor-sanity`), loại bỏ cảnh báo bundle size > 500 kB.

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
- **Sanity.io CMS Integration (FR-02, §7.2, DEC-02, DEC-03, DEC-10)**:
  - Cài đặt `@sanity/client` và `@sanity/image-url`.
  - Cài đặt và cấu hình độc lập **Sanity Studio v3 workspace** tại `studio/` (`npm run studio` trên `http://localhost:3333`).
  - Chuẩn hóa schema file `studio/schemas/artwork.ts` và `sanity/schemas/artwork.ts`.
  - **DEC-10 (Schema Simplification)**: Tinh giản form Studio, loại bỏ 3 trường nhập tay dư thừa (`artistHandle`, `platform`, `publishedDate`); tự động nhận diện `platform` (`inferPlatform`) từ URL Pixiv/Twitter và sắp xếp theo `_createdAt desc`.
  - Setup service `src/lib/sanity.ts` với GROQ query đầy đủ metadata LQIP (`blurDataUrl`), kích thước, credit họa sĩ.
  - **Graceful Fallback Mechanism**: Tự động fallback về `mockArtworks.ts` khi chưa cấu hình `VITE_SANITY_PROJECT_ID` hoặc offline, không làm gián đoạn trải nghiệm người dùng.
  - Template biến môi trường `.env.example`.
  - Hook `useArtworks` và Skeleton loading state trong `GallerySection`.
  - **Live Verification**: Đã đăng thành công tác phẩm đầu tiên *"Yoshino x Natsumi"* (họa sĩ だいふく) qua Sanity Studio và hiển thị mượt mà trên website.

### 📁 Files mới
- `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/schemas/artwork.ts`, `studio/schemas/index.ts`, `studio/package.json`
- `src/components/ui/YoshinonMascot.tsx`
- `src/hooks/useTourGuide.ts`
- `src/hooks/useArtworks.ts`
- `src/lib/sanity.ts`
- `sanity/schemas/artwork.ts`
- `.env.example`

### 📋 Commits
- `ed4a4ee` feat(sprint-4): Yoshinon Tour Guide widget & Sanity CMS integration
- `4e99cc7` feat: setup Sanity Studio workspace in studio/ directory
- `a01d170` chore: ignore .sanity directory
- `b8b7ba9` refactor(sanity): simplify artwork schema by removing redundant handle, platform, and date fields

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
