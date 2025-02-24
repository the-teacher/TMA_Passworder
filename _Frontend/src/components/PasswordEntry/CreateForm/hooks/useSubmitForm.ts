import { useState } from "react";
import { useTranslation } from "react-i18next";
import EventEmitter from "@lib/EventEmitter";
import { type UseFormSetError } from "react-hook-form";
import { type FormData } from "../validationSchema";

export const useSubmitForm = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = async (
    data: Record<string, unknown>,
    setError: UseFormSetError<FormData>,
    clearErrors: () => void
  ) => {
    clearErrors();
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.example.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            if (field in data) {
              setError(field as keyof FormData, {
                type: "server",
                message: result.errors[field]
              });
            }
          });
        }

        if (result.form_error) {
          setFormError(result.form_error);
        }

        setIsSubmitting(false);
        return;
      }

      EventEmitter.emit("NOTIFICATION", t("messages.formSubmitted"));
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
