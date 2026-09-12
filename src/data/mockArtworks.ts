// ─────────────────────────────────────────────
// Mock Artwork Data — Sprint 1 & 2
// Strategy: Mock Data First (DEC-03)
// Replace with Sanity client.fetch() in Sprint 3
// ─────────────────────────────────────────────
import type { Artwork, CharacterDossier, Costume, ArchiveRecord, GuestbookEntry } from '../types';
import yoshinoStandee from '../assets/yoshino-standee.webp';

export const mockArtworks: Artwork[] = [
  {
    id: 'aw-001',
    title: 'Winter Spirit',
    category: 'official',
    imageUrl: 'https://placehold.co/450x600/0B1325/7DD3FC?text=Official+Art+1+(3:4)',
    width: 450,
    height: 600,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      handle: '@tsunako_official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-01-15',
    curatorNote: 'Light Novel Volume 1 color illustration — the poignant first moment Shido meets Yoshino in the pouring rain.',
  },
  {
    id: 'aw-002',
    title: 'Zadkiel\'s Embrace',
    category: 'official',
    imageUrl: 'https://placehold.co/640x360/0B1325/7DD3FC?text=Official+Art+2+(16:9)',
    width: 640,
    height: 360,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-03-20',
    curatorNote: 'Wide-angle key visual of the frozen wonderland, with Zadkiel unfurling majestic ice wings.',
  },
  {
    id: 'aw-003',
    title: 'Snowflakes Whisper',
    category: 'fanart',
    imageUrl: 'https://placehold.co/640x480/0B1325/6EE7B7?text=Fanart+1+(4:3)',
    width: 640,
    height: 480,
    credit: {
      name: 'Haruki_Art',
      platform: 'pixiv',
      handle: '@haruki_art',
      sourceUrl: 'https://pixiv.net',
    },
    publishedDate: '2024-05-10',
    curatorNote: 'Delicate pastel tones — the artist gracefully wove miniature snowflakes into the rabbit hoodie.',
  },
  {
    id: 'aw-004',
    title: 'Blue Rabbit Dream',
    category: 'fanart',
    imageUrl: 'https://placehold.co/450x800/0B1325/6EE7B7?text=Fanart+2+(9:16)',
    width: 450,
    height: 800,
    credit: {
      name: 'neko_draws',
      platform: 'twitter',
      handle: '@neko_draws',
      sourceUrl: 'https://x.com',
    },
    publishedDate: '2024-07-02',
    curatorNote: 'Vertical phone wallpaper — Yoshino gently clutching Yoshinon beneath glistening frosted boughs.',
  },
  {
    id: 'aw-005',
    title: 'Compile♥ Summer Collab',
    category: 'collab',
    imageUrl: 'https://placehold.co/500x500/0B1325/94A3B8?text=Collab+1+(1:1)',
    width: 500,
    height: 500,
    credit: {
      name: 'Compile Heart',
      platform: 'official',
      sourceUrl: 'https://www.compileheart.com',
    },
    publishedDate: '2024-06-15',
    curatorNote: 'Neptunia crossover celebration event — limited edition Astral Dress collaboration skin.',
  },
  {
    id: 'aw-006',
    title: 'Yoshino\'s Tea Time',
    category: 'fanart',
    imageUrl: 'https://placehold.co/450x600/0B1325/6EE7B7?text=Fanart+3+(3:4)',
    width: 450,
    height: 600,
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
    imageUrl: 'https://placehold.co/640x400/0B1325/94A3B8?text=Collab+2+(16:10)',
    width: 640,
    height: 400,
    credit: {
      name: 'Kadokawa × animate café',
      platform: 'official',
      sourceUrl: 'https://kadokawa.co.jp',
    },
    publishedDate: '2023-12-01',
    curatorNote: 'Winter 2023 animate Café pop-up collaboration artwork under Kadokawa copyright.',
  },
  {
    id: 'aw-008',
    title: 'Frozen Puppet Dance',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x600/0B1325/6EE7B7?text=Fanart+4+(2:3)',
    width: 400,
    height: 600,
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
// Character Dossier — Static data (FR-01, DEC-13)
// ─────────────────────────────────────────────
export const characterDossier: CharacterDossier = {
  codename: 'The Hermit',
  spiritNumber: '02',
  nameRomanized: 'Himekawa Yoshino',
  nameKanji: '氷芽川 四糸乃',
  astralDress: 'Zadkiel Coat',
  angelName: 'Zadkiel',
  personalitySummary: 'Shy, gentle, and deeply caring — yet wielding the absolute power of freezing ice.',
  keyQuoteJp: '私……誰も傷つけたくないんです……',
  keyQuoteEn: "I... don't want to hurt anyone...",
  keyQuote: "I... don't want to hurt anyone...",
};

// ─────────────────────────────────────────────
// Costumes / Wardrobe (DEC-18)
// ─────────────────────────────────────────────
export const mockCostumes: Costume[] = [
  {
    id: 'astral-dress',
    name: 'Astral Dress: Zadkiel Coat',
    badge: 'Spirit Form',
    description: 'Iconic emerald bunny-eared winter coat with white petal lace, designed for sub-zero astral manifestation.',
    imageUrl: yoshinoStandee,
    accentColor: '#38BDF8',
  },
  {
    id: 'winter-casual',
    name: 'Winter Casual Knit',
    badge: 'Everyday Life',
    description: 'A cozy sky-blue wool sweater paired with a pleated cream skirt and rabbit-ear earmuffs for peaceful strolls in Tenguu City.',
    imageUrl: yoshinoStandee,
    accentColor: '#A78BFA',
  },
  {
    id: 'raizen-uniform',
    name: 'Raizen High Uniform',
    badge: 'School Days',
    description: 'The standard Raizen High navy sailor uniform, featuring a soft blue neckerchief and her ever-present rabbit companion on her wrist.',
    imageUrl: yoshinoStandee,
    accentColor: '#34D399',
  },
];

// ─────────────────────────────────────────────
// Archive / Lore Dossiers (DEC-17)
// ─────────────────────────────────────────────
export const mockArchiveRecords: ArchiveRecord[] = [
  {
    id: 'lore-origin',
    tag: 'Sephira IV • Chesed',
    title: 'Origins & Encounter',
    kanji: '第2の精霊 • 邂逅',
    subtitle: 'Light Novel Vol. 2 / Anime S1 Ep. 4',
    icon: 'Sparkles',
    description:
      'Encountered by Shido Itsuka in the pouring rain near Tenguu City shrine. Classified by Ratatoskr as the 2nd Spirit codenamed "The Hermit". Unlike other spirits whose spacequakes arise from aggression, Yoshino\'s manifestations stem entirely from panic and self-defense.',
    details: [
      { label: 'Classification', value: 'Spirit No. 02 (The Hermit)' },
      { label: 'First Appearance', value: 'LN Volume 2 / Anime Ep. 4' },
      { label: 'Kabbalah Sephira', value: 'IV - Chesed (Mercy & Kindness)' },
      { label: 'Threat Level', value: 'Rank B (High Elemental Control)' },
    ],
    quote: 'Her spacequakes are purely passive reactions born of fear, never malice.',
  },
  {
    id: 'lore-appearance',
    tag: 'Physical Blueprint',
    title: 'Appearance & Demeanor',
    kanji: '容姿 • 身体的特徴',
    subtitle: '144 cm • Sky-Blue Curls • Sapphire Eyes',
    icon: 'User',
    description:
      'Appears as a young girl with innocent, doe-like azure eyes and wavy sea-blue hair cascading past her shoulders. Her signature attire is an oversized hooded coat adorned with long floppy rabbit ears, shielding her from the sensory overwhelm of the outer world.',
    details: [
      { label: 'Height', value: '144 cm (4 ft 9 in)' },
      { label: 'Hair / Eyes', value: 'Aquamarine Wavy / Deep Sapphire' },
      { label: 'Dominant Hand', value: 'Right-handed (Puppet on Left)' },
      { label: 'Distinctive Trait', value: 'Retractable Rabbit Ear Hoodie' },
    ],
    quote: 'Soft-spoken, naturally polite, and prone to hiding beneath her oversized hood.',
  },
  {
    id: 'lore-zadkiel',
    tag: 'Cryokinetic Divinity',
    title: 'Angel: Zadkiel',
    kanji: '氷結傀儡 • ザドキエル',
    subtitle: 'Absolute Zero Realm (-273.15°C)',
    icon: 'Shield',
    description:
      'Summons a colossal robotic puppet carved of glacial permafrost. Zadkiel commands thermodynamic manipulation at Absolute Zero (-273.15°C), freezing kinetic energy itself. Its Siryon form transforms the angel into a massive impenetrable ice fortress and localized blizzard.',
    details: [
      { label: 'Angel Classification', value: 'Zadkiel (氷結傀儡 / Frozen Puppet)' },
      { label: 'Primary Element', value: 'Sub-Zero Cryokinesis (-273.15°C)' },
      { label: 'Special Mode', value: 'Siryon (Glacial Armor Cannon)' },
      { label: 'Combat Philosophy', value: 'Strictly Non-Lethal Barrier Defense' },
    ],
    quote: 'Freezes moisture in the air to create unbreakable crystal sanctuary barriers.',
  },
  {
    id: 'lore-yoshinon',
    tag: 'Sentient Alter-Ego',
    title: 'Yoshinon the Familiar',
    kanji: 'よしのん • 精神的分身',
    subtitle: 'Left-Hand Puppet with Pirate Eyepatch',
    icon: 'Heart',
    description:
      'A worn, one-eyed rabbit puppet worn on Yoshino\'s left hand. Yoshinon was born through ventriloquism as a defensive psychological shield: brash, flirtatious, quick-witted, and bold, speaking the confident words that the shy Yoshino cannot voice herself.',
    details: [
      { label: 'Nature', value: 'Psychological Alter-Ego / Ventriloquism' },
      { label: 'Position', value: 'Left Hand (Constant Companion)' },
      { label: 'Personality', value: 'Boisterous, Sarcastic, Fiercely Protective' },
      { label: 'Emotional Bond', value: 'Yoshino\'s anchor to the outside world' },
    ],
    quote: '“Leave it to Yoshinon-sama! I’ll stand up for my sweet little lady anytime!”',
  },
];

// ─────────────────────────────────────────────
// Mini Guestbook — Fan Wishes (DEC-19)
// ─────────────────────────────────────────────
export const mockGuestbookEntries: GuestbookEntry[] = [
  {
    id: 'gb-1',
    authorName: 'TenguuWatcher',
    message: 'Yoshino is truly the purest, most gentle spirit in Date A Live! Her smile melts away every winter frost.',
    createdAt: '2024-11-20',
    badgeIcon: '❄️',
  },
  {
    id: 'gb-2',
    authorName: 'ChesedKnight',
    message: 'Zadkiel’s absolute zero power defending innocence is breathtaking art. Always cheering for you and Yoshinon!',
    createdAt: '2024-12-05',
    badgeIcon: '💙',
  },
  {
    id: 'gb-3',
    authorName: 'BunnyEarFan',
    message: 'Yoshinon’s cheeky jokes never fail to make my day! Stay cozy in your emerald rabbit coat, little hero.',
    createdAt: '2025-01-12',
    badgeIcon: '🐰',
  },
  {
    id: 'gb-4',
    authorName: 'SnowySanctuary',
    message: 'Such an immaculate tribute archive! The snowfall and frosted design match Yoshino’s character so perfectly.',
    createdAt: '2025-02-14',
    badgeIcon: '✨',
  },
];
