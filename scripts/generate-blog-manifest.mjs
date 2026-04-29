#!/usr/bin/env node
/**
 * generate-blog-manifest.mjs
 *
 * Reads all markdown files in content/blog/, extracts frontmatter + content,
 * and writes content/blog-manifest.json.
 *
 * Runs automatically before every build via the "prebuild" npm script.
 * The generated file is committed so the Cloudflare Worker can import it
 * as a static JSON module — no fs access needed at runtime.
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const BLOG_DIR  = path.join(ROOT, 'content', 'blog');
const OUT_FILE  = path.join(ROOT, 'content', 'blog-manifest.json');

// Minimal frontmatter parser — avoids a runtime gray-matter dep in the Worker
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key   = line.slice(0, colon).trim();
    let   value = line.slice(colon + 1).trim();
    // Unquote strings, parse booleans
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    else if (value === 'true')  value = true;
    else if (value === 'false') value = false;
    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

if (!fs.existsSync(BLOG_DIR)) {
  console.log('[blog-manifest] No content/blog directory — writing empty manifest.');
  fs.writeFileSync(OUT_FILE, JSON.stringify([], null, 2) + '\n');
  process.exit(0);
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

const posts = files
  .map((file) => {
    const slug    = file.replace(/\.md$/, '');
    const raw     = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    // Custom renderer: add loading="lazy" to all <img> tags in blog content
    const renderer = new marked.Renderer();
    renderer.image = ({ href, title, text }) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<img src="${href}" alt="${text || ''}"${titleAttr} loading="lazy">`;
    };
    const contentHtml = marked(content, { gfm: true, breaks: false, renderer });
    return { slug, content, contentHtml, ...data };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2) + '\n');
console.log(`[blog-manifest] ${posts.length} posts → content/blog-manifest.json`);
