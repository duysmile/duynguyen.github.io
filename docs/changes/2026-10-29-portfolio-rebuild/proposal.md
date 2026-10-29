---
tags: [change, duynguyen-github-io]
status: in-progress
size: standard
created: 2026-10-29
repo: github.com/duysmile/duynguyen.github.io
branch: feat/portfolio-rebuild
---
# Portfolio rebuild of duysmile.com

## Why (L0)
| | |
|---|---|
| Problem | duysmile.com shows only old notes. About still says "student". Seven years of work are invisible. |
| Outcome | One site shows who Duy is, what he built, and what he writes. Lighthouse ≥ 95 on all four scores. CV prints on ≤ 2 A4 pages. |
| Appetite | 2 days |
| No-gos | CMS or editor, comments, analytics, Vietnamese version, phone number or home address |
| Rabbit holes | Vietnamese file names → ASCII slugs. Relative images in markdown → raw GitHub URLs. |

## Scope
```mermaid
flowchart LR
  subgraph In
    home[Home: story + featured work]:::new
    cv[CV page, printable]:::new
    work[Projects page]:::new
    blog[Blog from blogs-github/blogs]:::changed
    redir[Old URL redirects]:::new
  end
  subgraph Out
    cms[Editor / CMS]:::same
    vi[Vietnamese UI]:::same
    notes[notes, threads, posts folders]:::same
  end
  classDef new fill:#d1f7c4,stroke:#2da44e,color:#0b3d16
  classDef changed fill:#fff1c2,stroke:#bf8700,color:#3d2c00
  classDef same fill:#eaeef2,stroke:#8c959f,color:#24292f
```

## What (L1)
Capabilities: [[specs/site]]

```mermaid
flowchart TD
  v([Visitor opens a URL]) --> k{Path}
  k -->|/| h[R1 Home]
  k -->|/cv| c[R2 CV]
  k -->|/projects| p[R3 Projects]
  k -->|/blog/slug| b[R4 Post]
  k -->|"old /blog/sha or /about"| r[R5 301 redirect]
  k -->|unknown| e[R7 404 page]
```

| ID | Δ | Requirement (EARS) | Scenarios |
|---|---|---|---|
| R1 | ADDED | When a visitor opens `/`, the site shall show intro, story, featured projects, recent posts. | happy: GIVEN profile data WHEN open `/` THEN 4 sections show |
| R2 | ADDED | When a visitor opens `/cv`, the site shall show experience, skills, education, awards, in print-ready layout. | happy: WHEN print THEN ≤ 2 A4 pages, no nav |
| R3 | ADDED | When a visitor opens `/projects`, the site shall show work projects, then open-source contributions. | happy: WHEN open THEN 2 sections, work first |
| R4 | MODIFIED | When the site builds, it shall render each markdown file in `blogs-github/blogs/` as a post page. | happy: GIVEN 2 files WHEN build THEN 2 posts, ASCII slugs |
| R5 | ADDED | When a visitor opens an old post or `/about` URL, the site shall redirect (301) to the new URL. | happy: `/blog/<blob sha>` → `/blog/<slug>` |
| R6 | ADDED | If the build cannot read `blogs-github`, then the build shall fail. | error: GIVEN GitHub down WHEN build THEN exit ≠ 0, live site unchanged |
| R7 | ADDED | If a visitor opens an unknown path, then the site shall show a 404 page with links home. | error: WHEN `/xyz` THEN 404 + nav |
| R8 | ADDED | The site shall take all profile facts from one data file. | happy: edit file → all pages change |

MODIFIED previous text:
- R4: old app fetched posts in the browser from the GitHub API at `/blog/:blobSha`.

## Assumptions
- Voice: warm and personal, first person, English.
- Employers named; end clients described generically.
- Netlify keeps hosting; only the build command changes.
- Profile facts come only from [[profile]]: CV 2026 + CV 2023 + Xendit notes.
- VelocityLabs is not on either CV, so the site leaves it out.

## Open questions
none
