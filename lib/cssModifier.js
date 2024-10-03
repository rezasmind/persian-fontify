import fs from 'fs/promises';
import path from 'path';

async function modifyCssFile(cssPath, selectedFont, fontFiles) {
  try {
    // Read the existing CSS file
    let cssContent = await fs.readFile(cssPath, 'utf-8');

    // Generate @font-face declarations
    const fontFaceDeclarations = generateFontFaceDeclarations(selectedFont, fontFiles);

    // Check if @font-face declarations already exist
    if (cssContent.includes(`@font-face {`)) {
      console.log('Existing @font-face declarations found. Updating...');
      // Replace existing @font-face declarations
      cssContent = cssContent.replace(/@font-face\s*{[^}]*}/g, '');
    }

    // Add the new @font-face declarations at the beginning of the file
    cssContent = fontFaceDeclarations + '\n\n' + cssContent;

    // Write the updated content back to the CSS file
    await fs.writeFile(cssPath, cssContent, 'utf-8');

    console.log(`Updated CSS file: ${cssPath}`);
  } catch (error) {
    console.error(`Error modifying CSS file: ${error.message}`);
    throw error;
  }
}

function generateFontFaceDeclarations(fontName, fontFiles) {
  const weightMap = {
    'Thin': 100,
    'ExtraLight': 200,
    'Light': 300,
    'Regular': 400,
    'Medium': 500,
    'SemiBold': 600,
    'Bold': 700,
    'ExtraBold': 800,
    'Black': 900,
  };

  return fontFiles.map(file => {
    const fileName = path.basename(file);
    const fontWeight = Object.entries(weightMap).find(([weight]) => fileName.includes(weight));
    const weight = fontWeight ? fontWeight[1] : 400;
    const fontStyle = fileName.toLowerCase().includes('italic') ? 'italic' : 'normal';

    return `@font-face {
  font-family: '${fontName}';
  src: url('${file}') format('truetype');
  font-weight: ${weight};
  font-style: ${fontStyle};
}`;
  }).join('\n\n');
}

export { modifyCssFile };
