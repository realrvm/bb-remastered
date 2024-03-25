import { FC } from "react";
import { NavLink } from "react-router-dom";

import { SidebarItem } from "../../lib/types";
import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.css";

export const SidebarDesktop: FC<{ sidebarItems: SidebarItem[] }> = ({
  sidebarItems,
}) => {
  return (
    <ul className="max-w-[224px] w-full flex flex-col gap-1">
      {sidebarItems.map(({ path, caption }) => (
        <SidebarDesktopItem key={path} path={path} caption={caption} />
      ))}
    </ul>
  );
};

const SidebarDesktopItem: FC<SidebarItem> = ({ caption, path }) => {
  return (
    <li className={cn("heading-5", styles["sidebar-link"])}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        {caption}
      </NavLink>
    </li>
  );
};
