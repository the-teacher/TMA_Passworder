import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, type FormData } from "./validationSchema";
import { useSubmitForm } from "./hooks/useSubmitForm";
import CreatePasswordEntryFormView from "./CreatePasswordEntryFormView";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const CreatePasswordEntryForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, touchedFields }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(validationSchema)
  });

  const { submitForm, formError, isSubmitting } = useSubmitForm();

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

  const handleFormSubmit = handleSubmit((data) => {
    submitForm(data, setError, clearErrors);
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
