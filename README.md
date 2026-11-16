
# GEMA Vertex

GEMA Vertex is a learning platform built with Next.js, React, and TypeScript.

The project focuses on creating a modern, responsive learning experience with reusable UI components, course discovery, and user authentication.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS and CSS Modules
- **Authentication:** Clerk
- **Icons:** Lucide React
- **Package Manager:** pnpm
- **Testing:** Vitest and React Testing Library
- **Code Quality:** ESLint, TypeScript, and GitHub Actions
- **Security:** CodeQL, Dependabot, and dependency auditing

## Getting Started

### Prerequisites

For local development, we recommend:

- Node.js 22
- pnpm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Alan-Sera/learning-platform.git
cd learning-platform
```

Install dependencies:

```bash
pnpm install
```

### Environment Configuration

The application uses Clerk for authentication.

Environment variables are managed locally and must never be committed to the repository.

Refer to `.env.example` for the required variable names.

To configure Clerk, follow the authentication setup instructions below.

### Development Server

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

The application automatically reloads when source files change.

## Authentication

GEMA Vertex uses Clerk for user authentication and session management.

The integration includes:

- User registration
- User sign-in
- User sign-out
- Session management
- Authentication-aware navigation
- User profile controls

### Clerk Setup

The Clerk SDK is already integrated into the project.

For a new local checkout, authenticate with the Clerk CLI:

```bash
pnpm dlx clerk@latest auth login
```

Link the local project to the appropriate Clerk application:

```bash
pnpm dlx clerk@latest link
```

Select an application you are authorized to access.

Pull the development environment variables:

```bash
pnpm dlx clerk@latest env pull
```

The CLI retrieves the credentials associated with the selected application.

Do not print, share, or commit real credentials.

### Required Environment Variables

The project uses the following Clerk environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`

Refer to `.env.example` for the expected configuration.

### Security Guidelines

- Never commit real API keys, tokens, or secrets.
- Keep local environment files excluded by `.gitignore`.
- Never expose `CLERK_SECRET_KEY` to client-side code.
- Only use publishable keys and explicitly public configuration in the browser.
- Keep development and production credentials separate.
- Manage production authentication settings through authorized Clerk configuration.
- Do not store credentials in documentation, screenshots, or commit messages.

### Authentication Routes

| Route | Description |
|-------|-------------|
| `/sign-in` | Sign in to an existing account |
| `/sign-up` | Create a new account |
| `/` | Public homepage |

Public browsing remains available without authentication.

The Clerk middleware provides authentication context but does not automatically protect every route. Private resources must enforce their own authorization requirements.

### Clerk Diagnostics

Run the Clerk diagnostic tool:

```bash
pnpm dlx clerk@latest doctor
```

Additional authentication settings, such as social login providers and production domains, are managed separately through Clerk.

Official documentation:

https://clerk.com/docs

## Project Structure

```text
app/
  layout.tsx           # Root layout and Clerk provider
  page.tsx             # Homepage
  sign-in/             # Sign-in route
  sign-up/             # Sign-up route
  design-system/       # Design system page

components/
  auth/                # Authentication UI
  brand/               # Brand components
  cards/               # Reusable cards
  home/                # Homepage components
  nav/                 # Navigation
  ui/                  # Shared UI components

lib/                   # Shared data and utilities
public/                # Static assets

.github/
  workflows/           # CI workflows

proxy.ts               # Clerk middleware integration
```

This structure may evolve as new features are implemented.

## Design System

GEMA Vertex uses reusable components and consistent visual styles.

The interface is designed to support:

- Responsive layouts
- Reusable UI components
- Consistent typography and spacing
- Accessible navigation
- Authentication-aware interfaces

The project uses Inter and Playfair Display through `next/font/google`.

Shared interface components are maintained in `components/ui/`.

## Development Commands

### Start Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

### TypeScript Validation

```bash
pnpm exec next typegen
pnpm exec tsc --noEmit
```

### ESLint Validation

```bash
pnpm exec eslint .
```

### Dependency Audit

```bash
pnpm audit --audit-level high
```

### Dependency Compatibility

```bash
pnpm peers check
```

## GEMA Quality

GEMA Vertex uses an internal quality process called **GEMA Quality**.

GEMA Quality v1.2 combines automated checks and code review practices to support stable development.

### Automated Quality Checks

The GitHub Actions workflow includes:

- ESLint validation
- Next.js type generation
- TypeScript validation
- Automated unit and component tests
- Dependency security auditing

Additional repository security tools include:

- GitHub CodeQL
- Dependabot

A successful automated workflow does not replace functional testing, visual review, or security review.

### Local Validation

Before submitting a Pull Request, developers should run:

```bash
pnpm peers check
pnpm test
pnpm exec next typegen
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm build
pnpm audit --audit-level high
```

Fix relevant failures before requesting integration.

### Testing

Component and unit tests use Vitest and React Testing Library.

Tests should be added or updated when implementing behavior that can be reliably validated automatically.

Authentication workflows should also be verified through appropriate functional testing.

## Git Workflow

Development follows a branch-based workflow.

The `main` branch is the primary integration branch.

New features and fixes should be developed in separate branches.

### Branch Naming

Examples:

```text
feat/clerk-auth
feat/course-dashboard
feat/user-profile
fix/navbar-responsive
chore/update-dependencies
```

### Create a Feature Branch

Update the local `main` branch:

```bash
git switch main
git pull --ff-only origin main
```

Create a new feature branch:

```bash
git switch -c feat/feature-name
```

### Commit Changes

Review modified files before staging:

```bash
git status
git diff
```

Stage only the files related to the feature.

Create a descriptive commit:

```bash
git commit -m "feat: describe the implemented feature"
```

Push the branch:

```bash
git push -u origin feat/feature-name
```

### Pull Requests

Before merging a Pull Request:

1. Review all changed files.
2. Verify that no secrets or unrelated files are included.
3. Run local quality checks.
4. Verify the production build.
5. Review responsive and functional behavior.
6. Confirm that required GitHub checks pass.
7. Resolve relevant review comments.
8. Merge into `main`.

Feature branches should remain focused on a single feature or related set of changes.

## Security Practices

The project follows these development guidelines:

- Do not commit environment files containing real credentials.
- Never expose server-side secrets in frontend components.
- Validate authentication and authorization where protected resources are accessed.
- Review dependency security alerts.
- Avoid committing unrelated files or local development artifacts.
- Keep dependencies updated through reviewed changes.
- Use Pull Requests for integration into `main`.

Security vulnerabilities and dependency updates should be tracked and reviewed before integration.

## Deployment

GEMA Vertex is built with Next.js and can be deployed to a compatible hosting environment.

Before production deployment:

1. Configure production environment variables.
2. Configure the appropriate production Clerk instance.
3. Verify authentication domains and redirect URLs.
4. Run all required quality checks.
5. Verify the production build.
6. Test critical application functionality.

Never reuse development secrets as production credentials.

Deployment configuration may evolve as the infrastructure is finalized.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [pnpm Documentation](https://pnpm.io)
- [Vitest Documentation](https://vitest.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Project Status

GEMA Vertex is under active development.

Features, architecture, and documentation will continue to evolve as the platform grows.

## Sanity content and standalone Studio

The Next.js application is the repository's root package. `studio/` is a separate Sanity authoring package in the pnpm workspace, with its own Vite development server, build, and deployment. The former embedded `/studio` route has been removed.

The existing project is **GEMA-vertex** (`2xjwyukn`), using the **private** `production` dataset. Studio authors sign in with Sanity project membership; learners continue to use Clerk.

```text
course document
  +-- instructor ? instructor document
  +-- category ? category document
  +-- modules[] (ordered embedded objects)
        +-- lessons[] ? lesson documents (ordered references)
```

Courses hold the marketing fields, price/currency, outcomes, and curriculum. Lessons hold provider video URLs, duration in seconds, Portable Text notes, key points, tips, and resources. Instructor biographies also use Portable Text. Images have alt text and crop/hotspot support. Module and lesson numbers, counts, and total duration are derived; lessons do not store parent course IDs. A lesson can belong to multiple courses, but may occur only once within each course. Prices use major currency units (for example, `49.99` USD), with USD as the initial currency.

### Local setup

```bash
pnpm install
```

Create `studio/.env.local` from the variable names in `studio/.env.example`. Only public identifiers belong there:

```dotenv
SANITY_STUDIO_PROJECT_ID=2xjwyukn
SANITY_STUDIO_DATASET=production
```

The root `.env.local` requires `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and a server-only `SANITY_API_READ_TOKEN` with Viewer access. Use `.env.example` as the canonical variable list. Never put a token in `NEXT_PUBLIC_*` or `SANITY_STUDIO_*` variables. Actual environment files remain ignored.

Run the apps in separate terminals:

```bash
pnpm dev
pnpm studio:dev
```

Web: http://localhost:3000. Studio: http://localhost:3333. The Studio's configuration does not import the web environment or read token. Sanity's private dataset protects document reads; Sanity image/file CDN assets are still publicly addressable, so do not upload confidential files expecting dataset privacy to protect them.

### Server data access

Server Components and server modules can import these functions from `sanity/lib/data.ts`:

- `getCourses({ offset?, limit? })`
- `getCourseBySlug(slug)`
- `getLessonBySlug(slug)`
- `getCourseLessonContext(courseSlug, lessonSlug)`
- `getInstructors({ offset?, limit? })` and `getInstructorBySlug(slug)`
- `getCategories({ offset?, limit? })` and `getCategoryBySlug(slug)`

List results contain `items` and `total`; the default page size is 24 and the maximum is 100. Slugs and pagination are validated before querying. Detail functions return `null` when missing. Configuration, network, and authorization errors are propagated, not converted to empty content.

`getCourseLessonContext` uses reverse references and the supplied course slug to resolve a reused lesson correctly. It derives `moduleNumber`, `lessonNumber`, and `lessonLabel` from the authored arrays. Course/list projections omit full lesson notes and preserve array keys and order. Missing/unpublished referenced lessons remain nullable.

The credentialed client, fetch wrapper, and data entry points use `server-only`. They read only the published perspective, disable stega and the Sanity CDN, and use `cache: 'no-store'`. Configuration is checked when a read is requested, so unused integration code does not require credentials during a web build. When consuming an uncached read in a page, put that content behind a nearby React `Suspense` boundary because Cache Components is enabled.

The current home page continues to use local fixtures. This task does not implement search, live preview, a browser content client, content writes, transcript ingestion, or video playback.

### Schema types and checks

```bash
pnpm sanity:typegen
pnpm studio:check
pnpm studio:build
pnpm exec tsc --noEmit
pnpm lint
pnpm test
pnpm build
pnpm sanity:smoke
```

The Studio CLI config owns TypeGen. It extracts `studio/schema.json`, scans `sanity/lib/queries.ts`, and writes `sanity/types.ts`. Keep both generated artifacts in Git and regenerate after schema/query changes. CI regenerates them and checks for drift, then checks both applications. Existing pnpm overrides, peer checks, and audits remain active. No private read token is needed for ordinary CI builds; `SANITY_CI_PROJECT_ID` is the existing repository variable used for public project configuration.

`sanity:smoke` loads the root local environment internally and exercises the real read layer, checks the published perspective, and confirms an invalid token is rejected. It does not create or publish content or print credentials. Empty production content is reported as empty; populated relationships are covered by local GROQ fixtures in the automated tests.

### Authoring and deployment

Create categories and instructors, then lessons, then a course containing ordered modules and lesson references. Incomplete drafts can be saved; required fields, safe URLs, positive duration, non-negative counts/prices, and unique curriculum references are validated before publication.

```bash
pnpm --dir studio exec sanity schemas validate
pnpm --dir studio deploy
```

The approved hosted Studio name is `gema-vertex.sanity.studio`. Deploy the actual Studio app and schema together. Sanity project members authorize in the Studio; no API token is embedded in its bundle. Deployments and changes to dataset privacy should always target the existing project/dataset rather than creating a replacement. No seed content was imported.
