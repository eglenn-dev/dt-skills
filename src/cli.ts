#!/usr/bin/env node
import { Command } from "commander";
import { listCommand } from "./commands/list.js";
import { infoCommand } from "./commands/info.js";
import { installCommand } from "./commands/install.js";
import { searchCommand } from "./commands/search.js";

const program = new Command();

program
  .name("datathink")
  .description("DataThink AI Skills Registry - browse and install Claude Code skills")
  .version("0.1.0");

program
  .command("list")
  .alias("ls")
  .description("List all available skills in the registry")
  .action(listCommand);

program
  .command("info <skill>")
  .description("Show detailed information about a skill")
  .action(infoCommand);

program
  .command("install <skill>")
  .alias("i")
  .description("Install a skill to your local environment")
  .option("-p, --project", "Install to current project (.claude/skills/) instead of personal (~/.claude/skills/)")
  .action(installCommand);

program
  .command("search <query>")
  .alias("s")
  .description("Search skills by name or description")
  .action(searchCommand);

program.parse();
