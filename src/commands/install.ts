import chalk from "chalk";
import { findSkill } from "../registry.js";
import { harnesses, harnessNames } from "../harnesses.js";

export function installCommand(
    name: string,
    options: { global?: boolean; harness?: string },
) {
    const skill = findSkill(name);

    if (!skill) {
        console.log(chalk.red(`Skill "${name}" not found.`));
        console.log(
            chalk.gray(
                `Run ${chalk.white("datathink list")} to see available skills.`,
            ),
        );
        process.exitCode = 1;
        return;
    }

    const harnessKey = options.harness || "claude-code";
    const harness = harnesses[harnessKey];

    if (!harness) {
        console.log(chalk.red(`Unknown harness "${harnessKey}".`));
        console.log(chalk.gray(`Available: ${harnessNames.join(", ")}`));
        process.exitCode = 1;
        return;
    }

    const project = !(options.global ?? false);
    const scope = project ? "project" : "personal";

    const paths = harness.install(skill, { project });
    const relatedCount = skill.relatedSkills.length;

    if (relatedCount > 0) {
        console.log(
            chalk.green(
                `\nInstalled "${skill.name}" + ${relatedCount} related skill${relatedCount === 1 ? "" : "s"} for ${harness.name} (${scope}).`,
            ),
        );
    } else {
        console.log(
            chalk.green(
                `\nInstalled "${skill.name}" for ${harness.name} (${scope}).`,
            ),
        );
    }
    for (const p of paths) {
        console.log(chalk.gray(`  ${p}`));
    }
    console.log();
    console.log(harness.usageHint(skill));
    console.log();
}
