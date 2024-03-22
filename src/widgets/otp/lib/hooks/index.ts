import { useObtainApi, useRegisterApi } from "@/pages/auth";
import { ServerErrors } from "@/shared/lib/enums";
import { useEffect, useState } from "react";

export function useOTPErrorMsg() {
  let errorMsg: null | string = null;

  const [
    register,
    {
      isError: isRegisterError,
      error: registerError,
      isLoading: isResendLoading,
    },
  ] = useRegisterApi({
    fixedCacheKey: "shared-register-post",
  });

  const [, { isError: isObtainError, error: obtainError }] = useObtainApi({
    fixedCacheKey: "shared-obtain-post",
  });

  if (isRegisterError && registerError) {
    if ("status" in registerError && registerError.status === 500) {
      const errorMessage = "data" in registerError && registerError.data;

      errorMsg =
        (errorMessage as { error: string })?.error === ServerErrors.WRONG_PHONE
          ? "Этот номер не зарегистрирован"
          : null;
    }
  }
  if (isObtainError && obtainError) {
    if ("status" in obtainError && obtainError.status === 401) {
      const errorMessage = "data" in obtainError && obtainError.data;

      errorMsg =
        (errorMessage as { detail: string })?.detail === ServerErrors.WRONG_SMS
          ? "Неправильно введен код из смс"
          : null;
    }
  }

  return {
    errorMsg,
    register,
    isResendLoading,
    isRegisterError,
    isObtainError,
  };
}

export function useFinalCountdown() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return { seconds };
}
