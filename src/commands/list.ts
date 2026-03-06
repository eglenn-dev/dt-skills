import chalk from "chalk";
import { loadRegistry } from "../registry.js";

export function listCommand() {
    const skills = loadRegistry();

    if (skills.length === 0) {
        console.log(chalk.yellow("No skills found in the registry."));
        return;
    }

    console.log(
        chalk.bold(`\nDataThink Skills Registry (${skills.length} skills)\n`),
    );
    console.log(chalk.gray("─".repeat(60)));

    for (const skill of skills) {
        const invocable = skill.frontmatter["disable-model-invocation"]
            ? chalk.gray(" (manual only)")
            : "";
        const related =
            skill.relatedSkills.length > 0
                ? chalk.magenta(` (+${skill.relatedSkills.length} related)`)
                : "";
        console.log(`  ${chalk.cyan(skill.name)}${invocable}${related}`);
        console.log(`  ${chalk.gray(skill.description)}`);
        console.log();
    }

    console.log(
        chalk.gray(
            `Run ${chalk.white("datathink info <skill>")} for details or ${chalk.white("datathink install <skill>")} to install.`,
        ),
    );
}
