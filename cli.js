#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { downloadFonts } from "./lib/fontDownload.js";
import { modifyCssFile } from "./lib/cssModifier.js";
import { modifyTailwindConfig } from "./lib/tailwindConfigModifier.js";

program
  .version("1.0.5")
  .description("A CLI tool to integrate Persian fonts into your project");

program
  .command("setup")
  .description("Setup Persian fonts in your project")
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "font",
          message:
            "[RIP Saber Rastikerdar 🖤] Which persian font would you like to use?",
          choices: ["Vazir", "Shabnam", "Gandom", "Samim", "Estedad", "Sahel"],
        },
        {
          type: "input",
          name: "cssPath",
          message: "Enter the path to your main CSS file:",
        },
        {
          type: "input",
          name: "tailwindConfigPath",
          message: "Enter the path to your Tailwind config file:",
        },
      ]);

      console.log("Downloading fonts...");
      const fontFiles = await downloadFonts(answers.font);

      console.log("Updating CSS File...");
      await modifyCssFile(answers.cssPath, answers.font, fontFiles);

      console.log("Modifying Tailwind Config...");
      await modifyTailwindConfig(answers.tailwindConfigPath, answers.font);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
