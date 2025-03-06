import { renderHook } from "@testing-library/react";
import { useUser } from "../useUser";
import { useLaunchParams } from "../useLaunchParams";
import { LaunchParams } from "@telegram-apps/types";

// Mock the useLaunchParams hook
jest.mock("../useLaunchParams", () => ({
  useLaunchParams: jest.fn()
}));

describe("useUser", () => {
  const mockUser = {
    id: 123456,
    first_name: "Test",
    last_name: "User",
    is_premium: true
  };

  const mockLaunchParams: LaunchParams = {
    tgWebAppPlatform: "android",
    tgWebAppVersion: "6.2",
    tgWebAppThemeParams: {},
    tgWebAppData: {
      hash: "hash123",
      auth_date: new Date(),
      signature: "sig123",
      user: mockUser
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user from launch params when available", () => {
    (useLaunchParams as jest.Mock).mockReturnValue(mockLaunchParams);

    const { result } = renderHook(() => useUser());

    expect(result.current).toEqual(mockUser);
  });

  it("should return guest user when no user in launch params", () => {
    const launchParamsWithoutUser: LaunchParams = {
      ...mockLaunchParams,
      tgWebAppData: {
        hash: "hash123",
        auth_date: new Date(),
        signature: "sig123",
        user: undefined
      }
    };

    (useLaunchParams as jest.Mock).mockReturnValue(launchParamsWithoutUser);

    const { result } = renderHook(() => useUser());

    expect(result.current).toEqual({
      id: 0,
      first_name: "Guest",
      is_premium: false
    });
  });
});
