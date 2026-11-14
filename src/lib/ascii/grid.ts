export const EMPTY = -1;

export type Grid = { cols: number; rows: number; tone: Int8Array; glyph: string[] };

export function makeGrid(cols: number, rows: number): Grid {
  throw new Error('not implemented');
}

export function rowText(grid: Grid, row: number, tone: number, shown?: (cell: number) => boolean): string {
  throw new Error('not implemented');
}
