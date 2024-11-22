import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FuneralFields from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/FuneralFields";

describe("FuneralFields", () => {
  const formData = {
    description: "This is a description",
    dateOfDeath: "2024-10-01",
    funeralDate: "2024-10-05",
  };

  const handleChange = vi.fn();

  it("should render form fields with correct initial values", () => {
    render(<FuneralFields formData={formData} handleChange={handleChange} />);

    // Check description textarea
    const descriptionTextarea = screen.getByLabelText(/description/i);
    expect(descriptionTextarea).toBeInTheDocument();
    expect(descriptionTextarea).toHaveValue("This is a description");

    // Check dateOfDeath input
    const dateOfDeathInput = screen.getByLabelText(/date of death/i);
    expect(dateOfDeathInput).toBeInTheDocument();
    expect(dateOfDeathInput).toHaveValue("2024-10-01");

    // Check funeralDate input
    const funeralDateInput = screen.getByLabelText(/funeral date/i);
    expect(funeralDateInput).toBeInTheDocument();
    expect(funeralDateInput).toHaveValue("2024-10-05");
  });

 
});
