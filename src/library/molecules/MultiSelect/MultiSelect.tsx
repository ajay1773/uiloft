import React, { useState, createContext, useContext, useRef } from "react";
import styles from "./MultiSelect.module.scss";
import clsx from "clsx";
import { map } from "lodash";
import { Badge } from "@/library/atoms/Badge";
import { useOutsideClick } from "@/library/particles/hooks/useOutsideClick";

interface OptionConfig {
  metaDescription: string;
  metaView?: React.ReactNode;
}

interface Option {
  label: string;
  value: string;
  config: OptionConfig;
}

interface MultiSelectContextType {
  disabled?: boolean;
  selectedValues: string[];
  options: Option[];
  onChange: (values: string[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string;
}

const MultiSelectContext = createContext<MultiSelectContextType | undefined>(
  undefined
);

export interface MultiSelectProps {
  primaryClassName?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> & {
  Label: React.FC<{ children: React.ReactNode }>;
  Initiator: React.FC;
  OptionsWrapper: React.FC<{ children: React.ReactNode }>;
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
  selectedValues,
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
    styles["ui-multiSelect"],
    fullWidth && styles["ui-multiSelect--full"],
    primaryClassName
  );

  return (
    <MultiSelectContext.Provider
      value={{
        selectedValues,
        options,
        onChange,
        isOpen,
        setIsOpen,
        placeholder,
        disabled,
      }}
    >
      <div className={className}>
        <div ref={dropdownRef}>{children}</div>
      </div>
    </MultiSelectContext.Provider>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <label className={styles["ui-multiSelect__label"]}>{children}</label>;
};

const Initiator: React.FC = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("Initiator must be used within a MultiSelect component");
  }

  const {
    selectedValues,
    options,
    isOpen,
    setIsOpen,
    placeholder,
    disabled,
    onChange,
  } = context;

  const renderSelectedValues = () => {
    if (!selectedValues.length) {
      return <span>{placeholder || "Select options"}</span>;
    } else {
      const selectedOptions = options.filter((option) =>
        selectedValues.includes(option.value)
      );

      const handleRemove = (e: React.MouseEvent, value: string) => {
        e.stopPropagation(); // Prevent dropdown toggle when clicking the icon
        const updatedValues = selectedValues.filter((v) => v !== value);
        onChange(updatedValues);
      };

      return (
        <>
          {map(selectedOptions, (option) => {
            const { label, config } = option;
            return (
              <Badge
                hasIconOnly={false}
                preIcon={config.metaView}
                type={"badge-modern"}
                size={"sm"}
                color={"brand"}
                postIcon={
                  <span
                    onClick={(e) => {
                      handleRemove(e, option.value);
                    }}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="#A4A7AE"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                }
              >
                {label}
              </Badge>
            );
          })}
        </>
      );
    }
  };

  const className = clsx(
    styles["ui-multiSelect__dropdown"],
    disabled && styles["ui-multiSelect__dropdown--disabled"]
  );

  const initiatorClassName = clsx(
    styles["ui-multiSelect__selectedValues"],
    disabled && styles["ui-multiSelect__selectedValues--disabled"]
  );

  return (
    <div className={className} onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
      <div className={initiatorClassName}>{renderSelectedValues()}</div>
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
    <div className={styles["ui-multiSelect__helperText"]}>
      <p>{text}</p>
    </div>
  );
};

const OptionsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error(
      "OptionsWrapper must be used within a MultiSelect component"
    );
  }

  const { isOpen } = context;

  const rootClassName = clsx(
    styles["ui-multiSelect__optionsList"],
    isOpen && styles["ui-multiSelect__optionsList--visible"]
  );

  return <ul className={rootClassName}>{children}</ul>;
};

const Option: React.FC<{
  label: string;
  value: string;
  config?: OptionConfig;
}> = ({ label, value, config }) => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("Option must be used within a MultiSelect component");
  }

  const { selectedValues, onChange } = context;

  const handleSelect = () => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  const isSelectedOption = selectedValues.includes(value);

  const primaryClassName = clsx(
    styles["ui-multiSelect__option"],
    isSelectedOption && styles.selected
  );

  return (
    <li key={value} className={primaryClassName} onClick={handleSelect}>
      <div className={styles["ui-multiSelect__option__values"]}>
        {config?.metaView && config.metaView}
        <div className={styles["ui-multiSelect__option__values__optionLabel"]}>
          {label}
        </div>
        <div className={styles["ui-multiSelect__option__values__optionValue"]}>
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
MultiSelect.Label = Label;
MultiSelect.Initiator = Initiator;
MultiSelect.OptionsWrapper = OptionsWrapper;
MultiSelect.Option = Option;
MultiSelect.HelperText = HelperText;

export default MultiSelect;
