import React from "react";
import { render, screen } from "@testing-library/react";
// Update the import path as necessary
import moment from "moment";
import ServiceUserDetails from "../../v1/components/MobileViewComponents/Services/ServiceUserDetails/ServiceUserDetails";
import { vi } from "vitest";

// Mock data for tests
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  contact: "123456789",
  details: {
    time: "10:00 AM",
    date: "2024-10-12",
  },
  attributes: [
    {
      attributeName: "questions",
      attributeValues:
        '[{"question": "What is your need?", "answer": "Financial Support"}]',
    },
    {
      attributeName: "assistanceType",
      attributeValues: ["Financial"],
    },
  ],
};

const mockFormDataFinancialAssistance = {
  serviceName: "Financial Assistance",
  cost: 0,
};

const mockFormDataConsultation = {
  serviceName: "Consultation",
  cost: 50,
};
const mockUserWithPractitioner = {
  ...mockUser,
  attributes: [
    {
      attributeName: "questions",
      attributeValues:
        '[{"question": "What is your need?", "answer": "Consultation Support"}]',
    },
    {
      attributeName: "practitioner",
      attributeValues: ["Dr. Smith"],
    },
  ],
};

const setUser = vi.fn();

describe("ServiceUserDetails", () => {
  test("renders financial assistance user details correctly", () => {
    render(
      <ServiceUserDetails
        user={mockUser}
        setUser={setUser}
        formData={mockFormDataFinancialAssistance}
      />
    );

    // Check service name
    expect(
      screen.getByText("Financial Assistance Registered Users")
    ).toBeInTheDocument();

    // Check user details
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();

    // Check registration fees
    expect(screen.getByText("Free")).toBeInTheDocument();

    // Check dynamic fields for financial assistance
    expect(screen.getByText("Assistance Type")).toBeInTheDocument();
    expect(screen.getByText("Financial")).toBeInTheDocument();
    expect(screen.getByText("What is your need?")).toBeInTheDocument();
    expect(screen.getByText("Financial Support")).toBeInTheDocument();
  });

  test("renders consultation user details correctly", () => {
    render(
      <ServiceUserDetails
        user={mockUserWithPractitioner}
        setUser={setUser}
        formData={mockFormDataConsultation}
      />
    );

    // Check service name
    expect(
      screen.getByText("Consultation Registered Users")
    ).toBeInTheDocument();

    // Check user details
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();

    // Check registration fees
    expect(screen.getByText("$50")).toBeInTheDocument();

    // Check practitioner information
    expect(screen.getByText("Practitioner")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();

    // Check dynamic fields for consultation
    expect(screen.getByText("What is your need?")).toBeInTheDocument();
    expect(screen.getByText("Consultation Support")).toBeInTheDocument();
  });

  test("renders date & time for non-financial assistance services", () => {
    render(
      <ServiceUserDetails
        user={mockUserWithPractitioner}
        setUser={setUser}
        formData={mockFormDataConsultation}
      />
    );

    const formattedDate = moment(mockUser.details.date).format("DD MMM, YYYY");
    expect(screen.getByText(`10:00 AM (${formattedDate})`)).toBeInTheDocument();
  });

  test("does not render date & time for financial assistance service", () => {
    render(
      <ServiceUserDetails
        user={mockUser}
        setUser={setUser}
        formData={mockFormDataFinancialAssistance}
      />
    );

    // Date & time should not be rendered for Financial Assistance service
    expect(screen.queryByText(/Date & Time/i)).not.toBeInTheDocument();
  });

  test("renders practitioner information for consultation service", () => {
    render(
      <ServiceUserDetails
        user={mockUserWithPractitioner}
        setUser={setUser}
        formData={mockFormDataConsultation}
      />
    );

    // Check practitioner information is rendered
    expect(screen.getByText("Practitioner")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
  });
});
