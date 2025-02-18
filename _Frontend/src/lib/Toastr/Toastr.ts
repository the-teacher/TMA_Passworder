import "./toastr.scss";

const DEFAULT_DURATION = 3000;
const CONTAINER_CLASS = "toastr-container";
const TOAST_BASE_CLASS = "info";
const TOAST_ANIMATION_CLASS = "toastr-toast";
const TOAST_CLOSABLE_CLASS = "info--closable";
const CLOSE_BUTTON_CLASS = "info__close";
const CLOSE_BUTTON_SYMBOL = "×";
const TOAST_TYPE_PREFIX = "info--";
const DEFAULT_PARENT_SELECTOR = "body";

type ToastType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "dark";

type ToastOptions = {
  duration?: number;
  closable?: boolean;
};

const createContainer = (parentSelector: string = DEFAULT_PARENT_SELECTOR) => {
  let parent = document.querySelector(parentSelector);

  if (!parent) {
    console.warn(
      `Element with selector "${parentSelector}" not found, using body as fallback`
    );
    parent = document.body;
  }

  const container = document.createElement("div");
  container.className = CONTAINER_CLASS;
  parent.appendChild(container);
  return container;
};

const container = createContainer();

const show = (
  message: string,
  type: ToastType = "primary",
  options: ToastOptions = {}
) => {
  const toast = document.createElement("div");
  const { duration = DEFAULT_DURATION, closable = true } = options;

  toast.className = `${TOAST_BASE_CLASS} ${TOAST_TYPE_PREFIX}${type} ${TOAST_ANIMATION_CLASS}${
    closable ? ` ${TOAST_CLOSABLE_CLASS}` : ""
  }`;
  toast.textContent = message;

  if (closable) {
    const closeButton = document.createElement("button");
    closeButton.className = CLOSE_BUTTON_CLASS;
    closeButton.innerHTML = CLOSE_BUTTON_SYMBOL;
    closeButton.onclick = () => container.removeChild(toast);
    toast.appendChild(closeButton);
  }

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, duration);
  }

  return toast;
};

const success = (message: string, options?: ToastOptions) =>
  show(message, "success", options);

const warning = (message: string, options?: ToastOptions) =>
  show(message, "warning", options);

const danger = (message: string, options?: ToastOptions) =>
  show(message, "danger", options);

const info = (message: string, options?: ToastOptions) =>
  show(message, "primary", options);

const clear = () => {
  container.innerHTML = "";
};

const initialize = (parentSelector?: string) => {
  container.remove();
  return createContainer(parentSelector);
};

export default {
  show,
  success,
  warning,
  danger,
  info,
  clear,
  initialize
};
