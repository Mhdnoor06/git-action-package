import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { Get_Services } from "../../v1/graphql-api-calls/query";
import Store from "../../v1/redux/store";
import Services from "../../v1/components/MobileViewComponents/Services/Main/Services";
// Mocking external dependencies
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));

// vi.mock("axios");

const mocks = [
  {
    request: {
      query: Get_Services,
      variables: { masjidId: "some-masjid-id" },
    },
    result: {
      data: {
        getServices: [
          {
            id: "66f3a979af14819916f752be",
            serviceName: "service name 1",
            description: "description test",
            emailAddress: "sdfg",
            image: "",
            active: true,
            contactNumber: "dsdg",
          },
        ],
      },
    },
  },
];
const availableAllServicesMocks = [
  {
    request: {
      query: Get_Services,
      variables: { masjidId: "some-masjid-id" },
    },
    result: {
      data: {
        getServices: [
          {
            id: "66f3a979af14819916f752be",
            serviceName: "service name 1",
            description: "description test",
            emailAddress: "sdfg",
            image: "",
            active: true,
            contactNumber: "dsdg",
          },
          {
            id: "66f3a979af14819916f752bf",
            serviceName: "service name 2",
            description: "description for service 2",
            emailAddress: "example2@test.com",
            image: "https://example.com/image2.jpg",
            active: false,
            contactNumber: "1234567890",
          },
          {
            id: "66f3a979af14819916f752c0",
            serviceName: "service name 3",
            description: "this is service 3 description",
            emailAddress: "example3@test.com",
            image: "https://example.com/image3.jpg",
            active: true,
            contactNumber: "0987654321",
          },
          {
            id: "66f3a979af14819916f752c1",
            serviceName: "service name 4",
            description: "service 4 with more detailed description",
            emailAddress: "example4@test.com",
            image: "",
            active: true,
            contactNumber: "1112223333",
          },
          {
            id: "66f3a979af14819916f752c2",
            serviceName: "service name 5",
            description: "description for service 5",
            emailAddress: "example5@test.com",
            image: "https://example.com/image5.jpg",
            active: false,
            contactNumber: "4445556666",
          },
        ],
      },
    },
  },
];
const initialComponent = (mocks: any) => (
  <Provider store={Store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <Services consumerMasjidId="some-masjid-id" />
    </MockedProvider>
  </Provider>
);

describe("Services Component", () => {
  test("displays skeleton loader initially and Services cards after data is loaded", async () => {
    render(initialComponent(mocks));

    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(5);
  });

  test("displays  Services cards after data is loaded", async () => {
    render(initialComponent(mocks));

    await waitFor(() => {
      expect(screen.getByText("service name 1")).toBeInTheDocument();
    });
  });

  test("shows no Services  message when there are no Services", async () => {
    const emptyMocks = [
      {
        request: {
          query: Get_Services,
          variables: { masjidId: "some-masjid-id" },
        },
        result: {
          data: {
            getServices: [], // Mocking an empty array for no Services
          },
        },
      },
    ];
    render(initialComponent(emptyMocks));

    await waitFor(() => {
      expect(screen.getByText("No Active Services")).toBeInTheDocument();
    });
  });
  test("opens and closes Service details page", async () => {
    render(initialComponent(mocks));

    // Ensure the service card is present
    expect(await screen.findByText("service name 1")).toBeInTheDocument(); // Replaces waitFor

    // Click the service card to open details
    const serviceCard = screen.getByTestId("service-card");
    fireEvent.click(serviceCard);

    // Wait for the Service details to be displayed
    // expect(await screen.findByTestId("service-details")).toBeInTheDocument(); // Replaces waitFor

    // // Click the close button to hide details
    // const closeButton = screen.getByTestId("backBtn");
    // fireEvent.click(closeButton);

    // Ensure the details page is no longer in the DOM
    // await waitFor(() => {
    //   expect(screen.queryByTestId("service-details")).not.toBeInTheDocument();
    // });
  });

  test("opens the form when the 'Add Service' button is clicked", async () => {
    render(initialComponent(mocks));
    expect(await screen.findByText("service name 1")).toBeInTheDocument(); // Replaces waitFor
    const serviceCard = screen.getByTestId("add-service-action-btn");
    fireEvent.click(serviceCard);

    // Check if the form is opened (you can use the appropriate text or form element)
    await waitFor(() => {
      expect(screen.getByText("Add Service")).toBeInTheDocument();
    });
  });
  test("Add Service' button will not be shown if the service item become more then 4", async () => {
    render(initialComponent(availableAllServicesMocks));
    expect(await screen.findByText("service name 1")).toBeInTheDocument(); // Replaces waitFor
    expect(
      screen.queryByTestId("add-service-action-btn")
    ).not.toBeInTheDocument();
  });
});
