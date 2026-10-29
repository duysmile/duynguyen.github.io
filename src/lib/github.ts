import { SourceError, type PostFile, type PostSource } from './posts';

type ContentEntry = { name: string; sha: string; type: string; download_url: string | null };

export function githubPostSource(opts: {
  owner: string;
  repo: string;
  dir: string;
  ref?: string;
  token?: string;
}): PostSource {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  const listUrl =
    `https://api.github.com/repos/${opts.owner}/${opts.repo}/contents/${encodeURIComponent(opts.dir)}` +
    (opts.ref ? `?ref=${encodeURIComponent(opts.ref)}` : '');

  let cached: Promise<PostFile[]> | undefined;

  async function get(url: string, as: 'json' | 'text') {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new SourceError(`GET ${url} → ${res.status} ${res.statusText}`);
    return as === 'json' ? res.json() : res.text();
  }

  async function load(): Promise<PostFile[]> {
    const entries = (await get(listUrl, 'json')) as ContentEntry[];
    const files = entries.filter(
      (e): e is ContentEntry & { download_url: string } =>
        e.type === 'file' && e.name.endsWith('.md') && typeof e.download_url === 'string',
    );
    return Promise.all(
      files.map(async (e) => ({ name: e.name, sha: e.sha, markdown: String(await get(e.download_url, 'text')) })),
    );
  }

  return {
    list: () => (cached ??= load()),
  };
}
