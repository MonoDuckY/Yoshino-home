// api/guestbook.js — Vercel Serverless Function to securely persist Guestbook entries to Sanity
import { createClient } from '@sanity/client';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read Write Token strictly on server side — prevents client bundle exposure
  const token = process.env.SANITY_WRITE_TOKEN || process.env.VITE_SANITY_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'SANITY_WRITE_TOKEN chưa được cấu hình trên Vercel. Vui lòng thêm token trong Settings -> Environment Variables.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON request body' });
      }
    }

    const { authorName, message, badgeIcon } = body || {};

    if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
      return res.status(400).json({ error: 'Tên người gửi không được để trống' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Nội dung lời chúc không được để trống' });
    }

    const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'c45te99f';
    const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
    const apiVersion = process.env.SANITY_API_VERSION || '2024-03-01';

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    const doc = await client.create({
      _type: 'guestbook',
      authorName: authorName.trim().slice(0, 40),
      message: message.trim().slice(0, 200),
      badgeIcon: badgeIcon || '❄️',
      approved: true,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      id: doc._id,
      authorName: doc.authorName,
      message: doc.message,
      badgeIcon: doc.badgeIcon,
      createdAt: (doc.createdAt || doc._createdAt).split('T')[0],
    });
  } catch (error) {
    console.error('[API Guestbook Error]:', error);
    return res.status(500).json({
      error: error.message || 'Lỗi server khi lưu lời chúc vào Sanity',
    });
  }
}
