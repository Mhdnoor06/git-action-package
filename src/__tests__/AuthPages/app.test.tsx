import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { ThemeProvider } from "@emotion/react";
import Theme from "../../v1/components/Theme/Theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import App from "../../App";
import { vi } from "vitest";

// Mocking localStorage
const mockLocalStorage = () => {
  const storage: { [key: string]: string } = {
    // admin:
    //   '{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel","email":"akeelabbas29@gmail.com","role":"musaliadmin","autoPrefillingTiming":false,"isVerified":true,"masjids":["64df7804c2d7bcd9f0dac1e7"],"isFreezed":false,"isRequestedForDelete":false}'
    // authTokens:
    //   '{"accessToken":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjEzOTE3NTAsImV4cCI6MTcyMTY1MDk1MH0.cT3JfVjCQnu1Qla4Ltc_nte2KY-t7gr0dBB3oHQH4NyZ8CikLzK6L19YhEZ83iDsekcjBRb2f1-r1aYiCS_jWnCjqRJWhzF_GwrvbVNpq1BtsipI5ycYzk6Dei4BzsHz7Fd1D4yg2EmF6_AuS6Vw2-IQVMVfGeojJvBpG2dQ12g2Q06oUe-8GcXY0JV6-qZ1fl95xcXvJZN3LDb9FHrXhDD8HKh4HqKphw7XRbqMPWAjH92_x16Khw0tCy0cUuFgx-er799MadAD4KWXXEnMirXpIpnGyKPrPpnIZ02o3rgfDLC4HYcgODY2HV8vWOTyOZA5iCvWTyZaa8uDkPQ1yHQne3lb9F8fTmJ7EZ581E8tu8lPGxA8OaZZujvmzcIQoiceozt9V0qR0T8i5XxTPSV1Q_oLgccB_U6cmRQAZ6E82Yd_zNDeRR2p3HJWB5J7OGky6pFpWDjM5NrqSdrUsf55ztoMG0nWFltZSr8oIfMh_hNgneYsU-I0CbrRqZn0X2bX2roLExfTIlyzTNAqIwmsPuP08jAtvf-770GEhwRX7Tt03A4xsw6pEIaWzhTewf_R4ziXFHm9pb1tsgFFJne6y56rzLdWxcNOzZHa_-RiIiu4wm-h0AN8_cCOkzLwEIsJKNdGaNCU9eUzXa4bnRmE4p_mceGxht-O14tEIbg","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjEzOTE3NTAsImV4cCI6MTcyMTk5NjU1MH0.1z3S4rE4NqGilgvVYe2fsiVeEpxhr2OOYhAeaJShVgs"}'
  };

  return {
    getItem(key: string) {
      return key in storage ? storage[key] : null;
    },
    setItem(key: string, value: string) {
      storage[key] = value || "";
    },
    removeItem(key: string) {
      delete storage[key];
    },
    clear() {
      for (const key in storage) {
        delete storage[key];
      }
    }
  };
};

Object.defineProperty(window, "localStorage", { value: mockLocalStorage() });

describe("App component", () => {
    beforeEach(()=>{
        // vi.clearAllMocks()
        cleanup()
    })
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <Provider store={Store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={Theme}>{ui}</ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  };

  test("renders without crashing", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test("renders Login component for the /login route", () => {
    window.history.pushState({}, "Test page", "/login");
    renderWithProviders(<App />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test("redirects to /feed/0 if admin is verified", () => {
    localStorage.setItem("admin", JSON.stringify({ isVerified: true }));
    window.history.pushState({}, "Test page", "/login");
    renderWithProviders(<App />);
    expect(screen.queryByText(/Log In/i)).not.toBeInTheDocument();
    localStorage.removeItem("admin");
  });

  test("renders ForgotPassword component for the /forgotpassword route", () => {
    window.history.pushState({}, "Test page", "/forgotpassword");
    renderWithProviders(<App />);
    expect(screen.getByText(/Forget Password ?/i)).toBeInTheDocument();
  });

  test("renders ChangePassword component for the /changePassword route", () => {
    localStorage.setItem("admin", JSON.stringify({ isVerified: true }));
    window.history.pushState({}, "Test page", "/changePassword");
    renderWithProviders(<App />);
    expect(screen.getByText(/change password/i)).toBeInTheDocument();
    localStorage.removeItem("admin");
  });

  test("renders RequestUserForm component for the /Request_new_user route", () => {
    window.history.pushState({}, "Test page", "/Request_new_user");
    renderWithProviders(<App />);
    expect(screen.getByText(/Welcome On Board/i)).toBeInTheDocument();
  });

  test("renders DeleteAccount component for the /DeleteAccountConfirm route", () => {
    localStorage.setItem("admin", JSON.stringify({ isVerified: true }));
    window.history.pushState({}, "Test page", "/DeleteAccountConfirm");
    renderWithProviders(<App />);
    expect(screen.getByText(/Please Check Your Email/i)).toBeInTheDocument();
    localStorage.removeItem("admin");

  });
});
