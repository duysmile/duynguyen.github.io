import type { LogLine } from '../../data/types';
import { glyphBits } from './font';
import { EMPTY, makeGrid, type Grid } from './grid';
import { seeded, type Rand } from './rng';

export type ScreenLine = { text: string; ok: boolean };
export type Macbook = Grid & {
  /** Rows the lid takes when open; the base starts below. */
  lid: number;
  /** Screen line a cell belongs to; -1 for the body; `lines` for the cursor. */
  line: Int8Array;
  lines: number;
  screen: { left: number; right: number; top: number; bottom: number };
};
export type Frame = { lidRows: number; litLines: number; cursorOn: boolean };

/** Body dark, mid, bright; then text dim, plain, ok; then the three window buttons. */
export const MAC_TONES = ['#4c5d70', '#7d8ea0', '#c9d4cc', '#8593a0', '#c9d4cc', '#9cc7a4', '#d9564b', '#c99a2e', '#3f9a55'] as const;
const DIM = 3;
const TEXT = 4;
const OK = 5;
const BUTTONS = [6, 7, 8];

const COLS = 244;
const ROWS = 121;
const LID = 116;
const LEFT = 6;
const WIDTH = 232;
const BEZEL_X = 5;
const BEZEL_Y = 4;
const CHIN = 5;
const TEXT_X = LEFT + 11;
const TEXT_Y = 18;
const LINE_STEP = 9;
const CHAR_STEP = 4;
const MAX_LINES = 10;
/** The last line also holds the cursor, one character after a gap. */
const MAX_CHARS = 50;

const BODY = 'abcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/=+*&%$#@!?;:';
const INK = '#@%&$8XWMB0KR';
const COMMAND = '$ TAIL -F /VAR/LOG/BEAN.LOG';

/** What the screen shows: the command, then the tail of the log, in capitals (the 3x5 font has no lower case). */
export function screenLines(log: LogLine[]): ScreenLine[] {
  const tail = log.slice(-(MAX_LINES - 1));
  return [
    { text: COMMAND, ok: false },
    ...tail.map((entry) => ({ text: `${entry.when.toUpperCase().padEnd(4)} ${entry.msg.toUpperCase()}`, ok: entry.level === 'OK' })),
  ];
}

export function buildMacbook(log: LogLine[], seed = 20261115): Macbook {
  const lines = screenLines(log);
  const long = lines.find((l) => l.text.length > MAX_CHARS);
  if (long) throw new RangeError(`Log line does not fit the laptop screen (${long.text.length} > ${MAX_CHARS} characters): ${long.text}`);

  const rand = seeded(seed);
  const grid = makeGrid(COLS, ROWS);
  const line = new Int8Array(COLS * ROWS).fill(-1);
  const put = (x: number, y: number, tone: number, pool: string) => {
    const cell = y * COLS + x;
    grid.tone[cell] = tone;
    grid.glyph[cell] = pool[Math.floor(rand() * pool.length)];
    return cell;
  };
  // Lit from the top left, so the body reads as a solid, not as noise.
  const body = (x: number, y: number, w: number, h: number, lift = 0) => {
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        const light = 0.55 * rand() + 0.45 * (1 - xx / COLS) + lift;
        put(xx, yy, light > 0.78 ? 2 : light > 0.5 ? 1 : 0, BODY);
      }
    }
  };
  const erase = (x: number, y: number) => {
    grid.tone[y * COLS + x] = EMPTY;
  };
  const mid = COLS / 2;

  body(LEFT, 0, WIDTH, BEZEL_Y, 0.1);
  body(LEFT, BEZEL_Y, BEZEL_X, LID - BEZEL_Y - CHIN);
  body(LEFT + WIDTH - BEZEL_X, BEZEL_Y, BEZEL_X, LID - BEZEL_Y - CHIN);
  body(LEFT, LID - CHIN, WIDTH, CHIN);
  for (const [x, y] of [[0, 0], [1, 0], [0, 1]]) {
    erase(LEFT + x, y);
    erase(LEFT + WIDTH - 1 - x, y);
  }
  body(mid - 16, BEZEL_Y, 32, 5, -0.2);
  put(mid - 1, 1, DIM, 'o');
  put(mid, 1, DIM, 'o');

  BUTTONS.forEach((tone, k) => {
    for (let d = 0; d < 4; d++) put(LEFT + 11 + k * 5 + (d % 2), 8 + Math.floor(d / 2), tone, INK);
  });
  for (let x = LEFT + BEZEL_X; x < LEFT + WIDTH - BEZEL_X; x++) put(x, 14, 0, '-');

  const write = (char: string, column: number, row: number, tone: number) => {
    const bits = char === ' ' ? undefined : glyphBits(char);
    if (!bits) return;
    for (let k = 0; k < bits.length; k++) {
      if (bits[k] === '1') line[put(TEXT_X + column * CHAR_STEP + (k % 3), TEXT_Y + row * LINE_STEP + Math.floor(k / 3), tone, INK)] = row;
    }
  };
  lines.forEach(({ text, ok }, row) => {
    [...text].forEach((char, column) => write(char, column, row, row === 0 || column < 4 ? DIM : ok ? OK : TEXT));
  });
  const last = lines.length - 1;
  for (let k = 0; k < 15; k++) {
    line[put(TEXT_X + (lines[last].text.length + 1) * CHAR_STEP + (k % 3), TEXT_Y + last * LINE_STEP + Math.floor(k / 3), TEXT, INK)] = lines.length;
  }

  body(0, LID, COLS, 3, 0.1);
  body(2, LID + 3, COLS - 4, 1, -0.2);
  body(6, LID + 4, COLS - 12, 1, -0.4);
  for (let x = mid - 19; x < mid + 19; x++) erase(x, LID);

  return {
    ...grid,
    lid: LID,
    line,
    lines: lines.length,
    screen: { left: LEFT + BEZEL_X, right: LEFT + WIDTH - BEZEL_X - 1, top: BEZEL_Y, bottom: LID - CHIN - 1 },
  };
}

const OPEN_AT = 0.35;
const OPEN_FOR = 1.3;
const LINES_AT = OPEN_AT + OPEN_FOR + 0.15;
const LINE_EVERY = 0.16;
const BLINK = 0.55;
const SHUT_ROWS = 2;

/** A time after the intro with the cursor on: the frame for people who prefer no motion. */
export const SETTLED = BLINK * 1200;

export function introEnd(lines: number): number {
  return LINES_AT + LINE_EVERY * lines;
}

/** The lid opens from flat on the base, then the log tails in one line at a time. */
export function frameAt(t: number, lid: number, lines: number): Frame {
  const open = Math.min(1, Math.max(0, (t - OPEN_AT) / OPEN_FOR));
  const litLines = Math.min(lines, Math.max(0, Math.floor((t - LINES_AT) / LINE_EVERY) + 1));
  return {
    lidRows: Math.max(SHUT_ROWS, Math.round((1 - (1 - open) ** 3) * lid)),
    litLines,
    cursorOn: litLines === lines && Math.floor(t / BLINK) % 2 === 0,
  };
}

/** Grid row drawn at canvas row `y` while the lid shows `lidRows` rows. The hinge row stays put. */
export function sourceRow(y: number, lid: number, lidRows: number): number {
  return y >= lid ? y : lid - 1 - Math.floor(((lid - 1 - y) * lid) / lidRows);
}

export function isShown(mac: Macbook, frame: Frame, cell: number): boolean {
  const line = mac.line[cell];
  return line < 0 || line < frame.litLines || (line === mac.lines && frame.cursorOn);
}

/** Swaps the character of `count` random cells, so the drawing shimmers without changing shape. */
export function shimmer(mac: Macbook, rand: Rand, count: number): void {
  for (let n = 0; n < count; n++) {
    const cell = Math.floor(rand() * mac.tone.length);
    const isInk = mac.line[cell] >= 0;
    if (!isInk && (mac.tone[cell] < 0 || mac.tone[cell] > 2 || mac.glyph[cell] === '-')) continue;
    const pool = isInk ? INK : BODY;
    mac.glyph[cell] = pool[Math.floor(rand() * pool.length)];
  }
}
