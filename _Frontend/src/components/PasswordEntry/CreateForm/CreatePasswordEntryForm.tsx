import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, type FormData } from "./validationSchema";
import { useSubmitForm } from "./hooks/useSubmitForm";
import type { ServerErrors } from "./utils/getFieldStatus";
import CreatePasswordEntryFormView from "./CreatePasswordEntryFormView";
import EventEmitter from "@lib/EventEmitter";
import { useTranslation } from "react-i18next";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const CreatePasswordEntryForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    // clearErrors,
    formState: { errors, touchedFields }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(validationSchema)
  });

  const { submitForm, isSubmitting } = useSubmitForm();

  const generatePassword = () => {
    const password = Array.from(
      { length: PASSWORD_LENGTH },
      () => PASSWORD_CHARS[Math.floor(Math.random() * PASSWORD_CHARS.length)]
    ).join("");
    setValue("password", password, { shouldValidate: true });
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(watch("password") || "");
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const handleSubmitSuccess = () => {
    EventEmitter.emit("NOTIFICATION", t("messages.formSubmitted"));
    reset();
  };

  const handleSubmitError = (errors: ServerErrors) => {
    if (errors.form_error) {
      setFormError(errors.form_error);
    }
    if (errors.errors) {
      Object.entries(errors.errors).forEach(([field, error]) => {
        setError(field as keyof FormData, {
          type: "server",
          message: error.message
        });
      });
    }
  };

  const handleFormSubmit = handleSubmit((data) => {
    submitForm(data, handleSubmitSuccess, handleSubmitError);
  });

  return (
    <CreatePasswordEntryFormView
      register={register}
      errors={errors}
      watch={watch}
      touchedFields={touchedFields}
      isSubmitting={isSubmitting}
      showPassword={showPassword}
      formError={formError}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onGeneratePassword={generatePassword}
      onCopyPassword={copyPassword}
      onSubmit={handleFormSubmit}
      onReset={() => reset()}
    />
  );
};

export default CreatePasswordEntryForm;
