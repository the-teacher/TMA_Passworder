import { render, screen, fireEvent } from "@testing-library/react";
import SorryAboutDecline from "../SorryAboutDecline";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

describe("SorryAboutDecline", () => {
  const mockButtonHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders the component with correct content", () => {
    render(<SorryAboutDecline buttonHandler={mockButtonHandler} />, {
      wrapper: TestWrapper
    });

    expect(screen.getByText("We're Sorry to See You Go")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry that you've decided not to use our application at this time."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "However, if you change your mind, you can always come back and give it a try — we're always happy to welcome new users!"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Remember, our password manager offers secure storage, easy organization, and peace of mind knowing your digital life is protected."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("I'd like to try it after all")
    ).toBeInTheDocument();
  });

  it("calls buttonHandler when the button is clicked", () => {
    render(<SorryAboutDecline buttonHandler={mockButtonHandler} />, {
      wrapper: TestWrapper
    });

    const button = screen.getByText("I'd like to try it after all");
    fireEvent.click(button);

    expect(mockButtonHandler).toHaveBeenCalledTimes(1);
  });
});
