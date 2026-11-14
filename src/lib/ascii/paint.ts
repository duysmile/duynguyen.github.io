import { rowText, type Grid } from './grid';

/** Sets the font; returns how far one character advances, in px. */
export function setFont(ctx: CanvasRenderingContext2D, family: string, size: number): number {
  ctx.font = `${size}px ${family}`;
  ctx.textBaseline = 'top';
  return ctx.measureText('M').width;
}

/** Sets the font so one character advances exactly `cellWidth`; returns the font size in px. */
export function fitFont(ctx: CanvasRenderingContext2D, family: string, cellWidth: number): number {
  const size = (cellWidth / setFont(ctx, family, 100)) * 100;
  setFont(ctx, family, size);
  return size;
}

export type RowPlan = {
  /** First canvas row to draw. */
  from?: number;
  /** Grid row to draw at a canvas row; default is the same row. */
  source?: (row: number) => number;
  shown?: (cell: number) => boolean;
};

/** One fillText per row and tone: about 200 calls for a full viewport, where one per cell is 8,000. */
export function paintGrid(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  palette: readonly string[],
  rowHeight: number,
  { from = 0, source, shown }: RowPlan = {},
): void {
  palette.forEach((color, tone) => {
    ctx.fillStyle = color;
    for (let row = from; row < grid.rows; row++) {
      const text = rowText(grid, source ? source(row) : row, tone, shown);
      if (text) ctx.fillText(text, 0, row * rowHeight);
    }
  });
}
