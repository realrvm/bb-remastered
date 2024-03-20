import {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
  ReactNode,
  memo,
} from "react";

import { cn } from "@/shared/lib/cn";
import { ButtonThemes } from "@/shared/lib/enums";

type ButtonProps = {
  variant?: ButtonThemes;
  className?: string;
  icon?: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const {
    variant = ButtonThemes.PRIMARY,
    className = "btn-medium",
    icon,
    children,
    ...rest
  } = props;

  return (
    <button className={cn(variant, className)} {...rest}>
      {icon ? (
        <span className="flex items-center gap-x-2">
          {icon}
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
});
