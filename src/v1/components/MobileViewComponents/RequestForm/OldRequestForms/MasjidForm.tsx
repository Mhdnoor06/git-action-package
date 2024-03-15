import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Stack,
  Autocomplete,
} from "@mui/material";

import CustomBtn from "../../Shared/CustomBtn";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import { authLogout } from "../../../../redux/actions/AuthActions/LogoutAction";
import "./Masjidform.css";
import { fetchUserLocationByIp } from "../../../../redux/actions/MasjidActions/fetchUserLocationByIp";
import { fetchNearByMasjids } from "../../../../redux/actions/MasjidActions/fetchNearByMasjids";
import { fetchSearchedMasjids } from "../../../../redux/actions/MasjidActions/fetchSearchedMasjids";
import emailjs from "@emailjs/browser";
import { error } from "console";

interface Masjid {
  id: number;
  name: string;
}

interface MasjidFormProps {
  formSubmitted: boolean;
  userEmail: string;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setCancelRequested: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MasjidForm: React.FC<MasjidFormProps> = ({
  formSubmitted,
  userEmail,
  setFormSubmitted,
  setCancelRequested,
  setOpen,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedMasjid, setSelectedMasjid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [masjidOptions, setMasjidOptions] = React.useState<string[]>([]);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  // const dispatch = useAppThunkDispatch();

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  // const handleSearch = async (searchText: string) => {
  //   try {
  //     if (searchText) {
  //       const masjids = await dispatch(fetchSearchedMasjids(searchText));

  //       setSearchResults(masjids);
  //       console.log(typeof selectedMasjid);
  //     } else {
  //       setSearchResults([]);
  //     }
  //   } catch (error) {
  //     console.error("Error searching masjids:", error);
  //   }
  // };

  const handleMasjidChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    setSelectedMasjid(selectedValue);
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      if (formSubmitted) {
        console.log("Request canceled!");
        setFormSubmitted(false);
        setCancelRequested(true);
        setSearchResults([]);
        setOpen(true);

        const cancelData = {
          message: `${firstName} ${lastName} has canceled the previous request to assign ${selectedMasjid} as mussali to handle`,
          name: firstName + " " + lastName,
          emailId: userEmail,
        };

        const emailResponse = await fetch("https://formspree.io/f/xayrwgyk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cancelData),
        });

        if (emailResponse.ok) {
          console.log("Cancellation email sent successfully!");
        } else {
          console.error("Failed to send cancellation email");
        }
      } else {
        const requestData = {
          message: `${firstName} ${lastName} has requested you assign ${selectedMasjid} as mussali to handle`,
          name: firstName + " " + lastName,
          emailId: userEmail,
        };

        const response = await fetch("https://formspree.io/f/xayrwgyk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log("Form submitted successfully!");
          setFormSubmitted(true);
        } else {
          console.error("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent closing the backdrop on click
  };

  // const handleLogout = () => {
  //   dispatch(authLogout());
  // };

  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       const response = await dispatch(fetchUserLocationByIp());
  //       const { latitude, longitude } = response;

  //       const requestBody = {
  //         // coordinates: [-95.4524872, 29.9573451],
  //         coordinates: [-longitude, latitude],
  //         distance: 1,
  //         distanceType: 0,
  //       };

  //       const nearbyMasjidsResponse = await dispatch(
  //         fetchNearByMasjids(requestBody)
  //       );

  //       const masjidNames = nearbyMasjidsResponse.map(
  //         (masjid: any) => masjid.masjidName
  //       );

  //       setMasjidOptions(masjidNames);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUserLocation();
  // }, []);

  return (
    <div className="form-container">
      <div>
        <CloseIcon sx={{ display: "flex", float: "right" }} />
      </div>

      {!formSubmitted ? (
        <>
          <form onSubmit={handleSubmit} className="form">
            <Grid container spacing={2} onClick={handleFieldClick}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2} sx={{ width: 300 }}>
                  <div className="autocomplete-wrapper">
                    <Autocomplete
                      id="masjid-search"
                      options={
                        searchResults.length > 0
                          ? searchResults.map((result) => result.masjidName)
                          : masjidOptions
                      }
                      onInputChange={(_, newValue) => handleSearch(newValue)}
                      onChange={(_, newValue) => {
                        // Find the corresponding masjid object from searchResults
                        const selectedMasjidObj = searchResults.find(
                          (result) => result.name === newValue
                        );

                        // Update selectedMasjid state with the selected masjid object or its name
                        setSelectedMasjid(
                          selectedMasjidObj ? selectedMasjidObj : newValue
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search for Masjid"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <div className="btn-container">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                  >
                    Send Request
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <>
          {" "}
          <h5>Form Submitted Successfully!</h5>
          <div className="form-submit-succ">
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#bf2e35",
                fontSize: "11px",
                color: "white",
              }}
              size="small"
              variant="contained"
              endIcon={<CancelIcon />}
            >
              Cancle Request
            </Button>

            <Button
              onClick={handleLogout}
              style={{
                backgroundColor: "#065f46",
                fontSize: "11px",
                color: "white",
              }}
              size="small"
              variant="contained"
              // endIcon={openRequestForm ? <CancelIcon /> : <SendIcon />}
            >
              Logout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MasjidForm;
