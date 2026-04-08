# Guide: Generating AI Coding Assistant Instruction Files

Use this guide to generate project-specific instruction files for **Claude Code** (`CLAUDE.md`) and **GitHub Copilot** (`.github/copilot-instructions.md`). These files encode your project's architecture, conventions, security rules, and testing standards so that AI assistants produce code that fits your codebase — not generic boilerplate.

---

## What You'll Produce

| File | Tool | Location | Purpose |
|------|------|----------|---------|
| `CLAUDE.md` | Claude Code | Repository root | Detailed project guide — architecture, conventions, security, commands, and beyond-code workflows (PR reviews, documentation, incident support) |
| `.github/copilot-instructions.md` | GitHub Copilot | `.github/` directory | Concise imperative rules — patterns, constraints, and code snippets that fit Copilot's context window |

Both files encode the **same project knowledge**, formatted for each tool's consumption model:
- `CLAUDE.md` is narrative and comprehensive — Claude Code reads it as an onboarding document.
- `copilot-instructions.md` is terse and imperative — every token counts against Copilot's context budget.

---

## Prerequisites

- **Claude Code** CLI installed and authenticated, **or** **GitHub Copilot** extension active in VS Code
- Terminal access to your project repository
- The repository should have existing code — these files are generated from what the AI observes, not from thin air

---

## Step-by-Step Instructions

### Option A: Using Claude Code (Plan Mode)

1. Open your terminal and `cd` into the project root:
   ```bash
   cd /path/to/your/project
   ```

2. Launch Claude Code in plan mode:
   ```bash
   claude /plan
   ```

3. Paste the **full prompt** from the [Prompt Reference](#prompt-reference) section below.

4. Claude Code will propose a plan — **review it** before approving. This is the most important step. Check that it identified the right:
   - Build files and framework versions
   - Module/package structure
   - Testing setup
   - CI/CD configuration

5. Approve the plan. Claude Code will scan your repo and generate both files.

6. Review the output. See [After Generation](#after-generation) for what to check.

### Option B: Using GitHub Copilot (VS Code Plan Mode)

1. Open your project in VS Code.

2. Open the Copilot Chat panel (`Ctrl+Shift+I` / `Cmd+Shift+I`).

3. Switch to **Plan mode** (select the plan icon).

4. Paste the **full prompt** from the [Prompt Reference](#prompt-reference) section below.

5. Copilot will analyse your workspace and generate both files. It may ask clarifying questions — answer them based on your project's specifics.

6. Review the output. See [After Generation](#after-generation) for what to check.

### Option C: Using Claude (claude.ai or API) with Manual Context

If you don't have CLI access but want to use Claude via the web interface:

1. Gather key files from your project:
   - Build files (`package.json`, `pom.xml`, `build.gradle`, `Makefile`, `Dockerfile`)
   - Linting/formatting configs (`.eslintrc`, `.prettierrc`, `.editorconfig`)
   - CI/CD configs (`.github/workflows/*.yml`, `Jenkinsfile`)
   - 3–5 representative source files (a controller, a service, a test)
   - Any existing `CONTRIBUTING.md` or ADRs

2. Paste the file contents along with the prompt, prefixed with the file paths.

3. Review and adapt the output — without full repo scanning, expect more `[TODO: verify with team]` markers.

---

## Prompt Reference

Copy everything between the start and end markers below. Paste it verbatim into your chosen tool.

<!-- ───────── START OF PROMPT ───────── -->

```text
I need you to create two AI coding assistant instruction files for this repository.
Scan the entire project structure, read key configuration files, and produce:

1. CLAUDE.md — for Claude Code (placed at the repository root)
2. .github/copilot-instructions.md — for GitHub Copilot (placed in .github/)

Both files should encode the same project knowledge but formatted for each tool's
conventions. Do NOT generate generic boilerplate. Every line should be grounded
in what you observe in this repository.

---

## PHASE 1: REPOSITORY ANALYSIS

Before writing anything, investigate and note:

### Architecture & Stack
- Read build files (pom.xml, build.gradle, package.json, Makefile, Dockerfile)
- Identify the language version, framework version, and key dependencies
- Map the module/package structure (monolith, multi-module, microservices)
- Find the entry point(s) and how the application boots
- Check for database migrations, schema files, or ORM configuration
- Identify message brokers, caches, or external service integrations

### Conventions Already in Place
- Read any existing CONTRIBUTING.md, .editorconfig, linting configs
- Examine 3-5 representative source files to extract naming conventions,
  package structure, and error handling patterns
- Check test directories to understand testing framework, naming patterns,
  and what coverage looks like
- Look at git log --oneline -20 to understand commit message conventions
- Check for ADRs (Architecture Decision Records) in docs/ or adr/

### CI/CD & Quality Gates
- Read CI pipeline configs (.github/workflows/, Jenkinsfile, .gitlab-ci.yml)
- Identify what checks run on PRs (linting, tests, SAST, formatting)
- Note any code coverage thresholds or quality gates
- Check for security scanning tools (SonarQube, Snyk, Trivy, etc.)

### Sensitive Context
- Check for security-related patterns (auth, encryption, PII handling)
- Identify any government/regulatory compliance markers
- Note classification markings or data handling policies if present
- Look for environment-specific configs that suggest deployment constraints

### Design System & Frontend
- Check package.json for component library dependencies:
  `govuk-frontend`, `@govuk-react`, `@ministryofjustice/frontend`, or other UI libraries
- Look for Storybook configuration (`.storybook/`, `storybook.config.js`)
- Identify the CSS methodology: BEM, CSS modules, Tailwind, SCSS, CSS-in-JS
- Check for accessibility tooling: `axe-core`, `jest-axe`, `@axe-core/playwright`
- Look for existing component directories and any established naming conventions
- Note any GOV.UK Prototype Kit or design token configuration

---

## PHASE 2: GENERATE CLAUDE.md

Structure the file with these sections. Omit any section that genuinely
doesn't apply, but err on the side of including it.

### Section 1: Project Identity (3-5 lines max)
One-paragraph description: what this system does, who it serves, and why
it exists. Not a README — assume the reader is an AI agent that needs
fast orientation.

### Section 2: Architecture & Key Decisions
- System type (monolith, microservices, modular monolith, serverless)
- Core frameworks and their versions
- Database(s) and data access patterns (JPA, JDBC, R2DBC, etc.)
- Key architectural patterns (hexagonal, layered, CQRS, event-driven)
- Non-obvious constraints ("we use X because of Y" — things you'd tell
  a new team member on day one)
- Reference any ADRs found in the repo: "See docs/adr/ for decision records"

### Section 3: Code Conventions
Extract REAL patterns from the codebase, not generic advice. Include:
- Naming: how classes, methods, variables, packages, database columns are named
- File organisation: where new controllers/services/repositories go
- Error handling: how exceptions are structured (custom exception hierarchy,
  global handler, error response format)
- Logging: which framework, what level conventions, structured vs unstructured
- DTOs vs entities: how data crosses layer boundaries
- Null handling: Optional usage patterns, @Nullable annotations, or alternatives

### Section 3b: Component Library & Design System
If the project uses a component library or design system, document:
- **Which library:** govuk-frontend version (if GDS), or name/version of other libraries
- **GOV.UK Design Principles** (if applicable to a government service):
  - *Start with user needs* — decisions are grounded in user research, not assumed requirements
  - *Plain language* — labels, headings, error messages, and content use clear, simple language
  - *Progressive enhancement* — core functionality works without JavaScript; JS enhances on top
- **Component usage patterns:** how components are imported, wrapped, and composed
- **GDS conventions** (if applicable): govuk-* class usage, Nunjucks macros vs framework wrappers
- **CSS methodology:** naming conventions, file organisation, module approach
- **Accessibility baseline:** WCAG standard enforced (2.1 AA is a legal minimum for UK government
  services under PSBAR; 2.2 is the target); which tooling enforces it (axe-core, jest-axe, Playwright)
- **Custom components:** when to build custom vs use library defaults; naming conventions
- **Design tokens:** how colours, spacing, and typography scales are referenced

### Section 4: Testing Standards
- Testing framework(s) and assertion libraries in use
- Test naming convention (extract from existing tests, don't invent)
- Test structure pattern (Arrange-Act-Assert, Given-When-Then, BDD-style)
- What gets unit tested vs integration tested vs contract tested
- How to run tests locally (exact commands)
- Test data approach (builders, fixtures, factories, Testcontainers)
- Minimum coverage expectations if configured

### Section 5: Security & Compliance Rules
This is critical. Include:
- Authentication/authorisation patterns used in the codebase
- Data classification if discoverable (OFFICIAL, OFFICIAL-SENSITIVE, etc.)
- PII/sensitive data handling patterns
- Secrets management approach (no hardcoded secrets — how are they loaded?)
- Dependency scanning and vulnerability policies
- OWASP Top 10 relevance to this specific application
- If this is a government system: note NCSC guidance applicability,
  Cyber Essentials requirements, and any data sovereignty constraints
- NEVER generate code that logs sensitive data, PII, or auth tokens
- NEVER suggest disabling security features to fix build/test failures

### Section 6: Beyond the IDE — The Other 80%
Engineers spend only 15-20% of their time writing code. Include guidance
for how the AI assistant should help with the remaining 80%:

**Documentation workflows:**
- How to generate/update ADRs when proposing architectural changes
- README and docstring standards found in the codebase
- API documentation approach (OpenAPI/Swagger, Spring REST Docs, etc.)
- When asked to "document this," follow the existing documentation pattern

**PR review assistance:**
- When reviewing a diff, check for: security anti-patterns, test coverage
  gaps, naming convention violations, error handling inconsistencies
- Flag any PR that modifies auth, crypto, or data access layers for
  human security review
- Suggest missing changelog entries if a CHANGELOG exists
- Check that API changes are backward-compatible unless explicitly breaking

**Incident & debugging support:**
- When asked to investigate a bug, start by reading relevant logs and
  error messages rather than guessing
- Know the observability stack (logging framework, metrics, tracing)
- When writing or reviewing log statements, use structured logging with
  correlation IDs if the codebase supports it

**Dependency & supply chain awareness:**
- Before suggesting a new dependency, check if something in the existing
  dependency tree already solves the problem
- Flag dependencies with known CVEs when encountered
- Prefer well-maintained libraries with active security response processes

**Refactoring guidance:**
- When asked to refactor, always preserve existing test coverage
- Propose changes as a series of small, reviewable commits
- If refactoring touches >5 files, suggest breaking it into phases

### Section 7: Commands Quick Reference
List the actual project commands discovered in build files:

Build:       [exact command]
Test:        [exact command]
Lint:        [exact command]
Run locally: [exact command]
Migrations:  [exact command]

### Section 8: .claude/ Folder Setup (Optional Advanced Section)
If the team wants to go further, recommend this structure:

.claude/
├── settings.json              # permissions + config (committed)
├── settings.local.json        # personal prefs (gitignored)
├── commands/
│   ├── review.md              # → /project:review
│   ├── security-check.md      # → /project:security-check
│   └── write-adr.md           # → /project:write-adr
└── rules/
    ├── code-style.md          # extracted from Section 3
    ├── testing.md             # extracted from Section 4
    ├── security.md            # extracted from Section 5
    └── api-conventions.md     # API-specific patterns

For each suggested command, provide the actual markdown content that would
go in the file. For example, a review.md should instruct Claude to check
for the specific patterns and anti-patterns found in THIS codebase.

---

## PHASE 3: GENERATE .github/copilot-instructions.md

GitHub Copilot reads this file for repository-level context. It has a
different consumption model from CLAUDE.md:

- Copilot uses this as persistent context window for ALL interactions
  (completions, chat, PR reviews, workspace agent)
- It should be CONCISE — every token counts against the context budget
- Focus on patterns and constraints, not explanations
- Use imperative voice: "Use", "Never", "Always", "Prefer"

Structure:

### Project Overview (2-3 lines)
[What this is, what stack, what it does]

### Architecture Rules
[Key constraints as imperative bullet points]

### Code Style
[Naming, formatting, patterns — imperative bullets extracted from codebase]

### Testing
[How to write tests that match existing patterns — imperative bullets]

### Security
[Hard constraints — things Copilot must NEVER do and must ALWAYS do]
- Never hardcode secrets, tokens, passwords, or API keys
- Never generate code that logs PII, auth tokens, or session identifiers
- Never disable security annotations or auth checks to resolve errors
- Always use parameterised queries — never concatenate SQL
- Always validate and sanitise user input at trust boundaries
- Flag any changes to authentication, authorisation, or cryptographic
  code for mandatory human review

### Beyond Code: PR Reviews
[How Copilot should behave when reviewing PRs via its review agent]
- Check for missing test coverage on changed code
- Flag backward-incompatible API changes
- Verify error handling follows project conventions
- Ensure new endpoints have appropriate auth annotations
- Check that logging statements don't leak sensitive data

### Beyond Code: Documentation
[How Copilot should help maintain documentation]
- When generating docs, follow the existing documentation format in this repo
- Include @param, @return, @throws tags that match the project convention
- Keep README sections updated when APIs or configurations change

### Component Library & Design System
[Only include if a design system or component library is in use]
- Prefer existing [GDS / library name] components over custom implementations
- Never build a custom component if the design system provides one
- Always run axe-core / jest-axe checks — no new component ships without an accessibility pass
- Apply progressive enhancement: core functionality must work without JavaScript
- Use plain language in all user-facing labels, headings, and error messages
- Start with user needs — link new UI features to documented user research, not assumptions
- [GDS-specific] Use govuk-* class conventions; never override govuk- prefixed styles
- [GDS-specific] Follow the GOV.UK error summary and inline validation patterns for all forms

### Common Patterns
[2-3 short code snippets showing "this is how we do X here" for the
most frequent operations: creating a new endpoint, writing a test,
handling an error, etc. These act as few-shot examples.]

---

## PHASE 4: VALIDATE

After generating both files:

1. Verify every claim against the actual repo (don't hallucinate dependencies)
2. Ensure no secrets, internal URLs, or sensitive paths leaked into the files
3. Check that command examples actually work (reference build file configs)
4. Confirm the .github/ directory exists or create it
5. Flag anything you couldn't determine — use [TODO: verify with team] markers
   rather than guessing
6. If frontend code exists, confirm the component library / design system section is present
7. Check that accessibility standards and enforcement tooling are specified
8. Verify GOV.UK Design Principles are referenced if this is a government service

Write both files now.
```

<!-- ───────── END OF PROMPT ───────── -->

---

## After Generation

### Review Checklist

Run through this checklist before committing the generated files:

- [ ] **Accuracy** — Every framework version, dependency, and command matches your actual project
- [ ] **No hallucinations** — No invented dependencies, phantom config files, or made-up conventions
- [ ] **No secrets leaked** — No internal URLs, API keys, connection strings, or sensitive paths in the files
- [ ] **Commands work** — Run every command listed in the "Commands Quick Reference" section
- [ ] **Security section is present and strict** — Especially for government or regulated projects
- [ ] **TODO markers** — Search for `[TODO: verify with team]` and resolve each one
- [ ] **Code snippets compile** — If `copilot-instructions.md` includes example patterns, verify they match your actual code style
- [ ] **Component library** — If frontend code exists, component library / design system section is present and accurate
- [ ] **Accessibility** — WCAG standard and enforcement tooling are specified
- [ ] **Team review** — Have at least one team member review before merging

### Common Issues and Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Generic boilerplate instead of project-specific content | AI didn't scan enough files | Re-run with explicit pointers: "Read `src/main/java/.../Application.java` and `package.json`" |
| Wrong framework version | Stale lock file or multiple build files | Verify against your lock file (`package-lock.json`, `gradle.lockfile`) |
| Missing security section | No auth patterns detected | Add manually — this section is too important to skip |
| `[TODO: verify with team]` markers | AI was uncertain | Good — it flagged rather than guessed. Resolve with the team |
| Too verbose `copilot-instructions.md` | AI wrote explanations instead of rules | Edit down to imperative bullets. Target < 500 lines |
| No component library section | Frontend project with no design system guidance | Add Section 3b manually — ask the team which library is in use (govuk-frontend, custom, none) |

---

## Maintaining the Files

These are **living documents**. Update them when:

- A major dependency is upgraded (e.g., Angular 19 → 20, Spring Boot 3.2 → 3.3)
- New architectural patterns are adopted (e.g., adding CQRS, switching state management)
- Testing strategy changes (e.g., adding contract tests, switching from Jest to Vitest)
- Security requirements change (e.g., new compliance framework, classification change)
- CI/CD pipeline is restructured

Add a reminder to your team's Definition of Done:
> *If this change introduces a new pattern, convention, or constraint — update `CLAUDE.md` and `.github/copilot-instructions.md`.*

---

## Example Output

For reference, see the example files generated for an Angular 20 government case management application:

- [`claude/CLAUDE.md`](claude/CLAUDE.md) — Full Claude Code instruction file with architecture, conventions, security, testing, and beyond-code guidance
- [`github-copilot/copilot-instructions.md`](github-copilot/copilot-instructions.md) — Concise Copilot instruction file with imperative rules and code snippet patterns

These demonstrate what well-generated files look like. Your output will differ based on your project's stack and conventions.

---

## Workshop Format (Optional)

If you're running this as a team enablement session:

### Preparation
- Ensure attendees have Claude Code CLI or GitHub Copilot extension configured
- Have a shared repository available for a live demo

### Session Flow (60–90 minutes)

1. **Introduction (10 min)** — Why custom instructions matter. AI assistants without project context produce generic code that needs heavy editing. With context, they match your conventions from the first suggestion.

2. **Live demo (15 min)** — Run the prompt against a sample repo. Walk through the plan/analysis phase. Show the output.

3. **Hands-on (30 min)** — Each participant runs the prompt against their own project.

4. **Group review (20 min)** — Compare outputs. Discuss:
   - "What did the AI get wrong?" → Builds critical review habits
   - "What did it surface that you'd forgotten to document?" → Demonstrates value
   - "What's still missing for a new team member?" → Identifies gaps

5. **Wrap-up (10 min)** — Commit the files. Set the expectation that they'll be maintained alongside the codebase.

### Key Talking Points for the "Beyond Code" Conversation

Most teams stop at "AI helps write code faster." Push further:
- How many hours per week does your team spend on PR reviews? Can instruction files speed that up?
- When was the last time someone wrote an ADR? Would a `/project:write-adr` command lower the friction?
- How do you onboard new team members? These files **are** your onboarding accelerator.
