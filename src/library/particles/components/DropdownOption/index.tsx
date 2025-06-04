import React from "react";
import { Option, OptionConfig } from "@/library/molecules/SearchBox/SearchBox";
import styles from "./styles.module.scss";
import clsx from "clsx";

type DropdownOptionProps = Option & {
  selected?: boolean;
  onOptionClick: (details: {
    label: string;
    value: string;
    config?: OptionConfig;
  }) => void;
};

const DropdownOption: React.FC<DropdownOptionProps> = ({
  label,
  value,
  config,
  selected,
  onOptionClick,
}) => {
  const primaryClassName = clsx(
    styles["ui-option"],
    selected && styles["ui-option--active"]
  );
  return (
    <li
      key={value}
      onClick={() => onOptionClick({ label, value, config })}
      className={primaryClassName}
    >
      <div className={styles["ui-option__wrapper"]}>
        {config && <span>{config.metaView}</span>}
        <span className={styles["ui-option__main"]}>{label}</span>
        {config && (
          <span className={styles["ui-option__meta"]}>
            {config.metaDescription}
          </span>
        )}
      </div>
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16.6668 5L7.50016 14.1667L3.3335 10"
            stroke="#535862"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </li>
  );
};

export default DropdownOption;
