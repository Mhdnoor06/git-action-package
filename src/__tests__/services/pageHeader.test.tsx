import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import { useNavigationprop } from "../../MyProvider";
import { handleBack } from "../../v1/helpers/HelperFunction";
import PageHeader from "../../v1/components/MobileViewComponents/Services/Main/PageHeader";

// Mocking the necessary imports
vi.mock("../../v1/components/MobileViewComponents/Shared/BackButton", () => ({
  __esModule: true,
  default: ({ handleBackBtn }: { handleBackBtn: () => void }) => (
    <button onClick={handleBackBtn}>Back Button</button>
  ),
}));

vi.mock("../../MyProvider", () => ({
  useNavigationprop: vi.fn(),
}));

describe("PageHeader", () => {
  it("renders page title correctly", () => {
    const pageTitle = "Test Page Title";

    render(<PageHeader pageTitle={pageTitle} />);

    // Check if the title is rendered
    expect(screen.getByText(pageTitle)).toBeInTheDocument();
  });


});
