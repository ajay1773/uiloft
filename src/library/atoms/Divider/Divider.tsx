import type { FC } from "react";
import styles from "./Divider.module.scss";

type DividerProps = {
  className?: string;
};

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={`${styles["ui-divider"]} ${className}`}></div>;
};

export default Divider;
