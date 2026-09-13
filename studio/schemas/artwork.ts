import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artwork',
  title: 'Yoshino Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Official Art (Kadokawa / Tsunako)', value: 'official' },
          { title: 'Community Fanart', value: 'fanart' },
          { title: 'Collaboration & Events', value: 'collab' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Original Source URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'curatorNote',
      title: 'Curator Note (Review / Thoughts)',
      type: 'text',
      rows: 3,
      description: 'Your personal thoughts or background note for this artwork (optional)',
    }),
    defineField({
      name: 'hidden',
      title: 'Hide from Gallery',
      type: 'boolean',
      description: 'Gạt bật tùy chọn này để tạm ẩn tác phẩm khỏi phòng tranh mà không cần xóa',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artistName',
      media: 'image',
    },
  },
});
