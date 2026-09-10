// ─────────────────────────────────────────────
// Mock Artwork Data — Sprint 1 & 2
// Strategy: Mock Data First (DEC-03)
// Replace with Sanity client.fetch() in Sprint 3
// ─────────────────────────────────────────────
import type { Artwork, CharacterDossier } from '../types';

export const mockArtworks: Artwork[] = [
  {
    id: 'aw-001',
    title: 'Winter Spirit',
    category: 'official',
    imageUrl: 'https://placehold.co/400x560/0B1325/7DD3FC?text=Official+Art+1',
    width: 400,
    height: 560,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      handle: '@tsunako_official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-01-15',
    curatorNote: 'Tác phẩm minh họa Light Novel Volume 1 — khoảnh khắc đầu tiên Shido gặp Yoshino trong cơn mưa.',
  },
  {
    id: 'aw-002',
    title: 'Zadkiel\'s Embrace',
    category: 'official',
    imageUrl: 'https://placehold.co/400x560/0B1325/7DD3FC?text=Official+Art+2',
    width: 400,
    height: 560,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-03-20',
  },
  {
    id: 'aw-003',
    title: 'Snowflakes Whisper',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x560/0B1325/6EE7B7?text=Fanart+1',
    width: 400,
    height: 560,
    credit: {
      name: 'Haruki_Art',
      platform: 'pixiv',
      handle: '@haruki_art',
      sourceUrl: 'https://pixiv.net',
    },
    publishedDate: '2024-05-10',
    curatorNote: 'Màu sắc pastel rất dịu — cách họa sĩ lồng ghép hoa tuyết vào áo khoác tai thỏ thật tinh tế.',
  },
  {
    id: 'aw-004',
    title: 'Blue Rabbit Dream',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x560/0B1325/6EE7B7?text=Fanart+2',
    width: 400,
    height: 560,
    credit: {
      name: 'neko_draws',
      platform: 'twitter',
      handle: '@neko_draws',
      sourceUrl: 'https://x.com',
    },
    publishedDate: '2024-07-02',
  },
  {
    id: 'aw-005',
    title: 'Compile♥ Summer Collab',
    category: 'collab',
    imageUrl: 'https://placehold.co/400x560/0B1325/94A3B8?text=Collab+1',
    width: 400,
    height: 560,
    credit: {
      name: 'Compile Heart',
      platform: 'official',
      sourceUrl: 'https://www.compileheart.com',
    },
    publishedDate: '2024-06-15',
    curatorNote: 'Event crossover với Neptunia — skin exclusive chỉ có trong tuần lễ collab.',
  },
  {
    id: 'aw-006',
    title: 'Yoshino\'s Tea Time',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x560/0B1325/6EE7B7?text=Fanart+3',
    width: 400,
    height: 560,
    credit: {
      name: 'winterpetal',
      platform: 'pixiv',
      handle: '@winterpetal_art',
      sourceUrl: 'https://pixiv.net',
    },
    publishedDate: '2024-08-18',
  },
  {
    id: 'aw-007',
    title: 'Café Pop-up Promo',
    category: 'collab',
    imageUrl: 'https://placehold.co/400x560/0B1325/94A3B8?text=Collab+2',
    width: 400,
    height: 560,
    credit: {
      name: 'Kadokawa × animate café',
      platform: 'official',
      sourceUrl: 'https://kadokawa.co.jp',
    },
    publishedDate: '2023-12-01',
    curatorNote: 'Merch campaign animate Café mùa đông 2023 — illustration exclusive giữ bản quyền Kadokawa.',
  },
  {
    id: 'aw-008',
    title: 'Frozen Puppet Dance',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x560/0B1325/6EE7B7?text=Fanart+4',
    width: 400,
    height: 560,
    credit: {
      name: 'icecrystal_art',
      platform: 'twitter',
      handle: '@icecrystal_art',
      sourceUrl: 'https://x.com',
    },
    publishedDate: '2024-09-05',
  },
];

// ─────────────────────────────────────────────
// Character Dossier — Static data (FR-01)
// ─────────────────────────────────────────────
export const characterDossier: CharacterDossier = {
  codename: 'The Hermit',
  spiritNumber: '02',
  nameRomanized: 'Himekawa Yoshino',
  nameKanji: '氷芽川 四糸乃',
  astralDress: 'Zadkiel Coat',
  angelName: 'Zadkiel',
  personalitySummary: 'Nhút nhát, vị tha, luôn quan tâm người khác — nhưng ẩn chứa sức mạnh kiểm soát băng giá tuyệt đối.',
  keyQuote: 'Mình... không muốn làm tổn thương bất cứ ai cả...',
};
