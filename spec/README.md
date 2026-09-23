# ❄️ Yoshino's Home — Project Spec Hub

> **Bộ nhớ dài hạn của dự án.** Folder `spec/` là nguồn sự thật duy nhất (Single Source of Truth) cho mọi quyết định đã được thống nhất. Đọc các file này trước khi bắt đầu bất kỳ phiên làm việc nào.

---

## 🗂️ Cấu trúc folder `spec/`

| File | Mục đích |
|---|---|
| `README.md` | File này — tổng quan và hướng dẫn đọc nhanh |
| `REQUIREMENTS.md` | PRD + DRD đầy đủ đã được chuẩn hóa, bao gồm tất cả quyết định kỹ thuật đã thống nhất |
| `CHANGELOG.md` | Nhật ký thay đổi yêu cầu và quyết định thiết kế theo thời gian |

---

## 🎯 Dự án là gì?

**Yoshino's Home** là website tôn vinh nhân vật (Fan-made Tribute Showcase) dành cho **Yoshino Himekawa (Spirit No. 02 — The Hermit)** trong tác phẩm *Date A Live* của tác giả Kōshi Tachibana.

Đây đồng thời là dự án cá nhân để chuyển đổi phương pháp luận: từ *AI vibe coding* sang quy trình phát triển sản phẩm chuẩn công nghiệp (Product Discovery → Requirements → Wireframe → Design Tokens → Component-Driven Development → Performance Audit → Cloud Production Deployment).

---

## 🛠️ Tech Stack đã xác nhận

| Layer | Công nghệ |
|---|---|
| Framework | React 19 + Vite |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS v4 (`@theme`) |
| Animation | Framer Motion |
| CMS Backend | Sanity.io (Headless CMS) |
| Studio Quản trị | Sanity Studio Cloud (`https://yoshino-home.sanity.studio`) |
| Serverless API | Vercel Serverless Function (`/api/guestbook`) |
| Frontend Hosting | Vercel Global Edge Network (`https://yoshino-home.vercel.app`) |

---

## 📍 Trạng thái hiện tại

- **Phiên bản:** 1.0 Production Release (✅ **LIVE & COMPLETED**)
- **Sprint hoàn thành:** Sprint 1, 2, 2b, 3, 4, 5, 5b, 6, 7 (✅ **TẤT CẢ ĐÃ HOÀN TẤT & DEPLOY THÀNH CÔNG**)
- **Live URLs:**
  - 🌐 **Website:** [https://yoshino-home.vercel.app](https://yoshino-home.vercel.app)
  - 🎨 **CMS Studio:** [https://yoshino-home.sanity.studio](https://yoshino-home.sanity.studio)
  - 💻 **GitHub Repo:** [https://github.com/MonoDuckY/Yoshino-home](https://github.com/MonoDuckY/Yoshino-home)
- **Cập nhật lần cuối:** 2026-09-23 (Hoàn thành triển khai Cloud Vercel & Sanity Studio, Bảo mật Serverless Guestbook, Cải tiến Gallery ngẫu nhiên hóa 30+20, Schema Studio linh hoạt allow-null)

---

## ⚡ Đọc nhanh trước khi code

1. Kiểm tra `REQUIREMENTS.md` → Section **Decisions Log** để biết các quyết định kỹ thuật đã được thống nhất
2. Kiểm tra `CHANGELOG.md` để nắm bắt lịch sử phát triển và thay đổi yêu cầu qua các Sprint
3. Tech Stack và TypeScript Interfaces đã được chuẩn hóa hoàn toàn trong `REQUIREMENTS.md`
