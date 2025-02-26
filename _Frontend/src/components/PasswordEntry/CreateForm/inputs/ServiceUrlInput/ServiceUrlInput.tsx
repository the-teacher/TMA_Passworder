import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import {
  createHandleTrim,
  createHandleNoSpaces
} from "../../utils/handleSpacesUtils";
import { getFieldStatus } from "../../utils/getFieldStatus";

const ServiceUrlInput = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
    watch
  } = useFormContext<FormData>();

  const handleTrim = createHandleTrim(setValue);
  const handleNoSpaces = createHandleNoSpaces(setValue);

  const value = watch("serviceUrl");
  const status = getFieldStatus(
    "serviceUrl",
    value || "",
    errors,
    dirtyFields,
    t
  );

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="serviceUrl">
        {t("fields.url")}
      </label>
      <input
        className={`form-input ${status.inputClassName}`}
        id="serviceUrl"
        data-testid="service-url-input"
        type="url"
        placeholder="https://"
        aria-invalid={!!errors.serviceUrl}
        {...register("serviceUrl", {
          onChange: handleNoSpaces,
          onBlur: handleTrim
        })}
      />
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default ServiceUrlInput;
