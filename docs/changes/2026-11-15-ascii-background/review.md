---
tags: [review, duynguyen-github-io]
change: "[[proposal]]"
status: ready
---
# Review: ASCII background

## TL;DR
| | |
|---|---|
| Built | Night sky in characters on each page; MacBook built from characters whose lid opens and tails the log. |
| Verify | `npx vitest run && npx astro check && npx astro build` → 36 passed, 0 errors, 7 pages |
| Changed | 17 files in `src`, +739 −115 |
| Look at | The opening motion on a real screen, and footer text over the horizon lines. |

## Plan vs built
| Slice | Status | Walkthrough | Differs from design |
|---|---|---|---|
| 1 Night sky layer, dark tokens | ✅ | [[walkthrough/slice-1]] | none |
| 2 MacBook from characters, lid opens | ✅ | [[walkthrough/slice-2]] | more log lines than fit show the tail; they do not throw |

## Decided alone
| Door | Decision | Why |
|---|---|---|
| 2W | Show the last 9 log entries when the log grows | `tail` shows the end; one more entry must not stop the build. |
| 2W | Print restores the day palette | The CV prints on white paper. |
| 2W | Canvas keeps a fixed aspect ratio before the script runs | No layout shift when the laptop draws. |
| 2W | `Laptop.astro` builds the model at build time | A line over 50 characters stops the build, not a visitor. |
| 2W | Sky is 100lvh tall | A phone URL bar does not rebuild the sky. |
| 2W | Level column (INFO/OK) dropped on the canvas; OK lines are green | A 3x5 letter needs the width. |

## Hard stops
| When | Asked | Answer |
|---|---|---|
| none | | |

## Not done
- Lighthouse not run; the outcome "performance 95 or more" is not checked.
- Motion checked from still frames (shut, open, lines in), not as a moving sequence: the browser pane ran in the background.
- Print checked in the built CSS, not in a print preview.
- `tests lock` and `tests check` do not run on a non-Go repo; tests were locked by hand in two `test:` commits.
- Not pushed. No PR.
