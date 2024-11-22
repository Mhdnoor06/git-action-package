import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import moment from "moment";
import { displayTiming } from "../../v1/helpers/HelperFunction";
import MedicalServiceFields from "../../v1/components/MobileViewComponents/Services/View/ServiceFields/MedicalServiceFields";

// Reusable render function
const renderMedicalServiceFields = (formData: any) =>
  render(
    <MedicalServiceFields
      formData={{
        ...formData,
        // metaData: { type: "daily" },
        healthServices: ["General Checkup", "Blood Test"],
      }}
    />
  );
const renderMedicalService2ndFields = (formData: any) =>
  render(
    <MedicalServiceFields
      formData={{
        ...formData,
        metaData: { type: "daily" },
        healthServices: ["General Checkup", "Blood Test"],
      }}
    />
  );

describe("MedicalServiceFields Component", () => {
    it("renders Health Service section when healthServices data is present", () => {
      const formData = { healthServices: ["General Checkup", "Blood Test"] };
      renderMedicalService2ndFields(formData);
      expect(
        screen.getByText("Health Service In Medical Clinic")
      ).toBeInTheDocument();
      formData.healthServices.forEach((service) => {
        expect(screen.getByText(service)).toBeInTheDocument();
      });
    });


    it("renders Resident Physicians section when residentPhysicians data is present", () => {
      const formData = { residentPhysicians: ["Dr. Smith", "Dr. Brown"] };
      renderMedicalService2ndFields(formData);
      expect(screen.getByText("Resident Physicians")).toBeInTheDocument();
      formData.residentPhysicians.forEach((physician) => {
        expect(screen.getByText(physician)).toBeInTheDocument();
      });
    });

    it("does not render Resident Physicians section when residentPhysicians data is absent", () => {
      const formData = { residentPhysicians: [] };
      renderMedicalService2ndFields(formData);
      expect(screen.queryByText("Resident Physicians")).not.toBeInTheDocument();
    });

    it("renders Visiting Physicians section when visitingPhysicians data is present", () => {
      const formData = { visitingPhysicians: "Dr. Taylor" };
      renderMedicalService2ndFields(formData);
      expect(screen.getByText("Visiting Physicians")).toBeInTheDocument();
      expect(screen.getByText(formData.visitingPhysicians)).toBeInTheDocument();
    });

    it("does not render Visiting Physicians section when visitingPhysicians data is absent", () => {
      const formData = { visitingPhysicians: null };
      renderMedicalService2ndFields(formData);
      expect(screen.queryByText("Visiting Physicians")).not.toBeInTheDocument();
    });

    it("renders availability time for daily metaData type", () => {
      const formData = { metaData: { type: "daily" } };
      renderMedicalService2ndFields(formData);
      expect(screen.getByText("Daily")).toBeInTheDocument();
    });

  it("renders availability time for weekly metaData type", () => {
    const formData = {
      metaData: { type: "weekly", days: ["Monday", "Wednesday"] },
    };
    renderMedicalServiceFields(formData);
    expect(screen.getByText("Weekly (Monday, Wednesday)")).toBeInTheDocument();
  });

  it("renders availability time for custom metaData type", () => {
    const days = ["2024/10/27", "2024/11/02"];
    const formData = { metaData: { type: "custom", days } };
    renderMedicalServiceFields(formData);
    days.forEach((day) => {
      expect(screen.getByText(`Every Month on 27th, 2nd`)).toBeInTheDocument();
    });
  });

    it("displays timing using displayTiming helper", () => {
      const timing = { startTime: "09:00", endTime: "17:00" };
      const formData = { timing };
      const timingText = displayTiming(timing); // Use the actual helper for accurate result
      renderMedicalService2ndFields(formData);
      expect(screen.getAllByText(timingText)[0]).toBeInTheDocument();
    });
});
