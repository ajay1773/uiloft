const fs = require("fs");
const {
  colorNamesMap,
  colors,
} = require("../generated/refined-primitives.cjs");

function extractCssVariableName(cssVar) {
  const match = cssVar.match(/^var\(\s*--([a-zA-Z0-9-_\(\)]+)\s*\)$/);
  return match ? `${match[1]}` : null;
}

function isColorCode(color) {
  if (typeof color !== "string") return false;

  const hexPattern = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/; // #RGB or #RRGGBB
  const rgbPattern =
    /^rgb\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*\)$/;
  const rgbaPattern =
    /^rgba\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|0?\.\d+|1(\.0)?)\s*\)$/;
  const hslPattern =
    /^hsl\(\s*(\d{1,3})\s*,\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*\)$/;
  const hslaPattern =
    /^hsla\(\s*(\d{1,3})\s*,\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*,\s*(0|0?\.\d+|1(\.0)?)\s*\)$/;

  return (
    hexPattern.test(color) ||
    rgbPattern.test(color) ||
    rgbaPattern.test(color) ||
    hslPattern.test(color) ||
    hslaPattern.test(color)
  );
}

function processCSSFile(inputFile, outputFile) {
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const lines = data.split("\n");
    const colorVariables = {};
    const colorsNamesMap = {};
    const spacingVariables = {};

    lines.forEach((line) => {
      let [variableName, variableValue] = line.split(":");
      if (variableName && variableValue) {
        variableName = variableName
          .replace(/'/g, "")
          .replace(/[^a-zA-Z0-9-]/g, "-");
        variableValue = variableValue.replace(/;/g, "").trim();
        variableName = variableName.replace(/--/g, "-").replace(/-{3,}/g, "-");

        if (variableName.endsWith("-")) {
          variableName = variableName.slice(0, -1);
        }

        if (variableName.startsWith("-")) {
          variableName = variableName.substring(1);
        }

        if (isColorCode(variableValue)) {
          // colorVariables[variableName] = variableValue;
          // colorsNamesMap[line.split(":")[0]] = variableName;
        } else {
          const valueWithVarFunction = extractCssVariableName(variableValue);
          const refinedVariableName = colorNamesMap[valueWithVarFunction];
          variableValue = colors[refinedVariableName];
          spacingVariables[variableName] = variableValue;
        }
      }
    });

    const outputContent = `
    module.exports = {
        tokens: ${JSON.stringify(spacingVariables, null, 2)},
    };
`;

    fs.writeFile(outputFile, outputContent, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File modified successfully:", outputFile);
      }
    });
  });
}

const inputFile = "../generated/combined-design-system.css";
const outputFile = "../generated/tokens.cjs";

if (!inputFile || !outputFile) {
  console.error("Please provide input and output file names as arguments.");
} else {
  processCSSFile(inputFile, outputFile);
}
