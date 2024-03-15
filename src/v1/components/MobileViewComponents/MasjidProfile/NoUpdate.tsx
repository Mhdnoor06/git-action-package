import { Button } from "@mui/material";
import React from "react";
import { confirmation } from "../../../helpers/HelperFunction";
import toast from "react-hot-toast";
import { updateMasjid } from "../../../api-calls";
import { Masjid } from "../../../redux/Types";
import CustomBtn from "../Shared/CustomBtn";
type propsType = {
  des: string;
  id: string;
};
const NoUpdate = ({ des, id }: propsType) => {
  const handleNoUpdate = async () => {
    const isConfirmed = await confirmation("Are You Sure About No Update?");

    if (!isConfirmed) return;
    const updatedData = { description: des } as Masjid;

    const response = await updateMasjid(id, updatedData);

    if (response.status === 200) {
      toast.success("The Masjid is Successfully Updated");
    } else {
      toast.error(`Couldn't update the Masjid : ${response.data.message}`);
    }
  };
  const noUpdateStyle = {
    marginTop: "-40px",
    display: "flex",
    justifyContent: "end",
  };
  return (
    <div style={noUpdateStyle}>
      <CustomBtn
        eventHandler={handleNoUpdate}
        label={"No Update"}
        size={"4vw"}
        isLoading={false}
        showIcon={false}
      />
      {/* <Button onClick={() => handleNoUpdate()} variant="contained">
        No Update
      </Button> */}
    </div>
  );
};

export default NoUpdate;
