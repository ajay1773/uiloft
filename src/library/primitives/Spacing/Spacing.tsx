import React from "react";
import spacing from "@/design-system/json/spacing.json";
import { entries, get } from "lodash";
import styles from "./Spacing.module.scss";

type SpacingProps = {
  theme?: string;
};

const Spacing: React.FC<SpacingProps> = () => {
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
        Spacing
      </p>
      {entries(spacing).map(([name, details]) => {
        const gapValue = extractValueInBrackets(
          extractCurlyBraceContent(get(details, "value", ""))
        );
        return (
          <div>
            <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
              {name}
            </p>
            <div
              className={styles["ui-spacing__wrapper"]}
              style={{ gap: gapValue ? gapValue : 0 }}
            >
              <span className={styles["ui-spacing__wrapper__element"]}>1</span>
              <span className={styles["ui-spacing__wrapper__element"]}>2</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Spacing;
