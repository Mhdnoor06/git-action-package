import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AnnouncementCard from "../v1/components/MobileViewComponents/Announcement/Card/AnnouncementCard";
import moment from "moment";
import { dateReverter } from "../v1/helpers/HelperFunction";

vi.mock("../v1/helpers/HelperFunction", () => ({
  dateReverter: vi.fn((date, tZone) => date)
}));

const renderWithProviders = (ui: any) => {
  return render(ui);
};

describe("AnnouncementCard Component", () => {
  const handleAnnouncementMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders announcement card in detail view mode", () => {
    const title = "Test Title";
    const description = "Test Description";

    renderWithProviders(
      <AnnouncementCard
        handleBack={handleAnnouncementMock}
        isDetailView={true}
        title={title}
        description={description}
      />
    );

    // Check if the Back button is rendered
    expect(screen.getByTestId("backBtn")).toBeInTheDocument();

    // Check if the title and description are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();

    // Check if the date is rendered correctly
    expect(
      screen.getByText(moment(new Date(), "YYYY-MM-DD").format("D MMM yyyy"))
    ).toBeInTheDocument();
  });

  test("renders announcement card in default mode", () => {
    const announcementData = {
      _id: "6677f7b3983db7598f0adfa9",
      title: "Test Announcement",
      body: "Test Announcement Description",
      type: 0,
      asset: ["64df7804c2d7bcd9f0dac1e7"],
      payload: {
        title: "Test Announcement",
        body: "Test Announcement Description"
      },
      masjidId: "6677f7b3983db7598f0adfa8",
      expiresAt: "2024-06-26T10:23:47.697Z",
      createdBy: "666076e60ad4a2ecf42c1be0",
      createdAt: "2024-06-23T10:23:47.702Z",
      updatedAt: "2024-06-23T10:23:47.702Z",
      __v: 0
    };

    renderWithProviders(
      <AnnouncementCard
        handleBack={handleAnnouncementMock}
        announcementData={announcementData}
      />
    );

    // Check if the Back button is rendered
    expect(screen.getByTestId("backBtn")).toBeInTheDocument();

    // Check if the announcement data is rendered
    expect(screen.getByText(announcementData.title)).toBeInTheDocument();
    expect(screen.getByText(announcementData.body)).toBeInTheDocument();

    // Check if the date is rendered correctly
    expect(
      screen.getByText(
        moment(
          dateReverter(
            announcementData.createdAt,
            localStorage.getItem("MasjidtZone")
          ),
          "YYYY-MM-DD"
        ).format("D MMM yyyy")
      )
    ).toBeInTheDocument();
  });

  test("calls handleAnnouncement when back button is clicked", () => {
    const title = "Test Title";
    const description = "Test Description";
    renderWithProviders(
      <AnnouncementCard
        handleBack={handleAnnouncementMock}
        isDetailView={true}
        title={title}
        description={description}
      />
    );

    // Click the Back button
    fireEvent.click(screen.getByTestId("backBtn"));

    // Check if handleAnnouncement function is called
    expect(handleAnnouncementMock).toHaveBeenCalled();
  });
});
