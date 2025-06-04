import React from "react";
import widths from "@/design-system/json/widths.json";
import { entries, get } from "lodash";
import styles from "./Width.module.scss";

type WidthProps = {
  theme?: string;
};

const Width: React.FC<WidthProps> = () => {
  const extractCurlyBraceContent = (str: string) => {
    // Check if the string contains curly braces
    const match = str.match(/\{([^}]+)\}/);

    // If there is a match, return the content inside the curly braces; otherwise, return the original string
    return match ? match[1] : str;
  };

  const extractValueInBrackets = (input: string): string | null => {
    const match = input.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
  };
  return (
    <div className={styles["ui-spacing"]}>
      <p className="text-2xl font-bold  text-[var(--colors-text-text-primary-900)] transition">
        Width
      </p>
      {entries(widths).map(([name, details]) => {
        let widthValue = extractValueInBrackets(
          extractCurlyBraceContent(get(details, "value", ""))
        );
        widthValue = widthValue ? widthValue.replace(",", "") : "";
        return (
          <div>
            <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
              {name}
            </p>
            <div
              className={styles["ui-spacing__wrapper"]}
              style={{ width: widthValue ? widthValue : 0 }}
            >
              <p className="text-[var(--colors-text-text-primary-900)]">
                {widthValue}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Width;
