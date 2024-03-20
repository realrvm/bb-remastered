import { FC, PropsWithChildren } from "react";

import { cn } from "@/shared/lib/cn";

export const Container: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return <div className={cn("container max-w-7xl", className)}>{children}</div>;
};
