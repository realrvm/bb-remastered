import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  element: HTMLElement;
};

export const Portal: FC<PropsWithChildren<PortalProps>> = ({
  children,
  element,
}) => {
  return createPortal(children, element);
};
