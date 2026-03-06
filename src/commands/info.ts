import chalk from "chalk";
import { findSkill } from "../registry.js";

export function infoCommand(name: string) {
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

    console.log(chalk.bold(`\n${skill.name}\n`));
    console.log(chalk.gray("─".repeat(60)));
    console.log(`${chalk.bold("Description:")} ${skill.description}`);

    // Show frontmatter config
    const fm = skill.frontmatter;
    if (fm["disable-model-invocation"]) {
        console.log(
            `${chalk.bold("Invocation:")}  Manual only (/${skill.name})`,
        );
    } else if (fm["user-invocable"] === false) {
        console.log(
            `${chalk.bold("Invocation:")}  Auto only (Claude invokes when relevant)`,
        );
    } else {
        console.log(
            `${chalk.bold("Invocation:")}  Auto + manual (/${skill.name})`,
        );
    }

    if (fm["allowed-tools"]) {
        console.log(`${chalk.bold("Tools:")}       ${fm["allowed-tools"]}`);
    }

    if (fm.context) {
        console.log(`${chalk.bold("Context:")}     ${fm.context}`);
    }

    if (fm.agent) {
        console.log(`${chalk.bold("Agent:")}       ${fm.agent}`);
    }

    // Show files
    if (skill.files.length > 1) {
        console.log(`\n${chalk.bold("Files:")}`);
        for (const file of skill.files) {
            console.log(`  ${chalk.gray("•")} ${file}`);
        }
    }

    // Show related skills
    if (skill.relatedSkills.length > 0) {
        console.log(`\n${chalk.bold("Related skills:")}`);
        for (const related of skill.relatedSkills) {
            console.log(
                `  ${chalk.gray("•")} ${chalk.cyan(related.name)} - ${related.description}`,
            );
        }
    }

    // Show skill content
    console.log(`\n${chalk.bold("Instructions:")}`);
    console.log(chalk.gray("─".repeat(60)));
    console.log(skill.content);
    console.log();
}
