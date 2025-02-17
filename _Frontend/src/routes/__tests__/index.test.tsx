import AppRoutes from "../routes";
import RoutesExport from "../index";

jest.mock("../routes", () => ({
  __esModule: true,
  default: "mocked-routes"
}));

describe("Routes index", () => {
  it("should re-export AppRoutes component as default", () => {
    expect(RoutesExport).toBe(AppRoutes);
  });

  it("should maintain the same reference as the original export", () => {
    expect(RoutesExport).toBe("mocked-routes");
  });
});
