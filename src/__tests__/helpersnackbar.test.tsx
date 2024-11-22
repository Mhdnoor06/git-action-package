import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../v1/redux/hooks";
import CustomSnackbar from "../v1/components/HelperComponents/SnackbarCompoenent/CustomSnackbar";
import { vi } from "vitest";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Theme from "../v1/components/Theme/Theme";
import Store from "../v1/redux/store";
import DateFnsUtils from "@date-io/date-fns";
import { ChangeSnackbar } from "../v1/redux/actions/SnackbarActions/ChangeSnackbarAction";

// Mock the ChangeSnackbar action
vi.mock("../v1/redux/actions/SnackbarActions/ChangeSnackbarAction", () => ({
  ChangeSnackbar: vi.fn(() => ({ type: "CHANGE_SNACKBAR" }))
}));

// Mock hooks
vi.mock("../v1/redux/hooks", () => {
  return {
    useAppDispatch: () => vi.fn(),
    useAppSelector: vi.fn((selector) =>
      selector({
        snackBarState: {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Test Message"
        }
      })
    )
  };
});

describe("CustomSnackbar", () => {
  beforeEach(() => {});

  const renderWithProviders = (ui: any) => {
    return render(
      <Provider store={Store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={Theme}>
            <BrowserRouter>{ui}</BrowserRouter>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  };

  it("should render the snackbar with the correct message", () => {
    renderWithProviders(<CustomSnackbar />);
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should call handleClose when the snackbar is closed", () => {
    renderWithProviders(<CustomSnackbar />);
    const close = screen.getByTestId("CloseIcon");
    expect(close).toBeInTheDocument();
    fireEvent.click(close);
    expect(ChangeSnackbar).toHaveBeenCalled();
  });
});
