import { submitPasswordEntry } from "../submitPasswordEntry";

describe("submitPasswordEntry", () => {
  const mockData = {
    serviceName: "test",
    username: "user",
    password: "pass123",
    serviceUrl: "https://test.com",
    notes: "test notes"
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should submit data successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    const result = await submitPasswordEntry(mockData);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockData)
      }
    );
    expect(result).toEqual({ success: true });
  });

  it("should handle validation errors", async () => {
    const errorResponse = {
      form_error: "Invalid data",
      errors: {
        username: { message: "Username is required" }
      }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(errorResponse)
    });

    const result = await submitPasswordEntry(mockData);

    expect(result).toEqual({
      success: false,
      errors: errorResponse
    });
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(submitPasswordEntry(mockData)).rejects.toThrow(networkError);
  });

  it("should handle invalid JSON response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(new Error("Invalid JSON"))
    });

    await expect(submitPasswordEntry(mockData)).rejects.toThrow("Invalid JSON");
  });
});
