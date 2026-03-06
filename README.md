# DataThink CLI

Browse and install AI skills for Claude Code, GitHub Copilot, and OpenAI Codex.

## Quick Start

```sh
npx datathink list
npx datathink install code-review --project
```

## Commands

### `list`

List all available skills in the registry.

```sh
npx datathink list
```

### `search <query>`

Search skills by name or description.

```sh
npx datathink search review
```

### `info <skill>`

Show detailed information about a skill, including its instructions, configuration, and related skills.

```sh
npx datathink info code-review
```

### `install <skill>`

Install a skill to your local environment. Skills with related skills will install all of them automatically.

```sh
npx datathink install code-review
```

**Options:**

| Flag                      | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| `-p, --project`           | Install to the current project instead of your personal/global config |
| `-t, --harness <harness>` | Target harness: `claude-code` (default), `copilot`, `codex`           |

**Examples:**

```sh
# Install to current project for Claude Code (default)
npx datathink install code-review --project

# Install for GitHub Copilot
npx datathink install code-review --project -t copilot

# Install for OpenAI Codex
npx datathink install code-review --project -t codex

# Install globally (personal config)
npx datathink install code-review
```

## Install Locations

| Harness     | Project                                        | Personal                                         |
| ----------- | ---------------------------------------------- | ------------------------------------------------ |
| Claude Code | `.claude/skills/<skill>/SKILL.md`              | `~/.claude/skills/<skill>/SKILL.md`              |
| Copilot     | `.github/instructions/<skill>.instructions.md` | `~/.github/instructions/<skill>.instructions.md` |
| Codex       | `.codex/agents/<skill>.md`                     | `~/.codex/instructions.md` (appended)            |

## Related Skills

Some skills bundle related skills that get installed together. For example, `code-review` ships with `review-pr` and `review-diff`. When you install the parent skill, all related skills are installed as separate, independent skills.

```sh
npx datathink info code-review   # see related skills
npx datathink install code-review --project  # installs all 3
```

## License

MIT
