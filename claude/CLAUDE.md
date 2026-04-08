# DemoApp Frontend — AI Coding Assistant Guide

## Project Identity

**DemoApp** frontend — an Angular single-page application for case workers to manage case records and generate documents. Deployed on Azure App Service, authenticated via Azure AD (MSAL), monitored via Application Insights.

**Domain:** A government agency. All code changes must respect the sensitivity of the data handled (personal and case data).

## Architecture & Key Decisions

- **Framework:** Angular 20.0.3, standalone components (no NgModules), TypeScript 5.8 (strict mode)
- **UI:** Angular Material 20, SCSS styling (global styles in `assets/styles/`)
- **State/Data:** RxJS 7.8 observables, no client-side database — consumes a .NET backend API at `/api/*`
- **Auth:** MSAL for Azure AD with redirect interaction type, `MsalGuard` on all routes except `/service-unavailable`
- **Routing:** Lazy-loaded routes for `dashboard`, `edit-record`, `service-unavailable`; `HomeComponent` eagerly loaded at root
- **HTTP:** `HttpClient` with DI-based interceptors — `MsalInterceptor` (auth tokens) and `ServiceUnavailableInterceptor`
- **Error handling:** `GlobalErrorHandler` catches unhandled errors and forwards to Application Insights
- **Build/Deploy:** Docker multi-stage build (Angular build → nginx:alpine), custom nginx CORS config
- **Telemetry:** Application Insights (`trackEvent`, `trackTrace`, `trackException`)
- **Config:** Environment files with `#{token}#` replacement at deploy time (Key Vault in CI/CD)

## Code Conventions

### Components
- Standalone (no NgModules), `app-` prefix, kebab-case selectors
- Explicit `imports` array in component decorator
- SCSS for component styles

### Services
- `@Injectable({ providedIn: 'root' })`
- `private readonly http: HttpClient` constructor injection
- URLs built from `environment.backendUrl` + path
- `catchError` + `throwError` error handling pattern
- Return `Observable<T>` from HTTP methods

### Models & Data
- TypeScript interfaces (not classes) with optional properties (`?`)
- Located in `src/app/shared/models/`
- Constants centralised in `src/app/shared/constants.ts` as named exports

### Utilities
- Pure functions in `src/app/shared/utilities/`
- Each utility file has a corresponding `.spec.ts`

### File Naming
- kebab-case throughout: `*.component.ts`, `*.service.ts`, `*.spec.ts`, `*.a11y.test.ts`

### Linting & Formatting
- **ESLint** enforces: `explicit-function-return-type`, `no-console` (allow info/warn/error), `prefer-const`, `sort-imports` (case-sensitive, no separated groups), `eqeqeq` (smart)
- **Prettier:** 120 char width, single quotes (double in SCSS), trailing commas es5, 2-space indent, auto end-of-line
- `@typescript-eslint/no-explicit-any` is **off** — `any` is used in several places
- `@angular-eslint/component-selector` warns on non-`app-` prefixes

## Testing Standards

- **Jest 29** + jest-preset-angular, jsdom environment
- **Unit tests:** `*.spec.ts` — component tests use `TestBed` with mock services via `jest.fn()`
- **Accessibility tests:** `*.a11y.test.ts` — separate config (`jest.a11y.config.ts`), jest-axe `toHaveNoViolations()`
- **Test naming:** `describe('ComponentName')` → `it('should ...')`
- **Mocking:** `jest.Mocked<Service>` with `useValue` in TestBed providers
- **Date tests:** `jest.useFakeTimers()` + `jest.setSystemTime()`
- **Coverage:** v8 provider, output to `coverage/`, junit reporter for CI
- **A11y tests** are excluded from the main test run (`testPathIgnorePatterns`) and run separately

## Security & Compliance

> This is a **government system** handling sensitive case data. Security is non-negotiable.

- **NEVER** log PII (names, DOB, contact info, diversity data) — not in console, not in telemetry
- **NEVER** disable `MsalGuard` or security interceptors to work around issues
- **NEVER** hardcode secrets, tokens, or connection strings — use `#{token}#` pattern for deploy-time replacement
- **NEVER** set `piiLoggingEnabled: true` in MSAL config
- MSAL `piiLoggingEnabled: false` is explicitly set in `app.config.ts`
- OWASP dependency checks run in the PR pipeline
- SonarCloud analysis on every PR
- Flag changes to `app.config.ts`, `interceptors/`, or `environment*.ts` for human review

## Commands Quick Reference

```
Run locally:       npm start              (serves on localhost:4444)
Build:             npm run build
Test:              npm test
Test with coverage: npm run test-coverage
A11y tests:        npm run test:a11y
Lint:              npm run lint
```

## Beyond the IDE

- **PR reviews:** Check for security anti-patterns, a11y test coverage for new components, naming convention violations
- **Observability:** Application Insights — use `trackEvent` for business events, `trackTrace` for diagnostics, `trackException` for errors
- **Dependencies:** Before adding new packages, check `package.json` — Angular Material, RxJS, uuid, jest-axe are already available
- **Refactoring:** Preserve test coverage, break into small focused commits
