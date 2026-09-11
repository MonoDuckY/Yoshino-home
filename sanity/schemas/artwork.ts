// sanity/schemas/artwork.ts
// Standardized Sanity Schema for Yoshino Artwork
// Source of truth: spec/REQUIREMENTS.md §7.2, DEC-02
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
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
      // blurDataUrl is automatically extracted via image.asset->metadata.lqip
    },
    {
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'artistHandle',
      title: 'Artist Handle (@...)',
      type: 'string',
      description: 'e.g. @tsunako_official',
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Official', value: 'official' },
          { title: 'Pixiv', value: 'pixiv' },
          { title: 'X (Twitter)', value: 'twitter' },
          { title: 'ArtStation', value: 'artstation' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sourceUrl',
      title: 'Original Source URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    },
    {
      name: 'curatorNote',
      title: 'Curator Note',
      type: 'text',
      rows: 3,
      description: 'Curator commentary or background context for this artwork',
    },
  ],
};
