# REQUIREMENTS.md — Yoshino's Home

> Tài liệu này là phiên bản chuẩn hóa và hợp nhất của PRD & DRD gốc, **tích hợp toàn bộ quyết định kỹ thuật đã được thống nhất**.
> Nguồn gốc tài liệu gốc: `docs/[PRD & DRD] Yoshino's Home - Product & Design Requirements Document.docx`
> **Cập nhật lần cuối: 2026-09-17** — Sprint 6 hoàn tất: Hiện diện 3 form nhân vật (Normal, School, Spirit), Bệ đứng acrylic, Nâng cấp typography Outfit & Klee One, Tinh gọn tiêu đề Gallery/Guestbook, và Kiến trúc bản quyền phân tầng 2 cấp kèm Hộp thoại CreditsModal & liên hệ gỡ bỏ qua Gmail Web Compose / Copy Email.

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

| Khu vực | MVP In-Scope (Sprint 1–4) | Sprint 5 & 6 (Exhibition, 3 Forms & Legal System) | Backlog V2+ |
|---|---|---|---|
| Hồ sơ nhân vật & Bối cảnh | Thẻ Identity, Standee breathing animation, Bảng thông số 2×2 | **Màn "Top" Tinh hoa (DEC-20, DEC-21, DEC-22)**: 3 Form chính thức (Normal, School, Spirit), Bệ đứng acrylic mờ dual-ring + đổ bóng sàn, Typography kép Outfit & Klee One, Bộ chọn avatar tròn Hololive, Thẻ Vital Specs & Lời tâm sự "About Yoshino & Yoshinon" toàn chiều ngang | Voice Lines Audio Player, Live2D |
| Phòng triển lãm | Lưới tranh, 4 filter states, Hover overlay, Credit | **Vertical Masonry Gallery & Streamlined Header (DEC-12, DEC-16, DEC-23)**: Lược bỏ tiêu đề rườm rà, đưa FilterBar 4 trạng thái lên tâm điểm, lưới đa cột co giãn tự nhiên | Lightbox Zoom chi tiết, Bình luận tranh |
| Cộng đồng | Chưa có | **Bảng lưu bút tinh gọn (Winter Hearth Noticeboard — DEC-19, DEC-23)**: Khung bảng trắng trực diện, kết nối Sanity CMS (FR-06) | Hệ thống tài khoản fan, Upvote tranh |
| Yoshinon Mascot | Floating widget, Chào mừng, Tour 4 bước | **Tour Guide FSM 6 bước nâng cấp (FR-03)**: Đồng bộ giới thiệu 3 form trang phục mới và các khu vực nội dung | AI Chatbot hội thoại tự do |
| Pháp lý & Chân trang | Footer 1 dòng | **Kiến trúc bản quyền phân tầng 2 cấp (DEC-24)**: Tầng 1 Minimal Dark Footer; Tầng 2 Hộp thoại CreditsModal (Bản quyền KADOKAWA, Tôn trọng quyền tác giả, Cam kết phi thương mại) kèm nút soạn Gmail & Copy Email | Form tiếp nhận báo cáo vi phạm tự động |
| Môi trường & Tech | Canvas tuyết 60 FPS, Toggle bật/tắt, Light palette | **Tuyết rơi toàn trang xuyên suốt (DEC-11)**, WebP Retina 2x cho 3 Form (DEC-14), Google Fonts Outfit + Klee One | BGM Audio Player, Theme switcher |

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

### FR-01: Unified "Top" Section (3 Character Forms, Acrylic Stage, Specs & Monologue)

- **Standee & Acrylic Stage (DEC-21)**:
  - Khung hiển thị linh hoạt `clamp(420px, 60vh, 640px)` với `objectFit: contain` và `objectPosition: bottom center`, đảm bảo trọn vẹn toàn thân nhân vật không bị cắt chân.
  - Bệ đứng acrylic mờ hai vòng (Frosted Dual-ring Acrylic Pedestal) kết hợp bóng đổ sàn đa lớp (`shadow-[0_12px_28px_rgba(30,58,138,0.22)]`), tạo hiệu ứng chiều sâu như mô hình figure acrylic vật lý.
- **Appearance / Costume Switcher (Hololive Style — DEC-18, DEC-21)**:
  - Cụm chọn trang phục dạng cột dọc bên trái Standee.
  - 3 form trang phục chính thức chuẩn hóa từ tài nguyên đồ họa mới:
    1. **Normal Form** (`Yoshino_normal.webp`): Áo khoác thường ngày ấm áp mùa đông.
    2. **School Uniform** (`Yoshino_raizen.webp`): Đồng phục nữ sinh trường Cao trung Raizen.
    3. **Spirit Form** (`Yoshino_Spirit_Form.webp`): Linh phục Astral Dress (Zadkiel Coat).
  - Avatar dạng tròn (`rounded-full`) viền sáng cyan (`ring-3 ring-[var(--color-ice-blue)]`) khi active.
  - Đồng bộ hóa tiêu cự zoom avatar (`avatarPosition` + `transformOrigin`) giúp căn chính xác gương mặt Yoshino cho từng form trang phục mà không bị lệch xuống eo hay thân.
  - Chuyển đổi mượt mà bằng Framer Motion `AnimatePresence mode="wait"`.
- **Character Typographic Identity & Badges (DEC-22)**:
  - Romaji Name: Sử dụng Google Font `Outfit` (sans-serif geometric hiện đại, sang trọng).
  - Kanji Name: Sử dụng Google Font `Klee One` (font bút lông thanh thoát bán thủ công).
  - Bộ huy hiệu nhận diện linh hồn: `SPIRIT NO. 02`, `IV • CHESED`, `Absolute Zero`.
  - Khối trích dẫn câu thoại iconic phủ sương mờ (`❄️「私……誰も傷つけたくないんです……」` kèm phụ đề Anh ngữ).
- **Vital Profile Specifications Card (Glassmorphism — Tinh gọn DEC-20)**:
  - Tuổi (Age): `13 (Appearance)` / `39–40 (Actual Age)`.
  - Chiều cao (Height): `144 cm`.
  - Biệt danh (Codename): `Hermit`.
  - Lồng tiếng (CV): `Iori Nomizu` (`野水 伊織`).
  - Số đo (Measurements): `73/55/78`.
- **Editorial Monologue — "About Yoshino & Yoshinon" (DEC-20)**:
  - Nằm ở hàng dưới trải rộng theo phương ngang (`max-w-4xl lg:max-w-5xl mx-auto`).
  - Bao bọc bởi cặp dấu ngoặc kép lớn nghệ thuật (`“` và `”`) màu xanh băng tuyết ở hai đầu đoạn văn.
  - Nội dung 3 đoạn văn thuần tiếng Anh tôn vinh hành trình nhân vật và tình cảm của curator.

### FR-02: Gallery Wall (Adaptive Multi-column Masonry & Streamlined Header — DEC-23)

- **Header Tinh gọn (DEC-23)**: Lược bỏ badge `氷結の回廊`, tiêu đề `ART GALLERY` và mô tả dài; đưa `FilterBar` lên làm điểm neo trực quan (`scroll-mt-16`) giúp người dùng tập trung ngay vào việc thưởng lãm nghệ thuật.
- **Cơ chế Cuộn dọc Thuần túy (DEC-16 Revision - Phương án B)**: Toàn bộ website duy trì trục lướt dọc tự nhiên 100% (Hero → Gallery Wall → Guestbook → Footer), ngăn chặn triệt để hiện tượng "kẹt cuộn" (scroll trap).
- **Bố cục Masonry Đa cột (DEC-12)**: Sử dụng CSS multi-column (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5`) với `break-inside-avoid`.
- **FilterBar Động**: 4 trạng thái lọc (`All`, `Official Art`, `Community Fanart`, `Collaborations`) mượt mà không độ trễ.
- **Adaptive Natural Aspect Ratio**: Tôn trọng 100% tỷ lệ gốc (16:9, 4:3, 3:4, 9:16, 1:1,...) với `aspectRatio` metadata tự động, duy trì CLS < 0.05.
- Thẻ tranh tích hợp attribution và nút "View Source ↗" (US-03).

### FR-03: Yoshinon Tour Guide (Upgraded 6-Step FSM)

- `position: fixed; bottom: 24px; right: 32px; z-index: 40`
- State machine: `Idle → Welcome → Touring (Steps 1–6) → Completed → Dismissed`
- Cập nhật Step 1: Giới thiệu căn phòng tuyết và 3 form ngoại hình mới của Yoshino (Normal, School, Spirit).

### FR-04: Snow Canvas

- Canvas tuyết rơi cố định toàn màn hình (`fixed inset-0 pointer-events-none`), hiển thị xuyên suốt toàn bộ các section.
- 50–80 hạt tuyết (Desktop); 25 hạt trên Mobile.
- Tự động pause khi tab ẩn (`document.hidden === true`).

### FR-05: Character Lore & Monologue Reflection (DEC-17, DEC-20)

- Thông điệp và bối cảnh nhân vật được nâng tầm thành **Đoạn văn tự sự toàn chiều ngang (Editorial Monologue)** tại chân màn Top.
- Dữ liệu chi tiết về Lore (`mockArchiveRecords`) được bảo lưu trong codebase sẵn sàng tái tích hợp khi mở rộng tính năng.

### FR-06: Mini Guestbook — Winter Hearth Noticeboard (Streamlined — DEC-19, DEC-23)

- **Header Tinh gọn (DEC-23)**: Lược bỏ badge `冬の暖炉`, tiêu đề `HEARTH NOTICEBOARD` và mô tả dài; đưa khung bảng trắng (whiteboard frame) làm điểm neo trực tiếp (`scroll-mt-16`).
- Nơi fan để lại tin nhắn ngắn (140 ký tự), nickname và chọn stamp biểu tượng (❄️, 💙, 🐰, ✨, 🍵).
- Tích hợp schema `guestbook` trên Sanity CMS lưu trữ đám mây thời gian thực (`useCdn: false`).

### FR-07: Layered Legal Credits & Artist Takedown System (DEC-24)

- **Tầng 1 — Minimal Dark Frosted Footer**:
  - Giao diện tối mờ thanh thoát (`bg-slate-950/70 backdrop-blur-md border-t border-white/10 py-6`).
  - Gồm 3 dòng ngắn gọn: Bản quyền dự án fan-made, Quyền sở hữu IP của KADOKAWA/Tsunako, và dải nút thao tác nhanh: [Credits & Disclaimer] • [GitHub] • [Contact Developer].
- **Tầng 2 — Credits & Disclaimer Modal (`CreditsModal.tsx`)**:
  - Hộp thoại nổi kính mờ toàn màn hình, hỗ trợ phím `Escape` và click-outside backdrop để đóng.
  - Phân tách thành 3 khối nội dung pháp lý chuyên nghiệp:
    1. *Copyright & Intellectual Property*: Xác nhận Date A Live thuộc bản quyền Koushi Tachibana, Tsunako, và KADOKAWA Corporation. Dự án thuần phi thương mại.
    2. *Artist Rights & Takedown Request*: Tôn trọng tác quyền; cam kết phản hồi và gỡ bỏ tác phẩm trong vòng 24–48 giờ nếu họa sĩ yêu cầu.
    3. *Sanctuary & Community Pledge*: Cam kết phi lợi nhuận vĩnh viễn, không chạy quảng cáo, không nhận tài trợ.
  - Kênh liên hệ tiếp nhận yêu cầu gỡ bỏ chính thức: `pvietduc204@gmail.com`:
    - **Nút mở trực tiếp Gmail Web Compose** (`https://mail.google.com/mail/?view=cm&fs=1&to=...` trong tab mới): Giải quyết triệt để vấn đề Windows/Chrome không có ứng dụng email mặc định khiến link `mailto:` không phản hồi.
    - **Nút tiện ích 1-Click Copy Email**: Sao chép địa chỉ `pvietduc204@gmail.com` vào bộ nhớ tạm với phản hồi thị giác xanh lục tức thì ("Copied to clipboard!").
    - **Nút fallback**: Mở ứng dụng Email mặc định của hệ thống.
  - Tích hợp điểm kích hoạt mở modal từ link "Credits" trên `Navbar` và nút tại chân trang `Footer`.

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
  ├── Nav Links: [Top] | [Gallery] | [Noticeboard] | [Credits (Modal)]
  └── Controls: [❄ Snow On/Off]

[Section 1: Unified Top — Hero, 3 Forms, Pedestal & Monologue — 100vh+]
  ├── Canvas: Full-viewport Snowflakes (50–80 particles)
  ├── Row 1 (Hero Main):
  │     ├── Col Left (Costume Selector): 3 Avatar Switchers (Normal, School, Spirit) + Cyan Ring Indicator
  │     ├── Col Center (Standee Stage): WebP Retina Standee + Frosted Acrylic Dual-ring Pedestal & Ground Shadow
  │     └── Col Right (Vital Profile):
  │           ├── Badges: SPIRIT NO. 02 • IV • CHESED • Absolute Zero
  │           ├── Title: HIMEKAWA YOSHINO (Outfit) / 氷芽川 四糸乃 (Klee One)
  │           ├── Frosted Quote: ❄️「私……誰も傷つけたくないんです……」
  │           └── Specs List: Age (13/39-40), Height (144cm), Codename (Hermit), CV (Iori Nomizu), BWH (73/55/78)
  └── Row 2 (Tribute Monologue): Full-width Editorial Reflection bounded by large artistic ice quotes (“ ”)

[Section 2: Curated Gallery Wall — Vertical Adaptive Masonry]
  ├── Centered FilterBar (scroll-mt-16): [All] | [Official Art] | [Community Fanart] | [Collaborations]
  └── Adaptive Masonry Grid: Multi-column layout with natural aspect-ratio artworks (ArtworkCard × N)

[Section 3: Winter Hearth Noticeboard — Mini Guestbook]
  ├── Whiteboard Frame (scroll-mt-16) with natural pins & warm ambiance
  ├── Note Wall: Multi-color frost cards with visitor wishes & stamps (❄️, 💙, 🐰, ✨, 🍵)
  └── Interactive Form: Submit wish (140 max) + nickname + stamp

[Section 4: Minimal Dark Frosted Footer]
  ├── Line 1: © 2026 Yoshino's Home • Fan-made tribute project.
  ├── Line 2: Date A Live belongs to Koushi Tachibana / Tsunako / KADOKAWA.
  └── Line 3: [Credits & Disclaimer (Trigger Modal)] • [GitHub Source] • [Contact Developer]

[Overlay / Dialogs]
  ├── Credits & Disclaimer Modal (CreditsModal.tsx): 3 Legal Cards + Gmail Web Compose & Copy Email (pvietduc204@gmail.com)
  └── Yoshinon Mascot (fixed, bottom-right, 6-step Interactive Tour)
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
  age: {
    appearance: string;       // "13 (Appearance)"
    actual: string;           // "39-40 (Actual Age)"
  };
  height: string;             // "144 cm"
  measurements: string;       // "73/55/78"
  seiyuu: {
    nameEn: string;           // "Iori Nomizu"
    nameJp: string;           // "野水 伊織"
  };
  astralDress: string;        // "Zadkiel Coat"
  angelName: string;          // "Zadkiel"
  personalitySummary: string; // Tóm tắt tính cách bằng tiếng Anh (DEC-13)
  keyQuoteJp: string;         // Câu thoại tiếng Nhật nguyên bản: 「私……誰も傷つけたくないんです……」 (DEC-13)
  keyQuoteEn: string;         // Bản dịch phụ đề tiếng Anh: "I... don't want to hurt anyone..." (DEC-13)
  keyQuote?: string;          // Optional legacy fallback
  tribute: {
    title: string;            // "About Yoshino & Yoshinon"
    content: string;          // 3 đoạn văn tự sự tiếng Anh (DEC-20)
  };
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
| DEC-20 | Hợp nhất Profile & Archive thành màn Top (Hololive Ref & Monologue) | **Unified "Top" Hero Section & Editorial Monologue**: Hợp nhất hai màn Profile và Archive thành màn "Top" duy nhất (`#top`); thanh chọn ngoại hình chuyển sang dạng avatar tròn phong cách Hololive Talent (viền cyan, icon kính lúp, mũi tên `▼`); lược bỏ các thông số/phụ đề rườm rà trong thẻ Vital Specs; chuyển "About Yoshino & Yoshinon" xuống dưới thành đoạn văn tự sự toàn chiều ngang bọc trong cặp dấu ngoặc kép lớn nghệ thuật (`“` và `”`); đồng bộ 100% màu nền xanh tuyết `--color-winter-sky: #ECF1FB` liền mạch với Gallery. | 2026-09-15 |
| DEC-21 | Chuẩn hóa hiện diện nhân vật & Bệ đứng Standee | **3 Character Forms & Frosted Acrylic Pedestal**: Chuẩn hóa 3 form trang phục chính thức từ tài nguyên ảnh chất lượng cao (`Yoshino_normal.webp`, `Yoshino_raizen.webp`, `Yoshino_Spirit_Form.webp`); thiết lập bệ đứng acrylic mờ hai vòng (Frosted Dual-ring Acrylic Pedestal) kết hợp bóng đổ sàn đa lớp (`shadow-[0_12px_28px_rgba(30,58,138,0.22)]`), tạo hiệu ứng chiều sâu như mô hình figure acrylic; đồng bộ hóa tiêu cự zoom avatar selector (`avatarPosition` + `transformOrigin`). | 2026-09-17 |
| DEC-22 | Định hình font chữ & Nhận diện nhân vật Hero | **Typographic Pairing (Outfit & Klee One) & Stray Watermark Abandonment**: Tích hợp Google Font `Outfit` (sans-serif geometric hiện đại cho Romaji) và `Klee One` (font bút lông thanh thoát bán thủ công cho Kanji); bổ sung huy hiệu nhận diện linh hồn (`SPIRIT NO. 02`, `IV • CHESED`, `Absolute Zero`) cùng hộp thoại trích dẫn câu thoại iconic phủ sương mờ; hủy bỏ hiển thị watermark "02" to ở nền để tránh gây nhầm lẫn thị giác như vết ố hay chữ "O" lơ lửng. | 2026-09-17 |
| DEC-23 | Tinh gọn các khối tiêu đề section (Gallery & Guestbook) | **Section Header Streamlining for Curated Content**: Dựa trên thanh Navbar cố định đã định hướng rõ ràng cho người dùng, lược bỏ các cụm tiêu đề/mô tả rườm rà tại Gallery (`氷結の回廊` / `ART GALLERY`) và Noticeboard (`冬の暖炉` / `HEARTH NOTICEBOARD`); đưa `FilterBar` (Gallery) và khung bảng trắng (Noticeboard) làm điểm neo trực quan (`scroll-mt-16`) giúp không gian hiển thị thoáng đãng và tập trung trọn vẹn vào trải nghiệm nội dung. | 2026-09-17 |
| DEC-24 | Kiến trúc bản quyền & Cơ chế tiếp nhận gỡ bỏ tác phẩm (Takedown) | **Two-Tier Legal Credits Architecture & Artist Takedown System**: Áp dụng mô hình phân tầng: Tầng 1 là Minimal Dark Frosted Footer (3 dòng gọn gàng + các link thao tác nhanh); Tầng 2 là Hộp thoại CreditsModal kính mờ phân tách 3 thẻ (IP KADOKAWA, Artist Rights & Takedown 24-48h, Non-profit Pledge); cung cấp kênh liên hệ chính thức `pvietduc204@gmail.com` kèm nút mở trực tiếp Gmail Web Compose (`mail.google.com/mail/?view=cm&...`), nút 1-click Copy Email vào clipboard có phản hồi thị giác tức thì và nút fallback mail client. | 2026-09-17 |
| DEC-25 | Nâng cấp Bông tuyết Tinh thể 6 cánh, Lược bỏ Tour Guide & Ưu tiên Spirit Form | **Crystalline Snowflake Canvas, Tour Guide Retirement & Spirit Form First**: Nâng cấp hiệu ứng tuyết rơi từ đốm tròn thành hoa văn bông tuyết đối xứng 6 trục chân thực (Dendrite, Stellar Star, Soft Bokeh) với phân tầng 3D, physics xoay chao lượn và tăng tốc phần cứng GPU qua Offscreen Canvas Sprites 60 FPS; lược bỏ hoàn toàn máy trạng thái FSM Tour Guide 6 bước và auto-popup sau 2s để tối ưu luồng duyệt web trực quan; tái sắp xếp trang phục ưu tiên `Spirit Form` (Zadkiel Coat) xuất hiện mặc định ngay khi tải trang. | 2026-09-23 |
| DEC-26 | Tinh giản Thẻ Nhận diện trên Hồ sơ Hero | **Hero Profile Badge Tags Removal**: Lược bỏ cụm 3 badge tag (`SPIRIT NO. 02`, `IV • CHESED`, `Absolute Zero`) trên đỉnh thẻ Vital Profile Card, tạo khoảng đệm thoáng đãng cho khối typography tên Romaji (Outfit) và Kanji (Klee One). | 2026-09-23 |

---

## 9. Implementation Roadmap

> **Cập nhật 2026-09-17** — Sprint 6 hoàn thành xuất sắc toàn bộ các hạng mục tinh chỉnh mỹ thuật nhân vật, tinh gọn luồng nội dung và thiết lập kiến trúc bản quyền phân tầng chuyên nghiệp. Sẵn sàng cho giai đoạn kiểm thử tổng thể và triển khai lên môi trường Production (Sprint 7).

### Trạng thái hiện tại

| Sprint | Nhiệm vụ cốt lõi | Output | Status |
|---|---|---|---|
| **Sprint 1** — Design Tokens & Setup | Vite + React + TypeScript; Tailwind v4 `@theme` Design Tokens; Snow Canvas 60 FPS; TypeScript contracts; Mock data | Dev env chuẩn, Canvas chạy, mock artworks sẵn | ✅ **DONE** `6c1334e` |
| **Sprint 2** — Hero & Dossier | Hero 100vh; Standee breathing float; Glassmorphism Dossier Card + `keyQuote` (DEC-05); Snow toggle Navbar; Footer legal | Hero hoàn chỉnh Desktop | ✅ **DONE** `9d39b30` |
| **Sprint 2b** — Design Revision | DEC-07 English UI; DEC-08 Spacious layout; DEC-09 Light "Warm Winter Daylight" palette; Real Yoshino standee | UI chuyên nghiệp, light theme | ✅ **DONE** `0a790b6` |
| **Sprint 3** — Gallery Wall (Mock Data) | FilterBar 4 states + spring animation; ArtworkCard hover overlay + lazy load + category badges; GallerySection với client-side filtering | Gallery hoạt động mượt với mock data | ✅ **DONE** `35f4d7e` |
| **Sprint 4** — Yoshinon & CMS | Floating Yoshinon widget; Tour FSM (Idle→Welcome→Touring→Completed→Dismissed); Smooth scroll + glow ring; **Sanity.io setup + Studio workspace + simplified schema + API fetch** | MVP v1.0 hoàn chỉnh, Sanity Studio & dữ liệu thực live | ✅ **DONE** `ed4a4ee`, `b8b7ba9` |
| **Sprint 5** — Creative Exhibition & Lore | **Màn Data (Archive Lore); Hero Costume Switcher (Hololive ref); Masonry Gallery (Pure Vertical Flow - DEC-16 Revision); Winter Hearth Guestbook + Sanity CMS Persistence; Nâng cấp Tour Guide 6 bước; Tuyết toàn trang; Standee WebP & Bundle split** | Khung tính năng cốt lõi hoàn chỉnh | ✅ **DONE** |
| **Sprint 5b** — Design Refinements & Screen Unification | **Hợp nhất màn "Top" (DEC-20): Bộ chọn trang phục phong cách Hololive Talent (avatar tròn, viền cyan, kính lúp, indicator arrow); Thẻ Vital Specs tinh gọn; Đoạn văn tự sự "About Yoshino & Yoshinon" toàn chiều ngang trong ngoặc kép nghệ thuật; Đồng bộ 100% màu nền xanh tuyết; Tour Guide cập nhật thuần tiếng Anh (DEC-07)** | Giao diện liền mạch, hài hòa, trải nghiệm thị giác cao cấp | ✅ **DONE** |
| **Sprint 6** — 3 Forms, UI Streamlining & Legal Architecture | **3 Form chính thức (Normal, School, Spirit Form); Bệ đứng acrylic mờ dual-ring; Typography Outfit + Klee One; Huy hiệu & Iconic Quote; Tinh gọn tiêu đề Gallery/Guestbook; Kiến trúc bản quyền phân tầng (Minimal Footer + CreditsModal 3 thẻ, Gmail Compose & 1-click Copy `pvietduc204@gmail.com`)** | UI tinh tế, không thừa thãi, pháp lý & bản quyền hoàn chỉnh | ✅ **DONE** |
| **Sprint 7** — Production Deployment & SEO | Tối ưu Core Web Vitals (LCP < 2.0s, CLS < 0.05); OpenGraph metadata / Favicon; Triển khai Vercel / GitHub Pages + Custom Domain | Live Production URL | 🚀 **NEXT** |

### Ghi chú điều chỉnh kế hoạch

- **Sanity CMS** được dời từ Sprint 3 → Sprint 4. Lý do: Sprint 3 hoàn toàn có thể build Gallery UI với `mockArtworks.ts` trước — Sanity cần user tạo account + project + cấp `projectId`/`dataset`. Quy trình tốt hơn: UI hoàn thiện trước, CMS wire-in sau.
- **Sprint 2b** (Design Revision) phát sinh do yêu cầu thay đổi ngôn ngữ, spacing, và color palette sau khi Sprint 2 hoàn thành. Đây là bài học về tầm quan trọng của design sign-off trước khi code.
- **Sprint 5 & 5b**: Sprint 5 hoàn tất nền tảng tính năng cốt lõi và Sprint 5b hợp nhất màn Profile & Archive thành màn Top duy nhất với đoạn tự sự toàn chiều ngang bọc trong ngoặc kép lớn.
- **Sprint 6 (Chuẩn bị tiền triển khai)**: Thực hiện chuẩn hóa 3 form nhân vật thực tế (Normal, Raizen Uniform, Spirit Form) với bệ đứng acrylic, nâng cấp font chữ đôi hiện đại (Outfit & Klee One), tinh gọn các khối văn bản tiêu đề thừa ở Gallery và Guestbook, và kiến trúc lại hệ thống pháp lý thành mô hình 2 tầng (Minimal Footer + Hộp thoại CreditsModal kính mờ kèm kênh liên hệ gỡ bỏ tranh `pvietduc204@gmail.com` qua Gmail Web Compose và 1-click Copy Email). Hệ thống hiện đã sẵn sàng 100% cho bước triển khai Cloud Production.
