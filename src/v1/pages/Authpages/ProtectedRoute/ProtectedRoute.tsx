import React, { ReactNode } from "react";
import { AdminInterFace } from "../../../redux/Types";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  component: ReactNode;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  return admin && admin.isVerified ? (
    <>{props.component}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
