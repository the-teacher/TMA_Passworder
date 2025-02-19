import ENV from "./ENV";

describe("ENV", () => {
  test("isViteEnv returns boolean", () => {
    const result = ENV.isViteEnv();
    expect(typeof result).toBe("boolean");
  });

  test("isNodeEnv returns boolean", () => {
    const result = ENV.isNodeEnv();
    expect(typeof result).toBe("boolean");
  });

  test("isNodeEnv returns true in Node environment", () => {
    expect(ENV.isNodeEnv()).toBe(true);
  });

  test("isViteEnv returns false in Node environment", () => {
    expect(ENV.isViteEnv()).toBe(false);
  });
});
