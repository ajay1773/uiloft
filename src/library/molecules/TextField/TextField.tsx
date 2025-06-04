import React, { forwardRef, HTMLProps, Ref } from "react";
import styles from "./TextField.module.scss";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

export type TextFieldProps = Omit<HTMLProps<HTMLInputElement>, "size"> & {
  size?: "sm" | "md";
  label?: string;
  placeholder?: string;
  required?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  helperIcon?: React.ReactNode;
  helperText?: string;
  name: string;
  errors?: FieldError;
  mainClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
};

const TextField: React.FC<TextFieldProps> = forwardRef(
  (
    {
      placeholder,
      label,
      required = false,
      helperIcon,
      leadingIcon,
      disabled = false,
      destructive = false,
      helperText = "",
      size = "sm",
      name,
      errors,
      mainClassName = "",
      wrapperClassName = "",
      inputClassName = "",
      labelClassName = "",
      helperTextClassName = "",
      ...restInputProps
    }: TextFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const className = clsx(
      styles["ui-textfield__inputWrapper"],
      disabled && styles["ui-textfield__inputWrapper--disabled"],
      size === "md" && styles["ui-textfield__inputWrapper--md"],
      size === "sm" && styles["ui-textfield__inputWrapper--sm"],
      (destructive || errors) &&
        styles["ui-textfield__inputWrapper--destructive"],
      wrapperClassName
    );

    const helperTextClass = clsx(
      styles["ui-textfield__inputWrapper__helperText"],
      (destructive || errors) &&
        styles["ui-textfield__inputWrapper__helperText--destructive"],
      helperTextClassName
    );
    return (
      <div className={`${styles["ui-textfield"]} ${mainClassName}`}>
        {label && (
          <label
            className={`${styles["ui-textfield__label"]} ${labelClassName}`}
            htmlFor={name}
          >
            {label}
            {required && (
              <span className={styles["ui-textfield__label__asterisk"]}>*</span>
            )}
          </label>
        )}
        <div className={className}>
          {leadingIcon && leadingIcon}
          <input
            {...restInputProps}
            id={name}
            disabled={disabled}
            placeholder={placeholder}
            ref={ref}
            className={`${styles["ui-textfield__inputWrapper__input"]} ${inputClassName}`}
          />
          {helperIcon && helperIcon}
        </div>
        {(helperText || errors) && (
          <p className={helperTextClass}>
            {errors ? errors.message : helperText}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;
