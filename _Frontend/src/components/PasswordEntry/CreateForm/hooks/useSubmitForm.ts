import { useState } from "react";
import { useTranslation } from "react-i18next";
import EventEmitter from "@lib/EventEmitter";
import { type FormData } from "../validationSchema";
import { type ServerErrors } from "../utils/getFieldStatus";
import { submitPasswordEntry } from "../api/submitPasswordEntry";

export const useSubmitForm = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = async (
    data: FormData,
    onSuccess: () => void,
    onError: (errors: ServerErrors) => void
  ) => {
    try {
      setIsSubmitting(true);
      setFormError("");

      const result = await submitPasswordEntry(data);

      if (!result.success) {
        onError(result.errors);
        return;
      }

      onSuccess();
    } catch (error) {
      const errorMessage = t("messages.networkError", { error });
      setFormError(errorMessage);
      EventEmitter.emit("ERROR", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, formError, isSubmitting };
};
