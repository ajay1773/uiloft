const fs = require("fs");
const path = require("path");

// Get the command-line arguments (strings)
const inputArgs = process.argv.slice(2);

if (inputArgs.length === 0) {
  console.error("Error: Please provide one or more string arguments.");
  process.exit(1);
}

// Capitalize the first letter of each string argument
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Folder containing the SVG files
const folderPath = "../../../public/assets/icons"; // Replace with your folder path

// Check if the folder exists
if (!fs.existsSync(folderPath)) {
  console.error("Error: The specified folder does not exist.");
  process.exit(1);
}

// Read all files in the folder
const files = fs.readdirSync(folderPath);

// Helper function to process each string
const processString = (baseName) => {
  const processedFiles = new Set(); // To track processed files for each string
  const requiredSizes = ["12", "16", "20", "24"]; // Sizes to check for
  const requiredVariants = ["line", "solid", "duotone", "duocolor"]; // Variants to check for

  let fileCount = 0;

  // Filter files related to the base name (string argument)
  const filteredFiles = files.filter((file) => {
    return file.includes(baseName) && path.extname(file) === ".svg";
  });

  // Loop through the filtered files and process them
  filteredFiles.forEach((file) => {
    // Parse the current file name for size and variant
    const match = file.match(/size=(\d+), type=([\w-]+)\.svg/);

    if (match) {
      const size = match[1];
      const type = match[2];

      // Ensure the size and variant are valid
      if (
        requiredSizes.includes(size) &&
        requiredVariants.some((variant) => type.includes(variant))
      ) {
        // Construct the new file name
        const variant = capitalize(type.replace(/-/g, ""));
        const newFileName = `${capitalize(baseName)}${variant}${size}.svg`;

        // Rename the file
        const oldFilePath = path.join(folderPath, file);
        const newFilePath = path.join(folderPath, newFileName);
        fs.renameSync(oldFilePath, newFilePath);

        console.log(`Renamed: ${file} -> ${newFileName}`);
        processedFiles.add(file);

        fileCount++;

        // Stop processing after 16 files for this string
        if (fileCount >= 16) return;
      } else {
        console.warn(`Skipping invalid file (size/variant mismatch): ${file}`);
      }
    } else {
      console.warn(`Skipping file (not matching pattern): ${file}`);
    }
  });

  // Check if all required sizes and variants have been processed
  const processedSizes = new Set();
  const processedVariants = new Set();

  processedFiles.forEach((file) => {
    const match = file.match(/size=(\d+), type=([\w-]+)\.svg/);
    if (match) {
      processedSizes.add(match[1]);
      processedVariants.add(match[2]);
    }
  });

  // Validate if all 4 sizes and 4 variants have been processed
  const allSizesProcessed = requiredSizes.every((size) =>
    processedSizes.has(size)
  );
  const allVariantsProcessed = requiredVariants.every((variant) =>
    processedVariants.has(variant)
  );

  if (!allSizesProcessed) {
    console.warn(
      `Warning: Not all sizes processed for ${baseName}. Missing sizes: ${requiredSizes
        .filter((size) => !processedSizes.has(size))
        .join(", ")}`
    );
  }
  if (!allVariantsProcessed) {
    console.warn(
      `Warning: Not all variants processed for ${baseName}. Missing variants: ${requiredVariants
        .filter((variant) => !processedVariants.has(variant))
        .join(", ")}`
    );
  }
};

// Process each string provided as an argument
inputArgs.forEach((inputArg) => {
  const baseName = capitalize(inputArg);
  console.log(`Processing files for: ${baseName}`);
  processString(baseName);
});
