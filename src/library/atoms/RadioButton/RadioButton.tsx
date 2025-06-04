import React from "react";
import clsx from "clsx";
import styles from "./RadioButton.module.scss";

type RadioButtonProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size: "sm" | "md";
  className?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked,
  onChange,
  disabled = false,
  size,
  className,
}) => {
  const rootClassName = clsx(
    styles["ui-radio-button"],
    checked && styles["ui-radio-button--checked"],
    disabled && styles["ui-radio-button--disabled"],
    size === "md" && styles["ui-radio-button--md"],
    size === "sm" && styles["ui-radio-button--sm"],
    className
  );

  const innerCircleClassName = clsx(
    styles["ui-radio-button__innerCircle"],
    disabled && styles["ui-radio-button__innerCircle--disabled"],
    size === "md" && styles["ui-radio-button__innerCircle--md"],
    size === "sm" && styles["ui-radio-button__innerCircle--sm"]
  );

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <span
      className={rootClassName}
      role="radio"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      {checked && <span className={innerCircleClassName}></span>}
    </span>
  );
};

export default RadioButton;
