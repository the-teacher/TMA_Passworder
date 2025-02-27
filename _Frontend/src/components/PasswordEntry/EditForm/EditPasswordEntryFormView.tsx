import ServiceNameInput from "../CreateForm/inputs/ServiceNameInput";
import UsernameInput from "../CreateForm/inputs/UsernameInput";
import ServiceUrlInput from "../CreateForm/inputs/ServiceUrlInput";
import PasswordInput from "../CreateForm/inputs/PasswordInput";
import NotesInput from "../CreateForm/inputs/NotesInput";
import FormActions from "../CreateForm/inputs/FormActions";

import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/spaces.scss";

export type Props = {
  onSubmit: (e: React.FormEvent) => void;
};

const CreatePasswordEntryFormView = ({ onSubmit }: Props) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="update-password-form"
        role="update-password-form"
      >
        <ServiceNameInput />
        <UsernameInput />
        <ServiceUrlInput />
        <PasswordInput />
        <NotesInput />
        <FormActions formType="Edit" />
      </form>
    </>
  );
};

export default CreatePasswordEntryFormView;
