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
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sourceUrl',
      title: 'Original Source URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'curatorNote',
      title: 'Curator Note (Review / Thoughts)',
      type: 'text',
      rows: 3,
      description: 'Your personal thoughts or background note for this artwork (optional)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artistName',
      media: 'image',
    },
  },
};
