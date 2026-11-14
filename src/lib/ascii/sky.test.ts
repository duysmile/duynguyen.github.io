import { describe, expect, it } from 'vitest';
import { EMPTY } from './grid';
import { makeSky, skyFrame } from './sky';

const cells = (cols: number, rows: number, t: number, seed = 11) => {
  const grid = skyFrame(makeSky(cols, rows, seed), t);
  return { tone: Array.from(grid.tone), glyph: grid.glyph.filter((_, i) => grid.tone[i] !== EMPTY) };
};

describe('night sky', () => {
  it('T1: a frame sets cells, each printable ASCII', () => {
    const { tone, glyph } = cells(120, 40, 0);
    expect(tone).toHaveLength(120 * 40);
    expect(glyph.length).toBeGreaterThan(50);
    for (const c of glyph) expect(c).toMatch(/^[\x21-\x7e]$/);
  });

  it('T2: one seed gives one sky', () => {
    expect(cells(120, 40, 3)).toEqual(cells(120, 40, 3));
  });

  it('T3: the sky moves with time', () => {
    expect(cells(120, 40, 0)).not.toEqual(cells(120, 40, 5));
  });

  it('T7: a zero-size viewport gives an empty grid', () => {
    const grid = skyFrame(makeSky(0, 0), 1);
    expect(grid.tone).toHaveLength(0);
  });
});
