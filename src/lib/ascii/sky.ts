import { EMPTY, makeGrid, type Grid } from './grid';
import { seeded } from './rng';

export type Star = { x: number; y: number; phase: number; speed: number; mag: number };
export type Sky = { grid: Grid; stars: Star[] };

/** Dim to bright. Stars use all four; the horizon uses the two dimmest. */
export const SKY_TONES = ['#27323e', '#4d5d6e', '#93a5b8', '#e9f0f7'] as const;

const CELLS_PER_STAR = 46;
const HORIZON = 0.82;

export function makeSky(cols: number, rows: number, seed = 11): Sky {
  const rand = seeded(seed);
  const stars = Array.from({ length: Math.floor((cols * rows) / CELLS_PER_STAR) }, () => ({
    x: rand() * cols,
    y: rand() * rows,
    phase: rand() * Math.PI * 2,
    speed: 0.4 + rand() * 1.6,
    mag: rand() ** 1.8,
  }));
  return { grid: makeGrid(cols, rows), stars };
}

export function skyFrame(sky: Sky, t: number): Grid {
  const { grid, stars } = sky;
  const { cols, rows, tone, glyph } = grid;
  tone.fill(EMPTY);

  for (const s of stars) {
    const light = s.mag * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
    const cell = Math.floor(s.y) * cols + Math.floor((s.x + t * 0.12 * (0.3 + s.mag)) % cols);
    glyph[cell] = light > 0.72 ? '*' : light > 0.5 ? '+' : '.';
    tone[cell] = light > 0.7 ? 3 : light > 0.38 ? 2 : light > 0.14 ? 1 : 0;
  }

  const top = Math.round(rows * HORIZON);
  const mid = Math.round(cols / 2);
  for (let row = top; row < rows; row++) {
    const depth = (row - top + 1) / (rows - top);
    const drift = Math.floor(t * 1.4 * (0.4 + depth));
    for (let x = 0; x < cols; x++) {
      if (((((x - mid) * 3 + row * 5 + drift) % 7) + 7) % 7 >= 4) continue;
      const cell = row * cols + x;
      glyph[cell] = depth > 0.45 ? '=' : '-';
      tone[cell] = depth > 0.6 ? 1 : 0;
    }
  }
  return grid;
}
