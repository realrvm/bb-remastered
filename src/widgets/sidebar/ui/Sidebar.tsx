import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { SidebarDesktop } from "./sidebar-desktop/SidebarDesktop";
import { SidebarMobile } from "./sidebar-mobile/SidebarMobile";
import { TABLET_WIDTH } from "@/shared/lib/constants";
import { SidebarItem } from "../lib/types";

const sidebarItems: SidebarItem[] = [
  { caption: "Заявки", path: "/profile/main" },
  { caption: "Активные займы", path: "/profile/active" },
  { caption: "Персональные данные", path: "/profile/personal" },
  { caption: "Документы", path: "/profile/docs" },
  { caption: "Профиль", path: "/profile/client" },
];

export const Sidebar = () => {
  const { width } = useWindowWidth();

  return (
    <aside>
      {width > TABLET_WIDTH ? (
        <SidebarDesktop sidebarItems={sidebarItems} />
      ) : (
        <SidebarMobile sidebarItems={sidebarItems} />
      )}
    </aside>
  );
};
