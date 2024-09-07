#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

const FONT_BASE_URL =
  "https://raw.githubusercontent.com/rezasmind/persian-fontify/main/fonts";
const FONT_FOLDER = "public/fonts";
const TAILWIND_CONFIG = "tailwind.config.js";
const CSS_FILE = "styles/globals.css"; // Adjust this path as needed

const fonts = {
  vazir: "vazir-font.zip",
  // Add more fonts here
};

function downloadFont(fontName) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${fontName} font...`);
    const fontUrl = `${FONT_BASE_URL}/${fonts[fontName]}`;
    const fontPath = path.join(FONT_FOLDER, `${fontName}.zip`);

    https
      .get(fontUrl, (res) => {
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(fontPath);
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log("Font downloaded successfully!");
            resolve(fontPath);
          });
        } else {
          reject(
            new Error(`Failed to download font. Status code: ${res.statusCode}`)
          );
        }
      })
      .on("error", reject);
  });
}

function extractFont(fontPath, fontName) {
  console.log("Extracting font files...");
  const fontFolderPath = path.join(FONT_FOLDER, fontName);
  if (!fs.existsSync(fontFolderPath)) {
    fs.mkdirSync(fontFolderPath);
  }
  const fontFilePath = path.join(fontFolderPath, `${fontName}.zip`);
  const { exec } = require("child_process");
  exec(`unzip -d ${fontFolderPath} ${fontFilePath}`);
  console.log("Font files extracted successfully!");
}

function modifyTailwindConfig(fontName) {
  console.log("Modifying Tailwind config...");
  const configPath = path.join(process.cwd(), TAILWIND_CONFIG);
  let config = fs.readFileSync(configPath, "utf8");

  const fontFamilyRegex = /fontFamily:\s*{[^}]*}/;
  const fontFamilyString = `fontFamily: {
        '${fontName}': ['${fontName}', 'sans-serif'],
        // ... other font families
      }`;

  if (fontFamilyRegex.test(config)) {
    config = config.replace(fontFamilyRegex, fontFamilyString);
  } else {
    config = config.replace(
      "module.exports = {",
      `module.exports = {\n  theme: {\n    extend: {\n      ${fontFamilyString}\n    }\n  },`
    );
  }

  fs.writeFileSync(configPath, config);
  console.log("Tailwind config updated successfully!");
}

function modifyCssFile(fontName) {
  console.log("Modifying CSS file...");
  const cssPath = path.join(process.cwd(), CSS_FILE);
  let css = fs.readFileSync(cssPath, "utf8");

  const fontFaceString = `@font-face {
  font-family: '${fontName}';
  src: url('/fonts/${fontName}/${fontName}.woff2') format('woff2'),
       url('/fonts/${fontName}/${fontName}.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

`;

  css = fontFaceString + css;

  fs.writeFileSync(cssPath, css);
  console.log("CSS file updated successfully!");
}

async function main() {
  const fontName = process.argv[3];

  if (!fontName || process.argv[2] !== "add") {
    console.error("Usage: npx persian-fontify add <fontname>");
    process.exit(1);
  }

  if (!fonts[fontName]) {
    console.error(`Font "${fontName}" not found!`);
    process.exit(1);
  }

  try {
    const fontPath = await downloadFont(fontName);
    await extractFont(fontPath, fontName);
    modifyTailwindConfig(fontName);
    modifyCssFile(fontName);
    console.log(
      `${fontName} font has been successfully installed and configured!`
    );
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
