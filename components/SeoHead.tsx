import React, { useEffect } from 'react';
import {
  buildJsonLdGraph,
  getRouteSeoByPath,
  RouteSeoConfig,
} from '../data/siteConfig';

const ARABIC_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Lalezar&display=swap';

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderSeoHeadTags(route: RouteSeoConfig): string {
  const jsonLd = buildJsonLdGraph(route);
  const lines: string[] = [
    `<title>${escapeHtmlAttr(route.title)}</title>`,
    `<meta name="description" content="${escapeHtmlAttr(route.description)}" />`,
    `<meta name="robots" content="${escapeHtmlAttr(route.robots)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(route.canonical)}" />`,
  ];

  if (route.alternates) {
    lines.push(
      `<link rel="alternate" hreflang="en" href="${escapeHtmlAttr(route.alternates.en)}" />`,
      `<link rel="alternate" hreflang="ar" href="${escapeHtmlAttr(route.alternates.ar)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(route.alternates.xDefault)}" />`
    );
  }

  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(route.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(route.description)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(route.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtmlAttr(route.ogImageAlt)}" />`,
    `<meta property="og:site_name" content="Smash B" />`,
    `<meta property="og:locale" content="${escapeHtmlAttr(route.ogLocale)}" />`,
    `<meta property="og:locale:alternate" content="${escapeHtmlAttr(route.ogLocaleAlternate)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(route.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtmlAttr(route.ogImageAlt)}" />`
  );

  if (route.lang === 'ar') {
    lines.push(`<link rel="stylesheet" href="${ARABIC_FONTS_HREF}" data-smash-ar-fonts="true" />`);
  }

  if (jsonLd) {
    const serialized = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json" data-smash-jsonld="true">${serialized}</script>`);
  }

  return lines.join('\n    ');
}

function upsertMeta(attrName: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extraAttrs: Record<string, string> = {}) {
  const selectorParts = [`link[rel="${rel}"]`];
  Object.entries(extraAttrs).forEach(([k, v]) => {
    selectorParts.push(`[${k}="${v}"]`);
  });
  let el = document.head.querySelector<HTMLLinkElement>(selectorParts.join(''));
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SeoHead: React.FC<{ pathname: string }> = ({ pathname }) => {
  const route = getRouteSeoByPath(pathname);

  useEffect(() => {
    document.title = route.title;
    document.documentElement.setAttribute('lang', route.lang);
    document.documentElement.setAttribute('dir', route.dir);

    upsertMeta('name', 'description', route.description);
    upsertMeta('name', 'robots', route.robots);
    upsertLink('canonical', route.canonical);

    // Sync reciprocal hreflang links
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((node) => node.remove());

    if (route.alternates) {
      const pairs: Array<[string, string]> = [
        ['en', route.alternates.en],
        ['ar', route.alternates.ar],
        ['x-default', route.alternates.xDefault],
      ];
      pairs.forEach(([hreflang, href]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });
    }

    // OpenGraph & Twitter cards
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', route.canonical);
    upsertMeta('property', 'og:title', route.title);
    upsertMeta('property', 'og:description', route.description);
    upsertMeta('property', 'og:image', route.ogImage);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', route.ogImageAlt);
    upsertMeta('property', 'og:site_name', 'Smash B');
    upsertMeta('property', 'og:locale', route.ogLocale);
    upsertMeta('property', 'og:locale:alternate', route.ogLocaleAlternate);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', route.title);
    upsertMeta('name', 'twitter:description', route.description);
    upsertMeta('name', 'twitter:image', route.ogImage);
    upsertMeta('name', 'twitter:image:alt', route.ogImageAlt);

    // Load Cairo/Lalezar Google Fonts stylesheet only when viewing Arabic routes
    const existingFonts = document.head.querySelector('link[data-smash-ar-fonts="true"]');
    if (route.lang === 'ar' && !existingFonts) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = ARABIC_FONTS_HREF;
      link.setAttribute('data-smash-ar-fonts', 'true');
      document.head.appendChild(link);
    }

    // Sync JSON-LD structured data
    document.head
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((node) => node.remove());

    const jsonLd = buildJsonLdGraph(route);
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-smash-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [route]);

  return null;
};

export default SeoHead;
