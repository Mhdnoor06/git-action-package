import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import toast from "react-hot-toast";

import ProgramView from "../../v1/components/MobileViewComponents/Programs/Main/ProgramForm/ProgramView";
import {
  DELETE_PROGRAM,
  UPDATE_PROGRAM,
} from "../../v1/graphql-api-calls/mutation";
import { BrowserRouter } from "react-router-dom";
import Store from "../../v1/redux/store";
import { Provider } from "react-redux";
const handleProgramDelete = vi.fn();
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
    dismiss: vi.fn(),
    loading: vi.fn(),
  },
}));

// Mock necessary props
const mockFormData = {
  programName: "Mock Program",
  programCategory: "Education",
  isRegistrationRequired: true,
  startTime: "10:00",
  startDate: "2023-10-01",
  endTime: "12:00",
  endDate: "2023-10-01",
  address: "123 Test Street",
  ageOption: "range",
  startRange: 10,
  endRange: 50,
  capacity: 100,
  cost: 20,
  description: "This is a mock program description.",
  active: true,
  images: [],
};
const mockWithRegOption = { ...mockFormData, registrationOption: "paid" };

const mockMasjidId = "1";

// Mock mutation for delete and update
const mocks = [
  {
    request: {
      query: DELETE_PROGRAM,
      variables: { id: "1" },
    },
    result: {
      data: {
        DeleteProgram: true,
      },
    },
  },
  {
    request: {
      query: UPDATE_PROGRAM,
      variables: {
        id: "1",
        input: { active: true },
      },
    },
    result: {
      data: {
        UpdateProgram: {
          id: "1",
          programName: "Updated Program",
        },
      },
    },
  },
];

describe("ProgramView Component", () => {
  it("renders the program details correctly", () => {
    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramView
            formData={mockFormData}
            masjidId={mockMasjidId}
            isPreviewMode={false}
          />
        </MockedProvider>
      </Provider>
    );

    expect(screen.getByTestId("program-name")).toHaveTextContent(
      "Mock Program"
    );
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(
      screen.getByText("Ticket Will Be Issued To The User")
    ).toBeInTheDocument();

    expect(screen.getByText(/01 Oct 2023\|10:00 am/i)).toBeInTheDocument();

    expect(screen.getByText("01 Oct 2023 | 12:00 PM")).toBeInTheDocument();
  });

  it("triggers edit button click", () => {
    const mockHandleEditButton = vi.fn();

    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramView
            formData={mockFormData}
            masjidId={mockMasjidId}
            isPreviewMode={false}
            handleEditButton={mockHandleEditButton}
          />
        </MockedProvider>
      </Provider>
    );

    const editButton = screen.getByAltText("edit-icon");
    fireEvent.click(editButton);

    expect(mockHandleEditButton).toHaveBeenCalledTimes(1);
  });

  it("triggers program deletion", async () => {
    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramView
            formData={mockFormData}
            masjidId={mockMasjidId}
            isPreviewMode={false}
          />
        </MockedProvider>
      </Provider>
    );

    const deleteButton = screen.getByAltText("Delete icon");
    fireEvent.click(deleteButton);

    const delMsg = await screen.findByText(
      "Are you sure you want to Delete the program ?"
    );
    expect(delMsg).toBeInTheDocument();
    const yesBtn = await screen.findByText("Yes");
    fireEvent.click(yesBtn);
    expect(toast.loading).toHaveBeenCalledWith("Deleting Program...");
  });

  it("handles image rendering", () => {
    const mockFormDataWithImage = {
      ...mockFormData,
      images: ["test-image-url"],
    };

    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramView
            formData={mockFormDataWithImage}
            masjidId={mockMasjidId}
            isPreviewMode={false}
          />
        </MockedProvider>
      </Provider>
    );

    const image = screen.getByAltText("Photo 0");
    expect(image).toHaveAttribute("src", "test-image-url");
  });

  it("renders registration information when required", () => {
    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramView
            formData={mockWithRegOption}
            masjidId={mockMasjidId}
            isPreviewMode={false}
          />
        </MockedProvider>
      </Provider>
    );

    expect(screen.getByText("Registration Fees")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  // it("does not render registration details when registration is not required", () => {
  //   const mockDataWithRegRequiredFalse = {
  //     ...mockFormData,
  //     isRegistrationRequired: false,
  //     registrationOption: "free", // This won't be displayed since registration is not required
  //     cost: 0,
  //   };

  //   render(
  //     <Provider store={Store}>
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <ProgramView
  //           formData={mockDataWithRegRequiredFalse}
  //           masjidId={mockMasjidId}
  //           isPreviewMode={false}
  //         />
  //       </MockedProvider>
  //     </Provider>
  //   );

  //   // Assert that the registration details are not rendered
  //   expect(screen.queryByText("Registration Fees")).not.toBeInTheDocument();
  //   expect(
  //     screen.queryByText("Ticket will be issued to the user")
  //   ).not.toBeInTheDocument();
  //   expect(screen.queryByText("Free")).not.toBeInTheDocument();
  //   expect(screen.queryByText("$ 50")).not.toBeInTheDocument();
  // });

});
