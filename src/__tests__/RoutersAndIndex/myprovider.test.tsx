import React from "react";
import { render, screen } from "@testing-library/react";
import MyProvider from "../../MyProvider";

describe("MyProvider component", () => {
  test("renders children correctly within Redux Provider", () => {
    render(
      <MyProvider>
        <div>Test Child</div>
      </MyProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
