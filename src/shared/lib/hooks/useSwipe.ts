import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export const useSwipe = (ref: RefObject<any>) => {
  const startX = useRef(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleDown = useCallback((e: MouseEvent) => {
    setMouseDown(true);

    if (!ref.current?.contains(e.target)) return;

    startX.current = e.pageX - ref.current?.offsetLeft;

    setStartScrollLeft(ref.current?.scrollLeft);
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!ref.current?.contains(e.target)) return;
      const mouseX = e.pageX - ref.current?.offsetLeft;

      const moveX = mouseX - startX.current;

      if (mouseDown) {
        ref.current.scrollLeft = startScrollLeft - moveX;
      }
    },
    [mouseDown, startScrollLeft, startX],
  );

  const handleUp = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mousemove", handleMove);
    };
  }, [handleDown, handleMove]);
};
