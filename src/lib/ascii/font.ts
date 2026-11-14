/** Characters with no 3x5 glyph, each once. Space needs none. */
export function unsupported(text: string): string[] {
  throw new Error('not implemented');
}

/** Fifteen '0'/'1' cells, three per row, top row first. */
export function glyphBits(char: string): string | undefined {
  throw new Error('not implemented');
}
