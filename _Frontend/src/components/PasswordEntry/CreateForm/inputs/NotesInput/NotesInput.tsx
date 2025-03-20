import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import { createHandleTrim } from "@utils/forms";

const NotesInput = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<FormData>();

  const handleTrim = createHandleTrim(setValue);

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="notes">
        {t("fields.notes")}
      </label>
      <textarea
        className="form-input"
        id="notes"
        rows={4}
        aria-invalid={!!errors.notes}
        {...register("notes", {
          onBlur: handleTrim
        })}
      />
    </div>
  );
};

export default NotesInput;
