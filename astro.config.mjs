import { defineConfig } from 'astro/config';
import { blogSource } from './src/lib/blog-source';
import { redirects } from './src/integrations/redirects';

export default defineConfig({
  site: 'https://www.duysmile.com',
  // cv.html, not cv/index.html: Netlify then serves /cv without a trailing-slash redirect.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [redirects({ source: blogSource, static: ['/about /cv 301'] })],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
});
