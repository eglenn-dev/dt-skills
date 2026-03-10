# Getting Started

dt-skills is a CLI tool for browsing and installing AI skills into your coding agent. It works with Claude Code, GitHub Copilot, OpenAI Codex, and OpenCode.

No installation required -- just use `npx`.

## Browse Available Skills

List everything in the registry:

```sh
npx dt-skills list
```

Search for skills by keyword:

```sh
npx dt-skills search review
```

Get details about a specific skill:

```sh
npx dt-skills info code-review
```

## Install a Skill

Install a skill to your current project (the default):

```sh
npx dt-skills install code-review
```

Or install it globally to your personal config:

```sh
npx dt-skills install code-review --global
```

### Choosing a Harness

By default, skills install for Claude Code. Use `--harness` (or `-t`) to target a different agent:

```sh
# GitHub Copilot
npx dt-skills install code-review -t copilot

# OpenAI Codex
npx dt-skills install code-review -t codex

# OpenCode
npx dt-skills install code-review -t opencode
```

## Where Skills Get Installed

| Harness     | Project Install                                | Personal Install                                 |
| ----------- | ---------------------------------------------- | ------------------------------------------------ |
| Claude Code | `.claude/skills/<skill>/SKILL.md`              | `~/.claude/skills/<skill>/SKILL.md`              |
| Copilot     | `.github/instructions/<skill>.instructions.md` | `~/.github/instructions/<skill>.instructions.md` |
| Codex       | `.codex/agents/<skill>.md`                     | `~/.codex/instructions.md` (appended)            |
| OpenCode    | `.opencode/skills/<skill>/SKILL.md`            | `~/.config/opencode/skills/<skill>/SKILL.md`     |

## Related Skills

Some skills bundle related sub-skills that get installed together. For example, `code-review` ships with `review-pr` and `review-diff`. When you install the parent skill, all related skills are installed as separate, independent files.

```sh
# See what's included
npx dt-skills info code-review

# Install the parent and all related skills
npx dt-skills install code-review
```

## Commands Reference

| Command                         | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| `npx dt-skills list`            | List all available skills                            |
| `npx dt-skills search <query>`  | Search skills by name or description                 |
| `npx dt-skills info <skill>`    | Show details about a skill                           |
| `npx dt-skills install <skill>` | Install a skill (add `--global` for personal config) |

---

[Release Notes](release-notes/README.md)
