# dt-skills CLI

Browse and install AI skills for Claude Code, GitHub Copilot, OpenAI Codex, and OpenCode.

[Guide](https://eglenn-dev.github.io/dt-skills/)

## Quick Start

```sh
npx dt-skills list
npx dt-skills install code-review
```

## Commands

### `list`

List all available skills in the registry.

```sh
npx dt-skills list
```

### `search <query>`

Search skills by name or description.

```sh
npx dt-skills search review
```

### `info <skill>`

Show detailed information about a skill, including its instructions, configuration, and related skills.

```sh
npx dt-skills info code-review
```

### `install <skill>`

Install a skill to your local environment. Skills with related skills will install all of them automatically.

```sh
npx dt-skills install code-review
```

**Options:**

| Flag                      | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `-g, --global`            | Install globally (personal config) instead of to the current project    |
| `-t, --harness <harness>` | Target harness: `claude-code` (default), `copilot`, `codex`, `opencode` |

**Examples:**

```sh
# Install to current project for Claude Code (default)
npx dt-skills install code-review

# Install for GitHub Copilot
npx dt-skills install code-review -t copilot

# Install for OpenAI Codex
npx dt-skills install code-review -t codex

# Install for OpenCode
npx dt-skills install code-review -t opencode

# Install globally (personal config)
npx dt-skills install code-review --global
```

## Install Locations

| Harness     | Project                                        | Personal                                         |
| ----------- | ---------------------------------------------- | ------------------------------------------------ |
| Claude Code | `.claude/skills/<skill>/SKILL.md`              | `~/.claude/skills/<skill>/SKILL.md`              |
| Copilot     | `.github/instructions/<skill>.instructions.md` | `~/.github/instructions/<skill>.instructions.md` |
| Codex       | `.codex/agents/<skill>.md`                     | `~/.codex/instructions.md` (appended)            |
| OpenCode    | `.opencode/skills/<skill>/SKILL.md`            | `~/.config/opencode/skills/<skill>/SKILL.md`     |

## Related Skills

Some skills bundle related skills that get installed together. For example, `code-review` ships with `review-pr` and `review-diff`. When you install the parent skill, all related skills are installed as separate, independent skills.

```sh
npx dt-skills info code-review   # see related skills
npx dt-skills install code-review  # installs all 3
```

## License

MIT
