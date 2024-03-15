import React, { useState, useRef, useEffect } from "react";
import "./AnnouncementHistoryComponent.css";
import { resources } from "../../../resources/resources";
// import { Badge } from "@material-ui/core";
// import DatePicker from "react-date-picker";
import moment from "moment";
// import { FetchingAnnouncementNotification } from "../../../redux/actions/AnnouncementActions/FetchingAnnouncementAction";
import { useDispatch } from "react-redux";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { DatePicker as SingleDatePicker } from "@material-ui/pickers";
import { FetchingAnnouncementNotificationByDate } from "../../../redux/actions/AnnouncementActions/FetchingAnnouncementByDateAction";
import { useAppDispatch } from "../../../redux/hooks";
import { AnnouncementType } from "../../../redux/Types";

const AnnouncementHistoryComponent = () => {
  const language = resources["en"];
  const dispatch = useAppDispatch();
  const [Announcements, setAnnouncements] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [AnnouncePopup, setAnnouncePopup] = useState(false);

  useEffect(() => {
    if (selectedStartDate) {
      const announcements = dispatch(FetchingAnnouncementNotificationByDate());
      announcements.then((result: any) => {
        if (!result.success) {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch:Something Went Wrong`,
            dispatch
          );
        } else {
          setAnnouncements(result.data.data);
        }
      });
    }
  }, [selectedStartDate]);
  return (
    <>
      <div className="AnnounceHistoryContianer">
        <div className="AnnounceHistoryTopContainer">
          <div className="AnnounceHistoryTitle">
            <span className="AnnounceHistory">History</span>
          </div>
          {/* <div className="AnnounceHistoryCalendar">
          <SingleDatePicker
                    disableToolbar
                    inputvariant="outlined"
                    format="dd/MM/yyyy"
                    minDate={new Date()}
                    sx={{ marginTop: 1 }}
                    label="Filter by Date"
                    value={selectedStartDate}
                    onChange={setSelectedStartDate}
                  />
          </div> */}
        </div>
        <div className="AnnounceHistoryBottomContainer">
          {Announcements?.length > 0 ? (
            <>
              <div className="Annoucementbody">
                {Announcements?.map((item: AnnouncementType) => {
                  return (
                    <div
                      className="AnnoucementInnerBody"
                      onClick={(e) => {
                        setAnnouncePopup(!AnnouncePopup);
                      }}
                    >
                      <div className="AnnoucementTItle">{item?.title}</div>
                      <div className="AnnoucementBody">
                        {!(item?.body.length > 20) ? (
                          <>{item?.body?.substr(0, 20)}...</>
                        ) : (
                          <>{item?.body}</>
                        )}
                      </div>
                      <div className="AnnoucementTItle">
                        Sent Date :
                        {moment(item?.createdAt)
                          .startOf("month")
                          .format("Do-MMM-YYYY")}
                      </div>
                      {AnnouncePopup ? (
                        <div className="PopUpannoucement">
                          <div className="PopupBodyAnnounce">
                            <div className="insidePopup">
                              <div className="topAnnounceComponent">
                                <div className="MessageType">NormalMessage</div>
                                <div className="AnnounceCanel">
                                  <button
                                    onClick={(e) => {
                                      setAnnouncePopup(!AnnouncePopup);
                                    }}
                                    className="AnnounceBtn"
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                              <div className="TitleAnnouce">{item?.title}</div>
                              <div className="DescriptionAnnouce">
                                {item?.body}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="AnnouncementHistoryPlaceholder">
                <span className="AnnouncementPlaceholder">
                  No Announcement Yet!
                </span>
              </div>
            </>
          )}
        </div>

        {/* <button onClick={((e)=>{
                    setAnnouncePopup(!AnnouncePopup)
                  })}>Popup</button> */}
      </div>
    </>
  );
};

export default AnnouncementHistoryComponent;
