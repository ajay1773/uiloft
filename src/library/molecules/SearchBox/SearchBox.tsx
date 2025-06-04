import React, { useState, useRef, useMemo } from "react";
import styles from "./SearchBox.module.scss";
import clsx from "clsx";
import { useOutsideClick } from "@/library/particles/hooks/useOutsideClick";
import DropdownOptionsList from "@/library/particles/components/DropdownOptionsList";

export interface OptionConfig {
  metaDescription: string;
  metaView?: React.ReactNode;
}

export interface Option {
  label: string;
  value: string;
  config: OptionConfig;
}

export interface SearchBoxProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  options: Option[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  label,
  required,
  options,
  selectedValue,
  onChange,
  onSelect,
  placeholder = "Search...",
  disabled = false,
}) => {
  const selectedOption = useMemo(
    () =>
      options.find(
        (option) =>
          option.label === selectedValue || option.value === selectedValue
      ),
    [options, selectedValue]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    selectedOption ? selectedOption.label : ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  };

  const handleSelect = (option: Option) => {
    onSelect(option.label);
    setIsOpen(false);
    setSearchTerm(option.label);
  };

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div
      className={clsx(
        styles["ui-searchBox"],
        disabled && styles["ui-searchBox--disabled"]
      )}
      ref={dropdownRef}
    >
      {/* Label */}
      {label && (
        <label className={styles["ui-searchBox__label"]}>
          {label} {required && <>*</>}
        </label>
      )}

      {/* Search Input */}
      <div
        className={clsx(
          styles["ui-searchBox__initiator"],
          disabled && styles["ui-searchBox__initiator--disabled"]
        )}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        role="combobox"
      >
        <div className={styles["ui-searchBox__initiator__wrapper"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#717680"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder={placeholder}
            className={clsx(
              styles["ui-searchBox__initiator__input"],
              disabled && styles["ui-searchBox__initiator__input--disabled"]
            )}
            disabled={disabled}
            aria-controls="searchBox-options"
            aria-activedescendant={
              selectedValue ? `option-${selectedValue}` : undefined
            }
          />
        </div>
        <span className={styles["ui-searchBox__arrow"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
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

      {/* Options List */}
      {isOpen && (
        <DropdownOptionsList
          options={filteredOptions}
          onOptionClick={handleSelect}
          activeOptions={selectedOption ? [selectedOption] : []}
        />
      )}
    </div>
  );
};

export default SearchBox;
