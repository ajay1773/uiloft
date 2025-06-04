import React from "react";
import { cva } from "class-variance-authority";
import styles from "./Button.module.scss";
import clsx from "clsx";

// Define button styles with cva
const buttonStyles = cva(styles["ui-button"], {
  variants: {
    variant: {
      primary: styles["ui-button--primary"],
      secondary: styles["ui-button--secondary"],
      tertiary: styles["ui-button--tertiary"],
      link: styles["ui-button--link"],
    },
    size: {
      sm: styles["ui-button--small"],
      md: styles["ui-button--medium"],
      lg: styles["ui-button--large"],
      xl: styles["ui-button--xlarge"],
      "2xl": styles["ui-button--2xlarge"],
    },
    isDisabled: {
      true: "",
      false: "",
    },
    hasLeadingIcon: {
      true: "",
      false: "",
    },
    hasTrailingIcon: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    isDisabled: false,
  },
});

// Explicitly type the variants
type ButtonVariants = {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  isDisabled?: boolean;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

// Define the button's props
type ButtonProps = ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    leadingIcon?: React.ReactNode; // Optional icon before the text
    trailingIcon?: React.ReactNode; // Optional icon after the text
    className?: string; // External className for overriding styles
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // onClick event handler
    fullWidth?: boolean; // Prop to make button full width
  };

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  hasLeadingIcon,
  hasTrailingIcon,
  className,
  onClick,
  fullWidth = false, // Default to false,
  isDisabled,
  ...props
}) => {
  const hasElementAsChildren = typeof children === "object";
  const finalClassName = clsx(
    hasElementAsChildren && size === "2xl"
      ? styles["ui-button--2xlarge--withIcon"]
      : "",
    hasElementAsChildren && size === "xl"
      ? styles["ui-button--xlarge--withIcon"]
      : "",
    hasElementAsChildren && size === "lg"
      ? styles["ui-button--large--withIcon"]
      : "",
    hasElementAsChildren && size === "md"
      ? styles["ui-button--medium--withIcon"]
      : "",
    hasElementAsChildren && size === "sm"
      ? styles["ui-button--small--withIcon"]
      : "",
    fullWidth && styles["ui-button--fullWidth"], // Apply full width class
    className // Add external className
  );

  return (
    <button
      className={clsx(buttonStyles({ size, variant }), finalClassName)}
      onClick={onClick} // Add onClick handler
      disabled={isDisabled}
      {...props}
    >
      {/* Render the pre-text icon if provided */}
      {hasLeadingIcon && leadingIcon && (
        <span className={styles["pre-text-icon"]}>{leadingIcon}</span>
      )}
      {children}
      {/* Render the post-text icon if provided */}
      {hasTrailingIcon && trailingIcon && (
        <span className={styles["post-text-icon"]}>{trailingIcon}</span>
      )}
    </button>
  );
};

export default Button;
