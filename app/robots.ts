import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Bingbot',
          'Applebot-Extended',
          'CCBot',
          'Bytespider'
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://bahamut.in/sitemap.xml',
    host: 'https://bahamut.in',
  };
}
