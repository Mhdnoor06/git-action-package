// EventDetailsForm.test.js
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EventDetailsForm from "../../v1/components/MobileViewComponents/Events/Form/EventDetailsForm";

const defaultFormData = {
  eventName: "",
  category: "",
  description: "",
  capacity: 0,
  recurrenceType: "",
  address: "",
  cost: "0",
  isRegistrationRequired: false,
};

// vi.mock(
//   "../../v1/components/MobileViewComponents/Events/Form/EventDetailsForm",
//   () => {
//     return {
//       default: vi.fn().mockImplementation(({ formData, setFormData }) => {
//         return <div>Mocked event details form</div>;
//       }),
//     };
//   }
// );

const renderComponent = (props = {}) => {
  const handleChange = vi.fn();
  const handleSelectChange = vi.fn();
  const setAddressChecked = vi.fn();
  const setFormData = vi.fn();
  const setRegCheckBox = vi.fn();
  const setRegistrationOption = vi.fn();
  const inputChecker = vi.fn().mockReturnValue("");

  const defaultProps = {
    formData: defaultFormData,
    handleChange,
    handleSelectChange,
    addressChecked: false,
    setAddressChecked,
    inputChecker,
    isFormDetailsPage: false,
    masjidAddress: "123 Main St",
    setFormData,
    regCheckBox: true,
    setRegCheckBox,
    isPaymentsSetup: true,
    isStripeLoading: false,
    registrationOption: "free",
    setRegistrationOption,
    admin: { role: "subadmin" },
    children: null,
    ...props,
  };

  return render(<EventDetailsForm {...defaultProps} />);
};

describe("EventDetailsForm", () => {
  it("should render the form with all fields", () => {
    renderComponent();

    expect(screen.getByLabelText("Event Name *")).toBeInTheDocument();
    expect(screen.getByTestId("event-category-select")).toBeInTheDocument();
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
    expect(screen.getByTestId("event-recurrence-type")).toBeInTheDocument();
    expect(screen.getByLabelText("Location Is Different")).toBeInTheDocument();
    expect(
      screen.getByLabelText("User Required Registration")
    ).toBeInTheDocument();
  });

  it("should handle input changes correctly", () => {
    const handleChange = vi.fn();
    renderComponent({ handleChange });

    fireEvent.change(screen.getByLabelText("Event Name *"), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByTestId("event-category-select"), {
      target: { value: "Islamic Event" },
    });
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "Test Description" },
    });

    // fireEvent.change(screen.getByTestId("event-recurrence-type"), {
    //   target: { value: "Daily" },
    // });

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it("should handle checkbox and autocomplete changes correctly", () => {
    const setAddressChecked = vi.fn();
    renderComponent({ setAddressChecked });

    const checkbox = screen.getByLabelText("Location Is Different");
    fireEvent.click(checkbox);
    expect(setAddressChecked).toHaveBeenCalledWith(true);
  });

  it("should display Free and Paid options and set the correct registration option when clicked", async () => {
    let registrationOption = "free";
    const setRegistrationOption = vi.fn((option) => {
      registrationOption = option;
    });
    const handleChange = vi.fn();

    // Render the component with regCheckBox set to true
    renderComponent({
      registrationOption,
      regCheckBox: true,
      setRegistrationOption,
      handleChange,
      admin: { role: "subadmin" },
      isPaymentsSetup: true,
      isStripeLoading: false, // Allow the Paid option to be selectable
    });

    // Check if both Free and Paid options are visible
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();
    // await waitFor(() =>
    //   expect(setRegistrationOption).toHaveBeenCalledWith("free")
    // );
    await waitFor(() => expect(registrationOption).toBe("free"));
    // Click on the Paid option and check if the registration option is set to 'paid'
    fireEvent.click(screen.getByText("Paid"));
    expect(setRegistrationOption).toHaveBeenCalledWith("paid");
    await waitFor(() => {
      expect(registrationOption).toBe("paid");
    });

    cleanup();
    renderComponent({
      registrationOption,
      regCheckBox: true,
      setRegistrationOption,
      handleChange,
      admin: { role: "subadmin" },
      isPaymentsSetup: true,
      isStripeLoading: false, // Allow the Paid option to be selectable
    });
    // screen.debug(screen.getByTestId("registration-options"));

    // // Click on the Free option and check if the registration option is set to 'free'
    fireEvent.click(screen.getByText("Free"));
    await waitFor(() =>
      expect(setRegistrationOption).toHaveBeenCalledWith("free")
    );
    await waitFor(() => {
      expect(registrationOption).toBe("free");
    });
  });

  it("should open the StripeErrorModal when isPaymentsSetup is false and Paid is clicked", () => {
    const setRegistrationOption = vi.fn();
    const handleChange = vi.fn();

    // Render the component with isPaymentsSetup set to false
    renderComponent({
      regCheckBox: true,
      setRegistrationOption,
      handleChange,
      admin: { role: "subadmin" },
      isPaymentsSetup: false, // Payments setup is disabled
      isStripeLoading: false,
    });

    // Check if both Free and Paid options are visible
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();

    // Click on the Paid option
    fireEvent.click(screen.getByText("Paid"));

    // Check if the StripeErrorModal is open
    expect(screen.getByText("Account Not Linked")).toBeInTheDocument();
    expect(
      screen.getByText(
        "It seems that you don't have a linked Stripe account to make paid events through ConnectMazjid. Please connect your Stripe account to start accepting payments."
      )
    ).toBeInTheDocument();

    // Ensure the registration option is not set to 'paid'
    expect(setRegistrationOption).not.toHaveBeenCalledWith("paid");
  });
});
