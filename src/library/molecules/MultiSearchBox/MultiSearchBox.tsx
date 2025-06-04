import React, { useState, useRef } from "react";
import styles from "./MultiSearchBox.module.scss";
import clsx from "clsx";
import { useOutsideClick } from "@/library/particles/hooks/useOutsideClick";
import DropdownOptionsList from "@/library/particles/components/DropdownOptionsList";
import { find, map } from "lodash";
import { Badge } from "uiloft";

export interface OptionConfig {
  metaDescription: string;
  metaView?: React.ReactNode;
}

export interface Option {
  label: string;
  value: string;
  config: OptionConfig;
}

export interface MultiSearchBoxProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  options: Option[];
  selectedValues: Option[];
  onQueryChange?: (value: string | null) => void;
  onOptionsChange?: (options: Option[]) => void;
  onOptionSelect?: (value: Option) => void;
  placeholder?: string;
  helperText?: string;
}

const MultiSearchBox: React.FC<MultiSearchBoxProps> = ({
  label,
  required,
  options,
  selectedValues,
  onQueryChange,
  onOptionSelect,
  placeholder = "Search...",
  disabled = false,
  onOptionsChange,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onQueryChange?.(e.target.value);
  };

  const isOptionAlreadySelected = (option: Option) => {
    return !!find(
      selectedValues,
      (selectedOption: Option) => selectedOption.value === option.value
    );
  };

  const handleSelect = (option: Option) => {
    if (!isOptionAlreadySelected(option)) {
      onOptionSelect?.(option);
      setIsOpen(false);
      // setSearchTerm(option.label);
    }
  };

  const handleRemove = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation(); // Prevent dropdown toggle when clicking the icon
    const updatedValues = selectedValues.filter(
      (v) => v.value !== option.value
    );
    onOptionsChange?.(updatedValues);
  };

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div
      className={clsx(
        styles["ui-multiSearchBox"],
        disabled && styles["ui-multiSearchBox--disabled"]
      )}
      ref={dropdownRef}
    >
      {/* Label */}
      {label && (
        <label className={styles["ui-multiSearchBox__label"]}>
          {label} {required && <>*</>}
        </label>
      )}

      {/* Search Input */}
      <div
        className={clsx(
          styles["ui-multiSearchBox__initiator"],
          isOpen && styles["ui-multiSearchBox__initiator--active"],
          disabled && styles["ui-multiSearchBox__initiator--disabled"]
        )}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        role="combobox"
      >
        <div className={styles["ui-multiSearchBox__initiator__wrapper"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#717680"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-wrap gap-2">
            {map(selectedValues, ({ config, value, label }) => {
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
                        handleRemove(e, { config, value, label });
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
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder={placeholder}
              className={clsx(
                styles["ui-multiSearchBox__initiator__input"],
                disabled &&
                  styles["ui-multiSearchBox__initiator__input--disabled"]
              )}
              disabled={disabled}
              aria-controls="multiSearchBox-options"
              aria-activedescendant={""}
            />
          </div>
        </div>
        <span className={styles["ui-multiSearchBox__arrow"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
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
      {isOpen && filteredOptions.length ? (
        <DropdownOptionsList
          options={filteredOptions}
          onOptionClick={handleSelect}
          activeOptions={selectedValues}
        />
      ) : (
        <></>
      )}
      {helperText && (
        <p className={styles["ui-multiSearchBox__helperText"]}>{helperText}</p>
      )}
    </div>
  );
};

export default MultiSearchBox;
