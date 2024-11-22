import React, { useEffect, useState } from "react";
import "./masjidlist.css";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@mui/material";
import * as API from "../../../api-calls/index";
import { Masjid } from "../../../redux/Types";

interface Props {
  handleChange: (newValue: Masjid[] | null) => void;
  isMultiple?: boolean;
  id: string;
}

const MasjidsList: React.FC<Props> = ({
  handleChange,
  isMultiple = false,
  id,
}) => {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid[]>([]);

  // const staticMasjids = [
  //   {
  //     location: {
  //       coordinates: [-101.9107201, 35.2112367],
  //     },
  //     _id: "642c791bb291d4c6300aa533",
  //     masjidName: "Islamic Center of Amarillo (ICA)",
  //     masjidProfilePhoto:
  //       "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e14bbad1e632e44700b53/4a34efeb-0385-4c37-ba6b-60ebce70e97c.jpg",
  //     description: " ",
  //     address: "601 Quail Creek Dr, Amarillo, TX 79124, USA",
  //     contact: "+1 806 803 2315",
  //     lastEditor: {
  //       _id: "655b6ef355c1d18521c004b2",
  //       name: "Irfan Mohammad",
  //       role: "admin",
  //     },
  //     externalLinks: [
  //       {
  //         name: "Facebook",
  //         url: "https://www.facebook.com/profile.php?id=100051714906585&ref=page_internal",
  //         _id: "659d7ef9006b5675c85df3a0",
  //       },
  //       {
  //         name: "Website",
  //         url: "https://amarillomosque.org/",
  //         _id: "659d7ef9006b5675c85df3a1",
  //       },
  //     ],
  //     isAssigned: false,
  //     createdAt: "2023-04-04T19:23:07.530Z",
  //     updatedAt: "2024-04-12T17:48:54.888Z",
  //     __v: 0,
  //   },
  //   {
  //     location: {
  //       coordinates: [-101.7752795, 35.2266954],
  //     },
  //     _id: "642c791cb291d4c6300aa537",
  //     masjidName: "Burmese Muslim Community of Amarillo (BMCAMA)",
  //     masjidProfilePhoto:
  //       "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e14bfad1e632e44700b54/25516f5d-625a-4ba9-9369-6c9c94c070c6.jpg",
  //     description:
  //       "Our mission at the Burmese Muslim Community of Amarillo (BMCAMA) is to provide daily prayer sessions, Qur’an teaching, and an Islamic school for Muslim youth.",
  //     address: "1124 Aster St, Amarillo, TX 79107, USA",
  //     contact: "+1 254 855 9752",
  //     lastEditor: {
  //       _id: "65663b8789a6d6ce30e901f3",
  //       name: "Noor Mohammed Masood",
  //       role: "superadmin",
  //     },
  //     externalLinks: [
  //       {
  //         name: "Website",
  //         url: "https://bmcama.org/",
  //         _id: "656793fd89a6d6ce30ebb21c",
  //       },
  //     ],
  //     isAssigned: false,
  //     createdAt: "2023-04-04T19:23:08.256Z",
  //     updatedAt: "2023-11-29T19:41:49.018Z",
  //     __v: 0,
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.fetchAllMasjids();
        setMasjids(response?.data?.data);
        if (response?.data?.data?.length > 0) {
          const defaultMasjid = response?.data?.data?.find(
            (masjid: Masjid) => masjid._id === id
          );
          setSelectedMasjid([defaultMasjid]);
          handleChange([defaultMasjid]);
        }
      } catch (error) {
        console.error("Failed to fetch masjids", error);
      }
    };

    if (!masjids.length) {
      fetchData();
    }
  }, [masjids]);

  return (
    <div className="event-masjids-list" data-testid="masjidslistcontainer">
      <Autocomplete
        multiple={isMultiple}
        options={masjids}
        fullWidth
        value={selectedMasjid}
        onChange={(event, newValue) => {
          setSelectedMasjid(newValue as Masjid[]);
          handleChange(newValue as Masjid[]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Masjids"
            variant="standard"
            style={{ marginBottom: "10px" }}
          />
        )}
        getOptionLabel={(option) => option.masjidName}
        renderOption={(props, option) => (
          <li {...props}>{option.masjidName}</li>
        )}
      />
    </div>
  );
};

export default MasjidsList;
