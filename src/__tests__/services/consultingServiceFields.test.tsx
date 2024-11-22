import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import moment from "moment";
import ConsultingServiceFields from "../../v1/components/MobileViewComponents/Services/View/ServiceFields/ConsultingServiceFields";

const renderComponent = (props: any) => {
  return render(<ConsultingServiceFields {...props} />);
};

describe("ConsultingServiceFields", () => {
  it("renders available practitioners correctly", () => {
    const formData = {
      consultants: ["Dr. Smith", "Dr. John"],
      metaData: { type: "daily" },
    };
    renderComponent({ formData });

    expect(screen.getByText("Available Practitioner's")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("Dr. John")).toBeInTheDocument();
  });

  it("renders screening questions for the user", () => {
    const formData = {
      metaData: { type: "daily" },
      consultationQuestions: [
        {
          question: "Are you experiencing any symptoms?",
          responseType: "Yes/No",
        },
        {
          question: "How long have you had these symptoms?",
          responseType: "Text",
        },
      ],
    };
    renderComponent({ formData });

    expect(
      screen.getByText("Screening Question For the User")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Are you experiencing any symptoms?")
    ).toBeInTheDocument();
    expect(screen.getByText("Response Type : Yes/No")).toBeInTheDocument();
    expect(
      screen.getByText("How long have you had these symptoms?")
    ).toBeInTheDocument();
    expect(screen.getByText("Response Type : Text")).toBeInTheDocument();
  });

  it("renders consulting date availability for daily type", () => {
    const formData = { metaData: { type: "daily" } };
    renderComponent({ formData });

    expect(screen.getByText("Availability Time")).toBeInTheDocument();
    expect(screen.getByText("Daily")).toBeInTheDocument();
  });

  it("renders consulting date availability for weekly type", () => {
    const formData = {
      metaData: { type: "weekly", days: ["Monday", "Wednesday"] },
    };
    renderComponent({ formData });

    expect(screen.getByText("Weekly (Monday, Wednesday)")).toBeInTheDocument();
  });

  it("renders consulting date availability for custom type", () => {
    const formData = {
      metaData: {
        type: "custom",
        days: ["2023/10/01", "2023/10/15"],
      },
    };
    renderComponent({ formData });

    expect(screen.getByText("Every Month on 1st, 15th")).toBeInTheDocument();
  });

  //   it("renders consulting time availability", () => {
  //     const formData = {
  //       metaData: { type: "daily" },
  //       timing: {
  //         startTime: "09:00",
  //         endTime: "17:00",
  //       },
  //     };
  //     renderComponent({ formData });

  //     expect(screen.getByText("09:00 AM To 05:00 PM")).toBeInTheDocument();
  //   });

  it("renders consultation sessions correctly for On Site", () => {
    const formData = {
      metaData: { type: "daily" },
      consultationType: "On Site",
      sessionTime: "30 minutes",
    };
    renderComponent({ formData });

    expect(screen.getByText("Consultation")).toBeInTheDocument();
    expect(
      screen.getByText("Consultation On Site (30 minutes)")
    ).toBeInTheDocument();
  });

  it("renders consultation sessions correctly for On Call", () => {
    const formData = {
      metaData: { type: "daily" },
      consultationType: "On Call",
      sessionTime: "45 minutes",
    };
    renderComponent({ formData });

    expect(
      screen.getByText("Consultation On Call (45 minutes)")
    ).toBeInTheDocument();
  });

  it("renders both On Site and On Call sessions if consultation type is not specified", () => {
    const formData = {
      metaData: { type: "daily" },
      consultationType: "",
      sessionTime: "1 hour",
    };
    renderComponent({ formData });

    expect(
      screen.getByText("Consultation On Site (1 hour)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Consultation On Call (1 hour)")
    ).toBeInTheDocument();
  });
});
