import { describe, expect, it } from 'vitest';
import { profile } from '../../data/profile';
import { unsupported } from './font';
import { buildMacbook, frameAt, screenLines, sourceRow } from './macbook';

describe('MacBook built from characters', () => {
  it('T8: each log line has cells in its own row band, inside the screen', () => {
    const mac = buildMacbook(profile.log);
    const bands = Array.from({ length: mac.lines }, () => ({ top: Infinity, bottom: -Infinity, cells: 0 }));
    mac.line.forEach((line, cell) => {
      if (line < 0 || line >= mac.lines) return;
      const row = Math.floor(cell / mac.cols);
      const col = cell % mac.cols;
      expect(col).toBeGreaterThanOrEqual(mac.screen.left);
      expect(col).toBeLessThanOrEqual(mac.screen.right);
      expect(row).toBeGreaterThanOrEqual(mac.screen.top);
      expect(row).toBeLessThanOrEqual(mac.screen.bottom);
      const band = bands[line];
      band.top = Math.min(band.top, row);
      band.bottom = Math.max(band.bottom, row);
      band.cells++;
    });
    expect(mac.lines).toBe(profile.log.length + 1);
    bands.forEach((band, i) => {
      expect(band.cells).toBeGreaterThan(0);
      expect(band.bottom - band.top).toBeLessThan(5);
      if (i > 0) expect(band.top).toBeGreaterThan(bands[i - 1].bottom);
    });
  });

  it('T9: each character of the profile log has a glyph', () => {
    expect(unsupported(screenLines(profile.log).map((l) => l.text).join(''))).toEqual([]);
  });

  it('T10: a line too long for the screen is a RangeError that names the line', () => {
    const long = [{ when: '2030', level: 'INFO' as const, msg: 'x'.repeat(60) }];
    expect(() => buildMacbook(long)).toThrow(RangeError);
    expect(() => buildMacbook(long)).toThrow(/2030/);
  });

  it('T11: the lid starts shut with no line and ends open with each line', () => {
    const { lid, lines } = buildMacbook(profile.log);
    expect(frameAt(0, lid, lines)).toEqual({ lidRows: 2, litLines: 0, cursorOn: false });
    const end = frameAt(60, lid, lines);
    expect(end.lidRows).toBe(lid);
    expect(end.litLines).toBe(lines);
  });

  it('T12: the lid and the lines never go back', () => {
    let last = frameAt(0, 116, 10);
    for (let t = 0.05; t <= 4; t += 0.05) {
      const now = frameAt(t, 116, 10);
      expect(now.lidRows).toBeGreaterThanOrEqual(last.lidRows);
      expect(now.litLines).toBeGreaterThanOrEqual(last.litLines);
      last = now;
    }
  });

  it('T13: a half-open lid samples rows in range, in order, down to the lid bottom', () => {
    const lid = 116;
    const lidRows = 58;
    const rows = Array.from({ length: lidRows }, (_, i) => sourceRow(lid - lidRows + i, lid, lidRows));
    rows.forEach((row, i) => {
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThan(lid);
      if (i > 0) expect(row).toBeGreaterThan(rows[i - 1]);
    });
    expect(rows.at(-1)).toBe(lid - 1);
    expect(sourceRow(lid + 2, lid, lidRows)).toBe(lid + 2);
  });

  it('T14: the screen shows one line per log entry, in order, with its message', () => {
    const lines = screenLines(profile.log);
    expect(lines).toHaveLength(profile.log.length + 1);
    profile.log.forEach((entry, i) => {
      expect(lines[i + 1].text).toContain(entry.msg.toUpperCase());
      expect(lines[i + 1].ok).toBe(entry.level === 'OK');
    });
  });

  it('T17: an empty log shows only the command line', () => {
    expect(screenLines([])).toHaveLength(1);
    expect(buildMacbook([]).lines).toBe(1);
  });
});
