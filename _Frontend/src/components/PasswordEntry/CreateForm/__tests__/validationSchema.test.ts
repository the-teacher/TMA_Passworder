import { validationSchema } from "../validationSchema";

describe("validationSchema", () => {
  const validData = {
    serviceName: "GitHub",
    username: "testuser",
    password: "Password123!",
    serviceUrl: "https://github.com",
    notes: "Test notes"
  };

  it("should validate correct data", () => {
    const result = validationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate incorrect data", () => {
    const result = validationSchema.safeParse({
      ...validData,
      serviceName: ""
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]).toEqual({
        code: "too_small",
        minimum: 3,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Service name must be at least 3 characters",
        path: ["serviceName"]
      });
    }
  });
});
