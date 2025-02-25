import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";

type Props = {
  onReset: () => void;
};

const FormActions = ({ onReset }: Props) => {
  const { t: c } = useTranslation("common");
  const {
    formState: { isValid, isSubmitting }
  } = useFormContext<FormData>();

  return (
    <div className="form-group--actions">
      <button
        type="submit"
        className="btn btn--primary"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? c("saving") : c("save")}
      </button>
      <button type="button" className="btn btn--secondary" onClick={onReset}>
        {c("reset")}
      </button>
    </div>
  );
};

export default FormActions;
