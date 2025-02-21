import { useState, useMemo, useCallback } from "react";
import { useEscapeKey } from "./useEscapeKey";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useAppModalRoot } from "./useAppModalRoot";
import { AppModal } from "../AppModal";

type AppModalRenderProps = {
  close: () => void;
};

type AppModalChildren =
  | React.ReactNode
  | ((props: AppModalRenderProps) => React.ReactNode);

type AppModalOptions = {
  title?: string;
  children: AppModalChildren;
  size?: "small" | "medium" | "large";
  containerId?: string;
  containerElement?: HTMLElement;
};

export const useAppModal = ({
  title,
  children,
  size = "medium",
  containerId,
  containerElement
}: AppModalOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRoot = useAppModalRoot({ containerId, containerElement });
  useEscapeKey(() => setIsOpen(false), isOpen);
  useBodyScrollLock(isOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const modal = useMemo(() => {
    if (!isOpen) return null;

    return (
      <AppModal
        title={title}
        size={size}
        close={close}
        portalElement={modalRoot}
      >
        {typeof children === "function" ? children({ close }) : children}
      </AppModal>
    );
  }, [isOpen, title, size, close, modalRoot, children]);

  return { open, close, modal };
};
