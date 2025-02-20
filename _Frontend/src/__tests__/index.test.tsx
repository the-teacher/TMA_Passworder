import { createRoot } from "react-dom/client";

// Mock dependencies
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn()
  }))
}));

jest.mock("../App", () => ({
  __esModule: true,
  default: () => null
}));

jest.mock("@i18n/index", () => ({
  __esModule: true,
  default: {}
}));

jest.mock("react-i18next", () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children
}));

describe("Index", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let originalBody: HTMLElement;

  beforeAll(() => {
    originalBody = document.body.cloneNode(true) as HTMLElement;
  });

  beforeEach(() => {
    document.body.innerHTML = originalBody.innerHTML;
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  const renderIndex = async () => {
    const { render } = await import("../index");
    return render?.();
  };

  it("should render app when root element exists", async () => {
    // Create root element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    await renderIndex();

    expect(createRoot).toHaveBeenCalledWith(root);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should log error when root element is missing", async () => {
    await renderIndex();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Unable to find root element");
    expect(createRoot).not.toHaveBeenCalled();
  });
});
