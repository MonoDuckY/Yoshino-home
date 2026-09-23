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
      description: 'Tiêu đề tranh (Tùy chọn — có thể để trống cho Official/Collab)',
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
      initialValue: 'official',
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
      description: 'Bắt buộc đối với Community Fanart; Tùy chọn (cho phép trống) đối với Official Art và Collab',
      validation: (rule) =>
        rule.custom((val, context) => {
          const doc = (context.document || context.parent) as { category?: string } | undefined;
          if (doc?.category === 'fanart' && (!val || typeof val !== 'string' || !val.trim())) {
            return 'Vui lòng điền Artist Name cho tác phẩm Community Fanart';
          }
          return true;
        }),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Original Source URL',
      type: 'url',
      description: 'Bắt buộc đối với Community Fanart; Tùy chọn (cho phép trống) đối với Official Art và Collab',
      validation: (rule) =>
        rule.custom((val, context) => {
          const doc = (context.document || context.parent) as { category?: string } | undefined;
          if (doc?.category === 'fanart' && (!val || typeof val !== 'string' || !val.trim())) {
            return 'Vui lòng cung cấp Source URL cho tác phẩm Community Fanart';
          }
          if (val && typeof val === 'string' && val.trim() !== '') {
            try {
              const parsed = new URL(val);
              if (!['http:', 'https:'].includes(parsed.protocol)) {
                return 'URL phải bắt đầu bằng http:// hoặc https://';
              }
            } catch {
              return 'Định dạng URL không hợp lệ';
            }
          }
          return true;
        }),
    }),
    defineField({
      name: 'curatorNote',
      title: 'Curator Note (Review / Thoughts)',
      type: 'text',
      rows: 3,
      description: 'Ghi chú, cảm nghĩ hoặc bối cảnh tác phẩm (tùy chọn)',
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
      category: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, category, media }) {
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
});
