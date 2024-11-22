import { render, screen, fireEvent } from "@testing-library/react";
import DonationCard from "../../v1/components/MobileViewComponents/Donation/Card/DonationCard";
import { vi } from "vitest";
import BoardMemberCard from "../../v1/components/MobileViewComponents/BoardMember/BoardMemberCard/BoardMemberCard";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import { BoardMember } from "../../v1/redux/Types";
import { useNavigationprop } from "../../MyProvider";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";

const mockHandleDonationClick = vi.fn();
const mockNavigation = vi.fn();
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));
vi.mock("../../MyProvider", () => ({
  useNavigationprop: () => mockNavigation,
}));

const mockBoardMember: BoardMember = {
  _id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
  image: "test-member-image-url",
  position: "Chairperson",
  about: "this is about",
  phone: "01888",
};
const initialComponent = () => (
  <Provider store={Store}>
    <BoardMemberCard
      boardMember={mockBoardMember}
      consumerMasjidId={"some-masjid-id"}
    />
  </Provider>
);

describe("Board memberCard Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the board member card with correct content", () => {
    render(initialComponent());

    // Verify that the board member name is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Verify that the board member email is rendered
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();

    // Verify that the board member position is rendered
    expect(screen.getByText("Chairperson")).toBeInTheDocument();

    // Verify that the member icon is rendered
    const imageElement = screen.getByAltText("member icon");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "test-member-image-url");

    // Verify that the next slide icon is rendered
    expect(screen.getByTestId("nextslide")).toBeInTheDocument();
  });
  test("handles card click event and navigates correctly", () => {
    render(initialComponent());

    const cardElement = screen.getByTestId("board-member-card");
    fireEvent.click(cardElement);

    expect(mockNavigation).toHaveBeenCalledWith("/board-member-details/1");
  });

  test("renders the default member icon when no image is provided", () => {
    const boardMemberWithoutImage = {
      ...mockBoardMember,
      image: undefined,
    };

    render(
      <Provider store={Store}>
        <BoardMemberCard
          boardMember={boardMemberWithoutImage}
          consumerMasjidId={"some-masjid-id"}
        />
      </Provider>
    );

    // Verify that the default member icon is rendered when no image is provided
    const defaultImageElement = screen.getByAltText("member icon");
    expect(defaultImageElement).toBeInTheDocument();
    expect(defaultImageElement).toHaveAttribute(
      "src",
      "/src/v1/photos/Newuiphotos/BoardMember/memberIco.webp"
    );
  });

  test("renders the next slide icon", () => {
    render(initialComponent());

    // Verify that the next slide icon is rendered
    expect(screen.getByTestId("nextslide")).toBeInTheDocument();
  });
});
