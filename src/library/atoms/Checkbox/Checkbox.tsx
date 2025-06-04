import React from "react";
import clsx from "clsx";
import * as RADCheckbox from "@radix-ui/react-checkbox";
import CheckboxIcon from "./components/CheckboxIcon";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  size: "sm" | "md";
  disabled?: boolean;
  indeterminate?: boolean;
  checked: boolean;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  size = "sm",
  disabled = false,
  indeterminate = false,
  checked = false,
  onChange,
}) => {
  const checkboxRootClassName = clsx(
    styles["ui-checkbox"],
    size === "md" && styles["ui-checkbox--md"],
    size === "sm" && styles["ui-checkbox--sm"],
    disabled && styles["ui-checkbox--disabled"]
  );

  const handleChange = (checked: boolean) => {
    if (onChange) {
      onChange(checked, indeterminate);
    }
  };

  return (
    <RADCheckbox.Root
      className={checkboxRootClassName}
      checked={checked}
      id="c1"
      disabled={disabled}
      onCheckedChange={handleChange}
    >
      <RADCheckbox.Indicator className={styles["ui-checkbox__indicator"]}>
        {/* Use CheckboxIcon */}
        <CheckboxIcon
          size={size}
          disabled={disabled}
          indeterminate={indeterminate}
        />
      </RADCheckbox.Indicator>
    </RADCheckbox.Root>
  );
};

export default Checkbox;
