import { render, screen, fireEvent } from "@testing-library/react";
import DonationCard from "../../v1/components/MobileViewComponents/Donation/Card/DonationCard";
import { vi } from "vitest";

const mockHandleDonationClick = vi.fn();

const mockDonation = {
  id: "1",
  name: "Test Donation",
  description: "This is a test donation description that is quite long.",
  active: true,
  images: { url: "test-image-url", id: "img-1" },
};

describe("DonationCard Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the donation card with correct content", () => {
    render(
      <DonationCard
        donation={mockDonation}
        handleDonationClick={mockHandleDonationClick}
      />
    );

    // Verify that the donation name is rendered
    expect(screen.getByText("Test Donation")).toBeInTheDocument();

    // Verify that the truncated description is rendered
    expect(
      screen.getByText(
        "This is a test donation description that is quite ......"
      )
    ).toBeInTheDocument();

    // Verify that the active status is rendered correctly
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(
      screen.getByTestId("donation-card").querySelector(".greendot")
    ).toBeInTheDocument();
  });

  test("renders inactive status correctly", () => {
    const inactiveDonation = { ...mockDonation, active: false };

    render(
      <DonationCard
        donation={inactiveDonation}
        handleDonationClick={mockHandleDonationClick}
      />
    );

    // Verify that the inactive status is rendered correctly
    expect(screen.getByText("Deactive")).toBeInTheDocument();
    expect(
      screen.getByTestId("donation-card").querySelector(".reddot")
    ).toBeInTheDocument();
  });

  test("calls handleDonationClick on card click", () => {
    render(
      <DonationCard
        donation={mockDonation}
        handleDonationClick={mockHandleDonationClick}
      />
    );

    const cardElement = screen.getByTestId("donation-card");
    fireEvent.click(cardElement);

    // Verify that the handleDonationClick function is called with the donation object
    expect(mockHandleDonationClick).toHaveBeenCalledWith(mockDonation);
  });

  test("renders the next slide icon", () => {
    render(
      <DonationCard
        donation={mockDonation}
        handleDonationClick={mockHandleDonationClick}
      />
    );

    // Verify that the next slide icon is rendered
    expect(screen.getByTestId("nextslide")).toBeInTheDocument();
  });
});
