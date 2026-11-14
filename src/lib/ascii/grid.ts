export const EMPTY = -1;

/** A drawing as cells: `tone` indexes a palette (EMPTY = nothing), `glyph` is the character. */
export type Grid = { cols: number; rows: number; tone: Int8Array; glyph: string[] };

export function makeGrid(cols: number, rows: number): Grid {
  return { cols, rows, tone: new Int8Array(cols * rows).fill(EMPTY), glyph: new Array<string>(cols * rows).fill(' ') };
}

/** The cells of one tone in one row as a string, other cells as spaces; '' when the row has none. */
export function rowText(grid: Grid, row: number, tone: number, shown?: (cell: number) => boolean): string {
  let text = '';
  let end = 0;
  for (let x = 0, cell = row * grid.cols; x < grid.cols; x++, cell++) {
    if (grid.tone[cell] === tone && (!shown || shown(cell))) {
      text += grid.glyph[cell];
      end = text.length;
    } else text += ' ';
  }
  return text.slice(0, end);
}
