import { ComponentPropsWithoutRef, FC, memo } from "react";
import { useInputMaskRegion } from "../lib/hooks";

type InputMaskRegionProps = {
  onSetRegion: (region: string) => void;
  focus: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

export const InputMaskRegion: FC<InputMaskRegionProps> = memo((props) => {
  const { onSetRegion, focus, className = "", ...rest } = props;

  const { ref: inputRegionRef, handleChangeRegion } = useInputMaskRegion(
    focus,
    onSetRegion,
  );

  return (
    <input
      type="text"
      onChange={handleChangeRegion}
      placeholder="00"
      className={className}
      ref={inputRegionRef}
      maxLength={3}
      {...rest}
    />
  );
});
