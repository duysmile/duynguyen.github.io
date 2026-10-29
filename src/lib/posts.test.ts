import { describe, expect, it } from 'vitest';
import {
  PostNameError,
  SourceError,
  assertUniqueSlugs,
  detectLang,
  loadPosts,
  parsePostName,
  redirectLines,
  toPost,
  toSlug,
  type PostFile,
  type PostSource,
} from './posts';

describe('parsePostName', () => {
  it('splits title, date and tag', () => {
    const n = parsePostName('Write_file_trong_Go.05_07_2022.golang.md');
    expect(n.titlePart).toBe('Write_file_trong_Go');
    expect(n.date.toISOString().slice(0, 10)).toBe('2022-07-05');
    expect(n.tag).toBe('golang');
  });

  it('rejects a name without date and tag', () => {
    expect(() => parsePostName('draft.md')).toThrow(PostNameError);
  });

  it('rejects an impossible date', () => {
    expect(() => parsePostName('A.31_02_2022.go.md')).toThrow(PostNameError);
  });
});

describe('toSlug', () => {
  it('lowercases and dashes', () => {
    expect(toSlug('Write_file_trong_Go')).toBe('write-file-trong-go');
  });

  it('strips Vietnamese marks', () => {
    expect(toSlug('Thiết_kế_payment_cho_hệ_thống_call')).toBe('thiet-ke-payment-cho-he-thong-call');
    expect(toSlug('Đọc_file')).toBe('doc-file');
  });

  it('drops punctuation', () => {
    expect(toSlug('Hệ_điều_hành(OS)_hoạt_động?')).toBe('he-dieu-hanh-os-hoat-dong');
  });
});

describe('detectLang', () => {
  it('finds Vietnamese', () => {
    expect(detectLang('Lí do bài viết này ra đời')).toBe('vi');
  });

  it('defaults to English', () => {
    expect(detectLang('How do I design a payment system?')).toBe('en');
  });
});

describe('toPost', () => {
  const file = {
    name: 'Write_file_trong_Go.05_07_2022.golang.md',
    sha: 'abc123',
    markdown: '# Read/Write file in Golang\n\nLí do bài viết này ra đời.\n',
  };

  it('takes the title from the H1 and removes it from the body', () => {
    const p = toPost(file);
    expect(p.title).toBe('Read/Write file in Golang');
    expect(p.body).not.toContain('# Read/Write');
    expect(p.slug).toBe('write-file-trong-go');
    expect(p.lang).toBe('vi');
    expect(p.readingMinutes).toBe(1);
  });

  it('falls back to the file name when there is no H1', () => {
    expect(toPost({ ...file, markdown: 'no heading' }).title).toBe('Write file trong Go');
  });
});

describe('assertUniqueSlugs', () => {
  it('names both files on a clash', () => {
    const a = toPost({ name: 'A_b.01_01_2022.x.md', sha: '1', markdown: '' });
    const b = toPost({ name: 'Á_b.02_01_2022.x.md', sha: '2', markdown: '' });
    expect(() => assertUniqueSlugs([a, b])).toThrow(/A_b.*Á_b|Á_b.*A_b/);
  });
});

describe('loadPosts', () => {
  const source = (files: PostFile[] | Error): PostSource => ({
    list: async () => {
      if (files instanceof Error) throw files;
      return files;
    },
  });

  it('returns parsed posts', async () => {
    const posts = await loadPosts(source([{ name: 'A.01_01_2022.go.md', sha: '1', markdown: '# A' }]));
    expect(posts.map((p) => p.slug)).toEqual(['a']);
  });

  it('fails when the source fails', async () => {
    await expect(loadPosts(source(new SourceError('GET … → 401')))).rejects.toThrow(SourceError);
  });

  it('fails on a bad file name', async () => {
    await expect(loadPosts(source([{ name: 'notes.md', sha: '1', markdown: '' }]))).rejects.toThrow(PostNameError);
  });

  it('fails on a duplicate slug', async () => {
    const files = [
      { name: 'A_b.01_01_2022.x.md', sha: '1', markdown: '' },
      { name: 'Á_b.02_01_2022.x.md', sha: '2', markdown: '' },
    ];
    await expect(loadPosts(source(files))).rejects.toThrow(/share slug/);
  });
});

describe('redirectLines', () => {
  it('maps old sha URLs to slugs', () => {
    const p = toPost({ name: 'Write_file_trong_Go.05_07_2022.golang.md', sha: 'abc123', markdown: '' });
    expect(redirectLines([p])).toEqual(['/blog/abc123 /notes/write-file-trong-go 301']);
  });
});
