import React, { useState, useEffect } from "react";
import {
  Chip,
  MenuItem,
  FormControl,
  Select,
  Box,
  IconButton,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/system";
import { Cancel, AddCircleOutline } from "@mui/icons-material";
import CommonFields from "../CommonFileds/CommonFields";
import DateTimeSelector from "../DateTimeSelectionField/DateTimeSelector";
import "../services.css";
import ScreeningQuestions from "./ScreeningQuestions";
import ServiceTimingSelector from "../../Shared/ServiceTimingSelector/ServiceTimingSelector";
import {
  parseTime,
  TimeAvailability,
} from "../../../../helpers/HelperFunction";
import toast from "react-hot-toast";
interface ConsultationFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValidationErrors: (errors: { [key: string]: string }) => void;
  stripeFields: [boolean, boolean];
  admin: any;
}

const consultationTypes = ["On Site", "On Call", "On Site/Call (Both)"];
const sessionTimes = ["30 min/session", "45 min/session", "01 hr/session"];

const ConsultationFields: React.FC<ConsultationFieldsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  stripeFields,
  admin,
}) => {
  const [consultant, setConsultant] = useState("");
  const [consultants, setConsultants] = useState<string[]>(
    formData.consultants || []
  );
  const [selectedServices, setSelectedServices] = useState<string[]>(
    formData?.timing?.time || []
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    if (value && !selectedServices.includes(value)) {
      // let updatedServices = [...selectedServices, value];

      let updatedServices =
        value === "After All Salah’s" ||
        selectedServices[0] === "After All Salah’s"
          ? [value]
          : [...selectedServices, value];
      let customVal = false;
      if (value === "Custom Time" || selectedServices.includes("Custom Time")) {
        updatedServices = ["Custom Time"];
        customVal = true;
      }
      setSelectedServices(updatedServices);

      handleChange({
        target: {
          name: "timing",
          value: {
            ...formData.timing,
            time: updatedServices,
            custom: customVal,
          },
        },
      });
    }
  };
  const handleDeleteService = (serviceToDelete: string) => () => {
    const updatedItem = selectedServices.filter(
      (service) => service !== serviceToDelete
    );
    setSelectedServices(updatedItem);
    const payload =
      updatedItem.length === 0
        ? {}
        : {
            ...formData.timing,
            time: updatedItem,
          };
    handleChange({
      target: {
        name: "timing",
        value: payload,
      },
    });
  };

  const handleTimeChange = (e: any, isStartTime: boolean) => {
    const { name, value } = e.target;

    if (isStartTime) setStartTime(value);
    else {
      setEndTime(value);
      if (!startTime) {
        toast.error("Please enter the Start time first.");
        return;
      }
      const strTime = parseTime(startTime);
      const eTime = parseTime(endTime);
      if (strTime > eTime) {
        const errorMsg = "Start time cannot be greater than end time";
        toast.error(errorMsg);
        return true;
      }
      if (!value) {
        toast.error("Your time is not valid");
        return true;
      }
      const mergedTime = TimeAvailability(startTime, value);
      let time = [mergedTime];
      if (formData?.timing?.customStartEndTime) {
        time = [mergedTime, ...formData?.timing?.customStartEndTime];
      }

      handleChange({
        target: {
          name: "timing",
          value: {
            ...formData.timing,
            customStartEndTime: time,
          },
        },
      });
      setStartTime("");
      setEndTime("");
    }
  };

  const handleDeleteTimings = (serviceToDelete: string) => () => {
    const updatedItem = formData?.timing?.customStartEndTime.filter(
      (service) => service !== serviceToDelete
    );

    const payload = {
      ...formData.timing,
      customStartEndTime: updatedItem,
    };
    handleChange({
      target: {
        name: "timing",
        value: payload,
      },
    });
  };
  useEffect(() => {
    let shouldUpdate = false;
    const updatedFormData = { ...formData };

    if (!formData.consultants) {
      updatedFormData.consultants = [];
      shouldUpdate = true;
    }
    if (!formData.consultationType) {
      updatedFormData.consultationType = "";
      shouldUpdate = true;
    }
    if (!formData.sessionTime) {
      updatedFormData.sessionTime = "";
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      handleChange({
        target: {
          name: "formData",
          value: updatedFormData,
        },
      });
    }
  }, []);

  const handleAddConsultant = () => {
    if (consultant.trim() !== "") {
      const updatedConsultants = [...consultants, consultant.trim()];
      setConsultants(updatedConsultants);
      handleChange({
        target: {
          name: "consultants",
          value: updatedConsultants,
        },
      });
      setConsultant("");
    }
  };

  const handleDeleteConsultant = (consultantToDelete: string) => () => {
    const updatedConsultants = consultants.filter(
      (consultant) => consultant !== consultantToDelete
    );
    setConsultants(updatedConsultants);
    handleChange({
      target: {
        name: "consultants",
        value: updatedConsultants,
      },
    });
  };

  const CustomChip = styled(Chip)(({ theme }) => ({
    backgroundColor: "#ddd", // Light gray background
    color: "#1D2B2D", // Darker text color
    borderRadius: "25px",
    "& .MuiChip-deleteIcon": {
      color: "#1D2B2D", // Darker icon color
    },
  }));

  return (
    <>
      <CommonFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
      <div className="form-group">
        <Typography
          sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
        >
          Available Practitioner’s
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
          {consultants.map((consultant) => (
            <CustomChip
              key={consultant}
              label={consultant}
              onDelete={handleDeleteConsultant(consultant)}
              deleteIcon={
                <Cancel
                  sx={{
                    width: 20,
                    height: 15,
                  }}
                />
              }
            />
          ))}
        </Box>
        <Box
          sx={{ position: "relative", display: "inline-block", width: "100%" }}
        >
          <input
            type="text"
            id="consultant"
            name="consultant"
            value={consultant}
            onChange={(e) => setConsultant(e.target.value)}
            placeholder="Add Consultant"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px", // Adjust padding for space for the button
              borderRadius: "25px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            color="primary"
            className="custom-qsn-add-btn"
            onClick={handleAddConsultant}
          >
            <AddCircleOutline style={{ width: "100%", height: "100%" }} />
          </IconButton>
        </Box>
      </div>
      <ScreeningQuestions
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
      />
      <DateTimeSelector
        showTiming={false}
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
      />
      <ServiceTimingSelector
        selectedServices={selectedServices}
        handleDeleteService={handleDeleteService}
        handleServiceChange={handleServiceChange}
        formData={formData}
        handleDeleteTimings={handleDeleteTimings}
        startTime={startTime}
        endTime={endTime}
        handleTimeChange={handleTimeChange}
        setEndTime={setEndTime}
      />
      <div className="form-group">
        <FormControl
          fullWidth
          sx={{
            width: "100%",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cfcfcf",
                borderRadius: "20px",
              },
            },
          }}
        >
          <Typography
            sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
          >
            Consultation Type <span style={{ color: "red" }}>* </span>
          </Typography>
          <Select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType || ""}
            onChange={handleChange}
            input={<OutlinedInput />}
            sx={{
              width: "100%",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2e2e2e",
                  borderRadius: "20px",
                },
              },
              "& .MuiSelect-select": {
                padding: "8px 14px",
                fontSize: "14px",
              },
            }}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Consultation Type</em>
            </MenuItem>
            {consultationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-group">
        <FormControl
          fullWidth
          sx={{
            width: "100%",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cfcfcf",
                borderRadius: "20px",
              },
            },
          }}
        >
          <Typography
            sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
          >
            Time per session <span style={{ color: "red" }}>* </span>
          </Typography>
          <Select
            id="sessionTime"
            name="sessionTime"
            value={formData.sessionTime || ""}
            onChange={handleChange}
            input={<OutlinedInput />}
            sx={{
              width: "100%",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2e2e2e",
                  borderRadius: "20px",
                },
              },
              "& .MuiSelect-select": {
                padding: "8px 14px",
                fontSize: "14px",
              },
            }}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Time per session</em>
            </MenuItem>
            {sessionTimes.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default ConsultationFields;
