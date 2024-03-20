import { useState, useEffect } from "react";

type Width = {
  width: number;
};

function getWindowWidth(): Width {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export function useWindowWidth(): Width {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
