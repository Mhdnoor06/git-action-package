import React, { useCallback, useEffect, useState } from "react";
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
import CommonFields from "../CommonFileds/CommonFields";
import DateTimeSelector from "../DateTimeSelectionField/DateTimeSelector";
import { Cancel } from "@mui/icons-material";
import FinancialServiceFields from "../View/ServiceFields/FinancialServiceFields";
import toast from "react-hot-toast";
import {
  parseTime,
  TimeAvailability,
} from "../../../../helpers/HelperFunction";
import ServiceTimingSelector from "../../Shared/ServiceTimingSelector/ServiceTimingSelector";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface NikahFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValidationErrors: any;
  stripeFields: [boolean, boolean];
  admin: any;
}

const NikahFields: React.FC<NikahFieldsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  stripeFields,
  admin,
}) => {
  // const NikahFields = ({ formData, handleChange, setValidationErrors }) => {
  const [nikahFieldTime, setNikahFieldTime] = useState(true);
  const stableHandleChange = useCallback(handleChange, [handleChange]);

  const handleTimingChange = (e: any) => {
    const value = e.target.value;
    // let customVal = value === "Custom Time" ? true : false;
    if (value === "Custom Time") {
      handleChange({
        target: {
          name: "timing",
          value: { ...formData.timing, time: value, custom: true },
        },
      });
    } else {
      handleChange({
        target: {
          name: "timing",
          value: { time: value, custom: false },
        },
      });
    }
  };
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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

  useEffect(() => {
    // Collect errors
    const errors: any = {};

    // if (!formData.timing?.time) {
    //   errors.timing = "Timing is required";
    // }

    // if (formData.timing?.custom) {
    //   if (!formData.timing?.startTime) {
    //     errors.startTime = "Start time is required";
    //   }
    //   if (!formData.timing?.endTime) {
    //     errors.endTime = "End time is required";
    //   }
    // }

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      ...errors,
    }));
  }, [formData, setValidationErrors]);

  const [selectedNikhaServices, setSelectedNikhaServices] = useState<string[]>(
    formData?.timing?.time || []
  );
  const CustomChip = styled(Chip)(({ theme }) => ({
    backgroundColor: "#ddd", // Light gray background
    color: "#1D2B2D", // Darker text color
    borderRadius: "25px",
    "& .MuiChip-deleteIcon": {
      color: "#1D2B2D", // Darker icon color
    },
  }));
  const handleDeleteNikhaService = (serviceToDelete: string) => () => {
    const updatedItem = selectedNikhaServices.filter(
      (service) => service !== serviceToDelete
    );
    setSelectedNikhaServices(updatedItem);
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

  const handleNikhaServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    if (value && !selectedNikhaServices.includes(value)) {
      let updatednikhaServices =
        value === "After All Salah’s" ||
        selectedNikhaServices[0] === "After All Salah’s"
          ? [value]
          : [...selectedNikhaServices, value];

      let customVal = false;
      if (
        value === "Custom Time" ||
        selectedNikhaServices.includes("Custom Time")
      ) {
        updatednikhaServices = ["Custom Time"];
        customVal = true;
      }
      setSelectedNikhaServices(updatednikhaServices);

      handleChange({
        target: {
          name: "timing",
          value: {
            ...formData.timing,
            time: updatednikhaServices,
            custom: customVal,
          },
        },
      });
    }
  };

  // console.log(selectedNikhaServices);

  return (
    <>
      <CommonFields
        formData={formData}
        handleChange={handleChange}
        nikahFieldTime={nikahFieldTime}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
      <DateTimeSelector
        formData={formData}
        handleChange={handleChange}
        showTiming={false}
        setValidationErrors={setValidationErrors}
      />
      <ServiceTimingSelector
        selectedServices={selectedNikhaServices}
        handleDeleteService={handleDeleteNikhaService}
        handleServiceChange={handleNikhaServiceChange}
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

export default NikahFields;
