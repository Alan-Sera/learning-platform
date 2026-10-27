# Implementation prompt: Vertex Design System

## Goal and approval gate

Turn `design/vertex-designsystem.png` into the reusable visual foundation for Vertex: Tailwind v4 design tokens, a typed component library, and a `/design-system` showcase that follows all 14 sections of the reference. The reference image is the authority for desktop layout, colors, typography, spacing, and states. Adapt its layout sensibly for smaller screens without redesigning it.

This file is the reviewable implementation prompt. Do not install dependencies or change application code until the user explicitly approves it. After approval, implement only this presentational design-system work; do not add a backend, content model, authentication, analytics, or product routes.

## Instructions and documentation reviewed

- `AGENTS.md`, especially sections 2 (prompt and approval), 3 (UI fidelity), 5 (app boundaries), 6 (stack), 13 (checks), and 14 (small, verified changes). Its Next.js agent block requires consulting the installed documentation before application code changes.
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` for `next/font/google`, CSS font variables, self-hosting, and avoiding layout shift while fonts load.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` for importing global CSS and Tailwind in the root layout. The repository already configures `@tailwindcss/turbopack`; keep that working setup rather than copying a PostCSS setup from another project.
- No Sanity, Clerk, PostHog, or Context skill is needed for a presentational design-system task.

## Code and assets inspected

- `package.json`: one Next.js 16.4.3 / React 19.3.0 application with Tailwind CSS 4, TypeScript, ESLint, and `pnpm@12.15.0`; no UI component dependencies yet.
- `app/globals.css`: starter styles with Geist variables and automatic dark colors; it already imports Tailwind.
- `app/layout.tsx`: starter Geist/Geist Mono font setup and metadata.
- `app/page.tsx`: starter page. Leave this route's content in place; it will inherit the new global base styles.
- `next.config.ts`: Turbopack CSS rule using `@tailwindcss/turbopack`.
- `tsconfig.json`: `@/*` resolves from the repository root and its broad include patterns can pick up standalone skill examples.
- `design/vertex-designsystem.png`: a desktop design sheet with 14 numbered sections. The repository does not yet have a `components/` library or an `app/design-system/` route.

## Decisions and implementation boundaries

1. **CSS-first tokens:** Put all design values in Tailwind v4 `@theme` in `app/globals.css`; do not create `tailwind.config.ts`. Components use token utilities such as `bg-primary-500`, `text-neutral-500`, `rounded-md`, and `shadow-sm`, without raw hex values in their component files. Values that are not in the swatch table but are needed for states (for example, hover orange or lesson lavender) also get named tokens.
2. **Typography:** Load Playfair Display and Inter with `next/font/google` in `app/layout.tsx`, expose `--font-playfair` and `--font-inter`, and map them to `font-display` and `font-sans`. Keep Next.js font fallback adjustment enabled so the initial fallback matches the final font's metrics. Define the eight sheet styles with Tailwind v4 `@utility` rules (`text-display-1`, `text-heading-1`, `text-body`, etc.), each bundling family, size, line height, and weight. Check a cold load for a visible font swap or layout jump and correct it before completion.
3. **Light presentation:** The reference has no dark theme. Remove the starter automatic dark palette and replace the starter Geist styling with the Vertex base styles. Preserve the `/` page's content; place the new showcase only at `/design-system`.
4. **Spacing:** Use Tailwind v4's existing 4 px base spacing unit. Show the nine reference values rather than overriding `--spacing` or inventing a second spacing scale.
5. **Dependencies and class overrides:** After approval, add `lucide-react`, `clsx`, and `tailwind-merge` with `pnpm`. Put `cn()` in `lib/utils.ts` for safe `className` overrides. Use typed variant lookup maps; do not add a variant framework for this small library.
6. **Icons and branding:** Use Lucide's 24 px, rounded, approximately 2 px stroke icons for standard glyphs. Make the distinctive Vertex mark as a local SVG component with full and compact wordmark sizes. Give filled icon examples an intentional filled appearance rather than applying a blanket fill that obscures their details.
7. **Rendering:** Keep components server-renderable by default. Search and select use native controls and do not need client JavaScript. Pagination is the small row of page numbers and arrows (`‹ 1 2 3 … 8 ›`). In the showcase, a small client wrapper lets a click change only the highlighted page number; it does not fetch content or navigate to course pages. Keep the reusable pagination component controlled by props.
8. **Cards and navigation:** Components receive typed content and optional real destinations through props; they do not fetch data. The showcase uses reference copy as sample data. Do not invent application routes or use `href="#"` placeholders. Render sample actions as non-navigating examples when no real destination exists.
9. **Project scope:** Change only web presentation files and the package manifest/lockfile required for the three UI dependencies. Do not edit `AGENTS.md`, the reference image, Sanity skills, or unrelated user files. Standalone examples under `agent/skills` and `.agents/skills` are not app source; narrow type/lint checks only if those examples create unrelated failures.

## Token values from the image

| Group | Values |
| --- | --- |
| Primary | 500 `#F97316`; 400 `#FB923C`; 300 `#FDBA74`; 200 `#FED7AA`; 100 `#FFEEE5` |
| Neutral | 900 `#0F172A`; 700 `#334155`; 500 `#64748B`; 300 `#CBD5E1`; 200 `#E2E8F0`; 100 `#F1F5F9`; 50 `#FAFAFC`; white `#FFFFFF` |
| Radius | xs 4 px; sm 8 px; md 12 px; lg 16 px; xl 24 px; full/circle |
| Shadow sm | `0 1px 2px 0 rgba(15, 23, 42, 0.05)` |
| Shadow md | `0 4px 12px -2px rgba(15, 23, 42, 0.08)` |
| Shadow lg | `0 12px 24px -4px rgba(15, 23, 42, 0.10)` |
| Shadow xl | `0 20px 40px -8px rgba(15, 23, 42, 0.12)` |

Use a 4 px spacing unit and show `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, and `64` px steps. Add named state colors: Primary 600 `#EA5A0B` for orange hover, lesson lavender background `#EEF0FE` with text `#4F46E5`, and completed green `#16A34A`. Keep the exact swatch palette above unchanged.

| Style | Font | Size / line height (px) | Weight | Use |
| --- | --- | --- | --- | --- |
| Display 1 | Playfair Display | 48 / 56 | Bold | Page titles |
| Display 2 | Playfair Display | 36 / 44 | Bold | Section titles |
| Heading 1 | Inter | 28 / 36 | Semibold | Card titles |
| Heading 2 | Inter | 22 / 30 | Semibold | Subsections |
| Heading 3 | Inter | 18 / 26 | Medium | Small titles |
| Body Large | Inter | 16 / 24 | Regular | Body copy |
| Body | Inter | 14 / 20 | Regular | Supporting text |
| Small | Inter | 12 / 16 | Regular | Captions and metadata |

## Planned application files after approval

```text
app/globals.css                         @theme tokens, base styles, @utility type scale
app/layout.tsx                          Playfair + Inter variables, Vertex metadata
app/design-system/page.tsx              static 14-section showcase
lib/utils.ts                            cn() helper
components/brand/logo.tsx               mark and wordmark
components/ui/button.tsx                Button variants and md/lg sizes
components/ui/badge.tsx                 Badge variants
components/ui/status-indicator.tsx      four status variants
components/ui/progress-bar.tsx          numeric progress with ARIA values
components/ui/search-input.tsx          native search field, icon, shortcut hint
components/ui/select.tsx                native select and chevron
components/ui/card.tsx                  shared card surface
components/cards/course-card.tsx        CourseCard
components/cards/lesson-video-card.tsx  LessonVideoCard
components/cards/lesson-card.tsx        LessonCard
components/cards/resource-card.tsx      ResourceCard
components/nav/navbar.tsx               Vertex logo, links, active state
components/nav/breadcrumbs.tsx          labeled path with current page
components/nav/pagination.tsx           current, total, ellipsis, prev/next
package.json and pnpm-lock.yaml         lucide-react, clsx, tailwind-merge
```

Export prop types with the components. Accept `className` on visual primitives and merge it with `cn()`. Button extends native button props and adds `variant: primary | secondary | tertiary | text` and `size: md | lg`; disabled is the native disabled state. Badge and status take typed variant names. Progress takes `value`, optional `max`, and optional label. Search and select extend their native input/select props. Cards take explicit title, description, metadata, and optional action data. Breadcrumbs take an ordered list of labels and optional real destinations. Pagination takes current page, total pages, and a page-change callback; the showcase supplies that callback to update its local highlighted number only.

## Requirements by reference section

1. **Colors:** two swatch groups with all names and hex values above; the header pairs the logo, "Design System" title, short introduction, and version/date with the palette.
2. **Typography:** prominent `Ag` samples for both families, plus their descriptors (Elegant / Readable / Timeless and Clean / Modern / Highly legible).
3. **Type Scale:** show all eight styles in a five-column table (Style, Font, Size / Line Height, Weight, Use), using the utility classes built from the token table.
4. **Spacing System:** nine graduated squares with px and rem labels; base unit 4 px.
5. **Radius & Shadows:** six radius outlines and four shadow cards showing their CSS values.
6. **Icons:** outline and filled rows using bell, search, play, file, bookmark, chart, clock, user, and chevron; show 24 px grid, 2 px rounded stroke, and optical-balance notes.
7. **Buttons:** primary, secondary, tertiary, and text columns with default, hover, and disabled demonstrations. Use a 44 px control height, 12 px radius, Inter Medium, 16 px horizontal padding for lg and 12 px for md. Primary uses Primary 500 fill and Primary 600 hover; secondary uses Primary 500 border/text and a Primary 100 hover; tertiary uses a Neutral 200 border and Neutral 50 hover; text remains a Primary 500, surface-free action. Use the native `disabled` attribute so disabled controls cannot activate.
   - Disabled Primary: Primary 100 background and Primary 300 text.
   - Disabled Secondary: white background, Primary 200 border, and Primary 300 text.
   - Disabled Tertiary: Neutral 50 background, Neutral 200 border, and Neutral 300 text.
   - Disabled Text: transparent background and Primary 300 text.
8. **Inputs:** search input with icon and decorative shortcut hint, plus native select and chevron. Both use 44 px height, 12 px radius, 1 px `#E2E8F0` border, 16 px horizontal padding, and a `#FB923C` focus border.
9. **Badges / Tags:** use uppercase 12 px semibold labels, `0.06em` letter spacing, 6 px radius, and `2px 6px` padding. VIDEO and POPULAR use Primary 100 background and Primary 500 text; LESSON uses `#EEF0FE` background and `#4F46E5` text.
10. **Status / Indicators:** In Progress partial orange ring, Completed green check, Now Playing orange play symbol, and Locked neutral lock; pair every icon with text.
11. **Progress Bar:** use an 8 px Neutral 100 track with fully rounded ends, Primary 500 fill, and a visible 35% label; provide progress semantics with min, max, and current value.
12. **Cards:** four cards in a desktop row, using a white surface, neutral border, 16 px radius, subtle shadow, and 20–24 px padding. Show the reference's Next.js course (level, duration, modules), video lesson (VIDEO badge, "Lesson 5.1 · 12:45", "Watch from 12:45"), text lesson (LESSON badge, Module 5, "View lesson"), and PDF resource (file icon, size, external-action treatment).
13. **Navigation:** compact Vertex navbar with Courses active in Primary 500 (`#F97316`) and My Learning in Neutral 900 (`#0F172A`); breadcrumb trail with chevrons and a muted current page; pagination with outlined current page, ellipsis, and previous/next controls. The showcase's pagination changes only its selected page number when clicked.
14. **Principles:** Clarity First, Consistency, Focus & Calm, and Accessible, each with an icon and the reference's short explanatory copy.

At about 1024 px, preserve the reference's panel groupings and proportions. At 1440 px, constrain the sheet so it stays composed. Below medium width, stack the section grids and cards without overlap; at 768 px and 375–390 px, keep controls usable and prevent page-level horizontal scrolling. A wide type table may scroll within its own panel if needed.

## Security and data boundaries

This feature is presentational. Do not read or write Sanity content, store search input, call an API, add environment variables, or cross a server/client secret boundary. Do not render untrusted HTML. Keep example content local to the showcase; any local interaction is transient UI state only.

## Accessibility

- Use native `<button>`, `<input>`, and `<select>` controls with actual disabled behavior. Give buttons and other interactive controls a 2 px Primary 500 (`#F97316`) `focus-visible` ring with a 2 px offset. The input and select focus border remains Primary 400 (`#FB923C`). Associate inputs with labels; a visually hidden label is acceptable for the search demo.
- Give the progress bar min, max, and current values. Identify the current pagination item with `aria-current="page"`.
- Use `<nav aria-label="Breadcrumb">` with an ordered list for breadcrumbs, and a separately labeled pagination `<nav>`. Mark decorative icons `aria-hidden`.
- Preserve the reference colors while choosing readable text treatments for small labels. Avoid making color alone convey a status.

## Acceptance criteria

1. `/design-system` renders all 14 numbered sections in the reference order; `/` remains the starter page apart from global Vertex styles.
2. The desktop sheet matches the image's palette, typography, hierarchy, spacing, radius, shadows, cards, controls, and navigation states. The exact swatch hex values and type scale are represented in the shared tokens.
3. Reusable components are typed, exported, and accept class overrides through `cn()` where appropriate. Component files contain no raw color hex; named tokens hold all colors.
4. Interactive examples are keyboard reachable, have visible focus, expose correct labels and ARIA state, and do not point to invented product routes.
5. Only controls that truly require local state ship client JavaScript. There is no data fetching or backend behavior.
6. The page has no unintended horizontal overflow or overlapping content at 1440, 1024, 768, and 375–390 px.
7. TypeScript, lint, and production build pass from this repository with `pnpm` commands. Report any narrowly scoped check-exclusion change for standalone skill examples.
8. Badges use 12 px semibold text, `0.06em` tracking, 6 px radius, and `2px 6px` padding; the progress track is 8 px high with Neutral 100 track and Primary 500 fill.
9. Each disabled button variant uses its specified token colors and the native disabled state. Keyboard focus shows a 2 px Primary 500 ring with a 2 px offset; the focused input/select border is Primary 400.
10. Courses uses Primary 500 for its active link and My Learning uses Neutral 900. A cold page load shows Playfair Display and Inter without a visible font swap or layout jump.

## Checks to run after approval

```text
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm dev
```

Run the type check and lint, and use the production build because the route, layout, and styles change. Do not claim a check passed unless it ran. If PowerShell blocks the `pnpm.ps1` shim, use `pnpm.cmd` for the same commands. Compare the rendered route to the image after starting the dev server.

## Manual test steps after approval

1. Open `http://localhost:3000/design-system`; confirm each of the 14 headings and sample components appears in order.
2. Compare the 1024 px rendering against `design/vertex-designsystem.png` from top to bottom, then inspect 1440 px, 768 px, and 375–390 px. Look for clipping, overlap, and page-level horizontal scrolling.
3. Hover the four button variants and inspect the intended color change, including the exact Primary 600 hover orange. Confirm each disabled variant has the specified colors and cannot activate.
4. Tab through the controls and links. Confirm the 2 px Primary 500 focus ring and offset, labeled search/select controls, and accessible current-page and progress values.
5. Focus the search field; confirm the border changes to `#FB923C`. Change the select option and verify the native value updates.
6. Click page 2 and the previous/next arrows in the pagination example; only the highlighted number changes, with no data request or route change.
7. On a cold load with the browser cache disabled, confirm Playfair Display renders display text and Inter renders UI text without a visible font swap or layout jump. Confirm there is no unwanted automatic dark theme.
8. Report implementation files, checks that actually passed, and any visual deviation from the reference.
