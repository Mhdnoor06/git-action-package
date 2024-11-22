import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { vi } from "vitest";
import BoardMember from "../../v1/components/MobileViewComponents/BoardMember/Main/BoardMember";
import { Get_BoardMember } from "../../v1/graphql-api-calls/query";
import Store from "../../v1/redux/store";
// Mocking external dependencies
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));

// vi.mock("axios");

const mocks = [
  {
    request: {
      query: Get_BoardMember,
      variables: { masjidId: "some-masjid-id" },
    },
    result: {
      data: {
        GetBoardMembers: [
          {
            _id: "1",
            name: "Board Member",
            position: "Owner",
            email: "test@email.com",
            about: "about field ",
            phone: "018522 ",
            image: "",
          },
        ],
      },
    },
  },
];
const initialComponent = (mocks: any) => (
  <Provider store={Store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <BoardMember consumerMasjidId="some-masjid-id" />
    </MockedProvider>
  </Provider>
);

describe("Board MEmber Component", () => {
  test("displays skeleton loader initially and Board member cards after data is loaded", async () => {
    render(initialComponent(mocks));

    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(5);
  });

  test("displays Board member cards after data is loaded", async () => {
    render(initialComponent(mocks));

    await waitFor(() => {
      expect(screen.getByText("Board Member")).toBeInTheDocument();
    });
  });

  test("shows no Board member message when there are no Board members", async () => {
    const emptyMocks = [
      {
        request: {
          query: Get_BoardMember,
          variables: { masjidId: "some-masjid-id" },
        },
        result: {
          data: {
            getBoardMembers: [], // Mocking an empty array for no board members
          },
        },
      },
    ];
    render(initialComponent(emptyMocks));

    await waitFor(() => {
      expect(screen.getByText("No Board Member Yet")).toBeInTheDocument();
    });
  });
  test("opens and closes Board Member details page", async () => {
    render(initialComponent(mocks));

    const boardMemberCard = screen.getByTestId("board-member-card");
    fireEvent.click(boardMemberCard);

    await waitFor(() => {
      expect(screen.getByTestId("board-member-details")).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId("backBtn");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId("board-member-details")
      ).not.toBeInTheDocument();
    });
  });
  test("opens the form when the 'Add Board Member' button is clicked", async () => {
    render(initialComponent(mocks));

    // Wait for the board members to be displayed or 'No Board Member Yet' message
    await waitFor(() => {
      const addBoardMemberButton = screen.getByTestId("add-board-member-btn");

      // Simulate a click on the 'Add Board Member' button
      fireEvent.click(addBoardMemberButton);
    });

    // Check if the form is opened (you can use the appropriate text or form element)
    await waitFor(() => {
      expect(screen.getByText("Add Board Members")).toBeInTheDocument();
    });
  });
});
