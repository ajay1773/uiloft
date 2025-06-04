const { get, assign } = require("lodash");
const fs = require("fs");
const lightColorValues = require("../json/light.json");
const darkColorValues = require("../json/dark.json");
const values = require("../json/primitives.json");

const primitives = JSON.parse(fs.readFileSync(primitivesPath, "utf8"));

function extractCurlyBraceContent(str) {
  // Check if the string contains curly braces
  const match = str.match(/\{([^}]+)\}/);

  // If there is a match, return the content inside the curly braces; otherwise, return the original string
  return match ? match[1] : str;
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

function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    // Replace spaces in the key with '-' and construct the current path
    const sanitizedKey = key.replace(/\s+/g, "-");
    const currentPath = parentKey
      ? `${parentKey}-${sanitizedKey}`
      : sanitizedKey;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], currentPath, result);
    }

    const value = get(obj[key], "value", "");
    const category = get(obj[key], "attributes.category", "");
    const type = get(obj[key], "attributes.type", "");
    if (value) {
      // if (sanitizedKey === "font-family-display") {
      //   console.log(sanitizedKey);
      // }
      if (category === "color") {
        const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
        if (isColorCode(valueExtractedFromCurlyBraces)) {
          result[currentPath] = valueExtractedFromCurlyBraces;
        } else {
          result[currentPath] = get(
            get(values, valueExtractedFromCurlyBraces, {}),
            "value",
            ""
          );
        }
      } else if (type === "spacing") {
        const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
        valueWithContent = `${value}px`;
        const actualValue = get(
          get(values, valueExtractedFromCurlyBraces, {}),
          "value",
          ""
        );
        if (typeof actualValue === "number") {
          result[currentPath] = `${actualValue}px`;
        } else {
          result[currentPath] = actualValue;
        }
      } else if (type === "number") {
        if (typeof value === "number") {
          result[currentPath] = `${value}px`;
        } else if (typeof value === "string") {
          const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
          result[currentPath] = get(
            get(values, valueExtractedFromCurlyBraces, {}),
            "value",
            ""
          );
        }
      } else if (type === "font-family" || type === "text") {
        result[currentPath] = value;
      }
    }
  }

  return result;
}

function generateCSS(theme) {
  const themeVariables = Object.entries(theme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");

  return `
 
${themeVariables}
`;
}

const lightTokenCollection = lightColorValues.map((tokens) =>
  flattenObject(tokens)
);
const shallowMergedLightTokens = assign({}, ...lightTokenCollection);

const darkTokenCollection = darkColorValues.map((tokens) =>
  flattenObject(tokens)
);
const shallowMergedDarkTokens = assign({}, ...darkTokenCollection);

const lightThemeCSS = generateCSS(shallowMergedLightTokens);
const darkThemeCSS = generateCSS(shallowMergedDarkTokens);
// Combine the themes into one CSS file
const cssFileContent = `
/* Auto-generated theme variables */
:root {
${lightThemeCSS}
}
[data-theme="dark"]{
${darkThemeCSS}
}`;

// Write the CSS file
fs.writeFileSync("theme-variables.scss", cssFileContent);

console.log("CSS file generated successfully!");

// Main function
const generateThemeFiles = (baseDir) => {
  const tenantDirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  tenantDirs.forEach((tenant) => {
    const tenantPath = path.join(baseDir, tenant.name);
    const primitivesPath = path.join(tenantPath, "primitives.json");
    const themesDir = path.join(tenantPath, "themes");

    if (!fs.existsSync(primitivesPath) || !fs.existsSync(themesDir)) {
      console.warn(
        `Skipping ${tenant.name}, missing primitives.json or themes folder.`
      );
      return;
    }

    //   const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'))
    const themeFiles = fs
      .readdirSync(themesDir)
      .filter((file) => file.endsWith(".json"));

    const cssEntries = [];

    themeFiles.forEach((themeFile) => {
      const themeData = JSON.parse(
        fs.readFileSync(path.join(themesDir, themeFile), "utf8")
      );
      const themeTokensMap = themeData.map((tokens) => flattenObject(tokens));
      const themeName = path.basename(themeFile, ".json");
      const processedTheme = processTheme(themeData, primitives);
      cssEntries.push(generateCSS(processedTheme, themeName));
    });

    const cssContent = cssEntries.join("\n\n");
    const cssOutputPath = path.join(tenantPath, "theme-variables.css");
    fs.writeFileSync(cssOutputPath, cssContent, "utf8");
    console.log(`CSS file generated for ${tenant.name} at ${cssOutputPath}`);
  });
};

// Run the script
const baseDirectory = path.resolve(__dirname, "../theme-configs");
generateThemeFiles(baseDirectory);
