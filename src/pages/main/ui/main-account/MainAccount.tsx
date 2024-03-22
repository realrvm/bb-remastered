import { FC } from "react";

import { AppImage } from "@/shared/ui/app-image";
import { Button } from "@/shared/ui/button";
import { Calendar, Cash, CreditCard, Info } from "@/shared/ui/icons";
import { useNavigate } from "react-router-dom";

export const MainAccount: FC = () => {
  return (
    <section className="my-[1.85rem] md:my-11 rounded-xl bg-brand-light">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 max-h-[unset] md:max-h-[515px] p-6 md:pt-8 md:px-12 md:pb-12">
          <AppImage
            src="/phone.png"
            alt="phone"
            className="object-contain aspect-square w-full h-full"
          />
        </div>
        <div className="flex-1 p-6 md:p-12">
          <h3 className="heading-3 md:heading-title mb-9">
            Личный кабинет
            <br />
            для работы с займами
          </h3>
          <ul className="mb-9">
            <li className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 bg-common-white rounded-full shrink-0 grid place-items-center">
                <CreditCard />
              </span>
              <span>Внести платёж банковской картой без комиссии</span>
            </li>
            <li className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 bg-common-white rounded-full shrink-0 grid place-items-center">
                <Calendar />
              </span>
              <span>Проверить график платежей</span>
            </li>
            <li className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 bg-common-white rounded-full shrink-0 grid place-items-center">
                <Info />
              </span>
              <span>Посмотреть информацию по договору</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-12 h-12 bg-common-white rounded-full shrink-0 grid place-items-center">
                <Cash />
              </span>
              <span>Узнать сумму для полного погашения</span>
            </li>
          </ul>
          <MainAccountLink />
        </div>
      </div>
    </section>
  );
};

const MainAccountLink: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="w-full md:w-auto text-center py-3 px-5 heading-5"
      onClick={() => navigate("auth/account")}
    >
      Войти в личный кабинет
    </Button>
  );
};
