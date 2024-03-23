import { useEffect, useRef } from "react";

export function useInputMaskRegion(
  focus: boolean | undefined,
  onSetRegion: (region: string) => void,
) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChangeRegion = () => {
    const regionValue = ref.current?.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})/);

    if (regionValue && ref.current) {
      ref.current.value = regionValue[1];
    }

    onSetRegion(ref.current?.value || "00");
  };

  useEffect(() => {
    focus && ref.current?.focus();
  }, [focus]);

  return { ref, handleChangeRegion };
}
