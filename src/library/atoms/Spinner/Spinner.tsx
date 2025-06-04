import React from "react";
import styles from "./Spinner.module.scss";

type SpinnerProps = {
  width?: number;
  height?: number;
  color?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  width = 40,
  height = 40,
  color = "#000",
}) => {
  return (
    <div className={styles["ui-spinner"]} style={{ width, height }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={styles[`ui-spinner__bar${i + 1}`]}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default Spinner;
