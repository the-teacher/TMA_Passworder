import { useEffect, useState, useRef } from "react";

type UseAppModalRootOptions = {
  containerId?: string;
  containerElement?: HTMLElement;
};

export const useAppModalRoot = ({
  containerId = "app-modal-root",
  containerElement
}: UseAppModalRootOptions = {}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If containerElement is provided, use it
    if (containerElement) {
      setModalRoot(containerElement);
      return;
    }

    // Otherwise, try to find or create element by ID
    let element = document.getElementById(containerId);

    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
      elementRef.current = element;
    }

    setModalRoot(element);

    // Cleanup only if we created the element
    return () => {
      if (!containerElement && elementRef.current?.parentNode) {
        elementRef.current.parentNode.removeChild(elementRef.current);
        elementRef.current = null;
      }
    };
  }, [containerId, containerElement]);

  return modalRoot;
};
