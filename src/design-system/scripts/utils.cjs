const findValueFromColorConfig = (obj, key) => {
  const result = {};
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
      valueWithContent = `${value}px`;
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

module.exports = {
  findValueFromColorConfig,
};
