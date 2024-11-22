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
import { Cancel, AddCircleOutline, AddCircle } from "@mui/icons-material";
import CommonFields from "../CommonFileds/CommonFields";
import DateTimeSelector from "../DateTimeSelectionField/DateTimeSelector";
import ServiceTimingSelector from "../../Shared/ServiceTimingSelector/ServiceTimingSelector";
import {
  parseTime,
  TimeAvailability,
} from "../../../../helpers/HelperFunction";
import toast from "react-hot-toast";

interface MedicalClinicFieldsProps {
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

const healthServices = [
  "Primary Care",
  "Internal Medicine",
  "Women’s Health",
  "Pediatrics",
  "Lab Service Referral",
];

const MedicalClinicFields: React.FC<MedicalClinicFieldsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  stripeFields,
  admin,
}) => {
  const [residentPhysician, setResidentPhysician] = useState("");
  const [residentPhysicians, setResidentPhysicians] = useState<string[]>(
    formData.residentPhysicians || []
  );
  const [visitingPhysician, setVisitingPhysician] = useState("");
  const [visitingPhysicians, setVisitingPhysicians] = useState<string[]>(
    formData.visitingPhysicians || []
  );
  const [selectedHealthServices, setSelectedHealthServices] = useState<
    string[]
  >(formData.healthServices || []);
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
    if (!formData.residentPhysicians) {
      handleChange({
        target: {
          name: "residentPhysicians",
          value: [],
        },
      });
    }
    if (!formData.healthServices) {
      handleChange({
        target: {
          name: "healthServices",
          value: [],
        },
      });
    }
    if (!formData.visitingPhysicians) {
      handleChange({
        target: {
          name: "visitingPhysicians",
          value: "",
        },
      });
    }
  }, [
    formData.residentPhysicians,
    formData.healthServices,
    formData.visitingPhysicians,
  ]);

  const handleAddPhysician = () => {
    if (residentPhysician.trim() !== "") {
      const updatedPhysicians = [
        ...residentPhysicians,
        residentPhysician.trim(),
      ];
      setResidentPhysicians(updatedPhysicians);
      handleChange({
        target: {
          name: "residentPhysicians",
          value: updatedPhysicians,
        },
      });
      setResidentPhysician("");
    }
  };
  const handleAddVisitingPhysician = () => {
    if (visitingPhysician.trim() !== "") {
      const updatedVisitingPhysicians = [
        ...visitingPhysicians,
        visitingPhysician.trim(),
      ];
      setVisitingPhysicians(updatedVisitingPhysicians);
      handleChange({
        target: {
          name: "visitingPhysicians",
          value: updatedVisitingPhysicians,
        },
      });
      setVisitingPhysician("");
    }
  };
  const handleDeleteVisitingPhysician = (physicianToDelete: string) => () => {
    const updatedVisitingPhysicians = visitingPhysicians.filter(
      (physician) => physician !== physicianToDelete
    );
    setVisitingPhysicians(updatedVisitingPhysicians);
    handleChange({
      target: {
        name: "visitingPhysicians",
        value: updatedVisitingPhysicians,
      },
    });
  };
  useEffect(() => {
    if (!formData.residentPhysicians) {
      handleChange({
        target: {
          name: "residentPhysicians",
          value: [],
        },
      });
    }
    if (!formData.healthServices) {
      handleChange({
        target: {
          name: "healthServices",
          value: [],
        },
      });
    }
    if (!formData.visitingPhysicians) {
      handleChange({
        target: {
          name: "visitingPhysicians",
          value: [],
        },
      });
    }
  }, [
    formData.residentPhysicians,
    formData.healthServices,
    formData.visitingPhysicians,
  ]);

  const handleDeletePhysician = (physicianToDelete: string) => () => {
    const updatedPhysicians = residentPhysicians.filter(
      (physician) => physician !== physicianToDelete
    );
    setResidentPhysicians(updatedPhysicians);
    handleChange({
      target: {
        name: "residentPhysicians",
        value: updatedPhysicians,
      },
    });
  };

  const handleHealthServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    if (value && !selectedHealthServices.includes(value)) {
      const updatedHealthServices = [...selectedHealthServices, value];
      setSelectedHealthServices(updatedHealthServices);
      handleChange({
        target: {
          name: "healthServices",
          value: updatedHealthServices,
        },
      });
    }
  };

  const handleDeleteHealthService = (serviceToDelete: string) => () => {
    const updatedHealthServices = selectedHealthServices.filter(
      (service) => service !== serviceToDelete
    );
    setSelectedHealthServices(updatedHealthServices);
    handleChange({
      target: {
        name: "healthServices",
        value: updatedHealthServices,
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
            variant="body1"
            sx={{ color: "#878787", marginBottom: "8px", fontSize: "14px" }}
          >
            Health Service In Medical Clinic
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} my={1}>
            {selectedHealthServices?.map((service) => (
              <CustomChip
                key={service}
                label={service}
                onDelete={handleDeleteHealthService(service)}
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
          <Select
            labelId="health-service-label"
            id="healthService"
            name="healthService"
            value=""
            onChange={handleHealthServiceChange}
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
                color: "#878787",
                fontSize: "14px",
              },
            }}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Health Service</em>
            </MenuItem>
            {healthServices.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-group">
        <Typography
          variant="body1"
          sx={{ color: "#878787", marginBottom: "8px", fontSize: "14px" }}
        >
          Resident Physicians
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
          {residentPhysicians.map((physician) => (
            <CustomChip
              key={physician}
              label={physician}
              onDelete={handleDeletePhysician(physician)}
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
            id="visitingPhysicians"
            name="visitingPhysicians"
            value={residentPhysician}
            onChange={(e) => setResidentPhysician(e.target.value)}
            placeholder="Add Resident Physician"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: "25px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            // color="red"
            className="custom-qsn-add-btn"
            onClick={handleAddPhysician}
            // sx={{
            //   position: "absolute",
            //   right: "10px",
            //   top: "50%",
            //   transform: "translateY(-50%)",
            //   padding: 0,
            //   width: "30px",
            //   color: "#1D785A",
            //   height: "30px",
            // }}
          >
            <AddCircle
              // style={{ width: "100%", height: "100%" }}
              sx={{
                width: 20,
                height: 15,
              }}
            />
          </IconButton>
        </Box>
      </div>
      <div className="form-group">
        <Typography
          variant="body1"
          sx={{ color: "#878787", marginBottom: "8px", fontSize: "14px" }}
        >
          Visiting Physicians (Optional)
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
          {visitingPhysicians.map((physician) => (
            <CustomChip
              key={physician}
              label={physician}
              onDelete={handleDeleteVisitingPhysician(physician)}
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
            value={visitingPhysician}
            onChange={(e) => setVisitingPhysician(e.target.value)}
            placeholder="Add Visiting Physician"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: "25px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            onClick={handleAddVisitingPhysician}
            className="custom-qsn-add-btn"
            // sx={{
            //   position: "absolute",
            //   right: "10px",
            //   top: "50%",
            //   transform: "translateY(-50%)",
            //   padding: 0,
            //   width: "30px",
            //   color: "#1D785A",
            //   height: "30px",
            // }}
          >
            <AddCircle
              // style={{ width: "100%", height: "100%" }}
              sx={{
                width: 20,
                height: 15,
              }}
            />
          </IconButton>
        </Box>
      </div>
      {/* <div className="form-group">
        <label htmlFor="visitingPhysicians">
          Visiting Physicians (Optional)
        </label>
        <input
          type="text"
          id="visitingPhysicians"
          name="visitingPhysicians"
          value={formData.visitingPhysicians || ""}
          onChange={handleChange}
          placeholder="e.g Dr. Ahmed"
        />
      </div> */}
      <DateTimeSelector
        formData={formData}
        showTiming={false}
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
    </>
  );
};

export default MedicalClinicFields;
