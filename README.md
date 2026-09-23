# ❄️ Yoshino's Home (四糸乃の家) — Tribute Showcase

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-yoshino--home.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://yoshino-home.vercel.app)
[![Sanity Studio](https://img.shields.io/badge/Sanity%20Studio-yoshino--home.sanity.studio-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://yoshino-home.sanity.studio)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Yoshino--home-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MonoDuckY/Yoshino-home)

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

**Một không gian tôn vinh nhân vật Yoshino Himekawa (Spirit No. 02 — The Hermit) từ tác phẩm kinh điển *Date A Live*.**  
*Được thiết kế tinh tế với bầu không khí mùa đông ấm áp, visual art đỉnh cao, hiệu ứng tương tác mượt mà và hệ thống quản lý nội dung Headless CMS chuẩn công nghiệp.*

</div>

---

## 📑 Mục lục
1. [Giới thiệu dự án](#-giới-thiệu-dự-án)
2. [Live Links & Triển khai](#-live-links--triển-khai)
3. [Tính năng nổi bật](#-tính-năng-nổi-bật)
4. [Kiến trúc Kỹ thuật & Tech Stack](#-kiến-trúc-kỹ-thuật--tech-stack)
5. [Cấu trúc Thư mục](#-cấu-trúc-thư-mục)
6. [Hướng dẫn Cài đặt & Chạy Local](#-hướng-dẫn-cài-đặt--chạy-local)
7. [Quy chuẩn Kỹ thuật (Spec Hub)](#-quy-chuẩn-kỹ-thuật-spec-hub)
8. [Bản quyền & Tuyên bố Miễn trừ Trách nhiệm](#-bản-quyền--tuyên-bố-miễn-trừ-trách-nhiệm)

---

## 🎯 Giới thiệu dự án

**Yoshino's Home** là dự án Fan-made Tribute Web Showcase cao cấp dành cho nhân vật **Yoshino (四糸乃)** và bạn rối thỏ **Yoshinon (よしのん) / Zadkiel** trong series *Date A Live* (tác giả Kōshi Tachibana, minh họa Tsunako).

### Sứ mệnh & Phương pháp luận
Dự án được xây dựng với mục tiêu chuyển hóa triệt để từ phong cách làm web chắp vá (*AI vibe coding*) sang **quy trình phát triển sản phẩm chuẩn công nghiệp**:
- **Product Discovery & Spec-Driven Development**: Xác lập PRD (Product Requirements Document), DRD (Design Requirements Document) và Decision Logs rõ ràng tại [`spec/`](./spec).
- **Component-Driven Architecture**: Chia nhỏ hệ thống thành UI primitives, sections độc lập, typed props chặt chẽ với TypeScript.
- **Production-grade Cloud Stack**: Tách biệt Frontend (Vercel Edge), Serverless Backend API (`/api/guestbook`), và Headless CMS (Sanity Studio Cloud).

---

## 🌐 Live Links & Triển khai

| Dịch vụ | Địa chỉ truy cập | Mô tả |
|---|---|---|
| 🌐 **Production Website** | [https://yoshino-home.vercel.app](https://yoshino-home.vercel.app) | Trang showcase công khai được tối ưu hóa toàn cầu qua Vercel Global Edge Network |
| 🎨 **Sanity Studio Cloud** | [https://yoshino-home.sanity.studio](https://yoshino-home.sanity.studio) | Dashboard CMS quản trị Gallery và kiểm duyệt Guestbook trên đám mây |
| 📁 **GitHub Repository** | [MonoDuckY/Yoshino-home](https://github.com/MonoDuckY/Yoshino-home) | Toàn bộ mã nguồn, cấu hình CI/CD và tài liệu kỹ thuật |

---

## ✨ Tính năng nổi bật

### 1. ❄️ Màn "Top" Tinh Hoa (Interactive Character Showcase)
- **Form Costume Switcher**: Chuyển đổi linh hoạt giữa 3 trang phục kinh điển:
  - 👘 *Astral Dress (Linh phục thần uy linh trang số 2)*
  - 🧥 *Casual Winter (Áo khoác xanh tai thỏ mùa đông)*
  - 🏫 *Raizen High School Uniform (Đồng phục học sinh trung học Raizen)*
  - 🎭 *Easter Egg*: Chế độ trang phục bí mật phong cách VTuber độc đáo.
- **Acrylic Stand Visualizer**: Bệ mica trong suốt (`acrylic base`) xoay chuyển 3D tinh tế theo con trỏ chuột, hiệu ứng hào quang linh lực tuyết lấp lánh và âm thanh tương tác sống động.
- **Canvas Snow Particle Engine**: Hiệu ứng bông tuyết 3D tự nhiên rơi trong không gian, tối ưu hóa 60 FPS và **tự động tạm dừng requestAnimationFrame khi chuyển tab** để tiết kiệm điện năng cho thiết bị.
- **Typography Song ngữ Nghệ thuật**: Kết hợp font `Outfit` (hiện đại, sang trọng cho chữ số & heading) và font bút lông Nhật Bản `Klee One` (cho trích dẫn thơ mộng của Yoshino).

### 2. 🖼️ Curated Masonry Gallery
- **Phân loại 3 danh mục rõ ràng**:
  - `Official Art`: Tranh minh họa chính thức của Tsunako, Kadokawa, game Date A Live.
  - `Community Art`: Tác phẩm từ các họa sĩ cộng đồng (bắt buộc credit tên artist và link nguồn gốc).
  - `Collaboration & Events`: Tranh sự kiện collab đặc biệt, anime movie, triển lãm.
- **Thuật toán Fisher-Yates Random Shuffle**: Riêng tab *"Tất cả tác phẩm (All works)"* được tự động xáo trộn ngẫu nhiên mỗi phiên truy cập, mang lại trải nghiệm khám phá mới mẻ cho người xem.
- **Tải lười thông minh (Pagination)**: Ban đầu hiển thị sẵn 30 artwork mượt mà, hỗ trợ nút bấm *"Xem thêm tác phẩm"* nạp tiếp 20 artwork/lần.
- **Lightbox Trải nghiệm Cao cấp**: Xem ảnh độ phân giải cao kèm bảng thông tin bản quyền chi tiết, huy hiệu thể loại và link chuyển hướng tới bài đăng gốc của tác giả.

### 3. 💌 Winter Hearth Guestbook (Sổ lưu bút mùa đông)
- **Gửi lời nhắn yêu thương**: Khách ghé thăm có thể để lại lời chúc cùng các huy hiệu icon đặc trưng (❄️ Bông tuyết, 🐰 Yoshinon, 🍵 Trà ấm, 💖 Trái tim tuyết,...).
- **Serverless API Bảo mật Tuyệt đối**: Gửi tin nhắn qua Vercel Serverless Function (`/api/guestbook`), đảm bảo **Write Token bí mật (`SANITY_WRITE_TOKEN`) không bao giờ bị lộ ra client bundle**.
- **Real-time & Optimistic Update**: Lời chúc hiển thị tức thì trên giao diện và được đồng bộ lưu trữ vĩnh viễn vào Sanity.io Cloud CMS.

### 4. ⚖️ Two-tier Legal Attribution & Takedown Policy
- Modal pháp lý tôn trọng bản quyền 2 tầng minh bạch:
  - **Tầng 1 (IP Date A Live)**: Thuộc quyền sở hữu của tác giả Kōshi Tachibana, họa sĩ Tsunako, KADOKAWA và Fantasia Bunko.
  - **Tầng 2 (Quyền tác giả tranh cộng đồng)**: Tôn vinh và bảo hộ công sức của các họa sĩ tự do.
  - **Cam kết Takedown SLA 24-48 giờ**: Cung cấp form liên hệ nhanh để gỡ bỏ tác phẩm nếu nghệ sĩ gốc không muốn tiếp tục trưng bày.

---

## 🛠️ Kiến trúc Kỹ thuật & Tech Stack

```
+---------------------------------------------------------------------------------+
|                                 VISITOR CLIENT                                  |
|         (React 19 + TypeScript + Vite + Tailwind v4 + Framer Motion)            |
+----------------------------------------+----------------------------------------+
                                         |
                       +-----------------+-----------------+
                       |                                   |
                (Read Artworks &                     (POST Guestbook
                  Guestbook Data)                       Message)
                       |                                   |
                       v                                   v
+-------------------------------+         +-------------------------------------+
|        SANITY.IO CLOUD        |         |      VERCEL SERVERLESS FUNCTION     |
|   Headless Content Lake API   | <====== |         (/api/guestbook.js)         |
|  - Artworks Dataset           | (Write) |  - Request validation               |
|  - Guestbook Dataset          |         |  - Server-side SANITY_WRITE_TOKEN   |
+---------------+---------------+         +-------------------------------------+
                ^
                | (Manage / Edit / Moderate)
+---------------+---------------+
|      SANITY STUDIO CLOUD      |
| (yoshino-home.sanity.studio)  |
+-------------------------------+
```

### Công nghệ sử dụng:
| Lớp (Layer) | Công nghệ | Mục đích |
|---|---|---|
| **Core Framework** | React 19 + TypeScript 5.8 | Hiệu năng render tối tân, quản lý component và type-safety chặt chẽ |
| **Build Tool** | Vite 6 | Tốc độ khởi động máy chủ tức thì và build tối ưu hóa cây phụ thuộc |
| **Styling** | Tailwind CSS v4 | Khai báo design tokens hiện đại qua `@theme`, tối giản CSS bundle |
| **Motion** | Framer Motion 13 | Animation chuyển động trang phục, modal, card và micro-interactions |
| **Data Fetching** | `@sanity/client` + GROQ | Truy vấn dữ liệu có cấu trúc từ Headless Content Lake |
| **Serverless API** | Vercel Edge Serverless | Xử lý mutation ghi dữ liệu an toàn từ server-side |
| **CMS Platform** | Sanity.io Studio v3 | Giao diện quản trị viên độc lập cho người biên tập nội dung |

---

## 📁 Cấu trúc Thư mục

```text
yoshinos-home/
├── api/                       # Vercel Serverless Functions
│   └── guestbook.js           # API ghi nhận lời nhắn bảo mật (sử dụng SANITY_WRITE_TOKEN)
├── public/                    # Tài nguyên tĩnh công khai (favicons, og-image, svg icons)
├── sanity/                    # Cấu hình client Sanity phía Frontend
│   └── client.ts              # Khởi tạo @sanity/client kết nối Content Lake
├── spec/                      # Sổ tay kỹ thuật (Single Source of Truth)
│   ├── README.md              # Giới thiệu bộ nhớ dài hạn dự án
│   ├── REQUIREMENTS.md        # PRD, DRD, Decision Logs và Interface chuẩn hóa
│   └── CHANGELOG.md           # Lịch sử hoàn thành các Sprint từ v0.1 đến v1.0
├── src/                       # Mã nguồn ứng dụng Frontend
│   ├── assets/                # Hình ảnh nhân vật các dạng trang phục (PNG trong suốt)
│   ├── components/
│   │   ├── layout/            # Navbar, Navigation controls
│   │   ├── sections/          # TopSection, GallerySection, GuestbookSection, Footer
│   │   └── ui/                # ArtworkCard, FilterBar, SnowCanvas, CreditsModal
│   ├── data/                  # Dữ liệu tĩnh fallback khi không có kết nối CMS
│   ├── hooks/                 # Custom React hooks (audio, animations, viewport)
│   ├── lib/                   # Utility functions & helpers
│   ├── types/                 # Định nghĩa kiểu dữ liệu TypeScript (Artwork, Guestbook, ...)
│   ├── App.tsx                # Ứng dụng chính gom các section
│   ├── index.css              # Custom Tailwind CSS v4 tokens và font imports
│   └── main.tsx               # Điểm nhập React DOM root
├── studio/                    # Dự án Sanity Studio độc lập
│   ├── schemaTypes/           # Cấu trúc schema dữ liệu (artwork.ts, guestbook.ts)
│   ├── sanity.config.ts       # Cấu hình Sanity Studio
│   └── package.json           # Quản lý dependencies riêng của Studio
├── vercel.json                # Cấu hình rewrite routes và cache headers cho Vercel
├── vite.config.ts             # Cấu hình Vite bundler & Tailwind v4 plugin
└── package.json               # Quản lý script và gói dependencies của toàn bộ dự án
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy Local

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản `>= 18.0.0` (Khuyên dùng Node 20 LTS hoặc mới hơn).
- **npm** hoặc **pnpm / yarn**.
- Một tài khoản [Sanity.io](https://www.sanity.io/) (nếu muốn tự host Studio riêng).

### 2. Cài đặt các gói phụ thuộc
```bash
# Clone repository
git clone https://github.com/MonoDuckY/Yoshino-home.git
cd yoshinos-home

# Cài đặt dependencies cho Frontend
npm install

# Cài đặt dependencies cho Sanity Studio
npm --prefix studio install
```

### 3. Cấu hình Biến môi trường
Tạo file `.env` tại thư mục gốc dự án dựa trên mẫu [`.env.example`](.env.example):
```env
# Sanity Project Configuration
VITE_SANITY_PROJECT_ID=c45te99f
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01

# Sanity API Write Token (Dành cho việc gửi lời chúc lên Sanity)
SANITY_WRITE_TOKEN=your_sanity_write_token_here
```

### 4. Khởi chạy môi trường phát triển
```bash
# 🌐 Khởi chạy Frontend React (Mặc định: http://localhost:5173)
npm run dev

# 🎨 Khởi chạy Sanity Studio cục bộ (Mặc định: http://localhost:3333)
npm run studio
```

### 5. Lệnh Build & Deploy
```bash
# Kiểm tra TypeScript và Build Frontend
npm run build

# Xem thử bản build production cục bộ
npm run preview

# Đăng nhập vào tài khoản Sanity CLI
npm run studio:login

# Deploy Sanity Studio lên domain đám mây *.sanity.studio
npm run studio:deploy
```

---

## 📋 Quy chuẩn Kỹ thuật (Spec Hub)

Dự án tuân thủ nghiêm ngặt nguyên tắc **Spec-First Engineering**. Folder [`spec/`](./spec) lưu giữ toàn bộ quyết định kiến trúc:

- 📖 [`spec/REQUIREMENTS.md`](./spec/REQUIREMENTS.md):
  - Phân tích người dùng mục tiêu (Persona) và hành trình trải nghiệm.
  - Bảng Design Tokens chuẩn (Color palette, Spacing scale, Typography pairing).
  - Định nghĩa chi tiết Decision Logs (DEC-01 đến DEC-34).
- 📜 [`spec/CHANGELOG.md`](./spec/CHANGELOG.md):
  - Nhật ký ghi lại quá trình hoàn thành Sprint 1 đến Sprint 7.
  - Lịch sử refactor từ local fallback lên Serverless và Cloud deployment.

---

## 🛡️ Bản quyền & Tuyên bố Miễn trừ Trách nhiệm

- **Date A Live IP**: Mọi quyền đối với thương hiệu *Date A Live*, nhân vật Yoshino (四糸乃), thiết kế trang phục và linh thú Zadkiel thuộc quyền sở hữu của tác giả **Kōshi Tachibana**, họa sĩ minh họa **Tsunako**, nhà xuất bản **KADOKAWA / Fujimi Shobo**, và Ủy ban sản xuất Anime liên quan.
- **Fan-made Non-profit Tribute**: Trang web này là một dự án phi thương mại được lập bởi cộng đồng người hâm mộ nhằm mục đích học tập kỹ thuật, tôn vinh và chia sẻ tình yêu với nhân vật. Website không chứa quảng cáo, không bán vật phẩm và không thu bất kỳ nguồn lợi tài chính nào.
- **Quyền tác giả Nghệ thuật**: Bản quyền của các tác phẩm minh họa trong Gallery thuộc về từng họa sĩ được ghi nhận trong thông tin chi tiết của mỗi bức tranh. Nếu bạn là tác giả và mong muốn chỉnh sửa thông tin hoặc gỡ bỏ tác phẩm, vui lòng mở mục **"Bản quyền & Tín dụng"** ở chân trang hoặc liên hệ trực tiếp để được hỗ trợ trong vòng 24–48 giờ.

---

<div align="center">

Made with ❄️ and 💚 for **Yoshino Himekawa**  
*“Together with Yoshinon, through the falling winter snow.”*

</div>
