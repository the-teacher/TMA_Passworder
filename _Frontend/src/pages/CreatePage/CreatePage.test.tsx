import { render, screen } from "@testing-library/react";
import CreatePage from "./CreatePage";

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Return mock translations based on the key
      const translations: { [key: string]: string } = {
        "createPage.title": "Hello World"
      };
      return translations[key] || key;
    }
  })
}));

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(<CreatePage />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
