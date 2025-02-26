import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useAppModal } from "@components/AppModal";
import type { FormData } from "../../validationSchema";
import "./styles.scss";

const FormActions = () => {
  const { t: c } = useTranslation("common");
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    formState: { isValid, isSubmitting },
    reset
  } = useFormContext<FormData>();

  const confirmReset = useAppModal({
    title: t("modals.resetForm.title"),
    size: "small",
    children: ({ close }) => (
      <div>
        <p className="text--center">{t("modals.resetForm.message")}</p>
        <div className="form-group--actions mt16">
          <button className="btn btn--secondary" onClick={close}>
            {t("modals.resetForm.cancel")}
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              reset();
              close();
            }}
          >
            {t("modals.resetForm.confirm")}
          </button>
        </div>
      </div>
    )
  });

  return (
    <div className="form-group--actions form-group--actions__with-jumbo">
      <button
        type="submit"
        className="btn btn--primary btn--jumbo"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? c("saving") : c("save")}
      </button>
      <button
        type="button"
        className="btn btn--secondary"
        onClick={confirmReset.open}
      >
        {c("reset")}
      </button>
      {confirmReset.modal}
    </div>
  );
};

export default FormActions;
