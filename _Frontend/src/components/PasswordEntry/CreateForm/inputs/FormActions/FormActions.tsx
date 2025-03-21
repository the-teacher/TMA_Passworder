import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useAppModal } from "@components/AppModal";
import type { FormData } from "../../validationSchema";
import "./styles.scss";

type Props = {
  formType?: "Create" | "Edit";
};

const ResetButton = () => {
  const { t: c } = useTranslation("common");
  const { t } = useTranslation("CreatePasswordEntryForm");
  const { reset } = useFormContext<FormData>();

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
    <>
      <button
        type="button"
        className="btn btn--secondary"
        onClick={confirmReset.open}
      >
        {c("reset")}
      </button>
      {confirmReset.modal}
    </>
  );
};

const FormActions = ({ formType = "Create" }: Props) => {
  const { t: c } = useTranslation("common");
  const { t: formTypeT } = useTranslation(`${formType}PasswordEntryForm`);

  const {
    formState: { isValid, isSubmitting }
  } = useFormContext<FormData>();

  return (
    <div className="form-group--actions form-group--actions__with-jumbo">
      <button
        type="submit"
        className="btn btn--primary btn--jumbo"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? c("saving") : formTypeT("actions.save")}
      </button>

      {formType === "Create" && <ResetButton />}
    </div>
  );
};

export default FormActions;
