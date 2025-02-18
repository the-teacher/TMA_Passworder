import toastr from "../Toastr";
import toastrFromIndex from "..";

describe("Toastr", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Clear the DOM before each test
    document.body.innerHTML = "";
    container = toastr.initialize();
  });

  afterEach(() => {
    // Clear all toasts after each test
    toastr.clear();
  });

  it("creates container in the document", () => {
    expect(document.querySelector(".toastr-container")).toBeInTheDocument();
  });

  it("creates container in custom parent element", () => {
    const customParent = document.createElement("div");
    customParent.id = "custom-parent";
    document.body.appendChild(customParent);

    toastr.initialize("#custom-parent");
    expect(customParent.querySelector(".toastr-container")).toBeInTheDocument();
  });

  it("falls back to body when custom parent not found", () => {
    const mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation();

    toastr.initialize("#non-existent");
    expect(
      document.body.querySelector(".toastr-container")
    ).toBeInTheDocument();
    expect(mockConsoleWarn).toHaveBeenCalledWith(
      'Element with selector "#non-existent" not found, using body as fallback'
    );

    mockConsoleWarn.mockRestore();
  });

  it("shows toast with default options", () => {
    const message = "Test message";
    const toast = toastr.show(message);

    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent(message);
    expect(toast).toHaveClass(
      "info",
      "info--primary",
      "toastr-toast",
      "info--closable"
    );
  });

  it("shows toast with custom type", () => {
    const toast = toastr.show("Test", "success");
    expect(toast).toHaveClass("info--success");
  });

  it("shows non-closable toast", () => {
    const toast = toastr.show("Test", "primary", { closable: false });

    expect(toast).not.toHaveClass("info--closable");
    expect(toast.querySelector(".info__close")).not.toBeInTheDocument();
  });

  it("removes toast after duration", () => {
    jest.useFakeTimers();

    const toast = toastr.show("Test", "primary", { duration: 1000 });
    expect(toast).toBeInTheDocument();

    jest.advanceTimersByTime(1000);
    expect(toast).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it("keeps toast when duration is 0", () => {
    jest.useFakeTimers();

    const toast = toastr.show("Test", "primary", { duration: 0 });
    jest.advanceTimersByTime(5000);

    expect(toast).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("removes toast when close button is clicked", () => {
    const toast = toastr.show("Test");
    const closeButton = toast.querySelector(
      ".info__close"
    ) as HTMLButtonElement;

    closeButton.click();
    expect(toast).not.toBeInTheDocument();
  });

  it("shows success toast", () => {
    const toast = toastr.success("Success message");
    expect(toast).toHaveClass("info--success");
  });

  it("shows warning toast", () => {
    const toast = toastr.warning("Warning message");
    expect(toast).toHaveClass("info--warning");
  });

  it("shows danger toast", () => {
    const toast = toastr.danger("Danger message");
    expect(toast).toHaveClass("info--danger");
  });

  it("shows info toast", () => {
    const toast = toastr.info("Info message");
    expect(toast).toHaveClass("info--primary");
  });

  it("clears all toasts", () => {
    toastr.show("Test 1");
    toastr.show("Test 2");
    toastr.show("Test 3");

    expect(container.children.length).toBe(3);

    toastr.clear();
    expect(container.children.length).toBe(0);
  });

  it("supports multiple toasts", () => {
    const toast1 = toastr.info("First");
    const toast2 = toastr.success("Second");
    const toast3 = toastr.warning("Third");

    expect(container.children.length).toBe(3);
    expect(toast1).toBeInTheDocument();
    expect(toast2).toBeInTheDocument();
    expect(toast3).toBeInTheDocument();
  });
});

describe("index.ts", () => {
  it("should export Toastr as default", () => {
    expect(toastrFromIndex).toBe(toastr);
  });
});
