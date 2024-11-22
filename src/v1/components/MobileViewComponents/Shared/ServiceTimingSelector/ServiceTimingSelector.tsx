import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Typography,
  styled,
  Chip,
  Box,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

interface TimingSelectorProps {
  selectedServices: string[];
  handleDeleteService: (service: string) => () => void;
  handleServiceChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  formData: any;
  handleDeleteTimings: (service: string) => () => void;
  startTime: string;
  endTime: string;
  handleTimeChange: (e: any, isStartTime: boolean) => void;
  setEndTime: (value: string) => void;
}

const CustomChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#ddd", // Light gray background
  color: "#1D2B2D", // Darker text color
  borderRadius: "25px",
  "& .MuiChip-deleteIcon": {
    color: "#1D2B2D", // Darker icon color
  },
}));

const ServiceTimingSelector: React.FC<TimingSelectorProps> = ({
  selectedServices,
  handleDeleteService,
  handleServiceChange,
  formData,
  handleDeleteTimings,
  startTime,
  endTime,
  handleTimeChange,
  setEndTime,
}) => {
  const servicesTimings = [
    "After All Salah’s",
    "After Fajr",
    "After Dhuhr",
    "After Asr",
    "After Maghrib",
    "After Isha",
    "Custom Time",
  ];
  return (
    <>
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
            sx={{ color: "#2e2e2e", marginBottom: "2px", fontSize: "14px" }}
          >
            Select Timings <span style={{ color: "red" }}>* </span>
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} my={1}>
            {selectedServices.map((service) => (
              <CustomChip
                key={service}
                label={service}
                onDelete={handleDeleteService(service)}
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
            labelId="nikha-service-label"
            id="nikhaServiceTimings"
            name="nikhaServiceTimings"
            value=""
            onChange={handleServiceChange}
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
              <em>Select Timings</em>
            </MenuItem>
            {servicesTimings.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-group">
        {formData?.timing?.time &&
        formData?.timing?.time.includes("Custom Time") ? (
          <>
            <Box display="flex" flexWrap="wrap" gap={1} my={1}>
              {formData?.timing?.customStartEndTime?.map((service) => (
                <CustomChip
                  key={service}
                  label={service}
                  onDelete={handleDeleteTimings(service)}
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

            <div className="timeGroup">
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={startTime || ""}
                  onChange={(e) => handleTimeChange(e, true)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  name="endTime"
                  onBlur={(e) => handleTimeChange(e, false)}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ServiceTimingSelector;
