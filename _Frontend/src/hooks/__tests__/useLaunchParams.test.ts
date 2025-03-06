import { renderHook } from "@testing-library/react";
import { retrieveLaunchParams } from "@telegram-apps/bridge";
import { useLaunchParams } from "../useLaunchParams";
import { LaunchParams } from "@telegram-apps/types";

// Mock the bridge module
jest.mock("@telegram-apps/bridge", () => ({
  retrieveLaunchParams: jest.fn()
}));

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage
});

describe("useLaunchParams", () => {
  const mockLaunchParams: LaunchParams = {
    tgWebAppPlatform: "android",
    tgWebAppVersion: "6.2",
    tgWebAppThemeParams: {
      bg_color: "#ffffff",
      text_color: "#000000",
      hint_color: "#999999",
      link_color: "#2481cc",
      button_color: "#2481cc",
      button_text_color: "#ffffff",
      secondary_bg_color: "#f0f0f0"
    },
    tgWebAppData: {
      hash: "hash123",
      auth_date: new Date(),
      signature: "sig123",
      user: {
        id: 123456,
        first_name: "Test",
        last_name: "User",
        is_premium: true
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset location.hash
    Object.defineProperty(window, "location", {
      value: { hash: "" },
      writable: true
    });
    // Clear sessionStorage
    mockSessionStorage.clear();
  });

  it("should return guest params when not in Telegram environment", () => {
    const { result } = renderHook(() => useLaunchParams());

    expect(result.current.tgWebAppPlatform).toBe("web");
    expect(result.current.tgWebAppData?.user?.first_name).toBe("Guest");
    expect(retrieveLaunchParams).not.toHaveBeenCalled();
  });

  it("should call retrieveLaunchParams when hash is present", () => {
    // Set location.hash
    Object.defineProperty(window, "location", {
      value: { hash: "#tgWebAppData=somedata" },
      writable: true
    });

    (retrieveLaunchParams as jest.Mock).mockReturnValue(mockLaunchParams);

    const { result } = renderHook(() => useLaunchParams());

    expect(retrieveLaunchParams).toHaveBeenCalled();
    expect(result.current).toEqual(mockLaunchParams);
  });

  it("should call retrieveLaunchParams when sessionStorage has launch params", () => {
    mockSessionStorage.setItem(
      "tapps/launchParams",
      JSON.stringify(mockLaunchParams)
    );
    (retrieveLaunchParams as jest.Mock).mockReturnValue(mockLaunchParams);

    const { result } = renderHook(() => useLaunchParams());

    expect(retrieveLaunchParams).toHaveBeenCalled();
    expect(result.current).toEqual(mockLaunchParams);
  });
});
