import type { Grid } from './grid';

export type Star = { x: number; y: number; phase: number; speed: number; mag: number };
export type Sky = { grid: Grid; stars: Star[] };

export function makeSky(cols: number, rows: number, seed = 11): Sky {
  throw new Error('not implemented');
}

export function skyFrame(sky: Sky, t: number): Grid {
  throw new Error('not implemented');
}
