import { ComponentPropsWithoutRef, FC, memo } from "react";
import { useInputMaskPlate } from "../lib/hooks";

type InputMaskPlateProps = {
  onSetPlate: (plate: string) => void;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

export const InputMaskPlate: FC<InputMaskPlateProps> = memo((props) => {
  const { onSetPlate, className = "", ...rest } = props;

  const { ref: inputPlateRef, handleChangePlate } =
    useInputMaskPlate(onSetPlate);

  return (
    <input
      type="text"
      ref={inputPlateRef}
      placeholder="A 000 AA"
      onChange={handleChangePlate}
      className={className}
      maxLength={8}
      {...rest}
    />
  );
});
