import React from "react";
import { Option } from "@/library/molecules/SearchBox/SearchBox";
import { find, map } from "lodash";
import styles from "./styles.module.scss";
import DropdownOption from "../DropdownOption";

type DropdownOptionsListProps = {
  options: Option[];
  activeOptions: Option[];
  onOptionClick: (option: Option) => void;
};

const DropdownOptionsList: React.FC<DropdownOptionsListProps> = ({
  options,
  activeOptions,
  onOptionClick,
}) => {
  return (
    <ul className={styles["ui-optionsList"]}>
      {map(options, (option) => {
        const selectedOption = find(
          activeOptions,
          (activeOption: Option) => activeOption.value === option.value
        );
        return (
          <DropdownOption
            onOptionClick={() => {
              onOptionClick(option);
            }}
            selected={!!selectedOption}
            {...option}
          />
        );
      })}
    </ul>
  );
};

export default DropdownOptionsList;
