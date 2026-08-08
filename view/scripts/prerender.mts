import { createServer } from 'node:http';
import { writeFile, mkdir } from 'node:fs/promises';
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

const serve = sirv(dist, { single: true }); // SPA fallback so any route boots
const server = createServer((req, res) =>
  serve(req, res, () => { res.statusCode = 404; res.end('not found'); })
);
await new Promise<void>((r) => server.listen(PORT, () => r()));
console.log(`serving dist on http://localhost:${PORT}`);

const browser: Browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });

  // Don't snapshot until React has actually mounted content into #root.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return !!root && root.children.length > 0;
    },
    { timeout: 15000 }
  );

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