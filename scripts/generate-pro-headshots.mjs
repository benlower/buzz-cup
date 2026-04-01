/**
 * Generates "Made the Cut" pro golfer headshots for 2026 players using Gemini.
 * Run with: pnpm generate-headshots
 *
 * - Source images: src/assets/players/2026/ (skips -golf, -jacket, generic)
 * - Outputs:       src/assets/players/2026/{name}-pro.png
 * - Champions get a clear jacket applied using their *-jacket.png as reference
 * - Updates avatarPro in each player's src/content/players/*.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');

// ─── Load .env ───────────────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error('Set GEMINI_API_KEY in .env before running.');
  process.exit(1);
}

// ─── Config ──────────────────────────────────────────────────────────────────
const PLAYERS_DIR = path.join(ROOT, 'src/assets/players/2026');
const CONTENT_DIR = path.join(ROOT, 'src/content/players');
const MODEL       = 'gemini-3.1-flash-image-preview';
const API_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Past champions — first name (lowercase) maps to their jacket file prefix
const CHAMPIONS = {
  mike:  { year: 2023, name: 'Mike Kovner' },
  ben:   { year: 2024, name: 'Ben Lower' },
  david: { year: 2025, name: 'David Lower' },
};

// const BASE_PROMPT =
//   'cinematic, ultra-realistic professional golfer headshot of the same person ' +
//   'from the reference image. Preserve exact facial features, identity, and likeness. ' +
//   'Standing on a lush Masters-style golf course, holding golf clubs, dramatic natural lighting.';

const BASE_PROMPT =
  'cinematic, ultra-realistic professional golfer headshot of the same person ' +
  'from the reference image. Preserve exact facial';

// const CHAMPION_PROMPT =
//   'cinematic, ultra-realistic professional golfer headshot of the same person ' +
//   'from the reference image. Preserve exact facial features, identity, and likeness. ' +
//   'Standing on a lush Masters-style golf course, holding golf clubs, dramatic natural lighting. ' +
//   'The subject is wearing the clear transparent champion\'s jacket shown in the second reference image.';

const CHAMPION_PROMPT =
  'cinematic, ultra-realistic professional golfer headshot of the same person ' +
  'from the reference image. Preserve exact facial. The subject is wearing the ' +
  'clear transparent champion\'s jacket shown in the second reference image.';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function mimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png')  return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'image/png';
}

function toBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

/** Call Gemini and return the generated image as a Buffer. */
async function generateImage(playerPath, jacketPath) {
  const isChampion = !!jacketPath && fs.existsSync(jacketPath);
  const prompt = isChampion ? CHAMPION_PROMPT : BASE_PROMPT;

  const parts = [
    { text: prompt },
    { inlineData: { mimeType: mimeType(playerPath), data: toBase64(playerPath) } },
  ];

  if (isChampion) {
    parts.push({ inlineData: { mimeType: mimeType(jacketPath), data: toBase64(jacketPath) } });
  }

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`HTTP ${res.status}: ${body}`);
    if (res.status === 429) err.quota = true;
    throw err;
  }

  const json = await res.json();
  const imgPart = json.candidates?.[0]?.content?.parts?.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imgPart) throw new Error(`No image in response: ${JSON.stringify(json).slice(0, 300)}`);

  return Buffer.from(imgPart.inlineData.data, 'base64');
}

/**
 * Find the .md file whose `name:` first-name matches the image basename,
 * then update both `avatar` and `avatarPro`.
 */
function updateMarkdown(basename, imageFile, proFile) {
  const mdFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  for (const mdFile of mdFiles) {
    const mdPath  = path.join(CONTENT_DIR, mdFile);
    let   content = fs.readFileSync(mdPath, 'utf-8');

    // Match on first name from the `name:` frontmatter field
    const nameMatch = content.match(/^name:\s*"([^"]+)"/m);
    if (!nameMatch) continue;
    const firstName = nameMatch[1].split(' ')[0].toLowerCase();
    if (firstName !== basename.toLowerCase()) continue;

    // Update avatar (real headshot)
    content = content.replace(
      /^avatar:.*$/m,
      `avatar: "../../assets/players/2026/${imageFile}"`
    );

    // Update or insert avatarPro
    if (/^avatarPro:/m.test(content)) {
      content = content.replace(
        /^avatarPro:.*$/m,
        `avatarPro: "../../assets/players/2026/${proFile}"`
      );
    } else {
      content = content.replace(
        /^avatarAlt:/m,
        `avatarPro: "../../assets/players/2026/${proFile}"\navatarAlt:`
      );
    }

    fs.writeFileSync(mdPath, content);
    console.log(`  ✓ Updated ${mdFile}`);
    return;
  }

  console.warn(`  ⚠ No markdown file found for "${basename}"`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
  const arg = process.argv[2]; // optional: "doug" or "doug.jpeg"

  const allImages = fs.readdirSync(PLAYERS_DIR).filter(f => {
    const lower = f.toLowerCase();
    return (
      IMAGE_EXTS.has(path.extname(lower)) &&
      !lower.includes('-golf') &&
      !lower.includes('-jacket') &&
      lower !== 'generic.png'
    );
  });

  let playerImages;
  if (arg) {
    const basename = path.basename(arg, path.extname(arg)).toLowerCase();
    playerImages = allImages.filter(f => path.basename(f, path.extname(f)).toLowerCase() === basename);
    if (playerImages.length === 0) {
      console.error(`No player image found for "${arg}". Available: ${allImages.map(f => path.basename(f, path.extname(f))).join(', ')}`);
      process.exit(1);
    }
  } else {
    playerImages = allImages;
  }

  console.log(`\n🏌️  Generating pro headshots for ${playerImages.length} players\n`);

  for (let i = 0; i < playerImages.length; i++) {
    const imageFile = playerImages[i];
    const ext       = path.extname(imageFile);
    const basename  = path.basename(imageFile, ext);
    const proFile   = `${basename}-pro.png`;
    const playerPath = path.join(PLAYERS_DIR, imageFile);
    const proPath    = path.join(PLAYERS_DIR, proFile);

    const champion   = CHAMPIONS[basename.toLowerCase()];
    const jacketPath = champion
      ? path.join(PLAYERS_DIR, `${basename}-jacket.png`)
      : null;

    console.log(`[${i + 1}/${playerImages.length}] ${imageFile}${champion ? ` 🏆 champion (${champion.year})` : ''}`);

    try {
      const imgBuffer = await generateImage(playerPath, jacketPath);
      fs.writeFileSync(proPath, imgBuffer);
      console.log(`  ✓ Saved ${proFile}`);
      updateMarkdown(basename, imageFile, proFile);
    } catch (err) {
      if (err.quota) {
        console.error(`  ✗ Quota exceeded — stopping. Get a new API key and retry.\n`);
        process.exit(1);
      }
      console.error(`  ✗ Failed: ${err.message}`);
    }

    // Brief pause between requests to avoid rate limits
    if (i < playerImages.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log('\n✅ Done\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
