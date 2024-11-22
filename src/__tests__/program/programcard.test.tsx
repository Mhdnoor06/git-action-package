import { render, screen, fireEvent } from "@testing-library/react";

import { describe, it, expect, vi, Mock } from "vitest";

import ProgramCard from "../../v1/components/MobileViewComponents/Programs/Main/ProgramCard/ProgramCard";
import {
  customNavigatorTo,
  dateReverter,
  UTCTimeReverter,
} from "../../v1/helpers/HelperFunction";

import { useNavigationprop } from "../../MyProvider";
import { useAppSelector } from "../../v1/redux/hooks";

// Mock the external dependencies
vi.mock("../../v1/redux/hooks", () => ({
  useAppSelector: vi.fn(),
}));
vi.mock("../../MyProvider", () => ({
  useNavigationprop: vi.fn(),
}));
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
  dateReverter: vi.fn(),
  UTCTimeReverter: vi.fn(),
}));

describe("ProgramCard Component", () => {
  const program = {
    _id: "123",
    programName: "Morning Prayers",
    description: "Daily morning prayer service",
    category: "Religious",
    active: true,
    images: { url: "http://image-url.com/photo.jpg", id: "1" },
    programPhotos: ["http://image-url.com/photo.jpg"],
    metaData: { startDate: "2024-10-05T08:00:00Z" },
    timings: [{ startTime: "2024-10-05T08:00:00Z" }],
  };

  const masjidName = "Local Masjid";
  const consumerMasjidId = "masjid-456";
  const tZone = "America/New_York";
  const initialComponent = () => (
    <ProgramCard
      program={program}
      tZone={tZone}
      masjidName={masjidName}
      consumerMasjidId={consumerMasjidId}
    />
  );
  beforeEach(() => {
    // Mock app selector for admin role

    (useAppSelector as Mock).mockReturnValue({ role: "admin" });
    // Mock navigation prop
    (useNavigationprop as Mock).mockReturnValue(vi.fn());
    // Mock dateReverter and UTCTimeReverter
    (dateReverter as Mock).mockReturnValue("2024-10-05");
    (UTCTimeReverter as Mock).mockReturnValue("08:59 AM");
  });

  it("renders the ProgramCard component correctly", () => {
    render(initialComponent());

    // Test that the program name is rendered
    expect(screen.getByText("Morning Prayers")).toBeInTheDocument();

    // Test that the category is rendered
    expect(screen.getByText("Religious")).toBeInTheDocument();

    // Test that the masjid name is rendered
    expect(screen.getByText("Local Masjid")).toBeInTheDocument();

    // Test that the date and time are rendered correctly
    expect(screen.getByText("08:59 AM")).toBeInTheDocument();
    expect(screen.getByText("(05 October)")).toBeInTheDocument();

    // Test that the program image is rendered
    const image = screen.getByAltText("Morning Prayers");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "http://image-url.com/photo.jpg");
  });

  it("navigates correctly when the card is clicked", () => {
    const mockNavigation = vi.fn();
    (useNavigationprop as Mock).mockReturnValue(mockNavigation);

    render(initialComponent());

    // Simulate card click
    const card = screen.getByTestId("program-card");
    fireEvent.click(card);

    // Expect navigation to be called with the correct path
    expect(mockNavigation).toHaveBeenCalledWith(
      "/program-details/123?masjidId=masjid-456"
    );
  });

  it("calls customNavigatorTo when navigation is not available", () => {
    (useNavigationprop as Mock).mockReturnValue(undefined);

    render(initialComponent());

    // Simulate card click
    const card = screen.getByTestId("program-card");
    fireEvent.click(card);

    // Expect customNavigatorTo to be called with the correct path
    expect(customNavigatorTo).toHaveBeenCalledWith(
      "/program-details/123?masjidId=masjid-456"
    );
  });
});
