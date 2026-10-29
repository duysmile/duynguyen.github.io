---
tags: [incident, duynguyen-github-io]
severity: S4
status: fixed
date: 2026-10-29
---
# Stale post after push

| | |
|---|---|
| Symptom | Post edit merged 08:18; rebuild published at once, but duysmile.com still showed the old text. |
| Impact | One edit late by ~11 min, until the next push rebuilt the site. |
| Root cause | `githubPostSource` downloaded posts from `raw.githubusercontent.com/<owner>/<repo>/master/...`. That URL is CDN-cached (`max-age=300`); the rebuild ran seconds after the push and got the old file. |
| Confirmed by | Header `cache-control: max-age=300` on the raw URL; 08:18 build published old text; 08:29 build (cache expired) published new text. |
| Fix | Resolve `master` to a commit SHA once, then list and download at that SHA (immutable URLs). Workflow waits 75s, since the commit lookup is cached 60s. |
| Prevention | `src/lib/github.test.ts`: asserts every download uses the commit SHA, never the branch. |
| Class | Any fetch of a moving ref behind a CDN. No other instance in the repo. |

```tree
Does the post URL name a branch?
  yes -> CDN may serve a copy up to 5 min old | before fix, max-age=300 [risk]
  no -> URL names a commit SHA, content immutable | after fix [chosen]
```
