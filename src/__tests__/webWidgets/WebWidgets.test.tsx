import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WebWidgets from "../../v1/components/MobileViewComponents/WebWidgets/WidgetsPage/WebWidgets";
import { NavigateFunction } from "react-router";
import MyProvider from "../../MyProvider";
import { useWidgetAuth } from "../../v1/graphql-api-calls/widgetAuth/widgetAuth";
import { MockedProvider } from "@apollo/client/testing";

vi.mock("../../v1/components/MobileViewComponents/Shared/BackButton", () => {
  return {
    __esModule: true,
    default: ({ handleBackBtn }: any) => (
      <button onClick={() => handleBackBtn()}>Back</button>
    ),
  };
});

vi.mock("../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage", () => ({
  adminFromLocalStg: () => ({ masjids: ["12345"] }),
}));

const mockAuthenticateWidget = vi.fn().mockResolvedValue({
  data: { widgetAuth: "mockToken123" },
});

// Mock the useWidgetAuth hook
vi.mock(
  "../../../../../graphql-api-calls/widgetAuth/widgetAuth",
  async (importOriginal) => {
    const originalModule = await importOriginal();

    return {
      ...originalModule,
      useWidgetAuth: vi.fn(() => ({
        authenticateWidget: mockAuthenticateWidget,
        data: { widgetAuth: "mockToken123" }, // Mock data response after authentication
        loading: false, // Mock loading state
        error: null, // Mock error state
      })),
    };
  }
);

const setup = () => {
  const utils = render(
    <MockedProvider>
      <WebWidgets />
    </MockedProvider>
  );
  const widgetCards = screen.getAllByTestId("widget-card");
  return {
    ...utils,
    widgetCards,
  };
};

describe("WebWidgets Component", () => {
  const mockNavigation = vi.fn() as unknown as NavigateFunction;

  it("should render WebWidgets header", () => {
    render(<WebWidgets />);
    expect(screen.getByText("Web Widgets"));
  });

  it("should render all widget cards", () => {
    const { widgetCards } = setup();
    expect(widgetCards.length).toBe(6);
  });

  it("should show WebWidgetDetail when a card is clicked", () => {
    const { widgetCards } = setup();
    fireEvent.click(widgetCards[0]);
    expect(screen.getByText("Salah Timing Widgets")).toBeInTheDocument();
  });

  it("when a card is clicked,masjid admin will pass the navigation as prop it should navigate to WebWidgetDetail", () => {
    render(
      <MyProvider navigation={mockNavigation}>
        <WebWidgets />
      </MyProvider>
    );

    expect(screen.getByText("Web Widgets"));
  });

  it("should return to widget cards when back button is clicked", () => {
    const { widgetCards } = setup();
    fireEvent.click(widgetCards[0]);
    expect(screen.getByText("Salah Timing Widgets")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByTestId("header-title")).toBeInTheDocument();
    expect(screen.getAllByTestId("widget-card").length).toBe(6);
  });
});
