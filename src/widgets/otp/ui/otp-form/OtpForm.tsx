import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  FC,
  useCallback,
  useMemo,
  memo,
} from "react";

import { cn } from "@/shared/lib/cn";
import { DIGIT_REGEX, OTP_LENGTH } from "@/shared/lib/constants";
import { useFocus } from "@/shared/lib/hooks/useFocus";

type OtpFormProps = {
  value: string;
  onChange: (value: string) => void;
  valueLength?: number;
  isWrongRegisterData?: boolean;
};

export const OtpForm: FC<OtpFormProps> = memo(
  ({
    value,
    valueLength = OTP_LENGTH,
    onChange,
    isWrongRegisterData = false,
  }) => {
    const items = useMemo(() => {
      const valueArray = [...value];
      const itemsArray: string[] = [];

      Array.from({ length: valueLength }, (_, i) => {
        const char = valueArray[i];

        DIGIT_REGEX.test(char) ? itemsArray.push(char) : itemsArray.push("");
      });

      return itemsArray;
    }, [value, valueLength]);

    const firstInputRef = useFocus();

    const focusToNextInput = useCallback((target: HTMLElement) => {
      const nextElementSibling =
        target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    }, []);

    const focusToPrevInput = useCallback((target: HTMLElement) => {
      const prevElementSibling =
        target.previousElementSibling as HTMLInputElement | null;

      if (prevElementSibling) {
        prevElementSibling.focus();
      }
    }, []);

    const handleOnChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const target = e.target;

        let targetValue = target.value.trim();

        const isTargetValueDigit = DIGIT_REGEX.test(targetValue);

        if (!isTargetValueDigit && targetValue !== "") return;

        const nextInput = target.nextElementSibling as HTMLInputElement | null;

        if (!isTargetValueDigit && nextInput && nextInput.value !== "") {
          return;
        }

        targetValue = isTargetValueDigit ? targetValue : " ";

        const targetValueLen = targetValue.length;

        if (targetValueLen === 1) {
          const newValue =
            value.substring(0, index) +
            targetValue +
            value.substring(index + 1);

          onChange(newValue);

          if (!isTargetValueDigit) {
            return;
          }

          focusToNextInput(target);
        } else if (targetValueLen === valueLength) {
          onChange(targetValue);

          target.blur();
        }
      },
      [onChange, focusToNextInput, value, valueLength],
    );

    const handleOnFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
      const { target } = e;

      const prevInput =
        target.previousElementSibling as HTMLInputElement | null;

      if (prevInput && prevInput.value === "") {
        return prevInput.focus();
      }

      target.setSelectionRange(0, target.value.length);
    }, []);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        const target = e.target as HTMLInputElement;

        if (key === "ArrowRight" || key === "ArrowDown") {
          e.preventDefault();
          return focusToNextInput(target);
        }

        if (key === "ArrowLeft" || key === "ArrowUp") {
          e.preventDefault();
          return focusToPrevInput(target);
        }

        const targetValue = target.value;

        target.setSelectionRange(0, targetValue.length);

        if (e.key !== "Backspace" || targetValue !== "") {
          return;
        }

        focusToPrevInput(target);
      },
      [focusToNextInput, focusToPrevInput],
    );

    return (
      <div className="flex max-w-[304px] mx-auto gap-6">
        {items.map((digit, index: number) => (
          <input
            ref={index === 0 ? firstInputRef : null}
            key={index}
            type="text"
            value={digit}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={valueLength}
            className={cn(
              "outline-none text-center w-full border-b-2 border-b-border-gray font-normal text-2xl leading-8",
              {
                "mr-5": index === 2,
                "boder-b-2 border-b-special-red": isWrongRegisterData,
              },
            )}
            onChange={(e) => handleOnChange(e, index)}
            onFocus={handleOnFocus}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    );
  },
);
