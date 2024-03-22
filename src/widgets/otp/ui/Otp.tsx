import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { OtpForm } from "./otp-form/OtpForm";
import { OTP_LENGTH } from "@/shared/lib/constants";
import { useFinalCountdown, useOTPErrorMsg } from "../lib/hooks";

type OtpProps = {
  value: string;
  onChange: (value: string) => void;
  valueLength?: number;
  resendable: (e: boolean) => void;
  phone_number: string;
};

type OtpFinalCountdownProps = {
  resendOtp: () => void;
  isResending: boolean;
};

export const Otp: FC<OtpProps> = ({
  onChange,
  value,
  resendable,
  valueLength = OTP_LENGTH,
  phone_number,
}) => {
  const navigate = useNavigate();

  const {
    errorMsg,
    register,
    isResendLoading,
    isRegisterError,
    isObtainError,
  } = useOTPErrorMsg();

  const getWrongMessage = useCallback((errorMessage: string | null) => {
    return errorMessage ? (
      <p className="text-center text-special-red ml-2.5">{errorMessage}</p>
    ) : null;
  }, []);

  const resendOtp = useCallback(async () => {
    try {
      resendable(true);

      await register({ phone_number });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, [register, phone_number, resendable]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-14">
        <OtpForm
          value={value}
          onChange={onChange}
          valueLength={valueLength}
          isWrongRegisterData={isRegisterError || isObtainError}
        />
        {getWrongMessage(errorMsg)}
      </div>
      <OtpFinalCountdown resendOtp={resendOtp} isResending={isResendLoading} />
      <p className="flex pt-2 gap-2">
        Ошиблись при вводе номера?
        <button
          onClick={() => navigate(-1)}
          className="text-common-brand hover:underline"
        >
          Изменить
        </button>
      </p>
    </div>
  );
};

const OtpFinalCountdown: FC<OtpFinalCountdownProps> = memo(
  ({ resendOtp, isResending }) => {
    const { seconds } = useFinalCountdown();

    return (
      <>
        {seconds > 0 ? (
          <p>Запросить код повторно можно через {seconds} сек</p>
        ) : (
          <button
            disabled={isResending}
            onClick={resendOtp}
            className="text-common-brand hover:underline"
          >
            Выслать код повторно
          </button>
        )}
      </>
    );
  },
);
