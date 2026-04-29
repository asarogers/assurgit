#!/usr/bin/env node
/**
 * patch-turbopack-chunks.mjs
 *
 * Fixes a Windows path separator bug in @opennextjs/cloudflare that causes
 * the Turbopack SSR chunk switch statement to be generated empty.
 *
 * On Windows, tracedFiles paths use backslashes, so the filter
 * `file.includes(".next/server/chunks/")` never matches, producing:
 *   function requireChunk(chunkPath) { switch(chunkPath) { default: throw ... } }
 *
 * This script re-patches [turbopack]_runtime.js with the correct switch cases
 * after the OpenNext build completes, then re-runs the esbuild step that
 * produces handler.mjs.
 *
 * Run between opennextjs-cloudflare build and wrangler deploy.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SERVER_FN_DIR   = path.join(ROOT, '.open-next', 'server-functions', 'default');
const SSR_CHUNKS_DIR  = path.join(SERVER_FN_DIR, '.next', 'server', 'chunks', 'ssr');
const RUNTIME_FILE    = path.join(SSR_CHUNKS_DIR, '[turbopack]_runtime.js');
const INDEX_FILE      = path.join(SERVER_FN_DIR, 'index.mjs');
const HANDLER_FILE    = path.join(SERVER_FN_DIR, 'handler.mjs');

if (!fs.existsSync(RUNTIME_FILE)) {
  console.error('[patch-turbopack] ERROR: turbopack runtime not found:', RUNTIME_FILE);
  process.exit(1);
}

// Collect all SSR chunk files (excluding the runtime itself)
const chunkFiles = fs.readdirSync(SSR_CHUNKS_DIR)
  .filter(f => f.endsWith('.js') && f !== '[turbopack]_runtime.js');

if (chunkFiles.length === 0) {
  console.error('[patch-turbopack] ERROR: No SSR chunk files found in', SSR_CHUNKS_DIR);
  process.exit(1);
}

console.log(`[patch-turbopack] Found ${chunkFiles.length} SSR chunks to inline.`);

// Generate switch cases
// - case key: path relative to .next/ with forward slashes (matches what Turbopack calls requireChunk with)
// - require() path: absolute path with forward slashes (esbuild resolves on Windows too)
const cases = chunkFiles.map(file => {
  const caseKey = `server/chunks/ssr/${file}`;
  const requirePath = path.join(SSR_CHUNKS_DIR, file).replace(/\\/g, '/');
  return `      case "${caseKey}": return require("${requirePath}");`;
}).join('\n');

// Build the populated requireChunk function
const populatedFn = `  function requireChunk(chunkPath) {
    switch(chunkPath) {
${cases}
      default:
        throw new Error(\`Not found \${chunkPath}\`);
    }
  }`;

// Read and patch [turbopack]_runtime.js
let runtimeCode = fs.readFileSync(RUNTIME_FILE, 'utf-8');

const emptyPattern = /\s*function requireChunk\(chunkPath\) \{\n\s*switch\(chunkPath\) \{\n\n\s*default:\n\s*throw new Error\(`Not found \$\{chunkPath\}`\);\n\s*\}\n\s*\}/;

if (!emptyPattern.test(runtimeCode)) {
  // Already patched or different format — check if switch has cases
  if (runtimeCode.includes('case "server/chunks/ssr/')) {
    console.log('[patch-turbopack] Runtime already has populated switch cases. Skipping patch.');
    process.exit(0);
  }
  console.warn('[patch-turbopack] WARNING: Could not find empty requireChunk pattern. Attempting append.');
  runtimeCode = runtimeCode + '\n' + populatedFn;
} else {
  runtimeCode = runtimeCode.replace(emptyPattern, '\n' + populatedFn);
}

fs.writeFileSync(RUNTIME_FILE, runtimeCode);
console.log(`[patch-turbopack] Patched [turbopack]_runtime.js with ${chunkFiles.length} chunk cases.`);

// Re-run the esbuild step to create a new handler.mjs from the patched runtime
console.log('[patch-turbopack] Re-bundling handler.mjs...');

await build({
  entryPoints: [INDEX_FILE],
  bundle: true,
  outfile: HANDLER_FILE,
  format: 'esm',
  target: 'esnext',
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
  legalComments: 'none',
  platform: 'node',
  conditions: ['workerd'],
  external: [
    './middleware/handler.mjs',
    'next/dist/compiled/@vercel/og/index.edge.js',
  ],
  logLevel: 'warning',
});

console.log('[patch-turbopack] Done. handler.mjs rebuilt with SSR chunks inlined.');
