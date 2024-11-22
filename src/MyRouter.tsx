import React from "react";
import { Routes } from "react-router";

export const MyRouter = ({ children }: { children: React.ReactNode }) => {
  return <Routes> {children}</Routes>;
};

export default MyRouter;
