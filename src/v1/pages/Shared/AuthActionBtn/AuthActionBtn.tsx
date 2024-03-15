import { CircularProgress } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
type propType = { isFetching: boolean; ForgotPas?: boolean };
const AuthActionBtn = ({ isFetching, ForgotPas = false }: propType) => {
  const btnStyle = {
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: " #1775ee",
    color: "white",
    fontSize: "20px",
    fontWeight: 500,
    cursor: "pointer",
  };
  return (
    <>
      <button style={btnStyle} type="submit" disabled={isFetching}>
        {isFetching ? (
          <CircularProgress size="20px" />
        ) : (
          `${ForgotPas ? "Forgot Password" : "Reset Password"}`
        )}
      </button>
      <span
        style={{
          textAlign: "center",
          textDecoration: "none",
          color: "#1775ee",
        }}
      >
        <Link to="/login"> Back to Login</Link>
      </span>
    </>
  );
};

export default AuthActionBtn;
