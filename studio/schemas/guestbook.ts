import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'guestbook',
  title: 'Winter Hearth Guestbook',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name / Nickname',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: 'message',
      title: 'Wish Message',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'badgeIcon',
      title: 'Badge Icon / Emoji',
      type: 'string',
      initialValue: '❄️',
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Display',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'message',
    },
  },
});
