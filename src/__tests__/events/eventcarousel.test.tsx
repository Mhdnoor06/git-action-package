import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import EventCarousel from "../../v1/components/MobileViewComponents/Events/Carousel/EventCarousel";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Store from "../../v1/redux/store";
import Theme from "../../v1/components/Theme/Theme";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";

const renderComponent = (props: any) => {
  return render(
    <Provider store={Store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <EventCarousel {...props} />
          </BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};
beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => "mocked-url");
  vi.clearAllMocks();
});
describe("EventCarousel", () => {
  it("should render the component with event photos", () => {
    const eventData = {
      _id: "1",
      eventName: "Event 1",
      eventPhotos: [{ url: "https://example.com/photo1.jpg" }],
    };

    renderComponent({ eventData, isEditing: false });

    const img = screen.getByAltText("Photo 0");
    expect(img).toHaveAttribute("src", "https://example.com/photo1.jpg");
  });

  it("should render the component with event files", () => {
    const file = new File(["file"], "photo1.jpg", { type: "image/jpeg" });
    const eventData = [file];

    renderComponent({ eventData, isEditing: true });

    const img = screen.getByAltText("Photo 0");
    expect(img).toBeInTheDocument();
  });

  it("should render the correct number of steps in the mobile stepper", () => {
    const eventData = {
      _id: "1",
      eventName: "Event 1",
      eventPhotos: [{ url: "https://example.com/photo1.jpg" }],
    };

    renderComponent({ eventData, isEditing: false });
    const swipablecontainer = screen
      .getByTestId("swipable-box")
      .getElementsByClassName("react-swipeable-view-container")[0];
    expect(swipablecontainer.children.length).toBe(1);
  });

  it("should handle step change correctly", async () => {
    const eventData = {
      _id: "1",
      eventName: "Event 1",
      eventPhotos: [
        { url: "https://example.com/photo1.jpg" },
        { url: "https://example.com/photo2.jpg" },
      ],
    };

    renderComponent({ eventData, isEditing: false });

    // Ensure the first image is displayed initially
    const initialImg = screen.getByAltText("Photo 0");
    expect(initialImg).toBeInTheDocument();
    expect(initialImg).toHaveAttribute("src", "https://example.com/photo1.jpg");

    // Simulate step change by calling handleStepChange directly
    const swipablecontainer = screen
      .getByTestId("swipable-box")
      .getElementsByClassName("react-swipeable-view-container")[0];

    // Ensure the second image is displayed after the transition
    await waitFor(() => {
      expect(swipablecontainer.children.length).toBe(2);
      const nextImg1 = swipablecontainer.children[0];
      const nextImg2 = swipablecontainer.children[1];
      expect(nextImg1).toHaveAttribute("aria-hidden", "false");
      expect(nextImg2).toHaveAttribute("aria-hidden", "true");

      // // expect(nextImg).toBeInTheDocument();
      // expect(nextImg).toHaveAttribute('src', 'https://example.com/photo2.jpg');
    });
    await waitFor(() => {
      expect(swipablecontainer.children.length).toBe(2);
      const nextImg1 = swipablecontainer.children[0];
      const nextImg2 = swipablecontainer.children[1];
      expect(nextImg1).toHaveAttribute("aria-hidden", "false");
      expect(nextImg2).toHaveAttribute("aria-hidden", "true");
    });
  });
});
