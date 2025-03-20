import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, type FormData } from "./validationSchema";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { useTranslation } from "react-i18next";
import type { ServerErrors } from "@utils/forms/getFieldStatus";
import { useParams } from "react-router";

import "@ui-kit/text-styles.scss";
import EventEmitter from "@lib/EventEmitter";

import CreatePasswordEntryFormView from "./CreatePasswordEntryFormView";
import FormError from "./components/FormError/FormError";

const CreatePasswordEntryForm = () => {
  const { id: entryId } = useParams();

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
    submitForm(entryId!, data, handleSubmitSuccess, handleSubmitError);
  });

  return (
    <FormProvider {...methods}>
      <h2 className="text--center">{t("title")}</h2>

      {formError && <FormError>{formError}</FormError>}

      <CreatePasswordEntryFormView onSubmit={handleFormSubmit} />
    </FormProvider>
  );
};

export default CreatePasswordEntryForm;
