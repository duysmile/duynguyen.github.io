import { afterEach, describe, expect, it, vi } from 'vitest';
import { githubPostSource } from './github';
import { SourceError } from './posts';

const COMMIT = 'c0ffee1234567890c0ffee1234567890c0ffee12';
const NAME = 'Write_file_trong_Go.05_07_2022.golang.md';

function stubGitHub(overrides: Record<string, Response> = {}) {
  const calls: string[] = [];
  vi.stubGlobal('fetch', async (url: string) => {
    calls.push(url);
    if (overrides[url]) return overrides[url];
    if (url.endsWith('/commits/master')) return new Response(COMMIT);
    if (url.includes('/contents/blogs?ref=')) {
      return Response.json([
        { name: NAME, path: `blogs/${NAME}`, sha: 'blobsha1', type: 'file', download_url: `https://raw.githubusercontent.com/duysmile/blogs-github/master/blogs/${NAME}` },
        { name: 'img', path: 'blogs/img', sha: 'treesha', type: 'dir', download_url: null },
      ]);
    }
    if (url.startsWith('https://raw.githubusercontent.com/')) return new Response('# Title\nbody');
    return new Response('not found', { status: 404 });
  });
  return calls;
}

const source = () => githubPostSource({ owner: 'duysmile', repo: 'blogs-github', dir: 'blogs', ref: 'master' });

afterEach(() => vi.unstubAllGlobals());

describe('githubPostSource', () => {
  it('lists and downloads posts at one resolved commit, never the moving branch', async () => {
    const calls = stubGitHub();
    const files = await source().list();

    expect(files).toEqual([{ name: NAME, sha: 'blobsha1', markdown: '# Title\nbody' }]);
    expect(calls).toEqual([
      'https://api.github.com/repos/duysmile/blogs-github/commits/master',
      `https://api.github.com/repos/duysmile/blogs-github/contents/blogs?ref=${COMMIT}`,
      `https://raw.githubusercontent.com/duysmile/blogs-github/${COMMIT}/blogs/${NAME}`,
    ]);
  });

  it('fails the build when GitHub refuses a request', async () => {
    stubGitHub({
      'https://api.github.com/repos/duysmile/blogs-github/commits/master': new Response('rate limited', { status: 403 }),
    });
    await expect(source().list()).rejects.toThrow(SourceError);
  });
});
