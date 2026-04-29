// Pre-generated at build time by scripts/generate-blog-manifest.mjs.
// Imported as a static JSON module so the Cloudflare Worker never needs fs.
import manifest from '../content/blog-manifest.json';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  featured: boolean;
  keywords?: string;
  content: string;
  contentHtml: string;
}

// ── getAllPosts — uses the pre-built manifest (works in Workers + Node) ───────
export function getAllPosts(): BlogPost[] {
  return (manifest as BlogPost[]).slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ── getPostBySlug — uses the pre-built manifest (works in Workers + Node) ────
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['All', ...Array.from(cats)];
}
