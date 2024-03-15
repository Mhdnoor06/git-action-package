import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
interface PlusMinusBtn {
  handleCountIncrement: () => void;
  handleCountDecrement: () => void;
  count: number;
}
const PlusMinusBtn: React.FC<PlusMinusBtn> = ({
  handleCountIncrement,
  handleCountDecrement,
  count,
}) => {
  const iconBtnStyle = { color: "white", padding: 0 };
  return (
    <Box
      className="plus-minus-container"
      height="36px"
      borderRadius="37px"
      border={`1px solid #1B8368`}
      display="flex"
      alignItems="center"
    >
      <Typography
        variant="body2"
        color="#1B8368"
        marginLeft="5px"
        marginRight="auto"
      >
        + {count} min
      </Typography>
      <Box
        width="40%"
        height="36px"
        borderRadius="0 37px 37px 0"
        bgcolor="#1B8368"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <IconButton
          size="small"
          style={iconBtnStyle}
          onClick={handleCountIncrement}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          size="small"
          style={iconBtnStyle}
          onClick={handleCountDecrement}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PlusMinusBtn;
