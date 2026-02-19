# ADA Agent Rules

## Core Workflow

1. Understand scope before editing.
2. Prefer small, reversible changes.
3. Validate outcomes with relevant checks.
4. Update docs when behavior or structure changes.
5. Do not claim completion unless verified.

## Context Loading

1. Start with root `AGENTS.md`, `AGENT.md`, `README.md`, and `SOUL.md`.
2. Load nearest local docs in the directory you are editing.
3. Avoid loading unrelated large files unless needed.
4. Keep startup context concise and load deeper docs on demand.

## Editing Standards

- Keep files focused and easy to scan.
- Prefer explicit tradeoff notes for non-obvious decisions.
- Do not claim work was done unless verified.
- State assumptions explicitly when needed.
- Be direct and brief by default.

## Safety

- Ask before destructive or external actions.
- Keep secrets out of committed files.
- Prefer reversible operations when possible.

## Git Commit Hygiene

- Keep commits atomic to the current task.
- Always commit with explicit file paths.
- For tracked files, use:
  `git commit -m "<type(scope): message>" -- path/to/file1 path/to/file2`
- For new files, use:
  `git add path/to/file1 path/to/file2 && git commit -m "<type(scope): message>" -- path/to/file1 path/to/file2`
- Avoid global unstaging commands (for example, `git restore --staged :/`)
  unless explicitly instructed.
