import React, { useMemo } from "react";

type CheckboxIconProps = {
  size: "sm" | "md";
  disabled: boolean;
  indeterminate: boolean;
};

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  size,
  disabled,
  indeterminate,
}) => {
  // Configuration object mapping keys to SVG components
  const iconConfig: Record<string, React.JSX.Element> = {
    "enabled-sm-check": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="white"
          strokeWidth="1.6666"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "enabled-md-check": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="white"
          strokeWidth="1.6666"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "disabled-sm-check": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="#D5D7DA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "disabled-md-check": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.3334 4L6.00002 11.3333L2.66669 8"
          stroke="#D5D7DA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "enabled-sm-indeterminate": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6H9.5"
          stroke="white"
          strokeWidth="1.66666"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "enabled-md-indeterminate": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M2.91669 7H11.0834"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "disabled-sm-indeterminate": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6H9.5"
          stroke="#D5D7DA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "disabled-md-indeterminate": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.33331 8H12.6666"
          stroke="#D5D7DA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  // Generate the key dynamically based on props
  const key = useMemo(() => {
    const state = disabled ? "disabled" : "enabled";
    const type = indeterminate ? "indeterminate" : "check";
    return `${state}-${size}-${type}`;
  }, [size, disabled, indeterminate]);

  // Fallback to a default icon if the key is invalid
  return iconConfig[key] || null;
};

export default CheckboxIcon;
