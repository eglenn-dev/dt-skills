import chalk from "chalk";
import { loadRegistry } from "../registry.js";

export function searchCommand(query: string) {
    const skills = loadRegistry();
    const q = query.toLowerCase();

    const matches = skills.filter(
        (s) =>
            s.name.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q),
    );

    if (matches.length === 0) {
        console.log(chalk.yellow(`No skills matching "${query}".`));
        return;
    }

    console.log(
        chalk.bold(
            `\n${matches.length} skill${matches.length === 1 ? "" : "s"} matching "${query}"\n`,
        ),
    );

    for (const skill of matches) {
        console.log(`  ${chalk.cyan(skill.name)}`);
        console.log(`  ${chalk.gray(skill.description)}`);
        console.log();
    }
}
