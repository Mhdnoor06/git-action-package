import { renderHook, act, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import { vi } from "vitest";
import { useWidgetAuth } from "../../../v1/graphql-api-calls/widgetAuth/widgetAuth";

// Mock mutation query
const WIDGET_AUTH_MUTATION = gql`
  mutation widgetAuth($input: WidgetAuthPayload!) {
    widgetAuth(input: $input)
  }
`;

// Define mock responses for the mutation
const mocks = [
  {
    request: {
      query: WIDGET_AUTH_MUTATION,
      variables: {
        input: {
          masjidId: "12345",
          assetType: "events",
        },
      },
    },
    result: {
      data: {
        widgetAuth: "mockToken123",
      },
    },
  },
  {
    request: {
      query: WIDGET_AUTH_MUTATION,
      variables: {
        input: {
          masjidId: "invalid-id",
          assetType: "invalid-asset",
        },
      },
    },
    error: new Error("Authentication failed"),
  },
];

describe("useWidgetAuth Hook", () => {
  it("should return the correct data when the mutation succeeds", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useWidgetAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.authenticateWidget(
        "12345",
        "events"
      );
      expect(response.data.widgetAuth).toBe("mockToken123");
    });

    // Check loading state
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle errors correctly when the mutation fails", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useWidgetAuth(), { wrapper });

    await act(async () => {
      try {
        await result.current.authenticateWidget("invalid-id", "invalid-asset");
      } catch (error) {
        expect(error.message).toBe("Authentication failed");
      }
    });

    // Check that error is set
    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBe(false);
  });

  it("should set loading to true while the mutation is in progress", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useWidgetAuth(), { wrapper });

    act(() => {
      // Trigger the mutation
      result.current.authenticateWidget("12345", "events");
    });

    // Verify that loading is true while the mutation is in progress
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
