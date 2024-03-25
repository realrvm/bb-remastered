import { FC, useRef } from "react";
import { NavLink } from "react-router-dom";

import { SidebarItem } from "../../lib/types";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import styles from "./styles.module.css";
import { cn } from "@/shared/lib/cn";

export const SidebarMobile: FC<{ sidebarItems: SidebarItem[] }> = ({
  sidebarItems,
}) => {
  const refSidebarMobile = useRef<HTMLDivElement | null>(null);
  useSwipe(refSidebarMobile);

  return (
    <div
      className="w-screen overflow-y-auto overflow-x-hidden grid grid-cols-1 -ml-[30px] no-scrollbar"
      ref={refSidebarMobile}
    >
      <div className="grid grid-cols-[auto_30px] translate-x-[30px]">
        <ul className="grid gap-0.5 grid-cols-[repeat(5,min-content)] p-0.5 rounded-[6px] max-w-[606px] border border-border-gray bg:bg-light-gray">
          {sidebarItems.map(({ path, caption }) => (
            <li key={path}>
              <SidebarMobileItem path={path} caption={caption} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SidebarMobileItem: FC<SidebarItem> = ({ caption, path }) => {
  return (
    <div className={cn("heading-6", styles["mobile-sidebar-link"])}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        {caption}
      </NavLink>
    </div>
  );
};
