---
tags: [tests, duynguyen-github-io]
change: "[[proposal]]"
repo: /Users/dean/di/pets/duynguyen.github.io
base: master
untested: R4 is one CSS print rule; checked with print emulation in the browser.
---
# Tests: ASCII background

## TL;DR
- 18 tests: 7 happy, 6 edge, 5 error.
- Time is an argument (`t`), randomness comes from a fixed seed. No real clock, no canvas.

## Plan
| ID | Slice | Covers | Kind | Level | Flow |
|---|---|---|---|---|---|
| T1 | 1 | R1 | happy | unit | make sky 120x40 → frame at t=0 → ✓ cells are set, each is printable ASCII |
| T2 | 1 | R1 | edge | unit | make sky twice with one seed → frame at t=3 → ✓ both frames are equal |
| T3 | 1 | R1 | happy | unit | make sky → frames at t=0 and t=5 → ✓ the frames differ |
| T4 | 1 | R2 | happy | unit | env reduced motion → ✓ mode is still |
| T5 | 1 | R3 | happy | unit | env tab hidden → ✓ mode is paused |
| T6 | 1 | R5 | error | unit | env without a 2D canvas → ✓ mode is off |
| T7 | 1 | R1 | error | unit | make sky 0x0 → frame → ✓ empty grid, no throw |
| T15 | 1 | R2, R3 | error | unit | env reduced motion and hidden tab, without a 2D canvas → ✓ mode is off |
| T16 | 1 | R1, R5 | happy | unit | env with canvas, motion allowed, tab visible → ✓ mode is animate |
| T18 | 1 | R2 | edge | unit | env still page → ✓ mode is still |
| T8 | 2 | R6 | happy | unit | build MacBook from profile log → ✓ each log line has cells in its own row band, inside the screen |
| T9 | 2 | R6 | edge | unit | each character of the profile log → ✓ has a 3x5 glyph |
| T10 | 2 | R6 | error | unit | build MacBook with a 60-character line → ✓ RangeError names the line |
| T11 | 2 | R6 | edge | unit | frame at t=0, then at the end → ✓ lid is 2 rows with no line, then full lid with each line |
| T12 | 2 | R6 | edge | unit | frames from t=0 to t=4 in 50 ms steps → ✓ lid rows and lit lines never go down |
| T13 | 2 | R6 | edge | unit | source row for each drawn lid row while half open → ✓ in range, in order, last row is the lid bottom |
| T14 | 2 | R7 | happy | unit | screen lines from profile log → ✓ one line per log entry, in order, with the message text |
| T17 | 2 | R7 | error | unit | screen lines from an empty log → ✓ only the command line, no throw |
