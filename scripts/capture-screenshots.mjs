// Captura el sitio en vivo de cada cliente y guarda la imagen en public/images/clients/.
// Uso: npm run screenshots            (solo los que no tienen captura)
//      npm run screenshots -- --force (vuelve a capturar todos)
import { chromium } from 'playwright';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';

const CLIENTS_DIR = 'src/content/clients';
const OUT_DIR = 'public/images/clients';
const force = process.argv.includes('--force');

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 0.75,
});

const files = (await readdir(CLIENTS_DIR)).filter((f) => f.endsWith('.md'));
let ok = 0;
let failed = [];

for (const file of files) {
  const path = join(CLIENTS_DIR, file);
  const src = await readFile(path, 'utf8');
  if (!force && /^thumbnail:/m.test(src)) continue;
  if (/^status:\s*"?archived/m.test(src)) continue; // offline: keep whatever capture exists

  const url = src.match(/^url:\s*"?([^"\n]+)"?/m)?.[1];
  if (!url) continue;

  const slug = basename(file, '.md');
  const thumb = `/images/clients/${slug}.jpg`;
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2500); // deja terminar animaciones de entrada / sliders
    const body = await page.locator('body').innerText().catch(() => '');
    if (/verify you are human|security verification|just a moment|access denied/i.test(body)) {
      throw new Error('página de verificación anti-bots');
    }
    await page.screenshot({ path: join('public', thumb), type: 'jpeg', quality: 72 });

    const updated = src.replace(/^thumbnail:.*\n/m, '').replace(/^(url:.*)$/m, `$1\nthumbnail: "${thumb}"`);
    await writeFile(path, updated);
    ok++;
    console.log(`✓ ${slug}`);
  } catch (err) {
    failed.push(slug);
    console.log(`✗ ${slug} — ${err.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n${ok} capturas nuevas${failed.length ? `, ${failed.length} fallidas: ${failed.join(', ')}` : ''}`);
