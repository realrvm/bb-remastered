import { FormEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterApi } from "../../model/api/registerApi";
import { phoneValueSchema } from "../../config/schema";
import { isErrorWithMessage, isFetchBaseQueryError } from "../helpers";

export function useRegister() {
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { success: isPhoneReady } = phoneValueSchema.safeParse(phoneValue);

  const [register, { isLoading: isLoadingRegistration }] = useRegisterApi({
    fixedCacheKey: "shared-register-post",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      setError("");

      try {
        await register({ phone_number: `+7${phoneValue}` }).unwrap();

        navigate("auth/otp");
      } catch (err) {
        setPhoneValue("");

        if (isFetchBaseQueryError(err)) {
          let errMsg = "Что-то  пошло не так";

          if (err.status === 400) {
            errMsg = "Неверный номер телефона";
          }
          if (err.status === 500) {
            errMsg = "Ошибка сервера";
          }

          setError(errMsg);
        } else if (isErrorWithMessage(err)) {
          setError(err.data.phone_number);
        }
      }
    },
    [phoneValue, register, navigate],
  );

  return {
    setPhoneValue,
    isLoadingRegistration,
    handleSubmit,
    error,
    isPhoneReady,
  };
}
