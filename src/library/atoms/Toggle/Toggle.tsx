import React from "react";
import clsx from "clsx";
import * as RADToggle from "@radix-ui/react-toggle";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  active: boolean;
  size: "sm" | "md";
  type: "slim" | "default";
  disabled: boolean;
  onChange?: (active: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({
  active,
  size = "sm",
  type = "default",
  disabled = false,
  onChange,
}) => {
  const rootClassName = clsx(
    styles["ui-toggle"],
    type === "default" && styles["ui-toggle--default"],
    type === "slim" && styles["ui-toggle--slim"],
    active && styles["ui-toggle--active"],
    size === "sm" && styles["ui-toggle--sm"],
    size === "md" && styles["ui-toggle--md"],
    disabled && styles["ui-toggle--disabled"]
  );

  const indicatorClassName = clsx(
    styles["ui-toggle__indicator"],
    active && styles["ui-toggle__indicator--active"],
    size === "sm" && styles["ui-toggle__indicator--sm"],
    size === "md" && styles["ui-toggle__indicator--md"],
    type === "slim" && styles["ui-toggle__indicator--slim"]
  );

  const handleChange = (pressed: boolean) => {
    if (onChange) {
      onChange(pressed);
    }
  };
  return (
    <RADToggle.Root
      className={rootClassName}
      pressed={active}
      onPressedChange={handleChange}
    >
      <span className={indicatorClassName} />
    </RADToggle.Root>
  );
};

export default Toggle;
