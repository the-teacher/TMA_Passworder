import { z } from "zod";
import i18n from "@i18n/index";

const VALIDATION = {
  EMAIL: {
    MIN: 1,
    MAX: 100
  }
} as const;

const t = (key: string, params?: Record<string, unknown>) =>
  i18n.t(`CreateAccountForm:validation.${key}`, params);

// Form validation schema
export const createAccountValidationSchema = z.object({
  email: z
    .string()
    .min(VALIDATION.EMAIL.MIN, t("email.required"))
    .max(VALIDATION.EMAIL.MAX, t("email.max", { max: VALIDATION.EMAIL.MAX }))
    .email(t("email.invalid"))
});

export type CreateAccountValidationSchemaType = z.infer<
  typeof createAccountValidationSchema
>;
