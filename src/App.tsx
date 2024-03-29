import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

import Snackbar from "./v1/components/HelperComponents/SnackbarCompoenent/Snackbar";
import { AdminInterFace } from "./v1/redux/Types/index.js";
import "./App.css";

import Login from "./v1/pages/Authpages/Login/Login";
import ForgotPassword from "./v1/pages/Authpages/ForgotPassword/ForgotPassword";
// import SetPassword from "./v1/pages/Authpages/ResetPassword/SetPassword";
import SetPassword from "./v1/pages/Authpages/ResetPassword/SetPassword/Setpassword";

import DeleteAccount from "./v1/components/MobileViewComponents/AdminProfile/DeleteAccount";
import ChangePassword from "./v1/pages/Authpages/ChangePassword/ChangePassword";
import RequestUserForm from "./v1/components/MobileViewComponents/RequestForm/RequestUserForm";

import { ThemeProvider } from "@emotion/react";
import Theme from "./v1/components/Theme/Theme";
import Common_App from "./v1/Common/Common_App";

const Dashboard = lazy(() => import("./v1/pages/DashboardPage/Dashboard"));
const Widgets = lazy(() => import("./v1/components/Widgets/Widgets"));

function App() {
  const elementHandler = (component: React.ReactNode, route: string) => {
    return admin ? (
      admin.isVerified ? (
        <Navigate to={route} />
      ) : (
        component
        // <Login />
      )
    ) : (
      component
      // <Login />
    );
  };
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  const routes = [
    {
      path: "/login",
      element: elementHandler(<Login />, "/feed/0"),
      protected: false,
    },
    {
      path: "/forgotpassword",
      element: elementHandler(<ForgotPassword />, "/feed/0"),
      protected: false,
    },
    {
      path: "/setpassword/:token",
      element: elementHandler(<SetPassword />, "/"),
      protected: false,
    },
    {
      path: "/account/initial",
      element: elementHandler(<SetPassword />, "/"),
      protected: false,
    },
    {
      path: "/",
      element: <Navigate to="/feed/0" />,
      protected: true,
    },

    {
      path: "/*",
      element: <Dashboard />,
      protected: true,
    },

    {
      path: "/changePassword",
      element: <ChangePassword />,
      protected: true,
    },

    {
      path: "/Request_new_user",
      element: <RequestUserForm />,
      protected: false,
    },
    {
      path: "/widget/:widgetType",
      element: <Widgets />,
      protected: false,
    },
    {
      path: "/DeleteAccountConfirm",
      element: <DeleteAccount />,
      protected: true,
    },
  ];

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Snackbar />
        <Common_App routes={routes} />
      </ThemeProvider>
    </>
  );
}

export default App;
