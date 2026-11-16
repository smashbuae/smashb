import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { PRERENDER_ROUTES, NOT_FOUND_CONFIG } from './data/siteConfig';
import { renderSeoHeadTags } from './components/SeoHead';

export { PRERENDER_ROUTES, NOT_FOUND_CONFIG, renderSeoHeadTags };

export function renderRoute(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}
