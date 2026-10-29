import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { blogSource } from './lib/blog-source';
import { loadPosts } from './lib/posts';

const blog = defineCollection({
  loader: {
    name: 'blogs-github',
    load: async ({ store, parseData, renderMarkdown, generateDigest, logger }) => {
      const posts = await loadPosts(blogSource);
      store.clear();
      for (const p of posts) {
        const data = await parseData({
          id: p.slug,
          data: { title: p.title, date: p.date, tag: p.tag, lang: p.lang, sha: p.sha, readingMinutes: p.readingMinutes },
        });
        store.set({ id: p.slug, data, body: p.body, rendered: await renderMarkdown(p.body), digest: generateDigest(p.body) });
      }
      logger.info(`loaded ${posts.length} posts from blogs-github`);
    },
  },
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    lang: z.enum(['vi', 'en']),
    sha: z.string(),
    readingMinutes: z.number().int().positive(),
  }),
});

export const collections = { blog };
