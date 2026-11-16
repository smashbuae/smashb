import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import type { RouteSeoConfig } from '../data/siteConfig';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function routeToOutputFile(routePath: string): string {
  if (routePath === '/') {
    return path.join(DIST_DIR, 'index.html');
  }
  const cleanPath = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
  return path.join(DIST_DIR, `${cleanPath}.html`);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemapXml(routes: RouteSeoConfig[], lastmod: string): string {
  const urlEntries = routes
    .map((route) => {
      const priority = route.path === '/' || route.path === '/ar' ? '1.0' : '0.9';
      const alternateLines = route.alternates
        ? [
            `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(route.alternates.en)}" />`,
            `    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(route.alternates.ar)}" />`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(route.alternates.xDefault)}" />`,
          ].join('\n')
        : '';

      return [
        '  <url>',
        `    <loc>${escapeXml(route.canonical)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        alternateLines,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

async function runPrerender() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  const templateHtml = await fs.readFile(templatePath, 'utf-8');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const entry = await vite.ssrLoadModule('/entry-server.tsx');
    const renderRoute = entry.renderRoute as (url: string) => string;
    const renderSeoHeadTags = entry.renderSeoHeadTags as (route: RouteSeoConfig) => string;
    const prerenderRoutes = entry.PRERENDER_ROUTES as RouteSeoConfig[];
    const notFoundEn = entry.NOT_FOUND_CONFIG.en as RouteSeoConfig;

    const allTargets: RouteSeoConfig[] = [...prerenderRoutes, notFoundEn];

    for (const route of allTargets) {
      const appHtml = renderRoute(route.path);
      const seoHeadHtml = renderSeoHeadTags(route);

      let html = templateHtml.replace(
        /<html[^>]*>/i,
        `<html lang="${route.lang}" dir="${route.dir}">`
      );

      html = html.replace(
        /<!--SEO_HEAD_START-->[\s\S]*?<!--SEO_HEAD_END-->/,
        `<!--SEO_HEAD_START-->\n    ${seoHeadHtml}\n    <!--SEO_HEAD_END-->`
      );

      html = html.replace('<!--APP_HTML-->', appHtml);

      const outputPath = routeToOutputFile(route.path);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html, 'utf-8');
      console.log(`Prerendered ${route.path} -> ${path.relative(process.cwd(), outputPath)}`);
    }

    const today = new Date().toISOString().split('T')[0];
    const sitemapXml = buildSitemapXml(prerenderRoutes, today);
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemapXml, 'utf-8');
    console.log(`Generated sitemap.xml -> ${path.relative(process.cwd(), sitemapPath)} (${prerenderRoutes.length} URLs)`);
  } finally {
    await vite.close();
  }
}

runPrerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
