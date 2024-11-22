import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import BackButton from "../Shared/BackButton";
import "./OtherSalahMain.css";
import { SalahType } from "../MobileViewCalender/SalahTimings/SalahTimings";
import OtherSalahCard from "./OtherSalahCard/OtherSalahCard";
import CustomBtn from "../Shared/CustomBtn";
import btnImg from "../../../photos/clockIcon.png";
import noPrayer from "../../../photos/prayerIcon/noPrayer.svg";
import OtherSalahOptions from "./OtherSalahOptions/OtherSalahOptions";
import { useGetSpecialTimesByMasjidId } from "../../../graphql-api-calls/OtherSalah/query";
import { CircularProgress } from "@mui/material";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { useDeleteSpecialTimes } from "../../../graphql-api-calls/OtherSalah/mutation";
import { toast } from "react-hot-toast";
import MessageModel from "./helperComponent/messageModel/messageModel";
import OtherSalahForm from "./OtherSalahForm/OtherSalahForm";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";

interface OtherSalahMainProps {
  consumerMasjidId: string;
  setSelectedType: React.Dispatch<React.SetStateAction<SalahType>>;
}

const OtherSalahMain = ({
  consumerMasjidId,
  setSelectedType,
}: OtherSalahMainProps) => {
  const [showSelectSalah, setShowSelectSalah] = useState(false);
  const [tZone, setTZone] = useState("");
  const AdminMasjid = useAppSelector((state) => state.AdminMasjid);

  const {
    deleteTimes,
    isDeleting,
    error: deleteError,
  } = useDeleteSpecialTimes();
  const [otherPrayer, setOtherPrayer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [selectedSalah, setSelectedSalah] = useState<any | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppThunkDispatch();

  const handleDeleteSalah = async (selectedSalah: any) => {
    setSelectedSalah(selectedSalah);
    setShowDeleteWarning(true);
  };

  const confirmDeleteSalah = async () => {
    if (selectedSalah) {
      const result = await deleteTimes(selectedSalah._id);
      if (result) {
        console.log("Deleted successfully");
        toast.success("Deleted successfully");
        setRefetchTrigger(!refetchTrigger);
      } else {
        console.error("Failed to delete");
        toast.error("Failed to delete");
      }
      setShowDeleteWarning(false);
      setSelectedSalah(null);
    }
  };

  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(consumerMasjidId));
    response.then(function (result) {
      if (result?.masjidName) {
        setTZone(result.location.timezone);
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

  useEffect(() => {
    if (consumerMasjidId) {
      masjidAPIRequest();
    }
  }, [consumerMasjidId]);

  // Memoize start and end dates
  const { startDate, endDate } = useMemo(() => {
    if (tZone) {
      const now = moment().tz(tZone).startOf("day");
      return {
        startDate: now.toISOString(),
        endDate: now.add(1, "year").toISOString(),
      };
    }
    return {
      startDate: "",
      endDate: "",
    };
  }, [tZone]);

  // Fetch special times data only when dates are set
  const {
    loading,
    error,
    specialTimes = [],
    refetch,
  } = useGetSpecialTimesByMasjidId(
    consumerMasjidId,
    startDate && endDate ? startDate : null,
    startDate && endDate ? endDate : null
  );

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (specialTimes.length > 0) {
      setIsLoading(false);
      setOtherPrayer(specialTimes);
    }
  }, [loading, error, specialTimes]);

  useEffect(() => {
    if (startDate && endDate) {
      refetch();
    }
  }, [refetchTrigger, startDate, endDate, selectedSalah]);

  // Normalize special times data with time zone conversion
  const normalizedSpecialTimes = specialTimes.map((salah: any) => ({
    ...salah,
    timings: salah.timings
      ? salah.timings.map((timing: any) => ({
          startDate: `${moment(timing.startDate)
            .tz(tZone)
            .format("DD-MM-YYYY")}`,
          endDate: timing.endDate
            ? `${moment(timing.endDate).tz(tZone).format("DD-MM-YYYY")}`
            : timing.endDate,
          azanTime: timing.azaanTime
            ? moment.unix(timing.azaanTime).tz(tZone).format("hh:mm a")
            : "",
          iqamaTime: timing.jamaatTime
            ? moment.unix(timing.jamaatTime).tz(tZone).format("hh:mm a")
            : "",
        }))
      : [
          {
            startDate: `${moment(salah.startDate)
              .tz(tZone)
              .format("DD-MM-YYYY")}`,
            endDate: salah.endDate
              ? `${moment(salah.endDate).tz(tZone).format("DD-MM-YYYY")}`
              : salah.endDate,
            azanTime: salah.azaanTime
              ? moment.unix(salah.azaanTime).tz(tZone).format("hh:mm a")
              : "",
            iqamaTime: salah.jamaatTime
              ? moment.unix(salah.jamaatTime).tz(tZone).format("hh:mm a")
              : "",
          },
        ], // Use the fallback values if timings is null
  }));

  const addedPrayers = useMemo(() => {
    return new Set(normalizedSpecialTimes.map((salah: any) => salah.name));
  }, [normalizedSpecialTimes]);

  // Handler for showing the SelectOtherSalah component
  const handleShowSelectSalah = () => {
    setShowSelectSalah(true);
  };

  // Handler for editing a Salah
  const handleEditSalah = (salah: any) => {
    setSelectedSalah(salah);
    setShowForm(true);
  };

  return (
    <div className="other-salah-main">
      {!showSelectSalah && (
        <div className="header" style={{ padding: "20px", margin: 0 }}>
          <div className="goback" style={{ marginTop: "0" }}>
            <BackButton
              handleBackBtn={() =>
                showForm ? setShowForm(false) : setSelectedType(null)
              }
            />
          </div>
          <h1 data-testid="header-title">
            {showForm ? `Update Salah` : "Other Salah"}
          </h1>
        </div>
      )}
      {showForm ? (
        <OtherSalahForm
          selectedSalah={selectedSalah?.name || ""}
          consumerMasjidId={consumerMasjidId}
          setShowSelectSalah={setShowForm}
          setRefetchTrigger={setRefetchTrigger}
          initialTimings={selectedSalah?.timings || []}
          selectedSalahId={selectedSalah?._id}
        />
      ) : showSelectSalah ? (
        <OtherSalahOptions
          addedPrayers={addedPrayers}
          setShowSelectSalah={setShowSelectSalah}
          consumerMasjidId={consumerMasjidId}
          setRefetchTrigger={setRefetchTrigger}
        />
      ) : (
        <>
          <div className="center-block" style={{ marginBottom: "1rem" }}>
            <CustomBtn
              eventHandler={handleShowSelectSalah}
              label={"Add Other Salah"}
              icon={btnImg}
              size="4rem"
            />
          </div>
          {isLoading ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </p>
          ) : error ? (
            <p>Error loading data: {error.message}</p>
          ) : normalizedSpecialTimes.length > 0 ? (
            normalizedSpecialTimes.map((salah: any) => (
              <OtherSalahCard
                key={salah._id}
                title={salah.name}
                icon={salah.icon}
                timings={salah.timings}
                onEdit={() => handleEditSalah(salah)}
                onDelete={() => handleDeleteSalah(salah)}
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                height: "50vh",
              }}
            >
              <img src={noPrayer} alt="no prayers" />
              <p
                style={{
                  marginTop: "1rem",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                No Other Salah Found
              </p>
            </div>
          )}
        </>
      )}
      {showDeleteWarning && (
        <MessageModel
          onClose={() => setShowDeleteWarning(false)}
          onConfirm={confirmDeleteSalah}
          messageType="Delete Other Salah"
          message={`Are you sure want to delete the Entire ${selectedSalah?.name}`}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default OtherSalahMain;
