import React from "react";
import containers from "@/design-system/json/containers.json";
import { entries, get } from "lodash";
import styles from "./Containers.module.scss";

type ContainersProps = {
  theme?: string;
};

const Containers: React.FC<ContainersProps> = () => {
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
    <div className={styles["ui-containers"]}>
      <p className="text-2xl font-bold  text-[var(--colors-text-text-primary-900)] transition">
        Containers
      </p>
      {entries(containers).map(([name, details]) => {
        let widthValue = extractValueInBrackets(
          extractCurlyBraceContent(get(details, "value", ""))
        );
        widthValue = widthValue ? widthValue.replace(",", "") : "";
        return (
          <div>
            <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
              {name}
            </p>
            <p className="text-[var(--colors-text-text-primary-900)]">
              {widthValue}
            </p>
            <div
              className={styles["ui-containers__wrapper"]}
              style={{ width: widthValue ? widthValue : 0 }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Containers;
