import { writeFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import { loadPosts, redirectLines, type PostSource } from '../lib/posts';

export function redirects(opts: { source: PostSource; static: string[] }): AstroIntegration {
  return {
    name: 'netlify-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const posts = await loadPosts(opts.source);
        const lines = [...new Set([...opts.static, ...redirectLines(posts)])];
        await writeFile(new URL('_redirects', dir), lines.join('\n') + '\n');
        logger.info(`wrote ${lines.length} redirects`);
      },
    },
  };
}
