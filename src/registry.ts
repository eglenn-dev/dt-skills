import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface Skill {
    /** Directory name of the skill */
    id: string;
    /** Display name from frontmatter or directory name */
    name: string;
    /** What the skill does */
    description: string;
    /** Full path to the skill directory in the registry */
    registryPath: string;
    /** Raw SKILL.md content (without frontmatter) */
    content: string;
    /** All frontmatter fields */
    frontmatter: Record<string, unknown>;
    /** List of supporting files relative to the skill directory */
    files: string[];
}

function getRegistryDir(): string {
    // Skills live in the `skills/` directory next to the package
    const thisFile = new URL(import.meta.url).pathname;
    const packageRoot = path.resolve(path.dirname(thisFile), "..");
    return path.join(packageRoot, "skills");
}

function listFiles(dir: string, base: string = ""): string[] {
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const rel = path.join(base, entry.name);
        if (entry.isDirectory()) {
            results.push(...listFiles(path.join(dir, entry.name), rel));
        } else {
            results.push(rel);
        }
    }
    return results;
}

export function loadSkill(skillDir: string): Skill | null {
    const skillMd = path.join(skillDir, "SKILL.md");
    if (!fs.existsSync(skillMd)) return null;

    const raw = fs.readFileSync(skillMd, "utf-8");
    const { data, content } = matter(raw);
    const id = path.basename(skillDir);
    const allFiles = listFiles(skillDir);

    return {
        id,
        name: (data.name as string) || id,
        description:
            (data.description as string) ||
            content
                .split("\n")
                .find((l) => l.trim())
                ?.trim() ||
            "",
        registryPath: skillDir,
        content: content.trim(),
        frontmatter: data,
        files: allFiles,
    };
}

export function loadRegistry(): Skill[] {
    const registryDir = getRegistryDir();
    if (!fs.existsSync(registryDir)) return [];

    const skills: Skill[] = [];
    for (const entry of fs.readdirSync(registryDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const skill = loadSkill(path.join(registryDir, entry.name));
        if (skill) skills.push(skill);
    }
    return skills.sort((a, b) => a.name.localeCompare(b.name));
}

export function findSkill(nameOrId: string): Skill | undefined {
    const skills = loadRegistry();
    return skills.find((s) => s.id === nameOrId || s.name === nameOrId);
}
