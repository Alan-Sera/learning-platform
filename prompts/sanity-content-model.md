# Implementation prompt: Gema-Vertex content model, standalone Studio, and read data layer

## Goal and approval

Implement the course, module, lesson, instructor, and category content model, a standalone Sanity Studio, and a typed server-only read client and data layer for the existing Next.js application.

Present this document for approval before changing application code, schemas, dependencies, or remote configuration. Approval covers the implementation below, making the selected dataset private if the current plan supports it, and deploying the validated Studio and schema to the selected project. Do not upgrade a billing plan, create another project, import invented course content, commit, push, or update a PR.

## Instructions, skills, and documentation reviewed

- `AGENTS.md`: standalone Studio and web responsibilities, the fixed content relationships in section 8, private dataset and token boundaries, prompt approval, and verification.
- `.agents/skills/sanity-best-practices/SKILL.md`, with the relevant portions of `references/schema.md`, `references/groq.md`, `references/nextjs.md`, `references/project-structure.md`, `references/typegen.md`, and `references/studio-structure.md`.
- `.agents/skills/content-modeling-best-practices/SKILL.md` and `references/reference-vs-embedding.md`: shared references versus course-specific embedded content. This supporting skill is used for modeling decisions.
- Installed Next.js guides for fetching data, Cache Components, and data security under `node_modules/next/dist/docs/01-app/`.
- Official Sanity documentation for the Next.js client, datasets, TypeGen, and Studio deployment, plus the installed CLI's command help. Keep the installed versions' supported behavior authoritative when current online examples differ.

## Existing code and remote state inspected

- The Next.js web application currently lives at the repository root and uses Next.js 16.4.3, React 19.3.1, TypeScript 6.0.3, Node.js 22.17.1, and pnpm 12.15.0.
- Root dependencies already include Sanity 5.31.2, Vision 5.31.2, next-sanity 13.4.0, styled-components 6.6.0, and @sanity/image-url 2.1.1. The available CLI reports @sanity/cli 6.7.2. Preserve these working SDK generations rather than performing a major upgrade.
- `sanity.config.ts`, `sanity.cli.ts`, `sanity/schemaTypes/index.ts`, `sanity/structure.ts`, and `app/studio/[[...tool]]/page.tsx` currently create an embedded Studio with no content types.
- `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`, and `sanity/lib/live.ts` are starter utilities. The current client has no read token or server-only boundary; the unused live helper does not provide the requested private server data layer.
- No page or shared UI component currently consumes Sanity content. The home page uses local fixtures. Clerk is already integrated.
- Reviewed the package manifests, root pnpm policy file, TypeScript, ESLint, Vitest, Git ignore rules, README, and `.github/workflows/gema-quality.yml`. Root TypeScript currently includes all descendant TS files, and CI builds only the web app.
- Authenticated, read-only CLI inspection found the existing `GEMA-vertex` project, ID `2xjwyukn`, and its `production` dataset. The dataset is currently **public**. No remote settings or content were changed during inspection.
- Existing environment files were not opened or printed. The CLI resolves its own existing configuration and authentication.
- CLI help confirms `sanity schemas extract`, `sanity typegen generate`, dataset visibility commands, and Studio deployment. A temporary extraction attempt showed that this CLI mishandles absolute Windows output paths; use project-relative paths for generated artifacts. Installed TypeGen help advertises the legacy JSON configuration, so verify configuration support for this SDK rather than blindly copying newer configuration examples.

## Architecture and workspace decisions

1. Keep the current Next.js app at the repository root as the web package. Add `studio/` as a separate pnpm package with its own manifest, Sanity config, TypeScript, lint, development, build, TypeGen, and deployment scripts.
2. Extend the existing `pnpm-workspace.yaml` to include the Studio package while retaining its build approvals, security overrides, and compatibility policies. Use the repository's shared pnpm lockfile. Independent apps do not require moving the existing web code into a new `web/` folder.
3. Move authoring-only config and schema ownership into `studio/`. Remove the embedded `/studio` route and obsolete root Studio config. The authoring app runs at `http://localhost:3333`; Next.js continues on port 3000. Document this intentional route change.
4. Keep frontend integration modules under the existing `sanity/` directory. The Studio must not import the web client's token or runtime modules. Generated schema/query types may be shared through a generated TS file in the web package.
5. Declare Studio dependencies in its manifest. Keep any peers genuinely required by next-sanity in the web package and keep peer checks passing. Do not change unrelated dependency versions or weaken existing security overrides.
6. Studio authors use Sanity's own project-membership authentication. Learners continue to use Clerk. No embedded Studio, Clerk-protected authoring route, or custom user database is needed.

## Content model

There are **four document types and one embedded module object**, following `AGENTS.md`. Use `defineType`, `defineField`, and `defineArrayMember`, descriptive field groups, previews, useful sort orders, and icons compatible with the installed packages. Let Sanity generate ordinary document IDs and array keys.

| Type | Shape and fields |
| --- | --- |
| `course` document | Required title, unique slug, summary, cover image, level, non-negative price, instructor reference, category reference, and an ordered `modules` array. Include optional popular flag, non-negative integer student count, and a short learning-outcomes array. Each outcome has an icon identifier, title, and description. |
| `module` object | Embedded only in `course.modules`; title, summary, and ordered strong references to lessons. No standalone module document, slug, parent pointer, or stored module number. |
| `lesson` document | Title, unique slug, HTTPS video URL, poster image, positive integer `durationSeconds`, free-preview flag, non-negative integer student count, Portable Text notes, key points, optional pro tip, and typed resources. Each resource has a type, title, description, and safe URL. No stored parent course or module. |
| `instructor` document | Name, unique slug, photo, expertise, and Portable Text bio. |
| `category` document | Title, unique slug, and description. Course categories are references to these documents. |

### Field conventions and validation

- Slugs derive from title or name, are required for published documents, and use Sanity's uniqueness validation for their document type. Validate sensible lengths and URL-safe values.
- `level` uses a controlled list: `beginner`, `intermediate`, and `advanced`.
- Model price as a non-negative monetary amount with a currency field, defaulting to `USD`; document the unit. This is display data, not payment processing.
- Images use hotspot/crop support and meaningful alt text. Store image asset references rather than pasted asset URLs.
- Notes and biography use a reusable Portable Text definition with ordinary blocks, headings, lists, emphasis, inline code, and validated links. Do not store rich text as Markdown or HTML, and do not add an unused rendering package or rich-text plugin.
- Resources use a small controlled set of meaningful types, such as article, documentation, repository, and download. Validate external URLs and reject executable schemes. Apply HTTPS validation to video and resource URLs.
- Use required/minimum validation on the meaningful published content fields and arrays. Allow incomplete drafts to remain editable. Validate positive duration, non-negative integer counts, and valid references.
- Require at least one module and one referenced lesson before publishing a course. Prevent duplicate lesson references within a course while allowing a lesson to be referenced by different courses.
- The order of arrays defines module and lesson numbering; preserve `_key` and author order through projections. Calculate counts, total duration, and display numbering rather than storing duplicated values.
- The free-preview flag is a label, not an authorization rule. Video URLs are stored content; this task does not claim to implement provider playback or transcript ingestion.
- Provide an editor-friendly Structure tool with Courses, Lessons, Instructors, and Categories. Modules are edited inside courses. Keep the existing Vision capability in the standalone Studio.

## Server-only configuration and read client

1. Reuse project/dataset configuration via environment variables and pin the existing API date `2026-11-16`. Public project identifiers can retain the existing `NEXT_PUBLIC_SANITY_*` names for compatibility. The Studio uses corresponding `SANITY_STUDIO_*` variables in its own environment.
2. Add `SANITY_API_READ_TOKEN` as a server-only environment variable. Reuse an existing suitable token if configured; otherwise arrange a least-privileged read token through supported authenticated tooling, stored only in ignored local configuration. If safe provisioning is unavailable, have the user configure it in their own terminal or dashboard without pasting it into chat.
3. Put `import 'server-only'` at the credentialed client and data-layer entry points. Never use `NEXT_PUBLIC_` or `SANITY_STUDIO_` for tokens, pass tokens to components, or configure a browser token.
4. Use the published perspective, disable stega, and use the direct API (`useCdn: false`) for this initial private read layer. Fetch with `cache: 'no-store'`; do not add Live Content, draft preview, webhooks, or a cross-request cache in this task. This explicitly overrides the skill's generic live-content default to satisfy the project's server-only scope.
5. Keep configuration validation lazy until a server read is requested, so unused data access does not break unrelated public pages or builds. A requested read with missing configuration must fail clearly with variable names only. Do not silently fall back to public access, local fixtures, or a different project.
6. Replace/remove the unused starter live helper so it cannot become a token-exposing alternative path. Keep the image URL helper usable from server rendering without a token in its output.

## Queries and data access

- Define named, parameterized GROQ queries with `defineQuery` and explicit projections. Never interpolate slugs or filter values into query strings or use broad document spreads.
- Provide typed getters for course listings, a course by slug, a lesson by slug, instructor listings and details, and category listings and details. Course summaries should include the card fields, referenced instructor/category summaries, module/lesson counts, and total duration where needed.
- Bound list reads with validated integer pagination parameters and a documented maximum page size. Return a total count and stable ordering so callers can retrieve all pages. This is content retrieval, not the future AI search feature.
- Course detail reads expand ordered modules and lightweight lesson metadata; do not fetch every lesson's notes in a catalog or course summary request.
- Resolve course membership for a lesson through reverse references. Add a course-scoped lesson-context getter using course and lesson slugs, deriving module and lesson positions from order. Do not arbitrarily select the first parent when a lesson belongs to several courses.
- Return `null` for missing detail records and empty collections for valid empty queries. Preserve network, authentication, and configuration errors rather than disguising them as missing content. Tolerate missing optional fields and unpublished referenced documents.
- Do not create REST endpoints or wire these reads into existing UI yet. The task delivers the content foundation and callable server functions; the current home fixtures and Clerk behavior remain intact.

## Type generation and testing

- Extract `studio/schema.json` using a relative path and generate `sanity/types.ts` from the Studio schemas and web GROQ queries. Include both artifacts in the reviewable implementation so clean builds do not depend on a live Sanity request.
- Configure TypeGen to scan the web query files without scanning dependency/build folders. Prefer supported `sanity.cli.ts` configuration; if the installed Studio 5 TypeGen requires `studio/sanity-typegen.json`, use and document that version-compatible configuration rather than upgrading majors for a newer example.
- Do not handwrite substitutes for generated schema/query types or hide inference failures with `any` or unchecked casts. Keep nullable projections reflected in return types.
- Extend the existing Vitest setup only as needed for meaningful node-side tests. Evaluate queries against local GROQ fixtures to verify ordered references, reverse membership, pagination, counts, and null results. Test important validation and configuration failure paths without reading real tokens or mutating production content.
- Any test-only override of `server-only` must stay inside the test environment. Client builds must retain the real boundary.

## Remote setup and deployment

1. Target only project `2xjwyukn`, dataset `production`. Recheck current remote state before mutations.
2. Change `production` from public to private only if this is approved and supported by the existing plan. Confirm the new visibility. Never upgrade billing, create a substitute dataset, or proceed as if a public dataset satisfies the private requirement. If the plan prevents private datasets, complete the local implementation and report the blocked remote verification with a focused user decision.
3. Validate both apps before deployment. Deploy the standalone Studio application and its schema to this project, not just the schema, as required by `AGENTS.md`. Propose `gema-vertex.sanity.studio` as the hosted Studio URL; if that name belongs elsewhere or requires another choice, request the name before publishing.
4. Configure only the Studio origins required for its actual local/hosted authoring access. Server-to-server web reads do not need browser CORS access. Do not add broad wildcard origins.
5. The task supplies no authored course content or search configuration. Do not import invented courses, create search-context documents, or overwrite existing documents to satisfy a generic deployment checklist. Use existing data for read-only smoke checks and local fixtures for populated cases.
6. Verify authenticated published reads using the actual server data layer. Confirm draft-only records are not returned and that a genuinely private dataset cannot supply content without appropriate access; do not treat an anonymous HTTP 200 with empty results as proof that the token works.

## Expected files

| Area | Files and changes |
| --- | --- |
| Studio app | `studio/package.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/tsconfig.json`, `studio/eslint.config.mjs`, `studio/structure.ts`, `studio/.env.example`, and optional version-compatible TypeGen config. |
| Schemas | `studio/schema-types/index.ts`, document schemas for course, lesson, instructor, category, and embedded definitions for module, outcomes, resources, and Portable Text. Small validation helpers only where reused. |
| Generated contracts | `studio/schema.json` and `sanity/types.ts`. |
| Server integration | Update `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`; add `sanity/lib/fetch.ts`, `sanity/lib/queries.ts`, and `sanity/lib/data.ts`, with focused tests. Remove the unused `sanity/lib/live.ts`. |
| Embedded migration | Remove `app/studio/[[...tool]]/page.tsx`, move root `sanity.config.ts`, `sanity.cli.ts`, `sanity/structure.ts`, and the empty schema registry into the standalone app as appropriate. |
| Workspace and quality | `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.json`, `eslint.config.mjs`, and Vitest config as needed. Keep Studio out of the web compilation and give it its own checks. |
| CI | Update `.github/workflows/gema-quality.yml` to validate the Studio and generated contracts alongside the existing web checks, without adding private read tokens to routine builds. Preserve existing audits and peer checks. |
| Documentation and environment | Update `.env.example`, `.gitignore`, README, and this prompt's implementation notes. Ignore nested Studio dependencies, builds, generated runtime caches, and actual environment files; example files must stay trackable. |

## Security and scope boundaries

- Never read or print existing environment files, secret tokens, credential stores, or credential-bearing CLI output. Do not put secret material in generated types, schemas, logs, Studio bundles, browser props, screenshots, or Git.
- Use a read-only token in web runtime code. Authoring writes belong to Sanity Studio through its authenticated author session, not to a web client.
- Preserve Clerk, the current public pages, the 1440 px layout, the search shortcut, and `/design-system`.
- No learner progress model, user writes, video intelligence documents, ingestion pipeline, Sanity Context integration, LLM/search endpoints, analytics, payment processing, or new product pages are part of this task.
- This is an empty-schema separation and implementation, not a migration from a legacy CMS. Do not run content migrations or install the Context plugin.

## Acceptance criteria

1. The Studio runs and builds independently, displays the four document lists, and edits ordered modules and lesson references inside courses.
2. The schemas follow the fixed relationships and include the required marketing, teaching, instructor, and taxonomy content with useful validation and previews.
3. Generated types cover the schemas and query results, and the read layer exposes typed, parameterized, published-only functions with honest missing/error behavior.
4. Credentials and read operations remain server-only. The intended dataset is private before private-dataset verification is reported as passed.
5. Existing web behavior and tests continue to pass, and the embedded Studio no longer participates in Next.js routing or builds.
6. Both packages pass their appropriate checks; the Studio application/schema deployment and actual live reads are verified or their precise external blocker is reported.

## Checks and exact manual test steps

For this preparation stage, review the new prompt and Git status. Only `prompts/sanity-content-model.md` should change; pre-existing local agent directories remain untouched.

After approval:

1. Run `pnpm install`, peer checks, schema extraction, and TypeGen using the checked CLI syntax. Confirm generated artifacts are deterministic with a second generation.
2. In web, run Next.js type generation if needed, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test`, and `pnpm build`. Run the existing CI audit commands and report actual results; do not weaken policies to make them pass.
3. In Studio, run its TypeScript, lint, meaningful tests, and production build through `pnpm --dir studio`. Validate registered schemas with the CLI. Confirm the root web checks do not compile Studio source or build output.
4. Start web on 3000 and Studio on 3333. Verify `/` and `/design-system` still respond and Clerk controls still work. Confirm `/studio` is no longer an embedded editor and README points authors to the independent Studio.
5. Open Studio and confirm Courses, Lessons, Instructors, and Categories. In an unsaved draft, verify required fields and invalid price/duration/URL values produce clear errors. Do not publish verification-only data to production.
6. Check that module and lesson order is editable, duplicate lesson references are rejected, image alt text is available, and Portable Text notes/bio have the expected formatting controls.
7. Verify the course-scoped lesson context, generated numbering, pagination, and missing-data cases with local fixtures. Run safe live read-only smoke calls against the configured private dataset; empty real content must remain empty.
8. Deploy the validated standalone Studio and schema, verify the project/dataset/host, and confirm the hosted Studio loads with Sanity author authentication. Report any unavailable permission, plan, token, or hostname precisely.
9. Inspect the final diff, configuration boundaries, and ignored files without opening secrets. Report files changed, checks actually run, deployment status, and any user-dependent step.

## Implementation notes

- The existing plan allowed changing `production` to private; visibility was changed and independently confirmed. Documents are private, while Sanity image/file CDN assets remain public, as documented in README.
- A Viewer token was created through the authenticated CLI and written directly to ignored root configuration without printing it. No content records were created or imported.
- The installed CLI supports TypeGen settings in `studio/sanity.cli.ts`; no legacy JSON configuration was needed. Eight queries and 24 schema types generated successfully. A second extraction/generation produced identical SHA-256 hashes for both artifacts.
- Studio schema validation reported zero errors and zero warnings, and the standalone production build passed. The app and its schema were deployed to `https://gema-vertex.sanity.studio/`, application ID `vb5jwmyqwze9xjdpld9cqd6i`.
- The authenticated live smoke check returned zero courses, instructors, and categories, zero draft records in the published perspective, and rejection of a deliberately invalid credential. Populated relationships were checked through local fixtures, not invented production content.
- The initial web build compiled successfully but Next.js then stopped for a security recommendation. The production audit identified GHSA-mfr8-8qww-v76h in the pre-existing Next.js 16.4.3 dependency. The user explicitly approved extending scope to patch Next.js and eslint-config-next to 16.4.5 and repeat checks. The existing audit thresholds are preserved.
- After the authorized patch, web and Studio TypeScript/lint checks passed, both production builds passed, and all 47 tests passed (18 existing UI tests, 24 data/query tests, and five Studio validation tests). Web lint retains eight pre-existing warnings; Studio schema validation has zero warnings.
- Peer checks and both CI audit thresholds passed. The production dependency audit reported no known vulnerabilities; the full dependency audit retains one moderate issue below its existing high-severity threshold.
- Browser verification confirmed the home page, Clerk signed-out controls, search shortcut, course anchor, and design-system pagination. The old embedded `/studio` returns 404. The hosted Studio loads the Sanity login flow, and the user explicitly confirmed seeing Courses, Lessons, Instructors, Categories, and their forms after signing in.
- Both actual environment files, nested Studio dependencies, and Studio build output are ignored; both environment examples remain trackable. The Studio bundle contains neither the web read-token variable nor Clerk secret-key references. No commit or push was performed.
