import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Logo } from "@/shared/ui/icons";
import { ButtonThemes, Widths } from "@/shared/lib/enums";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

export const HeaderMainDesktop: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-9">
        <AppLink to="/">
          <Logo width={Widths.DESKTOP} />
        </AppLink>
        <div className="flex gap-x-1 items-center rounded-lg p-0.5 text-center border border-border-gray bg-bg-light-gray">
          <AppLink
            to="*"
            className="text-common-white px-3 py-[5px] rounded-lg bg-common-brand heading-6 focus:border-none focus:outline-none"
          >
            Клиентам
          </AppLink>
          <AppLink
            to="*"
            className="text-common-black px-3 py-[5px] heading-6 focus:border-none focus:outline-none"
          >
            Агентам
          </AppLink>
        </div>
      </div>
      <div className="flex gap-x-2">
        <Button
          variant={ButtonThemes.SECONDARY}
          className="btn-small"
          onClick={() => navigate("auth/account")}
        >
          Личный кабинет
        </Button>
        <Button className="btn-small" onClick={() => navigate("auth/loan")}>
          Получить займ
        </Button>
      </div>
    </>
  );
};
