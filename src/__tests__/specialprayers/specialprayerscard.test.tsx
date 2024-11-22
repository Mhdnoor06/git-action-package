import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OtherSalahCard from "../../v1/components/MobileViewComponents/OtherSalahComponents/OtherSalahCard";
import { SpecialPrayer } from "../../v1/redux/Types";
import { vi } from "vitest";
import moment from "moment-timezone";

vi.mock("moment", async (importOriginal) => {
  const actual = await importOriginal();
  const mockMoment = (timestamp) => {
    const obj = {
      tz: vi.fn().mockReturnThis(),
      format: vi.fn(() => {
        if (timestamp === 1627556400) return "10:00 AM"; // example formatted time for azaanTime
        if (timestamp === 1627558200) return "10:30 AM"; // example formatted time for jamaatTime
        return "12:00 AM";
      })
    };
    return obj;
  };
  mockMoment.unix = vi.fn((timestamp) => mockMoment(timestamp));
  mockMoment.utc = vi.fn(() => ({
    format: vi.fn(() => "01-Jul-2024")
  }));
  return {
    ...actual,
    default: mockMoment
  };
});

const mockPrayer: SpecialPrayer<number> = {
  name: "Jummah",
  azaanTime: 1627556400, // example Unix timestamp
  jamaatTime: 1627558200, // example Unix timestamp
  startDate: "2024-07-01",
  endDate: "2024-07-01",
  _id: "1"
};

const renderComponent = (props = {}) => {
  const defaultProps = {
    tZone: "America/New_York",
    isInitialLoaded: true,
    hasPrayers: true,
    prayer: mockPrayer,
    handleEdit: vi.fn(),
    handleDelete: vi.fn(),
    ...props
  };

  return render(<OtherSalahCard {...defaultProps} />);
};

describe("OtherSalahCard Component", () => {
  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText("Jummah")).toBeInTheDocument();
    expect(screen.getByText("Start Date: 01-Jul-2024")).toBeInTheDocument();
    expect(screen.getByText("End Date: 01-Jul-2024")).toBeInTheDocument();
  });

  it("formats and displays prayer times correctly", () => {
    renderComponent();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument(); // formatted azaanTime
    expect(screen.getByText("10:30 AM")).toBeInTheDocument(); // formatted jamaatTime
  });

  it("calls handleEdit when edit button is clicked", () => {
    const handleEdit = vi.fn();
    renderComponent({ handleEdit });
    fireEvent.click(screen.getByAltText("edit img"));
    expect(handleEdit).toHaveBeenCalledWith(mockPrayer);
  });

  it("shows delete warning modal when delete button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByAltText("delete img"));
    expect(
      screen.getByText(
        "Are you sure you want to Delete (Jummah) Special Timing ?"
      )
    ).toBeInTheDocument();
  });

  it("calls handleDelete when delete is confirmed", () => {
    const handleDelete = vi.fn();
    renderComponent({ handleDelete });
    fireEvent.click(screen.getByAltText("delete img"));
    expect(
      screen.getByText(
        "Are you sure you want to Delete (Jummah) Special Timing ?"
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Yes"));
    expect(handleDelete).toHaveBeenCalledWith("1");
  });

  it("does not display edit and delete buttons when children are present", () => {
    renderComponent({ children: <div>Child Component</div> });
    expect(screen.queryByAltText("edit img")).not.toBeInTheDocument();
    expect(screen.queryByAltText("delete img")).not.toBeInTheDocument();
  });
});
