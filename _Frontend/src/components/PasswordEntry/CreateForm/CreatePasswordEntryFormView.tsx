import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormError from "./components/FormError";

import ServiceNameInput from "./components/ServiceNameInput";
import UsernameInput from "./components/UsernameInput";
import ServiceUrlInput from "./components/ServiceUrlInput";
import PasswordInput from "./components/PasswordInput";
import NotesInput from "./components/NotesInput";
import FormActions from "./components/FormActions";

import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/common.scss";
import "@ui-kit/spaces.scss";

import "./styles.scss";

export type Props = {
  methods: any;
  showPassword: boolean;
  formError?: string;
  onTogglePassword: () => void;
  onGeneratePassword: () => void;
  onCopyPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

const CreatePasswordEntryFormView = ({
  methods,
  showPassword,
  formError,
  onTogglePassword,
  onGeneratePassword,
  onCopyPassword,
  onSubmit,
  onReset
}: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <FormProvider {...methods}>
      <h2 className="text-center">{t("title")}</h2>

      {formError && <FormError>{formError}</FormError>}

      <form
        className="create-password-form"
        onSubmit={onSubmit}
        role="create-password-form"
      >
        <ServiceNameInput />
        <UsernameInput />
        <ServiceUrlInput />
        <PasswordInput
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
          onGeneratePassword={onGeneratePassword}
          onCopyPassword={onCopyPassword}
        />
        <NotesInput />
        <FormActions onReset={onReset} />
      </form>
    </FormProvider>
  );
};

export default CreatePasswordEntryFormView;
