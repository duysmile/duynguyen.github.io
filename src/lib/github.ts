import { SourceError, type PostFile, type PostSource } from './posts';

type ContentEntry = { name: string; path: string; sha: string; type: string };

// Raw files on a branch URL are CDN-cached for ~5 min, so a build right after a push can get the old post.
// Resolving the branch to a commit SHA first makes every later URL immutable.
export function githubPostSource(opts: {
  owner: string;
  repo: string;
  dir: string;
  ref?: string;
  token?: string;
}): PostSource {
  const api = `https://api.github.com/repos/${opts.owner}/${opts.repo}`;
  const auth: Record<string, string> = opts.token ? { Authorization: `Bearer ${opts.token}` } : {};

  let cached: Promise<PostFile[]> | undefined;

  async function get(url: string, accept: string): Promise<Response> {
    const res = await fetch(url, { headers: { Accept: accept, ...auth } });
    if (!res.ok) throw new SourceError(`GET ${url} → ${res.status} ${res.statusText}`);
    return res;
  }

  async function load(): Promise<PostFile[]> {
    const ref = encodeURIComponent(opts.ref ?? 'HEAD');
    const commit = (await (await get(`${api}/commits/${ref}`, 'application/vnd.github.sha')).text()).trim();
    if (!/^[0-9a-f]{40}$/.test(commit)) throw new SourceError(`unexpected commit SHA for ${opts.ref}: ${commit}`);

    const listUrl = `${api}/contents/${encodeURIComponent(opts.dir)}?ref=${commit}`;
    const entries = (await (await get(listUrl, 'application/vnd.github+json')).json()) as ContentEntry[];
    const files = entries.filter((e) => e.type === 'file' && e.name.endsWith('.md'));
    const rawBase = `https://raw.githubusercontent.com/${opts.owner}/${opts.repo}/${commit}`;

    return Promise.all(
      files.map(async (e) => {
        const path = e.path.split('/').map(encodeURIComponent).join('/');
        const markdown = await (await get(`${rawBase}/${path}`, 'text/plain')).text();
        return { name: e.name, sha: e.sha, markdown };
      }),
    );
  }

  return {
    list: () => (cached ??= load()),
  };
}
