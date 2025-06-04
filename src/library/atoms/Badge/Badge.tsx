import React from "react";
import clsx from "clsx";
import styles from "./Badge.module.scss";

type BadgeProps = {
  className?: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  children?: React.ReactNode;
  hasIconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "pill-color" | "pill-outline" | "badge-color" | "badge-modern";
  color?:
    | "brand"
    | "warning"
    | "success"
    | "gray-blue"
    | "blue-gray"
    | "blue-light"
    | "indigo"
    | "purple"
    | "blue"
    | "pink"
    | "orange"
    | "error"
    | "gray";
};

const Badge: React.FC<BadgeProps> = ({
  size = "md",
  type = "pill-color",
  className,
  preIcon,
  postIcon,
  children,
  color,
  hasIconOnly = false,
}) => {
  const hasElementAsChildren = Boolean(preIcon || postIcon);

  // Compute additional styles dynamically
  const finalClassName = clsx(
    styles["ui-badge"],
    color && styles[`ui-badge--${color}`],
    size && styles[`ui-badge--${size}`],
    type && styles[`ui-badge--${type}`],
    hasIconOnly && styles["ui-badge--node"], // Apply specific style if icon-only
    hasElementAsChildren && size === "lg" && styles["ui-badge--lg-withIcon"],
    hasElementAsChildren && size === "md" && styles["ui-badge--md-withIcon"],
    hasElementAsChildren && size === "sm" && styles["ui-badge--sm-withIcon"],
    className // Allow external classNames
  );

  return (
    <div className={finalClassName}>
      {preIcon && preIcon}
      {children && children}
      {postIcon && postIcon}
    </div>
  );
};

export default Badge;
