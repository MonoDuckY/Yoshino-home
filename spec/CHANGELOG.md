# CHANGELOG.md — Yoshino's Home

> Nhật ký ghi lại tất cả thay đổi yêu cầu, quyết định thiết kế và cập nhật spec theo thời gian.
> Format: `[YYYY-MM-DD] — Loại thay đổi: Mô tả`

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
