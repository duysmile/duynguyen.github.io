import type { LogLine } from '../../data/types';
import type { Grid } from './grid';

export type ScreenLine = { text: string; ok: boolean };
export type Macbook = Grid & {
  /** Rows the lid takes when open; the base starts below. */
  lid: number;
  /** Screen line a cell belongs to; -1 for the body. */
  line: Int8Array;
  cursor: number[];
  lines: number;
  screen: { left: number; right: number; top: number; bottom: number };
};
export type Frame = { lidRows: number; litLines: number; cursorOn: boolean };

export function screenLines(log: LogLine[]): ScreenLine[] {
  throw new Error('not implemented');
}

export function buildMacbook(log: LogLine[], seed = 20261115): Macbook {
  throw new Error('not implemented');
}

export function frameAt(t: number, lid: number, lines: number): Frame {
  throw new Error('not implemented');
}

/** Grid row drawn at canvas row `y` while the lid shows `lidRows` rows. */
export function sourceRow(y: number, lid: number, lidRows: number): number {
  throw new Error('not implemented');
}
