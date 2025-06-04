const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssJs = require("postcss-js");

// Helper to extract CSS variables from a file
const extractVariables = (filePath) => {
  const cssContent = fs.readFileSync(filePath, "utf8");
  const root = postcss.parse(cssContent);
  return postcssJs.objectify(root)[":root"] || {};
};

console.log(path.join(__dirname, "colors.css"));
console.log(extractVariables(path.join(__dirname, "colors.css")));
