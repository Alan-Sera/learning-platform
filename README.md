
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
