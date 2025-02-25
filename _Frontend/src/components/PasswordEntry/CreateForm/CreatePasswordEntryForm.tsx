import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, type FormData } from "./validationSchema";
import { useSubmitForm } from "./hooks/useSubmitForm";
import type { ServerErrors } from "./utils/getFieldStatus";
import { copyToClipboard } from "./utils/copyToClipboard";
import { generatePassword } from "./utils/generatePassword";
import CreatePasswordEntryFormView from "./CreatePasswordEntryFormView";
import EventEmitter from "@lib/EventEmitter";
import { useTranslation } from "react-i18next";

const CreatePasswordEntryForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const { t } = useTranslation("CreatePasswordEntryForm");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, touchedFields, dirtyFields, isValid }
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      serviceName: "",
      username: "",
      password: "",
      serviceUrl: "",
      notes: ""
    }
  });

  const { submitForm, isSubmitting } = useSubmitForm();

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setValue("password", password, { shouldValidate: true });
  };

  const copyPassword = async () => {
    await copyToClipboard(watch("password") || "");
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
      dirtyFields={dirtyFields}
      isSubmitting={isSubmitting}
      isValid={isValid}
      showPassword={showPassword}
      formError={formError}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onGeneratePassword={handleGeneratePassword}
      onCopyPassword={copyPassword}
      onSubmit={handleFormSubmit}
      onReset={() => reset()}
    />
  );
};

export default CreatePasswordEntryForm;
