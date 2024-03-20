import { RefObject, useEffect } from "react";

export const usePreventScroll = (
  ref: RefObject<HTMLBodyElement>,
  isOpen: boolean,
) => {
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        (ref.current as HTMLBodyElement).style.overflow = "hidden";
      } else {
        (ref.current as HTMLBodyElement).style.overflow = "";
      }
    };

    updatePageScroll();
  }, [isOpen]);
};
