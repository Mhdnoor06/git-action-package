import React, { createContext, FC } from "react";
import { Provider } from "react-redux";
import Store from "./v1/redux/store";

export const MyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default MyProvider;
