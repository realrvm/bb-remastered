import { RefObject, useEffect } from "react";

export const useAppendPortalRoot = (
  body: RefObject<HTMLBodyElement>,
  portalRootRef: RefObject<any>,
) => {
  useEffect(() => {
    (body.current as HTMLBodyElement).appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = body.current as HTMLBodyElement;

    return () => {
      portal.remove();
      bodyEl.style.overflow = "";
    };
  }, []);
};
