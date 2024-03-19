import React from "react";
import { Provider } from "react-redux";
import Store from "./v1/redux/store";

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default MyProvider;
