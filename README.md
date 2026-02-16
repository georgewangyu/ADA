# ADA

Reusable agent infrastructure for coding projects.

`ADA` is the shared source for portable agent setup across repositories:

- `AGENTS.md` for startup/routing behavior
- `AGENT.md` for execution rules
- `SOUL.md` for assistant identity and tone
- `templates/` for copy-ready starter files
- `scripts/` for small, dependency-light helper scripts

## Philosophy

- Keep project repos self-sufficient.
- Keep shared conventions centralized.
- Keep startup context concise.

## Recommended Usage In Other Repos

1. Copy templates from `templates/`.
2. Keep local rules in each repo's own files.
3. Periodically sync improvements back into `ADA`.

## Files

- `AGENTS.md` - startup bootstrap for this repo
- `AGENT.md` - general coding workflow rules
- `SOUL.md` - personality and behavioral baseline
- `templates/` - starter versions for new repositories
- `scripts/docs-list.ts` - lists docs and "read_when" hints

## Docs Metadata Convention

Use front matter in docs when possible:

```yaml
---
summary: One-line summary of this doc
read_when:
  - Trigger phrase for when this doc should be loaded
---
```
