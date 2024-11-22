import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByRole,
} from "@testing-library/react";
import { vi } from "vitest";
import WebWidgetDetail from "../../v1/components/MobileViewComponents/WebWidgets/WidgetsPage/WebWidgetDetail/WebWidgetDetail";
import { useWidgetAuth } from "../../v1/graphql-api-calls/widgetAuth/widgetAuth";
import { adminFromLocalStg } from "../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { MockedProvider } from "@apollo/client/testing";

// Mock the dependencies

const mockAuthenticateWidget = vi.fn().mockResolvedValue({
  data: { widgetAuth: "mockToken123" },
});

// Mock the useWidgetAuth hook
vi.mock(
  "../../v1/graphql-api-calls/widgetAuth/widgetAuth",
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

vi.mock("../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage", () => ({
  adminFromLocalStg: () => ({ masjids: ["12345"] }),
}));

// Mock the navigator clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

const theme = createTheme();

describe("WebWidgetDetail Component", () => {
  const renderComponent = (
    widgetType = "Salah Timing Widgets",
    isMainAdmin = false
  ) => {
    render(
      <ThemeProvider theme={theme}>
        <MockedProvider>
          <WebWidgetDetail widgetType={widgetType} isMainAdmin={isMainAdmin} />
        </MockedProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // Clear mocks before each test
    mockAuthenticateWidget.mockClear();

    // Mock localStorage to always return null for getItem
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  });
  afterEach(() => {
    // Restore original implementations
    vi.restoreAllMocks();
  });

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText("Salah Timing Widgets")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy Link" })
    ).toBeInTheDocument();
  });

  it("handles view switching", async () => {
    renderComponent();

    // Select the dropdown using data-testid
    const select = screen.getByRole("combobox");

    // Open the dropdown
    fireEvent.mouseDown(select);

    // Use waitFor to ensure the dropdown opens
    await waitFor(() => {
      expect(screen.getByTestId("mobile-option")).toBeInTheDocument();
    });

    // Click on the "Mobile View" option
    fireEvent.click(screen.getByTestId("mobile-option"));

    // Verify that the mobile image is displayed
    expect(screen.getByAltText("Salah Timing Widgets")).toHaveAttribute(
      "src",
      expect.stringContaining("Salah-m.webp")
    );

    // Switch back to desktop view
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByTestId("desktop-option"));

    // Verify that the desktop image is displayed
    expect(screen.getByAltText("Salah Timing Widgets")).toHaveAttribute(
      "src",
      expect.stringContaining("sa-d-2.webp")
    );
  });

  it("calls authenticateWidget when no token is in localStorage", async () => {
    renderComponent("Event Widgets");

    // Add a log statement to confirm the test execution flow
    console.log("Rendered component");

    // Wait for the authenticateWidget function to be called
    await waitFor(() => {
      console.log("Waiting for mockAuthenticateWidget to be called");
      expect(mockAuthenticateWidget).toHaveBeenCalled();
    });

    // Verify that it was called with the correct arguments
    expect(mockAuthenticateWidget).toHaveBeenCalledWith("12345", "events");
  });

  it("copies iframe code to clipboard", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Copy Link"));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
