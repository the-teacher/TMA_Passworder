import { createPortal } from "react-dom";
import "./styles.scss";
import AppIcon from "@components/AppIcon";

type ModalRenderProps = {
  close: () => void;
};

type AppModalProps = {
  title?: string;
  children: React.ReactNode | ((props: ModalRenderProps) => React.ReactNode);
  size?: "small" | "medium" | "large";
  close: () => void;
  portalElement?: HTMLElement | null;
};

type ModalHeaderProps = {
  title?: string;
  close: () => void;
};

type ModalBodyProps = {
  children: React.ReactNode;
};

type ModalContentProps = {
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  close: () => void;
};

const ModalHeader = ({ title, close }: ModalHeaderProps) => (
  <div className="app-modal--header">
    {title && <h2 className="app-modal--title">{title}</h2>}
    <button
      className="btn btn--icon app-modal--close"
      onClick={close}
      aria-label="Close modal"
    >
      <AppIcon size={24} type="square-x" alt="Close" />
    </button>
  </div>
);

const ModalBody = ({ children }: ModalBodyProps) => (
  <div className="app-modal--body">{children}</div>
);

const ModalContent = ({ children, size, close }: ModalContentProps) => (
  <div
    className="app-modal"
    onClick={close}
    data-testid="modal-overlay"
    role="dialog"
    aria-modal="true"
  >
    <div
      className={`app-modal--content app-modal--${size}`}
      onClick={(e) => e.stopPropagation()}
      data-testid="modal-content"
    >
      {children}
    </div>
  </div>
);

export const AppModal = ({
  title,
  children,
  size = "medium",
  close,
  portalElement
}: AppModalProps) => {
  if (!portalElement) {
    console.warn("AppModal: No portal element found, rendering inline");
    return null;
  }

  const modalContent =
    typeof children === "function" ? children({ close }) : children;

  const modal = (
    <ModalContent size={size} close={close}>
      <ModalHeader title={title} close={close} />
      <ModalBody>{modalContent}</ModalBody>
    </ModalContent>
  );

  return createPortal(modal, portalElement);
};
