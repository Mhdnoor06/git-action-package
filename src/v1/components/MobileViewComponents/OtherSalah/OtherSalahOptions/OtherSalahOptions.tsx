import React, { useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import salahClockIcon from "../../../../photos/Newuiphotos/salahpageicons/clockIcon.svg";
import styles from "./OtherSalahOptions.module.css";
import BackButton from "../../Shared/BackButton";
import OtherSalahForm from "../OtherSalahForm/OtherSalahForm";

const salahTypes = [
  "Jummah",
  "Eid Ul-Fitr",
  "Eid Ul-Duha",
  "Taraweeh",
  "Qayam",
];

const OtherSalahOptions: React.FC<{
  addedPrayers: Set<string>;
  setShowSelectSalah: (value: boolean) => void;
  consumerMasjidId: string;
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  addedPrayers,
  setShowSelectSalah,
  consumerMasjidId,
  setRefetchTrigger,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSalah, setSelectedSalah] = useState<string | null>(null);

  console.log(addedPrayers);

  const handleClickOpen = (salah: string) => {
    setSelectedSalah(salah);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSalah(null);
  };

  const isSalahHidden = (salah: string) => {
    const variations: any = {
      Jummah: ["Jummah", "Jummah 2", "Jummah 3", "Jummah 4"],
      Taraweeh: ["Taraweeh", "Taraweeh 2", "Taraweeh 3", "Taraweeh 4"],
      Qayam: ["Qayam", "Qayam 2", "Qayam 3", "Qayam 4"],
    };

    if (variations[salah]) {
      // Check if all variations are present
      return variations[salah].every((variation: string) =>
        addedPrayers.has(variation)
      );
    }
    // For Eid prayers, just check if they are present
    return addedPrayers.has(salah);
  };

  return (
    <>
      <div className="header" style={{ padding: "20px", margin: 0 }}>
        <div className="goback" style={{ marginTop: "0" }}>
          <BackButton
            handleBackBtn={() => {
              if (selectedSalah) {
                handleClose();
              } else {
                setShowSelectSalah(false);
              }
            }}
          />
        </div>
        <h1 data-testid="header-title">Other Salah</h1>
      </div>
      {!selectedSalah ? (
        <div className={styles.container}>
          <Card className={styles.card}>
            <Typography variant="h6" className={styles.title}>
              Select Other Salah
            </Typography>
            {salahTypes
              .filter((salah) => !isSalahHidden(salah))
              .map((salah) => (
                <Button
                  key={salah}
                  variant="outlined"
                  onClick={() => handleClickOpen(salah)}
                  startIcon={
                    <img src={salahClockIcon} alt="" className={styles.icon} />
                  }
                  className={styles.button}
                >
                  {salah}
                </Button>
              ))}
          </Card>
        </div>
      ) : (
        <OtherSalahForm
          addedPrayers={addedPrayers}
          selectedSalah={selectedSalah}
          consumerMasjidId={consumerMasjidId}
          setShowSelectSalah={setShowSelectSalah}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}
    </>
  );
};

export default OtherSalahOptions;
