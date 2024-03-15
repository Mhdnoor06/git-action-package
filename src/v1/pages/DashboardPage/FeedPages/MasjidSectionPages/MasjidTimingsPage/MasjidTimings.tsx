import React, { useState, useEffect, useRef } from "react";
import TimingsDisplayComponent from "../../../../../components/PagesComponents/TimingsPageComponents/TimingsDisplayComponent/TimingsDisplayComponent";
import "./MasjidTimings.css";

import TimingsLogo from "../../../../../photos/Admin portal orange icon/Vector.png";
import moment from "moment/moment";
import axios from "axios";
import { MasjidTimes } from "../../../../../constants/MazjidDemoTimes/MazjidDemoTimes";
import { FetchingTimingsByDateRange } from "../../../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router";
import BackButton from "../../../../../photos/BackButton.png";
import { Link } from "react-router-dom";
import { ChangeSnackbar } from "../../../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import {
  useAppSelector,
  useAppThunkDispatch,
} from "../../../../../redux/hooks";
import { NamajTiming, PrayerTimings, ResponseType } from "../../../../../redux/Types";
import TimingsManageComponent from "../../../../../components/PagesComponents/TimingsPageComponents/TimingsManageCompoent/TimingsManageComponent";
 
const MasjidTimings = () => {
  const [ManagingTimings, setManagingTimings] = useState(false);

  const [APITimings, setAPITimings] = useState<NamajTiming<number>[]>([]);
  const [MonthTimings, setMonthTimings] = useState([]);
  const [TodaysTimings, setTodaysTimings] = useState([]);
  const today = new Date();
  const startDate = moment().startOf("month").format("YYYY-MM-DD");
  const endDate = moment().endOf("month").format("YYYY-MM-DD");
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [AdminMasjid, setAdminMasjid] = useState();
  const Mazjid = useAppSelector((state) => state.admin);
  // const Mazjid = JSON.parse(localStorage.getItem("admin"));
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);

  useEffect(() => {
    let MazjidId = Mazjid.masjids[0];
    setAdminMasjid(MazjidId);
  }, [AdminMasjid]);

  useEffect(() => {
    let Timings: string[] = [];

    // if (AdminMasjidState?.address) {
    axios
      .get("https://api.aladhan.com/v1/timingsByAddress", {
        params: {
          address: AdminMasjidState?.address,
        },
      })
      .then((res) => {
        Timings.push(
          moment(res.data.data.timings.Fajr, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Dhur, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Asar, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Maghrib, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Isha, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );

        let MasjidTimes = [
          {
            namazName: "Fajr",
            azaanTime: moment(Timings[0]).unix(),
            jamaatTime: moment(Timings[0]).unix(),
            type: 1,
          },
          {
            namazName: "Dhur",
            azaanTime: moment(Timings[1]).unix(),
            jamaatTime: moment(Timings[1]).unix(),
            type: 2,
          },
          {
            namazName: "Asar",
            azaanTime: moment(Timings[2]).unix(),
            jamaatTime: moment(Timings[2]).unix(),
            type: 3,
          },
          {
            namazName: "Maghrib",
            azaanTime: moment(Timings[3]).unix(),
            jamaatTime: moment(Timings[3]).unix(),
            type: 4,
          },
          {
            namazName: "Isha",
            azaanTime: moment(Timings[4]).unix(),
            jamaatTime: moment(Timings[4]).unix(),
            type: 5,
          },
        ];

        setAPITimings(MasjidTimes);
      })
      .catch((error) => {
        const snackbarFailureDetails = {
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Couldn't Get Prefilled Timings for the location",
        };

        dispatch(ChangeSnackbar(snackbarFailureDetails));
        setAPITimings(MasjidTimes);
      });
    // }
  }, [Mazjid?.masjids[0]]);

  useEffect(() => {
    let currentDateFormat =
      moment(today).format("YYYY-MM-DD") + "T00:00:00.000Z";

    const res = dispatch(
      FetchingTimingsByDateRange(startDate, endDate, Mazjid?.masjids[0])
    );

    res.then((result: ResponseType) => {
      if (result.status == 200) {
        setMonthTimings(result.data.data);
        setTodaysTimings(
          result.data.data.filter((item:PrayerTimings<number>) => item.date === currentDateFormat)
        );
      }
    });
  }, [ManagingTimings, AdminMasjid]);



  return (
    <>
      <div className="MasjidTimingsContainer">
        <div className="MasjidTimigsComponnet">
          <div className="EventTopContainer">
            <div className="BackButton">
              <Link
                to="/feed"
                style={{ textDecoration: "none", color: "white" }}
              >
                <img
                  src={BackButton}
                  alt="Profile Icon"
                  className="BackBtnToHome"
                />
              </Link>
            </div>
            {ManagingTimings ? (
              ""
            ) : (
              <div className="ViewAllEvents">
                <Link
                  to="/masjidtimingsupload"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="ViewAll">View Full Timing</span>
                </Link>
              </div>
            )}
          </div>
          <div className="MainContainerForEvents">
            {ManagingTimings ? (
              <TimingsManageComponent
                APITimings={APITimings}
                setAPITimings={setAPITimings}
                CurrentMonthTimings={MonthTimings}
                TodaysTimings={TodaysTimings}
              />
            ) : (
              <TimingsDisplayComponent
                setManagingTimings={setManagingTimings}
                MonthTimings={MonthTimings}
                TodaysTimings={TodaysTimings}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MasjidTimings;
