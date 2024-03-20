import { FC, PropsWithChildren, memo } from "react";
import { Link, LinkProps } from "react-router-dom";

import { cn } from "@/shared/lib/cn";

type AppLinkProps = {
  to: string;
  className?: string;
} & LinkProps;

export const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo((props) => {
  const { to, className = "", children, ...rest } = props;

  return (
    <Link
      to={to}
      className={cn(
        "rounded-lg inline-block",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
});
