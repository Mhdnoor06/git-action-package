import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

import CustomSnackbar from "./v1/components/HelperComponents/SnackbarCompoenent/CustomSnackbar";
import { AdminInterFace, AuthTokens } from "./v1/redux/Types/index.js";
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
import Common_App from "./v1/components/CommonApp/Common_App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";
import { ro } from "date-fns/locale";
import { getGraphQlAPIRootDomain } from "./v1/helpers/ApiSetter/GraphQlApiSetter";

const Dashboard = lazy(() => import("./v1/pages/DashboardPage/Dashboard"));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations||""}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Auth Link to attach headers
const authLink = setContext((_, { headers }) => {
  const authTokensString = localStorage.getItem("authTokens");
  const token = authTokensString ? JSON.parse(authTokensString) : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.accessToken}` : "",
      "Content-Type": "application/json",
    },
  };
});

const root_url = getGraphQlAPIRootDomain();

// Http Link
const httpLink = new HttpLink({
  uri: root_url,
});

// Combine the authLink, httpLink, and errorLink
const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const adminString = localStorage.getItem("admin");

  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

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
      path: "/DeleteAccountConfirm",
      element: <DeleteAccount />,
      protected: true,
    },
  ];

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={Theme}>
          <CustomSnackbar />
          <Common_App routes={routes} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
