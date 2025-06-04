import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import styles from "./Text.module.scss";

// Define the class variants using `cva`
const textStyles = cva(styles["ui-text"], {
  variants: {
    variant: {
      regular: styles["ui-text--regular"],
      medium: styles["ui-text--medium"],
      semibold: styles["ui-text--semibold"],
      bold: styles["ui-text--bold"],
    },
    size: {
      xs: styles["ui-text--xs"],
      sm: styles["ui-text--sm"],
      md: styles["ui-text--md"],
      lg: styles["ui-text--lg"],
      xl: styles["ui-text--xl"],
      "display-xs": styles["ui-text--display-xs"],
      "display-sm": styles["ui-text--display-sm"],
      "display-md": styles["ui-text--display-md"],
      "display-lg": styles["ui-text--display-lg"],
      "display-xl": styles["ui-text--display-xl"],
      "display-2xl": styles["ui-text--display-2xl"],
    },
  },
  defaultVariants: {
    variant: "medium", // Default variant
  },
});

// Define the props for the Text component
type TextProps = VariantProps<typeof textStyles> & {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({
  variant,
  as: Tag = "span",
  className = "",
  children,
  size,
}) => {
  return (
    <Tag className={clsx(textStyles({ variant, size }), className)}>
      {children}
    </Tag>
  );
};

export default Text;
