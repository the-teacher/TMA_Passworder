import { copyToClipboard } from "../copyToClipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
    });

    // Spy on console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should copy text to clipboard", async () => {
    const text = "test-password";
    await copyToClipboard(text);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });

  it("should handle empty text", async () => {
    await copyToClipboard("");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should handle undefined text", async () => {
    await copyToClipboard(undefined as unknown as string);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should handle clipboard errors", async () => {
    const error = new Error("Clipboard error");
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(error);

    await copyToClipboard("test");

    expect(console.error).toHaveBeenCalledWith(
      "Failed to copy text to clipboard:",
      error
    );
  });
});
