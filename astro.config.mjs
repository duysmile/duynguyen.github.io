import { defineConfig } from 'astro/config';
import { blogSource } from './src/lib/blog-source';
import { redirects } from './src/integrations/redirects';

export default defineConfig({
  site: 'https://www.duysmile.com',
  trailingSlash: 'ignore',
  integrations: [redirects({ source: blogSource, static: ['/about /cv 301'] })],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
});
