export type PostFile = { name: string; sha: string; markdown: string };
export type PostName = { titlePart: string; date: Date; tag: string };
export type Post = {
  slug: string;
  file: string;
  title: string;
  date: Date;
  tag: string;
  lang: 'vi' | 'en';
  sha: string;
  body: string;
  readingMinutes: number;
};

export class PostNameError extends Error {
  constructor(readonly file: string) {
    super(`bad post file name: ${file} (want Title.dd_mm_yyyy.tag.md)`);
  }
}

export class SourceError extends Error {}

export interface PostSource {
  list(): Promise<PostFile[]>;
}

const VIETNAMESE = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
const WORDS_PER_MINUTE = 220;

export function parsePostName(file: string): PostName {
  const parts = file.replace(/\.md$/, '').split('.');
  if (parts.length < 3) throw new PostNameError(file);
  const tag = parts[parts.length - 1];
  const rawDate = parts[parts.length - 2];
  const titlePart = parts.slice(0, -2).join('.');
  const m = /^(\d{2})_(\d{2})_(\d{4})$/.exec(rawDate);
  if (!m || !titlePart || !tag) throw new PostNameError(file);
  const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) throw new PostNameError(file);
  return { titlePart, date, tag };
}

export function toSlug(titlePart: string): string {
  return titlePart
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function detectLang(markdown: string): 'vi' | 'en' {
  return VIETNAMESE.test(markdown) ? 'vi' : 'en';
}

export function toPost(file: PostFile): Post {
  const { titlePart, date, tag } = parsePostName(file.name);
  const h1 = /^#\s+(.+)$/m.exec(file.markdown);
  const body = h1 ? file.markdown.replace(h1[0], '').trimStart() : file.markdown;
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug: toSlug(titlePart),
    file: file.name,
    title: h1 ? h1[1].trim() : titlePart.replace(/_/g, ' '),
    date,
    tag,
    lang: detectLang(file.markdown),
    sha: file.sha,
    body,
    readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  };
}

export function assertUniqueSlugs(posts: Post[]): void {
  const seen = new Map<string, string>();
  for (const p of posts) {
    const other = seen.get(p.slug);
    if (other) throw new Error(`two posts share slug "${p.slug}": ${other} and ${p.file}`);
    seen.set(p.slug, p.file);
  }
}

export async function loadPosts(source: PostSource): Promise<Post[]> {
  const posts = (await source.list()).map(toPost);
  assertUniqueSlugs(posts);
  return posts;
}

export function redirectLines(posts: Post[]): string[] {
  return posts.map((p) => `/blog/${p.sha} /notes/${p.slug} 301`);
}
