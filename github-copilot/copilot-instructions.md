# Copilot Instructions — DemoApp Frontend

## Project Overview

This is the **DemoApp** frontend — an Angular 20 SPA for case workers to manage case records and generate documents. It authenticates via Azure AD (MSAL), consumes a .NET backend API, and deploys on Azure App Service behind nginx.

## Architecture Rules

- Use **standalone components** — no NgModules
- Lazy-load page routes via `loadComponent` with dynamic `import()`
- All routes except `/service-unavailable` must have `MsalGuard`
- Services use `@Injectable({ providedIn: 'root' })` with `private readonly http: HttpClient`
- Build API URLs from `environment.backendUrl` — never hardcode base URLs
- Handle HTTP errors with `catchError` + `throwError` in services
- Global errors are caught by `GlobalErrorHandler` and forwarded to Application Insights

## Code Style

- Component selector prefix: `app-` (kebab-case)
- File naming: kebab-case (`*.component.ts`, `*.service.ts`, `*.spec.ts`)
- All functions must have explicit return types (`@typescript-eslint/explicit-function-return-type`)
- Use `const` by default (`prefer-const` enforced)
- Imports must be sorted (case-sensitive, no separated groups)
- Use `===` for equality (`eqeqeq` enforced, smart mode)
- No `console.log` — use `console.info`, `console.warn`, or `console.error`
- Prettier: 120 char width, single quotes, trailing commas es5, 2-space indent
- SCSS files use double quotes
- Data models are TypeScript interfaces (not classes), stored in `src/app/shared/models/`
- Constants go in `src/app/shared/constants.ts` as named exports
- Utility functions go in `src/app/shared/utilities/` as pure functions

## Testing

- Jest 29 with jest-preset-angular, jsdom environment
- Unit tests: `*.spec.ts` next to the source file
- A11y tests: `*.a11y.test.ts` next to the source file, using jest-axe
- Test structure: `describe('ComponentName')` → `it('should ...')`
- Mock services with `jest.Mocked<ServiceType>` and provide via `useValue` in TestBed
- For date-dependent tests, use `jest.useFakeTimers()` + `jest.setSystemTime()`
- Every new component should have both a `*.spec.ts` and a `*.a11y.test.ts`

## Security — Hard Constraints

- **NEVER** log PII (names, DOB, contact info, diversity data)
- **NEVER** disable MsalGuard or security interceptors
- **NEVER** hardcode secrets, tokens, or connection strings
- Use `#{token}#` pattern for values replaced at deploy time
- Flag changes to `app.config.ts`, interceptors, or environment files for human review

## PR Review Guidance

- Check for security anti-patterns (hardcoded secrets, PII logging, disabled auth)
- Verify new components have a11y tests
- Confirm naming conventions (kebab-case files, `app-` prefix selectors)
- Watch for new dependencies — Angular Material, RxJS, uuid, jest-axe already available

## Common Patterns

### New service

```typescript
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private readonly baseUrl = `${environment.backendUrl}/api/my-resource`;

  constructor(private readonly http: HttpClient) {}

  getData(id: number): Observable<MyModel> {
    return this.http.get<MyModel>(`${this.baseUrl}/${id}`).pipe(
      map((data) => data),
      catchError((error) => throwError(() => error))
    );
  }
}
```

### New component unit test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';
import { MyService } from '../../services/my.service';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let mockMyService: jest.Mocked<MyService>;

  beforeEach(async () => {
    mockMyService = {
      getData: jest.fn(),
    } as unknown as jest.Mocked<MyService>;

    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [{ provide: MyService, useValue: mockMyService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### New accessibility test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MyComponent } from './my.component';

expect.extend(toHaveNoViolations);

describe('MyComponent Accessibility', () => {
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
  });

  it('should have no accessibility violations', async () => {
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
});
```
