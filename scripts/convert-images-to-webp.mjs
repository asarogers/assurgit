#!/usr/bin/env node
/**
 * convert-images-to-webp.mjs
 *
 * Converts every .png/.jpg/.jpeg in public/images/ to .webp (sharp)
 * and rewrites references across the codebase (data files, components,
 * content/*.md, JSON manifests).
 *
 * Usage:
 *   node scripts/convert-images-to-webp.mjs           # convert + rewrite refs
 *   node scripts/convert-images-to-webp.mjs --dry     # preview only
 *   node scripts/convert-images-to-webp.mjs --keep    # keep originals
 *                                                    # (default: delete)
 */
import fs                from 'fs';
import path              from 'path';
import crypto            from 'crypto';
import { fileURLToPath } from 'url';
import { execSync }      from 'child_process';
import sharp             from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, '..');
const IMG_DIR    = path.join(ROOT, 'public/images');

const argv   = process.argv.slice(2);
const DRY    = argv.includes('--dry');
const KEEP   = argv.includes('--keep');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function isLegacy(p) {
  return /\.(png|jpe?g)$/i.test(p);
}

async function convertOne(srcPath) {
  const webpPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');
  if (fs.existsSync(webpPath)) return { src: srcPath, webp: webpPath, skipped: 'webp already exists' };
  if (DRY)                      return { src: srcPath, webp: webpPath, skipped: 'dry-run'        };
  await sharp(srcPath).webp({ quality: 82, effort: 4 }).toFile(webpPath);
  const origBytes = fs.statSync(srcPath).size;
  const newBytes  = fs.statSync(webpPath).size;
  if (!KEEP) fs.unlinkSync(srcPath);
  return { src: srcPath, webp: webpPath, origBytes, newBytes };
}

function rewriteReferences(srcToWebpMap) {
  // Find every text file the build references and replace PNG/JPG paths with WebP.
  // Restrict to repo source, not node_modules / .next / .open-next.
  const SKIP_DIRS = new Set(['node_modules', '.next', '.open-next', '.git', 'public']);
  const extsToRewrite = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md', '.css'];

  const allFiles = [];
  (function walkRepo(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkRepo(full);
      else if (extsToRewrite.includes(path.extname(full))) allFiles.push(full);
    }
  })(ROOT);

  // Build pairs of (old-path-from-public, new-path-from-public), all starting with "/images/"
  const replacements = [];
  for (const [src, webp] of Object.entries(srcToWebpMap)) {
    const oldRel = '/' + path.relative(path.join(ROOT, 'public'), src).replace(/\\/g, '/');
    const newRel = '/' + path.relative(path.join(ROOT, 'public'), webp).replace(/\\/g, '/');
    replacements.push([oldRel, newRel]);
  }

  let totalFiles = 0, totalHits = 0;
  for (const filePath of allFiles) {
    let content;
    try { content = fs.readFileSync(filePath, 'utf8'); }
    catch { continue; }
    let modified = content;
    let fileHits = 0;
    for (const [oldRel, newRel] of replacements) {
      if (!modified.includes(oldRel)) continue;
      const escaped = oldRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rx = new RegExp(escaped, 'g');
      const before = modified;
      modified = modified.replace(rx, newRel);
      fileHits += (before.match(rx) || []).length;
    }
    if (fileHits > 0) {
      totalFiles++;
      totalHits += fileHits;
      if (!DRY) fs.writeFileSync(filePath, modified);
    }
  }
  return { totalFiles, totalHits };
}

async function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error(`[convert] ${IMG_DIR} not found`);
    process.exit(1);
  }

  const all     = walk(IMG_DIR);
  const legacy  = all.filter(isLegacy);

  console.log(`[convert] mode=${DRY ? 'dry-run' : 'apply'}  keep-originals=${KEEP}`);
  console.log(`[convert] found ${legacy.length} legacy images in public/images/\n`);
  if (legacy.length === 0) {
    console.log('✅ No legacy images to convert.');
    return;
  }

  const srcToWebp = {};
  let origTotal = 0, newTotal = 0, skipped = 0;
  for (const p of legacy) {
    const r = await convertOne(p);
    if (r.skipped) {
      console.log(`  SKIP  ${path.relative(ROOT, p)}  (${r.skipped})`);
      skipped++;
    } else {
      srcToWebp[p] = r.webp;
      origTotal += r.origBytes || 0;
      newTotal  += r.newBytes || 0;
      const pct  = r.origBytes ? Math.round(100 * (1 - r.newBytes / r.origBytes)) : 0;
      console.log(`  ✓     ${path.relative(ROOT, p)}  →  ${path.basename(r.webp)}  (-${pct}%)`);
    }
  }

  console.log(`\n[convert] ${Object.keys(srcToWebp).length} converted, ${skipped} skipped.`);
  if (origTotal > 0) {
    const saveKB = ((origTotal - newTotal) / 1024).toFixed(1);
    const savePct = Math.round(100 * (1 - newTotal / origTotal));
    console.log(`[convert] total size ${(origTotal/1024).toFixed(1)}KB → ${(newTotal/1024).toFixed(1)}KB (saved ${saveKB}KB, ${savePct}%)\n`);
  }

  console.log('[rewrite] updating references in .ts/.tsx/.js/.mjs/.json/.md/.css …');
  const { totalFiles, totalHits } = rewriteReferences(srcToWebp);
  console.log(`[rewrite] ${totalHits} reference(s) in ${totalFiles} file(s) ${DRY ? '(dry-run)' : 'rewritten'}`);

  if (DRY) {
    console.log('\nRun again without --dry to actually convert + rewrite.');
  } else {
    console.log('\nNext step: rebuild + redeploy');
    console.log('  npm run deploy');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
