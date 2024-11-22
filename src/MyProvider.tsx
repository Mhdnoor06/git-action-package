import React, { createContext, useContext } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./v1/redux/store";
import { NavigateFunction } from "react-router";

// Create a NavigationContext to hold the navigation prop
const NavigationContext = createContext<NavigateFunction | null>(null);

// Create a custom hook to access the navigation prop in any component
export const useNavigationprop = () => {
  return useContext(NavigationContext);
};

export const MyProvider = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: NavigateFunction;
}) => {
  return (
    <ReduxProvider store={Store}>
      <NavigationContext.Provider value={navigation}>
        {children}
      </NavigationContext.Provider>
    </ReduxProvider>
  );
};

export default MyProvider;
