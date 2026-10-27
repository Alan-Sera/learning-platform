# Implementation prompt: Publish Vertex to GitHub

## Goal and approval

Publish the existing Vertex project to `https://github.com/Alan-Sera/learning-platform.git` on `main`, including the design system implementation, its reference image, prompts, project instructions, and configuration changes.

The user explicitly approved this procedure and authorized the local commit and push. No additional application work is part of this task.

## Instructions and skills reviewed

- Follow `AGENTS.md` for the implementation prompt, verification, server/client boundaries, and short final report.
- No specialized skill is needed for Git publication. This task does not change Next.js application code or integrate any service into the application.

## Code and configuration inspected

- Git is already initialized on `main`, with the existing `Initial commit from Create Next App` commit and no configured remote.
- The GitHub repository had no refs when checked during planning. Recheck before publishing.
- The working tree contains the implemented Vertex design system and separate local skill installations.
- `README.md` contains the Next.js starter documentation and does not yet have the requested project heading.
- `package.json` provides the pnpm development, lint, and production build commands.
- `.gitignore` already excludes dependencies, environment files, build artifacts, and TypeScript caches.

## Decisions, assumptions, and files

- Preserve the initial commit and the current `main` branch. Do not reinitialize Git or rewrite history.
- Add `# learning-platform` as the README heading once, preserving its existing documentation.
- Add this procedure as `prompts/publish-github.md`.
- Stage the changed tracked project files explicitly: `README.md`, `AGENTS.md`, application styles/layout/page, `package.json`, `pnpm-lock.yaml`, and `tsconfig.json`.
- Stage the new application route, component library, utilities, reference image, and prompt documents through the `app/design-system/`, `components/`, `lib/`, `design/`, and `prompts/` paths.
- Leave `.agents/`, `.claude/`, `agent/`, and `skills-lock.json` local and unstaged. Do not add dependencies, environment files, or generated artifacts.
- Create one commit with the exact message `first commit`.
- Configure `origin` to the requested repository and push `main` with upstream tracking.
- Use the existing Git identity and GitHub authentication. If either is unavailable, report the concrete failure without inventing credentials.

## Requirements and security

- Review the complete staged path list and staged diff before committing.
- Use explicit staging paths rather than `git add .`.
- Confirm excluded local tooling and ignored environment files are absent from the staged paths.
- Keep credentials out of command output, commits, and documentation.
- If the remote acquires refs before publication, stop and review its history. Never use a forced push.
- Use process-scoped `safe.directory` if needed; do not modify global Git configuration.

## Acceptance criteria

1. README contains the requested heading once, and this prompt is included.
2. The commit includes the Vertex implementation and intended project documentation/configuration.
3. The local skill directories, skill lockfile, dependencies, environment files, and build artifacts are not committed.
4. TypeScript, lint, and production build succeed; the development route responds successfully.
5. `origin` points to the requested repository, `main` tracks `origin/main`, and the local and remote commit hashes match after the push.

## Checks and manual verification

1. Run `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd lint`, and `pnpm.cmd build`.
2. Start `pnpm.cmd dev`, request `/design-system`, confirm an HTTP 200 response and all 14 numbered section headings, then stop the task's server.
3. Inspect `git diff --cached --name-only`, `git diff --cached --stat`, and `git diff --cached --check` before committing.
4. Recheck remote refs, commit with `first commit`, configure `origin`, then run `git push -u origin main`.
5. Compare `git rev-parse HEAD`, `git rev-parse origin/main`, and `git ls-remote origin refs/heads/main`.
6. Open `https://github.com/Alan-Sera/learning-platform` to inspect the published source and reference image.
