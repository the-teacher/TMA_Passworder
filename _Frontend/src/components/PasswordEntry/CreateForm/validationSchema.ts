import { z } from "zod";
import i18n from "@i18n/index";

const VALIDATION = {
  SERVICE_NAME: {
    MIN: 3,
    MAX: 10
  },
  USERNAME: {
    MIN: 5,
    MAX: 15
  },
  PASSWORD: {
    MIN: 8,
    MAX: 50
  },
  NOTES: {
    MAX: 500
  }
} as const;

const t = (key: string, params?: Record<string, unknown>) =>
  i18n.t(`CreatePasswordEntryForm:validation.${key}`, params);

export const validationSchema = z.object({
  serviceName: z
    .string()
    .min(
      VALIDATION.SERVICE_NAME.MIN,
      t("serviceName.min", { min: VALIDATION.SERVICE_NAME.MIN })
    )
    .max(
      VALIDATION.SERVICE_NAME.MAX,
      t("serviceName.max", { max: VALIDATION.SERVICE_NAME.MAX })
    ),

  username: z
    .string()
    .min(
      VALIDATION.USERNAME.MIN,
      t("username.min", { min: VALIDATION.USERNAME.MIN })
    )
    .max(
      VALIDATION.USERNAME.MAX,
      t("username.max", { max: VALIDATION.USERNAME.MAX })
    ),

  password: z
    .string()
    .min(
      VALIDATION.PASSWORD.MIN,
      t("password.min", { min: VALIDATION.PASSWORD.MIN })
    )
    .max(
      VALIDATION.PASSWORD.MAX,
      t("password.max", { max: VALIDATION.PASSWORD.MAX })
    ),

  serviceUrl: z
    .string()
    .url(t("serviceUrl.invalid"))
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(VALIDATION.NOTES.MAX, t("notes.max", { max: VALIDATION.NOTES.MAX }))
    .optional()
    .or(z.literal(""))
});

export type FormData = z.infer<typeof validationSchema>;
