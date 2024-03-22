import { FC } from "react";

import styles from "./styles.module.css";

export const Loader: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
