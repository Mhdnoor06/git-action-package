import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";
import BackButton from "../../Shared/BackButton";
import { handleBack } from "../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../MyProvider";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",

    borderBottom: "1px solid #ddd",
  },
  title: {
    color: "#3D5347",
    fontSize: "21px",
    fontWeight: "bold",
  },
}));

interface PageHeaderProps {
  pageTitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle }) => {
  const classes = useStyles();
  const navigation = useNavigationprop();
  return (
    <Box className={classes.header}>
      <BackButton handleBackBtn={navigation ? navigation : handleBack} />
      <h2 style={{ color: "#3D5347", fontSize: "21px" }}>{pageTitle}</h2>
      <p></p>
      <Box />
    </Box>
  );
};

export default PageHeader;
