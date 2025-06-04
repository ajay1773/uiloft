const fs = require("fs");
const path = require("path");

/**
 * Combine all CSS files in the "design-system" folder into a single file.
 * @param folderPath Path to the "design-system" folder.
 * @param outputFile Name of the output file.
 */
function combineCSSFilesInFolder(folderPath, outputFile) {
  if (!fs.existsSync(folderPath)) {
    console.error(`Folder "${folderPath}" does not exist.`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  let combinedContent = "";

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (path.extname(file) === ".css") {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        combinedContent += `\n/* File: ${file} */\n`;
        combinedContent += fileContent;
      } catch (error) {
        console.error(`Error reading file "${filePath}":`, error);
      }
    }
  });

  if (combinedContent) {
    try {
      fs.writeFileSync(outputFile, combinedContent, "utf8");
      console.log(`Combined CSS written to "${outputFile}"`);
    } catch (error) {
      console.error(`Error writing to output file "${outputFile}":`, error);
    }
  } else {
    console.log(`No CSS files found in folder "${folderPath}".`);
  }
}

// Example usage
const designSystemFolder = path.resolve("../seeds/tokens");
const outputFile = path.resolve("../generated/combined-tokens.css");

combineCSSFilesInFolder(designSystemFolder, outputFile);
