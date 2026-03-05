import fs from "node:fs";
import path from "node:path";
import type { Skill } from "./registry.js";

export interface Harness {
    name: string;
    /** How to use the skill after install */
    usageHint: (skill: Skill) => string;
    /** Install the skill, returns the path where it was installed */
    install: (skill: Skill, opts: { project: boolean }) => string;
}

function copyDir(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const home = process.env.HOME || "~";

// ---------------------------------------------------------------------------
// Claude Code
// Personal: ~/.claude/skills/<skill>/SKILL.md
// Project:  .claude/skills/<skill>/SKILL.md
// ---------------------------------------------------------------------------
const claudeCode: Harness = {
    name: "Claude Code",
    usageHint(skill) {
        if (skill.frontmatter["disable-model-invocation"]) {
            return `Use in Claude Code: /${skill.name}`;
        }
        return `Use in Claude Code: /${skill.name} or let Claude invoke it automatically`;
    },
    install(skill, { project }) {
        const base = project
            ? path.join(process.cwd(), ".claude", "skills")
            : path.join(home, ".claude", "skills");
        const dest = path.join(base, skill.id);
        overwriteDir(skill.registryPath, dest);
        return dest;
    },
};

// ---------------------------------------------------------------------------
// GitHub Copilot
// Project only: .github/instructions/<skill>.instructions.md
// Each file uses YAML frontmatter with `applyTo` for scoping.
// ---------------------------------------------------------------------------
const copilot: Harness = {
    name: "GitHub Copilot",
    usageHint(skill) {
        return `Copilot will apply these instructions automatically when editing matching files.`;
    },
    install(skill, { project }) {
        const base = project
            ? path.join(process.cwd(), ".github", "instructions")
            : path.join(home, ".github", "instructions");

        fs.mkdirSync(base, { recursive: true });
        const dest = path.join(base, `${skill.id}.instructions.md`);

        // Convert to Copilot instruction format
        const lines: string[] = [];
        lines.push("---");
        lines.push(`applyTo: "**"`);
        lines.push("---");
        lines.push("");
        lines.push(`# ${skill.name}`);
        lines.push("");
        lines.push(skill.content);

        fs.writeFileSync(dest, lines.join("\n"), "utf-8");
        return dest;
    },
};

// ---------------------------------------------------------------------------
// OpenAI Codex
// Personal: ~/.codex/instructions.md (single file, append)
// Project:  AGENTS.md or .codex/agents/<skill>.md
// ---------------------------------------------------------------------------
const codex: Harness = {
    name: "Codex",
    usageHint(skill) {
        return `Codex will load these instructions automatically at the start of each session.`;
    },
    install(skill, { project }) {
        if (project) {
            // Install as a scoped agent file in .codex/agents/
            const base = path.join(process.cwd(), ".codex", "agents");
            fs.mkdirSync(base, { recursive: true });
            const dest = path.join(base, `${skill.id}.md`);

            const lines: string[] = [];
            lines.push(`# ${skill.name}`);
            lines.push("");
            lines.push(skill.content);

            fs.writeFileSync(dest, lines.join("\n"), "utf-8");
            return dest;
        } else {
            // Append to global instructions
            const dest = path.join(home, ".codex", "instructions.md");
            fs.mkdirSync(path.dirname(dest), { recursive: true });

            const section = `\n\n## ${skill.name}\n\n${skill.content}\n`;

            if (fs.existsSync(dest)) {
                const existing = fs.readFileSync(dest, "utf-8");
                // Check if already installed
                if (existing.includes(`## ${skill.name}`)) {
                    // Replace existing section
                    const regex = new RegExp(
                        `## ${escapeRegex(skill.name)}\\n[\\s\\S]*?(?=\\n## |$)`,
                    );
                    fs.writeFileSync(
                        dest,
                        existing.replace(
                            regex,
                            `## ${skill.name}\n\n${skill.content}\n`,
                        ),
                        "utf-8",
                    );
                } else {
                    fs.appendFileSync(dest, section, "utf-8");
                }
            } else {
                fs.writeFileSync(dest, `# DataThink Skills${section}`, "utf-8");
            }
            return dest;
        }
    },
};

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function overwriteDir(src: string, dest: string) {
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true });
    }
    copyDir(src, dest);
}

export const harnesses: Record<string, Harness> = {
    "claude-code": claudeCode,
    copilot,
    codex,
};

export const harnessNames = Object.keys(harnesses);
