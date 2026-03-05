import chalk from "chalk";
import { findSkill } from "../registry.js";
import { harnesses, harnessNames } from "../harnesses.js";

export function installCommand(
    name: string,
    options: { project?: boolean; harness?: string },
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

    const project = options.project ?? false;
    const scope = project ? "project" : "personal";

    const dest = harness.install(skill, { project });

    console.log(
        chalk.green(
            `\nInstalled "${skill.name}" for ${harness.name} (${scope}).`,
        ),
    );
    console.log(chalk.gray(`  ${dest}`));
    console.log();
    console.log(harness.usageHint(skill));
    console.log();
}
