import { useState, useEffect } from "react";
import {
  customNavigatorTo,
  LocationBasedToday,
  timeZoneGetter,
  UtcDateConverter,
} from "../../../../helpers/HelperFunction";
import BackButton from "../../Shared/BackButton";
import noProgram from "../../../../photos/Newuiphotos/program/noProgram.webp";
import addProgramIcon from "../../../../photos/Newuiphotos/program/program-add.webp";
import "./Programs.css";
import { useQuery } from "@apollo/client";
import tz_lookup from "tz-lookup";
import { Get_PROGRAMS_BY_RANGE } from "../../../../graphql-api-calls/query";
import { Box, Skeleton, styled } from "@mui/material";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import moment from "moment-timezone";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import ProgramCard from "./ProgramCard/ProgramCard";
import ProgramForm from "./ProgramForm/ProgramForm";
import { useNavigationprop } from "../../../../../MyProvider";
import CustomCalender from "../../Shared/calendar/CustomCalender";
const Programs = ({ consumerMasjidId }: { consumerMasjidId: string }) => {
  const navigation = useNavigationprop();
  const initialDate = new Date();
  const [allPrograms, setAllProgram] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [tZone, setTZone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [masjidName, setMasjidName] = useState("");
  let AdminMasjidStateInfo = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  const [selectedPrograms, setSelectedPrograms] = useState<any[]>([]);
  const startDate = moment()
    .startOf("month")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const endDate = moment().endOf("year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  // const endDate = moment().add(1, "year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const rangeVariables = {
    masjidId: consumerMasjidId,
    startDate,
    endDate,
  };
  const {
    loading,
    error,
    data: progRangData,
  } = useQuery(Get_PROGRAMS_BY_RANGE, {
    variables: rangeVariables,
  });

  useEffect(() => {
    if (!AdminMasjidStateInfo.masjidName) {
      dispatch(fetchMasjidById(consumerMasjidId)).then((result) => {
        const lat = result.location?.coordinates[1];
        const lon = result.location?.coordinates[0];
        if (lat && lon) {
          setTZone(tz_lookup(lat, lon));
          setMasjidName(result.masjidName);
        }
      });
    } else if (AdminMasjidStateInfo.masjidName) {
      setTZone(timeZoneGetter(AdminMasjidStateInfo));
      setMasjidName(AdminMasjidStateInfo.masjidName);
    }
  }, [AdminMasjidStateInfo.masjidName]);

  const tileContent = ({ date }) => {
    const currentDate = moment().tz(tZone)?.toDate();
    const selectedDate = new Date(date);
    currentDate?.setDate(currentDate?.getDate() - 1);

    if (date) {
      const dateHasData = allPrograms.some(
        (item) =>
          item?.metaData?.startDate?.split("T")[0] ===
          moment(date).format("YYYY-MM-DD")
      );
      if (dateHasData && selectedDate >= currentDate) {
        return <div className="green-dot" />;
      }
      return null;
    }
    return null;
  };

  // function isToday(date: Date) {
  //   const today = LocationBasedToday(tZone);
  //   return (
  //     date.getDate() === today.getDate() &&
  //     date.getMonth() === today.getMonth() &&
  //     date.getFullYear() === today.getFullYear()
  //   );
  // }
  const handleSingleDateClick = (date: Date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    const matchedPrograms: any = [];

    // Check single events
    allPrograms?.forEach((program) => {
      if (
        program.metaData.startDate.split("T")[0] ===
        UtcDateConverter(formattedDate, tZone).split("T")[0]
      ) {
        matchedPrograms.push(program);
      }
    });

    // Check recurring
    // Object.values(allPrograms?.recursive || {}).forEach(
    //   (recurrenceGroup) => {
    //     recurrenceGroup.forEach((event) => {
    //       if (
    //         event.date.split("T")[0] ===
    //         UtcDateConverter(formattedDate, tZone).split("T")[0]
    //       ) {
    //         matchedEvents.push(event);
    //       }
    //     });
    //   }
    // );

    setSelectedPrograms(matchedPrograms.length > 0 ? matchedPrograms : []);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate?.setHours(0, 0, 0, 0);

    // Set the provided date's time component to 00:00:00
    const providedDate = new Date(date);
    providedDate?.setHours(0, 0, 0, 0);

    // Disable if the date is before the current date (but not if it's the current date)
    return providedDate < currentDate;
  };
  // const localAdmin = adminFromLocalStg();
  // const id = localAdmin.masjids[0];
  // Define styled components for Skeleton
  const SkeletonImage = styled(Skeleton)(({ theme }) => ({
    borderRadius: "30px",
  }));

  const SkeletonCard = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "80%",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
  }));

  const handleDateSelect = (selectedDate: Date) => {
    handleSingleDateClick(selectedDate);
  };

  useEffect(() => {
    if (progRangData && progRangData.GetProgramsByRange) {
      setAllProgram(progRangData.GetProgramsByRange);
      setSelectedPrograms(progRangData.GetProgramsByRange);
    }
  }, [progRangData]); // Only update when data changes
  if (loading) {
    return (
      <div className="ProgramContainer">
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton handleBackBtn={() => {}} />
          </div>
          <h3 className="page-title">Program</h3>
        </div>

        {/* Skeleton Loader */}
        <div className="reused-table">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} data-testid="skeleton-card">
              <SkeletonImage variant="circular" width={80} height={80} />
              <Box sx={{ marginLeft: 2, flex: 1 }}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <Skeleton
                variant="rectangular"
                width={24}
                height={24}
                sx={{ borderRadius: "50%", marginLeft: 2 }}
              />
            </SkeletonCard>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  // form
  if (isFormVisible) {
    return (
      <ProgramForm
        setIsFormVisible={setIsFormVisible}
        masjidId={consumerMasjidId}
      />
    );
  }

  // table
  return (
    <div className="ProgramContainer">
      <div className="reused-table">
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton
              handleBackBtn={navigation ? navigation : customNavigatorTo}
            />
          </div>
          <h3 className="page-title">Programs</h3>
        </div>
        {tZone ? (
          <CustomCalender
            value={selectedDate}
            setValue={setSelectedDate}
            onDateSelect={handleDateSelect}
            tileContent={tileContent}
            minDate={LocationBasedToday(tZone)}
            tileDisabled={tileDisabled}
          />
        ) : null}
        <h3 className="program-sub-title">Programs</h3>
        {selectedPrograms.length > 0 ? (
          <div className="program-card-container">
            {selectedPrograms.map((Program, index) => (
              <ProgramCard
                key={index}
                program={Program}
                tZone={tZone}
                masjidName={masjidName}
                consumerMasjidId={consumerMasjidId}
              />
            ))}
          </div>
        ) : (
          <div className="no-item-found">
            <img src={noProgram} alt="no-item-found" />
            <p className="no-active-prg">No Active Programs Yet</p>
          </div>
        )}
        <div
          className="add-item-container"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <button className="AddDonation">
            <img
              src={addProgramIcon}
              alt="add-program"
              style={{ height: "27px", marginLeft: "5px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
