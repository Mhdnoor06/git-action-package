import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../helpers/ScrollingToTopHelper/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { AdminInterFace } from "../redux/Types";

// Define interface for route objects
interface RouteObject {
  path: string;
  element: JSX.Element;
  protected?: boolean;
}

interface CommonAppProps {
  routes: RouteObject[];
}

const Common_App: React.FC<CommonAppProps> = ({ routes }) => {
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                admin && admin.isVerified ? (
                  <>{route.element}</>
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Common_App;
