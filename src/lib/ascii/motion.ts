export type Env = { canvas: boolean; reduced: boolean; still: boolean; hidden: boolean };
export type Mode = 'off' | 'still' | 'paused' | 'animate';

export function drawMode(env: Env): Mode {
  throw new Error('not implemented');
}
