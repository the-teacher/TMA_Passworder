import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, type FormData } from "./validationSchema";
import { useSubmitForm } from "./hooks/useSubmitForm";
import type { ServerErrors } from "./utils/getFieldStatus";
import CreatePasswordEntryFormView from "./CreatePasswordEntryFormView";
import EventEmitter from "@lib/EventEmitter";
import { useTranslation } from "react-i18next";

const CreatePasswordEntryForm = () => {
  const [formError, setFormError] = useState("");
  const { t } = useTranslation("CreatePasswordEntryForm");

  const methods = useForm<FormData>({
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

  const { submitForm } = useSubmitForm();

  const handleSubmitSuccess = () => {
    EventEmitter.emit("NOTIFICATION", t("messages.formSubmitted"));
    methods.reset();
  };

  const handleSubmitError = (errors: ServerErrors) => {
    if (errors.form_error) {
      setFormError(errors.form_error);
    }
    if (errors.errors) {
      Object.entries(errors.errors).forEach(([field, error]) => {
        methods.setError(field as keyof FormData, {
          type: "server",
          message: error.message
        });
      });
    }
  };

  const handleFormSubmit = methods.handleSubmit((data) => {
    submitForm(data, handleSubmitSuccess, handleSubmitError);
  });

  return (
    <CreatePasswordEntryFormView
      methods={methods}
      formError={formError}
      onSubmit={handleFormSubmit}
      onReset={() => methods.reset()}
    />
  );
};

export default CreatePasswordEntryForm;
