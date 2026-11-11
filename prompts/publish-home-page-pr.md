# Publication prompt: Vertex home page pull request

## Goal and authorization

Commit the current Vertex home page implementation, push it to a feature branch in `Alan-Sera/learning-platform`, and open a pull request into `main`. The user's explicit request to push the current code and open a PR authorizes these publication actions. The home implementation, asset substitutions, and 1440 px content width were previously approved.

## Instructions and repository inspected

- Read `AGENTS.md`, `.gitignore`, `package.json`, `README.md`, and the existing publication prompt.
- Reviewed Git status, tracked diffs, new application files, asset provenance, local history, remote URL, and remote branch tips.
- No specialized skill or application-code change is needed for publication.

## Decisions and files

- Start `feat/vertex-home-page` from the current `main` commit, which matches the remote tip when inspected.
- Commit the home page, scoped CSS, shared component variants, local course data, keyboard-shortcut tests, CSS loader fix, approved local assets, reference image, and home-related prompts, including this procedure.
- Stage explicit paths. Exclude `.agents/`, `.claude/`, `agent/`, `skills-lock.json`, environment files, dependencies, and build artifacts, following the existing publication exclusions.
- Use the configured Git identity and authentication. GitHub CLI is unavailable; the GitHub API may use existing Git credentials without exposing or saving them.
- Open a regular PR with a concise description of behavior, asset substitutions, and actual validation results.

## Security and acceptance

- Review the exact staged file list, full text diff, and whitespace check before committing.
- Do not expose credentials, rewrite history, force-push, merge the PR, or change application behavior.
- The pushed branch tip must match the local commit. The PR must target `main` in the requested repository.
- Existing local agent installations remain uncommitted.

## Checks and manual verification

1. Run TypeScript, lint, existing tests, and the production build; report actual warnings or failures.
2. Confirm `/` and `/design-system` respond successfully on the existing development server. Reuse the completed responsive and keyboard verification as context for the PR.
3. Inspect the staged paths, statistics, full diff, and whitespace check; create the commit only after review.
4. Push the feature branch without force, create the PR, and verify the returned repository, base, head, state, and commit hash.
5. Return the PR link and concise validation results.
