export type Env = { canvas: boolean; reduced: boolean; still: boolean; hidden: boolean };
export type Mode = 'off' | 'still' | 'paused' | 'animate';

export function drawMode(env: Env): Mode {
  if (!env.canvas) return 'off';
  if (env.reduced || env.still) return 'still';
  return env.hidden ? 'paused' : 'animate';
}
