import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
            { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/terminal', '/login', '/review', '/onboard', '/connect', '/api/'],
      },
    ],
    sitemap: 'https://assurgit.com/sitemap.xml',
  }
}
