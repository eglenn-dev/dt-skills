# Release Notes

## v0.1.4 — 2026-03-10

### Changes

- Minor updates to package information

## v0.1.3 — 2026-03-10

### Highlights

Two new skills added to the registry: `code-simplifier` for refining code clarity and maintainability, and `frontend-design` for creating distinctive, production-grade UI.

```
npx dt-skills install code-simplifier
```

```
npx dt-skills install frontend-design
```

### Changes

- Added `code-simplifier` skill — autonomously simplifies recently modified code for clarity, consistency, and maintainability while preserving functionality
- Added `frontend-design` skill — guides creation of visually striking, production-grade frontend interfaces with bold aesthetic direction

---

## v0.1.2 — 2026-03-06

### Highlights

Renamed the CLI from `datathink` to `dt-skills`, added OpenCode harness support, and introduced related skills auto-installation.

### Changes

- Renamed package from `@datathink/cli` to `dt-skills` and updated all CLI commands
- Added OpenCode harness support (`-t opencode`)
- Added related skills: installing a skill now automatically installs any bundled related skills
- Changed default install scope to project-level (use `--global` for personal install)
- Added `skill-creator` skill
- Removed `api-design` skill
- Added GitHub Actions workflow for automated npm publishing
- Added documentation site with Jekyll configuration
- Enhanced README with detailed usage docs and install location tables
- Improved `info` command output with related skills display

---

## v0.1.1 — 2026-03-05

### Highlights

Added multi-harness support so skills can be installed for GitHub Copilot and OpenAI Codex in addition to Claude Code.

### Changes

- Added harness system with support for Claude Code, GitHub Copilot, and OpenAI Codex
- Added `--harness` (`-t`) flag to the `install` command
- Copilot installs skills as `.instructions.md` files with `applyTo` frontmatter
- Codex installs skills as agent files (project) or appends to global `instructions.md` (personal)
- Updated package description from "Claude Code skills" to "agent skills"
- Added `publishConfig` with public access

---

## v0.1.0 — 2026-03-05

### Highlights

Initial release of the DataThink AI Skills Registry CLI.

### Changes

- Core CLI commands: `list`, `info`, `install`, `search`
- Skills registry with SKILL.md format and YAML frontmatter parsing
- Claude Code skill installation (personal and project scopes)
- Initial skills: api-design, code-review, commit, explain-code, pr-summary
