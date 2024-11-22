import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import checkImg from "../../../photos/checkmark.png";
import CustomBtn from "../Shared/CustomBtn";
import { PrayerMethod } from "../../../redux/Types";
import PrayerMethodConfModal from "./PrayerMethodConfModal";
import toast from "react-hot-toast";
import JuristicMethod from "./JuristicMethod";
import "./PrayerCalculationMethod.css";
import { fetchPrayerMethodsWithTime } from "../../../PrayerCalculation/Adhan";
import moment from "moment";

type SalahType = "regular" | "Asr";

interface PrayerCalculationMethodProps {
  setSelectedMethod: Dispatch<SetStateAction<Partial<PrayerMethod>>>;
  setIsMethodChanged: Dispatch<SetStateAction<boolean>>;
  isMethodChanged: boolean;
  selectedMethod: Partial<PrayerMethod>;
  setSelectedAsrMethod: Dispatch<SetStateAction<string>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  selectedAsrMethod: string;
  masjid: any;
  selectedStartDate: string;
  fajartiming: string;
  masjidId: string;
  tZone: string;
  prayerType: any;
  prayerMthd: any;
  selectedType?: SalahType;
}

const PrayerCalculationMethod: React.FC<PrayerCalculationMethodProps> = ({
  selectedMethod,
  setSelectedMethod,
  setIsMethodChanged,
  setSelectedAsrMethod,
  selectedAsrMethod,
  masjid,
  masjidId,
  selectedStartDate,
  fajartiming,
  tZone,
  isMethodChanged,
  prayerType,
  prayerMthd,
  selectedType,
  setIsSettingsOpen,
}) => {
  const defaultMethod = {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConModalOpen, setConModalOpen] = useState(false);
  const [prayerMethods, setPrayerMethods] = useState<PrayerMethod[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  const [initialSelectedMethod, setInitialSelectedMethod] = useState<any>(
    defaultMethod.id
  );
  const [initialSelectedAsrMethod, setInitialSelectedAsrMethod] =
    useState<string>(selectedAsrMethod);
  const [temporaryMethod, setTemporaryMethod] =
    useState<Partial<PrayerMethod>>(selectedMethod); // Stores details of the selected prayer method.
  const [temporaryAsrMethod, setTemporaryAsrMethod] =
    useState<string>(selectedAsrMethod); // Stores details of the selected prayer method.
  useEffect(() => {
    loadSelectedMethod();
  }, [prayerType]);
  useEffect(() => {
    if (masjid?.address) {
      try {
        const methods = fetchPrayerMethodsWithTime(
          masjid?.location.coordinates[1],
          masjid?.location.coordinates[0],
          moment(selectedStartDate).toDate(),
          tZone
        );
        setPrayerMethods(methods);
      } catch (error) {
        toast.error("Failed to fetch prayer methods");
        console.error("Error fetching prayer methods:", error);
      }
    }
  }, [masjid, selectedStartDate]);

  const savedMethodString = selectedMethod;
  const savedMethod = savedMethodString ? savedMethodString : null;

  const loadSelectedMethod = () => {
    setInitialSelectedMethod(Number(prayerMthd) ?? defaultMethod.id);
    setInitialSelectedAsrMethod(
      prayerType === "Manual" ? "Hanafi" : prayerType
    );
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
    setIsSettingsOpen(false);
    setSelectedMethod(savedMethod ?? defaultMethod);
    setSelectedAsrMethod(initialSelectedAsrMethod);
  };

  const handleSaveClick = () => {
    const validationErrors = validateSelectedMethods();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
    } else {
      setConModalOpen(true);
    }
  };

  const validateSelectedMethods = () => {
    const errors = [];
    if (!selectedMethod.name) {
      errors.push("Please select a prayer calculation method.");
    }
    // if (!selectedAsrMethod) {
    //   errors.push("Please select a juristic method.");
    // }
    return errors;
  };

  const filteredPrayerMethods = prayerMethods.filter((method) =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const isMethodChanged =
      selectedMethod?.id !== temporaryMethod?.id ||
      selectedAsrMethod !== temporaryAsrMethod;

    console.log(selectedMethod?.id, temporaryMethod?.id);
    console.log(selectedAsrMethod, temporaryAsrMethod);
    setIsSaveButtonVisible(isMethodChanged);
  }, [
    temporaryMethod,
    temporaryAsrMethod,
    selectedMethod,
    selectedAsrMethod,
    initialSelectedMethod,
    initialSelectedAsrMethod,
  ]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const juristicTxStyle = {
    fontFamily: "Inter",
    color: "#1B8368",
    fontWeight: 600,
    fontSize: "10px",
    margin: "5px 0",
  };

  const modalCenterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const CardStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    height: "520px",
    maxHeight: selectedType === "regular" ? "420px" : "300px",
    overflowY: "auto" as "auto",
    padding: "15px 15px 30px 15px",
    width: isLargeScreen ? "40%" : "85%",
    borderRadius: "16px",
    minWidth: "40%",
  };

  const CardBody = {
    padding: "0px",
    maxHeight: "290px",
    overflowY: "auto" as "auto",
  };

  const methodcontainer = {
    display: "flex",
    flexDirection: isLargeScreen ? "row" : "column",
    justifyContent: "space-around",
    width: "100%",
  };

  const methodStyle = {
    display: "flex",
    flexDirection: isLargeScreen ? "row" : "",
    gap: "20px",
    alignItems: "center",
  };

  return (
    <>
      <div
        className="juristic-main-container prayer-cal-method"
        data-testid="root"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <Card style={CardStyle} data-testid="method-cards-container">
          <Typography align="center">Prayer Calculation Methods</Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            {selectedType === "regular" ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Search by method name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ margin: "5px auto", width: "70%" }}
                />

                <CardContent style={CardBody} className="condition-text">
                  {filteredPrayerMethods.length === 0 ? (
                    <Typography align="center">No items found</Typography>
                  ) : (
                    filteredPrayerMethods.map((method) => (
                      <Card
                        data-testid="method-card"
                        key={method.id}
                        style={{
                          padding: "10px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          margin: "15px 20px",
                          borderRadius: "20px",
                          justifyContent: "space-between",
                          boxShadow: "0px 0px 25px 0px #0000000D",
                          border:
                            method.name === temporaryMethod.name
                              ? // method.name === selectedMethod.name
                                "2px solid green"
                              : "none",
                        }}
                        onClick={() => {
                          setTemporaryMethod(method);
                          // setSelectedMethod(method);
                        }}
                      >
                        <Box>
                          <Typography style={{ fontSize: "15px" }}>
                            {method.name}
                          </Typography>

                          <Box sx={{ display: "flex", gap: "5px" }}>
                            {method?.fajrTime && (
                              <Typography
                                variant="body1"
                                component="p"
                                style={{ fontSize: "10px" }}
                              >
                                Fajr: {method.fajrTime}
                              </Typography>
                            )}
                            {method?.ishaTime && (
                              <Typography
                                variant="body1"
                                component="p"
                                style={{ fontSize: "10px" }}
                              >
                                Isha: {method.ishaTime}
                              </Typography>
                            )}
                            {method?.maghribTime && (
                              <Typography
                                variant="body1"
                                component="p"
                                style={{ fontSize: "10px" }}
                              >
                                Maghrib: {method.maghribTime}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        {/* {method.name === selectedMethod.name && ( */}
                        {method.name === temporaryMethod.name && (
                          <img
                            src={checkImg}
                            alt="Check Img"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </Card>
                    ))
                  )}
                </CardContent>
              </Box>
            ) : (
              <JuristicMethod
                selectedMethod={temporaryAsrMethod}
                setSelectedMethod={setTemporaryAsrMethod}
              />
            )}
          </Box>

          <Box display="flex" justifyContent="space-around" mt={2}>
            <CustomBtn
              size={isLargeScreen ? "5vw" : "10vw"}
              eventHandler={handleCancelClick}
              label={"Cancel"}
              borderClr={"2px solid red"}
              TxColor={"red"}
              bgColor={"#ffff"}
              showIcon={false}
            />
            {/* {isSaveButtonVisible && ( */}
            <CustomBtn
              size={isLargeScreen ? "5vw" : "10vw"}
              eventHandler={handleSaveClick}
              label={"Save"}
              showIcon={false}
              isDisabled={!isSaveButtonVisible}
            />
            {/* )} */}
          </Box>
        </Card>
        {isConModalOpen && (
          <PrayerMethodConfModal
            isModalOpen={isConModalOpen}
            setModalOpen={setConModalOpen}
            setParentModalOpen={setModalOpen}
            setIsMethodChanged={setIsMethodChanged}
            method={selectedMethod}
            juristicMethod={selectedAsrMethod}
            masjidId={masjidId}
            tZone={tZone}
            setIsSettingsOpen={setIsSettingsOpen}
            selectedType={selectedType}
            temporaryMethod={temporaryMethod}
            temporaryAsrMethod={temporaryAsrMethod}
            setSelectedMethod={setSelectedMethod}
            setSelectedAsrMethod={setSelectedAsrMethod}
          />
        )}
      </div>
    </>
  );
};

export default PrayerCalculationMethod;
