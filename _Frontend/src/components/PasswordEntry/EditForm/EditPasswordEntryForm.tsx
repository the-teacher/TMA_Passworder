import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

import EventEmitter from "@lib/EventEmitter";

import {
  validationSchema,
  type FormData
} from "../CreateForm/validationSchema";
import { useSubmitForm } from "../CreateForm/hooks/useSubmitForm";
import type { ServerErrors } from "../CreateForm/utils/getFieldStatus";
import FormError from "../CreateForm/components/FormError/FormError";

import "@ui-kit/text-styles.scss";

import CreatePasswordEntryFormView from "./EditPasswordEntryFormView";

const EditPasswordEntryForm = () => {
  const [formError, setFormError] = useState("");
  const { t } = useTranslation("CreatePasswordEntryForm");
  const { t: e } = useTranslation("EditPasswordEntryForm");

  const methods = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      serviceName: "Github",
      username: "John Doe",
      password: "1234567890",
      serviceUrl: "https://github.com",
      notes: "This is a note"
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
    <FormProvider {...methods}>
      <h2 className="text--center">{e("title")}</h2>

      {formError && <FormError>{formError}</FormError>}

      <CreatePasswordEntryFormView onSubmit={handleFormSubmit} />
    </FormProvider>
  );
};

export default EditPasswordEntryForm;
