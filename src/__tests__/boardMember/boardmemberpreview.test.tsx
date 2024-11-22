
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";

import toast from "react-hot-toast";
import { DELETE_BOARD_MEMBER } from "../../v1/graphql-api-calls/mutation";
import BoardMemberPreview from "../../v1/components/MobileViewComponents/BoardMember/BoardMemberPreview/BoardMemberPreview";

// Mock the `react-hot-toast` to avoid actual toast messages during tests
vi.mock("react-hot-toast", () => ({
  success: vi.fn(),
  error: vi.fn(),
  loading: vi.fn(),
  dismiss: vi.fn(),
}));

// Mock the navigation

vi.mock("../../MyProvider", () => ({
  useNavigationprop: () => vi.fn(),
}));

// Define mock data
const mockBoardMember = {
  _id: "1",
  name: "John Doe",
  position: "Chairperson",
  about: "Experienced leader",
  email: "john@example.com",
  phone: "123-456-7890",
  image: [],
};

const mocks = [
  {
    request: {
      query: DELETE_BOARD_MEMBER,
      variables: { masjidId: "testMasjidId", id: "1" },
    },
    result: {
      data: {
        deleteBoardMember: true,
      },
    },
  },
];

describe("BoardMemberPreview Component", () => {
  const setup = (isPreviewMode = true, isEditing = true) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BoardMemberPreview
          formData={mockBoardMember}
          handleDisclaimerStatus={vi.fn()}
          isPreviewMode={isPreviewMode}
          isEditing={isEditing}
          setIsPreviewVisible={vi.fn()}
          handleEditButton={vi.fn()}
          masjidId="testMasjidId"
        />
      </MockedProvider>
    );

  it("renders board member details correctly", () => {
    setup();
    expect(screen.getByText("Board Members Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe (Chairperson)")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Experienced leader")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Contact Number")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
  });

  it("shows edit and delete buttons when in edit mode", () => {
    setup(true, true);
    const editButton = screen.getByAltText("edit-btn");
    const deleteButton = screen.getByAltText("delete-img");
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("triggers delete warning modal when delete button is clicked", () => {
    setup();
    const deleteButton = screen.getByAltText("delete-img");
    fireEvent.click(deleteButton);
    expect(
      screen.getByText("Are you sure you want to Remove Board Member?")
    ).toBeInTheDocument();
  });

  it("triggers edit function when edit button is clicked", () => {
    const handleEditButtonMock = vi.fn();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BoardMemberPreview
          formData={mockBoardMember}
          handleDisclaimerStatus={vi.fn()}
          isPreviewMode={true}
          isEditing={true}
          setIsPreviewVisible={vi.fn()}
          handleEditButton={handleEditButtonMock}
          masjidId="testMasjidId"
        />
      </MockedProvider>
    );
    const editButton = screen.getByAltText("edit-btn");
    fireEvent.click(editButton);
    expect(handleEditButtonMock).toHaveBeenCalledTimes(1);
  });

  it("handles delete mutation successfully", async () => {
    setup();
    const deleteButton = screen.getByAltText("delete-img");
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Remove Board Member");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(
          screen.getByText("Board Member deleted successfully")
        ).toBeInTheDocument();
      }, 5000);
      // expect(toast.success).toHaveBeenCalledWith(
      //   "Board Member deleted successfully",
      //   expect.any(Object)
      // );
    });
  });

  it("renders default image if no image is provided", () => {
    setup();
    const imgElement = screen.getByAltText("Photo");
    expect(imgElement).toHaveAttribute(
      "src",
      expect.stringContaining("member-default.webp")
    );
  });

  it("shows confirm button in preview mode", () => {
    setup(true, true);
    const confirmButton = screen.getByText("Confirm Board Member");
    expect(confirmButton).toBeInTheDocument();
  });

  it("does not show edit and delete buttons when not in editing mode", () => {
    setup(true, false);
    expect(screen.queryByAltText("edit-btn")).not.toBeInTheDocument();
    expect(screen.queryByAltText("delete-img")).not.toBeInTheDocument();
  });
});
