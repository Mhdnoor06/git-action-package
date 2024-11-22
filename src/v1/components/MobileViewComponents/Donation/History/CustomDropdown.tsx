import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import calendartoday from "../../../../photos/Newuiphotos/Donations/calendartoday.webp";

const CustomDropdown = ({ isMobile, period, handleChange }: any) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <FormControl
      variant="outlined"
      style={{ minWidth: isMobile ? "110px" : "135px" }}
    >
      <Select
        labelId="time-period-select-label"
        value={period}
        onChange={handleChange}
        onOpen={() => {
          setFilterOpen(true);
        }}
        onClose={() => {
          setFilterOpen(false);
        }}
        displayEmpty
        IconComponent={filterOpen ? ArrowDropUpIcon : ArrowDropDownIcon}
        renderValue={() => (
          <>
            <img
              src={calendartoday}
              style={{ width: isMobile ? "10px" : "15px" }}
            />
            {period}
          </>
        )}
        inputProps={{
          sx: {
            fontSize: isMobile ? "9px" : "12px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: isMobile ? "5px" : "10px",
          },
        }}
        style={{
          padding: "0px",
          borderRadius: "20px",
          background: "#EEEEEE",
        }}
      >
        <MenuItem
          sx={{
            minHeight: isMobile ? "30px" : "48px",
            fontSize: isMobile ? "9px" : "14px",
          }}
          value="Past 30 Days"
        >
          Past 30 Days
        </MenuItem>
        <MenuItem
          sx={{
            minHeight: isMobile ? "30px" : "48px",
            fontSize: isMobile ? "9px" : "14px",
          }}
          value="This Week"
        >
          This Week
        </MenuItem>
        <MenuItem
          sx={{
            minHeight: isMobile ? "30px" : "48px",
            fontSize: isMobile ? "9px" : "14px",
          }}
          value="Today"
        >
          Today
        </MenuItem>
        <MenuItem
          sx={{
            minHeight: isMobile ? "30px" : "48px",
            fontSize: isMobile ? "9px" : "14px",
          }}
          value="This Year"
        >
          This Year
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
