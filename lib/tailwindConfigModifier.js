import fs from "fs/promises";

async function modifyTailwindConfig(configPath, selectedFont) {
  try {
    // Read the existing Tailwind config file
    let configContent = await fs.readFile(configPath, "utf-8");

    // Remove comments and trim whitespace
    configContent = configContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();

    let configObject;

    if (configContent.startsWith('module.exports =')) {
      // CommonJS format
      const objectContent = configContent.slice('module.exports ='.length).trim();
      configObject = Function(`return ${objectContent}`)();
    } else if (configContent.startsWith('export default')) {
      // ES module format
      const objectContent = configContent.slice('export default'.length).trim();
      configObject = Function(`return ${objectContent}`)();
    } else {
      // Assume it's a plain object
      configObject = Function(`return ${configContent}`)();
    }

    if (typeof configObject !== 'object' || configObject === null) {
      throw new Error('Invalid Tailwind config format. Expected an object.');
    }

    // Ensure the necessary structure exists
    if (!configObject.theme) configObject.theme = {};
    if (!configObject.theme.extend) configObject.theme.extend = {};
    if (!configObject.theme.extend.fontFamily) configObject.theme.extend.fontFamily = {};

    // Add or update the selected font in the fontFamily object
    configObject.theme.extend.fontFamily[selectedFont.toLowerCase()] = [`${selectedFont}`, 'sans-serif'];

    // Convert the config object back to a string, preserving the original format
    let updatedConfig;
    if (configContent.startsWith('module.exports =')) {
      updatedConfig = `module.exports = ${JSON.stringify(configObject, null, 2)}`;
    } else if (configContent.startsWith('export default')) {
      updatedConfig = `export default ${JSON.stringify(configObject, null, 2)}`;
    } else {
      updatedConfig = JSON.stringify(configObject, null, 2);
    }

    // Write the updated content back to the config file
    await fs.writeFile(configPath, updatedConfig, "utf-8");

    console.log(`Updated Tailwind config file: ${configPath}`);
  } catch (error) {
    console.error(`Error modifying Tailwind config file: ${error.message}`);
    throw error;
  }
}

export { modifyTailwindConfig };
