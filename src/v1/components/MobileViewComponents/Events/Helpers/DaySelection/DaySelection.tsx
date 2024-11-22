import React, { Dispatch, SetStateAction, useState } from "react";
// import {
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
//   makeStyles,
//   FormGroup,
// } from "@material-ui/core";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import checkedImg from "../../../../../photos/Newuiphotos/Services/checked.png";
import unCheckedImg from "../../../../../photos/Newuiphotos/Services/nonChecked.png";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
  checkbox: {
    borderRadius: "50%",
    padding: 0,
    "& .MuiIconButton-root": {
      borderRadius: "50%",
    },
    "& .Mui-checked": {
      "& .MuiIconButton-root": {
        backgroundColor: "#1976d2", // Change the color of the checked checkbox if needed
      },
    },
  },
  days: {
    fontSize: "13px",
  },
}));

interface DaySelectionProps {
  setDays: Dispatch<SetStateAction<string[]>>;
  currentDays: string[];
  setRecurrenceType: Dispatch<SetStateAction<string>>;
}

const DaySelection: React.FC<DaySelectionProps> = ({
  setDays,
  currentDays,
  setRecurrenceType,
}) => {
  const classes = useStyles();
  const [selectedDays, setSelectedDays] = useState<string[]>(currentDays);

  const handleDayToggle = (day: string) => {
    const selectedIndex = selectedDays.indexOf(day);
    let newSelectedDays: string[] = [];

    if (selectedIndex === -1) {
      newSelectedDays = [...selectedDays, day];
    } else if (selectedIndex === 0) {
      newSelectedDays = selectedDays.slice(1);
    } else if (selectedIndex === selectedDays.length - 1) {
      newSelectedDays = selectedDays.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelectedDays = [
        ...selectedDays.slice(0, selectedIndex),
        ...selectedDays.slice(selectedIndex + 1),
      ];
    }

    if (
      newSelectedDays.length === days.length &&
      days.every((day) => newSelectedDays.includes(day))
    ) {
      setRecurrenceType("Daily");
    }

    setSelectedDays(newSelectedDays);
    setDays(newSelectedDays);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Box>
      <FormGroup
        className={classes.checkboxContainer}
        sx={{ flexDirection: "row" }}
      >
        {days.map((day, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                icon={
                  <img
                    src={unCheckedImg}
                    alt="Checked"
                    style={{ width: "15px", height: "15px" }}
                  />
                }
                checkedIcon={
                  <img
                    src={checkedImg}
                    alt="Checked"
                    style={{ width: "15px", height: "15px" }}
                  />
                } // Customize size as needed
                className={classes.checkbox}
                checked={selectedDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                color="primary"
              />
            }
            label={
              <Typography
                className={classes.days}
                component="span"
                sx={{ fontSize: "13px" }}
              >
                {day}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default DaySelection;
