import React from "react";
import { Route, Routes } from "react-router";
type MyRouterProps = {
  component: React.ReactNode;
  pathName: string;
};
export const MyRoute = ({ component, pathName }: MyRouterProps) => {
  return <Route path={pathName} element={component} />;
};

export default MyRoute;
