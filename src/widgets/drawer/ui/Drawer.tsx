import { FC, ReactNode, useEffect, useRef } from "react";

import { Portal } from "@/shared/ui/portal";
import { usePreventScroll } from "@/shared/lib/hooks/usePreventScroll";
import { useAppendPortalRoot } from "@/shared/lib/hooks/useAppendPortalRoot";
import { useMountTransition } from "@/shared/lib/hooks/useMountTransition";
import { createPortalRoot } from "@/shared/lib/helpers/createPortalRoot";

import styles from "./styles.module.css";
import { cn } from "@/shared/lib/cn";

type DrawerProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  position?: "top";
  removeWhenClosed?: boolean;
};

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  children,
  onClose,
  removeWhenClosed = true,
  position = "top",
}) => {
  const element = "drawer";

  const bodyRef = useRef<HTMLBodyElement>(document.querySelector("body"));

  const portalRootRef = useRef<HTMLElement>(
    document.getElementById(element) || createPortalRoot(element),
  );

  const isTransitioning = useMountTransition(isOpen, 300);

  useAppendPortalRoot(bodyRef, portalRootRef);
  usePreventScroll(bodyRef, isOpen);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  const mods = {
    [styles.open]: isOpen,
    [styles.in]: isTransitioning,
  };

  return (
    <Portal element={portalRootRef.current}>
      <div className={cn(styles.bb__drawer_container, mods)}>
        <div className={cn(styles.bb__drawer, {}, styles[position])}>
          {children}
        </div>
        <div className={styles.bb__backdrop} onClick={onClose} />
      </div>
    </Portal>
  );
};
