import { TABLET_WIDTH } from "@/shared/lib/constants";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { Container } from "@/widgets/container";
import { HeaderMainDesktop } from "./header-main-desktop/HeaderMainDesktop";
import { HeaderMainMobile } from "./header-main-mobile/HeaderMainMobile";
import { FC } from "react";
import { cn } from "@/shared/lib/cn";

export const Header: FC<{ className?: string }> = ({ className = "" }) => {
  const { width } = useWindowWidth();
  const isMobile = width < TABLET_WIDTH;

  return (
    <header
      className={cn(
        "fixed h-20 bg-common-white inset-0 md:relative z-50 md:z-0 md:inset-auto md:h-[4.75rem] shadow-[0_0_4px_0_rgba(7,12,19,0.2)]",
        className,
      )}
    >
      <Container className="h-full">
        <nav className="flex items-center h-full justify-between">
          {isMobile ? <HeaderMainMobile /> : <HeaderMainDesktop />}
        </nav>
      </Container>
    </header>
  );
};
