import { FormEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterApi } from "../../model/api/registerApi";
import { phoneValueSchema } from "../../config/schema";
import { isErrorWithMessage, isFetchBaseQueryError } from "../helpers";
import { useActionCreators, useStateSelector } from "@/app/providers/rtk";
import { getPhoneNumber, phoneActions } from "@/entities/phone";
import { useObtainApi } from "../../model/api/obtainApi";
import { getTargetPage } from "@/entities/target-page";
import { authActions } from "@/features/auth";
import { OTP_LENGTH } from "@/shared/lib/constants";

export function useRegister() {
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");
  const phoneAction = useActionCreators(phoneActions);

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
        const phone_number = `+7${phoneValue}`;

        await register({ phone_number }).unwrap();

        phoneAction.setPhone(phone_number);

        navigate("/auth/otp");
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
    [phoneValue, register, navigate, phoneAction],
  );

  return {
    setPhoneValue,
    isLoadingRegistration,
    handleSubmit,
    error,
    isPhoneReady,
  };
}

export function useOTP() {
  const [otp, setOtp] = useState("");
  const [isResendable, setIsResendable] = useState(true);

  const [obtain] = useObtainApi({ fixedCacheKey: "shared-obtain-post" });
  const navigate = useNavigate();

  const authAction = useActionCreators(authActions);

  const phone = useStateSelector(getPhoneNumber);
  const targetPage = useStateSelector(getTargetPage);

  const sendAuthDataToServer = useCallback(async () => {
    try {
      const { access, refresh } = await obtain({
        phone_number: phone,
        password: otp,
      }).unwrap();

      authAction.setAccessToken({ access, refresh });
      if (targetPage) navigate(`/${targetPage}`);
    } catch (e) {
      setOtp("");
    }
  }, [otp, phone, targetPage, navigate, obtain, authAction]);

  if (otp.length === OTP_LENGTH && isResendable) {
    sendAuthDataToServer();
    setIsResendable(false);
  }

  return { otp, setOtp, setIsResendable, phone };
}
