import { FC, useState } from "react";
import Hamburger from "hamburger-react";

import { AppLink } from "@/shared/ui/app-link";
import { Logo } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/button";
import { ButtonThemes, TargetPages } from "@/shared/lib/enums";
import { Drawer } from "@/widgets/drawer";
import { useNavigateTo } from "@/shared/lib/hooks/useNavigateTo";

export const HeaderMainMobile: FC = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <AppLink to="/">
        <Logo />
      </AppLink>
      <div className="rounded-lg bg-common-brand overflow-hidden">
        <Hamburger
          color={`#fff`}
          size={24}
          toggled={isOpenDrawer}
          onToggle={() => setIsOpenDrawer((prev) => !prev)}
        />
      </div>
      <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <DrawerContent />
      </Drawer>
    </>
  );
};

const DrawerContent = () => {
  const {
    handleNavigateTo: handleNavigateToProfile,
    isNavigateFetching: isNavigateFetchingToProfile,
  } = useNavigateTo(TargetPages.PROFILE);

  const {
    handleNavigateTo: handleNavigateToApplication,
    isNavigateFetching: isNavigateFetchingToApplication,
  } = useNavigateTo(TargetPages.APPLICATION_CALCULATOR);

  return (
    <>
      <div className="rounded-lg p-0.5 text-center border border-border-gray bg-bg-light-gray grid grid-cols-2 gap-x-1 mb-[38px]">
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
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleNavigateToApplication}
          disabled={
            isNavigateFetchingToProfile || isNavigateFetchingToApplication
          }
        >
          Получить займ
        </Button>
        <Button
          variant={ButtonThemes.SECONDARY}
          onClick={handleNavigateToProfile}
          disabled={
            isNavigateFetchingToProfile || isNavigateFetchingToApplication
          }
        >
          Личный кабинет
        </Button>
      </div>
    </>
  );
};
