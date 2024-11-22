import { render, screen, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import { BoardMember } from "../../v1/redux/Types";
import { useNavigationprop } from "../../MyProvider";
import ServiceCard from "../../v1/components/MobileViewComponents/Services/Main/ServiceCard";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MockedProvider } from "@apollo/client/testing";
import { getDonationDefaultIcon } from "../../v1/helpers/ServiceIconHelper/ServiceIconHelper";

import nikahIcon from "../../v1/photos/Newuiphotos/Services/nikah1.webp";

const mockHandleDonationClick = vi.fn();
const mockNavigation = vi.fn();
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));
vi.mock("../../MyProvider", () => ({
  useNavigationprop: () => mockNavigation,
}));

vi.mock("../../v1/helpers/ServiceIconHelper/ServiceIconHelper", () => ({
  getDonationDefaultIcon: vi.fn(),
}));

const mockService = {
  id: "123",
  serviceName: "Nikah",
  description: "This is a test service",
  active: true,
  images: { url: "", id: "image123" },
};

const initialComponent = (mocks: any) => (
  <Provider store={Store}>
    <ServiceCard consumerMasjidId={"some-id"} service={mocks} />
  </Provider>
);
describe("Service Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("renders the service card with correct content", () => {
    render(initialComponent(mockService));

    expect(screen.getByText("Nikah")).toBeInTheDocument();
    expect(screen.getByText("This is a test service")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByTestId("service-card")).toBeInTheDocument();
  });
  it("triggers the handleCardClick function when clicked, using the navigation hook", () => {
    render(initialComponent(mockService));
    const serviceCard = screen.getByTestId("service-card");

    // Trigger the click event on the service card
    fireEvent.click(serviceCard);

    // Expect the mock navigation function to have been called with the correct path
    expect(mockNavigation).toHaveBeenCalledWith(`/service-details/123`);
  });

  test("renders the default service icon if no image is provided", () => {
    // Mock the return value of the function
    (getDonationDefaultIcon as Mock).mockReturnValue(nikahIcon);

    render(initialComponent(mockService));

    // Check that the image has the correct 'src' attribute
    expect(screen.getByAltText("service-icon")).toHaveAttribute(
      "src",
      nikahIcon
    );
  });

  test("shows the correct status based on the service's active state", () => {
    const inactiveService = {
      ...mockService,
      active: false,
    };

    render(initialComponent(inactiveService));

    // Check that the service status is shown as "Deactivate"
    expect(screen.getByText("Deactivate")).toBeInTheDocument();

    // Check inactive status image
    expect(screen.getByAltText("deactivate service")).toBeInTheDocument();
  });

  // test("renders the next slide icon", () => {
  //   render(<ServiceCard boardMember={mockService} />);

  //   // Verify that the next slide icon is rendered
  //   expect(screen.getByTestId("nextslide")).toBeInTheDocument();
  // });
});
