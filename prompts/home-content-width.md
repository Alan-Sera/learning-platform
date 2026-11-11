# Implementation prompt: Home content width

## Goal

Expand the home page's centered main frame from its current 966 px maximum to approximately 1440 px on large screens, as requested by the user.

## Instructions, documentation, and code reviewed

- `AGENTS.md`: save a prompt, obtain approval before code changes, preserve responsive behavior, and run checks.
- Previously reviewed installed Next.js CSS guide: use the existing CSS Module for page-scoped layout.
- `app/home.module.css`, `prompts/home-page.md`, and the current working-tree status.
- No additional skill is needed for this small CSS adjustment.

## Decisions and expected files

- Interpret main content as the outer home frame containing the header, hero, and course section.
- Edit only `app/home.module.css` after approval: set a 1440 px maximum and retain approximately 30 px side gutters on desktop.
- Preserve the existing 20 px tablet and 10 px mobile gutters, and let the course grid fill the wider frame.
- Preserve the existing hero text and search-field maximum widths and the current column breakpoints.

## Requirements, security, and acceptance

- At a 1920 px viewport, the frame is 1440 px wide and centered.
- At narrower widths, the frame fits the viewport with the stated gutters and no horizontal scrolling.
- Retain one, two, and three course columns at the existing breakpoints.
- This is a local CSS change with no data, permissions, dependencies, or server-boundary changes.

## Checks and manual test steps

1. Run TypeScript and lint; report actual results and existing warnings.
2. Open `/` at 1920 px and measure the frame: 1440 px wide with equal outer margins.
3. Inspect `/` at 1440, 1024, 768, and 390 px; confirm gutters, card columns, readable content, and no horizontal overflow.
4. Review the diff to confirm the implementation changes only the home CSS Module.
