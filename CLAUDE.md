# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository is a knowledge base and enablement resource for generating AI coding assistant instruction files. It is **documentation only** — there is no executable code, build system, or test suite.

## Repository Contents

| File | Purpose |
|------|---------|
| `guide-generate-ai-instruction-files.md` | Comprehensive meta-guide (phases 1–4) for analysing a project and generating both CLAUDE.md and Copilot instruction files |
| `plan-mode-custom-instructions.md` | Condensed version of the guide optimised for use in Claude Code plan mode (`/plan`) |
| `workshop-instructions-prompt.md` | 5-part, 60-minute workshop script for team enablement sessions |
| `claude/CLAUDE.md` | Reference output: a fully-generated CLAUDE.md for a fictional Angular 20 case-management app ("DemoApp") |
| `github-copilot/copilot-instructions.md` | Reference output: the equivalent `.github/copilot-instructions.md` for the same DemoApp |

## Key Concepts

**Two output formats, one knowledge source:**
- `CLAUDE.md` — narrative, comprehensive, large context budget; explains *why* as well as *what*
- `.github/copilot-instructions.md` — imperative, concise, tight context budget; rules with minimal prose

**Generation workflow** (from `guide-generate-ai-instruction-files.md`):
1. **Phase 1** — Analyse the target repo: architecture, conventions, CI/CD, security constraints
2. **Phase 2** — Generate `CLAUDE.md` with narrative explanations
3. **Phase 3** — Generate `.github/copilot-instructions.md` in imperative format
4. **Phase 4** — Validate against the checklist in the guide

**What good instruction files encode:** project architecture, naming conventions, testing standards, security requirements, and "beyond the IDE" workflows (PR process, observability, dependency management).

## Working in This Repository

When asked to generate or improve instruction files for an external project, the primary reference is `guide-generate-ai-instruction-files.md`. The DemoApp examples in `claude/` and `github-copilot/` are authoritative samples of what well-formed output looks like.

When editing the guides themselves, preserve the phase structure and the distinction between CLAUDE.md (narrative) and Copilot (imperative) formats — that distinction is central to the methodology.
