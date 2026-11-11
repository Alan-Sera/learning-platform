# Implementation prompt: Vertex Home Page

## Goal and approval gate

Reproduce `design/vertex-home.png` as the Vertex home page at `/`. The 1024 x 1536 px image is the source of truth for desktop layout, proportions, typography, colors, copy, and decoration. Adapt the layout to smaller screens without redesigning the desktop page.

This document describes a future implementation. Creating it does not authorize application changes. Present its complete content and diff for review, then obtain explicit approval before implementation. Original avatar and course-logo assets are also required before implementation begins; see the asset checklist below.

The user selected a presentational first version with local sample data. Keep Sanity, Clerk, AI search, analytics, learner progress, and persistence for later tasks. Do not install dependencies, restructure the workspaces, create product routes, commit, or push as part of this implementation.

## Instructions and documentation reviewed

- `AGENTS.md`: prompt approval, fidelity to the supplied image, component reuse, application boundaries, verification, and the final report format.
- Installed Next.js guides under `node_modules/next/dist/docs/01-app/01-getting-started/`: `03-layouts-and-pages.md`, `05-server-and-client-components.md`, `11-css.md`, `12-images.md`, and `13-fonts.md`.
- The guides establish the `/` page entrypoint, Server Components by default, small Client Components for browser events, local image assets with explicit dimensions, and font optimization through `next/font`.
- No Sanity, Clerk, search-agent, or image-generation skill is needed for this document or the selected presentational scope. No such skill was applied.

## Code and assets inspected

- `package.json`: Next.js 16.4.3, React 19.3.1, Tailwind CSS 4, TypeScript 6.0.3, and pnpm 12.15.0. Lucide, clsx, and tailwind-merge are already installed; Vitest and Testing Library are available.
- `app/page.tsx` is the starter page to replace after approval. `app/layout.tsx` loads Inter and Playfair Display and currently supplies design-system metadata.
- `app/globals.css` provides the Vertex palette, radius, shadow, typography, light presentation, and focus tokens. `next.config.ts` already configures Tailwind through Turbopack.
- `Logo`, `Navbar`, `Button`, `Card`, `CourseCard`, and `SearchInput` provide reusable foundations. The existing course card is compact with a fixed N mark; the search field and navbar currently have compact layouts.
- `/design-system` uses those shared components and must retain its current default variants.
- `eslint.config.mjs` includes Tailwind checks; `vitest.config.mts` discovers component tests. Existing badge and status-indicator tests must continue to pass.
- `public/` contains starter SVGs, including the Next.js wordmark, but not the reference's square Next.js course mark, Docker logo, TypeScript logo, or profile avatar.
- `design/vertex-home.png` is the supplied 1024 x 1536 px reference. It is a design input, not a page background or a replacement for HTML components.

## Decisions and implementation boundaries

1. Build the home page in the existing Next.js application. Keep the page and static sections server-rendered; use a small Client Component only for the search keyboard shortcut.
2. Reuse Playfair Display, Inter, the shared tokens, and `cn()`. Use scoped home-page styles and optional component variants for reference-specific dimensions. Do not globally resize shared controls or change existing design-system variants to fit this page.
3. Preserve the existing palette. If the reference requires an additional surface, border, or accent color, give it a named home-specific token instead of changing the established primary scale. Match the image rather than substituting a generic landing-page style.
4. Keep all three course records in a small typed local data module. They are reference fixtures, not fetched content or generated search results.
5. Use semantic anchors for real in-page navigation and static elements for examples with no destination. Do not create placeholder routes, `href="#"`, simulated login, notification menus, or fake search responses.
6. Add home-page metadata at the page level so `/` has a suitable Vertex title and description while `/design-system` retains its own identity.
7. Do not add packages. Prefer existing Tailwind utilities, Lucide icons, local assets, and CSS gradients or inline SVG for the purely geometric decoration.

## Reference layout and exact copy

### Header

Reproduce the bounded page frame, subtle diagonal stripes in the outer side gutters, thin header divider, and spacious horizontal header. Place the Vertex logo at the left, followed by `Courses` and `My Learning`; place the outline notification bell and circular avatar at the right. Match the reference's dark navigation text rather than automatically applying the design-system showcase's orange active-link treatment.

### Hero and search field

Center the outlined `INTELLIGENT LEARNING` label, the large Playfair Display heading, supporting copy, orange CTA, and search field. Preserve the desktop heading's two lines: `Search your learning` and `in plain English.`

- Supporting copy: `Vertex understands what you want to learn and finds the exact lessons across all your courses.`
- CTA: `Explore Courses`, with a right-arrow icon.
- Search placeholder: `Ask anything about your learning...`
- Shortcut hint: `⌘ K`, as shown in the reference; support both Command+K and Control+K.

At the reference width, the header is approximately 98 px tall, the CTA approximately 60 px tall, and the search surface approximately 746 x 86 px. Treat these as starting measurements to validate against the image, not fixed dimensions that cause clipping on smaller screens. The hero heading is larger than the existing 48 px display utility and needs a home-specific treatment. Match the original vertical whitespace and the divider before the course section.

### Course section

Place `All Courses` at the left and `View all courses` with a right arrow at the right. Render exactly three equal-height vertical cards in the reference order. Each card has its own original logo near the top, a Playfair Display title, muted description, generous whitespace, and a bottom metadata row separated by a fine rule. Match the card borders, corner radii, icon sizes, padding, and column gaps.

| Title | Description | Level | Duration | Modules |
| --- | --- | --- | --- | --- |
| Next.js for Production | Build scalable, high-performance web applications with Next.js. | Intermediate | 18h 24m | 12 modules |
| Docker Essentials | Containerize applications and streamline your development workflow. | Beginner | 10h 12m | 8 modules |
| TypeScript Deep Dive | Go beyond the basics and write safer, more expressive code. | Intermediate | 14h 36m | 10 modules |

### Closing note and decoration

Below the cards, reproduce the two thin horizontal rules, orange outline star, and the text `New courses and lessons added every week.` Match the soft orange stepped columns along the bottom edge using CSS or inline SVG. Keep these shapes and the gutter stripes decorative, static, and hidden from assistive technology. Do not add a footer, pricing section, extra courses, or animations absent from the reference.

## Reusable component interfaces

- `CourseCard`: add an optional `variant` with `compact` as the existing default and `catalog` for the vertical home card. Add optional typed image data for the supplied original logo. Preserve existing title, description, metadata, optional destination, and class override props. The home fixtures do not provide destinations.
- `SearchInput`: add an optional `variant` with `default` and `hero`, preserving the current default. Allow a native input ref so the small home-search wrapper can focus it. Continue accepting native input props, labels through an associated ID, shortcut text, and class overrides.
- `Navbar`: add an optional home presentation and an optional actions slot for the static bell and avatar. Preserve current items and compact defaults. Allow the logo to link to `/` in the home header.
- Reuse `Card`, `Logo`, and the existing button presentation. The hero CTA must remain an anchor to the course section, not a button nested inside a link. Share button styles if needed without changing the existing Button API's defaults.

## Interaction and accessibility

- Give the course section `id="courses"`. `Courses`, `Explore Courses`, and `View all courses` all link to `#courses` and move to that section without changing routes.
- The search field accepts and clears native text input. It does not submit, fetch, filter the cards, navigate, or generate results in this phase. Do not add explanatory UI copy absent from the reference.
- Command+K and Control+K focus the search field and prevent the browser's matching shortcut when handled. Ignore composition and shortcut events originating in another editable field. Remove the event listener when the wrapper unmounts.
- Render My Learning as presentational text, the bell as a decorative icon, the avatar as a static image, and the cards as articles. Do not give these elements false button or link semantics.
- Use one h1, an h2 for All Courses, and h3 course titles. Provide a visually hidden label for the search field, suitable image alt text, and decorative-icon exclusions.
- Retain the shared 2 px Primary 500 focus outline with a 2 px offset. Ensure focus is not clipped, keyboard order follows visual order, and real controls remain usable at mobile widths.

## Responsive behavior

Use three card columns from 1024 px, two from 640 to 1023 px, and one below 640 px. At 1440 px, keep the desktop composition centered and constrained. At 768 px and 390 px, adapt the header spacing, wrap its contents sensibly if necessary, reduce hero typography, and let the search field fit the available width. Keep card metadata readable without overlap. Narrow the side gutters on mobile and keep decoration within the page bounds. Do not introduce a mobile menu requiring additional JavaScript for this small header.

## Original assets required before implementation

The user chose original files rather than crops. These four assets are currently pending:

- The profile avatar pictured in the header.
- The square Next.js course logo pictured on the first card.
- The Docker course logo pictured on the second card.
- The TypeScript course logo pictured on the third card.

Obtain the separate original files and confirm their locations before application implementation begins. Store approved files locally under `public/images/vertex/`, retaining their actual formats and recording their dimensions. Use `next/image` with explicit dimensions where appropriate. Do not crop the screenshot, generate replacements, silently substitute the starter Next.js wordmark, or use remote placeholder images. Prompt approval alone does not resolve this asset prerequisite.

## Planned files after approval and asset availability

| Area | Expected files and purpose |
| --- | --- |
| Home composition | `app/page.tsx` and `app/home.module.css`: server-rendered sections, page metadata, scoped layout and decoration. |
| Local content | `lib/home-courses.ts`: typed reference fixtures and approved local image references. |
| Search interaction | `components/home/home-search.tsx` and a focused component test: keyboard focus behavior only. |
| Shared components | Existing course card, navbar, and search-input files: optional variants and props with unchanged defaults. Update the button file only if needed to share presentation with the anchor CTA. |
| Tokens and assets | `app/globals.css` only for necessary named additions; approved originals under `public/images/vertex/`. |

Do not edit the reference image, AGENTS.md, package manifests, lockfile, existing prompts, or unrelated local files. Record any framework-generated AGENTS.md change separately during verification rather than rewriting the project's instructions.

## Security and data boundaries

Keep fixture content local and read-only. Do not add APIs, environment variables, external image requests, authentication state, cookies, localStorage, analytics, or server/client secrets. Do not render untrusted HTML. The avatar is a visual sample and must not be treated as evidence of an authenticated user. Use only the approved original assets and ordinary React rendering.

## Acceptance criteria

1. `/` reproduces the reference header, hero, CTA, search surface, three cards, closing note, and decoration with the exact copy and fixture values above.
2. The implementation uses the approved original assets, existing fonts, and shared components; desktop proportions are verified at 1024 px against the full 1024 x 1536 px reference.
3. The header and cards adapt correctly at 390, 768, and 1440 px with no horizontal scrolling, overlapping content, or clipped focus outlines.
4. All three course anchors reach the local course section; both keyboard shortcuts focus the labeled search input without submitting or triggering requests.
5. Static examples have honest semantics, and the page introduces no backend, product routes, or persistence.
6. Existing component defaults, `/design-system`, and existing tests retain their behavior and presentation.
7. Fonts and images load without visible layout jumps, and TypeScript, lint, tests, and production build pass.

## Checks and exact manual test steps

For this document-only task, inspect the complete new-file diff and compare Git status before and after. The only new change from this task must be `prompts/home-page.md`; existing untracked files remain untouched. Application checks are reserved for the later implementation.

After approval and asset availability, run `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd lint`, `pnpm.cmd test`, and `pnpm.cmd build`. Start `pnpm.cmd dev` for the manual checks. Use the existing test stack for meaningful keyboard-focus behavior; do not add dependencies or tests that only repeat CSS class strings.

1. Open `http://localhost:3000/` at a 1024 px viewport and compare a full-page capture against `design/vertex-home.png`, including section heights, line breaks, logo/avatar appearance, card alignment, gutters, and bottom decoration.
2. Repeat at 390, 768, and 1440 px. Verify one, two, and three course columns at the specified breakpoints and no page-level horizontal overflow.
3. Activate Courses, Explore Courses, and View all courses with mouse and keyboard. Confirm that each reaches `#courses`.
4. Use Command+K or Control+K from a non-editable area, type in the search field, and press Enter. Confirm focus behavior, editable text, and the absence of submission, navigation, and search requests. Check that unrelated editable fields do not lose focus to the shortcut.
5. Tab through the real links and input. Confirm labels, visible focus, logical order, and that presentational items do not create dead tab stops.
6. Reload with a cold browser cache and check font and image stability. Confirm that the home page remains light under a dark operating-system preference.
7. Open `/design-system`, verify its existing compact card, navbar, and search input, and exercise its pagination to catch shared-component regressions.
8. Report the files changed, checks actually run, and any remaining visual deviation under the project's What I did, Test, and Needs your attention headings.
