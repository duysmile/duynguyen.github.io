import { defineConfig } from 'astro/config';
import { blogSource } from './src/lib/blog-source';
import { redirects } from './src/integrations/redirects';

export default defineConfig({
  site: 'https://www.duysmile.com',
  // cv.html, not cv/index.html: Netlify then serves /cv without a trailing-slash redirect.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    redirects({
      source: blogSource,
      static: [
        '/about /cv 301',
        // Links from the 2019 site use the post's blob SHA at the time; editing a post changes its SHA.
        '/blog/7364aad2ad9202a24ac4b2d2d747ad832a99dec3 /notes/write-file-trong-go 301',
        '/blog/94bc1f4be3c718286c3898dc364a278d0d1cd120 /notes/thiet-ke-payment-cho-he-thong-call 301',
      ],
      // After the per-post SHA lines: Netlify uses the first match.
      tail: ['/blog /notes 301', '/blog/* /notes/:splat 301'],
    }),
  ],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
});
