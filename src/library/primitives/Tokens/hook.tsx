import darkColorValues from "../../../design-system/json/dark.json";
import lightColorValues from "../../../design-system/json/light.json";
import values from "../../../design-system/json/primitives.json";

import { get } from "lodash";

const useTokens = (theme: string) => {
  const variables = theme === "light" ? lightColorValues : darkColorValues;

  function extractCurlyBraceContent(str: string) {
    // Check if the string contains curly braces
    const match = str.match(/\{([^}]+)\}/);

    // If there is a match, return the content inside the curly braces; otherwise, return the original string
    return match ? match[1] : str;
  }

  function isColorCode(color: string) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findValueFromColorConfig = (obj: any, key: string) => {
    const result: { [key: string]: string } = {};
    const value = get(obj[key], "value", "");
    const category = get(obj[key], "attributes.category", "");
    const type = get(obj[key], "attributes.type", "");
    if (value) {
      if (category === "color") {
        const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
        if (isColorCode(valueExtractedFromCurlyBraces)) {
          result[key] = valueExtractedFromCurlyBraces;
        } else {
          result[key] = get(
            get(values, valueExtractedFromCurlyBraces, {}),
            "value",
            ""
          );
        }
      } else if (type === "spacing") {
        const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
        const actualValue = get(
          get(values, valueExtractedFromCurlyBraces, {}),
          "value",
          ""
        );
        if (typeof actualValue === "number") {
          result[key] = `${actualValue}px`;
        } else {
          result[key] = actualValue;
        }
      } else if (type === "number") {
        if (typeof value === "number") {
          result[key] = `${value}px`;
        } else if (typeof value === "string") {
          const valueExtractedFromCurlyBraces = extractCurlyBraceContent(value);
          result[key] = get(
            get(values, valueExtractedFromCurlyBraces, {}),
            "value",
            ""
          );
        }
      }
    }

    return result;
  };
  return {
    variables,
    findValueFromColorConfig,
  };
};

export default useTokens;
