// sanity/schemas/artwork.ts
// Standardized Sanity Schema for Yoshino Artwork (Simplified)
// Source of truth: spec/REQUIREMENTS.md §7.2
/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: 'artwork',
  title: 'Yoshino Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      description: 'Tiêu đề tranh (Tùy chọn — có thể để trống cho Official/Collab)',
    },
    {
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
      validation: (Rule: any) => Rule.required(),
      initialValue: 'official',
    },
    {
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      description: 'Bắt buộc đối với Community Fanart; Tùy chọn (cho phép trống) đối với Official Art và Collab',
      validation: (Rule: any) =>
        Rule.custom((val: any, context: any) => {
          const parent = context.parent as { category?: string } | undefined;
          if (parent?.category === 'fanart' && (!val || typeof val !== 'string' || !val.trim())) {
            return 'Vui lòng điền Artist Name cho tác phẩm Community Fanart';
          }
          return true;
        }),
    },
    {
      name: 'sourceUrl',
      title: 'Original Source URL',
      type: 'url',
      description: 'Bắt buộc đối với Community Fanart; Tùy chọn (cho phép trống) đối với Official Art và Collab',
      validation: (Rule: any) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((val: any, context: any) => {
          const parent = context.parent as { category?: string } | undefined;
          if (parent?.category === 'fanart' && (!val || typeof val !== 'string' || !val.trim())) {
            return 'Vui lòng cung cấp Source URL cho tác phẩm Community Fanart';
          }
          return true;
        }),
    },
    {
      name: 'curatorNote',
      title: 'Curator Note (Review / Thoughts)',
      type: 'text',
      rows: 3,
      description: 'Ghi chú, cảm nghĩ hoặc bối cảnh tác phẩm (tùy chọn)',
    },
    {
      name: 'hidden',
      title: 'Hide from Gallery',
      type: 'boolean',
      description: 'Gạt bật tùy chọn này để tạm ẩn tác phẩm khỏi phòng tranh mà không cần xóa',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artistName',
      category: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, category, media }: any) {
      const categoryLabel =
        category === 'official'
          ? 'Official Art'
          : category === 'collab'
          ? 'Collaboration & Events'
          : 'Community Fanart';

      return {
        title: title?.trim() || categoryLabel,
        subtitle: subtitle?.trim() || (category === 'official' ? 'Official / Tsunako' : category === 'collab' ? 'Official Collab' : 'Unknown Artist'),
        media,
      };
    },
  },
};
