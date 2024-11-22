import { render, screen, fireEvent } from "@testing-library/react";

import { vi } from "vitest";
import NikahFields from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/NikahFields";

// Mock the dependent components and functions
vi.mock(
  "../../v1/components/MobileViewComponents/Services/CommonFileds/CommonFields",
  () => ({
    __esModule: true,
    default: ({ handleChange }) => <div>CommonFields</div>,
  })
);

vi.mock(
  "../../v1/components/MobileViewComponents/Services/DateTimeSelectionField/DateTimeSelector",
  () => ({
    __esModule: true,
    default: ({ handleChange }) => <div>DateTimeSelector</div>,
  })
);

vi.mock(
  "../../v1/components/MobileViewComponents/Shared/ServiceTimingSelector/ServiceTimingSelector",
  () => ({
    __esModule: true,
    default: ({ selectedServices, handleDeleteService }) => (
      <div>
        <div>ServiceTimingSelector</div>
        {selectedServices.map((service) => (
          <div key={service}>
            {service}
            <button onClick={handleDeleteService(service)}>Delete</button>
          </div>
        ))}
      </div>
    ),
  })
);

describe("NikahFields", () => {
  const mockHandleChange = vi.fn();
  const mockSetValidationErrors = vi.fn();
  const defaultFormData = {
    timing: {
      time: [],
      customStartEndTime: [],
    },
  };

  it("renders the component correctly", () => {
    render(
      <NikahFields
        formData={defaultFormData}
        handleChange={mockHandleChange}
        setValidationErrors={mockSetValidationErrors}
        stripeFields={[true, false]}
        admin={{ role: "subadmin" }}
      />
    );

    expect(screen.getByText("CommonFields")).toBeInTheDocument();
    expect(screen.getByText("DateTimeSelector")).toBeInTheDocument();
    expect(screen.getByText("ServiceTimingSelector")).toBeInTheDocument();
  });
});
