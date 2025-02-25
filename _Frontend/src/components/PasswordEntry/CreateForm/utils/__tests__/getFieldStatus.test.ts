import { getFieldStatus } from "../getFieldStatus";
import type { TFunction } from "i18next";
import type { FieldError } from "react-hook-form";

describe("getFieldStatus", () => {
  const mockT = ((key: string) => {
    const translations: Record<string, string> = {
      "validation.pleaseEnterField": "Please fill in this field",
      "validation.filledCorrectly": "Filled correctly"
    };
    return translations[key] || key;
  }) as TFunction;

  const createFieldError = (message: string): FieldError => ({
    type: "validation",
    message
  });

  it("should handle field errors", () => {
    const errors = {
      serviceName: createFieldError("Error message")
    };

    const result = getFieldStatus(
      "serviceName",
      "value",
      errors,
      { serviceName: true },
      mockT
    );

    expect(result.message).toBe("Error message");
    expect(result.className).toBe("text--danger text--small");
  });

  it("should return warning status for untouched field", () => {
    const result = getFieldStatus(
      "serviceName",
      "",
      {},
      { serviceName: false },
      mockT
    );

    expect(result).toEqual({
      message: "Please fill in this field",
      className: "text--warning text--small"
    });
  });

  it("should return success status for filled field", () => {
    const result = getFieldStatus(
      "serviceName",
      "test value",
      {},
      { serviceName: true },
      mockT
    );

    expect(result).toEqual({
      message: "Filled correctly",
      className: "text--success text--small"
    });
  });

  it("should return error status for react-hook-form error", () => {
    const errors = {
      root: {},
      serviceName: {
        type: "required",
        message: "Field is required"
      }
    };

    const result = getFieldStatus(
      "serviceName",
      "",
      errors,
      { serviceName: true },
      mockT
    );

    expect(result).toEqual({
      message: "Field is required",
      className: "text--danger text--small"
    });
  });

  it("should return error status for server error", () => {
    const serverErrors = {
      errors: {
        serviceName: { message: "Server validation failed" }
      }
    };

    const result = getFieldStatus(
      "serviceName",
      "",
      serverErrors,
      { serviceName: true },
      mockT
    );

    expect(result).toEqual({
      message: "Server validation failed",
      className: "text--danger text--small"
    });
  });

  it("should return empty status when no conditions met", () => {
    const result = getFieldStatus(
      "serviceName",
      "",
      {},
      { serviceName: true },
      mockT
    );

    expect(result).toEqual({
      message: "",
      className: ""
    });
  });
});
