import { generatePassword, PASSWORD_CONFIG } from "../generatePassword";

describe("generatePassword", () => {
  it("should generate a password with default length and characters", () => {
    const password = generatePassword();

    expect(password.length).toBe(PASSWORD_CONFIG.LENGTH);
    expect(password).toMatch(
      new RegExp(
        `^[${PASSWORD_CONFIG.CHARS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+$`
      )
    );
  });

  it("should generate a password with custom length", () => {
    const customLength = 16;
    const password = generatePassword(customLength);

    expect(password.length).toBe(customLength);
  });

  it("should generate a password with custom character set", () => {
    const customChars = "ABC123";
    const password = generatePassword(10, customChars);

    expect(password).toMatch(new RegExp(`^[${customChars}]+$`));
  });

  it("should generate different passwords on consecutive calls", () => {
    const password1 = generatePassword();
    const password2 = generatePassword();

    // There's a tiny chance this could fail randomly, but it's extremely unlikely
    expect(password1).not.toBe(password2);
  });

  it("should handle empty character set by returning empty string", () => {
    const password = generatePassword(10, "");

    expect(password).toBe("");
  });
});
