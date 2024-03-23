import { useRef } from "react";

export function useInputMaskPlate(onSetPlate: (plate: string) => void) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChangePlate = () => {
    const plateValue = ref.current?.value
      .replace(/[^0-9\u0430-\u044f]/g, "")
      .match(/([\u0430-\u044f]{0,1})(\d{0,3})([\u0430-\u044f]{0,2})/);

    if (plateValue) {
      (ref.current as HTMLInputElement).value = !plateValue[2]
        ? plateValue[1]
        : `${plateValue[1]} ${plateValue[2]}${`${
            plateValue[3] ? ` ${plateValue[3]}` : ""
          }`}`;
    }

    const plate = ref.current?.value.replace(
      /[^0-9\u0430-\u044f]/g,
      "",
    ) as string;

    onSetPlate(plate.toUpperCase());
  };

  return { ref, handleChangePlate };
}
