import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import AdmZip from "adm-zip";

const fontUrls = {
  Vazir:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/vazir-ttf.zip",
  Sahel:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/sahel-ttf.zip",
  Samim:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/samim-ttf.zip",
  Shabnam:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/shabnam-ttf.zip",
  Gandom:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/gandom-ttf.zip",
  Estedad:
    "https://github.com/rezasmind/persian-fontify/releases/download/Vazir-matn/estedad-ttf.zip",
};

async function downloadFonts(selectedFont) {
  const url = fontUrls[selectedFont];
  if (!url) {
    throw new Error(`No download URL found for font: ${selectedFont}`);
  }

  const fontDir = path.join(process.cwd(), "fonts", selectedFont);
  const zipPath = path.join(fontDir, `${selectedFont}.zip`);

  try {
    // Create fonts directory if it doesn't exist
    await fs.mkdir(fontDir, { recursive: true });

    // Download the font
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });

    // Save the zip file
    await pipeline(response.data, createWriteStream(zipPath));

    console.log(`Downloaded ${selectedFont} font to ${zipPath}`);

    // Extract the zip file
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(fontDir, true);

    console.log(`Extracted ${selectedFont} font to ${fontDir}`);

    // Remove the zip file
    await fs.unlink(zipPath);
    console.log(`Removed ${zipPath}`);

    // Find the .ttf files
    const files = await fs.readdir(fontDir);
    const ttfFiles = files.filter((file) => file.endsWith(".ttf"));

    if (ttfFiles.length === 0) {
      throw new Error(
        `No .ttf files found in the extracted ${selectedFont} font`
      );
    }

    console.log(`Found ${ttfFiles.length} .ttf files for ${selectedFont} font`);
    return ttfFiles.map((file) => path.join(fontDir, file));
  } catch (error) {
    console.error(`Error processing font: ${error.message}`);
    throw error;
  }
}

export { downloadFonts };
