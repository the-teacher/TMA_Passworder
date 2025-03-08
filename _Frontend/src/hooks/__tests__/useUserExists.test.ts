import { renderHook, waitFor } from "@testing-library/react";
import { useUserExists } from "../useUserExists";
import { useUser } from "../useUser";

// Mock dependencies
jest.mock("../useUser");

describe("useUserExists", () => {
  // Mock fetch
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should return userExists=false for guest users without making API call", async () => {
    // Mock guest user
    (useUser as jest.Mock).mockReturnValue({
      id: 0,
      first_name: "Guest",
      is_premium: false
    });

    const { result } = renderHook(() => useUserExists());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userExists).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should return userExists=true when API confirms user exists", async () => {
    // Mock real user
    (useUser as jest.Mock).mockReturnValue({
      id: 123456,
      first_name: "Test",
      is_premium: true
    });

    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ exists: true })
    });

    const { result } = renderHook(() => useUserExists());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userExists).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith("/api/v1/users/123456/exists");
  });

  it("should handle API errors gracefully", async () => {
    // Mock real user
    (useUser as jest.Mock).mockReturnValue({
      id: 123456,
      first_name: "Test",
      is_premium: true
    });

    // Mock API error
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useUserExists());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userExists).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network error");
  });
});
