import { FormEventHandler, useState } from "react";

import { useRegisterApi } from "../../model/api/registerApi";

export function useRegister() {
  const [phoneValue, setPhoneValue] = useState("");

  const [register, { isLoading: isLoadingRegistration }] = useRegisterApi({
    fixedCacheKey: "shared-register-post",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await register({ phone_number: `+7${phoneValue}` });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return [setPhoneValue, isLoadingRegistration, handleSubmit] as const;
}
