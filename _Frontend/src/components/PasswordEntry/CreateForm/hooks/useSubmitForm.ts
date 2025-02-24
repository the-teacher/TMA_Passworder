import { useState } from "react";
import EventEmitter from "@lib/EventEmitter";

export const useSubmitForm = () => {
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = async (
    data: Record<string, unknown>,
    setError: (field: string, error: { type: string; message: string }) => void,
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
            setError(field, { type: "server", message: result.errors[field] });
          });
        }

        if (result.form_error) {
          setFormError(result.form_error);
        }

        setIsSubmitting(false);
        return;
      }

      // console.log("Форма успешно отправлена:", result);
      EventEmitter.emit("NOTIFICATION", "Форма успешно отправлена");
    } catch (error) {
      setFormError(`Ошибка сети. Попробуйте позже. ${error}`);
      EventEmitter.emit("ERROR", `Ошибка сети. Попробуйте позже. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, formError, isSubmitting };
};
