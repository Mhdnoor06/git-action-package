import React, { useEffect, useState } from "react";
import "./TimingsCard.css";
import { resources } from "../../../resources/resources";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FetchingTimingsByDate } from "../../../redux/actions/TimingsActions/FetchingTodaysTiming.Action";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import TimingsLogo from "../../../photos/TimingsLogo.png";
import NoTimings from "../../../photos/NoTimings.png";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { AdminInterFace } from "../../../redux/Types";

type TimingsType={
  azaanTime:number,
  jamaatTime:number,
  _id:string,
  namazName:string
}
const TimingsCard = () => {
  const language = resources["en"];
  const dispatch = useAppThunkDispatch();
  let date = moment(new Date()).format("YYYY-MM-DD");
  //  const AdminMasjid = useSelector((state) => state.AdminMasjid);
  const [TodaysTimings, setTodaysTimings] = useState([]);
  const [AdminMasjid, setAdminMasjid] = useState();

  useEffect(() => {
    const adminString = localStorage.getItem("admin");
    const admin: AdminInterFace | null = adminString
      ? JSON.parse(adminString)
      : null;
 
    let MazjidId = admin?.masjids[0];
    setAdminMasjid(MazjidId);
  }, []);

  // console.log(AdminMasjid)
  useEffect(() => {
    if (AdminMasjid) {
      const TimingResponse = dispatch(FetchingTimingsByDate(AdminMasjid, date));

      TimingResponse.then((result) => {
        if (!result.timings === null) {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result.message}`,
            dispatch
          );
        } else {
          setTodaysTimings(result[0]?.timings);
        }
      });
    }
  }, [AdminMasjid]);

  return (
    <div className="FeedTimingsCardContainer">
      <div className="FeedTimingsTitle">
        <span className="FeedTimingsTitleSentence">
          <img src={TimingsLogo} />
          {language.TIMING_CARD.TABLE_TITLE}
        </span>
        <Link
          to="/masjidtimings"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span className="FeedTimingsTitleViewAll">view all</span>
        </Link>
      </div>
      {TodaysTimings?.length > 0 ? (
        <div className="FeedTimingsTable">
        <table className="TimingsTableContainer">
          <thead>
            <tr>
              {
                // console.log(TodaysTimings)
                TodaysTimings?.length > 0 &&
                  TodaysTimings.map((val:TimingsType, key) => {
                    let azaan = new Date(val.azaanTime * 1000);

                    let jamaat = new Date(val.jamaatTime * 1000);

                    return (
                      <div className="TableValueFlex">
                        <tr key={val._id} className="TimingsTableRow">
                          <td className="TimingsTableBodyItem">
                            {val.namazName}
                          </td>
                          <td className="TimingsTableHeadItem">
                            {" "}
                            {language.TIMING_CARD.AZAAN_TIME}
                          </td>
                          <td className="TimingsTableBodyItemTime">
                            {val.azaanTime &&
                              azaan.toLocaleString([], { timeStyle: "short" })}
                          </td>
                          <td className="TimingsTableHeadItem">
                            {language.TIMING_CARD.JAMAAT_TIME}{" "}
                          </td>
                          <td className="TimingsTableBodyItemTime">
                            {val.jamaatTime &&
                              jamaat.toLocaleString([], { timeStyle: "short" })}
                          </td>
                        </tr>
                      </div>
                    );
                  })
              }
            </tr>
          </thead>
        </table>
      </div>
      ) : (
        <div className="ImgContainerTimings">
        <img src={NoTimings} className="NoTimingsFound"/>
        </div>
      )
      
      }
      
      {/* <thead className="TimingsTableHeadContianer">
            <tr className="TimingsTableHead">
              <th className="TimingsTableHeadItem"> {language.TIMING_CARD.AZAAN_NAME} </th>
              <th className="TimingsTableHeadItem"> {language.TIMING_CARD.AZAAN_TIME}</th>
              <th className="TimingsTableHeadItem">{language.TIMING_CARD.JAMAAT_TIME} </th>
            </tr>
          </thead>
          <tbody className="TimingsTableBody">
            {TodaysTimings?.timings?.length>0 && TodaysTimings.timings.map((val, key) => {
              let azaan = new Date(val.azaanTime*1000);

              let jamaat = new Date(val.jamaatTime*1000);

              return (
                <tr key={val._id} className="TimingsTableRow">
                  <td  className="TimingsTableBodyItem">{val.namazName}</td>
                  <td  className="TimingsTableBodyItem">{val.azaanTime && azaan.toLocaleString([], {timeStyle: 'short'}) }</td>
                  <td className="TimingsTableBodyItem">{val.jamaatTime && jamaat.toLocaleString([], {timeStyle: 'short'}) }</td>
                </tr>
              );
            })}
          </tbody> */}

      {/* <div className="FeedTimingsBottom">
        <button className="EditTimingsButton">
        <MdEdit/> {language.TIMING_CARD.EDIT}
        </button>
      </div> */}
    </div>
  );
};

export default TimingsCard;
