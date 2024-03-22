import { useCallback, useState } from "react";

import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Funding } from "@/shared/ui/icons";
import { InputMask } from "@/shared/ui/input-mask";

const AuthLoan = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [checked, isChecked] = useState(false);
  console.log(phoneValue);

  const handleCheck = useCallback((state: boolean) => {
    isChecked(state);
  }, []);
  return (
    <>
      <div className="w-12 h-12 shrink-0 rounded-full bg-icon-bg mb-6 grid place-items-center">
        <Funding />
      </div>
      <h2 className="heading-title md:heading-2 mb-3">Получить деньги</h2>
      <p className="mb-6 md:mb-12 text-center">
        Введите номер телефона. На него вы получите СМС с кодом или звонок —
        сбросьте его и введите последние 4 цифры номера.
      </p>
      <form className="flex flex-col max-w-full md:max-w-[408px] h-full md:h-auto">
        <label>
          <span className="inline-block mb-2">Номер телефона</span>
          <InputMask setCard={setPhoneValue} />
        </label>
        <div className="mb-6 md:mb-12 flex items-baseline">
          <Checkbox handleCheck={handleCheck} checked={checked} label="" />
          <p className="text-small md:text-medium ml-2">
            Я даю{" "}
            <AppLink to="*" className="hover:underline text-common-brand">
              согласие
            </AppLink>{" "}
            на обработку своих персональных данных в соответствии с Федеральным
            законом «О персональных данных» от 27.07.2006 N 152-ФЗ
          </p>
        </div>
        <Button>Получить код из СМС</Button>
      </form>
    </>
  );
};

export default AuthLoan;
