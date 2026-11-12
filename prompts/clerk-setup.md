# Implementation prompt: Set up Clerk for Vertex

## Goal and approval

Integrate Clerk authentication into the existing Vertex Next.js app using the Clerk CLI and the user's Dashboard-selected application, `app_3LykvyDO06u70PTDdptVM2kmvUn`. Add visible sign-in, sign-up, and signed-in account controls, then start and verify the app.

Before installation or application changes, show the checklist from the user's attached setup instructions and obtain a Yes. Present this prompt for approval in the same question panel so one approval covers the concrete implementation and the checklist. This task does not authorize committing, pushing, or updating the existing home-page PR.

## Instructions, skills, and documentation reviewed

- `AGENTS.md`: prompt approval, existing architecture, UI reuse, private keys, checks, and manual test reporting.
- The user's attached Clerk setup instructions, including their existing application ID and Next.js selection. These take precedence over older instructions in installed skills.
- `.agents/skills/clerk/SKILL.md`: routes authentication setup to the setup and CLI skills and identifies current SDK patterns.
- `.agents/skills/clerk-setup/SKILL.md`: CLI-first setup, mandatory checklist, existing-application flow, provider placement, auth controls, and verification.
- `.agents/skills/clerk-cli/SKILL.md`: pnpm runner, host authentication, help-based command discovery, explicit application targeting, and secret handling.
- `.agents/skills/react-best-practices/SKILL.md` and `rules/async-suspense-boundaries.md`: keep session-dependent UI behind a small streaming boundary.
- Installed Next.js guides: `01-app/01-getting-started/16-proxy.md` and `01-app/02-guides/authentication-with-cache-components.md`.
- Official [Clerk CLI documentation](https://clerk.com/docs/cli) and [Next.js quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart.md?manual=1).

## Existing code inspected

- `package.json`: Next.js 16.4.3, React 19.3.1, pnpm 12.15.0, and no authentication dependency. Node.js is 22.17.1.
- `app/layout.tsx`: existing Inter and Playfair Display fonts, metadata, and root layout, without a Clerk provider.
- `app/page.tsx`: the home navbar has an actions slot containing a decorative bell and a sample avatar.
- `components/nav/navbar.tsx`, its CSS Module, and `components/ui/button.tsx`: reusable navigation and typed button styles.
- `next.config.ts`: Cache Components and partial prefetching are already enabled.
- `.gitignore`: environment files and generated artifacts are excluded; `.env.example` needs an explicit exception.
- Application routes, components, and utilities contain no existing authentication provider, session implementation, or user-record integration. No proxy or middleware file exists.
- No shadcn configuration or Clerk claim file exists. Existing environment files were not opened or printed.

## Decisions and implementation steps

1. Reuse the installed Clerk skills and run the CLI through `pnpm.cmd dlx clerk@latest`; do not install the CLI globally or reinstall skills.
2. Inspect CLI version and command help. Use the host execution context for authentication-sensitive commands. If the CLI requires login, have the user run `pnpm dlx clerk@latest auth login` in their own host terminal before accessing their selected application. Dashboard login is not CLI login.
3. Initialize this existing application using `pnpm.cmd dlx clerk@latest init --app app_3LykvyDO06u70PTDdptVM2kmvUn --no-skills`, adding noninteractive flags only as supported by CLI help. Let it detect Next.js and pnpm. Do not create an accountless app, use replacement-app flags, switch another linked app, or select a different application.
4. Review the CLI's application changes and finish only the missing integration according to its output and the current quickstart. Install the current `@clerk/nextjs` SDK compatible with the project's installed versions; keep unrelated package versions stable.
5. Put `ClerkProvider` inside the existing `<body>` and preserve the fonts, metadata, and layout. Keep `cacheComponents` enabled.
6. Use root `proxy.ts` with `clerkMiddleware()` and the official matcher, skipping static assets and including Clerk endpoints. All existing browsing remains public; there are no private product routes in this task.
7. Provide on-site catch-all sign-in and sign-up routes using Clerk's prebuilt components, each inside a nearby `Suspense` boundary with suitable loading content.
8. Replace the sample home avatar with real auth controls in the existing navbar actions slot: Sign in and Sign up when signed out, and `UserButton` when signed in. Use current `Show`, `SignInButton`, and `SignUpButton` APIs and shared button presentation where appropriate. Keep server-side session reads inside `Suspense`; avoid adding a duplicate global header.
9. Keep the 1440 px frame, existing hero, local courses, search shortcut, and design-system component defaults. Make the enlarged auth action area fit the mobile header using scoped CSS if needed. Notifications and My Learning retain their current presentational scope. Following the user's approved integration correction, show the decorative bell only inside the signed-in branch, grouped beside `UserButton` with a 20 px gap on desktop and 12 px on mobile. Signed-out and loading states must not show the bell.
10. Let the CLI write development environment configuration without opening or printing its contents. Create a tracked `.env.example` with placeholders and only the variable names actually used by this integration. Include publishable and secret key names, on-site auth URL variables, and fallback redirect URLs to `/` as needed. Ignore `.clerk/`, retain ignored real environment files, and explicitly allow `.env.example`.
11. Add short local authentication setup instructions to README. Do not change Clerk instance settings, social providers, billing, organizations, production configuration, or existing users.

## Expected files

- `package.json` and `pnpm-lock.yaml`: Clerk SDK and its resolved dependencies.
- `app/layout.tsx` and new root `proxy.ts`: provider and request integration.
- `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`: on-site prebuilt flows, unless the CLI uses equivalent route-group locations.
- `components/auth/auth-controls.tsx`, optional scoped auth CSS, and `app/page.tsx`: authentication controls and the existing header slot.
- `components/nav/navbar.module.css` or `app/home.module.css` only if auth controls require responsive adjustments.
- `.gitignore`, new `.env.example`, and README: safe local configuration and setup documentation.
- CLI-written development environment and Clerk link state remain local and private. Review any extra CLI-generated files before keeping them.

## Security and boundaries

- Never read or print existing environment files, private claim files, secret keys, CLI tokens, or credential-bearing URLs. Never ask for secrets in chat.
- Only the publishable key may be available in browser code. `CLERK_SECRET_KEY` remains server-only in ignored local configuration.
- Authentication UI visibility is not authorization. Future private reads and writes must validate the session on the server; this task introduces no such data operations.
- Do not build a custom session system, database, user synchronization, backend, analytics, progress tracking, or product routes.
- Do not create users in this existing Clerk application without separate explicit approval. The user will perform their own first sign-up/sign-in verification.

## Acceptance criteria

1. The project uses the selected existing Clerk application with the current compatible SDK and pnpm lockfile.
2. Signed-out visitors can open the on-site sign-in and sign-up flows from the header. Signed-in visitors see their real account menu and can sign out.
3. Public pages remain accessible, assets load, and the home page, search focus shortcut, and `/design-system` work at desktop and mobile widths.
4. Cache Components stays enabled and request-dependent auth UI has the required Suspense boundaries.
5. Real secrets and Clerk private state remain ignored; `.env.example` contains placeholders only.
6. Clerk diagnostics, TypeScript, lint, existing tests, and production build are run and their real results reported. User-controlled login or provider prerequisites are identified precisely if any remain.

## Checks and exact manual test steps

1. Run `pnpm.cmd dlx clerk@latest doctor --json` in the host context after setup; review findings without printing sensitive values.
2. Run `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd lint`, `pnpm.cmd test`, and `pnpm.cmd build`. Fix integration issues without disabling Cache Components.
3. Start or reuse `pnpm.cmd dev`, restarting when environment configuration requires it. Confirm `/`, `/design-system`, `/sign-in`, and `/sign-up` respond and display the intended content.
4. In a signed-out browser, activate both header auth actions by keyboard and mouse; check form loading, focus, and navigation between sign-in and sign-up.
5. Inspect 390, 768, 1440, and 1920 px layouts for readable controls, no horizontal overflow, and the 1440 px maximum frame. Exercise `Cmd/Ctrl + K` and the course anchors.
6. Have the user sign up or sign in with their own account. Confirm the header shows `UserButton`, account management opens, sign-out works, and reload preserves the expected session state. Do not report this step as passed until observed.
7. Review Git status and diff, confirm real environment and Clerk private files are ignored using filename checks only, and verify `.env.example` is trackable.
8. Report completed setup, actual checks, and any required host login or first-user verification. Ask about desired sign-in identifiers and social providers after the basic integration works, before changing settings.

## Implementation and verification notes

- The user completed CLI login in their own terminal. Clerk CLI 4.1.0 linked the selected existing application and installed `@clerk/nextjs` 7.9.25 through pnpm 12.15.0.
- CLI scaffolding provided the provider, proxy, catch-all routes, and ignored development environment configuration. The implementation added native header auth controls, scoped presentation, Suspense loading states, and local redirect settings.
- TypeScript, all 13 existing tests, and production build passed. Lint passed with zero errors and eight pre-existing Tailwind warnings.
- Clerk diagnostics passed for login, selected application, link, and development keys. The only warning is that a production instance is not configured; this task configures development.
- Browser verification loads the existing email/password and Google controls without changing instance settings or creating test users. The app server requires outbound network access to Clerk; sandboxed execution blocked its handshake, so the verified development server runs with that access.
- The user has been asked to verify their own account session. Signed-in account-menu and sign-out verification remain user-dependent until confirmed; no synthetic account or impersonation was used.
