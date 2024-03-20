import { FC, PropsWithChildren } from "react";

export const AppRouter: FC<PropsWithChildren> = ({ children }) => {
  return <main className="h-full">{children}</main>;
};
