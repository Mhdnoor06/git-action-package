import React, { Suspense, useEffect, useState } from "react";
import ShareModal from "../../Services/Helpers/ShareButtons/ShareButtons";
import ProgramView from "../Main/ProgramForm/ProgramView";
import ProgramForm from "../Main/ProgramForm/ProgramForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { adminFromLocalStg } from "../../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import {
  convertTo24HourFormat,
  dateReverter,
  timeZoneGetter,
  useCustomParams,
  UTCTimeReverter,
} from "../../../../helpers/HelperFunction";
import PieChartComponent from "../../../../helpers/EventPieChart/PieChartComponent";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PROGRAM_BY_ID,
  RSVP_STATUS,
} from "../../../../graphql-api-calls/query";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import TicketManagementTable from "../../Shared/TicketModel/TicketCheckin/TicketManagementTable";
import moment from "moment";

const ProgramDetails = () => {
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  // const [openUserCheck, setOpenUserCheck] = useState(false);
  const [timeZone, seTimeZone] = useState("");
  const [pieData, setPieData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [masjid, setMasjid] = useState<any>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<any>();
  const queryParams = new URLSearchParams(location.search);
  const masjidIdQuery = queryParams.get("masjidId");
  let AdminMasjidStateInfo = useAppSelector((state) => state.AdminMasjid);
  let admin = useAppSelector((state) => state.admin);
  const adminData = adminFromLocalStg();
  const consumerMasjidId = masjidIdQuery
    ? masjidIdQuery
    : adminData?.masjids?.[0] || ""; // Provide a fallback value if adminData or masjids is null

  const id = useCustomParams();

  // Execute the query with the serviceId variable
  const { loading, error, data } = useQuery(GET_PROGRAM_BY_ID, {
    variables: { id: id },
  });
  const {
    loading: loadingRSVP,
    error: RSVPError,
    data: RSVPData,
  } = useQuery(RSVP_STATUS, {
    variables: { id: id, type: "program" },
  });

  useEffect(() => {
    if (RSVPData?.rsvpAnalytics) {
      setPieData([
        {
          name: "Attending",
          value: RSVPData?.rsvpAnalytics.attending,
          color: "#0EB77F",
        },
        {
          name: "Not Attending",
          value: RSVPData?.rsvpAnalytics.notAttending,
          color: "#FF7272",
        },
        {
          name: "Maybe",
          value: RSVPData?.rsvpAnalytics.maybe,
          color: "#FFB625",
        },
      ]);
    }
  }, [RSVPData]);
  // const [createRSVP, { loading: RSVPLoading, error: RPError, data: RData }] =
  //   useMutation(ADD_RSVP);
  // const addRsvp = async () => {
  //   await createRSVP({
  //     variables: { id: id, type: "program", response: "Attending" },
  //   });
  // };
  // useEffect(() => {
  //   addRsvp();
  // }, [id]);
  const dispatch = useAppDispatch();
  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(consumerMasjidId));
    response.then(function (result) {
      if (result?.masjidName) {
        setMasjid(result);
        seTimeZone(timeZoneGetter(result));
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

  useEffect(() => {
    if (consumerMasjidId && !AdminMasjidStateInfo?.masjidName) {
      masjidAPIRequest();
    } else if (AdminMasjidStateInfo?.masjidName) {
      setMasjid(AdminMasjidStateInfo);
      seTimeZone(timeZoneGetter(AdminMasjidStateInfo));
    }
  }, [consumerMasjidId, AdminMasjidStateInfo?.masjidName]);
  // let tZone = await tz_lookup(
  //   masjid.location.coordinates[1],
  //   masjid.location.coordinates[0]
  // );
  useEffect(() => {
    if (data && data.GetProgram) {
      const program = data.GetProgram;
      setFormData({
        programName: program.programName,
        programCategory: program.category || "",
        address: program.address || "",
        description: program.description,
        availableSeats: program.availableSeats,

        location: {
          type: program.location.type,
          coordinates: program.location.coordinates,
        },
        _id: program._id,
        id: program._id,
        registrationOption: program.isPaid ? "paid" : "free",
        isPaid: program.isPaid,
        cost: program.cost || 0,
        capacity: program.capacity,
        recurrenceType: program.metaData.recurrenceType,
        startDate: dateReverter(program.metaData.startDate, timeZone),
        endDate: dateReverter(program.metaData.endDate, timeZone),
        startTime:convertTo24HourFormat( UTCTimeReverter(program.timings[0].startTime, timeZone)),
        endTime:convertTo24HourFormat( UTCTimeReverter(program.timings[0].endTime, timeZone)),
        ageOption: program.ageRange.maximumAge === 0 ? "All Age" : "range",
        startRange: program.ageRange.minimumAge,
        endRange: program.ageRange.maximumAge,
        images: program.programPhotos,
        isRegistrationRequired: program.isRegistrationRequired,
      });
    }
  }, [data, timeZone]);
  const getTimeInTimeZone = (
    timeValue: string | number | undefined
  ): string => {
    if (
      typeof timeValue === "string" &&
      (timeValue.includes("AM") || timeValue.includes("PM"))
    ) {
      return timeValue; // Return the value directly if it contains AM or PM
    }

    if (typeof timeValue === "number") {
      return moment.unix(timeValue).tz(timeZone).format("hh:mm A");
    }
    return "00:00";
  };
  const handleToggleEditForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const modifiedFormData = {
    ...formData,
    eventName: formData?.programName,
    timings: [
      {
        startTime: formData?.startTime,
      },
    ],
    metaData: { startDate: formData?.startDate },
  };

  if (showCheckIn)
    return (
      <TicketManagementTable
        consumerId={"program"}
        setShowCheckIn={setShowCheckIn}
        eventData={modifiedFormData}
        getTimeInTimeZone={getTimeInTimeZone}
        tZone={timeZone}
        admin={admin}
      />
    );
  // console.log("formData after full => ", formData);
  if (isFormVisible && formData.ageOption)
    return (
      <ProgramForm
        detailsFormData={formData}
        isEditing={true}
        handleToggleEditForm={handleToggleEditForm}
        id={id}
        masjidId={consumerMasjidId}
      />
    );

  return (
    <div>
      <ProgramView
        setShowCheckIn={setShowCheckIn}
        setIsShareVisible={setIsShareVisible}
        handleEditButton={handleToggleEditForm}
        formData={formData}
        masjidId={consumerMasjidId}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <PieChartComponent pieData={pieData} />
        </Suspense>
      </ProgramView>
    </div>
  );
};

export default ProgramDetails;
