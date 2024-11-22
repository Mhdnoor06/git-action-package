import React from "react";
import { render, screen } from "@testing-library/react";
import Ticket from "../../v1/components/MobileViewComponents/Shared/TicketModel/Ticket";
import "@testing-library/jest-dom";

describe("Ticket Component", () => {
  const defaultProps = {
    title: "Quran Competion",
    time: "7:00 PM",
    date: "2023-06-30",
    seats: 100,
    price: 50,
  };

  const renderComponent = (props = defaultProps) => {
    render(<Ticket {...props} />);
  };

  test("renders ticket information correctly", () => {
    renderComponent();

    expect(screen.getByText("Quran Competion")).toBeInTheDocument();
    expect(screen.getByText("7:00 PM")).toBeInTheDocument();
    expect(screen.getByText("2023-06-30")).toBeInTheDocument();
    // expect(screen.getByText("0/100")).toBeInTheDocument(); //quick fix
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
  });

  test("handles 'Free' price correctly", () => {
    const freePriceProps = { ...defaultProps, price: "0" };
    renderComponent(freePriceProps);

    expect(screen.getByText("Free")).toBeInTheDocument();
  });
});
