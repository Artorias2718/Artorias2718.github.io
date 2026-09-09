import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer, { type Browser } from 'puppeteer';
import sirv from 'sirv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const PORT = 5055;

const routes: string[] = [
  '/', '/faq', '/glossary', '/resources', '/boosttiers',
  '/boosttimer', '/progressvault', '/about', '/contact', '/privacypolicy',
];

// Pristine shell, read ONCE — never re-read the file we overwrite in the loop.
const shell = await readFile(join(dist, 'index.html'), 'utf8');
const assets = sirv(dist, { dev: true });

const server = createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  if (/\.[a-zA-Z0-9]+$/.test(path)) {
    assets(req, res, () => { res.statusCode = 404; res.end('not found'); });
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(shell);
  }
});

const host = `http://localhost:${PORT}`;

await new Promise<void>((r) => server.listen(PORT, () => r()));
console.log(`serving dist on ${host}`);

const browser: Browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const route of routes) {
  const page = await browser.newPage();
  page.on('console', (m) => console.log(`  [${route}] console.${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => console.log(`  [${route}] pageerror: ${e.message}`));
  page.on('requestfailed', (r) =>
    console.log(`  [${route}] requestfailed: ${r.url()} — ${r.failure()?.errorText}`)
  );
  page.on('response', (r) => {
    if (r.status() >= 400) console.log(`  [${route}] HTTP ${r.status()}: ${r.url()}`);
  });

  await page.goto(`${host}${route}`, { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForFunction(() =>
        document.documentElement.dataset.prerenderReady === 'true', { timeout: 15000 });
  } catch (err) {
    const tag = route === '/' ? 'root' : route.replace(/\//g, '_');
    await page.screenshot({ path: join(__dirname, `fail-${tag}.png`), fullPage: true });
    await writeFile(join(__dirname, `fail-${tag}.html`), await page.content(), 'utf8');
    console.error(`  [${route}] TIMED OUT — wrote fail-${tag}.png / .html`);
    throw err;
  }

  const html = await page.content();
  const outDir = route === '/' ? dist : join(dist, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html, 'utf8');
  console.log(`prerendered ${route}`);
  await page.close();
}

await browser.close();
server.close();
console.log('done');