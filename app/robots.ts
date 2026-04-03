import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'GPTBot',          // ChatGPT training
          'OAI-SearchBot',   // ChatGPT search results (separate from GPTBot)
          'ChatGPT-User',
          'Google-Extended',
          'PerplexityBot',
          'Claude-Web',
          'anthropic-ai',
          'Bytespider',
          'cohere-ai',
        ],
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/terminal', '/login', '/review', '/onboard', '/connect', '/api/'],
      },
    ],
    sitemap: 'https://assurgit.com/sitemap.xml',
  }
}
