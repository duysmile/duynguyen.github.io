import { describe, expect, it } from 'vitest';
import { drawMode, type Env } from './motion';

const env = (over: Partial<Env> = {}): Env => ({ canvas: true, reduced: false, still: false, hidden: false, ...over });

describe('draw mode', () => {
  it('T4: reduced motion draws one still frame', () => {
    expect(drawMode(env({ reduced: true }))).toBe('still');
  });

  it('T5: a hidden tab pauses drawing', () => {
    expect(drawMode(env({ hidden: true }))).toBe('paused');
  });

  it('T6: no 2D canvas turns the layer off', () => {
    expect(drawMode(env({ canvas: false }))).toBe('off');
  });

  it('T15: no 2D canvas wins over reduced motion and a hidden tab', () => {
    expect(drawMode(env({ canvas: false, reduced: true, hidden: true }))).toBe('off');
  });

  it('T16: canvas, motion allowed, tab visible animates', () => {
    expect(drawMode(env())).toBe('animate');
  });

  it('T18: a still page draws one still frame', () => {
    expect(drawMode(env({ still: true }))).toBe('still');
  });
});
