import {
  FC,
  MutableRefObject,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.css";

import { Portal } from "@/shared/ui/portal";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  removeWhenClosed?: boolean;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  removeWhenClosed = true,
  children,
}) => {
  const element = "modal";

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

  return (
    <Portal element={portalRootRef.current}>
      <div className={styles["modal-container"]}>
        <div
          className={clsx(styles["modal"], {
            [styles.open]: isOpen,
            [styles.in]: isTransitioning,
          })}
        >
          {children}
        </div>
        <div className={styles["backdrop"]} onClick={onClose} />
      </div>
    </Portal>
  );
};

function createPortalRoot(id: string) {
  const root = document.createElement("div");

  root.setAttribute("id", id);

  return root;
}

const useMountTransition = (isMounted: boolean, delay: number) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
    } else if (!isMounted && isTransitioning) {
      timeoutId = setTimeout(() => setIsTransitioning(false), delay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, isMounted, isTransitioning]);

  return isTransitioning;
};

const useAppendPortalRoot = (
  body: RefObject<HTMLBodyElement>,
  portalRootRef: MutableRefObject<HTMLElement>,
) => {
  useEffect(() => {
    (body.current as HTMLBodyElement).appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = body.current as HTMLBodyElement;

    return () => {
      portal.remove();
      bodyEl.style.overflow = "";
    };
  }, [body, portalRootRef]);
};

const usePreventScroll = (ref: RefObject<HTMLBodyElement>, isOpen: boolean) => {
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        (ref.current as HTMLBodyElement).style.overflow = "hidden";
      } else {
        (ref.current as HTMLBodyElement).style.overflow = "";
      }
    };

    updatePageScroll();
  }, [isOpen, ref]);
};
