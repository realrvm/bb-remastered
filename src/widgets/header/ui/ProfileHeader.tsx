import { FC } from "react";

import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Logo, Profile } from "@/shared/ui/icons";
import { Container } from "@/widgets/container";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { Widths } from "@/shared/lib/enums";

export const ProfileHeader: FC = () => {
  const { width } = useWindowWidth();

  const isMobile = width < 768;

  return (
    <header className="h-20 md:h-[76px]">
      <Container className="h-full">
        <nav className="flex h-full items-center justify-between">
          <AppLink to="/">
            <Logo width={isMobile ? Widths.MOBILE : Widths.DESKTOP} />
          </AppLink>
          <div className="flex items-center gap-12">
            <div className="hidden md:flex items-center gap-2">
              <Profile />
              <span>ID: 82332344</span>
            </div>
            <Button onClick={() => {}} className="btn-small">
              Получить займ
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};
