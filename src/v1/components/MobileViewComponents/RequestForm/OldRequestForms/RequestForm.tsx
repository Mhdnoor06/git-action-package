import React, { useEffect, useState } from "react";
import CustomBtn from "../../Shared/CustomBtn";
import { Autocomplete, Card, TextField } from "@mui/material";
import "./requestForm.css";
import { MdCancel, MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getAdminMasjid } from "../../../../redux/actions/MasjidActions/FetchingMasjidByAdminAction";

const RequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prayerName, setPrayerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const masjids = [
    { masjidName: "Masjid Bilal - ISGH" },
    { masjidName: "ISGH Bear Creek Islamic Center (BCIC) | Masjid Al-Mustafa" },
  ];
  let admin = useAppSelector((state) => state.admin);

  const handleAddPrayer = () => {};
  const handleChange = (newValue: any) => {};
  const setAdminMasjid = (newValue: any) => {};
  const handleUpdationAdmin = () => {};
  const setEditingAdminMasjid = (newValue: any) => {};
  const dispatch = useAppDispatch();
  //   dispatch(getAdminMasjid(admin._id)).then((res) => {
  //     console.log(res);
  //   });

  return (
    <div className="request-form-main">
      <div style={{ padding: " 5px", width: "100%" }}>
        <Card className="request-form-card">
          <div className="event-container">
            <form>
              <label>First Name:</label>
              <input
                type="text"
                value={prayerName}
                onChange={(e) => setPrayerName(e.target.value)}
                required
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={prayerName}
                onChange={(e) => setPrayerName(e.target.value)}
                required
              />

              <div
                style={{
                  width: "70%",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Autocomplete
                  id="masjid-select"
                  options={masjids || []}
                  fullWidth
                  onChange={(event, newValue) => {
                    handleChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Masjid Name"
                      variant="outlined"
                    />
                  )}
                  getOptionLabel={(option) => option.masjidName}
                  renderOption={(props, option) => (
                    <li {...props}>{option.masjidName}</li>
                  )}
                />

                {/* <MdCheck
                  style={{
                    marginLeft: "10px",
                    cursor: "Pointer",
                    fontSize: "200%",
                  }}
                  onClick={(e) => {
                    setAdminMasjid("NewmasjidName");
                    handleUpdationAdmin();
                  }}
                />
                <MdCancel
                  style={{
                    marginLeft: "10px",
                    cursor: "Pointer",
                    fontSize: "200%",
                  }}
                  onClick={(e) => {
                    setEditingAdminMasjid(false);
                  }}
                /> */}
              </div>

              <div className="btn-container">
                <CustomBtn
                  eventHandler={handleAddPrayer}
                  label={"Send Request"}
                  showIcon={false}
                  isDisabled={isLoading}
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RequestForm;
