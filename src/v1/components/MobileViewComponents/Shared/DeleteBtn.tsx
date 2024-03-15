import React from "react";
import { IconButton } from "@material-ui/core";
import del from "../../../photos/small-del.png";
const DeleteBtn = ({
  btnHandler,
  param,
}: {
  btnHandler: (val: any) => void;
  param: string | number | undefined;
}) => {
  const btnStyle = {
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add shadow style
    borderRadius: "50%",
    backgroundColor: "white",
    fontSize: "10px",
    width: "30px",
    marginLeft: "10px",
    height: "30px",
  };
  return (
    <IconButton
      onClick={() => btnHandler(param)}
      style={btnStyle}
      aria-label="delete"
    >
      {" "}
      <img src={del} alt="Prayer icon" />
      {/* <ArrowBackIosIcon /> */}
    </IconButton>
  );
};

export default DeleteBtn;
