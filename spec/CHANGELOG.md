# CHANGELOG.md — Yoshino's Home

> Nhật ký ghi lại tất cả thay đổi yêu cầu, quyết định thiết kế và cập nhật spec theo thời gian.
> Format: `[YYYY-MM-DD] — Loại thay đổi: Mô tả`

## [2026-09-23] — Sprint 6 Polish: Crystalline Snowflake Canvas, Tour Guide Retirement & Spirit Form Priority (DEC-25)

### 🎨 Quyết định & Thay đổi thiết kế (Delivered & Verified)
- **Nâng cấp Hiệu ứng Bông tuyết Tinh thể 6 cánh (Crystalline Hexagonal Snowflakes - DEC-25)**:
  - Thay thế hoàn toàn các đốm tròn mờ (dots) đơn điệu bằng hoa văn băng tuyết đối xứng 6 trục chân thực (Hexagonal Crystalline Geometry).
  - Phân tầng không gian 3 lớp chiều sâu (3D Depth of Field):
    - *Tiền cảnh (~25%)*: Bông tuyết hoa băng phân nhánh lớn (`Dendrite Sprite`, 18px–26px) có nhánh con xương cá (chevrons) và tâm lục giác, xoay từ từ khi rơi.
    - *Trung cảnh (~40%)*: Bông tuyết cánh sao băng vừa (`Stellar Star Sprite`, 11px–18px) với đầu búp thoi và vòng tâm tinh xảo.
    - *Hậu cảnh (~35%)*: Bụi băng phát quang mờ (`Bokeh Sprite`, 4px–9px) tạo chiều sâu điện ảnh.
  - Phối màu tương phản cao trên nền sáng ban ngày (`#ECF1FB`): Viền xanh ngọc băng tuyết (`rgba(50, 135, 210, 0.88)` / `rgba(56, 140, 215, 0.85)`) và lõi trắng tinh khiết (`rgba(255, 255, 255, 0.95)`) kèm vầng hào quang băng mờ (`shadowColor: rgba(56, 189, 248, 0.7)`).
  - Chuyển động vật lý rơi mượt mà: Góc xoay `rotation`, tốc độ xoay `rotationSpeed` tự nhiên và dao động đung đưa hình sin theo gió.
  - Tối ưu hiệu năng 60 FPS tuyệt đối: Sử dụng kỹ thuật **Offscreen Canvas Sprite Caching** (pre-render mẫu 1 lần và dùng GPU `drawImage` tăng tốc phần cứng).
- **Lược bỏ cơ chế Yoshinon Web Tour (Tour Guide Retirement - DEC-25)**:
  - Nhận thấy website có cấu trúc cuộn dọc trực quan, mạch lạc và dễ tiếp cận, lược bỏ hoàn toàn máy trạng thái FSM Tour 6 bước, tính năng tự động bung popup sau 2 giây và viền highlight gây phân tâm.
  - Dọn dẹp keyframes `@keyframes tour-pulse` và class `.tour-highlight-target` trong `index.css`.
  - Tối ưu hóa cụm CTA dưới thẻ thông tin Vital Specs thành 1 nút hành động trung tâm duy nhất: **`Explore Curated Gallery ↓`** sang trọng và nổi bật, giúp giảm kích thước bundle JS ~10 kB.
- **Tái sắp xếp Character Appearance — Ưu tiên Spirit Form (DEC-25)**:
  - Cập nhật thứ tự hiển thị: `Spirit Form` (Astral Dress: Zadkiel Coat) đứng đầu tiên, tiếp theo là `Normal Form` và `School Uniform`.
  - Đảm bảo khi người dùng truy cập trang lần đầu, Yoshino xuất hiện ngay lập tức trong tạo hình Linh phục Zadkiel kinh điển nhất cùng avatar đầu danh sách với viền cyan active.
- **Tinh giản Thẻ Nhận diện trên Hồ sơ (Badge Tags Removal - DEC-26)**:
  - Lược bỏ cụm 3 badge tag (`SPIRIT NO. 02`, `IV • CHESED`, `Absolute Zero`) trên đỉnh thẻ Vital Profile Card.
  - Mang lại khoảng đệm thị giác thoáng đãng, giúp người dùng tập trung trọn vẹn vào khối typography tên nhân vật HIMEKAWA YOSHINO (Outfit) và 氷芽川 四糸乃 (Klee One).

---

## [2026-09-17] — Sprint 6: Character Forms Modernization, UI Streamlining & Layered Legal Credits Architecture

### 🎨 Quyết định & Thay đổi thiết kế (Delivered & Verified)
- **Hiện diện nhân vật & 3 Form tinh gọn (DEC-21)**:
  - Thay thế toàn bộ mock cũ bằng 3 form trang phục chính thức từ tài nguyên ảnh chất lượng cao:
    - **Normal Form** (`Yoshino_normal.webp`): Trang phục thường ngày ấm áp mùa đông.
    - **School Uniform** (`Yoshino_raizen.webp`): Đồng phục nữ sinh trường Cao trung Raizen.
    - **Spirit Form** (`Yoshino_Spirit_Form.webp`): Linh phục Astral Dress (Zadkiel Coat).
  - Tối ưu hóa hiển thị Standee: Khung chiều cao `clamp(420px, 60vh, 640px)` với `objectFit: contain` và `objectPosition: bottom center`, hiển thị trọn vẹn toàn thân không bị cắt xén chân.
  - Thêm bệ đứng acrylic mờ nhân vật (Frosted Dual-ring Acrylic Pedestal) với bóng đổ sàn đa lớp (`shadow-[0_12px_28px_rgba(30,58,138,0.22)]`), tạo chiều sâu như mô hình acrylic figure thực thụ.
  - Đồng bộ hóa tiêu cự Avatar Switcher tròn (`avatarPosition` + `transformOrigin`) giúp phóng to chính xác gương mặt Yoshino mà không bị lệch xuống eo hay thân.
- **Typography & Nâng cấp Thẩm mỹ Tên Nhân vật (DEC-22)**:
  - Tích hợp 2 web fonts Google cao cấp: `Outfit` (sans-serif geometric hiện đại cho Romaji) và `Klee One` (font bút lông thanh thoát bán thủ công cho Kanji).
  - Bổ sung huy hiệu phân loại nhân vật: `SPIRIT NO. 02`, `IV • CHESED`, `Absolute Zero`.
  - Bổ sung khối trích dẫn câu thoại iconic phủ sương mờ (`❄️「私……誰も傷つけたくないんです……」` kèm phụ đề Anh ngữ) ngay trên thẻ thông tin.
  - Thử nghiệm và loại bỏ watermark "02" to ở nền nhằm tránh cảm giác nhầm lẫn thị giác như vệt ố tròn / ký tự "O" lơ lửng.
- **Tinh gọn tiêu đề các phân đoạn nội dung (Section Header Streamlining - DEC-23)**:
  - Dựa trên hệ thống Navbar cố định đã định hướng rõ các phân đoạn (Top, Gallery, Noticeboard, Credits), loại bỏ các đoạn tiêu đề và mô tả trùng lặp gây thừa thãi:
    - **Gallery**: Lược bỏ badge `氷結の回廊`, tiêu đề `ART GALLERY` và mô tả dài; đưa `FilterBar` lên làm điểm nhấn trung tâm với `scroll-mt-16`.
    - **Noticeboard / Guestbook**: Lược bỏ badge `冬の暖炉`, tiêu đề `HEARTH NOTICEBOARD` và đoạn mô tả; khung bảng trắng `whiteboard frame` bắt đầu ngay từ đỉnh section với `scroll-mt-16`.
- **Kiến trúc bản quyền phân tầng & Hộp thoại Credits / Gỡ bỏ tác phẩm (Layered Legal & Takedown Architecture - DEC-24)**:
  - Thay vì nhồi nhét văn bản pháp lý dài vào chân trang gây nặng nề, áp dụng mô hình phân tầng 2 cấp cho website fan-made phi thương mại:
    - **Tầng 1 - Minimal Dark Frosted Footer**: Đặt ở chân trang với nền tối trong suốt mờ (`bg-slate-950/70 backdrop-blur-md border-t border-white/10 py-6`), gồm 3 dòng ngắn gọn ghi nhận bản quyền Date A Live thuộc Koushi Tachibana / Tsunako / KADOKAWA cùng các nút mở modal Credits, kho mã nguồn GitHub và nút liên hệ.
    - **Tầng 2 - Credits & Disclaimer Modal (`CreditsModal.tsx`)**: Hộp thoại kính mờ 3 card chuyên sâu:
      1. *Copyright & Intellectual Property*: Tuyên bố dự án phi thương mại (Non-commercial Tribute), quyền sở hữu IP thuộc KADOKAWA.
      2. *Artist Rights & Takedown Request*: Tôn trọng tác quyền của từng artist với chính sách gỡ bỏ tác phẩm trong vòng 24–48 giờ.
      3. *Sanctuary & Community Pledge*: Cam kết phi lợi nhuận vĩnh viễn, không quảng cáo, không nhận đóng góp tài chính.
    - Cơ chế liên hệ gỡ bỏ qua email chính thức `pvietduc204@gmail.com`:
      - Tích hợp nút mở trực tiếp Gmail Web Compose (`https://mail.google.com/mail/?view=cm&...`) trong tab mới, giải quyết triệt để lỗi người dùng Windows/Chrome không cấu hình ứng dụng mail mặc định khiến lệnh `mailto:` bị bỏ qua silently.
      - Nút tiện ích 1-click "Copy Email Address" kèm phản hồi trực quan ("Copied to clipboard!").
      - Nút fallback ứng dụng Email mặc định.
    - Liên kết "Credits" trên thanh điều hướng `Navbar` mở trực tiếp `CreditsModal`.
- **Cập nhật Tour Guide FSM**:
  - Bước 1 của Tour Guide cập nhật giới thiệu chuẩn xác 3 form ngoại hình mới (Normal, Raizen Uniform, Spirit Form).

---

## [2026-09-15] — Sprint 5b: Top Screen Unification, Hololive Appearance Selector & Editorial Monologue

### 🎨 Quyết định & Thay đổi thiết kế (Delivered & Verified)
- **Hợp nhất màn Profile & Archive thành màn "Top" duy nhất (DEC-20)**:
  - Thay vì tách rời thành 2 màn Profile và Archive với các thẻ bento phức tạp, toàn bộ nội dung mở đầu được cấu trúc lại thành một màn "Top" (`#top`) hài hòa, thông suốt.
  - Tinh giản cây component: Xóa bỏ `DataSection.tsx`, `HeroSection.tsx`, và `DossierCard.tsx`; thay thế bằng `TopSection.tsx`.
- **Bộ chọn trang phục phong cách Hololive Talent (DEC-18, DEC-20)**:
  - Bố trí thanh chọn trang phục theo hàng dọc bên trái Standee.
  - Sử dụng avatar tròn (`rounded-full`) viền sáng cyan (`ring-3 ring-[var(--color-ice-blue)]`) khi active.
  - Tích hợp huy hiệu kính lúp thu nhỏ (`Search` icon) ở góc dưới bên phải mỗi avatar và mũi tên chỉ báo `▼` chỉ vào trang phục đang hiển thị.
- **Tinh gọn thẻ thông tin cá nhân (Profile Vital Specs)**:
  - Lược bỏ hoàn toàn các chuỗi giải thích phụ gây rối mắt (`"Petite Spirit frame"`, `"The Hermit (隠居者)"`, `"Bust / Waist / Hip"`).
  - Trình bày thông số rõ nét, thanh thoát: Age (13 Appearance / 39–40 Actual), Height (144 cm), Codename (Hermit), Voice Actress / CV (Iori Nomizu / 野水 伊織), Measurements (73/55/78).
- **Đoạn văn tự sự toàn chiều ngang "About Yoshino & Yoshinon" (DEC-20)**:
  - Đặt ở hàng dưới cùng của màn Top, trải rộng tự nhiên (`max-w-4xl lg:max-w-5xl mx-auto`).
  - Gỡ bỏ hoàn toàn hộp card/container kính mờ; bao bọc 3 đoạn văn bằng cặp dấu ngoặc kép lớn nghệ thuật (`“` và `”`) màu xanh băng tuyết, mang lại trải nghiệm như một bức tâm thư / lời đề tặng chân thành của curator.
- **Đồng bộ hóa 100% màu nền & ánh sáng chuyển tiếp**:
  - Loại bỏ lớp gradient vàng ngà (`warm ivory`) ở chân màn Top; đồng bộ nền xanh trời tuyết `--color-winter-sky: #ECF1FB` liền mạch hoàn toàn với Gallery mà không còn bất kỳ vệt lệch màu nào.
- **Chuẩn hóa thuần tiếng Anh (English UI — DEC-07)**:
  - Loại bỏ các ghi chú/chuyển đổi tiếng Việt trên UI, đồng bộ toàn bộ văn bản và Tour Guide FSM sang tiếng Anh chuẩn quốc tế.

---

## [2026-09-12] — Sprint 5 Complete: Creative Frontend Exhibition & Lore Evolution

### 🚀 Tính năng & Nâng cấp đã hoàn thiện (Delivered & Verified)
- **Character Archive Chronicles — Data Section (FR-05, DEC-17)**:
  - Màn thông tin hồ sơ chuyên sâu đặt giữa Profile và Gallery với 4 khối Bento Glassmorphism: Origins & Encounter (LN Vol. 2 / Anime S1 Ep. 4, Sephira Chesed), Appearance & Demeanor (144 cm, sky-blue hair, emerald rabbit coat), Angel Zadkiel (Absolute Zero -273.15°C, Siryon mode), and Yoshinon the Familiar (psychological alter-ego, pirate eyepatch).
- **Hero Costume Switcher (DEC-18)**:
  - Thanh chọn trang phục phong cách Hololive đặt ngay dưới Standee: `Astral Dress (Spirit Form)`, `Winter Casual (Everyday Life)`, và `Raizen High (School Days)`.
  - Tích hợp `AnimatePresence mode="wait"` chuyển cảnh mượt mà kèm chú thích chi tiết cho từng bộ trang phục.
- **Bố cục Gallery thuần cuộn dọc & Lưới Masonry thích ứng (DEC-16 Revision - Phương án B)**:
  - Loại bỏ hoàn toàn container cuộn ngang `h-[360vh]` và các hiệu ứng ghim sticky gây mỏi tay / scroll trap khi phòng tranh chứa số lượng lớn tranh ảnh.
  - Toàn bộ website duy trì trục cuộn dọc tự nhiên 100% xuyên suốt 5 màn hình: Profile → Data Archive → Gallery Wall → Guestbook → Footer.
  - Phòng tranh Gallery hiển thị dạng lưới Masonry đa cột thông minh (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5`), tự động co giãn theo tỷ lệ tự nhiên của tranh (DEC-12), cho phép xem nhiều tác phẩm cùng lúc và lướt qua dễ dàng xuống Guestbook.

### 💡 Bài học kinh nghiệm kiến trúc & UX: Thử nghiệm Cuộn Ngang (Horizontal Scroll) và Lý do Chuyển dịch về Cuộn Dọc Thuần (Pure Vertical Flow)

Trong quá trình định hình Sprint 5, một thử nghiệm sáng tạo lớn đã được đề xuất và hiện thực hóa: **Biến đổi khu vực Gallery (hoặc toàn bộ trải nghiệm khám phá) thành trục cuộn ngang (Horizontal Exhibition Walkthrough)** nhằm tạo cảm giác như khách tham quan đang thả bước qua các gian phòng triển lãm nghệ thuật trong bảo tàng. Tuy nhiên, sau khi kiểm thử và đánh giá trải nghiệm người dùng thực tế, quyết định hủy bỏ cuộn ngang và chuyển hẳn về cuộn dọc thuần túy (Phương án B) đã được thống nhất vì các lý do cốt lõi sau:

#### 1. Rào cản kỹ thuật & Vấn đề công thái học (Ergonomics & Scroll Trap)
- **Cái bẫy cuộn chuột (Scroll Trap)**: 
  - Kỹ thuật fake horizontal scroll dựa trên một container cha có chiều cao nhân tạo khổng lồ (ví dụ `height: 360vh` hoặc `400vh`) kết hợp `position: sticky` và `transform: translateX(...)`.
  - Nếu Gallery chỉ có 4–6 bức ảnh tĩnh cố định, chiều cao này có thể kiểm soát được. Nhưng khi kết nối với Sanity CMS — một hệ thống quản trị nội dung sống có thể mở rộng lên hàng chục, hàng trăm bức ảnh trong tương lai — chiều cao container cha sẽ phải kéo dài vô tận (`1500vh` - `3000vh`).
  - Hệ quả: Người dùng bị "mắc kẹt" hoàn toàn trong khu vực Gallery. Khi họ chỉ muốn cuộn xuống các phần nội dung tiếp theo như **Guestbook** hay **Credits/Footer**, họ buộc phải lăn bánh xe chuột liên tục hàng chục vòng trong sự ức chế vì không biết khi nào phòng tranh mới kết thúc.
- **Xung đột nhận thức thao tác (Cognitive Mismatch)**:
  - 95% chuột máy tính trên thị trường chỉ có con lăn dọc (Vertical Scroll Wheel). Việc ngón tay lăn theo trục dọc nhưng mắt lại thấy nội dung trôi theo trục ngang tạo ra sự lệch pha về phản hồi giác quan (vestibular / motor mismatch), dễ gây mỏi tay và mất phương hướng.
- **Phá vỡ thanh cuộn tự nhiên (Native Scrollbar)**:
  - Thanh cuộn dọc của trình duyệt bên phải màn hình tiếp tục trôi xuống trong khi trang web đứng yên và nội dung bên trong trượt ngang, làm mất đi khả năng định vị trực quan ("Tôi đang ở đâu trên trang web?").

#### 2. Khả năng tiếp cận (Accessibility - a11y) & Điều hướng bàn phím
- Việc ghim `position: sticky` và tính toán `scrollProgress` can thiệp tiêu cực vào các phím điều hướng trợ năng tiêu chuẩn: `Spacebar`, `Page Down`, `Page Up`, `Home`, `End`.
- Khi người dùng bấm vào các liên kết trên thanh điều hướng (Navbar Links) như `#guestbook` hay `#footer`, trình duyệt tính toán tọa độ cuộn bị lệch do các section con bị dịch chuyển tọa độ qua `transform: translateX`, gây hiện tượng giật cục hoặc rơi vào khoảng trống.

#### 3. Trải nghiệm không nhất quán trên Mobile & Touch Devices
- Trên màn hình cảm ứng di động, hành vi vuốt dọc là phản xạ tự nhiên ăn sâu vào tiềm thức người dùng. Ép buộc cuộn ngang giả lập bằng sticky trên mobile thường gây giật khung hình (frame drops) và xung đột nghiêm trọng với thanh URL bar tự động ẩn/hiện của Safari iOS / Chrome Android.

#### 4. Bài học rút ra (Key Architectural Takeaways)
1. **"Đừng hy sinh công thái học cơ bản và tính liền mạch của luồng duyệt web để đổi lấy hiệu ứng thị giác tạm thời khi nội dung mang tính chất co giãn động (Dynamic Data)."**
2. **Scroll ngang chỉ phù hợp cho các khối nội dung vi mô (Micro-components)**: Ví dụ như một dải Carousel nhỏ, danh sách Tab ngang, hoặc các landing page showcase cực ngắn (chỉ gồm 3–4 slide độc lập và không có footer dài phía sau). Khi website có cấu trúc nhiều section kế thừa nhau (Hero → Data → Gallery → Guestbook → Footer), trục dọc thuần túy luôn là lựa chọn tối ưu, bền vững và thân thiện nhất với người dùng.
3. **Giải pháp thay thế ưu việt hơn**: Thay vì cuộn ngang, chuyển đổi Gallery sang **Lưới Masonry Đa Cột Thích Ứng (Adaptive Multi-column Grid)** kết hợp giữ nguyên tỷ lệ khung hình tự nhiên của tranh (`aspect-ratio` tự động từ metadata). Giải pháp này vừa đạt được sự phá cách nghệ thuật, xem được nhiều tranh cùng lúc trên màn hình lớn, vừa giữ cho luồng cuộn dọc tự nhiên 60 FPS trơn tru từ đầu trang đến chân trang.

- **Winter Hearth Guestbook (FR-06, DEC-19)**:
  - Bảng lưu bút fan hâm mộ ấm cúng với form gửi lời chúc, bộ chọn stamp biểu tượng (❄️, 💙, 🐰, ✨, 🍵), đếm ký tự (140 max) và optimistic toast notification.
  - Schema Sanity CMS `studio/schemas/guestbook.ts` và service `sanity.ts` sẵn sàng lưu trữ và truy vấn lời chúc trên cloud với cấu hình `useCdn: false` đảm bảo dữ liệu hiển thị tức thì theo thời gian thực (0s độ trễ cache).
- **Yoshinon Tour Guide 6-Step Evolution (FR-03)**:
  - Nâng cấp máy trạng thái FSM lên 6 bước: Welcome → Wardrobe Switcher → Spirit Archive → Exhibition Walkthrough → Winter Hearth Guestbook → Sanctuary Credits & Farewell.
  - Smooth scroll tự động căn giữa và pulsing cyan outline `tour-highlight-target` cho từng phần tử.
- **Kiểm thử & Tối ưu toàn diện**:
  - `npm run build`: Thành công 100% không lỗi, các vendor chunks (`vendor-react`, `vendor-motion`, `vendor-sanity`) đều dưới 215 kB.
  - `npm run lint`: 0 errors, 0 warnings.
  - Visual testing bằng Playwright: Xác thực thành công cả 5 màn hình, tương tác đổi trang phục, gửi lời chúc guestbook và luồng tour 6 bước.

---

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
