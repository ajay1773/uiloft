import React, { useState } from "react";
import clsx from "clsx";
import styles from "./RadioGroup.module.scss";
import { RadioButton } from "uiloft";

type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  defaultValue?: string;
  size?: "sm" | "md";
  onChange?: (value: string) => void;
  className?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  defaultValue,
  size = "md",
  onChange,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      className={clsx(styles["ui-radio-group"], className)}
      role="radiogroup"
      aria-labelledby={`${name}-label`}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={styles["ui-radio-group__item"]}
          aria-checked={selectedValue === option.value}
        >
          <RadioButton
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            disabled={option.disabled}
            size={size}
          />
          <label
            htmlFor={option.value}
            className={clsx(
              styles["ui-radio-group__label"],
              option.disabled && styles["ui-radio-group__label--disabled"]
            )}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
