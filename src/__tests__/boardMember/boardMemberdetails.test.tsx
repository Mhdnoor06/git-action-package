import { render, screen, waitFor } from "@testing-library/react";

import { vi } from "vitest";
import DonationPreview from "../../v1/components/MobileViewComponents/Donation/Preview/DonationPreview";
import { BoardMember } from "../../v1/redux/Types";
import BoardMemberDetails from "../../v1/components/MobileViewComponents/BoardMember/BoardMemberDetails/BoardMemberDetails";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MockedProvider } from "@apollo/client/testing";
import { Get_BoardMember } from "../../v1/graphql-api-calls/query";
import { adminFromLocalStg } from "../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import BoardMemberPreview from "../../v1/components/MobileViewComponents/BoardMember/BoardMemberPreview/BoardMemberPreview";
const mockHandleToggleEditForm = vi.fn();
vi.mock("../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage", () => ({
  adminFromLocalStg: vi.fn(() => ({
    masjids: ["some-masjid-id"],
  })),
}));
// Mock the Board member Preview component
vi.mock(
  "../../v1/components/MobileViewComponents/BoardMember/BoardMemberPreview/BoardMemberPreview",
  () => ({
    __esModule: true,
    default: vi.fn(() => <div data-testid="board-member-details" />),
  })
);

const mockBoardMember: BoardMember = {
  _id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
  image: "test-member-image-url",
  position: "Chairperson",
  about: "this is about",
  phone: "01888",
};

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
      <BoardMemberDetails />
    </MockedProvider>
  </Provider>
);

describe("Board Member Details Component", () => {
  test("renders Board Member Preview", async () => {
    render(initialComponent(mocks));

    // Check if Board Member Preview is rendered
    expect(
      screen.getByTestId("board-member-details-preview")
    ).toBeInTheDocument();

    // expect(BoardMemberPreview).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     formData: expect.objectContaining({
    //       email: "",
    //     }),
    //   })
    // );
  });
});
