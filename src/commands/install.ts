import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { findSkill } from "../registry.js";

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

export function installCommand(name: string, options: { project?: boolean }) {
  const skill = findSkill(name);

  if (!skill) {
    console.log(chalk.red(`Skill "${name}" not found.`));
    console.log(chalk.gray(`Run ${chalk.white("datathink list")} to see available skills.`));
    process.exitCode = 1;
    return;
  }

  const targetBase = options.project
    ? path.join(process.cwd(), ".claude", "skills")
    : path.join(process.env.HOME || "~", ".claude", "skills");

  const targetDir = path.join(targetBase, skill.id);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.yellow(`Skill "${skill.name}" is already installed at ${targetDir}`));
    console.log(chalk.gray("Overwriting with latest version..."));
    fs.rmSync(targetDir, { recursive: true });
  }

  copyDir(skill.registryPath, targetDir);

  const scope = options.project ? "project" : "personal";
  console.log(chalk.green(`\nInstalled "${skill.name}" to ${scope} skills.`));
  console.log(chalk.gray(`  ${targetDir}`));
  console.log();
  console.log(`Use it in Claude Code:`);
  if (skill.frontmatter["disable-model-invocation"]) {
    console.log(`  ${chalk.cyan(`/${skill.name}`)}`);
  } else {
    console.log(`  ${chalk.cyan(`/${skill.name}`)} or let Claude invoke it automatically`);
  }
  console.log();
}
