import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import {
  GET_SERVICE_BY_ID,
  GET_USERS_FOR_SERVICE,
} from "../../v1/graphql-api-calls/query";
import ServiceDetails from "../../v1/components/MobileViewComponents/Services/Details/ServiceDetails";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import ServiceView from "../../v1/components/MobileViewComponents/Services/View/ServiceView";
vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(),
      { loading: false, error: null, data: null },
    ]),
    useQuery: vi.fn(() => ({
      loading: false,
      error: null,
      data: null,
    })),
  };
});
// Mock data for GraphQL queries
const serviceMockObj = {
  id: "1",
  serviceName: "Nikah",
  description: "Nikah Services",
  email: "Nikah@service.com",
  contactNumber: "123456789",
  registrationRequired: false,
  details: {
    cost: "100",
    startTime: "10:00",
    endTime: "11:00",
    availabilityTiming: "daily",
  },
  attributes: [
    {
      attributeName: "days",
      attributeValues: ["Monday", "Tuesday"],
    },
  ],
};
const mocks = [
  {
    request: {
      query: GET_SERVICE_BY_ID,
      variables: { id: "1" },
    },
    result: {
      data: {
        getServiceById: serviceMockObj,
      },
    },
  },
  {
    request: {
      query: GET_USERS_FOR_SERVICE,
      variables: { serviceId: "1" },
    },
    result: {
      data: {
        getUsersForService: [{ id: "1", name: "John Doe" }],
      },
    },
  },
];
{
  /* <Provider store={Store}>
    <ServiceCard consumerMasjidId={"some-id"} service={mocks} />
  </Provider> */
}

const initialComponent = (mocks: any) => (
  <Provider store={Store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <ServiceDetails />
    </MockedProvider>
  </Provider>
);
describe("ServiceDetails component", () => {
  it("renders the service details", async () => {
    render(initialComponent(mocks));
    render(
      <Provider store={Store}>
        <ServiceView
          consumerMasjidId={"some-id"}
          formData={serviceMockObj}
          isPreviewMode={false}
          handleEditButton={() => {}}
          setIsRegistrationsVisible={() => {}}
          handleDisclaimerStatus={() => {}}
          setIsShareVisible={() => {}}
          masjidId={"0185252"}
        />
      </Provider>
    );

    // Ensure loading state is shown initially

    // Wait for the query to resolve and display service details
    const serviceName = await screen.findByText("Nikah Services");
    expect(serviceName).toBeInTheDocument();

    const description = screen.getByText("Nikah Services");
    expect(description).toBeInTheDocument();

    const email = screen.getByText("Nikah@service.com");
    expect(email).toBeInTheDocument();

    const contactNumber = screen.getByText("123456789");
    expect(contactNumber).toBeInTheDocument();
  });

  //   it("toggles the registration table visibility", async () => {
  //     render(initialComponent(mocks));

  //     const editButton = await screen.findByRole("button", { name: /edit/i });
  //     expect(editButton).toBeInTheDocument();

  //     fireEvent.click(editButton);

  //     const registrationTable = screen.getByText(/registrations/i);
  //     expect(registrationTable).toBeInTheDocument();
  //   });

  //   it("opens and closes the share modal", async () => {
  //     render(initialComponent(mocks));

  //     const shareButton = await screen.findByRole("button", { name: /share/i });
  //     expect(shareButton).toBeInTheDocument();

  //     fireEvent.click(shareButton);

  //     const shareModal = screen.getByText(/share this service/i);
  //     expect(shareModal).toBeInTheDocument();

  //     const closeButton = screen.getByRole("button", { name: /close/i });
  //     fireEvent.click(closeButton);

  //     expect(shareModal).not.toBeInTheDocument();
  //   });
});
