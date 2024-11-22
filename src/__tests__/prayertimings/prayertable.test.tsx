import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import PrayerTable from "../../v1/components/MobileViewComponents/NamazTIming/PrayerTable";
import moment from "moment";
vi.mock("moment", async (importOriginal) => {
  const actual = await importOriginal();
  const mockMoment = (timestamp: number | string) => {
    const obj = {
      tz: vi.fn().mockReturnThis(),
      format: vi.fn(() => {
        if (timestamp === 1720086120) return "04:42 AM"; // fajr example formatted time for azaanTime
        if (timestamp === 1720087200) return "05:00 AM"; // fajr example formatted time for jamaatTime
        if (timestamp === 1720117860) return "01:31 PM"; // dhur example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720135740) return "06:29 PM"; // asar example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720143540) return "08:39 PM"; // maghrib example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720149420) return "10:17 PM"; // isha example formatted time for azaanTime
        if (timestamp === 1720148460) return "10:01 PM"; // isha example formatted time for jamaatTime
        return "12:00 AM";
      })
    };
    return obj;
  };
  mockMoment.unix = vi.fn((timestamp: number) => mockMoment(timestamp));
  mockMoment.tz = vi.fn((timestamp: string, format: string, tZone: string) =>
    mockMoment(timestamp)
  );
  return {
    ...actual,
    default: mockMoment
  };
});

describe("PrayerTable", () => {
  const timings = [
    {
      namazName: "Fajr",
      azaanTime: 1720086120,
      jamaatTime: 1720087200,
      ExtendedAzaanMinutes: 5,
      ExtendedJamaatMinutes: 10
    },
    {
      namazName: "Dhuhr",
      azaanTime: 1720117860,
      jamaatTime: 1720117860,
      ExtendedAzaanMinutes: null,
      ExtendedJamaatMinutes: null
    },
    {
      namazName: "Asr",
      azaanTime: 1720135740,
      jamaatTime: 1720135740,
      ExtendedAzaanMinutes: -5,
      ExtendedJamaatMinutes: 0
    },
    {
      namazName: "Maghrib",
      azaanTime: 1720143540,
      jamaatTime: 1720143540,
      ExtendedAzaanMinutes: -5,
      ExtendedJamaatMinutes: 0
    },
    {
      namazName: "Isha",
      azaanTime: 1720149420,
      jamaatTime: 1720148460,
      ExtendedAzaanMinutes: -5,
      ExtendedJamaatMinutes: 0
    }
  ];

  const tZone = "America/New_York";

  it("should render the correct number of rows", () => {
    render(<PrayerTable timings={timings} tZone={tZone} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6); // 1 header row + 3 timing rows
  });

  it("should display the correct prayer names", () => {
    render(<PrayerTable timings={timings} tZone={tZone} />);
    expect(screen.getByText("Fajr")).toBeInTheDocument();
    expect(screen.getByText("Dhuhr")).toBeInTheDocument();
    expect(screen.getByText("Asr")).toBeInTheDocument();
    expect(screen.getByText("Maghrib")).toBeInTheDocument();
    expect(screen.getByText("Isha")).toBeInTheDocument();
  });

  it("should display the correct adhan times", () => {
    render(<PrayerTable timings={timings} tZone={tZone} />);
    const rows = screen.getAllByRole("row"); // Get all rows
    expect(rows[1].querySelectorAll("td")[1]).toHaveTextContent(
      /04:42\s*AM\s*5m/
    );
    expect(rows[2].querySelectorAll("td")[1]).toHaveTextContent("01:31 PM");
    expect(rows[3].querySelectorAll("td")[1]).toHaveTextContent(
      /06:29\s*PM\s*-5m/
    );
    expect(rows[4].querySelectorAll("td")[1]).toHaveTextContent(
      /08:39\s*PM\s*-5m/
    );
    expect(rows[5].querySelectorAll("td")[1]).toHaveTextContent(
      /10:17\s*PM\s*-5m/
    );

    // expect(screen.getByText('10:00 AM 5m')).toBeInTheDocument();
    // expect(screen.getByText('12:00 AM')).toBeInTheDocument(); // Mocked default time for non-matching timestamp
    // expect(screen.getByText('12:00 AM -5m')).toBeInTheDocument();
  });

  it("should display the correct iqama times", () => {
    render(<PrayerTable timings={timings} tZone={tZone} />);
    const rows = screen.getAllByRole("row"); // Get all rows
    expect(rows[1].querySelectorAll("td")[2]).toHaveTextContent(
      /05:00\s*AM\s*10m/
    );
    expect(rows[2].querySelectorAll("td")[2]).toHaveTextContent("01:31 PM");
    expect(rows[3].querySelectorAll("td")[2]).toHaveTextContent("06:29 PM");
    expect(rows[4].querySelectorAll("td")[2]).toHaveTextContent("08:39 PM");
    expect(rows[5].querySelectorAll("td")[2]).toHaveTextContent("10:01 PM");
  });

  it("should display the time zone correctly", () => {
    render(<PrayerTable timings={timings} tZone={tZone} />);
    expect(
      screen.getByText(`The Timings are according to the`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${tZone}`)).toBeInTheDocument();
  });
});
