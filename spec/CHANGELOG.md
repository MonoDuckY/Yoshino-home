# CHANGELOG.md — Yoshino's Home

> Nhật ký ghi lại tất cả thay đổi yêu cầu, quyết định thiết kế và cập nhật spec theo thời gian.
> Format: `[YYYY-MM-DD] — Loại thay đổi: Mô tả`

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
