import {
  createHandleSpaces,
  createHandleTrim,
  createHandleNoSpaces
} from "../handleSpacesUtils";
import type { UseFormSetValue } from "react-hook-form";

// Mock form data type instead of importing from external schema
type MockFormData = {
  serviceName: string;
  username: string;
  password: string;
  serviceUrl?: string;
  notes?: string;
};

describe("handleSpacesUtils", () => {
  const mockSetValue = jest.fn() as jest.MockedFunction<
    UseFormSetValue<MockFormData>
  >;

  beforeEach(() => {
    mockSetValue.mockClear();
  });

  describe("createHandleSpaces", () => {
    const handleSpaces = createHandleSpaces<MockFormData>(mockSetValue);

    it("normalizes multiple spaces to single space", () => {
      const event = {
        target: {
          name: "serviceName",
          value: "test    multiple     spaces"
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleSpaces(event);

      expect(mockSetValue).toHaveBeenCalledWith(
        "serviceName",
        "test multiple spaces",
        { shouldValidate: true }
      );
    });

    it("preserves single spaces between words", () => {
      const event = {
        target: {
          name: "serviceName",
          value: "normal spaced text"
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleSpaces(event);

      expect(mockSetValue).toHaveBeenCalledWith(
        "serviceName",
        "normal spaced text",
        { shouldValidate: true }
      );
    });
  });

  describe("createHandleTrim", () => {
    const handleTrim = createHandleTrim<MockFormData>(mockSetValue);

    it("trims spaces from both ends", () => {
      const event = {
        target: {
          name: "serviceName",
          value: "   text with spaces   "
        }
      } as React.FocusEvent<HTMLInputElement>;

      handleTrim(event);

      expect(mockSetValue).toHaveBeenCalledWith(
        "serviceName",
        "text with spaces",
        { shouldValidate: true, shouldDirty: true }
      );
    });

    it("preserves internal spaces", () => {
      const event = {
        target: {
          name: "serviceName",
          value: "  multiple   internal   spaces  "
        }
      } as React.FocusEvent<HTMLInputElement>;

      handleTrim(event);

      expect(mockSetValue).toHaveBeenCalledWith(
        "serviceName",
        "multiple   internal   spaces",
        { shouldValidate: true, shouldDirty: true }
      );
    });
  });

  describe("createHandleNoSpaces", () => {
    const handleNoSpaces = createHandleNoSpaces<MockFormData>(mockSetValue);

    it("removes all spaces", () => {
      const event = {
        target: {
          name: "password",
          value: "  password with   spaces  "
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleNoSpaces(event);

      expect(mockSetValue).toHaveBeenCalledWith(
        "password",
        "passwordwithspaces",
        { shouldValidate: true }
      );
    });

    it("handles text without spaces", () => {
      const event = {
        target: {
          name: "password",
          value: "nospaceshere"
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleNoSpaces(event);

      expect(mockSetValue).toHaveBeenCalledWith("password", "nospaceshere", {
        shouldValidate: true
      });
    });
  });

  it("handles different field names correctly", () => {
    const handleNoSpaces = createHandleNoSpaces<MockFormData>(mockSetValue);
    const fields = [
      "serviceName",
      "username",
      "password",
      "serviceUrl",
      "notes"
    ] as const;

    fields.forEach((fieldName) => {
      const event = {
        target: {
          name: fieldName,
          value: "test value"
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleNoSpaces(event);

      expect(mockSetValue).toHaveBeenCalledWith(fieldName, "testvalue", {
        shouldValidate: true
      });
    });
  });
});
