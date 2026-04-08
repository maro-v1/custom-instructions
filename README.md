# AI Coding Assistant Instruction Files — Knowledge Base

A knowledge base and enablement resource for generating project-specific instruction files for **Claude Code** (`CLAUDE.md`) and **GitHub Copilot** (`.github/copilot-instructions.md`).

These files encode your project's architecture, conventions, security rules, and testing standards so that AI assistants produce code that fits your codebase — not generic boilerplate.

---

## Repository Contents

| File | Purpose |
|------|---------|
| [`guide-generate-ai-instruction-files.md`](guide-generate-ai-instruction-files.md) | Comprehensive meta-guide (Phases 1–4) for analysing a project and generating both instruction file formats |
| [`plan-mode-custom-instructions.md`](plan-mode-custom-instructions.md) | Condensed prompt optimised for Claude Code plan mode — paste it in and go |
| [`workshop-instructions-prompt.md`](workshop-instructions-prompt.md) | Step-by-step workshop script (5 parts, 60 min) for team enablement sessions |

### Example Output — DemoApp

The `claude/` and `github-copilot/` directories contain fully generated example files for a fictional Angular 20 government case-management application ("DemoApp"). The `demo-app/` directory contains the DemoApp source code they were generated from.

| File | Purpose |
|------|---------|
| [`claude/CLAUDE.md`](claude/CLAUDE.md) | Example `CLAUDE.md` — narrative format with architecture, conventions, security, testing, and beyond-code guidance |
| [`github-copilot/copilot-instructions.md`](github-copilot/copilot-instructions.md) | Example `copilot-instructions.md` — imperative format with rules, constraints, and code snippet patterns |
| [`demo-app/`](demo-app/) | Fictional Angular 20 SPA source code used to generate the example files above |

---

## Two Output Formats, One Knowledge Source

Both files encode the same project knowledge but are formatted for each tool's consumption model:

| Aspect | `CLAUDE.md` | `copilot-instructions.md` |
|--------|-------------|---------------------------|
| **Tone** | Narrative — explains *why* as well as *what* | Imperative — "Use", "Never", "Always" |
| **Context budget** | Large — Claude Code reads the full file | Tight — every token competes with code context |
| **Code examples** | Optional, can be longer | Essential, must be short (few-shot anchors) |
| **Location** | Repository root | `.github/` directory |
| **Tooling config** | Supports `.claude/` folder (commands, rules, permissions) | Instructions only |

If your team uses both tools, maintain both files.

---

## Getting Started

1. **Read the guide** — Start with [`guide-generate-ai-instruction-files.md`](guide-generate-ai-instruction-files.md) for the full methodology (Phases 1–4: analyse, generate CLAUDE.md, generate copilot-instructions.md, validate).

2. **Or use the prompt directly** — If you have Claude Code, paste the prompt from [`plan-mode-custom-instructions.md`](plan-mode-custom-instructions.md) into plan mode and let it scan your repo.

3. **Review the examples** — Compare [`claude/CLAUDE.md`](claude/CLAUDE.md) and [`github-copilot/copilot-instructions.md`](github-copilot/copilot-instructions.md) to see what well-formed output looks like.

---

## Further Reading

- [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
