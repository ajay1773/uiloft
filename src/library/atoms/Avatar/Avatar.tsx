import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import styles from "./Avatar.module.scss";

// Define avatar styles with cva
const avatarStyles = cva(styles["ui-avatar"], {
  variants: {
    size: {
      xs: styles["ui-avatar--xs"],
      sm: styles["ui-avatar--sm"],
      md: styles["ui-avatar--md"],
      lg: styles["ui-avatar--lg"],
      xl: styles["ui-avatar--xl"],
      "2xl": styles["ui-avatar--2xl"],
    },
    hasImage: {
      true: "",
      false: styles["ui-avatar--placeholder"],
    },
  },
  defaultVariants: {
    size: "md",
    hasImage: false,
  },
});

const avatarInitialsStyle = cva(styles["ui-avatar__initials"], {
  variants: {
    size: {
      xs: styles["ui-avatar__initials--xs"],
      sm: styles["ui-avatar__initials--sm"],
      md: styles["ui-avatar__initials--md"],
      lg: styles["ui-avatar__initials--lg"],
      xl: styles["ui-avatar__initials--xl"],
      "2xl": styles["ui-avatar__initials--2xl"],
    },
  },
});

// Define the Avatar component's props
type AvatarProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  image?: string; // Accept string for image URL or module
  name?: string; // Name to extract initials
  className?: string; // Custom className for overrides
  indicator?: React.ReactNode; // Optional status indicator
  customNode?: React.ReactNode; // Optional React node to display
};

const Avatar: React.FC<AvatarProps> = ({
  image,
  name,
  size,
  className,
  indicator,
  customNode,
  ...props
}) => {
  // Helper to extract initials from the name
  const getInitials = (name: string | undefined): string => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join("");
  };

  const finalClassName = clsx(
    avatarStyles({
      size,
      hasImage: Boolean(image),
    }),
    className
  );

  return (
    <div className={finalClassName} {...props}>
      {image ? (
        <img
          src={image}
          alt={name || "Avatar"}
          className={styles["ui-avatar__image"]}
        />
      ) : customNode ? (
        <div className={styles["ui-avatar__customNode"]}>{customNode}</div>
      ) : (
        <span className={avatarInitialsStyle({ size })}>
          {getInitials(name)}
        </span>
      )}

      {indicator && (
        <div className={styles["ui-avatar__indicatorWrapper"]}>{indicator}</div>
      )}
    </div>
  );
};

export default Avatar;
