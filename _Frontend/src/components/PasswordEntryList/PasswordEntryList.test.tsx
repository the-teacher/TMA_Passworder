import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "./PasswordEntryList";

describe("PasswordEntryList", () => {
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntryList />
      </BrowserRouter>
    );
  };

  it("renders all 30 popular service entries", () => {
    renderWithRouter();

    const popularServices = [
      "Google",
      "Facebook",
      "Twitter",
      "Instagram",
      "LinkedIn",
      "Amazon",
      "Netflix",
      "Spotify",
      "Dropbox",
      "Slack",
      "GitHub",
      "Reddit",
      "Pinterest",
      "Snapchat",
      "WhatsApp",
      "YouTube",
      "Zoom",
      "Microsoft",
      "Apple",
      "Adobe",
      "PayPal",
      "eBay",
      "Airbnb",
      "Uber",
      "Lyft",
      "Twitch",
      "Discord",
      "TikTok",
      "Shopify",
      "Salesforce"
    ];

    popularServices.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it("renders entries with correct links", () => {
    renderWithRouter();

    const popularServices = [
      "Google",
      "Facebook",
      "Twitter",
      "Instagram",
      "LinkedIn",
      "Amazon",
      "Netflix",
      "Spotify",
      "Dropbox",
      "Slack",
      "GitHub",
      "Reddit",
      "Pinterest",
      "Snapchat",
      "WhatsApp",
      "YouTube",
      "Zoom",
      "Microsoft",
      "Apple",
      "Adobe",
      "PayPal",
      "eBay",
      "Airbnb",
      "Uber",
      "Lyft",
      "Twitch",
      "Discord",
      "TikTok",
      "Shopify",
      "Salesforce"
    ];

    popularServices.forEach((service, index) => {
      const entry = screen.getByText(service);
      expect(entry.closest("a")).toHaveAttribute(
        "href",
        `/password-entry/entry-${index + 1}`
      );
    });
  });
});
