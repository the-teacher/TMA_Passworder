import ServiceNameInput from "./inputs/ServiceNameInput";
import UsernameInput from "./inputs/UsernameInput";
import ServiceUrlInput from "./inputs/ServiceUrlInput";
import PasswordInput from "./inputs/PasswordInput";
import NotesInput from "./inputs/NotesInput";
import FormActions from "./inputs/FormActions";

import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/common.scss";
import "@ui-kit/spaces.scss";

import "./styles.scss";

export type Props = {
  onSubmit: (e: React.FormEvent) => void;
};

const CreatePasswordEntryFormView = ({ onSubmit }: Props) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="create-password-form"
        role="create-password-form"
      >
        <ServiceNameInput />
        <UsernameInput />
        <ServiceUrlInput />
        <PasswordInput />
        <NotesInput />
        <FormActions />
      </form>
    </>
  );
};

export default CreatePasswordEntryFormView;
