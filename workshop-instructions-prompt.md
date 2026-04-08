# Create instruction files for your AI coding tools

A step-by-step guide for engineers to create `CLAUDE.md` (for Claude Code) and `.github/copilot-instructions.md` (for GitHub Copilot) — tailored to your actual project.

**Time required:** 45–60 minutes for your first project. 15 minutes to update an existing file.

**What you will produce:** One or both instruction files that give your AI coding tool persistent, accurate context about your project — so it stops generating generic code and starts generating code that fits.

---

## Before you start

You need one of the following:

- **Claude Code** installed and authenticated (CLI: `claude` command available in your terminal)
- **GitHub Copilot** active in your IDE (VS Code, IntelliJ, or Visual Studio) with chat enabled
- Both, if your team uses both tools

You also need terminal access to the root of a project you actively work on. The guide works best against a real codebase — not an empty or sample repository.

> **Why bother?** Without instruction files, your AI tool treats every project the same. It guesses your conventions, invents test patterns, and ignores your security constraints. Instruction files fix this — they are your project's memory. Teams using well-maintained instruction files report that AI suggestions match their coding standards on the first attempt far more often, and new team members onboard faster because the files double as living documentation.

---

## Part 1: Gather your project context

This section is the same regardless of which tool you use. You are collecting the raw material that will go into your instruction files.

Work through each question below. Write your answers in a scratch document, or keep them in your head — you will feed them into your chosen tool in Part 2 or Part 3.

### 1.1 What does this system do?

Write one to three sentences describing what the system does, who uses it, and why it exists. Imagine a new team member's first day — what would you tell them before they open the code?

```
Example: "This is the case management API for [service name].
It handles [core operations] for [user type]. It runs on
[hosting environment] and integrates with [key external systems]."
```

If you struggle to articulate this, that is itself a finding — your project may need a better README.

### 1.2 What is the tech stack?

Open your build files and answer these:

| Question | Where to look |
|----------|---------------|
| Language and version? | `pom.xml`, `build.gradle`, `package.json`, `.java-version`, `Dockerfile` |
| Framework and version? | Same build files, dependency declarations |
| Database(s)? | Connection configs, migration folders, ORM configuration |
| Build tool and commands? | `Makefile`, `build.gradle`, `pom.xml`, `package.json` scripts |
| How do you run it locally? | README, docker-compose, or ask a colleague |
| How do you run the tests? | Same places — note the exact commands |
| Component library / design system? | `package.json` dependencies, `.storybook/` config, or ask the frontend lead |

Write down the actual commands. Not what you think they are — open the files and check.

### 1.3 What are your coding conventions?

Do not invent these from memory. Open three to five source files that your team considers "well-written" and note:

| Convention | What to look for |
|------------|------------------|
| Package/folder structure | How are files organised? Where do new controllers, services, and repositories go? |
| Naming patterns | How are classes, methods, variables, and database columns named? |
| Error handling | Is there a custom exception hierarchy? A global error handler? What HTTP status codes do you use for what? |
| Logging | Which framework? What log levels for what situations? Is logging structured or unstructured? |
| Null handling | Do you use `Optional`? Nullable annotations? Something else? |
| DTO patterns | How does data cross layer boundaries? Records, POJOs, builder pattern? |

If your team has an `.editorconfig`, linting config, or `CONTRIBUTING.md`, read those too. They may already encode conventions you have forgotten about.

### 1.3b Component library & design system

If your project has a frontend, answer these before moving on:

| Question | Examples |
|----------|----------|
| Which component library or design system do you use? | govuk-frontend, @govuk-react, @ministryofjustice/frontend, Material, custom Storybook, none |
| What naming conventions apply to components? | e.g. PascalCase files, kebab-case CSS classes, govuk-* prefix |
| How are components documented? | Storybook, inline docs, README per component, nothing |
| What accessibility standard is mandatory? | WCAG 2.1 AA (legal minimum under UK PSBAR), WCAG 2.2, internal standard |
| What CSS methodology is used? | BEM, CSS modules, Tailwind, SCSS, CSS-in-JS |

If your project uses the **GDS (Government Design System)**, also note which GOV.UK Design Principles your team actively enforces:

- **Start with user needs** — are UI decisions linked to user research, not assumed requirements?
- **Progressive enhancement** — does the service work without JavaScript? Is this tested?
- **Plain language** — are labels, headings, and error messages reviewed for clarity?

If you cannot answer these, that is a finding — the team may be building UI without a shared component and accessibility standard.

### 1.4 How does your team test?

Open your test directory and look at two or three existing tests:

| Question | Why it matters |
|----------|----------------|
| What frameworks do you use? (JUnit, pytest, Jest, NUnit, etc.) | The AI will use the wrong assertion library if you do not tell it. |
| What is the test naming pattern? | Copy an actual test name. Do not describe it abstractly — show it. |
| What is the test structure? (Arrange-Act-Assert, Given-When-Then, etc.) | Again, show a real example. |
| Where do unit tests live versus integration tests? | The AI needs to know where to put new test files. |
| How do you handle test data? (Builders, fixtures, Testcontainers, factories) | If you use Testcontainers, say so — otherwise the AI will mock the database. |
| Is there a coverage threshold? | If your CI fails below 80%, the AI should know. |
| Accessibility testing? | jest-axe, @axe-core/playwright, Deque axe DevTools, or none |
| Visual regression testing? | Percy, Chromatic, Playwright screenshots, or none |

### 1.5 What are your security constraints?

This is the most important section. The AI will not infer your security posture — you must state it.

Answer these questions honestly:

1. **What data classification does this system handle?** (OFFICIAL, OFFICIAL-SENSITIVE, SECRET, or commercial equivalent)
2. **What authentication and authorisation patterns does the codebase use?** (OAuth2, SAML, Spring Security, custom middleware, etc.)
3. **Where do secrets come from?** (Environment variables, AWS Secrets Manager, Azure Key Vault, HashiCorp Vault, etc.)
4. **What must never appear in code, logs, or tests?** (PII, authentication tokens, criminal records, health data, etc.)
5. **What security scanning runs in CI?** (SonarQube, Snyk, Trivy, Dependabot, CodeQL, etc.)
6. **Are there regulatory or compliance requirements?** (Cyber Essentials, NCSC guidance, GDPR, PCI-DSS, etc.)
7. **What would get a PR immediately rejected on security grounds?** (Hardcoded secrets? Disabled auth checks? SQL concatenation?)
8. **Does this service fall under the Public Sector Bodies Accessibility Regulations (PSBAR)?** If yes, WCAG 2.1 AA compliance is a legal requirement — record which tooling enforces it and whether it runs in CI.

Be specific. "Follow security best practices" is useless to an AI. "Never log fields from the `PersonalDetails` entity" is useful.

### 1.6 Beyond the IDE — the other 80% of your work

Engineers spend roughly 15–20% of their time writing code. The rest goes to documentation, reviews, debugging, planning, and communication. Your instruction file can cover all of this.

Work through these questions to decide what to include:

**Documentation:**

1. Does your team write Architecture Decision Records (ADRs)? If yes, what format and where do they live?
2. What does your API documentation look like? (OpenAPI/Swagger annotations, Spring REST Docs, hand-written markdown, or nothing?)
3. What standard do you use for code comments and docstrings? (`@param`/`@return`/`@throws`? Google style? NumPy style?)
4. When was the last time someone updated the README? Could the AI help keep it current?

**Pull request reviews:**

1. What does your team check for in a PR review? Write down the actual checklist, even if it is informal.
2. Which files or directories trigger extra scrutiny? (Auth modules, crypto, data access layers, CI configs?)
3. Do you check for backward compatibility on API changes?
4. Is there a CHANGELOG or release notes process?

**Debugging and incident response:**

1. What is your observability stack? (ELK, Splunk, Grafana, CloudWatch, Datadog, etc.)
2. Do you use correlation IDs or distributed tracing?
3. When something breaks at 2am, what does the on-call engineer look at first?

**Design system & component updates:**

1. When adding or modifying a component, what does "done" look like? (Storybook updated? axe-core check passed? PR description includes the GDS version change?)
2. Who reviews component changes for accessibility and design consistency?
3. Is govuk-frontend (or your component library) version-pinned? What is the upgrade process?

**Dependency management:**

1. How often do you update dependencies?
2. Do you have a policy on adding new dependencies? (Approval required? Must be from trusted sources?)
3. Are there specific libraries your team prefers or avoids?

Not every project needs answers to all of these. But the more you include, the more useful your AI tool becomes for the work that actually fills your day.

### 1.7 What does a "good" example look like?

Find one or two short code snippets from your codebase that represent how your team does things. These could be:

- A typical controller/endpoint
- A typical unit test
- A typical error handler
- A typical service method

You will include these as few-shot examples in your instruction files. They are the single most effective thing you can add — they anchor the AI's output to your team's actual style.

---

## Part 2: Create CLAUDE.md (for Claude Code)

> **Skip to Part 3** if you only use GitHub Copilot.

### What is CLAUDE.md?

`CLAUDE.md` is a markdown file at the root of your repository that Claude Code reads automatically every time you start a session. It is your project's persistent context. Claude Code also supports a `.claude/` folder for advanced configuration — commands, rules, permissions, and local overrides.

### Option A: Let Claude Code generate it (recommended for first time)

This is the fastest route. You feed Claude Code your answers from Part 1 and let it scan the repository to fill in details.

1. Open your terminal and `cd` into your project root.

2. Start Claude Code in plan mode:
   ```bash
   claude
   ```

3. Paste the following prompt, replacing the placeholder sections with your answers from Part 1:

````
I need you to create a CLAUDE.md file for this repository.

First, scan the project: read the build files, look at the folder structure,
examine 3-5 representative source files and tests, and check for any existing
CONTRIBUTING.md, .editorconfig, or linting configuration.

Then create CLAUDE.md using the context I provide below combined with what
you discover in the codebase. Every claim in the file must be grounded in
what you actually find — do not invent conventions or guess dependencies.
Use [TODO: verify with team] markers for anything you cannot confirm.

Here is what I know about this project:

**What it does:**
[Paste your answer from 1.1]

**Tech stack:**
[Paste your answer from 1.2]

**Coding conventions we follow:**
[Paste your answer from 1.3]

**How we test:**
[Paste your answer from 1.4]

**Security constraints:**
[Paste your answer from 1.5]

**Beyond code — documentation, PR reviews, debugging:**
[Paste your answers from 1.6 — include only the sections relevant to your team]

**Example of good code in our codebase:**
[Paste 1-2 snippets from 1.7]

Structure the CLAUDE.md with these sections:
1. Project identity (2-3 sentences — what, who, why)
2. Architecture and key decisions
3. Code conventions (extracted from real code, not generic advice)
4. Testing standards (with actual test examples)
5. Security and compliance rules (non-negotiable hard rules as NEVER/ALWAYS lists)
6. Beyond the IDE (documentation, PR review, debugging, dependency guidance)
7. Commands quick reference (verified against build files)

After writing the file, tell me:
- What you discovered that I didn't mention
- What you couldn't verify and marked as TODO
- Whether you recommend setting up a .claude/ folder with commands and rules
````

4. Review the plan Claude Code proposes. This is a learning moment — read what it intends to do before approving.

5. After it generates the file, **read every line**. Check claims against your actual codebase. Fix anything wrong. Remove anything generic that does not apply to your project.

### Option B: Write it manually using a scaffold

If you prefer to write the file yourself, or if you do not have Claude Code CLI access, use this scaffold. Replace every placeholder with your actual project details.

Create a file called `CLAUDE.md` in your repository root:

````markdown
# CLAUDE.md

## Project identity

[2-3 sentences: what this system does, who uses it, why it exists.
Assume the reader is an AI agent that needs fast orientation.]

## Architecture and key decisions

- **Language:** [e.g. Java 21]
- **Framework:** [e.g. Spring Boot 3.4.x]
- **Database:** [e.g. PostgreSQL 15 via Spring Data JPA]
- **Build tool:** [e.g. Gradle with Kotlin DSL]
- **API style:** [e.g. RESTful JSON with OpenAPI annotations]
- **Auth:** [e.g. Spring Security with OAuth2]
- **Key patterns:** [e.g. hexagonal architecture, domain logic has no framework imports]

Constraints:
- [Anything non-obvious: "we use X because of Y"]
- [Reference ADRs if they exist: "see docs/adr/ for decision records"]

## Code conventions

**Package structure:**
```
[paste your actual package tree]
```

**Naming:**
- [How you name classes, methods, variables, endpoints, database columns]

**Error handling:**
- [Your exception hierarchy, global handler, HTTP status code conventions]

**Logging:**
- [Framework, level conventions, structured vs unstructured]
- NEVER log: [list sensitive data types]

**Null handling:**
- [Optional? Annotations? Neither?]

## Component library & design system

[Omit this section if the project has no frontend.]

- **Library:** [e.g. govuk-frontend 4.x / @govuk-react 1.x / custom Storybook / none]
- **CSS methodology:** [e.g. BEM with govuk- prefix / CSS modules / Tailwind]
- **Accessibility standard:** [e.g. WCAG 2.1 AA — enforced by jest-axe in CI]
- **Component naming:** [e.g. PascalCase React components, kebab-case file names]

**GOV.UK Design Principles applied** (delete any that do not apply):
- *Start with user needs* — new UI features are linked to user research; do not add UI for assumed needs
- *Progressive enhancement* — core journeys work without JavaScript; test with JS disabled
- *Plain language* — labels, error messages, and page titles are reviewed for clarity before merging

**GDS-specific rules** (delete if not using GDS):
- Use `govuk-*` class names and component macros; do not create alternatives for existing GDS components
- Follow the GOV.UK error summary pattern for all form validation errors
- Do not override `govuk-` prefixed styles — raise a GDS issue or use a BEM modifier instead

## Testing standards

- **Frameworks:** [e.g. JUnit 5, AssertJ, Mockito, Testcontainers]
- **Naming:** [paste an actual test method name]
- **Structure:** [Arrange-Act-Assert / Given-When-Then]
- **Test data:** [builders, fixtures, factories]
- **Run all tests:** `[exact command]`
- **Run single test:** `[exact command]`

## Security and compliance rules

**This section is non-negotiable.**

**Classification:** [e.g. OFFICIAL, OFFICIAL-SENSITIVE]

NEVER:
- [List things the AI must never do — be specific]
- [e.g. "hardcode secrets, tokens, or API keys"]
- [e.g. "log PII or authentication tokens"]
- [e.g. "disable security annotations to fix compilation errors"]
- [e.g. "concatenate user input into SQL queries"]

ALWAYS:
- [List things the AI must always do]
- [e.g. "validate input on all API endpoints"]
- [e.g. "add auth annotations on new endpoints"]
- [e.g. "use parameterised queries for database access"]

## Beyond the IDE

[Include only the subsections relevant to your team]

### Documentation
- [ADR format and location]
- [API documentation approach]
- [Docstring/comment standards]

### PR review checklist
- [What to check for in every PR]
- [Which files/directories trigger extra scrutiny]

### Debugging
- [Observability stack]
- [Correlation ID / tracing patterns]

### Dependencies
- [Policy on adding new dependencies]
- [Preferred and avoided libraries]

## Commands quick reference

```
Build:        [exact command]
Test:         [exact command]
Run locally:  [exact command]
Lint/format:  [exact command]
Migrations:   [exact command]
```
````

### Setting up the .claude/ folder (optional, recommended)

If you want to go further, create this structure alongside your `CLAUDE.md`:

```
your-project/
├── CLAUDE.md                  # what you just created
├── CLAUDE.local.md            # personal overrides (add to .gitignore)
└── .claude/
    ├── settings.json          # permissions and config (committed)
    ├── settings.local.json    # personal permissions (add to .gitignore)
    ├── commands/              # reusable slash commands
    │   ├── review.md          # → /project:review
    │   ├── write-adr.md       # → /project:write-adr
    │   └── security-check.md  # → /project:security-check
    └── rules/                 # modular instruction files
        ├── code-style.md
        ├── testing.md
        └── security.md
```

**What each piece does:**

`CLAUDE.md` is the team file — committed, shared, everyone gets the same context. `CLAUDE.local.md` is your personal file — gitignored, for your own preferences like "I prefer verbose explanations" or "always suggest the terminal command, not the IDE action."

The `commands/` folder turns repeated prompting into reusable shortcuts. Any markdown file in `commands/` becomes a slash command. For example, `commands/review.md` becomes `/project:review`. Write the instructions once, and anyone on the team can use them.

The `rules/` folder breaks your CLAUDE.md into modular files that Claude Code loads as needed. This is useful when your CLAUDE.md gets long — instead of one massive file, you have focused rule sets.

`settings.json` controls what Claude Code is allowed to do in your project:

```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Edit(src/**)",
      "Edit(docs/**)",
      "Bash(./gradlew *)",
      "Bash(docker build *)"
    ],
    "deny": [
      "Edit(src/main/resources/application-prod.*)",
      "Edit(.github/workflows/**)",
      "Bash(rm -rf *)",
      "Bash(curl *)"
    ]
  }
}
```

The `deny` list matters. It prevents the AI from touching production configs, modifying CI pipelines, deleting files recursively, or making network requests. Set these boundaries before you give the tool editing permission.

**Example command file — `commands/review.md`:**

```markdown
Review the current staged changes (git diff --cached) and check for:

1. Security: new endpoints missing auth, sensitive data in logs,
   hardcoded secrets, SQL injection risks
2. Testing: new public methods without tests, reduced coverage
3. Conventions: naming violations, wrong package placement, generic
   exception catches
4. API compatibility: breaking changes to existing endpoints
5. Documentation: missing Javadoc on public methods, outdated README

For each issue found, state the file, line, what's wrong, and how to fix it.
If everything looks good, say so — don't invent problems.
```

---

## Part 3: Create .github/copilot-instructions.md (for GitHub Copilot)

> **Skip this section** if you only use Claude Code.

### What is copilot-instructions.md?

`.github/copilot-instructions.md` is a markdown file that GitHub Copilot reads as persistent context for every interaction — completions, chat, workspace agent, and code review. It is the Copilot equivalent of CLAUDE.md, but with an important difference: it has a tighter context budget. Every token in this file competes with the code Copilot is looking at, so brevity matters.

### Option A: Let GitHub Copilot Chat generate it (recommended for first time)

1. Open your project in VS Code or IntelliJ with Copilot active.

2. Open Copilot Chat (Ctrl+Shift+I in VS Code, or the chat panel).

3. Use the `@workspace` agent so Copilot can see your full project. Paste this prompt:

````
@workspace I need you to create a .github/copilot-instructions.md file
for this repository.

Scan the project structure, build files, and representative source files
to understand the codebase. Then generate the file using the context
below combined with what you discover.

Rules for the file:
- Keep it concise. Every token counts against Copilot's context budget.
- Use imperative voice: "Use", "Never", "Always", "Prefer"
- Focus on patterns and constraints, not explanations
- Include 2-3 short code snippets as few-shot examples of "how we do things here"

Here is what I know about this project:

**What it does:**
[Paste your answer from 1.1]

**Tech stack:**
[Paste your answer from 1.2]

**Key conventions:**
[Paste your answer from 1.3 — keep it brief, imperative bullets]

**Testing patterns:**
[Paste your answer from 1.4 — framework, naming, structure only]

**Security rules (non-negotiable):**
[Paste your answer from 1.5 — NEVER/ALWAYS format]

**PR review and documentation expectations:**
[Paste relevant answers from 1.6 — imperative bullets only]

**Example of well-written code in our codebase:**
[Paste 1-2 short snippets from 1.7]

Structure the file as:
1. Project overview (2-3 lines)
2. Architecture rules (imperative bullets)
3. Code style (imperative bullets)
4. Testing (imperative bullets)
5. Security — mandatory (NEVER/ALWAYS lists)
6. PR review expectations (imperative bullets)
7. Documentation standards (imperative bullets)
8. Common patterns (2-3 code snippets)
````

4. Review the output. Copilot will likely produce something longer than ideal — trim aggressively. If a line does not change Copilot's behaviour, delete it.

5. Create the file at `.github/copilot-instructions.md` and commit it.

### Option B: Write it manually using a scaffold

Create `.github/copilot-instructions.md`:

````markdown
# Copilot custom instructions

## Project overview

[1-3 lines: what, stack, purpose. No padding.]

## Architecture rules

- [Imperative bullet: e.g. "Use constructor injection, never field injection"]
- [Imperative bullet: e.g. "Never expose JPA entities in API responses — map to DTOs"]
- [Imperative bullet: e.g. "All database migrations use Flyway — never modify existing scripts"]

## Code style

- [Naming conventions as imperatives]
- [Package placement rules]
- [Error handling pattern]
- [Logging rules]

## Component library & design system

[Omit if no frontend. Keep bullets imperative — no explanations.]
- Prefer [GDS / library name] components over custom implementations
- Never build a custom component if the design system provides one
- Always run axe-core checks before marking a component as ready
- Apply progressive enhancement: core functionality must work without JavaScript
- Use plain language in all labels, headings, and error messages
- Start with user needs — do not add UI features without linking to user research
- [GDS only] Use govuk-* class conventions; never override govuk- prefixed styles
- [GDS only] Follow GOV.UK error summary and inline validation patterns for all forms

## Testing

- Frameworks: [list]
- Name tests: `should_[behaviour]_when_[condition]`
- Structure: Arrange-Act-Assert with blank line separators
- [Any other patterns as imperative bullets]

## Security — mandatory

NEVER:
- [specific prohibitions]

ALWAYS:
- [specific requirements]

## PR reviews

- [What Copilot should check when reviewing PRs]
- [Which changes require mandatory human review]

## Documentation

- [Javadoc/docstring standards]
- [API documentation approach]

## Common patterns

**[Pattern name, e.g. "New REST endpoint"]:**
```[language]
[Short code snippet from your codebase]
```

**[Pattern name, e.g. "Unit test"]:**
```[language]
[Short code snippet from your codebase]
```
````

### Key differences from CLAUDE.md

| Aspect | CLAUDE.md | copilot-instructions.md |
|--------|-----------|-------------------------|
| Context budget | Large — Claude Code reads the full file | Tight — competes with code context |
| Tone | Can include explanations and rationale | Imperative only — "Use", "Never", "Always" |
| Code examples | Optional, can be longer | Essential, must be short (few-shot anchors) |
| Scope | Can include slash commands, rules, permissions | Instructions only — no tooling config |
| File location | Repository root | `.github/` directory |
| Advanced setup | `.claude/` folder with commands, rules, settings | Additional files in `.github/` for prompt files |

If your team uses both tools, maintain both files. They encode the same knowledge in different formats for different consumption models.

---

## Part 4: Validate and commit

Before committing either file, run through this checklist:

**Accuracy:**
- [ ] Every dependency mentioned is actually in the build file
- [ ] Every command listed actually works when you run it
- [ ] Every convention described matches what you see in the source code
- [ ] The package structure matches the actual directory tree

**Security:**
- [ ] No secrets, internal URLs, or sensitive paths appear in the file
- [ ] No real PII or sensitive data in any examples
- [ ] Security rules are specific, not generic ("never log PII" is weaker than "never log fields from PersonalDetails or AuthToken")

**Completeness:**
- [ ] A new team member could read this file and understand where to put new code
- [ ] The "beyond the IDE" sections reflect how your team actually works, not how you wish it worked
- [ ] Any TODO markers are tracked — do not let them rot
- [ ] If a frontend exists: component library / design system is documented
- [ ] Accessibility standard and enforcement tool are specified
- [ ] GOV.UK Design Principles are referenced if this is a government service

**Maintenance:**
- [ ] Add a "last updated" date at the bottom
- [ ] Agree with your team who is responsible for keeping the file current
- [ ] Consider adding a CI check or PR reminder to review the file quarterly

Commit the file(s) and open a PR. Ask your team to review — the review itself surfaces gaps in shared understanding about conventions, which is half the value.

---

## Part 5: Keep it alive

An instruction file that is not maintained becomes an instruction file that actively misleads. Here is how to prevent that.

**Update triggers — review the file when:**
- A new framework or major dependency is added
- The team agrees on a new convention or abandons an old one
- A security incident or audit finding changes your constraints
- A new team member says the file told them something wrong
- You notice the AI consistently ignoring or contradicting the file (which means the file is wrong, not the AI)

**Evolve beyond the basics:**
- After a month, look at your most repeated prompts. Turn them into `.claude/commands/` slash commands or add them to the Copilot instructions as patterns.
- If your team starts using AI for PR reviews, add specific review criteria based on real issues you have caught.
- If your team uses AI for debugging, document your observability stack and log formats so the AI can actually read your logs.

**Measure whether it is working:**
- Are AI suggestions matching your conventions more often?
- Are new team members ramping up faster?
- Are PR review comments about "wrong patterns" decreasing?

If you cannot answer these questions, the file exists but is not being used. Revisit Part 1 and make it more specific.

---

## Quick reference

| What you want to do | Tool | File to create |
|---------------------|------|----------------|
| Give Claude Code persistent project context | Claude Code | `CLAUDE.md` at repo root |
| Give Claude Code personal preferences | Claude Code | `CLAUDE.local.md` at repo root (gitignored) |
| Give Claude Code reusable commands | Claude Code | `.claude/commands/[name].md` |
| Give Claude Code modular rules | Claude Code | `.claude/rules/[name].md` |
| Control Claude Code permissions | Claude Code | `.claude/settings.json` |
| Give Copilot persistent project context | GitHub Copilot | `.github/copilot-instructions.md` |
| Give Copilot prompt files for chat | GitHub Copilot | `.github/copilot/[name].md` |

---

## Further reading

- [AI Engineering Lab — prompt engineering playbook](https://github.com/ai-engineering-lab/best-practice/playbooks/prompt-engineering/)
- [AI Engineering Lab — context engineering playbook](https://github.com/ai-engineering-lab/best-practice/playbooks/context-engineering/)
- [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [agentskills.io — open standard for agent skill files](https://agentskills.io/)

---

*Version: 1.0 — March 2026*
*Review this document when tool capabilities change or when engineers report that instructions are not working as expected.*