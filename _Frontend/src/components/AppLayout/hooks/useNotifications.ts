import { useEffect } from "react";
import toastr from "@lib/Toastr";
import EventEmitter from "@lib/EventEmitter";

const showToastr = (message: string) => {
  toastr.show(message);
};

const showSuccess = (message: string) => {
  toastr.success(message);
};

const showWarning = (message: string) => {
  toastr.warning(message);
};

const showError = (message: string) => {
  toastr.danger(message);
};

export const useNotifications = () => {
  useEffect(() => {
    toastr.initialize("main.holy-grail--content");

    EventEmitter.on("NOTIFICATION", showToastr);
    EventEmitter.on("SUCCESS", showSuccess);
    EventEmitter.on("WARNING", showWarning);
    EventEmitter.on("ERROR", showError);

    return () => {
      EventEmitter.off("NOTIFICATION", showToastr);
      EventEmitter.off("SUCCESS", showSuccess);
      EventEmitter.off("WARNING", showWarning);
      EventEmitter.off("ERROR", showError);
    };
  }, []);
};
