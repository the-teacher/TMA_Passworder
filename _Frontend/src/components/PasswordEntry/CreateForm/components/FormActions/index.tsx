import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";

const FormActions = () => {
  const { t: c } = useTranslation("common");
  const {
    formState: { isValid, isSubmitting },
    reset
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
      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => reset()}
      >
        {c("reset")}
      </button>
    </div>
  );
};

export default FormActions;
