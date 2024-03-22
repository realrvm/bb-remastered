import { FC } from "react";

import { Logo } from "@/shared/ui/icons";
import { ButtonThemes, TargetPages, Widths } from "@/shared/lib/enums";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { useNavigateTo } from "@/shared/lib/hooks/useNavigateTo";

export const HeaderMainDesktop: FC = () => {
  const {
    handleNavigateTo: handleNavigateToProfile,
    isNavigateFetching: isNavigateFetchingToProfile,
  } = useNavigateTo(TargetPages.PROFILE);

  const {
    handleNavigateTo: handleNavigateToApplication,
    isNavigateFetching: isNavigateFetchingToApplication,
  } = useNavigateTo(TargetPages.APPLICATION);

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
          onClick={handleNavigateToProfile}
          disabled={
            isNavigateFetchingToProfile || isNavigateFetchingToApplication
          }
        >
          Личный кабинет
        </Button>
        <Button
          className="btn-small"
          onClick={handleNavigateToApplication}
          disabled={
            isNavigateFetchingToProfile || isNavigateFetchingToApplication
          }
        >
          Получить займ
        </Button>
      </div>
    </>
  );
};
