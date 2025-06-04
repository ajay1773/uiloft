import React, { useState, createContext, useContext, useRef } from "react";
import styles from "./SingleSelect.module.scss";
import clsx from "clsx";
import { useOutsideClick } from "@/library/particles/hooks/useOutsideClick";

export interface OptionConfig {
  metaDescription: string;
  metaView?: React.ReactNode;
}

export interface Option {
  label: string;
  value: string;
  config?: OptionConfig;
}

export interface SingleSelectContextType {
  disabled?: boolean;
  selectedValue: string;
  options: Option[];
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string; // Add placeholder to context
}

const SingleSelectContext = createContext<SingleSelectContextType | undefined>(
  undefined
);

export interface SingleSelectProps {
  primaryClassName?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SingleSelect: React.FC<SingleSelectProps> & {
  Label: React.FC<{ children: React.ReactNode }>;
  Initiator: React.FC<{ customClassName?: string }>;
  OptionsWrapper: React.FC<{
    children: React.ReactNode;
    customClassName?: string;
  }>;
  Option: React.FC<{
    label: string;
    value: string;
    config?: OptionConfig;
  }>;
  HelperText: React.FC<{
    text: string;
  }>;
} = ({
  children,
  options,
  selectedValue,
  onChange,
  placeholder,
  fullWidth,
  disabled,
  primaryClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const className = clsx(
    styles["ui-singleSelect"],
    fullWidth && styles["ui-singleSelect--full"],
    primaryClassName
  );

  return (
    <SingleSelectContext.Provider
      value={{
        selectedValue,
        options,
        onChange,
        isOpen,
        setIsOpen,
        placeholder,
        disabled,
      }} // Pass placeholder to context
    >
      <div className={className}>
        <div ref={dropdownRef}>{children}</div>
      </div>
    </SingleSelectContext.Provider>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <label className={styles["ui-singleSelect__label"]}>{children}</label>;
};

const Initiator: React.FC<{ customClassName?: string }> = ({
  customClassName,
}) => {
  const context = useContext(SingleSelectContext);
  if (!context) {
    throw new Error("Initiator must be used within a SingleSelect component");
  }

  const { selectedValue, options, isOpen, setIsOpen, placeholder, disabled } =
    context;

  const renderSelectedValue = () => {
    if (!selectedValue) {
      return <span>{placeholder || "Select an option"}</span>;
    } else {
      const selectedOption = options.find(
        (option) => option.value === selectedValue
      );
      if (selectedOption) {
        const className = clsx(
          styles["ui-singleSelect__option__values"],
          disabled && styles["ui-singleSelect__option__values--disabled"]
        );
        return (
          <div className={className}>
            {selectedOption.config?.metaView && selectedOption.config.metaView}
            <div
              className={styles["ui-singleSelect__option__values__optionLabel"]}
            >
              {selectedOption.label}
            </div>
            <div
              className={styles["ui-singleSelect__option__values__optionValue"]}
            >
              {selectedOption.config?.metaDescription}
            </div>
          </div>
        );
      } else {
        return <span>No Matching value found</span>;
      }
    }
  };

  const className = clsx(
    styles["ui-singleSelect__dropdown"],
    disabled && styles["ui-singleSelect__dropdown--disabled"],
    customClassName
  );

  const initiatorClassName = clsx(
    styles["ui-singleSelect__selectedValue"],
    disabled && styles["ui-singleSelect__selectedValue--disabled"]
  );

  return (
    <div className={className} onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
      <div className={initiatorClassName}>{renderSelectedValue()}</div>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#717680"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

const HelperText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles["ui-singleSelect__helperText"]}>
      <p>{text}</p>
    </div>
  );
};

const OptionsWrapper: React.FC<{
  children: React.ReactNode;
  customClassName?: string;
}> = ({ children, customClassName = "" }) => {
  const context = useContext(SingleSelectContext);
  if (!context) {
    throw new Error(
      "OptionsWrapper must be used within a SingleSelect component"
    );
  }

  const { isOpen } = context;

  const rootClassName = clsx(
    styles["ui-singleSelect__optionsList"],
    isOpen && styles["ui-singleSelect__optionsList--visible"],
    customClassName
  );

  return <ul className={rootClassName}>{children}</ul>;
};

const Option: React.FC<{
  label: string;
  value: string;
  config?: OptionConfig;
}> = ({ label, value, config }) => {
  const context = useContext(SingleSelectContext);
  if (!context) {
    throw new Error("Option must be used within a SingleSelect component");
  }

  const { selectedValue, onChange, setIsOpen } = context;

  const handleSelect = () => {
    onChange(value);
    setIsOpen(false);
  };

  const isSelectedOption = selectedValue === value;

  const primaryClassName = clsx(
    styles["ui-singleSelect__option"],
    isSelectedOption && styles.selected
  );

  return (
    <li key={value} className={primaryClassName} onClick={handleSelect}>
      <div className={styles["ui-singleSelect__option__values"]}>
        {config?.metaView && config.metaView}
        <div className={styles["ui-singleSelect__option__values__optionLabel"]}>
          {label}
        </div>
        <div className={styles["ui-singleSelect__option__values__optionValue"]}>
          {config?.metaDescription}
        </div>
      </div>
      {isSelectedOption && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.6668 5L7.50016 14.1667L3.3335 10"
            stroke="#535862"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </li>
  );
};

// Attach the subcomponents to the main component
SingleSelect.Label = Label;
SingleSelect.Initiator = Initiator;
SingleSelect.OptionsWrapper = OptionsWrapper;
SingleSelect.Option = Option;
SingleSelect.HelperText = HelperText;

export default SingleSelect;
