import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import {
  createHandleSpaces,
  createHandleTrim
} from "../../utils/handleSpacesUtils";
import { getFieldStatus } from "../../utils/getFieldStatus";

const ServiceNameInput = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
    watch
  } = useFormContext<FormData>();

  const handleSpaces = createHandleSpaces(setValue);
  const handleTrim = createHandleTrim(setValue);

  const value = watch("serviceName");
  const status = getFieldStatus("serviceName", value, errors, dirtyFields, t);

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="serviceName">
        {t("fields.serviceName")}
      </label>
      <input
        className="form-input"
        id="serviceName"
        type="text"
        aria-invalid={!!errors.serviceName}
        {...register("serviceName", {
          onChange: handleSpaces,
          onBlur: handleTrim
        })}
      />
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default ServiceNameInput;
