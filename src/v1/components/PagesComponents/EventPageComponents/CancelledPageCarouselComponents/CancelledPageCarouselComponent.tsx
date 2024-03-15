import React, { useState , SetStateAction,Dispatch} from "react";
import "./CancelledPageCarousel.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";

import { useNavigate } from "react-router";
import NoImgFound from '../../../../photos/NoImgFound.png';
import CANCEL from '../../../../photos/CANCEL.png';
import usePagination from "../../../../hooks/Paginationhook";
import { EventType } from "../../../../redux/Types";

type propsType={
  CancelledEvents:any,
  setViewWingCancelledEvents:Dispatch<SetStateAction<boolean>>
  MasjidEventsData:any,
}
const CancelledPageCarouselComponent = ({
  CancelledEvents,
  setViewWingCancelledEvents,
  MasjidEventsData,
}:propsType) => {
  // const [CancelledEvents, setCancelledEvents] = useState([]);
  const navigate = useNavigate();
  let [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(CancelledEvents?.length / PER_PAGE);
  const PaginatedData = usePagination(CancelledEvents, PER_PAGE);
  // const handleEventCardClick = (item) => {
  //   navigate("/eventprofile/" + item._id);
  // };

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   PaginatedData.jump(p);
  // };
  return (
    <>
      <div className="MasjidEventsContainerBottomForViewall">
        <div className="MasjidEventsPageBottomTopContainer">
          <div className="EventsBottomTitleLeft">
            <span className="EventsPageTitle">Events</span>
          </div>
          <div className="BackButtonForMain">
            <button
              onClick={(e) => {
                setViewWingCancelledEvents(!CancelledEvents);
              }}
            >
              <img src={CANCEL} className="EventCancelBtn"/>
            </button>
          </div>
        </div>
        {/* <div className="DateEventViewall">02 Feb, 2023</div> */}
        <div className="MainContainerfoeViewall">
          {MasjidEventsData?.data?.data?.map((item:EventType, key:number) => {
            console.log(item._id)
            let startDate = moment(item?.metaData?.startDate).format("DD MMM[,] YYYY"); 
            // let Starttimings = item.timings.map((timing)=>{
            //   let startime = timing?.startTime;
            //   return startime;
            // })
            let EndTime = item.timings.map((timings)=>{
              let endtime = timings?.endTime;
              return endtime;
            })
            
            let endTimes = moment(EndTime).format("h:mm:ss");
            
            return (
              <div className="MasjidEventsCarouselContainerForViewAll">
                <div className="PhotoForViewall">
                  
                  <img src={NoImgFound} className="EventImage" />
                </div>
                <div className="Eventname">{item.eventName}</div>
                <div className="date">02 Feb, 2023 | 02:07 PM to 03:00 PM</div>
                <div className="DescriptionViewall">
                  {item.description.substr(0,160)}...
                </div>
                <div className="buttonContainerViewall">
                  <button className="buttonViewall" onClick={(e)=>{
                    navigate("/eventprofile/"+item._id)
                  }}>ReadMore</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="CancelledEventsPaginationComponnet">
          {/* <Pagination
            count={4}
            variant="outlined"
            page={page}
            color="primary"
            onChange={handleChange}
          /> */}
         
        </div>
      </div>
    </>
  );
};

export default CancelledPageCarouselComponent;
