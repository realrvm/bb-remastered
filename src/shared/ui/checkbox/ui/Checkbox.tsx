import { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

type CheckboxProps = {
  label: string;
  isChecked?: boolean;
  handleCheck: (value: boolean) => void;
} & ComponentPropsWithoutRef<"input">;

export const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLInputElement,
  Omit<CheckboxProps, "ref">
>((props, ref) => {
  const { isChecked = false, label, handleCheck, ...rest } = props;

  return (
    <label className="flex gap-2">
      <input
        type="checkbox"
        className={clsx(styles["checkbox"], { [styles["checked"]]: isChecked })}
        checked={isChecked}
        onChange={(e) => handleCheck(e.target.checked)}
        ref={ref}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
});
