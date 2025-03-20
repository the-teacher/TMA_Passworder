import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createAccountValidationSchema,
  type CreateAccountValidationSchemaType
} from "./validations";

import EmailInput from "./inputs/EmailInput";

import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/brand.scss";

type CreateAccountFormProps = {
  onSubmit: (data: CreateAccountValidationSchemaType) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const CreateAccountForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false
}: CreateAccountFormProps) => {
  const { t } = useTranslation("CreateAccountForm");
  const [serverError, setServerError] = useState("");

  const methods = useForm<CreateAccountValidationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(createAccountValidationSchema)
  });

  const handleFormSubmit = methods.handleSubmit((data) => {
    setServerError("");
    onSubmit(data);
  });

  return (
    <div className="mt20 card card__centered mb20">
      <div className="card--container">
        <div className="card--header flex--col flex--center">
          <img
            className="m20 brand--logo"
            src="/brand/icons/HamsterLogoHeart.svg"
            alt="Hamster Logo Heart"
          />
          <h2 className="card--title">{t("title")}</h2>
          <p className="card--subtitle">{t("subtitle")}</p>
        </div>

        <div className="card--content">
          <FormProvider {...methods}>
            <form
              id="create-account-form"
              onSubmit={handleFormSubmit}
              className="create-account-form"
            >
              {serverError && (
                <div className="info info--danger mb16">{serverError}</div>
              )}

              <EmailInput />

              <div className="info info--secondary mb16">
                <p className="text mb16">
                  <Trans
                    i18nKey="CreateAccountForm:info.emailSent"
                    components={{
                      PinCode: <span className="text--bold text--success" />
                    }}
                  />
                </p>

                <p className="text mb8">{t("info.pinCodes")}</p>
                <p className="text">{t("info.emailSecurity")}</p>
              </div>

              <p className="text mb16">
                <Trans
                  i18nKey="CreateAccountForm:disclaimer"
                  components={{
                    RulesLink: <Link to="/rules" />,
                    PolicyLink: <Link to="/privacy-policy" />
                  }}
                />
              </p>
            </form>
          </FormProvider>
        </div>

        <div className="card--footer">
          <button
            type="button"
            className="btn btn--secondary btn--large"
            onClick={onCancel}
          >
            {t("actions.cancel")}
          </button>

          <button
            type="submit"
            form="create-account-form"
            className="btn btn--primary btn--large"
            disabled={!methods.formState.isValid || isSubmitting}
          >
            {isSubmitting ? t("actions.submitting") : t("actions.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
