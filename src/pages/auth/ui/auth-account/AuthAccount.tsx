import { FC } from "react";

import { Button } from "@/shared/ui/button";
import { Account } from "@/shared/ui/icons";
import { InputMask } from "@/shared/ui/input-mask";
import { Loader } from "@/shared/ui/loader";
import { useRegister } from "../../lib/hooks";

const AuthAccount: FC = () => {
  const {
    setPhoneValue,
    isLoadingRegistration,
    handleSubmit,
    error,
    isPhoneReady,
  } = useRegister();

  return (
    <>
      <div className="w-12 h-12 shrink-0 rounded-full bg-icon-bg mb-6 grid place-items-center">
        <Account />
      </div>
      <h2 className="heading-title md:heading-2 mb-3">
        Войти в личный кабинет
      </h2>
      <p className="mb-6 md:mb-12 text-center">
        Введите номер телефона, на который вы оформили займ.На него вы получите
        СМС с кодом.
      </p>
      <form
        className="flex flex-col max-w-full md:max-w-[408px] h-full md:h-auto"
        onSubmit={handleSubmit}
      >
        {isLoadingRegistration ? (
          <Loader className="min-w-[300px] flex justify-center mb-[50px]" />
        ) : (
          <label className="mb-12">
            <span className="inline-block mb-2">Номер телефона</span>
            <InputMask setCard={setPhoneValue} />
            {error && (
              <span className="text-small text-special-red">{error}</span>
            )}
          </label>
        )}
        <Button disabled={!isPhoneReady || isLoadingRegistration}>
          Получить код из СМС
        </Button>
      </form>
    </>
  );
};

export default AuthAccount;
