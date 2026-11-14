---
tags: [spec, duynguyen-github-io]
---
# ASCII layer

What the site draws in characters, as of 2026-11-15. Source: [[changes/2026-11-15-ascii-background/proposal]]

| ID | Behavior |
|---|---|
| R1 | Each page shows a night sky drawn in characters behind the content: stars twinkle and drift, horizon lines drift. |
| R2 | With reduced motion, and on note articles and the CV, the sky is one still frame. |
| R3 | A hidden tab draws nothing. |
| R4 | Print hides the sky and uses the day palette. |
| R5 | Without a 2D canvas or without script, the page shows the plain wall color. |
| R6 | Home shows the career log on a MacBook built from characters; the lid opens, then the log tails in. Below 640px, and without canvas, the log shows in a text terminal frame. |
| R7 | Screen readers get the career log as a list. |

Limits: a log line holds 50 characters at most (the build stops on more); the screen shows the last 9 entries.
