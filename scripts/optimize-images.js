#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const MAX_LONG_SIDE = 3840; // 4K UHD ceiling

const USAGE = `Usage: npm run optimize:images -- <input> <output>

  <input>   Source raster image (JPEG, PNG, TIFF, HEIC, WebP, etc.)
  <output>  Destination path; must end in .webp

Behavior:
  - PNG / GIF / TIFF sources  → lossless WebP (preserves transparency + crisp edges)
  - JPEG / WebP sources       → lossy WebP at quality 80
  - Resolution preserved unless the long side exceeds 3840px (4K UHD); in that case
    the image is downscaled (long side = 3840px, aspect preserved, lanczos3)
  - SVG inputs are refused (use svgo for SVG optimization)
  - Animated images are refused
  - The original is not touched; only the .webp is written

Example:
  npm run optimize:images -- ~/Downloads/photo.jpg \\
    static/presentations/2026-devtalks-romania/assets/photos/hero.webp
`;

const args = process.argv.slice(2);
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}

if (args.length !== 2) {
  console.error('Expected exactly two arguments: <input> <output>');
  console.error('Run with --help for details.');
  process.exit(1);
}

const [input, output] = args;

if (!output.toLowerCase().endsWith('.webp')) {
  console.error('Output path must end in .webp');
  process.exit(1);
}

if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('sharp is not installed. Run: npm install');
  process.exit(1);
}

(async () => {
  const img = sharp(input);
  const meta = await img.metadata();
  const {width, height, format, pages} = meta;

  if (format === 'svg') {
    console.error('SVG inputs are not supported (use svgo for SVG optimization).');
    process.exit(1);
  }
  if (pages && pages > 1) {
    console.error('Animated images are not supported.');
    process.exit(1);
  }
  if (!width || !height) {
    console.error('Could not read image dimensions.');
    process.exit(1);
  }

  const longSide = Math.max(width, height);
  const shouldResize = longSide > MAX_LONG_SIDE;
  let pipeline = img;
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_LONG_SIDE : undefined,
      height: height > width ? MAX_LONG_SIDE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const lossless = ['png', 'gif', 'tiff'].includes(format);
  pipeline = pipeline.webp(
    lossless ? {lossless: true, effort: 6} : {quality: 80, effort: 6}
  );

  fs.mkdirSync(path.dirname(output), {recursive: true});
  await pipeline.toFile(output);

  const inStat = fs.statSync(input);
  const outStat = fs.statSync(output);
  const outMeta = await sharp(output).metadata();
  const savedPct = ((1 - outStat.size / inStat.size) * 100).toFixed(0);

  console.log(`✓ ${output}`);
  console.log(`  ${width}×${height} → ${outMeta.width}×${outMeta.height}${shouldResize ? ' (resized)' : ''}`);
  console.log(
    `  ${(inStat.size / 1024).toFixed(1)}KB (${format}) → ` +
      `${(outStat.size / 1024).toFixed(1)}KB (webp${lossless ? ', lossless' : ', q80'}) — ` +
      `${savedPct}% smaller`
  );
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
